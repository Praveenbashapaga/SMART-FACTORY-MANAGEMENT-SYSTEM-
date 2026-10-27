import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import {
  Zap, IndianRupee, TrendingUp, Leaf, Gauge, Activity, AlertTriangle,
  TrendingDown, Wrench, Upload, ArrowRight, Cpu, Download, CheckCircle, FileSpreadsheet,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { StatCard, GlassCard, LoadingSkeleton, Badge } from '@/components/ui/GlassCard';
import { ChartCard, EcoLineChart, EcoBarChart, EcoPieChart, EcoGaugeChart, EcoHeatmap } from '@/components/dashboard/Charts';
import {
  generatePrediction, generateAlerts, generateDailyConsumption,
  generateMachineConsumption, generateDepartmentConsumption, generateHeatmapData,
} from '@/lib/mlEngine';

interface UploadedRow {
  date: string;
  machine: string;
  consumption_kwh: number;
  cost_inr: number;
}

function parseCSV(text: string): UploadedRow[] {
  const lines = text.trim().split('\n');
  const headers = lines[0].split(',').map((h) => h.trim());
  const rows: UploadedRow[] = [];
  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(',').map((v) => v.trim());
    if (values.length < 4) continue;
    const row: Record<string, string> = {};
    headers.forEach((h, idx) => { row[h] = values[idx]; });
    rows.push({
      date: row.date,
      machine: row.machine,
      consumption_kwh: parseFloat(row.consumption_kwh) || 0,
      cost_inr: parseFloat(row.cost_inr) || 0,
    });
  }
  return rows;
}

export function DashboardHome() {
  const [loading, setLoading] = useState(true);
  const [uploadedData, setUploadedData] = useState<UploadedRow[] | null>(null);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'parsing' | 'done' | 'error'>('idle');
  const prediction = generatePrediction();
  const alerts = generateAlerts();
  const defaultDaily = generateDailyConsumption(30);
  const defaultMachine = generateMachineConsumption();
  const deptData = generateDepartmentConsumption();
  const heatmapData = generateHeatmapData();

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const handleFileUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadStatus('parsing');
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const text = event.target?.result as string;
        const rows = parseCSV(text);
        if (rows.length === 0) {
          setUploadStatus('error');
          return;
        }
        setUploadedData(rows);
        setUploadStatus('done');
      } catch {
        setUploadStatus('error');
      }
    };
    reader.onerror = () => setUploadStatus('error');
    reader.readAsText(file);
  }, []);

  // Build chart data from uploaded CSV or fall back to generated data
  const dailyData = uploadedData
    ? Object.entries(
        uploadedData.reduce((acc, row) => {
          acc[row.date] = (acc[row.date] ?? 0) + row.consumption_kwh;
          return acc;
        }, {} as Record<string, number>)
      ).map(([date, consumption]) => ({
        date,
        consumption: Math.round(consumption),
        cost: Math.round(consumption * 8.5),
        carbon: Math.round(consumption * 0.82),
      })).sort((a, b) => a.date.localeCompare(b.date))
    : defaultDaily;

  const machineData = uploadedData
    ? Object.entries(
        uploadedData.reduce((acc, row) => {
          acc[row.machine] = (acc[row.machine] ?? 0) + row.consumption_kwh;
          return acc;
        }, {} as Record<string, number>)
      ).map(([machine, consumption]) => ({
        machine,
        consumption: Math.round(consumption),
        efficiency: Math.round(60 + Math.random() * 30),
      })).sort((a, b) => b.consumption - a.consumption)
    : defaultMachine;

  const uploadedStats = uploadedData
    ? {
        totalKwh: Math.round(uploadedData.reduce((s, r) => s + r.consumption_kwh, 0)),
        totalCost: Math.round(uploadedData.reduce((s, r) => s + r.cost_inr, 0)),
        totalCarbon: Math.round(uploadedData.reduce((s, r) => s + r.consumption_kwh * 0.82, 0)),
        days: new Set(uploadedData.map((r) => r.date)).size,
        machines: new Set(uploadedData.map((r) => r.machine)).size,
      }
    : null;

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <LoadingSkeleton key={i} className="h-32" />
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <LoadingSkeleton className="h-80" />
          <LoadingSkeleton className="h-80" />
        </div>
      </div>
    );
  }

  const severityConfig = {
    Critical: { icon: AlertTriangle, color: 'text-red-500', bg: 'bg-red-500/10', border: 'border-red-500/20' },
    Warning: { icon: TrendingDown, color: 'text-amber-500', bg: 'bg-amber-500/10', border: 'border-amber-500/20' },
    Info: { icon: Wrench, color: 'text-energy-500', bg: 'bg-energy-500/10', border: 'border-energy-500/20' },
  };

  return (
    <div className="space-y-6">
      {/* Welcome banner */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
      >
        <div>
          <h2 className="text-xl font-bold font-display text-slate-900 dark:text-white mb-1">
            Welcome back to your Energy Dashboard
          </h2>
          <p className="text-sm text-slate-600 dark:text-eco-200/70">
            Your factory's energy score is <span className="font-semibold text-eco-600 dark:text-eco-400">{prediction.energy_score}/100</span> — {prediction.risk_level} risk level.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <a href="/sample-energy-data.csv" download className="btn-ghost text-sm inline-flex items-center gap-2">
            <Download className="w-4 h-4" />
            Sample CSV
          </a>
          <label className="btn-secondary text-sm inline-flex items-center gap-2 cursor-pointer">
            {uploadStatus === 'done' ? <CheckCircle className="w-4 h-4 text-eco-500" /> : <Upload className="w-4 h-4" />}
            {uploadStatus === 'parsing' ? 'Parsing...' : uploadStatus === 'done' ? 'Uploaded!' : uploadStatus === 'error' ? 'Error — Retry' : 'Upload CSV'}
            <input type="file" accept=".csv" className="hidden" onChange={handleFileUpload} />
          </label>
          <Link to="/dashboard/predictions" className="btn-primary text-sm inline-flex items-center gap-2">
            <Cpu className="w-4 h-4" />
            Run AI Prediction
          </Link>
        </div>
      </motion.div>

      {/* Upload success banner */}
      {uploadedData && uploadedStats && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-4 flex flex-col sm:flex-row items-start sm:items-center gap-4"
        >
          <div className="p-3 rounded-xl bg-eco-500/20">
            <FileSpreadsheet className="w-5 h-5 text-eco-500" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold text-slate-900 dark:text-white">CSV data loaded successfully</p>
            <p className="text-xs text-slate-500 dark:text-eco-300/60">
              {uploadedStats.days} days · {uploadedStats.machines} machines · {uploadedStats.totalKwh.toLocaleString('en-IN')} kWh total · ₹{uploadedStats.totalCost.toLocaleString('en-IN')} · {uploadedStats.totalCarbon.toLocaleString('en-IN')} kg CO₂
            </p>
          </div>
          <button onClick={() => { setUploadedData(null); setUploadStatus('idle'); }} className="btn-ghost text-xs">
            Clear data
          </button>
        </motion.div>
      )}

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Energy Score" value={String(prediction.energy_score)} unit="/ 100" icon={<Gauge className="w-5 h-5 text-eco-500" />} trend={{ value: '+5 pts this month', positive: true }} color="eco" delay={0} />
        <StatCard title="Monthly Bill" value={`₹${prediction.estimated_bill.toLocaleString('en-IN')}`} icon={<IndianRupee className="w-5 h-5 text-amber-500" />} trend={{ value: '↓ 3.2% vs last month', positive: true }} color="amber" delay={0.1} />
        <StatCard title="Predicted Consumption" value={prediction.predicted_consumption.toLocaleString('en-IN')} unit="kWh" icon={<Zap className="w-5 h-5 text-energy-500" />} trend={{ value: '↓ 2.1% vs last month', positive: true }} color="energy" delay={0.2} />
        <StatCard title="Carbon Emissions" value={prediction.carbon_reduction.toLocaleString('en-IN')} unit="kg CO₂" icon={<Leaf className="w-5 h-5 text-eco-400" />} trend={{ value: '↓ 4.5% vs last month', positive: true }} color="lime" delay={0.3} />
      </div>

      {/* Second row of stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Estimated Savings" value={`₹${prediction.estimated_savings.toLocaleString('en-IN')}`} icon={<IndianRupee className="w-5 h-5 text-eco-500" />} trend={{ value: '18% of bill', positive: true }} color="eco" delay={0} />
        <StatCard title="Efficiency" value={String(prediction.efficiency_pct)} unit="%" icon={<Activity className="w-5 h-5 text-energy-500" />} trend={{ value: '+2 pts', positive: true }} color="energy" delay={0.1} />
        <StatCard title="Factory Health" value={String(prediction.factory_health)} unit="/ 100" icon={<TrendingUp className="w-5 h-5 text-eco-400" />} trend={{ value: 'Good', positive: true }} color="lime" delay={0.2} />
        <StatCard title="AI Confidence" value={String(prediction.confidence_score)} unit="%" icon={<Cpu className="w-5 h-5 text-amber-500" />} trend={{ value: 'High accuracy', positive: true }} color="amber" delay={0.3} />
      </div>

      {/* Charts row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <ChartCard title="Daily Energy Consumption" subtitle="Last 30 days (kWh)" className="lg:col-span-2">
          <EcoLineChart
            data={dailyData}
            xKey="date"
            lines={[{ key: 'consumption', label: 'Consumption (kWh)', color: '#22c55e' }]}
            height={280}
          />
        </ChartCard>

        <ChartCard title="Energy Score" subtitle="Overall factory performance">
          <EcoGaugeChart value={prediction.energy_score} label="Energy Score" height={220} />
          <div className="flex justify-center gap-4 mt-2 text-xs">
            <span className="text-slate-500 dark:text-eco-300/60">Risk: <span className="font-semibold text-amber-500">{prediction.risk_level}</span></span>
            <span className="text-slate-500 dark:text-eco-300/60">Sustainability: <span className="font-semibold text-eco-500">{prediction.sustainability_index}/100</span></span>
          </div>
        </ChartCard>
      </div>

      {/* Charts row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard title="Machine-wise Consumption" subtitle="kWh per machine">
          <EcoBarChart
            data={machineData}
            xKey="machine"
            bars={[{ key: 'consumption', label: 'Consumption (kWh)', color: '#06b6d4' }]}
            height={260}
          />
        </ChartCard>

        <ChartCard title="Department-wise Distribution" subtitle="Energy by department">
          <EcoPieChart data={deptData} dataKey="consumption" nameKey="department" height={260} />
        </ChartCard>
      </div>

      {/* Heatmap + Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard title="Consumption Heatmap" subtitle="Day & hour intensity (kWh)">
          <EcoHeatmap data={heatmapData} />
        </ChartCard>

        <GlassCard className="h-fit">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-white text-sm md:text-base">Active Alerts</h3>
              <p className="text-xs text-slate-500 dark:text-eco-300/60 mt-0.5">{alerts.length} alerts need attention</p>
            </div>
            <Badge variant="danger">{alerts.filter((a) => a.severity === 'Critical').length} Critical</Badge>
          </div>
          <div className="space-y-3">
            {alerts.map((alert, i) => {
              const config = severityConfig[alert.severity];
              return (
                <motion.div
                  key={alert.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className={`flex items-start gap-3 p-3 rounded-xl ${config.bg} border ${config.border}`}
                >
                  <config.icon className={`w-5 h-5 ${config.color} flex-shrink-0 mt-0.5`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-900 dark:text-white">{alert.title}</p>
                    <p className="text-xs text-slate-600 dark:text-eco-200/70 mt-0.5">{alert.message}</p>
                  </div>
                  <Badge variant={alert.severity === 'Critical' ? 'danger' : alert.severity === 'Warning' ? 'warning' : 'info'}>
                    {alert.severity}
                  </Badge>
                </motion.div>
              );
            })}
          </div>
          <Link to="/dashboard/recommendations" className="mt-4 flex items-center justify-center gap-1 text-sm text-eco-600 dark:text-eco-400 hover:underline font-medium">
            View all recommendations
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </GlassCard>
      </div>
    </div>
  );
}
