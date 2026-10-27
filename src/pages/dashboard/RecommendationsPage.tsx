import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Lightbulb, IndianRupee, AlertTriangle, Check, Clock, Zap,
  Wrench, Cpu, Leaf, Calendar,
} from 'lucide-react';
import { SectionTitle, GlassCard, Badge } from '@/components/ui/GlassCard';
import { generateRecommendations, generateAnomalies, generatePrediction } from '@/lib/mlEngine';

export function RecommendationsPage() {
  const [filter, setFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const allRecs = generateRecommendations();
  const anomalies = generateAnomalies();
  const prediction = generatePrediction();

  const [recStatuses, setRecStatuses] = useState<Record<string, string>>(
    Object.fromEntries(allRecs.map((r) => [r.id, 'pending']))
  );

  const categories = ['all', ...Array.from(new Set(allRecs.map((r) => r.category)))];
  const statuses = ['all', 'pending', 'applied'];

  const filtered = allRecs.filter((r) => {
    const catMatch = filter === 'all' || r.category === filter;
    const statusMatch = statusFilter === 'all' || recStatuses[r.id] === statusFilter;
    return catMatch && statusMatch;
  });

  const totalSavings = allRecs.reduce((sum, r) => sum + r.estimated_savings_inr, 0);
  const appliedSavings = allRecs
    .filter((r) => recStatuses[r.id] === 'applied')
    .reduce((sum, r) => sum + r.estimated_savings_inr, 0);

  const toggleStatus = (id: string) => {
    setRecStatuses((prev) => ({ ...prev, [id]: prev[id] === 'applied' ? 'pending' : 'applied' }));
  };

  const priorityConfig = {
    High: { icon: AlertTriangle, color: 'text-red-500', bg: 'bg-red-500/10', border: 'border-red-500/20', badge: 'danger' as const },
    Medium: { icon: Clock, color: 'text-amber-500', bg: 'bg-amber-500/10', border: 'border-amber-500/20', badge: 'warning' as const },
    Low: { icon: Check, color: 'text-eco-500', bg: 'bg-eco-500/10', border: 'border-eco-500/20', badge: 'success' as const },
  };

  const categoryIcons: Record<string, typeof Zap> = {
    Operational: Zap,
    Equipment: Wrench,
    Scheduling: Calendar,
    Maintenance: Wrench,
    Lighting: Lightbulb,
    'Heat Recovery': Cpu,
    Electrical: Zap,
  };

  return (
    <div className="space-y-6">
      <SectionTitle title="AI Recommendations" subtitle="Intelligent, prioritized suggestions to reduce energy consumption and costs" />

      {/* Summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <GlassCard className="flex items-center gap-4">
          <div className="p-3 rounded-xl bg-eco-500/20">
            <IndianRupee className="w-6 h-6 text-eco-500" />
          </div>
          <div>
            <p className="text-xs text-slate-500 dark:text-eco-300/60">Total Savings Potential</p>
            <p className="text-xl font-bold text-slate-900 dark:text-white">₹{totalSavings.toLocaleString('en-IN')}/yr</p>
          </div>
        </GlassCard>

        <GlassCard className="flex items-center gap-4">
          <div className="p-3 rounded-xl bg-amber-500/20">
            <Check className="w-6 h-6 text-amber-500" />
          </div>
          <div>
            <p className="text-xs text-slate-500 dark:text-eco-300/60">Savings Captured</p>
            <p className="text-xl font-bold text-slate-900 dark:text-white">₹{appliedSavings.toLocaleString('en-IN')}/yr</p>
          </div>
        </GlassCard>

        <GlassCard className="flex items-center gap-4">
          <div className="p-3 rounded-xl bg-energy-500/20">
            <Leaf className="w-6 h-6 text-energy-500" />
          </div>
          <div>
            <p className="text-xs text-slate-500 dark:text-eco-300/60">CO₂ Reduction</p>
            <p className="text-xl font-bold text-slate-900 dark:text-white">{prediction.carbon_reduction.toLocaleString('en-IN')} kg/yr</p>
          </div>
        </GlassCard>
      </div>

      {/* Anomaly detection */}
      <GlassCard>
        <h3 className="font-semibold text-slate-900 dark:text-white text-base mb-4 flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-red-500" />
          Anomaly Detection (Isolation Forest)
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {anomalies.map((anomaly, i) => {
            const config = priorityConfig[anomaly.severity === 'Critical' ? 'High' : 'Medium'];
            return (
              <motion.div
                key={anomaly.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className={`p-4 rounded-xl ${config.bg} border ${config.border}`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-slate-900 dark:text-white text-sm">{anomaly.machine}</span>
                  <Badge variant={anomaly.severity === 'Critical' ? 'danger' : 'warning'}>{anomaly.severity}</Badge>
                </div>
                <p className="text-xs text-slate-600 dark:text-eco-200/70 mb-2">{anomaly.type}</p>
                <p className="text-sm text-slate-700 dark:text-eco-100">{anomaly.description}</p>
                <p className="text-xs text-slate-400 mt-2">Detected {anomaly.detected_at}</p>
              </motion.div>
            );
          })}
        </div>
      </GlassCard>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                filter === cat
                  ? 'bg-gradient-to-r from-eco-500 to-eco-600 text-white'
                  : 'glass text-slate-600 dark:text-eco-200/70 hover:bg-slate-100 dark:hover:bg-eco-800/30'
              }`}
            >
              {cat === 'all' ? 'All Categories' : cat}
            </button>
          ))}
        </div>
        <div className="flex gap-2 sm:ml-auto">
          {statuses.map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                statusFilter === s
                  ? 'bg-gradient-to-r from-energy-500 to-energy-600 text-white'
                  : 'glass text-slate-600 dark:text-eco-200/70 hover:bg-slate-100 dark:hover:bg-eco-800/30'
              }`}
            >
              {s === 'all' ? 'All Status' : s === 'applied' ? 'Applied' : 'Pending'}
            </button>
          ))}
        </div>
      </div>

      {/* Recommendations list */}
      <div className="space-y-4">
        <AnimatePresence>
          {filtered.map((rec, i) => {
            const config = priorityConfig[rec.priority];
            const Icon = categoryIcons[rec.category] ?? Lightbulb;
            const applied = recStatuses[rec.id] === 'applied';
            return (
              <motion.div
                key={rec.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: i * 0.05 }}
                className={`glass-card p-5 hover:shadow-glow transition-all ${applied ? 'opacity-70' : ''}`}
              >
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-xl ${config.bg} flex-shrink-0`}>
                    <Icon className={`w-5 h-5 ${config.color}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h3 className={`font-semibold text-slate-900 dark:text-white ${applied ? 'line-through' : ''}`}>
                        {rec.title}
                      </h3>
                      <Badge variant={config.badge}>{rec.priority} Priority</Badge>
                    </div>
                    <p className="text-sm text-slate-600 dark:text-eco-200/70 mb-3">{rec.description}</p>
                    <div className="flex flex-wrap items-center gap-4">
                      <span className="text-xs text-slate-500 dark:text-eco-300/60">Category: <span className="font-medium text-slate-700 dark:text-eco-200">{rec.category}</span></span>
                      <span className="text-xs text-eco-600 dark:text-eco-400 font-semibold">Save ₹{rec.estimated_savings_inr.toLocaleString('en-IN')}/yr</span>
                      <button
                        onClick={() => toggleStatus(rec.id)}
                        className={`ml-auto px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                          applied
                            ? 'bg-eco-500/20 text-eco-600 dark:text-eco-400'
                            : 'bg-gradient-to-r from-eco-500 to-eco-600 text-white hover:shadow-glow'
                        }`}
                      >
                        {applied ? (
                          <span className="flex items-center gap-1"><Check className="w-3 h-3" /> Applied</span>
                        ) : (
                          'Mark as Applied'
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}
