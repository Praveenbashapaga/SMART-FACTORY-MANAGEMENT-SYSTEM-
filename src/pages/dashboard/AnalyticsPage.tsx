import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, TrendingUp, Leaf, IndianRupee, Clock, Moon, Factory } from 'lucide-react';
import { StatCard, SectionTitle, Badge } from '@/components/ui/GlassCard';
import { ChartCard, EcoLineChart, EcoBarChart, EcoAreaChart, EcoPieChart, EcoRadarChart, EcoScatterChart, EcoHeatmap } from '@/components/dashboard/Charts';
import {
  generateDailyConsumption, generateWeeklyConsumption, generateMonthlyConsumption,
  generateYearlyComparison, generateMachineConsumption, generateDepartmentConsumption,
  generatePeakHourAnalysis, generateIdleHourAnalysis, generateCarbonEmissions,
  generateCostTrend, generateRadarData, generateScatterData, generateHeatmapData,
  generatePrediction,
} from '@/lib/mlEngine';

type Tab = 'daily' | 'weekly' | 'monthly' | 'yearly';

export function AnalyticsPage() {
  const [tab, setTab] = useState<Tab>('monthly');
  const prediction = generatePrediction();

  const dailyData = generateDailyConsumption(30);
  const weeklyData = generateWeeklyConsumption(12);
  const monthlyData = generateMonthlyConsumption(12);
  const yearlyData = generateYearlyComparison();
  const machineData = generateMachineConsumption();
  const deptData = generateDepartmentConsumption();
  const peakData = generatePeakHourAnalysis();
  const idleData = generateIdleHourAnalysis();
  const carbonData = generateCarbonEmissions();
  const costData = generateCostTrend();
  const radarData = generateRadarData();
  const scatterData = generateScatterData();
  const heatmapData = generateHeatmapData();

  const tabData = {
    daily: { data: dailyData, xKey: 'date', label: 'Daily' },
    weekly: { data: weeklyData, xKey: 'week', label: 'Weekly' },
    monthly: { data: monthlyData, xKey: 'month', label: 'Monthly' },
    yearly: { data: yearlyData, xKey: 'year', label: 'Yearly' },
  };

  const tabs: { key: Tab; label: string }[] = [
    { key: 'daily', label: 'Daily' },
    { key: 'weekly', label: 'Weekly' },
    { key: 'monthly', label: 'Monthly' },
    { key: 'yearly', label: 'Yearly' },
  ];

  return (
    <div className="space-y-6">
      <SectionTitle title="Energy Analytics" subtitle="Deep-dive into your factory's energy consumption patterns and trends" />

      {/* Score cards */}
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <StatCard title="Energy Score" value={String(prediction.energy_score)} icon={<TrendingUp className="w-4 h-4 text-eco-500" />} color="eco" delay={0} />
        <StatCard title="Factory Health" value={String(prediction.factory_health)} icon={<Factory className="w-4 h-4 text-energy-500" />} color="energy" delay={0.05} />
        <StatCard title="Sustainability" value={String(prediction.sustainability_index)} icon={<Leaf className="w-4 h-4 text-eco-400" />} color="lime" delay={0.1} />
        <StatCard title="Carbon Index" value={String(prediction.carbon_index)} icon={<Leaf className="w-4 h-4 text-amber-500" />} color="amber" delay={0.15} />
        <StatCard title="Efficiency" value={`${prediction.efficiency_pct}%`} icon={<TrendingUp className="w-4 h-4 text-eco-500" />} color="eco" delay={0.2} />
        <StatCard title="AI Confidence" value={`${prediction.confidence_score}%`} icon={<TrendingUp className="w-4 h-4 text-energy-500" />} color="energy" delay={0.25} />
      </div>

      {/* Trend tabs */}
      <ChartCard
        title="Energy Trend Analysis"
        subtitle="Consumption, cost, and carbon over time"
        action={
          <div className="flex gap-1 p-1 rounded-xl glass">
            {tabs.map((t) => (
              <button
                key={t.key}
                onClick={() => setTab(t.key)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  tab === t.key
                    ? 'bg-gradient-to-r from-eco-500 to-eco-600 text-white shadow-glow'
                    : 'text-slate-600 dark:text-eco-200/70 hover:bg-slate-100 dark:hover:bg-eco-800/30'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        }
      >
        <EcoAreaChart
          data={tabData[tab].data}
          xKey={tabData[tab].xKey}
          areas={[
            { key: 'consumption', label: 'Consumption (kWh)', color: '#22c55e' },
            ...(tab === 'yearly' ? [] : [{ key: 'cost', label: 'Cost (₹)', color: '#f59e0b' }]),
          ]}
          height={300}
        />
      </ChartCard>

      {/* Machine & Department */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard title="Machine-wise Consumption" subtitle="kWh and efficiency per machine">
          <EcoBarChart
            data={machineData}
            xKey="machine"
            bars={[{ key: 'consumption', label: 'Consumption (kWh)', color: '#06b6d4' }]}
            height={260}
          />
        </ChartCard>

        <ChartCard title="Department-wise Consumption" subtitle="Energy distribution by department">
          <EcoPieChart data={deptData} dataKey="consumption" nameKey="department" height={260} />
        </ChartCard>
      </div>

      {/* Peak & Idle hours */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard title="Peak Hour Analysis" subtitle="24-hour consumption pattern">
          <EcoAreaChart
            data={peakData}
            xKey="hour"
            areas={[{ key: 'consumption', label: 'Consumption (kWh)', color: '#f59e0b' }]}
            height={260}
          />
        </ChartCard>

        <ChartCard title="Idle Hour Analysis" subtitle="Wasted energy during idle periods">
          <EcoBarChart
            data={idleData}
            xKey="period"
            bars={[
              { key: 'idle_pct', label: 'Idle %', color: '#ef4444' },
              { key: 'wasted_kwh', label: 'Wasted kWh', color: '#f59e0b' },
            ]}
            height={260}
          />
        </ChartCard>
      </div>

      {/* Carbon & Cost */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard title="Carbon Emissions Trend" subtitle="Monthly CO₂ emissions vs offset">
          <EcoBarChart
            data={carbonData}
            xKey="month"
            bars={[
              { key: 'emissions', label: 'Emissions (kg)', color: '#ef4444' },
              { key: 'offset', label: 'Offset (kg)', color: '#22c55e' },
            ]}
            height={260}
          />
        </ChartCard>

        <ChartCard title="Electricity Cost Trend" subtitle="Monthly cost vs savings">
          <EcoLineChart
            data={costData}
            xKey="month"
            lines={[
              { key: 'cost', label: 'Cost (₹)', color: '#f59e0b' },
              { key: 'savings', label: 'Savings (₹)', color: '#22c55e' },
            ]}
            height={260}
          />
        </ChartCard>
      </div>

      {/* Radar & Scatter */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard title="Performance Radar" subtitle="Multi-dimensional factory assessment">
          <EcoRadarChart data={radarData} dataKey="value" height={280} />
        </ChartCard>

        <ChartCard title="Utilization vs Consumption" subtitle="Machine scatter analysis">
          <EcoScatterChart data={scatterData} xKey="utilization" yKey="consumption" height={280} />
        </ChartCard>
      </div>

      {/* Heatmap */}
      <ChartCard title="Weekly Consumption Heatmap" subtitle="Day & hour intensity map">
        <EcoHeatmap data={heatmapData} />
      </ChartCard>
    </div>
  );
}
