import { GoogleGenAI } from "@google/genai";
import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API endpoints
  app.post("/api/orchestrate", async (req, res) => {
    try {
      const { goal } = req.body;
      
      const ai = new GoogleGenAI({ 
        apiKey: process.env.GEMINI_API_KEY,
        httpOptions: { headers: { "User-Agent": "aistudio-build" } }
      });

      const prompt = `You are the FashionOS X Enterprise CEO Orchestrator Agent. 
You are orchestrating a marketing, creative, and analytics workflow.
The user provided the business goal: "${goal}"

Create an execution plan across your autonomous agents.
Divide your response into strictly structured JSON, representing the outputs of different agent teams:
{
  "ceoAgent": {
    "strategySummary": "A high level summary",
    "kpis": ["..."]
  },
  "marketResearch": {
    "insights": ["...", "..."],
    "targetAudience": "..."
  },
  "copywriting": {
    "productDesc": "...",
    "adCopy": {
      "headline": "...",
      "body": "..."
    }
  },
  "campaignStrategy": {
    "channels": ["..."],
    "budgetAllocation": "...",
    "timeline": "..."
  }
}
Return valid JSON only. Do not wrap in markdown boxes like \`\`\`json.`;

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json"
        }
      });

      const text = response.text || "{}";
      const data = JSON.parse(text);
      
      res.json({ success: true, data });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error: "Task failed" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Production: serve static files and SPA fallback
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
