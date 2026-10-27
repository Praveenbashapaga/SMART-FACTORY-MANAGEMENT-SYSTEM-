// EcoWise AI Chatbot — Industrial Energy Consultant Engine
// Simulates NLP-based responses for factory managers.

export interface ChatResponse {
  text: string;
  followups?: string[];
}

const KNOWLEDGE_BASE: { keywords: string[]; response: ChatResponse }[] = [
  {
    keywords: ['bill', 'increasing', 'high bill', 'electricity bill'],
    response: {
      text: "Your electricity bill is increasing primarily due to three factors:\n\n1. **Compressor Unit A** is running at 92% capacity with only 60% utilization — you're paying for compressed air you don't use.\n2. **Peak-hour consumption** (8 AM - 6 PM) accounts for 68% of your bill at the highest tariff rate.\n3. **Welding Station D** draws 4.2 kW in standby — that's wasted energy during idle periods.\n\n**Quick wins:** Shift heavy loads to after 8 PM (off-peak tariff), install a VFD on the compressor, and enable auto-standby on idle machines. Estimated savings: ₹18,500/month.",
      followups: ['How can I reduce my energy bill?', 'Which machine consumes the most power?', 'What is off-peak tariff?'],
    },
  },
  {
    keywords: ['most power', 'consumes the most', 'highest consumption', 'which machine'],
    response: {
      text: "Based on your factory's energy readings:\n\n| Machine | Daily kWh | % of Total |\n|---------|-----------|------------|\n| Compressor Unit A | 3,200 kWh | 28% |\n| Hydraulic Press B | 2,450 kWh | 21% |\n| Cooling Tower F | 1,890 kWh | 16% |\n| CNC Machine E | 1,560 kWh | 13% |\n\n**Compressor Unit A** is your biggest consumer. A VFD retrofit could cut its consumption by 30-40%.",
      followups: ['How can I reduce compressor energy?', 'What is a VFD?', 'Show me maintenance schedule'],
    },
  },
  {
    keywords: ['reduce', 'save', 'energy bill', 'cost'],
    response: {
      text: "Here are the top 5 ways to reduce your energy bill, ranked by savings:\n\n1. **Upgrade motors to IE4** — Save ₹41,000/yr (18-month payback)\n2. **Install VFD on compressor** — Save ₹32,000/yr\n3. **Shift heavy loads to off-peak** — Save ₹24,000/yr\n4. **Power factor correction** — Save ₹21,000/yr\n5. **LED lighting retrofit** — Save ₹12,700/yr\n\n**Total potential savings: ₹130,700/year** — that's an 18% reduction in your annual energy cost.",
      followups: ['How much money can I save?', 'What is power factor correction?', 'Tell me about government schemes'],
    },
  },
  {
    keywords: ['how much', 'money', 'save', 'savings'],
    response: {
      text: "Based on your current consumption profile:\n\n- **Monthly savings potential:** ₹10,800\n- **Annual savings potential:** ₹130,700\n- **ROI on recommended upgrades:** 14 months\n- **5-year cumulative savings:** ₹653,500\n\nThe biggest immediate win is shifting Hydraulic Press B to off-peak hours — zero investment, ₹24,000/yr savings.",
      followups: ['What should I improve first?', 'Show me the recommendations', 'How efficient is my factory?'],
    },
  },
  {
    keywords: ['efficient', 'energy efficiency', 'score', 'rating'],
    response: {
      text: "Your factory's current energy efficiency metrics:\n\n- **Energy Score:** 72/100 (Good, room for improvement)\n- **Efficiency Rating:** 78%\n- **Sustainability Index:** 65/100\n- **Factory Health Score:** 80/100\n- **AI Confidence:** 91%\n\nYou're above the industry average of 64%, but top-performing factories score 85+. The gap is mainly in compressor efficiency and idle machine management.",
      followups: ['What should I improve first?', 'How does my factory compare?', 'Show me analytics'],
    },
  },
  {
    keywords: ['improve', 'first', 'priority', 'what should i'],
    response: {
      text: "Based on impact vs. effort analysis, here's your priority roadmap:\n\n**Phase 1 (Immediate, 0 cost):**\n- Enable auto-standby on idle machines\n- Shift heavy loads to off-peak hours\n\n**Phase 2 (1-3 months, low cost):**\n- Install VFD on compressor (₹45K investment)\n- Power factor correction capacitors\n\n**Phase 3 (3-12 months, capital):**\n- Upgrade IE2 motors to IE4\n- LED lighting retrofit\n- Waste heat recovery system\n\nStart with Phase 1 — you'll see savings on your next bill.",
      followups: ['Tell me about maintenance schedule', 'What is a VFD?', 'Show me recommendations'],
    },
  },
  {
    keywords: ['maintenance', 'schedule', 'service', 'repair'],
    response: {
      text: "AI-predicted maintenance schedule based on vibration, temperature, and efficiency trends:\n\n| Machine | Issue | Due Date | Priority |\n|---------|-------|----------|----------|\n| Conveyor Belt C | Bearing wear | Within 7 days | High |\n| Compressor Unit A | Filter replacement | 15 days | Medium |\n| Cooling Tower F | Descaling | 30 days | Medium |\n| CNC Machine E | Lubrication | 45 days | Low |\n\n**Conveyor Belt C** is urgent — efficiency has dropped 14% and failure risk is high. Delaying could cost ₹9,500 in downtime.",
      followups: ['Show me machine health', 'What are the alerts?', 'How much will maintenance cost?'],
    },
  },
  {
    keywords: ['carbon', 'emission', 'co2', 'footprint', 'sustainability'],
    response: {
      text: "Your factory's carbon footprint analysis:\n\n- **Monthly CO₂ emissions:** 19,680 kg\n- **Annual CO₂ emissions:** 236,160 kg\n- **Carbon reduction potential:** 51,955 kg/yr (22%)\n- **Equivalent to:** 2,400 trees absorbing CO₂ for a year\n\n**Top carbon reduction actions:**\n1. Waste heat recovery → 15% reduction\n2. Motor upgrades → 8% reduction\n3. Solar panel installation → up to 40% reduction\n\nIndia's PAT (Perform Achieve Trade) scheme may offer carbon credits for verified reductions.",
      followups: ['Tell me about government schemes', 'How much can I reduce carbon?', 'What is solar potential?'],
    },
  },
  {
    keywords: ['government', 'scheme', 'subsidy', 'incentive', 'rebate'],
    response: {
      text: "Relevant Indian government energy schemes for your factory:\n\n1. **PAT Scheme (Perform Achieve Trade)** — Earn carbon credits for energy efficiency improvements. Trade excess on Indian Energy Exchange.\n\n2. **BEE Star Rating** — Get certified for energy performance. Opens doors to preferential financing.\n\n3. **KUSUM Scheme** — 60% subsidy on solar rooftop installations for industries. A 100 kW system saves ₹8.5L/yr.\n\n4. **NEDCAP Energy Audit Subsidy** — Up to 50% cost coverage for professional energy audits.\n\n5. **SIDBI Green Energy Scheme** — Low-interest loans (6.5%) for energy efficiency upgrades up to ₹2 crore.\n\nWould you like details on any specific scheme?",
      followups: ['Tell me about KUSUM scheme', 'How do I get an energy audit?', 'What is PAT scheme?'],
    },
  },
  {
    keywords: ['vfd', 'variable frequency', 'drive'],
    response: {
      text: "A **Variable Frequency Drive (VFD)** adjusts motor speed to match actual demand instead of running at full power constantly.\n\n**For your Compressor Unit A:**\n- Current: Runs at 92% capacity, 60% utilized\n- With VFD: Matches output to demand automatically\n- Investment: ₹45,000\n- Annual savings: ₹32,000\n- Payback period: 17 months\n- Energy reduction: 30-40%\n\nVFDs are one of the highest-ROI upgrades for factories with variable loads.",
      followups: ['How much can I save?', 'Show me recommendations', 'What should I improve first?'],
    },
  },
  {
    keywords: ['solar', 'renewable', 'panels', 'rooftop'],
    response: {
      text: "Solar potential for your factory:\n\n- **Available rooftop area:** ~800 sqm (estimated from factory size)\n- **Recommended system:** 100 kW rooftop solar\n- **Annual generation:** ~1,50,000 kWh\n- **Investment:** ₹45-55 lakh (₹18-22 lakh after KUSUM subsidy)\n- **Annual savings:** ₹8,50,000\n- **Payback period:** 5-6 years (3 years with subsidy)\n- **25-year savings:** ₹2.1 crore\n\nSolar also reduces your carbon footprint by 1,23,000 kg CO₂/yr.",
      followups: ['Tell me about KUSUM scheme', 'How much can I reduce carbon?', 'What is my ROI?'],
    },
  },
  {
    keywords: ['report', 'summary', 'weekly', 'performance'],
    response: {
      text: "Here's your weekly factory performance summary:\n\n**Week of Jul 22-28, 2026**\n\n📊 **Consumption:** 5,840 kWh (↓ 3.2% vs last week)\n💰 **Cost:** ₹49,640 (↓ 3.2%)\n🌿 **Carbon:** 4,789 kg CO₂ (↓ 3.2%)\n⚡ **Efficiency:** 78% (↑ 2 pts)\n✅ **Alerts resolved:** 3 of 4\n⚠️ **New alerts:** 1 (Compressor spike)\n\n**Highlights:** Consumption is trending down for the 3rd consecutive week. The auto-standby change on Welding Station D saved an estimated ₹2,100.\n\n**Action needed:** Address the compressor spike before it impacts next week's bill.",
      followups: ['Show me analytics', 'What are the alerts?', 'Generate a report'],
    },
  },
  {
    keywords: ['upload', 'csv', 'file', 'data'],
    response: {
      text: "You can upload your energy meter CSV data on the Dashboard. I'll analyze it for:\n\n- Consumption anomalies (Isolation Forest detection)\n- Peak usage patterns\n- Machine-wise breakdown\n- Cost projections\n- Efficiency trends\n\n**Expected CSV format:**\n```\ndate,machine,consumption_kwh,cost_inr\n2026-07-01,Compressor Unit A,3200,27200\n2026-07-02,Compressor Unit A,3150,26775\n```\n\nUpload your file and I'll provide a detailed analysis within seconds.",
      followups: ['How do I analyze my bill?', 'What anomalies can you detect?', 'Show me predictions'],
    },
  },
  {
    keywords: ['hello', 'hi', 'hey', 'start'],
    response: {
      text: "Hello! I'm your EcoWise AI Energy Consultant. I can help you with:\n\n- Explaining your energy consumption and bills\n- Suggesting energy-saving practices\n- Predicting future consumption and costs\n- Generating maintenance schedules\n- Recommending government energy schemes\n- Analyzing carbon emissions\n- Summarizing factory performance\n\nWhat would you like to know about your factory's energy usage?",
      followups: [
        'Why is my electricity bill increasing?',
        'Which machine consumes the most power?',
        'How can I reduce my energy bill?',
        'Is my factory energy efficient?',
      ],
    },
  },
];

const DEFAULT_RESPONSE: ChatResponse = {
  text: "I can help with energy consumption analysis, cost reduction, carbon emissions, maintenance scheduling, government schemes, and factory performance. Try asking:\n\n- 'Why is my electricity bill increasing?'\n- 'Which machine consumes the most power?'\n- 'How can I reduce my energy bill?'\n- 'Is my factory energy efficient?'\n- 'What should I improve first?'\n- 'Tell me about government energy schemes'",
  followups: [
    'Why is my electricity bill increasing?',
    'Which machine consumes the most power?',
    'How can I reduce my energy bill?',
    'Is my factory energy efficient?',
  ],
};

export function getChatResponse(userMessage: string): ChatResponse {
  const lower = userMessage.toLowerCase();
  for (const entry of KNOWLEDGE_BASE) {
    if (entry.keywords.some((kw) => lower.includes(kw))) {
      return entry.response;
    }
  }
  return DEFAULT_RESPONSE;
}

export const SUGGESTED_QUESTIONS = [
  'Why is my electricity bill increasing?',
  'Which machine consumes the most power?',
  'How can I reduce my energy bill?',
  'How much money can I save?',
  'Is my factory energy efficient?',
  'What should I improve first?',
  'Tell me about government energy schemes',
  'Generate a maintenance schedule',
];

export const QUICK_ACTIONS = [
  { label: 'Analyze my bill', icon: 'receipt' },
  { label: 'Show savings potential', icon: 'piggy-bank' },
  { label: 'Carbon footprint', icon: 'leaf' },
  { label: 'Maintenance schedule', icon: 'wrench' },
  { label: 'Weekly summary', icon: 'file-text' },
  { label: 'Government schemes', icon: 'landmark' },
];
