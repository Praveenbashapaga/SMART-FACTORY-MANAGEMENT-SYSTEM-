import { useState, useEffect, type ReactNode } from 'react';
import { Link, useLocation, useNavigate, Outlet } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard, Factory, BarChart3, Brain, Lightbulb, FileText,
  Settings, User, Leaf, Menu, X, Sun, Moon, Bell, LogOut,
  Zap, TrendingDown, AlertTriangle, Wrench, MessageCircle,
} from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { useAuth } from '@/contexts/AuthContext';
import { generateAlerts } from '@/lib/mlEngine';

const navItems = [
  { label: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
  { label: 'Factory', icon: Factory, path: '/dashboard/factory' },
  { label: 'Analytics', icon: BarChart3, path: '/dashboard/analytics' },
  { label: 'Predictions', icon: Brain, path: '/dashboard/predictions' },
  { label: 'Recommendations', icon: Lightbulb, path: '/dashboard/recommendations' },
  { label: 'Reports', icon: FileText, path: '/dashboard/reports' },
  { label: 'AI Consultant', icon: MessageCircle, path: '/dashboard/chatbot' },
  { label: 'Settings', icon: Settings, path: '/dashboard/settings' },
  { label: 'Profile', icon: User, path: '/dashboard/profile' },
];

export function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { user, signOut } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const alerts = generateAlerts();

  useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname]);

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const severityIcon = (type: string) => {
    switch (type) {
      case 'high_consumption': return <Zap className="w-4 h-4 text-red-500" />;
      case 'idle_machine': return <TrendingDown className="w-4 h-4 text-amber-500" />;
      case 'peak_usage': return <AlertTriangle className="w-4 h-4 text-amber-500" />;
      case 'maintenance': return <Wrench className="w-4 h-4 text-energy-500" />;
      default: return <Bell className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-eco-950 flex">
      {/* Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 bg-black/40 z-30 lg:hidden"
          />
        )}
      </AnimatePresence>

      <aside
        className={`fixed lg:sticky top-0 left-0 h-screen z-40 w-64 glass border-r border-slate-200 dark:border-eco-800/50 flex flex-col transition-transform duration-300 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="p-5 flex items-center justify-between">
          <Link to="/dashboard" className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-gradient-to-br from-eco-500 to-eco-600 shadow-glow">
              <Leaf className="w-5 h-5 text-white" />
            </div>
            <span className="font-display font-bold text-lg text-slate-900 dark:text-white">
              EcoWise<span className="gradient-text"> AI</span>
            </span>
          </Link>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-eco-800/40">
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto scrollbar-custom">
          {navItems.map((item) => {
            const active = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  active
                    ? 'bg-gradient-to-r from-eco-500/20 to-eco-600/10 text-eco-700 dark:text-eco-300 border border-eco-500/20'
                    : 'text-slate-600 dark:text-eco-200/70 hover:bg-slate-100 dark:hover:bg-eco-800/30'
                }`}
              >
                <item.icon className={`w-4 h-4 ${active ? 'text-eco-600 dark:text-eco-400' : ''}`} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-3 border-t border-slate-200 dark:border-eco-800/50">
          <button
            onClick={handleSignOut}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 transition-all"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Topbar */}
        <header className="sticky top-0 z-20 glass border-b border-slate-200 dark:border-eco-800/50">
          <div className="flex items-center justify-between px-4 sm:px-6 h-16">
            <div className="flex items-center gap-3">
              <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 rounded-lg glass">
                <Menu className="w-5 h-5" />
              </button>
              <div>
                <h1 className="font-semibold text-slate-900 dark:text-white text-sm md:text-base">
                  {navItems.find((n) => n.path === location.pathname)?.label ?? 'Dashboard'}
                </h1>
                <p className="text-xs text-slate-500 dark:text-eco-300/60 hidden sm:block">
                  {new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button onClick={toggleTheme} className="p-2.5 rounded-xl glass hover:scale-105 transition-transform" aria-label="Toggle theme">
                {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-eco-600" />}
              </button>

              <div className="relative">
                <button
                  onClick={() => setNotifOpen(!notifOpen)}
                  className="p-2.5 rounded-xl glass hover:scale-105 transition-transform relative"
                  aria-label="Notifications"
                >
                  <Bell className="w-4 h-4" />
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
                </button>
                <AnimatePresence>
                  {notifOpen && (
                    <>
                      <div className="fixed inset-0 z-30" onClick={() => setNotifOpen(false)} />
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute right-0 mt-2 w-80 glass-card p-4 z-40"
                      >
                        <h3 className="font-semibold text-slate-900 dark:text-white mb-3 flex items-center justify-between">
                          Notifications
                          <span className="text-xs text-eco-500">{alerts.length} new</span>
                        </h3>
                        <div className="space-y-2 max-h-64 overflow-y-auto scrollbar-custom">
                          {alerts.map((alert) => (
                            <div key={alert.id} className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 dark:bg-eco-800/30 hover:bg-slate-100 dark:hover:bg-eco-800/50 transition-colors">
                              {severityIcon(alert.type)}
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-slate-900 dark:text-white">{alert.title}</p>
                                <p className="text-xs text-slate-500 dark:text-eco-300/60 truncate">{alert.message}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </div>

              <Link to="/dashboard/profile" className="flex items-center gap-2 pl-2">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-eco-500 to-energy-500 flex items-center justify-center text-white font-semibold text-sm">
                  {user?.email?.[0]?.toUpperCase() ?? 'U'}
                </div>
              </Link>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-x-hidden">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
