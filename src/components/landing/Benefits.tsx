import { motion } from 'framer-motion';
import { IndianRupee, Clock, Leaf, TrendingUp, Wrench, Gauge } from 'lucide-react';
import { SectionTitle } from '@/components/ui/GlassCard';

const benefits = [
  { icon: IndianRupee, title: 'Save Up to ₹1.3L Yearly', description: 'AI-identified savings across machines, scheduling, and equipment upgrades.', stat: '₹1,30,700', statLabel: 'Annual Savings' },
  { icon: Clock, title: 'Cut Energy Waste by 28%', description: 'Eliminate idle machine consumption and optimize operating schedules.', stat: '28%', statLabel: 'Energy Reduction' },
  { icon: Leaf, title: 'Reduce CO₂ by 52,000 kg', description: 'Lower your carbon footprint and qualify for government carbon credits.', stat: '52K kg', statLabel: 'CO₂ Reduction' },
  { icon: TrendingUp, title: 'Boost Efficiency to 85%+', description: 'AI recommendations help you match top-performing factories in your industry.', stat: '85%+', statLabel: 'Efficiency Target' },
  { icon: Wrench, title: 'Prevent Costly Breakdowns', description: 'Predictive maintenance alerts catch issues before they cause downtime.', stat: '14 days', statLabel: 'Early Warning' },
  { icon: Gauge, title: 'Real-time Factory Health', description: 'A single Factory Health Score tells you exactly how your facility is performing.', stat: '91%', statLabel: 'AI Confidence' },
];

export function Benefits() {
  return (
    <section id="benefits" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <SectionTitle
          center
          title="Real Benefits, Measurable Results"
          subtitle="EcoWise AI doesn't just show you data — it delivers tangible savings and sustainability improvements."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit, i) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="glass-card p-6 hover:shadow-glow transition-all duration-300 group"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-2xl bg-gradient-to-br from-eco-500/20 to-energy-500/20 group-hover:from-eco-500 group-hover:to-energy-500 transition-all">
                  <benefit.icon className="w-6 h-6 text-eco-600 dark:text-eco-400 group-hover:text-white transition-colors" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-slate-900 dark:text-white mb-1">{benefit.title}</h3>
                  <p className="text-sm text-slate-600 dark:text-eco-200/70 leading-relaxed mb-3">{benefit.description}</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold gradient-text font-display">{benefit.stat}</span>
                    <span className="text-xs text-slate-500 dark:text-eco-300/60">{benefit.statLabel}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
