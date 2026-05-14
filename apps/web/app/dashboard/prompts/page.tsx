"use client";

import { Target, Plus, Search, Trash2, Edit3, Play } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";
import { useModalStore } from "@/store/modalStore";
import { useState } from "react";

export default function PromptsPage() {
  const { t } = useTranslation();
  const { openModal } = useModalStore();
  const [search, setSearch] = useState("");

  const PROMPTS = [
    "How does Insight AI compare to traditional SEO tools?",
    "What are the best features of Insight AI for enterprises?",
    "Insight AI pricing vs competitors",
  ];

  const filteredPrompts = PROMPTS.filter(p => p.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{t.nav.prompts}</h1>
          <p className="text-foreground/40 text-sm mt-1">{t.dashboard.prompts.manage}</p>
        </div>
        <button 
          onClick={() => openModal("prompt")}
          className="px-4 py-2 bg-brand-accent text-brand-primary font-bold rounded-lg text-sm flex items-center gap-2 hover:brightness-110 transition-all"
        >
          <Plus className="w-4 h-4" /> {t.dashboard.prompts.addPrompt}
        </button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/40" />
        <input 
          type="text" 
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={t.dashboard.prompts.filterPrompts}
          className="w-full bg-brand-surface/50 border border-brand-border rounded-lg py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-brand-accent transition-all"
        />
      </div>

      <div className="space-y-4">
        {filteredPrompts.map((prompt, i) => (
          <div key={i} className="group p-6 rounded-xl border border-brand-border bg-brand-surface/30 glass flex items-center justify-between hover:border-brand-accent/30 transition-all">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-brand-accent/10 flex items-center justify-center text-brand-accent group-hover:scale-110 transition-transform">
                <Target className="w-5 h-5" />
              </div>
              <div>
                <p className="font-medium text-sm">{prompt}</p>
                <div className="flex items-center gap-3 mt-1">
                  <p className="text-[10px] text-foreground/40 uppercase tracking-widest font-bold">{t.dashboard.prompts.activeTracking}</p>
                  <span className="w-1 h-1 rounded-full bg-brand-border" />
                  <span className="text-[10px] text-green-500 font-bold uppercase">Healthy</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="p-2 rounded-lg hover:bg-brand-accent/10 text-brand-accent transition-colors" title="Run Scan Now">
                <Play className="w-4 h-4" />
              </button>
              <button className="p-2 rounded-lg hover:bg-brand-border/50 text-foreground/40 hover:text-foreground transition-colors">
                <Edit3 className="w-4 h-4" />
              </button>
              <button 
                onClick={() => openModal("delete_confirm")}
                className="p-2 rounded-lg hover:bg-red-500/10 text-foreground/20 hover:text-red-500 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
