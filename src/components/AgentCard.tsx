import React from 'react';
import { motion } from 'motion/react';
import { LucideIcon, Loader2, CheckCircle, CircleDashed } from 'lucide-react';
import { AgentState } from '../types';

interface AgentCardProps {
  name: string;
  role: string;
  icon: LucideIcon;
  state: AgentState;
  delay?: number;
}

export const AgentCard: React.FC<AgentCardProps> = ({ name, role, icon: Icon, state, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="bg-neutral-900 border border-neutral-800 rounded-xl p-4 flex items-start space-x-4 relative overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-indigo-500 to-purple-500 opacity-50" />
      
      <div className="p-2 bg-neutral-800/50 text-indigo-400 rounded-lg shrink-0">
        <Icon size={20} />
      </div>
      
      <div className="flex-1 min-w-0">
        <h3 className="text-sm font-semibold text-neutral-200 truncate">{name}</h3>
        <p className="text-xs text-neutral-500 truncate">{role}</p>
      </div>
      
      <div className="shrink-0 flex items-center justify-center pt-1 block">
        {state === 'running' && <Loader2 size={16} className="text-indigo-400 animate-spin" />}
        {state === 'completed' && <CheckCircle size={16} className="text-emerald-400" />}
        {state === 'idle' && <CircleDashed size={16} className="text-neutral-600" />}
      </div>
    </motion.div>
  );
}
