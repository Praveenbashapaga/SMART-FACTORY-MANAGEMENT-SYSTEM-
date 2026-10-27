import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FileText, Download, Mail, Printer, FileSpreadsheet, FileJson,
  Calendar, IndianRupee, Leaf, Zap, Check,
} from 'lucide-react';
import { SectionTitle, GlassCard, Badge } from '@/components/ui/GlassCard';
import { ChartCard, EcoLineChart, EcoBarChart, EcoPieChart } from '@/components/dashboard/Charts';
import { generateMonthlyConsumption, generatePrediction, generateMachineConsumption, generateDepartmentConsumption } from '@/lib/mlEngine';

export function ReportsPage() {
  const [reportType, setReportType] = useState('monthly');
  const [emailModal, setEmailModal] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [email, setEmail] = useState('');

  const prediction = generatePrediction();
  const monthlyData = generateMonthlyConsumption(12);
  const machineData = generateMachineConsumption();
  const deptData = generateDepartmentConsumption();

  const reportTypes = [
    { key: 'weekly', label: 'Weekly Report', icon: Calendar },
    { key: 'monthly', label: 'Monthly Report', icon: FileText },
    { key: 'quarterly', label: 'Quarterly Report', icon: FileText },
    { key: 'annual', label: 'Annual Report', icon: FileText },
  ];

  const exportFormats = [
    { label: 'PDF', icon: FileText, color: 'from-red-500 to-red-600' },
    { label: 'Excel', icon: FileSpreadsheet, color: 'from-eco-500 to-eco-600' },
    { label: 'CSV', icon: FileJson, color: 'from-energy-500 to-energy-600' },
    { label: 'Print', icon: Printer, color: 'from-amber-500 to-amber-600' },
  ];

  const handleExport = (format: string) => {
    // Simulate export
    const blob = new Blob([generateReportContent(format)], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ecowise-report-${reportType}-${Date.now()}.${format.toLowerCase() === 'pdf' ? 'txt' : format.toLowerCase() === 'excel' ? 'csv' : format.toLowerCase()}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const generateReportContent = (format: string) => {
    return `EcoWise AI — ${reportType.toUpperCase()} Energy Report
Generated: ${new Date().toLocaleString('en-IN')}

=== SUMMARY ===
Energy Score: ${prediction.energy_score}/100
Factory Health: ${prediction.factory_health}/100
Risk Level: ${prediction.risk_level}
Efficiency: ${prediction.efficiency_pct}%
AI Confidence: ${prediction.confidence_score}%

=== PREDICTIONS ===
Predicted Consumption: ${prediction.predicted_consumption} kWh
Estimated Bill: ₹${prediction.estimated_bill}
Estimated Savings: ₹${prediction.estimated_savings}
Carbon Reduction: ${prediction.carbon_reduction} kg CO₂

=== EXPORT FORMAT: ${format} ===
`;
  };

  const handleSendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    setEmailSent(true);
    setTimeout(() => {
      setEmailSent(false);
      setEmailModal(false);
      setEmail('');
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <SectionTitle title="Energy Reports" subtitle="Generate, export, and share professional energy reports" />

      {/* Report type selector */}
      <GlassCard>
        <h3 className="font-semibold text-slate-900 dark:text-white text-base mb-4">Select Report Type</h3>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {reportTypes.map((type) => (
            <button
              key={type.key}
              onClick={() => setReportType(type.key)}
              className={`p-4 rounded-xl text-left transition-all ${
                reportType === type.key
                  ? 'bg-gradient-to-br from-eco-500/20 to-eco-600/10 border border-eco-500/30'
                  : 'glass hover:bg-slate-100 dark:hover:bg-eco-800/30'
              }`}
            >
              <type.icon className={`w-5 h-5 mb-2 ${reportType === type.key ? 'text-eco-500' : 'text-slate-400'}`} />
              <p className={`text-sm font-medium ${reportType === type.key ? 'text-eco-700 dark:text-eco-300' : 'text-slate-700 dark:text-eco-200'}`}>
                {type.label}
              </p>
            </button>
          ))}
        </div>
      </GlassCard>

      {/* Report preview */}
      <ChartCard title={`${reportType.charAt(0).toUpperCase() + reportType.slice(1)} Report Preview`} subtitle="Key metrics and charts included in your report">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {[
            { label: 'Energy Score', value: `${prediction.energy_score}/100`, icon: Zap, color: 'text-eco-500' },
            { label: 'Total Bill', value: `₹${prediction.estimated_bill.toLocaleString('en-IN')}`, icon: IndianRupee, color: 'text-amber-500' },
            { label: 'Savings', value: `₹${prediction.estimated_savings.toLocaleString('en-IN')}`, icon: IndianRupee, color: 'text-eco-400' },
            { label: 'CO₂ Reduction', value: `${prediction.carbon_reduction} kg`, icon: Leaf, color: 'text-energy-500' },
          ].map((metric) => (
            <div key={metric.label} className="p-4 rounded-xl glass">
              <metric.icon className={`w-4 h-4 ${metric.color} mb-2`} />
              <p className="text-xs text-slate-500 dark:text-eco-300/60">{metric.label}</p>
              <p className="text-lg font-bold text-slate-900 dark:text-white">{metric.value}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div>
            <h4 className="text-sm font-medium text-slate-700 dark:text-eco-200 mb-2">Monthly Consumption Trend</h4>
            <EcoLineChart
              data={monthlyData}
              xKey="month"
              lines={[{ key: 'consumption', label: 'kWh', color: '#22c55e' }]}
              height={200}
            />
          </div>
          <div>
            <h4 className="text-sm font-medium text-slate-700 dark:text-eco-200 mb-2">Machine Distribution</h4>
            <EcoBarChart
              data={machineData}
              xKey="machine"
              bars={[{ key: 'consumption', label: 'kWh', color: '#06b6d4' }]}
              height={200}
            />
          </div>
        </div>
      </ChartCard>

      {/* Export options */}
      <GlassCard>
        <h3 className="font-semibold text-slate-900 dark:text-white text-base mb-4">Export & Share</h3>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {exportFormats.map((format, i) => (
            <motion.button
              key={format.label}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleExport(format.label)}
              className="p-4 rounded-xl glass hover:shadow-glow transition-all flex flex-col items-center gap-2"
            >
              <div className={`p-3 rounded-xl bg-gradient-to-br ${format.color}`}>
                <format.icon className="w-5 h-5 text-white" />
              </div>
              <span className="text-sm font-medium text-slate-700 dark:text-eco-200">{format.label}</span>
              <span className="text-xs text-slate-500 dark:text-eco-300/60">Download</span>
            </motion.button>
          ))}
        </div>

        <div className="mt-4 pt-4 border-t border-slate-200 dark:border-eco-800/50">
          <button
            onClick={() => setEmailModal(true)}
            className="btn-secondary text-sm inline-flex items-center gap-2 w-full justify-center"
          >
            <Mail className="w-4 h-4" />
            Email Report
          </button>
        </div>
      </GlassCard>

      {/* Email modal */}
      {emailModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-card p-6 w-full max-w-md"
          >
            {emailSent ? (
              <div className="text-center py-8">
                <div className="p-4 rounded-full bg-eco-500/20 w-fit mx-auto mb-4">
                  <Check className="w-8 h-8 text-eco-500" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Report Sent!</h3>
                <p className="text-sm text-slate-600 dark:text-eco-200/70">Check your inbox for the {reportType} report.</p>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-slate-900 dark:text-white">Email Report</h3>
                  <button onClick={() => setEmailModal(false)} className="text-slate-400 hover:text-slate-600">
                    ✕
                  </button>
                </div>
                <form onSubmit={handleSendEmail} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-eco-200 mb-1.5">Recipient Email</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="glass-input"
                      placeholder="manager@factory.com"
                    />
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-eco-200/70">
                    <Badge variant="info">{reportType}</Badge>
                    <span>Report will be sent as PDF attachment</span>
                  </div>
                  <button type="submit" className="btn-primary w-full inline-flex items-center justify-center gap-2">
                    <Mail className="w-4 h-4" />
                    Send Report
                  </button>
                </form>
              </>
            )}
          </motion.div>
        </div>
      )}
    </div>
  );
}
