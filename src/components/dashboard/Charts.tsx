import { type ReactNode } from 'react';
import {
  LineChart, Line, BarChart, Bar, AreaChart, Area, PieChart, Pie, Cell,
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, RadialBarChart, RadialBar, Legend,
} from 'recharts';
import { useTheme } from '@/contexts/ThemeContext';

const COLORS = ['#22c55e', '#06b6d4', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#14b8a6', '#f97316'];

interface ChartCardProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
  action?: ReactNode;
  className?: string;
}

export function ChartCard({ title, subtitle, children, action, className = '' }: ChartCardProps) {
  return (
    <div className={`glass-card p-5 ${className}`}>
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="font-semibold text-slate-900 dark:text-white text-sm md:text-base">{title}</h3>
          {subtitle && <p className="text-xs text-slate-500 dark:text-eco-300/60 mt-0.5">{subtitle}</p>}
        </div>
        {action}
      </div>
      {children}
    </div>
  );
}

export function useChartColors() {
  const { theme } = useTheme();
  return {
    grid: theme === 'dark' ? 'rgba(134,239,172,0.1)' : 'rgba(148,163,184,0.15)',
    axis: theme === 'dark' ? '#86efac' : '#64748b',
    tooltipBg: theme === 'dark' ? '#14532d' : '#ffffff',
    tooltipBorder: theme === 'dark' ? 'rgba(134,239,172,0.2)' : 'rgba(148,163,184,0.2)',
    tooltipText: theme === 'dark' ? '#f0fdf4' : '#0f172a',
  };
}

function CustomTooltip({ active, payload, label }: any) {
  const colors = useChartColors();
  if (!active || !payload?.length) return null;
  return (
    <div
      className="glass-card p-3 text-xs"
      style={{ background: colors.tooltipBg, borderColor: colors.tooltipBorder }}
    >
      <p className="font-semibold mb-1" style={{ color: colors.tooltipText }}>{label}</p>
      {payload.map((entry: any, i: number) => (
        <p key={i} style={{ color: entry.color || colors.tooltipText }}>
          {entry.name}: {typeof entry.value === 'number' ? entry.value.toLocaleString() : entry.value}
        </p>
      ))}
    </div>
  );
}

interface LineChartProps {
  data: any[];
  xKey: string;
  lines: { key: string; label: string; color?: string }[];
  height?: number;
}

export function EcoLineChart({ data, xKey, lines, height = 250 }: LineChartProps) {
  const colors = useChartColors();
  return (
    <ResponsiveContainer width="100%" height={height}>
      <LineChart data={data} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke={colors.grid} />
        <XAxis dataKey={xKey} stroke={colors.axis} fontSize={11} tickLine={false} axisLine={false} />
        <YAxis stroke={colors.axis} fontSize={11} tickLine={false} axisLine={false} />
        <Tooltip content={<CustomTooltip />} />
        {lines.map((line, i) => (
          <Line
            key={line.key}
            type="monotone"
            dataKey={line.key}
            name={line.label}
            stroke={line.color ?? COLORS[i % COLORS.length]}
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 5 }}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
}

interface BarChartProps {
  data: any[];
  xKey: string;
  bars: { key: string; label: string; color?: string }[];
  height?: number;
}

export function EcoBarChart({ data, xKey, bars, height = 250 }: BarChartProps) {
  const colors = useChartColors();
  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart data={data} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke={colors.grid} />
        <XAxis dataKey={xKey} stroke={colors.axis} fontSize={11} tickLine={false} axisLine={false} />
        <YAxis stroke={colors.axis} fontSize={11} tickLine={false} axisLine={false} />
        <Tooltip content={<CustomTooltip />} />
        {bars.map((bar, i) => (
          <Bar key={bar.key} dataKey={bar.key} name={bar.label} fill={bar.color ?? COLORS[i % COLORS.length]} radius={[6, 6, 0, 0]} />
        ))}
      </BarChart>
    </ResponsiveContainer>
  );
}

interface AreaChartProps {
  data: any[];
  xKey: string;
  areas: { key: string; label: string; color?: string }[];
  height?: number;
}

export function EcoAreaChart({ data, xKey, areas, height = 250 }: AreaChartProps) {
  const colors = useChartColors();
  return (
    <ResponsiveContainer width="100%" height={height}>
      <AreaChart data={data} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
        <defs>
          {areas.map((area, i) => (
            <linearGradient key={area.key} id={`gradient-${area.key}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={area.color ?? COLORS[i % COLORS.length]} stopOpacity={0.4} />
              <stop offset="100%" stopColor={area.color ?? COLORS[i % COLORS.length]} stopOpacity={0} />
            </linearGradient>
          ))}
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke={colors.grid} />
        <XAxis dataKey={xKey} stroke={colors.axis} fontSize={11} tickLine={false} axisLine={false} />
        <YAxis stroke={colors.axis} fontSize={11} tickLine={false} axisLine={false} />
        <Tooltip content={<CustomTooltip />} />
        {areas.map((area, i) => (
          <Area
            key={area.key}
            type="monotone"
            dataKey={area.key}
            name={area.label}
            stroke={area.color ?? COLORS[i % COLORS.length]}
            strokeWidth={2}
            fill={`url(#gradient-${area.key})`}
          />
        ))}
      </AreaChart>
    </ResponsiveContainer>
  );
}

interface PieChartProps {
  data: any[];
  dataKey: string;
  nameKey: string;
  height?: number;
}

export function EcoPieChart({ data, dataKey, nameKey, height = 250 }: PieChartProps) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <PieChart>
        <Pie
          data={data}
          dataKey={dataKey}
          nameKey={nameKey}
          cx="50%"
          cy="50%"
          innerRadius={50}
          outerRadius={80}
          paddingAngle={3}
        >
          {data.map((_, i) => (
            <Cell key={i} fill={COLORS[i % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip content={<CustomTooltip />} />
        <Legend
          wrapperStyle={{ fontSize: 11 }}
          iconType="circle"
        />
      </PieChart>
    </ResponsiveContainer>
  );
}

interface RadarChartProps {
  data: any[];
  dataKey: string;
  height?: number;
}

export function EcoRadarChart({ data, dataKey, height = 250 }: RadarChartProps) {
  const colors = useChartColors();
  return (
    <ResponsiveContainer width="100%" height={height}>
      <RadarChart data={data}>
        <PolarGrid stroke={colors.grid} />
        <PolarAngleAxis dataKey="metric" stroke={colors.axis} fontSize={11} />
        <PolarRadiusAxis stroke={colors.axis} fontSize={10} angle={90} domain={[0, 100]} />
        <Radar dataKey={dataKey} stroke="#22c55e" fill="#22c55e" fillOpacity={0.3} strokeWidth={2} />
        <Tooltip content={<CustomTooltip />} />
      </RadarChart>
    </ResponsiveContainer>
  );
}

interface ScatterChartProps {
  data: any[];
  xKey: string;
  yKey: string;
  height?: number;
}

export function EcoScatterChart({ data, xKey, yKey, height = 250 }: ScatterChartProps) {
  const colors = useChartColors();
  return (
    <ResponsiveContainer width="100%" height={height}>
      <ScatterChart margin={{ top: 10, right: 10, left: -20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke={colors.grid} />
        <XAxis dataKey={xKey} stroke={colors.axis} fontSize={11} tickLine={false} axisLine={false} name="Utilization %" unit="%" />
        <YAxis dataKey={yKey} stroke={colors.axis} fontSize={11} tickLine={false} axisLine={false} name="Consumption" />
        <Tooltip content={<CustomTooltip />} cursor={{ strokeDasharray: '3 3' }} />
        <Scatter data={data} fill="#06b6d4" />
      </ScatterChart>
    </ResponsiveContainer>
  );
}

interface GaugeChartProps {
  value: number;
  label: string;
  height?: number;
}

export function EcoGaugeChart({ value, label, height = 200 }: GaugeChartProps) {
  const data = [{ name: label, value, fill: value > 75 ? '#22c55e' : value > 50 ? '#f59e0b' : '#ef4444' }];
  const colors = useChartColors();
  return (
    <div className="relative">
      <ResponsiveContainer width="100%" height={height}>
        <RadialBarChart
          cx="50%"
          cy="50%"
          innerRadius="65%"
          outerRadius="100%"
          data={data}
          startAngle={180}
          endAngle={0}
        >
          <defs>
            <linearGradient id="gauge-gradient" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#22c55e" />
              <stop offset="100%" stopColor="#06b6d4" />
            </linearGradient>
          </defs>
          <PolarAngleAxis type="number" domain={[0, 100]} angleAxisId={0} tick={false} />
          <RadialBar background={{ fill: colors.grid }} dataKey="value" cornerRadius={10} fill="url(#gauge-gradient)" />
        </RadialBarChart>
      </ResponsiveContainer>
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        <span className="text-3xl font-bold font-display text-slate-900 dark:text-white">{value}</span>
        <span className="text-xs text-slate-500 dark:text-eco-300/60">{label}</span>
      </div>
    </div>
  );
}

interface HeatmapProps {
  data: { day: string; hour: string; value: number }[];
}

export function EcoHeatmap({ data }: HeatmapProps) {
  const maxValue = Math.max(...data.map((d) => d.value));
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const hours = ['00', '04', '08', '12', '16', '20'];

  const getColor = (value: number) => {
    const intensity = value / maxValue;
    if (intensity > 0.75) return 'bg-eco-600';
    if (intensity > 0.5) return 'bg-eco-500';
    if (intensity > 0.25) return 'bg-eco-400';
    return 'bg-eco-300';
  };

  return (
    <div className="overflow-x-auto scrollbar-custom">
      <div className="min-w-[400px]">
        <div className="grid grid-cols-7 gap-1 mb-1">
          <div></div>
          {hours.map((h) => (
            <div key={h} className="text-center text-xs text-slate-500 dark:text-eco-300/60">{h}:00</div>
          ))}
        </div>
        {days.map((day) => (
          <div key={day} className="grid grid-cols-7 gap-1 mb-1">
            <div className="text-xs text-slate-500 dark:text-eco-300/60 flex items-center">{day}</div>
            {hours.map((h) => {
              const cell = data.find((d) => d.day === day && d.hour === `${h}:00`);
              return (
                <div
                  key={`${day}-${h}`}
                  className={`aspect-square rounded-lg ${getColor(cell?.value ?? 0)} flex items-center justify-center text-xs font-medium text-white/90 hover:scale-105 transition-transform cursor-pointer`}
                  title={`${day} ${h}:00 — ${cell?.value ?? 0} kWh`}
                >
                  {cell?.value ?? 0}
                </div>
              );
            })}
          </div>
        ))}
        <div className="flex items-center justify-end gap-2 mt-3 text-xs text-slate-500 dark:text-eco-300/60">
          <span>Low</span>
          <div className="flex gap-0.5">
            <div className="w-4 h-4 rounded bg-eco-300"></div>
            <div className="w-4 h-4 rounded bg-eco-400"></div>
            <div className="w-4 h-4 rounded bg-eco-500"></div>
            <div className="w-4 h-4 rounded bg-eco-600"></div>
          </div>
          <span>High</span>
        </div>
      </div>
    </div>
  );
}
