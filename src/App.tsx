import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Bot, Layers, Hexagon, Search, Copy, Megaphone, Terminal, Zap, Fingerprint, Activity } from 'lucide-react';
import { AgentCard } from './components/AgentCard';
import { DashboardView } from './components/DashboardView';
import { DashboardData, AgentState } from './types';

const AGENTS = [
  { id: 'ceo', name: 'Althea', role: 'Chief Executive Orchestrator', icon: Hexagon },
  { id: 'research', name: 'Nova', role: 'Market Intelligence', icon: Search },
  { id: 'copy', name: 'Scribe', role: 'Creative Copywriter', icon: Copy },
  { id: 'strategy', name: 'Atlas', role: 'Campaign Strategist', icon: Megaphone },
];

export default function App() {
  const [goal, setGoal] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [agentStates, setAgentStates] = useState<Record<string, AgentState>>({
    ceo: 'idle',
    research: 'idle',
    copy: 'idle',
    strategy: 'idle'
  });
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleLaunch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!goal.trim() || isProcessing) return;

    setIsProcessing(true);
    setDashboardData(null);
    setError(null);
    
    // Animate agents to processing
    setAgentStates({
      ceo: 'running',
      research: 'running',
      copy: 'running',
      strategy: 'running'
    });

    try {
      const response = await fetch('/api/orchestrate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ goal })
      });
      
      const resData = await response.json();
      
      if (!resData.success) {
        throw new Error(resData.error || "Unknown error");
      }

      // Simulate staggered completion
      setTimeout(() => setAgentStates(prev => ({ ...prev, ceo: 'completed' })), 500);
      setTimeout(() => setAgentStates(prev => ({ ...prev, research: 'completed' })), 1200);
      setTimeout(() => setAgentStates(prev => ({ ...prev, copy: 'completed' })), 1800);
      setTimeout(() => {
        setAgentStates(prev => ({ ...prev, strategy: 'completed' }));
        setDashboardData(resData.data);
        setIsProcessing(false);
      }, 2400);

    } catch (err: any) {
      setError(err.message);
      setAgentStates({
        ceo: 'error',
        research: 'error',
        copy: 'error',
        strategy: 'error'
      });
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-neutral-300 font-sans selection:bg-indigo-500/30">
      
      {/* Header Pipeline */}
      <nav className="fixed top-0 left-0 right-0 h-16 border-b border-neutral-800 bg-neutral-950/80 backdrop-blur-md z-50 flex items-center justify-between px-6">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-white text-black rounded flex items-center justify-center font-bold">
            <Fingerprint size={20} strokeWidth={2} />
          </div>
          <span className="text-white font-bold tracking-[0.2em] text-sm hidden sm:inline-block">FASHIONOS <span className="text-neutral-500">X</span> ENTERPRISE</span>
        </div>
        
        <div className="flex items-center space-x-4 text-xs font-mono">
          <div className="flex items-center space-x-2 px-3 py-1 bg-neutral-900 rounded-full border border-neutral-800">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-neutral-400">SYSTEM NOMINAL</span>
          </div>
        </div>
      </nav>

      {/* Main Content Space */}
      <main className="pt-24 pb-20 px-6 max-w-7xl mx-auto space-y-12">
        
        {/* Command Center */}
        <section className="flex flex-col items-center justify-center pt-8 pb-12">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-2xl"
          >
            <div className="text-center mb-8">
               <h1 className="text-4xl sm:text-5xl font-bold text-white tracking-tight mb-4">
                 Global Control Center
               </h1>
               <p className="text-neutral-400 text-lg">
                 Initialize autonomous multi-agent workflows.
               </p>
            </div>

            <form onSubmit={handleLaunch} className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
              <div className="relative flex items-center bg-neutral-900 border border-neutral-800 rounded-2xl p-2 shadow-2xl">
                <div className="pl-4 pr-3 text-neutral-500">
                  <Terminal size={20} />
                </div>
                <input
                  type="text"
                  value={goal}
                  onChange={(e) => setGoal(e.target.value)}
                  disabled={isProcessing}
                  placeholder="e.g. Launch a campaign for Midnight Blue Velvet Dress..."
                  className="flex-1 bg-transparent border-none outline-none text-white placeholder-neutral-600 py-3 text-base sm:text-lg w-full disabled:opacity-50"
                  autoFocus
                />
                <button
                  type="submit"
                  disabled={!goal.trim() || isProcessing}
                  className="ml-2 bg-white hover:bg-neutral-200 text-black px-6 py-3 rounded-xl font-semibold transition-all disabled:opacity-50 flex items-center space-x-2"
                >
                  {isProcessing ? (
                    <Zap size={18} className="animate-pulse" />
                  ) : (
                    <Zap size={18} />
                  )}
                  <span className="hidden sm:inline">Execute</span>
                </button>
              </div>
            </form>
          </motion.div>
        </section>

        {/* Intelligence Swarm Grid */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-sm font-semibold tracking-[0.1em] text-neutral-500">AUTONOMOUS SWARM</h2>
            <div className="h-px bg-neutral-800 flex-1 ml-6" />
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {AGENTS.map((agent, i) => (
              <AgentCard
                key={agent.id}
                name={agent.name}
                role={agent.role}
                icon={agent.icon}
                state={agentStates[agent.id]}
                delay={i * 0.1}
              />
            ))}
          </div>
        </section>

        {/* Dynamic Dashboard Result */}
        <AnimatePresence>
          {error && (
            <motion.div
               initial={{ opacity: 0, height: 0 }}
               animate={{ opacity: 1, height: 'auto' }}
               exit={{ opacity: 0, height: 0 }}
               className="bg-red-950/30 border border-red-900/50 text-red-400 p-4 rounded-xl text-center"
            >
              System Error: {error}
            </motion.div>
          )}

          {dashboardData && (
            <motion.section
               initial={{ opacity: 0, y: 40 }}
               animate={{ opacity: 1, y: 0 }}
               exit={{ opacity: 0, y: 40 }}
               className="bg-neutral-950 border border-neutral-800 rounded-3xl overflow-hidden"
            >
               <div className="bg-neutral-900/50 border-b border-neutral-800 px-6 py-4 flex items-center space-x-3">
                 <Activity size={18} className="text-emerald-400" />
                 <span className="font-mono text-xs text-neutral-400">OPERATION COMPILED</span>
               </div>
               
               <DashboardView data={dashboardData} />
            </motion.section>
          )}
        </AnimatePresence>

      </main>
      
    </div>
  );
}

