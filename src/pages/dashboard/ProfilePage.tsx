import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  User, Mail, Building2, MapPin, Phone, Calendar, Edit3,
  Save, Award, TrendingDown, Leaf, Check,
} from 'lucide-react';
import { SectionTitle, GlassCard, Badge } from '@/components/ui/GlassCard';
import { useAuth } from '@/contexts/AuthContext';
import { generatePrediction } from '@/lib/mlEngine';

export function ProfilePage() {
  const { user } = useAuth();
  const [editing, setEditing] = useState(false);
  const [saved, setSaved] = useState(false);
  const prediction = generatePrediction();

  const [profile, setProfile] = useState({
    name: 'Factory Manager',
    email: user?.email ?? 'manager@factory.com',
    factory: 'Shree Manufacturing Unit',
    location: 'Pune, Maharashtra',
    phone: '+91 98765 43210',
    role: 'Factory Manager',
    joined: 'January 2026',
  });

  const handleSave = () => {
    setEditing(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const achievements = [
    { icon: TrendingDown, label: 'Energy Saver', desc: 'Reduced consumption by 15%+', color: 'text-eco-500', bg: 'bg-eco-500/10' },
    { icon: Leaf, label: 'Carbon Conscious', desc: 'Lowered CO₂ by 20%+', color: 'text-energy-500', bg: 'bg-energy-500/10' },
    { icon: Award, label: 'Early Adopter', desc: 'Joined in first month', color: 'text-amber-500', bg: 'bg-amber-500/10' },
  ];

  return (
    <div className="space-y-6">
      <SectionTitle title="My Profile" subtitle="Manage your personal information and view your achievements" />

      {/* Profile header */}
      <GlassCard className="relative overflow-hidden">
        <div className="absolute inset-0 bg-eco-radial opacity-50" />
        <div className="relative flex flex-col md:flex-row items-start md:items-center gap-6">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-eco-500 to-energy-500 flex items-center justify-center text-white font-bold text-3xl shadow-glow">
            {profile.name[0]}
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-bold font-display text-slate-900 dark:text-white">{profile.name}</h2>
            <p className="text-sm text-slate-600 dark:text-eco-200/70">{profile.role} at {profile.factory}</p>
            <div className="flex flex-wrap gap-2 mt-3">
              <Badge variant="success"><Check className="w-3 h-3 inline mr-1" /> Verified</Badge>
              <Badge variant="info">Pro Plan</Badge>
              <Badge variant="warning">Energy Saver</Badge>
            </div>
          </div>
          {!editing ? (
            <button onClick={() => setEditing(true)} className="btn-secondary text-sm inline-flex items-center gap-2">
              <Edit3 className="w-4 h-4" />
              Edit Profile
            </button>
          ) : (
            <button onClick={handleSave} className="btn-primary text-sm inline-flex items-center gap-2">
              {saved ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
              {saved ? 'Saved!' : 'Save'}
            </button>
          )}
        </div>
      </GlassCard>

      {/* Profile info */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <GlassCard>
          <h3 className="font-semibold text-slate-900 dark:text-white text-base mb-4">Personal Information</h3>
          <div className="space-y-4">
            {[
              { key: 'name', label: 'Full Name', icon: User, value: profile.name },
              { key: 'email', label: 'Email', icon: Mail, value: profile.email },
              { key: 'phone', label: 'Phone', icon: Phone, value: profile.phone },
              { key: 'joined', label: 'Member Since', icon: Calendar, value: profile.joined },
            ].map((field) => (
              <div key={field.key}>
                <label className="text-xs text-slate-500 dark:text-eco-300/60 mb-1 block">{field.label}</label>
                <div className="relative">
                  <field.icon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    disabled={!editing || field.key === 'joined' || field.key === 'email'}
                    value={field.value}
                    onChange={(e) => setProfile({ ...profile, [field.key]: e.target.value })}
                    className="glass-input pl-10 disabled:opacity-70"
                  />
                </div>
              </div>
            ))}
          </div>
        </GlassCard>

        <GlassCard>
          <h3 className="font-semibold text-slate-900 dark:text-white text-base mb-4">Factory Information</h3>
          <div className="space-y-4">
            {[
              { key: 'factory', label: 'Factory Name', icon: Building2, value: profile.factory },
              { key: 'location', label: 'Location', icon: MapPin, value: profile.location },
            ].map((field) => (
              <div key={field.key}>
                <label className="text-xs text-slate-500 dark:text-eco-300/60 mb-1 block">{field.label}</label>
                <div className="relative">
                  <field.icon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    disabled={!editing}
                    value={field.value}
                    onChange={(e) => setProfile({ ...profile, [field.key]: e.target.value })}
                    className="glass-input pl-10 disabled:opacity-70"
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-4 border-t border-slate-200 dark:border-eco-800/50">
            <h4 className="text-sm font-medium text-slate-700 dark:text-eco-200 mb-3">Key Metrics</h4>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: 'Energy Score', value: `${prediction.energy_score}/100` },
                { label: 'Efficiency', value: `${prediction.efficiency_pct}%` },
                { label: 'Total Savings', value: `₹${prediction.estimated_savings.toLocaleString('en-IN')}` },
                { label: 'CO₂ Reduced', value: `${prediction.carbon_reduction} kg` },
              ].map((metric) => (
                <div key={metric.label} className="p-3 rounded-xl glass">
                  <p className="text-xs text-slate-500 dark:text-eco-300/60">{metric.label}</p>
                  <p className="font-bold text-slate-900 dark:text-white">{metric.value}</p>
                </div>
              ))}
            </div>
          </div>
        </GlassCard>
      </div>

      {/* Achievements */}
      <GlassCard>
        <h3 className="font-semibold text-slate-900 dark:text-white text-base mb-4">Achievements</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {achievements.map((achievement, i) => (
            <motion.div
              key={achievement.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="p-4 rounded-xl glass flex items-center gap-3 hover:shadow-glow transition-all"
            >
              <div className={`p-3 rounded-xl ${achievement.bg}`}>
                <achievement.icon className={`w-5 h-5 ${achievement.color}`} />
              </div>
              <div>
                <p className="font-semibold text-slate-900 dark:text-white text-sm">{achievement.label}</p>
                <p className="text-xs text-slate-500 dark:text-eco-300/60">{achievement.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </GlassCard>
    </div>
  );
}
