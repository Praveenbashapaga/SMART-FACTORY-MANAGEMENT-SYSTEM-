import { Link } from 'react-router-dom';
import { Leaf, Github, Twitter, Linkedin, Mail } from 'lucide-react';

export function Footer() {
  const sections = [
    {
      title: 'Product',
      links: [
        { label: 'Features', href: '/#features' },
        { label: 'Dashboard', href: '/dashboard' },
        { label: 'Analytics', href: '/dashboard/analytics' },
        { label: 'AI Chatbot', href: '/dashboard/chatbot' },
      ],
    },
    {
      title: 'Company',
      links: [
        { label: 'About Us', href: '/#team' },
        { label: 'Testimonials', href: '/#testimonials' },
        { label: 'Contact', href: '/#contact' },
        { label: 'FAQ', href: '/#faq' },
      ],
    },
    {
      title: 'Resources',
      links: [
        { label: 'Documentation', href: '/#how-it-works' },
        { label: 'Energy Tips', href: '/#benefits' },
        { label: 'Sign In', href: '/login' },
        { label: 'Register', href: '/register' },
      ],
    },
  ];

  return (
    <footer className="relative mt-20 border-t border-slate-200 dark:border-eco-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="p-2 rounded-xl bg-gradient-to-br from-eco-500 to-eco-600">
                <Leaf className="w-5 h-5 text-white" />
              </div>
              <span className="font-display font-bold text-xl text-slate-900 dark:text-white">
                EcoWise<span className="gradient-text"> AI</span>
              </span>
            </Link>
            <p className="text-slate-600 dark:text-eco-200/70 text-sm max-w-xs">
              AI-powered energy efficiency advisor helping small factories reduce consumption, cut costs, and lower carbon emissions.
            </p>
            <div className="flex gap-3 mt-4">
              {[Github, Twitter, Linkedin, Mail].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="p-2.5 rounded-xl glass hover:scale-110 hover:text-eco-500 transition-all"
                  aria-label="Social link"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {sections.map((section) => (
            <div key={section.title}>
              <h4 className="font-semibold text-slate-900 dark:text-white mb-4 text-sm">{section.title}</h4>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      className="text-sm text-slate-600 dark:text-eco-200/70 hover:text-eco-600 dark:hover:text-eco-400 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-slate-200 dark:border-eco-800/50 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-500 dark:text-eco-300/60">
            © 2026 EcoWise AI. All rights reserved.
          </p>
          <p className="text-sm text-slate-500 dark:text-eco-300/60">
            Built for a greener tomorrow.
          </p>
        </div>
      </div>
    </footer>
  );
}
