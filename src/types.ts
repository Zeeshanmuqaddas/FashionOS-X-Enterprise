export type AgentState = "idle" | "running" | "completed" | "error";

export interface DashboardData {
  ceoAgent?: { 
    strategySummary: string; 
    kpis: string[] 
  };
  marketResearch?: { 
    insights: string[]; 
    targetAudience: string 
  };
  copywriting?: { 
    productDesc: string; 
    adCopy: { headline: string; body: string } 
  };
  campaignStrategy?: { 
    channels: string[]; 
    budgetAllocation: string; 
    timeline: string 
  };
}
