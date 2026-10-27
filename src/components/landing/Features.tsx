import { motion } from 'framer-motion';
import { Brain, TrendingDown, Zap, Leaf, BarChart3, Bell, Shield, Cpu } from 'lucide-react';
import { SectionTitle } from '@/components/ui/GlassCard';

const features = [
  {
    icon: Brain,
    title: 'AI Energy Prediction',
    description: 'Machine learning models forecast your energy consumption, bills, and carbon emissions with 91% accuracy.',
    color: 'from-eco-500 to-eco-600',
  },
  {
    icon: TrendingDown,
    title: 'Cost Optimization',
    description: 'Identify exactly where energy is wasted and get prioritized recommendations to reduce your electricity bill.',
    color: 'from-amber-500 to-amber-600',
  },
  {
    icon: Zap,
    title: 'Real-time Monitoring',
    description: 'Track energy consumption across machines and departments in real-time with interactive dashboards.',
    color: 'from-energy-500 to-energy-600',
  },
  {
    icon: Leaf,
    title: 'Carbon Tracking',
    description: 'Monitor your carbon footprint and get AI suggestions to reduce emissions and meet sustainability goals.',
    color: 'from-eco-400 to-eco-500',
  },
  {
    icon: BarChart3,
    title: 'Advanced Analytics',
    description: 'Deep-dive into trends, peak hours, machine-wise consumption, and department-wise breakdowns.',
    color: 'from-energy-400 to-energy-500',
  },
  {
    icon: Bell,
    title: 'Smart Alerts',
    description: 'Get notified about high consumption, idle machines, peak usage, and maintenance needs before they cost you.',
    color: 'from-amber-400 to-amber-500',
  },
  {
    icon: Shield,
    title: 'Anomaly Detection',
    description: 'Isolation Forest AI detects abnormal energy spikes and energy leaks that manual audits miss.',
    color: 'from-eco-600 to-eco-700',
  },
  {
    icon: Cpu,
    title: 'AI Energy Consultant',
    description: 'Chat with an AI consultant that explains bills, suggests savings, and answers energy questions 24/7.',
    color: 'from-energy-600 to-energy-700',
  },
];

export function Features() {
  return (
    <section id="features" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <SectionTitle
          center
          title="Everything You Need to Optimize Energy"
          subtitle="From AI predictions to real-time monitoring, EcoWise gives you the tools to run an energy-efficient factory."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="glass-card p-6 hover:shadow-glow hover:-translate-y-1 transition-all duration-300 group"
            >
              <div className={`p-3 rounded-2xl bg-gradient-to-br ${feature.color} w-fit mb-4 group-hover:scale-110 transition-transform`}>
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-lg text-slate-900 dark:text-white mb-2">{feature.title}</h3>
              <p className="text-sm text-slate-600 dark:text-eco-200/70 leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
