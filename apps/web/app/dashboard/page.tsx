"use client";

import { GeoScoreWidget } from "@/components/dashboard/GeoScoreWidget";
import { ShareOfVoiceChart } from "@/components/dashboard/ShareOfVoiceChart";
import { VisibilityTrendChart } from "@/components/dashboard/VisibilityTrendChart";
import { ArrowUpRight, TrendingUp, Users, MessageSquare, Target, Zap } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";
import { useModalStore } from "@/store/modalStore";

export default function DashboardOverview() {
  const { t } = useTranslation();
  const { openModal } = useModalStore();

  const STATS = [
    { label: t.dashboard.totalMentions, value: "2,543", change: "+14.5%", icon: MessageSquare },
    { label: t.dashboard.avgGeoScore, value: "72.4", change: "+5.2%", icon: TrendingUp },
    { label: t.dashboard.activePrompts, value: "12", change: "0%", icon: Target },
    { label: t.dashboard.marketShare, value: "18.2%", change: "-2.1%", icon: Users },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{t.nav.overview}</h1>
          <p className="text-foreground/40 text-sm mt-1">{t.dashboard.analytics.deepDive}</p>
        </div>
        <button 
          onClick={() => openModal("report")}
          className="px-4 py-2 bg-brand-accent text-brand-primary font-bold rounded-lg text-sm flex items-center gap-2 hover:brightness-110 transition-all"
        >
          {t.dashboard.generateReport} <ArrowUpRight className="w-4 h-4" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {STATS.map((stat, i) => (
          <div key={i} className="p-6 rounded-xl border border-brand-border bg-brand-surface/30 glass">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 rounded-lg bg-brand-border/30">
                <stat.icon className="w-5 h-5 text-brand-accent" />
              </div>
              <span className={`text-xs font-bold ${stat.change.startsWith('+') ? 'text-brand-accent' : 'text-red-500'}`}>
                {stat.change}
              </span>
            </div>
            <p className="text-sm font-medium text-foreground/40 uppercase tracking-widest">{stat.label}</p>
            <p className="text-3xl font-bold mt-1">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <VisibilityTrendChart title={t.dashboard.visibilityTrend} />
        </div>
        <div className="lg:col-span-1">
          <GeoScoreWidget score={72} label={t.dashboard.avgGeoScore} />
          <div className="mt-6">
            <ShareOfVoiceChart title={t.dashboard.shareOfVoice} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="p-6 rounded-xl border border-brand-border bg-brand-surface/30 glass">
          <h3 className="text-sm font-medium text-foreground/60 mb-6">{t.dashboard.recentActivity}</h3>
          <div className="space-y-4">
            {[1, 2, 3].map((item) => (
              <div key={item} className="p-4 rounded-lg bg-brand-border/10 border border-brand-border/50 hover:border-brand-accent/30 transition-colors cursor-pointer group">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-brand-accent/10 text-brand-accent text-[10px] font-bold uppercase">Perplexity</span>
                    <span className="text-[10px] text-foreground/40 font-mono">2 mins ago</span>
                  </div>
                  <ArrowUpRight className="w-3 h-3 text-foreground/20 group-hover:text-brand-accent transition-colors" />
                </div>
                <p className="text-sm font-medium line-clamp-1">"How does Insight AI compare to traditional SEO tools?"</p>
                <p className="text-xs text-foreground/40 mt-1 line-clamp-2">"Insight AI provides a specialized set of analytics for generative engines, focusing on mention detection and citation authority..."</p>
              </div>
            ))}
          </div>
        </div>

        <div className="p-6 rounded-xl border border-brand-border bg-brand-surface/30 glass">
          <h3 className="text-sm font-medium text-foreground/60 mb-6">{t.dashboard.recommendationsTitle}</h3>
          <div className="space-y-4">
            <div className="flex gap-4 p-4 rounded-lg bg-brand-accent/5 border border-brand-accent/20">
              <div className="w-8 h-8 rounded-full bg-brand-accent/20 flex items-center justify-center shrink-0">
                <Zap className="w-4 h-4 text-brand-accent" />
              </div>
              <div>
                <p className="text-sm font-bold">Improve Citation Authority</p>
                <p className="text-xs text-foreground/60 mt-1">Your brand is mentioned in ChatGPT but lacks citations from high-authority tech blogs. Targeted outreach recommended.</p>
              </div>
            </div>
            <div className="flex gap-4 p-4 rounded-lg bg-blue-500/5 border border-blue-500/20">
              <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center shrink-0">
                <TrendingUp className="w-4 h-4 text-blue-500" />
              </div>
              <div>
                <p className="text-sm font-bold">Monitor Competitor A Spike</p>
                <p className="text-xs text-foreground/60 mt-1">Competitor A's Share of Voice on Perplexity increased by 15% this week. Reviewing recent product launches.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
