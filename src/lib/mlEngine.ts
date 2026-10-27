// EcoWise AI — Simulated ML Engine
// Mirrors the Python backend (Random Forest, Gradient Boosting, XGBoost,
// Linear Regression, Isolation Forest) with deterministic mock predictions.

export interface PredictionResult {
  energy_score: number;
  factory_health: number;
  risk_level: 'Low' | 'Medium' | 'High';
  predicted_consumption: number;
  estimated_bill: number;
  estimated_savings: number;
  carbon_reduction: number;
  confidence_score: number;
  efficiency_pct: number;
  sustainability_index: number;
  carbon_index: number;
}

export interface Recommendation {
  id: string;
  title: string;
  description: string;
  category: string;
  priority: 'High' | 'Medium' | 'Low';
  estimated_savings_inr: number;
}

export interface Anomaly {
  id: string;
  machine: string;
  type: string;
  severity: 'Critical' | 'Warning' | 'Info';
  description: string;
  detected_at: string;
}

export interface Alert {
  id: string;
  type: 'high_consumption' | 'idle_machine' | 'peak_usage' | 'maintenance';
  title: string;
  message: string;
  severity: 'Critical' | 'Warning' | 'Info';
}

const MACHINES = [
  'Compressor Unit A',
  'Hydraulic Press B',
  'Conveyor Belt C',
  'Welding Station D',
  'CNC Machine E',
  'Cooling Tower F',
];

const DEPARTMENTS = ['Production', 'Assembly', 'Packaging', 'Quality Control', 'Maintenance'];

// Deterministic pseudo-random based on seed
function seededRandom(seed: number): number {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

function seededRange(seed: number, min: number, max: number): number {
  return min + seededRandom(seed) * (max - min);
}

export function generatePrediction(factorySize: number = 1000): PredictionResult {
  const baseConsumption = factorySize * 1.2;
  const predicted = Math.round(seededRange(7, baseConsumption * 0.9, baseConsumption * 1.15));
  const bill = Math.round(predicted * 8.5);
  const savings = Math.round(bill * 0.18);
  const carbon = Math.round(predicted * 0.82);
  const carbonReduction = Math.round(carbon * 0.22);
  const efficiency = Math.round(seededRange(11, 62, 88));
  const energyScore = Math.round(seededRange(13, 55, 92));
  const health = Math.round(seededRange(17, 60, 90));
  const risk: PredictionResult['risk_level'] = energyScore > 75 ? 'Low' : energyScore > 50 ? 'Medium' : 'High';

  return {
    energy_score: energyScore,
    factory_health: health,
    risk_level: risk,
    predicted_consumption: predicted,
    estimated_bill: bill,
    estimated_savings: savings,
    carbon_reduction: carbonReduction,
    confidence_score: Math.round(seededRange(23, 82, 97)),
    efficiency_pct: efficiency,
    sustainability_index: Math.round(seededRange(31, 58, 85)),
    carbon_index: Math.round(seededRange(41, 40, 72)),
  };
}

export function generateRecommendations(): Recommendation[] {
  const recs: Omit<Recommendation, 'id'>[] = [
    {
      title: 'Turn off idle machines during breaks',
      description: 'CNC Machine E and Welding Station D are running idle for 3+ hours daily. Scheduling automatic shutdowns during lunch and shift changes can save significant energy.',
      category: 'Operational',
      priority: 'High',
      estimated_savings_inr: 18500,
    },
    {
      title: 'Reduce compressor runtime',
      description: 'Compressor Unit A operates at 92% capacity but only 60% is utilized. Install a variable frequency drive (VFD) to match output to demand.',
      category: 'Equipment',
      priority: 'High',
      estimated_savings_inr: 32000,
    },
    {
      title: 'Operate heavy machines after 8 PM',
      description: 'Shifting Hydraulic Press B operations to off-peak hours (8 PM - 6 AM) leverages lower electricity tariffs, reducing costs by up to 22%.',
      category: 'Scheduling',
      priority: 'Medium',
      estimated_savings_inr: 24000,
    },
    {
      title: 'Schedule preventive maintenance',
      description: 'Conveyor Belt C shows 14% efficiency drop over 3 months. Bearing wear detected — schedule maintenance within 7 days to prevent failure.',
      category: 'Maintenance',
      priority: 'Medium',
      estimated_savings_inr: 9500,
    },
    {
      title: 'Upgrade inefficient motors to IE4 efficiency class',
      description: '3 motors across the facility are IE2 class. Upgrading to IE4 premium efficiency motors yields 6-8% energy savings with 18-month payback.',
      category: 'Equipment',
      priority: 'Medium',
      estimated_savings_inr: 41000,
    },
    {
      title: 'Replace fluorescent lighting with LED',
      description: 'Switching all facility lighting to LED reduces lighting energy consumption by 65% and lowers maintenance costs.',
      category: 'Lighting',
      priority: 'Low',
      estimated_savings_inr: 12700,
    },
    {
      title: 'Recover waste heat from Cooling Tower F',
      description: 'Exhaust heat can pre-heat water for cleaning processes, reducing boiler load by an estimated 15%.',
      category: 'Heat Recovery',
      priority: 'Low',
      estimated_savings_inr: 16300,
    },
    {
      title: 'Install power factor correction capacitors',
      description: 'Current power factor is 0.78. Correcting to 0.95 reduces reactive power charges and transformer losses.',
      category: 'Electrical',
      priority: 'Medium',
      estimated_savings_inr: 21000,
    },
  ];

  return recs.map((r, i) => ({ ...r, id: `rec-${i + 1}` }));
}

export function generateAnomalies(): Anomaly[] {
  return [
    {
      id: 'anom-1',
      machine: 'Compressor Unit A',
      type: 'Energy Spike',
      severity: 'Critical',
      description: 'Consumption 34% above baseline detected at 14:30. Possible air leak in distribution line.',
      detected_at: '2 hours ago',
    },
    {
      id: 'anom-2',
      machine: 'Welding Station D',
      type: 'Idle Consumption',
      severity: 'Warning',
      description: 'Drawing 4.2 kW while idle for 2.5 hours. Standby mode not engaging.',
      detected_at: '5 hours ago',
    },
    {
      id: 'anom-3',
      machine: 'Cooling Tower F',
      type: 'Efficiency Drop',
      severity: 'Warning',
      description: 'Heat exchange efficiency down 12% over 7 days. Scaling suspected.',
      detected_at: '1 day ago',
    },
  ];
}

export function generateAlerts(): Alert[] {
  return [
    {
      id: 'alert-1',
      type: 'high_consumption',
      title: 'High Consumption Alert',
      message: 'Compressor Unit A consumption exceeded threshold by 34%',
      severity: 'Critical',
    },
    {
      id: 'alert-2',
      type: 'idle_machine',
      title: 'Idle Machine Detected',
      message: 'Welding Station D idle for 2.5 hours with 4.2 kW draw',
      severity: 'Warning',
    },
    {
      id: 'alert-3',
      type: 'peak_usage',
      title: 'Peak Usage Warning',
      message: 'Peak demand approaching contracted limit (92%)',
      severity: 'Warning',
    },
    {
      id: 'alert-4',
      type: 'maintenance',
      title: 'Maintenance Due',
      message: 'Conveyor Belt C bearing replacement overdue',
      severity: 'Info',
    },
  ];
}

// Time-series data generators
export function generateDailyConsumption(days: number = 30) {
  const data: { date: string; consumption: number; cost: number; carbon: number }[] = [];
  for (let i = days; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const base = 850 + Math.sin(i / 5) * 120;
    const noise = seededRange(i, -60, 60);
    const consumption = Math.round(base + noise);
    data.push({
      date: d.toISOString().split('T')[0],
      consumption,
      cost: Math.round(consumption * 8.5),
      carbon: Math.round(consumption * 0.82),
    });
  }
  return data;
}

export function generateWeeklyConsumption(weeks: number = 12) {
  const data: { week: string; consumption: number; target: number }[] = [];
  for (let i = weeks; i >= 1; i--) {
    const base = 5800 + seededRange(i + 100, -400, 400);
    data.push({
      week: `W${weeks - i + 1}`,
      consumption: Math.round(base),
      target: 5500,
    });
  }
  return data;
}

export function generateMonthlyConsumption(months: number = 12) {
  const data: { month: string; consumption: number; cost: number; carbon: number }[] = [];
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  for (let i = months; i >= 1; i--) {
    const d = new Date();
    d.setMonth(d.getMonth() - i + 1);
    const base = 24000 + seededRange(i + 200, -3000, 3000);
    data.push({
      month: monthNames[d.getMonth()],
      consumption: Math.round(base),
      cost: Math.round(base * 8.5),
      carbon: Math.round(base * 0.82),
    });
  }
  return data;
}

export function generateYearlyComparison() {
  return [
    { year: '2024', consumption: 285000, cost: 2422500, carbon: 233700 },
    { year: '2025', consumption: 268000, cost: 2278000, carbon: 219760 },
    { year: '2026', consumption: 251000, cost: 2133500, carbon: 205820 },
  ];
}

export function generateMachineConsumption() {
  return MACHINES.map((name, i) => ({
    machine: name,
    consumption: Math.round(seededRange(i + 300, 800, 3200)),
    efficiency: Math.round(seededRange(i + 310, 55, 92)),
  }));
}

export function generateDepartmentConsumption() {
  return DEPARTMENTS.map((name, i) => ({
    department: name,
    consumption: Math.round(seededRange(i + 400, 1200, 4800)),
    cost: Math.round(seededRange(i + 410, 10000, 40000)),
  }));
}

export function generatePeakHourAnalysis() {
  const hours = Array.from({ length: 24 }, (_, h) => {
    let base = 40;
    if (h >= 8 && h <= 18) base = 85 + Math.sin((h - 8) / 10 * Math.PI) * 30;
    if (h >= 19 && h <= 22) base = 65;
    if (h >= 0 && h <= 5) base = 25;
    return {
      hour: `${h.toString().padStart(2, '0')}:00`,
      consumption: Math.round(base + seededRange(h + 500, -8, 8)),
    };
  });
  return hours;
}

export function generateIdleHourAnalysis() {
  return [
    { period: '00:00 - 04:00', idle_pct: 78, wasted_kwh: 320 },
    { period: '04:00 - 08:00', idle_pct: 45, wasted_kwh: 180 },
    { period: '12:00 - 13:00', idle_pct: 62, wasted_kwh: 240 },
    { period: '18:00 - 22:00', idle_pct: 55, wasted_kwh: 210 },
    { period: '22:00 - 24:00', idle_pct: 85, wasted_kwh: 380 },
  ];
}

export function generateCarbonEmissions() {
  return generateMonthlyConsumption(12).map((m) => ({
    month: m.month,
    emissions: m.carbon,
    offset: Math.round(m.carbon * 0.15),
  }));
}

export function generateCostTrend() {
  return generateMonthlyConsumption(12).map((m) => ({
    month: m.month,
    cost: m.cost,
    savings: Math.round(m.cost * 0.15),
  }));
}

export function generateHeatmapData() {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const hours = ['00', '04', '08', '12', '16', '20'];
  const data: { day: string; hour: string; value: number }[] = [];
  days.forEach((day, di) => {
    hours.forEach((hour, hi) => {
      const h = parseInt(hour);
      let base = 30;
      if (h >= 8 && h <= 16) base = 85;
      if (day === 'Sat' || day === 'Sun') base *= 0.4;
      data.push({
        day,
        hour: `${hour}:00`,
        value: Math.round(base + seededRange(di * 10 + hi, -10, 10)),
      });
    });
  });
  return data;
}

export function generateMachineHealth() {
  return MACHINES.map((name, i) => ({
    machine: name,
    health: Math.round(seededRange(i + 600, 55, 98)),
    status: seededRange(i + 610, 0, 1) > 0.8 ? 'Warning' : 'Healthy',
    uptime: Math.round(seededRange(i + 620, 85, 99.5)),
  }));
}

export function generateForecast() {
  const nextWeek = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i + 1);
    return {
      date: d.toISOString().split('T')[0],
      predicted: Math.round(820 + seededRange(i + 700, -80, 80)),
      confidence_lower: Math.round(820 + seededRange(i + 700, -80, 80) - 60),
      confidence_upper: Math.round(820 + seededRange(i + 700, -80, 80) + 60),
    };
  });

  const nextMonthBill = Math.round(24000 * 8.5 * (1 + seededRange(800, -0.05, 0.08)));
  const expectedSavings = Math.round(nextMonthBill * 0.18);
  const futureCarbon = Math.round(24000 * 0.82 * (1 + seededRange(810, -0.08, 0.05)));

  return { nextWeek, nextMonthBill, expectedSavings, futureCarbon };
}

export function generateRadarData() {
  return [
    { metric: 'Efficiency', value: 78, fullMark: 100 },
    { metric: 'Sustainability', value: 65, fullMark: 100 },
    { metric: 'Cost Control', value: 72, fullMark: 100 },
    { metric: 'Maintenance', value: 84, fullMark: 100 },
    { metric: 'Carbon Footprint', value: 58, fullMark: 100 },
    { metric: 'Utilization', value: 81, fullMark: 100 },
  ];
}

export function generateScatterData() {
  return MACHINES.map((m, i) => ({
    name: m,
    utilization: Math.round(seededRange(i + 900, 40, 95)),
    consumption: Math.round(seededRange(i + 300, 800, 3200)),
  }));
}

export { MACHINES, DEPARTMENTS };
