import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MessageCircle, Send, Mic, Volume2, VolumeX, Globe,
  Sparkles, User, Leaf, Zap, IndianRupee, Wrench, FileText,
  Trash2, Bot,
} from 'lucide-react';
import { GlassCard, Badge } from '@/components/ui/GlassCard';
import { getChatResponse, SUGGESTED_QUESTIONS, QUICK_ACTIONS } from '@/lib/chatEngine';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  followups?: string[];
  timestamp: string;
}

const quickActionIcons: Record<string, typeof Zap> = {
  receipt: FileText,
  'piggy-bank': IndianRupee,
  leaf: Leaf,
  wrench: Wrench,
  'file-text': FileText,
  landmark: Bot,
};

export function ChatbotPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: "Hello! I'm your EcoWise AI Energy Consultant. I can help you with:\n\n- Explaining your energy consumption and bills\n- Suggesting energy-saving practices\n- Predicting future consumption and costs\n- Generating maintenance schedules\n- Recommending government energy schemes\n- Analyzing carbon emissions\n\nWhat would you like to know about your factory's energy usage?",
      followups: SUGGESTED_QUESTIONS.slice(0, 4),
      timestamp: new Date().toISOString(),
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(false);
  const [listening, setListening] = useState(false);
  const [language, setLanguage] = useState('English');
  const [showLangMenu, setShowLangMenu] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const languages = ['English', 'हिन्दी (Hindi)', 'తెలుగు (Telugu)'];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const handleSend = (text?: string) => {
    const message = text ?? input;
    if (!message.trim()) return;

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: message,
      timestamp: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    setTimeout(() => {
      const response = getChatResponse(message);
      const assistantMsg: Message = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: response.text,
        followups: response.followups,
        timestamp: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, assistantMsg]);
      setLoading(false);

      if (voiceEnabled && 'speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(response.text.replace(/[*#|]/g, ''));
        utterance.rate = 0.95;
        speechSynthesis.speak(utterance);
      }
    }, 1000 + Math.random() * 500);
  };

  const handleVoiceInput = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert('Voice input is not supported in your browser. Please use Chrome or Edge.');
      return;
    }

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = language === 'हिन्दी (Hindi)' ? 'hi-IN' : language === 'తెలుగు (Telugu)' ? 'te-IN' : 'en-US';
    recognition.continuous = false;
    recognition.interimResults = false;

    setListening(true);
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript);
      setListening(false);
    };
    recognition.onerror = () => setListening(false);
    recognition.onend = () => setListening(false);
    recognition.start();
  };

  const clearChat = () => {
    setMessages([
      {
        id: 'welcome',
        role: 'assistant',
        content: "Chat cleared. How can I help you with your factory's energy management?",
        followups: SUGGESTED_QUESTIONS.slice(0, 4),
        timestamp: new Date().toISOString(),
      },
    ]);
  };

  const formatContent = (content: string) => {
    return content.split('\n').map((line, i) => {
      if (line.startsWith('|')) {
        return (
          <div key={i} className="text-xs font-mono overflow-x-auto scrollbar-custom my-1 whitespace-pre">
            {line}
          </div>
        );
      }
      if (line.startsWith('```')) return null;
      const parts = line.split(/(\*\*[^*]+\*\*)/g);
      return (
        <p key={i} className={line.trim() === '' ? 'h-2' : 'mb-1'}>
          {parts.map((part, j) => {
            if (part.startsWith('**') && part.endsWith('**')) {
              return <strong key={j} className="font-semibold text-slate-900 dark:text-white">{part.slice(2, -2)}</strong>;
            }
            return <span key={j}>{part}</span>;
          })}
        </p>
      );
    });
  };

  return (
    <div className="space-y-4 h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-gradient-to-br from-eco-500 to-energy-500 shadow-glow">
            <MessageCircle className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-bold font-display text-slate-900 dark:text-white flex items-center gap-2">
              AI Energy Consultant
              <Badge variant="success"><Sparkles className="w-3 h-3 inline mr-1" /> Online</Badge>
            </h2>
            <p className="text-xs text-slate-500 dark:text-eco-300/60">Your 24/7 industrial energy advisor</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Language selector */}
          <div className="relative">
            <button
              onClick={() => setShowLangMenu(!showLangMenu)}
              className="btn-ghost text-sm inline-flex items-center gap-1.5"
            >
              <Globe className="w-4 h-4" />
              {language}
            </button>
            {showLangMenu && (
              <>
                <div className="fixed inset-0 z-30" onClick={() => setShowLangMenu(false)} />
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute right-0 mt-2 w-44 glass-card p-2 z-40"
                >
                  {languages.map((lang) => (
                    <button
                      key={lang}
                      onClick={() => { setLanguage(lang); setShowLangMenu(false); }}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                        language === lang ? 'bg-eco-500/20 text-eco-700 dark:text-eco-300' : 'hover:bg-slate-100 dark:hover:bg-eco-800/30 text-slate-600 dark:text-eco-200/70'
                      }`}
                    >
                      {lang}
                    </button>
                  ))}
                </motion.div>
              </>
            )}
          </div>

          {/* Voice toggle */}
          <button
            onClick={() => setVoiceEnabled(!voiceEnabled)}
            className={`p-2.5 rounded-xl glass hover:scale-105 transition-transform ${voiceEnabled ? 'text-eco-500' : ''}`}
            aria-label="Toggle voice output"
          >
            {voiceEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Clear chat */}
          <button onClick={clearChat} className="p-2.5 rounded-xl glass hover:text-red-500 transition-colors" aria-label="Clear chat">
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Chat container */}
      <div className="flex-1 flex flex-col min-h-0">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto scrollbar-custom space-y-4 pb-4">
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
            >
              <div className={`flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center ${
                msg.role === 'user'
                  ? 'bg-gradient-to-br from-energy-500 to-energy-600'
                  : 'bg-gradient-to-br from-eco-500 to-eco-600'
              }`}>
                {msg.role === 'user' ? <User className="w-4 h-4 text-white" /> : <Leaf className="w-4 h-4 text-white" />}
              </div>
              <div className={`max-w-[80%] ${msg.role === 'user' ? 'text-right' : ''}`}>
                <div className={`glass-card p-4 ${msg.role === 'user' ? 'bg-eco-500/10' : ''}`}>
                  <div className="text-sm text-slate-700 dark:text-eco-100 leading-relaxed text-left">
                    {formatContent(msg.content)}
                  </div>
                </div>
                {msg.followups && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {msg.followups.map((followup, i) => (
                      <button
                        key={i}
                        onClick={() => handleSend(followup)}
                        className="px-3 py-1.5 rounded-lg glass text-xs text-eco-600 dark:text-eco-400 hover:bg-eco-500/10 transition-colors"
                      >
                        {followup}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          ))}

          {loading && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-3">
              <div className="flex-shrink-0 w-9 h-9 rounded-full bg-gradient-to-br from-eco-500 to-eco-600 flex items-center justify-center">
                <Leaf className="w-4 h-4 text-white" />
              </div>
              <div className="glass-card p-4">
                <div className="flex gap-1.5">
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      className="w-2 h-2 rounded-full bg-eco-500"
                      animate={{ y: [0, -6, 0] }}
                      transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick actions */}
        <div className="flex flex-wrap gap-2 mb-3">
          {QUICK_ACTIONS.map((action) => {
            const Icon = quickActionIcons[action.icon] ?? Sparkles;
            return (
              <button
                key={action.label}
                onClick={() => handleSend(action.label)}
                className="px-3 py-1.5 rounded-lg glass text-xs font-medium text-slate-600 dark:text-eco-200/70 hover:bg-eco-500/10 hover:text-eco-600 dark:hover:text-eco-400 transition-all flex items-center gap-1.5"
              >
                <Icon className="w-3 h-3" />
                {action.label}
              </button>
            );
          })}
        </div>

        {/* Input */}
        <div className="flex gap-2">
          <button
            onClick={handleVoiceInput}
            className={`p-3 rounded-xl glass hover:scale-105 transition-transform ${listening ? 'animate-pulse text-red-500' : ''}`}
            aria-label="Voice input"
          >
            <Mic className="w-5 h-5" />
          </button>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder={listening ? 'Listening...' : 'Ask about your energy consumption, bills, savings...'}
            className="glass-input flex-1"
          />
          <button
            onClick={() => handleSend()}
            disabled={!input.trim()}
            className="btn-primary px-4 inline-flex items-center justify-center disabled:opacity-50"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>

        {listening && (
          <p className="text-xs text-center text-red-500 animate-pulse">Listening... speak now</p>
        )}
      </div>
    </div>
  );
}
