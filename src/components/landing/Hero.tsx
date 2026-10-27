import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Zap, TrendingDown, Leaf, ArrowRight, Cpu, Activity, BarChart3 } from 'lucide-react';

export function Hero() {
  const stats = [
    { icon: TrendingDown, value: '28%', label: 'Avg. Energy Reduction', color: 'text-eco-500' },
    { icon: Zap, value: '₹1.3L', label: 'Annual Savings', color: 'text-amber-500' },
    { icon: Leaf, value: '52K kg', label: 'CO₂ Reduced / yr', color: 'text-energy-500' },
    { icon: Activity, value: '91%', label: 'AI Confidence', color: 'text-eco-400' },
  ];

  return (
    <section className="relative min-h-screen flex items-center pt-20 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-eco-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-eco-500" />
              </span>
              <span className="text-sm font-medium text-slate-600 dark:text-eco-200">
                AI-Powered Energy Intelligence
              </span>
            </motion.div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-display text-slate-900 dark:text-white leading-[1.1] text-balance">
              Make Your Factory <span className="gradient-text">Energy Smart</span> with AI
            </h1>

            <p className="mt-6 text-lg text-slate-600 dark:text-eco-200/70 max-w-xl leading-relaxed">
              EcoWise AI analyzes your factory's energy consumption, predicts future usage, and gives you
              actionable recommendations to cut costs and carbon — powered by machine learning.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Link to="/register" className="btn-primary inline-flex items-center justify-center gap-2 group">
                Start Free Analysis
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="/dashboard" className="btn-secondary inline-flex items-center justify-center gap-2">
                <BarChart3 className="w-4 h-4" />
                View Demo Dashboard
              </Link>
            </div>

            {/* Stats */}
            <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + i * 0.1 }}
                  className="glass-card p-4 text-center"
                >
                  <stat.icon className={`w-5 h-5 mx-auto mb-2 ${stat.color}`} />
                  <p className="text-2xl font-bold font-display text-slate-900 dark:text-white">{stat.value}</p>
                  <p className="text-xs text-slate-500 dark:text-eco-300/60 mt-1">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right: AI Illustration */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative"
          >
            <HeroIllustration />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function HeroIllustration() {
  return (
    <div className="relative w-full aspect-square max-w-lg mx-auto">
      {/* Central glow */}
      <motion.div
        animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute inset-0 rounded-full bg-gradient-to-br from-eco-500/20 to-energy-500/20 blur-3xl"
      />

      {/* Central card */}
      <motion.div
        animate={{ y: [0, -15, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute inset-8 glass-card p-8 flex flex-col items-center justify-center"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          className="p-6 rounded-3xl bg-gradient-to-br from-eco-500 to-eco-700 shadow-glow-lg mb-6"
        >
          <Cpu className="w-16 h-16 text-white" />
        </motion.div>

        <h3 className="text-xl font-bold font-display text-slate-900 dark:text-white mb-2">EcoWise AI Engine</h3>
        <p className="text-sm text-slate-500 dark:text-eco-300/60 text-center mb-6">
          Real-time energy optimization
        </p>

        {/* Mini metrics */}
        <div className="w-full space-y-3">
          {[
            { label: 'Energy Score', value: 78, color: 'bg-eco-500' },
            { label: 'Efficiency', value: 85, color: 'bg-energy-500' },
            { label: 'Carbon Index', value: 62, color: 'bg-amber-500' },
          ].map((metric, i) => (
            <div key={metric.label} className="w-full">
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-600 dark:text-eco-200">{metric.label}</span>
                <span className="text-slate-900 dark:text-white font-semibold">{metric.value}%</span>
              </div>
              <div className="h-2 rounded-full bg-slate-200 dark:bg-eco-800/50 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${metric.value}%` }}
                  transition={{ duration: 1, delay: 0.8 + i * 0.2 }}
                  className={`h-full rounded-full ${metric.color}`}
                />
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Floating icons */}
      {[
        { Icon: Zap, pos: 'top-0 right-8', delay: 0, color: 'text-amber-500' },
        { Icon: Leaf, pos: 'bottom-12 left-0', delay: 1, color: 'text-eco-500' },
        { Icon: Activity, pos: 'top-16 left-4', delay: 2, color: 'text-energy-500' },
        { Icon: TrendingDown, pos: 'bottom-0 right-4', delay: 1.5, color: 'text-eco-400' },
      ].map(({ Icon, pos, delay, color }, i) => (
        <motion.div
          key={i}
          className={`absolute ${pos} p-3 glass rounded-2xl`}
          animate={{ y: [0, -12, 0], rotate: [0, 5, 0] }}
          transition={{ duration: 5 + i, repeat: Infinity, delay, ease: 'easeInOut' }}
        >
          <Icon className={`w-6 h-6 ${color}`} />
        </motion.div>
      ))}
    </div>
  );
}
