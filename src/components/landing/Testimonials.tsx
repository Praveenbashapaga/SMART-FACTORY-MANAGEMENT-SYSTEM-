import { motion } from 'framer-motion';
import { Quote, Star } from 'lucide-react';
import { SectionTitle } from '@/components/ui/GlassCard';

const testimonials = [
  {
    name: 'Rajesh Kumar',
    role: 'Factory Manager, Shree Industries',
    content: 'EcoWise AI helped us cut our electricity bill by 24% in just 3 months. The compressor VFD recommendation alone saved us ₹32,000 a year. The AI chatbot is like having an energy consultant on call 24/7.',
    rating: 5,
    avatar: 'RK',
  },
  {
    name: 'Priya Sharma',
    role: 'Operations Director, Apex Manufacturing',
    content: 'The predictive maintenance alerts caught a bearing issue on our conveyor belt two weeks before it would have failed. That saved us an estimated ₹50,000 in downtime. The analytics dashboard is incredibly detailed.',
    rating: 5,
    avatar: 'PS',
  },
  {
    name: 'Mohammed Ali',
    role: 'Owner, Khan Textiles',
    content: 'As a small factory owner, I never had access to this kind of energy intelligence. EcoWise showed me I was wasting 18% of my energy on idle machines. Simple changes, huge savings.',
    rating: 5,
    avatar: 'MA',
  },
  {
    name: 'Sunita Reddy',
    role: 'Plant Head, GreenLine Foods',
    content: 'The carbon tracking feature helped us qualify for the PAT scheme carbon credits. We reduced our CO₂ emissions by 22% and are now recognized as a sustainability leader in our industry.',
    rating: 5,
    avatar: 'SR',
  },
  {
    name: 'Vikram Singh',
    role: 'CEO, Singh Auto Parts',
    content: 'The AI predictions are remarkably accurate. The forecasted bill was within 3% of our actual bill. The off-peak scheduling recommendation saved us ₹24,000 with zero investment.',
    rating: 5,
    avatar: 'VS',
  },
  {
    name: 'Anita Desai',
    role: 'Energy Manager, Pinnacle Plastics',
    content: 'EcoWise replaced our manual energy audits entirely. The real-time monitoring and anomaly detection catch issues we would have missed. The reports are professional and stakeholder-ready.',
    rating: 5,
    avatar: 'AD',
  },
];

export function Testimonials() {
  return (
    <section id="testimonials" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <SectionTitle
          center
          title="Trusted by Factory Managers"
          subtitle="See how small factories across India are saving energy and money with EcoWise AI."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="glass-card p-6 hover:shadow-glow transition-all duration-300 relative overflow-hidden"
            >
              <Quote className="absolute top-4 right-4 w-10 h-10 text-eco-500/10" />
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, idx) => (
                  <Star key={idx} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-sm text-slate-600 dark:text-eco-200/70 leading-relaxed mb-6">{t.content}</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-eco-500 to-energy-500 flex items-center justify-center text-white font-semibold text-sm">
                  {t.avatar}
                </div>
                <div>
                  <p className="font-semibold text-slate-900 dark:text-white text-sm">{t.name}</p>
                  <p className="text-xs text-slate-500 dark:text-eco-300/60">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
