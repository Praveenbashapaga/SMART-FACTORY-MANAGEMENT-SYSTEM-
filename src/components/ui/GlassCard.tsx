import { type ReactNode } from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';

interface GlassCardProps extends HTMLMotionProps<'div'> {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export function GlassCard({ children, className = '', hover = false, ...props }: GlassCardProps) {
  return (
    <motion.div
      className={`glass-card p-6 ${hover ? 'hover:shadow-glow transition-shadow duration-300' : ''} ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
}

interface StatCardProps {
  title: string;
  value: string;
  unit?: string;
  icon: ReactNode;
  trend?: { value: string; positive: boolean };
  color?: string;
  delay?: number;
}

export function StatCard({ title, value, unit, icon, trend, color = 'eco', delay = 0 }: StatCardProps) {
  const colorMap: Record<string, string> = {
    eco: 'from-eco-500/20 to-eco-600/10 text-eco-600 dark:text-eco-400',
    energy: 'from-energy-500/20 to-energy-600/10 text-energy-600 dark:text-energy-400',
    amber: 'from-amber-500/20 to-amber-600/10 text-amber-600 dark:text-amber-400',
    red: 'from-red-500/20 to-red-600/10 text-red-600 dark:text-red-400',
  blue: 'from-blue-500/20 to-blue-600/10 text-blue-600 dark:text-blue-400',
  purple: 'from-violet-500/20 to-violet-600/10 text-violet-600 dark:text-violet-400',
  pink: 'from-pink-500/20 to-pink-600/10 text-pink-600 dark:text-pink-400',
  teal: 'from-teal-500/20 to-teal-600/10 text-teal-600 dark:text-teal-400',
  rose: 'from-rose-500/20 to-rose-600/10 text-rose-600 dark:text-rose-400',
    cyan: 'from-cyan-500/20 to-cyan-600/10 text-cyan-600 dark:text-cyan-400',
    lime: 'from-lime-500/20 to-lime-600/10 text-lime-600 dark:text-lime-400',
    orange: 'from-orange-500/20 to-orange-600/10 text-orange-600 dark:text-orange-400',
  indigo: 'from-indigo-500/20 to-indigo-600/10 text-indigo-600 dark:text-indigo-400',
    fuchsia: 'from-fuchsia-500/20 to-fuchsia-600/10 text-fuchsia-600 dark:text-fuchsia-400',
  slate: 'from-slate-500/20 to-slate-600/10 text-slate-600 dark:text-slate-400',
  green: 'from-green-500/20 to-green-600/10 text-green-600 dark:text-green-400',
    sky: 'from-sky-500/20 to-sky-600/10 text-sky-600 dark:text-sky-400',
    violet: 'from-violet-500/20 to-violet-600/10 text-violet-600 dark:text-violet-400',
  emerald: 'from-emerald-500/20 to-emerald-600/10 text-emerald-600 dark:text-emerald-400',
    yellow: 'from-yellow-500/20 to-yellow-600/10 text-yellow-600 dark:text-yellow-400',
  stone: 'from-stone-500/20 to-stone-600/10 text-stone-600 dark:text-stone-400',
    zinc: 'from-zinc-500/20 to-zinc-600/10 text-zinc-600 dark:text-zinc-400',
    neutral: 'from-neutral-500/20 to-neutral-600/10 text-neutral-600 dark:text-neutral-400',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className="glass-card p-5 hover:shadow-glow transition-all duration-300 group"
    >
      <div className="flex items-start justify-between">
        <div className="min-w-0 flex-1">
          <p className="text-sm text-slate-500 dark:text-eco-300/70 font-medium">{title}</p>
          <div className="flex items-baseline gap-1 mt-2">
            <span className="text-2xl font-bold text-slate-900 dark:text-white font-display">{value}</span>
            {unit && <span className="text-sm text-slate-500 dark:text-eco-300/70">{unit}</span>}
          </div>
          {trend && (
            <div className={`flex items-center gap-1 mt-2 text-xs font-medium ${trend.positive ? 'text-eco-600 dark:text-eco-400' : 'text-red-500'}`}>
              <span>{trend.positive ? '↑' : '↓'}</span>
              <span>{trend.value}</span>
            </div>
          )}
        </div>
        <div className={`p-3 rounded-xl bg-gradient-to-br ${colorMap[color] ?? colorMap.eco} flex-shrink-0`}>
          {icon}
        </div>
      </div>
    </motion.div>
  );
}

export function SectionTitle({ title, subtitle, center = false }: { title: string; subtitle?: string; center?: boolean }) {
  return (
    <div className={`mb-8 ${center ? 'text-center' : ''}`}>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-3xl md:text-4xl font-bold font-display text-slate-900 dark:text-white text-balance"
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className={`mt-3 text-slate-600 dark:text-eco-200/70 text-lg ${center ? 'max-w-2xl mx-auto' : ''}`}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}

export function Badge({ children, variant = 'default' }: { children: ReactNode; variant?: 'default' | 'success' | 'warning' | 'danger' | 'info' }) {
  const variants = {
    default: 'bg-slate-100 text-slate-700 dark:bg-eco-800/40 dark:text-eco-200',
    success: 'bg-eco-100 text-eco-700 dark:bg-eco-500/20 dark:text-eco-300',
    warning: 'bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-300',
    danger: 'bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-300',
    info: 'bg-energy-100 text-energy-700 dark:bg-energy-500/20 dark:text-energy-300',
  };
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${variants[variant]}`}>
      {children}
    </span>
  );
}

export function LoadingSkeleton({ className = '' }: { className?: string }) {
  return <div className={`skeleton ${className}`} />;
}

export function PageLoader() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 rounded-full border-4 border-eco-500/20 border-t-eco-500 animate-spin" />
        <p className="text-slate-500 dark:text-eco-300/70 text-sm">Loading...</p>
      </div>
    </div>
  );
}
