"use client";

import { FileText, Download, Share2, Plus, CheckCircle2, Loader2 } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";
import { useModalStore } from "@/store/modalStore";
import { useState } from "react";

export default function ReportsPage() {
  const { t } = useTranslation();
  const { openModal } = useModalStore();
  const [downloadingId, setDownloadingId] = useState<number | null>(null);

  const REPORTS = [
    { id: 1, title: "Monthly Visibility Summary", date: "May 2026", type: "PDF" },
    { id: 2, title: "Competitor Analysis Q2", date: "Apr 2026", type: "CSV" },
    { id: 3, title: "AI Share of Voice Detailed", date: "Apr 2026", type: "PDF" },
  ];

  const handleDownload = (id: number) => {
    setDownloadingId(id);
    // Simulate download delay
    setTimeout(() => {
      setDownloadingId(null);
    }, 2000);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{t.nav.reports}</h1>
          <p className="text-foreground/40 text-sm mt-1">Export and schedule visibility reports for your stakeholders.</p>
        </div>
        <button 
          onClick={() => openModal("report")}
          className="px-4 py-2 bg-brand-accent text-brand-primary font-bold rounded-lg text-sm flex items-center gap-2 hover:brightness-110 transition-all"
        >
          <Plus className="w-4 h-4" /> {t.dashboard.generateReport}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {REPORTS.map((report) => {
          const isDownloading = downloadingId === report.id;
          return (
            <div key={report.id} className="p-6 rounded-2xl border border-brand-border bg-brand-surface/30 glass group hover:border-brand-accent/30 transition-all">
              <div className="w-12 h-12 rounded-xl bg-brand-border/30 flex items-center justify-center mb-6 group-hover:bg-brand-accent/10 transition-colors">
                <FileText className="w-6 h-6 text-foreground/40 group-hover:text-brand-accent transition-colors" />
              </div>
              <h3 className="font-bold mb-1">{report.title}</h3>
              <p className="text-xs text-foreground/40 mb-6">{report.date} • {report.type}</p>
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => handleDownload(report.id)}
                  disabled={isDownloading}
                  className={`flex-1 py-2 rounded-lg text-xs font-bold flex items-center justify-center gap-2 transition-colors ${
                    isDownloading ? "bg-brand-accent/20 text-brand-accent cursor-not-allowed" : "bg-brand-border/30 hover:bg-brand-border/50"
                  }`}
                >
                  {isDownloading ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      Downloading...
                    </>
                  ) : (
                    <>
                      <Download className="w-3.5 h-3.5" />
                      Download
                    </>
                  )}
                </button>
                <button className="p-2 rounded-lg border border-brand-border hover:bg-brand-border/50 transition-colors">
                  <Share2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
