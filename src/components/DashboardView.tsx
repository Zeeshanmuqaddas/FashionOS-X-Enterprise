import React from 'react';
import { motion } from 'motion/react';
import { DashboardData } from '../types';
import { Target, Users, BookOpen, Presentation, CheckCircle2 } from 'lucide-react';

export function DashboardView({ data }: { data: DashboardData }) {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 p-6"
    >
      {/* CEO Summary */}
      {data.ceoAgent && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="col-span-1 md:col-span-2 xl:col-span-4 bg-gradient-to-br from-indigo-950/40 to-neutral-900 border border-indigo-900/50 rounded-2xl p-6"
        >
          <div className="flex items-center space-x-3 mb-4">
            <Target className="text-indigo-400" />
            <h2 className="text-xl font-bold text-white tracking-tight">CEO Strategy Directive</h2>
          </div>
          <p className="text-indigo-100/80 leading-relaxed mb-6 max-w-4xl">
            {data.ceoAgent.strategySummary}
          </p>
          
          <div className="flex flex-wrap gap-3">
            {data.ceoAgent.kpis.map((kpi, idx) => (
              <span key={idx} className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-indigo-950/50 border border-indigo-800/50 text-indigo-300 text-xs font-mono">
                <CheckCircle2 size={12} className="text-indigo-500" />
                <span>{kpi}</span>
              </span>
            ))}
          </div>
        </motion.div>
      )}

      {/* Market Research */}
      {data.marketResearch && (
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: 0.2 }}
           className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 flex flex-col"
        >
          <div className="flex items-center space-x-3 mb-5">
            <Users className="text-purple-400" size={20} />
            <h3 className="text-sm font-bold text-neutral-200 tracking-wider uppercase">Market Research</h3>
          </div>
          <div className="mb-4">
            <div className="text-xs text-neutral-500 uppercase font-semibold mb-1">Target Audience</div>
            <div className="text-sm text-neutral-300 font-medium">{data.marketResearch.targetAudience}</div>
          </div>
          <div className="flex-1">
            <div className="text-xs text-neutral-500 uppercase font-semibold mb-2">Key Insights</div>
            <ul className="space-y-3">
              {data.marketResearch.insights.map((insight, idx) => (
                <li key={idx} className="flex items-start space-x-2 text-sm text-neutral-400">
                  <span className="text-purple-500 mt-1 shrink-0">•</span>
                  <span>{insight}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      )}

      {/* Copywriting */}
      {data.copywriting && (
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: 0.3 }}
           className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 flex flex-col md:col-span-2 xl:col-span-2"
        >
          <div className="flex items-center space-x-3 mb-5">
            <BookOpen className="text-emerald-400" size={20} />
            <h3 className="text-sm font-bold text-neutral-200 tracking-wider uppercase">Creative Copy</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-1">
             <div>
                <div className="text-xs text-neutral-500 uppercase font-semibold mb-2">Product Description</div>
                <p className="text-sm text-neutral-300 leading-relaxed bg-neutral-950 p-4 rounded-xl border border-neutral-800/50">
                  {data.copywriting.productDesc}
                </p>
             </div>
             
             <div className="flex flex-col space-y-4">
               <div>
                 <div className="text-xs text-neutral-500 uppercase font-semibold mb-2">Ad Headline</div>
                 <h4 className="text-lg font-bold text-white leading-tight">
                   "{data.copywriting.adCopy.headline}"
                 </h4>
               </div>
               <div className="flex-1">
                 <div className="text-xs text-neutral-500 uppercase font-semibold mb-2">Ad Body</div>
                 <p className="text-sm text-neutral-400">
                   {data.copywriting.adCopy.body}
                 </p>
               </div>
             </div>
          </div>
        </motion.div>
      )}

      {/* Campaign Strategy */}
      {data.campaignStrategy && (
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: 0.4 }}
           className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 flex flex-col"
        >
          <div className="flex items-center space-x-3 mb-5">
            <Presentation className="text-amber-400" size={20} />
            <h3 className="text-sm font-bold text-neutral-200 tracking-wider uppercase">Campaign Flight</h3>
          </div>
          
          <div className="space-y-5">
             <div>
               <div className="text-xs text-neutral-500 uppercase font-semibold mb-2">Channels</div>
               <div className="flex flex-wrap gap-2">
                 {data.campaignStrategy.channels.map(c => (
                   <span key={c} className="px-2 py-1 bg-amber-950/30 text-amber-500 border border-amber-900/30 rounded text-xs font-medium">
                     {c}
                   </span>
                 ))}
               </div>
             </div>
             
             <div>
               <div className="text-xs text-neutral-500 uppercase font-semibold mb-1">Budget Allocation</div>
               <div className="text-2xl font-mono text-white tracking-tight">{data.campaignStrategy.budgetAllocation}</div>
             </div>
             
             <div>
               <div className="text-xs text-neutral-500 uppercase font-semibold mb-1">Timeline</div>
               <div className="text-sm text-neutral-300 flex items-center space-x-2 bg-neutral-950 px-3 py-2 rounded-lg border border-neutral-800/50">
                 {data.campaignStrategy.timeline}
               </div>
             </div>
          </div>

        </motion.div>
      )}
    </motion.div>
  );
}
