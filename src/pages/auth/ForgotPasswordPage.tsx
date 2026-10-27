import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Loader2, ArrowLeft, CheckCircle } from 'lucide-react';
import { AuthLayout } from '@/components/auth/AuthLayout';
import { useAuth } from '@/contexts/AuthContext';

export function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { resetPassword } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const { error } = await resetPassword(email);
    setLoading(false);
    if (error) {
      setError(error);
    } else {
      setSent(true);
    }
  };

  return (
    <AuthLayout title="Reset Your Password" subtitle="Enter your email and we'll send you a reset link">
      {sent ? (
        <div className="text-center py-8">
          <div className="p-4 rounded-full bg-eco-500/20 w-fit mx-auto mb-4">
            <CheckCircle className="w-10 h-10 text-eco-500" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Check Your Email</h3>
          <p className="text-sm text-slate-600 dark:text-eco-200/70 mb-6">
            We've sent a password reset link to <span className="font-semibold">{email}</span>
          </p>
          <Link to="/login" className="btn-secondary inline-flex items-center gap-2 text-sm">
            <ArrowLeft className="w-4 h-4" />
            Back to Sign In
          </Link>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          {error && (
            <div className="p-3 rounded-xl bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 text-sm text-red-600 dark:text-red-400">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-eco-200 mb-1.5">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="glass-input pl-10"
                placeholder="you@factory.com"
              />
            </div>
          </div>

          <button type="submit" disabled={loading} className="btn-primary w-full inline-flex items-center justify-center gap-2 disabled:opacity-60">
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
            {loading ? 'Sending...' : 'Send Reset Link'}
          </button>

          <Link to="/login" className="block text-center text-sm text-slate-600 dark:text-eco-200/70 hover:text-eco-600 dark:hover:text-eco-400">
            <span className="inline-flex items-center gap-1">
              <ArrowLeft className="w-3.5 h-3.5" />
              Back to Sign In
            </span>
          </Link>
        </form>
      )}
    </AuthLayout>
  );
}
