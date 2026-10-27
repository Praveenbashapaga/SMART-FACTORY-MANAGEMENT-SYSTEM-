import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { SectionTitle } from '@/components/ui/GlassCard';

const faqs = [
  {
    q: 'How does EcoWise AI predict my energy consumption?',
    a: 'EcoWise uses machine learning models — Random Forest, Gradient Boosting, and Linear Regression — trained on your historical energy data. The models learn patterns in your consumption (time of day, day of week, seasonal trends, machine usage) and forecast future consumption with up to 91% accuracy.',
  },
  {
    q: 'Do I need to install any hardware or sensors?',
    a: 'No. You can start by uploading your electricity bills and energy meter readings via CSV. If you have IoT sensors or smart meters, you can connect them for real-time monitoring, but it is not required.',
  },
  {
    q: 'How much can I actually save?',
    a: 'Based on data from factories using EcoWise AI, the average savings are 18-28% on energy costs, translating to ₹80,000-₹1,30,000 per year for a typical small factory. The exact amount depends on your current efficiency and which recommendations you implement.',
  },
  {
    q: 'Is my factory data secure?',
    a: 'Yes. All data is encrypted in transit and at rest. Your energy data is isolated to your account — no other user can access it. We never share your data with third parties.',
  },
  {
    q: 'What types of factories does EcoWise AI support?',
    a: 'EcoWise works with any small to medium factory: manufacturing, textiles, food processing, auto parts, plastics, electronics, and more. If your factory uses electricity and has machines, EcoWise can help.',
  },
  {
    q: 'Can the AI chatbot really answer my energy questions?',
    a: 'The AI consultant is trained on industrial energy management, government schemes (PAT, KUSUM, BEE), and your factory data. It can explain your bills, suggest savings, recommend maintenance, and answer questions in English, Hindi, and Telugu.',
  },
  {
    q: 'How long does it take to see results?',
    a: 'You will get your first AI analysis and recommendations within minutes of uploading data. Implementing the "quick win" recommendations (like shifting loads to off-peak hours) can show savings on your next electricity bill.',
  },
  {
    q: 'What is the pricing?',
    a: 'EcoWise AI offers a free analysis for new users. Paid plans start at ₹2,999/month for full dashboard access, AI predictions, recommendations, and reports. Enterprise plans with custom integrations are also available.',
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <SectionTitle
          center
          title="Frequently Asked Questions"
          subtitle="Everything you need to know about EcoWise AI."
        />

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
              className="glass-card overflow-hidden"
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full px-6 py-4 flex items-center justify-between text-left"
              >
                <span className="font-semibold text-slate-900 dark:text-white text-sm md:text-base">{faq.q}</span>
                <ChevronDown
                  className={`w-5 h-5 text-eco-500 flex-shrink-0 transition-transform ${open === i ? 'rotate-180' : ''}`}
                />
              </button>
              <AnimatePresence>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <p className="px-6 pb-4 text-sm text-slate-600 dark:text-eco-200/70 leading-relaxed">{faq.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
