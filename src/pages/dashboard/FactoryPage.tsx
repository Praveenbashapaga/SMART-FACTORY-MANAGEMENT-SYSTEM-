import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Factory, MapPin, Clock, Building2, Plus, Cpu, Zap, Activity,
  Wrench, Settings as SettingsIcon, Trash2,
} from 'lucide-react';
import { SectionTitle, GlassCard, Badge } from '@/components/ui/GlassCard';
import { generateMachineHealth, MACHINES } from '@/lib/mlEngine';

export function FactoryPage() {
  const [showAddMachine, setShowAddMachine] = useState(false);
  const [machines, setMachines] = useState(MACHINES);
  const [newMachine, setNewMachine] = useState('');
  const machineHealth = generateMachineHealth();

  const handleAddMachine = () => {
    if (newMachine.trim()) {
      setMachines([...machines, newMachine.trim()]);
      setNewMachine('');
      setShowAddMachine(false);
    }
  };

  const handleRemoveMachine = (name: string) => {
    setMachines(machines.filter((m) => m !== name));
  };

  return (
    <div className="space-y-6">
      <SectionTitle title="Factory Overview" subtitle="Manage your factory profile, machines, and departments" />

      {/* Factory info */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <GlassCard className="lg:col-span-2">
          <div className="flex items-start gap-4 mb-6">
            <div className="p-4 rounded-2xl bg-gradient-to-br from-eco-500 to-eco-600 shadow-glow">
              <Factory className="w-8 h-8 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold font-display text-slate-900 dark:text-white">Shree Manufacturing Unit</h2>
              <div className="flex flex-wrap items-center gap-3 mt-2 text-sm text-slate-600 dark:text-eco-200/70">
                <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> Pune, Maharashtra</span>
                <span className="flex items-center gap-1"><Building2 className="w-3.5 h-3.5" /> Manufacturing</span>
                <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> 8 AM - 6 PM</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Factory Size', value: '1,200 sqm', icon: Building2 },
              { label: 'Total Machines', value: String(machines.length), icon: Cpu },
              { label: 'Daily Consumption', value: '1,150 kWh', icon: Zap },
              { label: 'Operating Days', value: '26 / month', icon: Clock },
            ].map((info) => (
              <div key={info.label} className="p-3 rounded-xl glass">
                <info.icon className="w-4 h-4 text-eco-500 mb-1.5" />
                <p className="text-xs text-slate-500 dark:text-eco-300/60">{info.label}</p>
                <p className="font-semibold text-slate-900 dark:text-white">{info.value}</p>
              </div>
            ))}
          </div>
        </GlassCard>

        <GlassCard>
          <h3 className="font-semibold text-slate-900 dark:text-white text-sm mb-4">Factory Health</h3>
          <div className="space-y-3">
            {[
              { label: 'Energy Score', value: 72, color: 'bg-eco-500' },
              { label: 'Efficiency', value: 78, color: 'bg-energy-500' },
              { label: 'Sustainability', value: 65, color: 'bg-amber-500' },
              { label: 'Maintenance', value: 84, color: 'bg-eco-400' },
            ].map((metric) => (
              <div key={metric.label}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-600 dark:text-eco-200">{metric.label}</span>
                  <span className="font-semibold text-slate-900 dark:text-white">{metric.value}%</span>
                </div>
                <div className="h-2 rounded-full bg-slate-200 dark:bg-eco-800/50 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${metric.value}%` }}
                    transition={{ duration: 0.8 }}
                    className={`h-full rounded-full ${metric.color}`}
                  />
                </div>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>

      {/* Machines list */}
      <GlassCard>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-slate-900 dark:text-white text-base flex items-center gap-2">
            <Cpu className="w-5 h-5 text-eco-500" />
            Machines ({machines.length})
          </h3>
          <button
            onClick={() => setShowAddMachine(!showAddMachine)}
            className="btn-primary text-sm inline-flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Machine
          </button>
        </div>

        {showAddMachine && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="mb-4 flex gap-2"
          >
            <input
              type="text"
              value={newMachine}
              onChange={(e) => setNewMachine(e.target.value)}
              className="glass-input"
              placeholder="Machine name (e.g., Injection Molding G)"
              onKeyDown={(e) => e.key === 'Enter' && handleAddMachine()}
            />
            <button onClick={handleAddMachine} className="btn-primary text-sm whitespace-nowrap">Add</button>
          </motion.div>
        )}

        <div className="overflow-x-auto scrollbar-custom">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left border-b border-slate-200 dark:border-eco-800/50">
                <th className="pb-3 font-medium text-slate-500 dark:text-eco-300/60">Machine</th>
                <th className="pb-3 font-medium text-slate-500 dark:text-eco-300/60">Health</th>
                <th className="pb-3 font-medium text-slate-500 dark:text-eco-300/60">Status</th>
                <th className="pb-3 font-medium text-slate-500 dark:text-eco-300/60">Uptime</th>
                <th className="pb-3 font-medium text-slate-500 dark:text-eco-300/60">Actions</th>
              </tr>
            </thead>
            <tbody>
              {machineHealth.map((m, i) => (
                <motion.tr
                  key={m.machine}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.05 }}
                  className="border-b border-slate-100 dark:border-eco-800/30"
                >
                  <td className="py-3 font-medium text-slate-900 dark:text-white">{m.machine}</td>
                  <td className="py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-1.5 rounded-full bg-slate-200 dark:bg-eco-800/50 overflow-hidden">
                        <div
                          className={`h-full rounded-full ${m.health > 80 ? 'bg-eco-500' : m.health > 60 ? 'bg-amber-500' : 'bg-red-500'}`}
                          style={{ width: `${m.health}%` }}
                        />
                      </div>
                      <span className="text-xs">{m.health}%</span>
                    </div>
                  </td>
                  <td className="py-3">
                    <Badge variant={m.status === 'Healthy' ? 'success' : 'warning'}>{m.status}</Badge>
                  </td>
                  <td className="py-3 text-slate-600 dark:text-eco-200/70">{m.uptime}%</td>
                  <td className="py-3">
                    <div className="flex gap-2">
                      <button className="p-1.5 rounded-lg glass hover:text-eco-500 transition-colors">
                        <SettingsIcon className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleRemoveMachine(m.machine)}
                        className="p-1.5 rounded-lg glass hover:text-red-500 transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassCard>

      {/* Departments */}
      <GlassCard>
        <h3 className="font-semibold text-slate-900 dark:text-white text-base mb-4 flex items-center gap-2">
          <Building2 className="w-5 h-5 text-eco-500" />
          Departments
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {['Production', 'Assembly', 'Packaging', 'Quality Control', 'Maintenance', 'Warehouse'].map((dept, i) => (
            <motion.div
              key={dept}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="p-4 rounded-xl glass hover:shadow-glow transition-all"
            >
              <div className="flex items-center justify-between mb-2">
                <Activity className="w-4 h-4 text-eco-500" />
                <Badge variant="info">Active</Badge>
              </div>
              <p className="font-semibold text-slate-900 dark:text-white">{dept}</p>
              <p className="text-xs text-slate-500 dark:text-eco-300/60 mt-1">{Math.floor(Math.random() * 20) + 5} machines</p>
            </motion.div>
          ))}
        </div>
      </GlassCard>
    </div>
  );
}
