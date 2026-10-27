import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Settings, Bell, Globe, Moon, Sun, Shield, Mail, Smartphone,
  Save, Check,
} from 'lucide-react';
import { SectionTitle, GlassCard, Badge } from '@/components/ui/GlassCard';
import { useTheme } from '@/contexts/ThemeContext';

export function SettingsPage() {
  const { theme, setTheme } = useTheme();
  const [notifications, setNotifications] = useState({
    highConsumption: true,
    idleMachines: true,
    peakUsage: true,
    maintenance: true,
    weeklyReport: true,
    emailAlerts: true,
  });
  const [language, setLanguage] = useState('English');
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const toggleNotif = (key: keyof typeof notifications) => {
    setNotifications({ ...notifications, [key]: !notifications[key] });
  };

  const languages = ['English', 'हिन्दी (Hindi)', 'తెలుగు (Telugu)'];

  return (
    <div className="space-y-6">
      <SectionTitle title="Settings" subtitle="Manage your preferences, notifications, and account configuration" />

      {/* Appearance */}
      <GlassCard>
        <h3 className="font-semibold text-slate-900 dark:text-white text-base mb-4 flex items-center gap-2">
          <Settings className="w-5 h-5 text-eco-500" />
          Appearance
        </h3>
        <div className="grid grid-cols-2 gap-4">
          {[
            { key: 'light', label: 'Light Mode', icon: Sun },
            { key: 'dark', label: 'Dark Mode', icon: Moon },
          ].map((mode) => (
            <button
              key={mode.key}
              onClick={() => setTheme(mode.key as 'light' | 'dark')}
              className={`p-4 rounded-xl flex items-center gap-3 transition-all ${
                theme === mode.key
                  ? 'bg-gradient-to-br from-eco-500/20 to-eco-600/10 border border-eco-500/30'
                  : 'glass hover:bg-slate-100 dark:hover:bg-eco-800/30'
              }`}
            >
              <mode.icon className={`w-5 h-5 ${theme === mode.key ? 'text-eco-500' : 'text-slate-400'}`} />
              <span className={`text-sm font-medium ${theme === mode.key ? 'text-eco-700 dark:text-eco-300' : 'text-slate-700 dark:text-eco-200'}`}>
                {mode.label}
              </span>
              {theme === mode.key && <Check className="w-4 h-4 text-eco-500 ml-auto" />}
            </button>
          ))}
        </div>
      </GlassCard>

      {/* Notifications */}
      <GlassCard>
        <h3 className="font-semibold text-slate-900 dark:text-white text-base mb-4 flex items-center gap-2">
          <Bell className="w-5 h-5 text-eco-500" />
          Notification Preferences
        </h3>
        <div className="space-y-3">
          {[
            { key: 'highConsumption', label: 'High Consumption Alerts', desc: 'Get notified when consumption exceeds threshold' },
            { key: 'idleMachines', label: 'Idle Machine Detection', desc: 'Alert when machines run idle with high power draw' },
            { key: 'peakUsage', label: 'Peak Usage Warnings', desc: 'Warn when approaching peak demand limit' },
            { key: 'maintenance', label: 'Maintenance Due', desc: 'Reminders for scheduled and predictive maintenance' },
            { key: 'weeklyReport', label: 'Weekly Report Delivery', desc: 'Automatically email weekly energy reports' },
            { key: 'emailAlerts', label: 'Email Notifications', desc: 'Receive all alerts via email' },
          ].map((item) => (
            <div key={item.key} className="flex items-center justify-between p-3 rounded-xl glass">
              <div>
                <p className="text-sm font-medium text-slate-900 dark:text-white">{item.label}</p>
                <p className="text-xs text-slate-500 dark:text-eco-300/60">{item.desc}</p>
              </div>
              <button
                onClick={() => toggleNotif(item.key as keyof typeof notifications)}
                className={`relative w-11 h-6 rounded-full transition-colors ${
                  notifications[item.key as keyof typeof notifications] ? 'bg-eco-500' : 'bg-slate-300 dark:bg-eco-800'
                }`}
              >
                <motion.div
                  animate={{ x: notifications[item.key as keyof typeof notifications] ? 22 : 2 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  className="absolute top-1 w-4 h-4 rounded-full bg-white shadow-md"
                />
              </button>
            </div>
          ))}
        </div>
      </GlassCard>

      {/* Language */}
      <GlassCard>
        <h3 className="font-semibold text-slate-900 dark:text-white text-base mb-4 flex items-center gap-2">
          <Globe className="w-5 h-5 text-eco-500" />
          Language & Region
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {languages.map((lang) => (
            <button
              key={lang}
              onClick={() => setLanguage(lang)}
              className={`p-3 rounded-xl text-sm font-medium transition-all ${
                language === lang
                  ? 'bg-gradient-to-br from-eco-500/20 to-eco-600/10 border border-eco-500/30 text-eco-700 dark:text-eco-300'
                  : 'glass text-slate-600 dark:text-eco-200/70 hover:bg-slate-100 dark:hover:bg-eco-800/30'
              }`}
            >
              {lang}
              {language === lang && <Check className="w-4 h-4 inline ml-2" />}
            </button>
          ))}
        </div>
      </GlassCard>

      {/* Security */}
      <GlassCard>
        <h3 className="font-semibold text-slate-900 dark:text-white text-base mb-4 flex items-center gap-2">
          <Shield className="w-5 h-5 text-eco-500" />
          Security
        </h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 rounded-xl glass">
            <div className="flex items-center gap-3">
              <Mail className="w-4 h-4 text-slate-400" />
              <div>
                <p className="text-sm font-medium text-slate-900 dark:text-white">Email</p>
                <p className="text-xs text-slate-500 dark:text-eco-300/60">manager@factory.com</p>
              </div>
            </div>
            <Badge variant="success">Verified</Badge>
          </div>
          <div className="flex items-center justify-between p-3 rounded-xl glass">
            <div className="flex items-center gap-3">
              <Smartphone className="w-4 h-4 text-slate-400" />
              <div>
                <p className="text-sm font-medium text-slate-900 dark:text-white">Two-Factor Authentication</p>
                <p className="text-xs text-slate-500 dark:text-eco-300/60">Add an extra layer of security</p>
              </div>
            </div>
            <button className="btn-ghost text-xs">Enable</button>
          </div>
        </div>
      </GlassCard>

      {/* Save button */}
      <div className="flex justify-end">
        <button onClick={handleSave} className="btn-primary inline-flex items-center gap-2">
          {saved ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
          {saved ? 'Saved!' : 'Save Changes'}
        </button>
      </div>
    </div>
  );
}
