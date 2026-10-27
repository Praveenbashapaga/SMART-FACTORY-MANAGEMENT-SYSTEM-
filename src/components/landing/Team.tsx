import { motion } from 'framer-motion';
import { Linkedin, Twitter, Github } from 'lucide-react';
import { SectionTitle } from '@/components/ui/GlassCard';

const team = [
  {
    name: 'Dr. Arjun Mehta',
    role: 'Founder & Chief AI Engineer',
    bio: 'PhD in Machine Learning. 12+ years building industrial AI systems for energy optimization.',
    avatar: 'AM',
    gradient: 'from-eco-500 to-eco-700',
  },
  {
    name: 'Kavya Nair',
    role: 'Head of Product',
    bio: 'Former product lead at Schneider Electric. Passionate about sustainable manufacturing.',
    avatar: 'KN',
    gradient: 'from-energy-500 to-energy-700',
  },
  {
    name: 'Rahul Verma',
    role: 'Lead Data Scientist',
    bio: 'Expert in time-series forecasting and anomaly detection. Built the EcoWise prediction engine.',
    avatar: 'RV',
    gradient: 'from-amber-500 to-amber-700',
  },
  {
    name: 'Sneha Patel',
    role: 'Full-Stack Engineer',
    bio: 'Builds the real-time dashboards and AI chatbot. React + FastAPI specialist.',
    avatar: 'SP',
    gradient: 'from-eco-400 to-energy-500',
  },
];

export function Team() {
  return (
    <section id="team" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <SectionTitle
          center
          title="Meet the Team"
          subtitle="A team of AI engineers, data scientists, and product builders dedicated to making factories energy-smart."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {team.map((member, i) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="glass-card p-6 text-center hover:shadow-glow transition-all duration-300 group"
            >
              <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${member.gradient} mx-auto mb-4 flex items-center justify-center text-white font-bold text-xl group-hover:scale-110 transition-transform shadow-glow`}>
                {member.avatar}
              </div>
              <h3 className="font-semibold text-slate-900 dark:text-white">{member.name}</h3>
              <p className="text-sm gradient-text font-medium mb-3">{member.role}</p>
              <p className="text-xs text-slate-600 dark:text-eco-200/70 leading-relaxed mb-4">{member.bio}</p>
              <div className="flex justify-center gap-2">
                {[Linkedin, Twitter, Github].map((Icon, idx) => (
                  <a
                    key={idx}
                    href="#"
                    className="p-2 rounded-lg glass hover:scale-110 hover:text-eco-500 transition-all"
                    aria-label="Social"
                  >
                    <Icon className="w-3.5 h-3.5" />
                  </a>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
