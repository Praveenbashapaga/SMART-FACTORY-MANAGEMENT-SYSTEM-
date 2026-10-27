import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, MessageCircle } from 'lucide-react';
import { SectionTitle } from '@/components/ui/GlassCard';

export function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', company: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setForm({ name: '', email: '', company: '', message: '' });
    }, 3000);
  };

  const contactInfo = [
    { icon: Mail, label: 'Email', value: 'hello@ecowise.ai' },
    { icon: Phone, label: 'Phone', value: '+91 80 4567 8900' },
    { icon: MapPin, label: 'Office', value: 'Bengaluru, Karnataka, India' },
  ];

  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <SectionTitle
          center
          title="Get in Touch"
          subtitle="Have questions? Want a demo? Our team is ready to help your factory become energy-smart."
        />

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {contactInfo.map((info) => (
              <div key={info.label} className="glass-card p-5 flex items-center gap-4 hover:shadow-glow transition-all">
                <div className="p-3 rounded-2xl bg-gradient-to-br from-eco-500 to-eco-600">
                  <info.icon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 dark:text-eco-300/60 uppercase tracking-wide">{info.label}</p>
                  <p className="font-semibold text-slate-900 dark:text-white">{info.value}</p>
                </div>
              </div>
            ))}

            <div className="glass-card p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2.5 rounded-xl bg-gradient-to-br from-eco-500 to-energy-500">
                  <MessageCircle className="w-5 h-5 text-white" />
                </div>
                <h3 className="font-semibold text-slate-900 dark:text-white">Talk to our AI Consultant</h3>
              </div>
              <p className="text-sm text-slate-600 dark:text-eco-200/70 mb-4">
                Get instant answers about energy efficiency, savings potential, and government schemes — no waiting required.
              </p>
              <a href="/dashboard/chatbot" className="btn-primary inline-flex items-center gap-2 text-sm">
                <MessageCircle className="w-4 h-4" />
                Chat with AI
              </a>
            </div>
          </motion.div>

          {/* Contact form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-card p-8"
          >
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="h-full flex flex-col items-center justify-center text-center py-12"
              >
                <div className="p-4 rounded-full bg-eco-500/20 mb-4">
                  <Send className="w-8 h-8 text-eco-500" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Message Sent!</h3>
                <p className="text-sm text-slate-600 dark:text-eco-200/70">We'll get back to you within 24 hours.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-eco-200 mb-1.5">Name</label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="glass-input"
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-eco-200 mb-1.5">Email</label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="glass-input"
                    placeholder="you@factory.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-eco-200 mb-1.5">Factory / Company</label>
                  <input
                    type="text"
                    value={form.company}
                    onChange={(e) => setForm({ ...form, company: e.target.value })}
                    className="glass-input"
                    placeholder="Your factory name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-eco-200 mb-1.5">Message</label>
                  <textarea
                    required
                    rows={4}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="glass-input resize-none"
                    placeholder="Tell us about your factory and energy goals..."
                  />
                </div>
                <button type="submit" className="btn-primary w-full inline-flex items-center justify-center gap-2">
                  <Send className="w-4 h-4" />
                  Send Message
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
