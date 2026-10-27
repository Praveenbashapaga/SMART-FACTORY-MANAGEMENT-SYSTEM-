import { type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Leaf, Sun, Moon } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

export function AuthLayout({ children, title, subtitle }: { children: ReactNode; title: string; subtitle: string }) {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen flex">
      {/* Left side - branding */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-eco-gradient items-center justify-center p-12 overflow-hidden">
        <div className="absolute inset-0 bg-eco-radial" />
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-eco-400/10 blur-2xl"
            style={{ width: 200 + i * 50, height: 200 + i * 50, left: `${(i * 20) % 80}%`, top: `${(i * 15) % 70}%` }}
            animate={{ y: [0, -30, 0], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 6 + i, repeat: Infinity, delay: i * 0.5 }}
          />
        ))}
        <div className="relative z-10 max-w-md text-white">
          <Link to="/" className="flex items-center gap-2 mb-12">
            <div className="p-2.5 rounded-xl bg-white/10 backdrop-blur-md">
              <Leaf className="w-6 h-6 text-eco-300" />
            </div>
            <span className="font-display font-bold text-2xl">EcoWise AI</span>
          </Link>
          <h2 className="text-3xl font-bold font-display mb-4 leading-tight">
            Make your factory energy-smart with AI
          </h2>
          <p className="text-eco-100/80 text-lg leading-relaxed mb-8">
            Join hundreds of factories saving up to ₹1.3L annually with AI-powered energy optimization.
          </p>
          <div className="grid grid-cols-3 gap-4">
            {[
              { value: '28%', label: 'Energy Saved' },
              { value: '₹1.3L', label: 'Avg. Savings' },
              { value: '91%', label: 'AI Accuracy' },
            ].map((stat) => (
              <div key={stat.label} className="glass-card p-4 text-center bg-white/5 border-white/10">
                <p className="text-2xl font-bold font-display">{stat.value}</p>
                <p className="text-xs text-eco-100/60 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right side - form */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-eco-50 to-white dark:from-eco-950 dark:to-eco-900" />
        <button
          onClick={toggleTheme}
          className="absolute top-6 right-6 p-2.5 rounded-xl glass hover:scale-105 transition-transform z-10"
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-eco-600" />}
        </button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative z-10 w-full max-w-md"
        >
          <Link to="/" className="lg:hidden flex items-center gap-2 mb-8">
            <div className="p-2 rounded-xl bg-gradient-to-br from-eco-500 to-eco-600">
              <Leaf className="w-5 h-5 text-white" />
            </div>
            <span className="font-display font-bold text-xl text-slate-900 dark:text-white">
              EcoWise<span className="gradient-text"> AI</span>
            </span>
          </Link>

          <h1 className="text-2xl md:text-3xl font-bold font-display text-slate-900 dark:text-white mb-2">{title}</h1>
          <p className="text-slate-600 dark:text-eco-200/70 mb-8">{subtitle}</p>

          {children}
        </motion.div>
      </div>
    </div>
  );
}
