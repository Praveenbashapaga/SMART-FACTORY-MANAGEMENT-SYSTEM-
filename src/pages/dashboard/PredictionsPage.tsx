import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Brain, Zap, IndianRupee, Leaf, Activity, Gauge, Cpu, TrendingUp } from 'lucide-react';
import { StatCard, SectionTitle, GlassCard, Badge, LoadingSkeleton } from '@/components/ui/GlassCard';
import { ChartCard, EcoLineChart, EcoAreaChart, EcoBarChart, EcoGaugeChart } from '@/components/dashboard/Charts';
import { generatePrediction, generateForecast, generateDailyConsumption, generateMachineHealth } from '@/lib/mlEngine';

export function PredictionsPage() {
  const [loading, setLoading] = useState(true);
  const prediction = generatePrediction();
  const forecast = generateForecast();
  const dailyData = generateDailyConsumption(7);
  const machineHealth = generateMachineHealth();

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="glass-card p-12 flex flex-col items-center justify-center">
          <div className="relative">
            <div className="w-16 h-16 rounded-full border-4 border-eco-500/20 border-t-eco-500 animate-spin" />
            <Brain className="w-6 h-6 text-eco-500 absolute inset-0 m-auto" />
          </div>
          <h3 className="mt-6 text-lg font-semibold text-slate-900 dark:text-white">AI Models Running...</h3>
          <p className="text-sm text-slate-500 dark:text-eco-300/60 mt-1">Random Forest, Gradient Boosting, XGBoost, Isolation Forest</p>
          <div className="mt-6 space-y-2 w-full max-w-sm">
            {['Loading historical data', 'Training models', 'Generating predictions', 'Detecting anomalies'].map((step, i) => (
              <motion.div
                key={step}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.3 }}
                className="flex items-center gap-2 text-sm text-slate-600 dark:text-eco-200/70"
              >
                <div className="w-2 h-2 rounded-full bg-eco-500 animate-pulse" />
                {step}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const models = [
    { name: 'Random Forest', accuracy: 94, task: 'Energy Consumption Prediction', icon: Zap, color: 'eco' },
    { name: 'Gradient Boosting', accuracy: 91, task: 'Energy Efficiency Score', icon: Gauge, color: 'energy' },
    { name: 'XGBoost', accuracy: 93, task: 'Monthly Bill Prediction', icon: IndianRupee, color: 'amber' },
    { name: 'Linear Regression', accuracy: 87, task: 'Cost Saving Estimation', icon: TrendingUp, color: 'lime' },
    { name: 'Isolation Forest', accuracy: 89, task: 'Anomaly Detection', icon: Activity, color: 'rose' },
  ];

  return (
    <div className="space-y-6">
      <SectionTitle title="AI Predictions" subtitle="Machine learning forecasts for energy, costs, carbon, and maintenance" />

      {/* Prediction summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Predicted Consumption" value={prediction.predicted_consumption.toLocaleString('en-IN')} unit="kWh" icon={<Zap className="w-5 h-5 text-energy-500" />} color="energy" delay={0} />
        <StatCard title="Estimated Bill" value={`₹${prediction.estimated_bill.toLocaleString('en-IN')}`} icon={<IndianRupee className="w-5 h-5 text-amber-500" />} color="amber" delay={0.1} />
        <StatCard title="Estimated Savings" value={`₹${prediction.estimated_savings.toLocaleString('en-IN')}`} icon={<IndianRupee className="w-5 h-5 text-eco-500" />} color="eco" delay={0.2} />
        <StatCard title="Carbon Reduction" value={prediction.carbon_reduction.toLocaleString('en-IN')} unit="kg" icon={<Leaf className="w-5 h-5 text-eco-400" />} color="lime" delay={0.3} />
      </div>

      {/* Forecast section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <ChartCard title="Next Week Forecast" subtitle="7-day consumption prediction with confidence interval" className="lg:col-span-2">
          <EcoAreaChart
            data={forecast.nextWeek}
            xKey="date"
            areas={[
              { key: 'predicted', label: 'Predicted (kWh)', color: '#22c55e' },
              { key: 'confidence_lower', label: 'Lower Bound', color: '#06b6d4' },
              { key: 'confidence_upper', label: 'Upper Bound', color: '#f59e0b' },
            ]}
            height={300}
          />
        </ChartCard>

        <div className="space-y-4">
          <GlassCard>
            <h3 className="font-semibold text-slate-900 dark:text-white text-sm mb-4">Forecast Summary</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 rounded-xl bg-eco-500/10">
                <span className="text-sm text-slate-600 dark:text-eco-200/70">Next Month Bill</span>
                <span className="font-bold text-eco-600 dark:text-eco-400">₹{forecast.nextMonthBill.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-amber-500/10">
                <span className="text-sm text-slate-600 dark:text-eco-200/70">Expected Savings</span>
                <span className="font-bold text-amber-600 dark:text-amber-400">₹{forecast.expectedSavings.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-energy-500/10">
                <span className="text-sm text-slate-600 dark:text-eco-200/70">Future Carbon</span>
                <span className="font-bold text-energy-600 dark:text-energy-400">{forecast.futureCarbon.toLocaleString('en-IN')} kg</span>
              </div>
            </div>
          </GlassCard>

          <GlassCard>
            <h3 className="font-semibold text-slate-900 dark:text-white text-sm mb-2">Confidence Score</h3>
            <EcoGaugeChart value={prediction.confidence_score} label="AI Confidence" height={180} />
          </GlassCard>
        </div>
      </div>

      {/* ML Models */}
      <GlassCard>
        <h3 className="font-semibold text-slate-900 dark:text-white text-base mb-4 flex items-center gap-2">
          <Cpu className="w-5 h-5 text-eco-500" />
          ML Models Performance
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {models.map((model, i) => (
            <motion.div
              key={model.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="p-4 rounded-xl glass hover:shadow-glow transition-all"
            >
              <model.icon className="w-5 h-5 text-eco-500 mb-2" />
              <p className="font-semibold text-slate-900 dark:text-white text-sm">{model.name}</p>
              <p className="text-xs text-slate-500 dark:text-eco-300/60 mb-3">{model.task}</p>
              <div className="flex items-baseline gap-1 mb-2">
                <span className="text-xl font-bold gradient-text">{model.accuracy}%</span>
                <span className="text-xs text-slate-500">accuracy</span>
              </div>
              <div className="h-1.5 rounded-full bg-slate-200 dark:bg-eco-800/50 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${model.accuracy}%` }}
                  transition={{ duration: 1, delay: 0.5 + i * 0.1 }}
                  className="h-full rounded-full bg-gradient-to-r from-eco-500 to-energy-500"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </GlassCard>

      {/* Machine health predictions */}
      <ChartCard title="Machine Health Predictions" subtitle="AI-predicted health and maintenance needs">
        <div className="overflow-x-auto scrollbar-custom">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left border-b border-slate-200 dark:border-eco-800/50">
                <th className="pb-3 font-medium text-slate-500 dark:text-eco-300/60">Machine</th>
                <th className="pb-3 font-medium text-slate-500 dark:text-eco-300/60">Health Score</th>
                <th className="pb-3 font-medium text-slate-500 dark:text-eco-300/60">Status</th>
                <th className="pb-3 font-medium text-slate-500 dark:text-eco-300/60">Uptime</th>
                <th className="pb-3 font-medium text-slate-500 dark:text-eco-300/60">Action</th>
              </tr>
            </thead>
            <tbody>
              {machineHealth.map((m, i) => (
                <motion.tr
                  key={m.machine}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.05 }}
                  className="border-b border-slate-100 dark:border-eco-800/30"
                >
                  <td className="py-3 font-medium text-slate-900 dark:text-white">{m.machine}</td>
                  <td className="py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-20 h-1.5 rounded-full bg-slate-200 dark:bg-eco-800/50 overflow-hidden">
                        <div
                          className={`h-full rounded-full ${m.health > 80 ? 'bg-eco-500' : m.health > 60 ? 'bg-amber-500' : 'bg-red-500'}`}
                          style={{ width: `${m.health}%` }}
                        />
                      </div>
                      <span className="text-xs font-medium">{m.health}%</span>
                    </div>
                  </td>
                  <td className="py-3">
                    <Badge variant={m.status === 'Healthy' ? 'success' : 'warning'}>{m.status}</Badge>
                  </td>
                  <td className="py-3 text-slate-600 dark:text-eco-200/70">{m.uptime}%</td>
                  <td className="py-3">
                    {m.status === 'Warning' ? (
                      <span className="text-xs text-amber-600 dark:text-amber-400 font-medium">Schedule maintenance</span>
                    ) : (
                      <span className="text-xs text-eco-600 dark:text-eco-400">No action needed</span>
                    )}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </ChartCard>
    </div>
  );
}
