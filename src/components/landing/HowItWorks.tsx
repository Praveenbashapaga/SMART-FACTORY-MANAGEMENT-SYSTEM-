import { motion } from 'framer-motion';
import { Upload, Cpu, Brain, FileCheck } from 'lucide-react';
import { SectionTitle } from '@/components/ui/GlassCard';

const steps = [
  {
    icon: Upload,
    title: 'Connect Your Data',
    description: 'Upload your energy meter readings via CSV or connect your factory sensors. EcoWise ingests consumption data, machine logs, and electricity bills.',
    step: '01',
  },
  {
    icon: Cpu,
    title: 'AI Analysis',
    description: 'Random Forest, Gradient Boosting, and Isolation Forest models analyze your data to detect patterns, anomalies, and inefficiencies.',
    step: '02',
  },
  {
    icon: Brain,
    title: 'Predict & Recommend',
    description: 'The engine predicts future consumption, bills, and carbon emissions, then generates prioritized, actionable recommendations.',
    step: '03',
  },
  {
    icon: FileCheck,
    title: 'Act & Save',
    description: 'Follow AI recommendations, track savings on your dashboard, and generate reports for stakeholders — all in one place.',
    step: '04',
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <SectionTitle
          center
          title="How AI Works"
          subtitle="Four steps from raw data to energy savings — powered by machine learning."
        />

        <div className="relative">
          {/* Connection line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-eco-500/0 via-eco-500/30 to-eco-500/0 -translate-y-1/2" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            {steps.map((step, i) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.15 }}
                className="relative"
              >
                <div className="glass-card p-6 h-full hover:shadow-glow transition-all duration-300">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 rounded-2xl bg-gradient-to-br from-eco-500 to-eco-600 shadow-glow">
                      <step.icon className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-4xl font-bold font-display gradient-text opacity-50">{step.step}</span>
                  </div>
                  <h3 className="font-semibold text-lg text-slate-900 dark:text-white mb-2">{step.title}</h3>
                  <p className="text-sm text-slate-600 dark:text-eco-200/70 leading-relaxed">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
