"use client";

import { useModalStore } from "@/store/modalStore";
import { X, FileText, Download, Target, Plus, AlertTriangle, CheckCircle2, Users } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "@/hooks/useTranslation";

export function ModalManager() {
  const { activeModal, closeModal, modalData } = useModalStore();
  const { t } = useTranslation();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!activeModal) return null;

  const handleAction = async () => {
    setIsProcessing(true);
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsProcessing(false);
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      closeModal();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
      <div className="absolute inset-0 bg-brand-primary/80 backdrop-blur-sm" onClick={closeModal} />
      
      <div className="relative w-full max-w-lg bg-brand-surface border border-brand-border rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        <button onClick={closeModal} className="absolute top-6 right-6 p-2 text-foreground/40 hover:text-foreground transition-colors">
          <X className="w-5 h-5" />
        </button>

        {/* Report Generation Modal */}
        {activeModal === "report" && (
          <div className="p-8">
            <div className="w-12 h-12 rounded-xl bg-brand-accent/20 text-brand-accent flex items-center justify-center mb-6">
              <FileText className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold mb-2">{t.dashboard.generateReport}</h2>
            <p className="text-foreground/40 text-sm mb-8">Generate a detailed PDF summary of your AI search visibility and competitor rankings.</p>
            
            <div className="space-y-4 mb-8">
              <div className="p-4 rounded-xl border border-brand-border bg-brand-primary/50">
                <p className="text-xs font-bold uppercase tracking-widest text-foreground/40 mb-2">Selected Range</p>
                <p className="text-sm">Last 30 Days (April 14 - May 14, 2026)</p>
              </div>
              <div className="p-4 rounded-xl border border-brand-border bg-brand-primary/50">
                <p className="text-xs font-bold uppercase tracking-widest text-foreground/40 mb-2">Included Engines</p>
                <p className="text-sm">ChatGPT, Perplexity, Gemini</p>
              </div>
            </div>

            <button 
              disabled={isProcessing}
              onClick={handleAction}
              className="w-full btn-premium py-4 flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isProcessing ? (
                <div className="w-5 h-5 border-2 border-brand-primary border-t-transparent rounded-full animate-spin" />
              ) : isSuccess ? (
                <CheckCircle2 className="w-5 h-5" />
              ) : (
                <Download className="w-5 h-5" />
              )}
              {isProcessing ? "Processing..." : isSuccess ? "Success!" : "Generate & Download"}
            </button>
          </div>
        )}

        {/* Create Prompt Modal */}
        {activeModal === "prompt" && (
          <div className="p-8">
            <div className="w-12 h-12 rounded-xl bg-brand-accent/20 text-brand-accent flex items-center justify-center mb-6">
              <Target className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold mb-2">{t.dashboard.prompts.addPrompt}</h2>
            <p className="text-foreground/40 text-sm mb-8">Add a new query to track across generative engines.</p>
            
            <div className="space-y-6 mb-8">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-foreground/40">Query Text</label>
                <textarea 
                  placeholder="e.g. How does Insight AI compare to Competitor X?"
                  className="w-full bg-brand-primary border border-brand-border rounded-xl p-4 text-sm focus:outline-none focus:ring-1 focus:ring-brand-accent transition-all min-h-[100px]"
                />
              </div>
              <div className="flex items-center justify-between p-4 rounded-xl border border-brand-border bg-brand-primary/50">
                <span className="text-sm">Daily Auto-Scan</span>
                <div className="w-10 h-5 bg-brand-accent rounded-full relative cursor-pointer">
                  <div className="absolute right-1 top-1 w-3 h-3 bg-brand-primary rounded-full" />
                </div>
              </div>
            </div>

            <button 
              disabled={isProcessing}
              onClick={handleAction}
              className="w-full btn-premium py-4 flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isProcessing ? (
                <div className="w-5 h-5 border-2 border-brand-primary border-t-transparent rounded-full animate-spin" />
              ) : isSuccess ? (
                <CheckCircle2 className="w-5 h-5" />
              ) : (
                <Plus className="w-5 h-5" />
              )}
              {isProcessing ? "Adding..." : isSuccess ? "Added!" : "Track Prompt"}
            </button>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {activeModal === "delete_confirm" && (
          <div className="p-8">
            <div className="w-12 h-12 rounded-xl bg-red-500/20 text-red-500 flex items-center justify-center mb-6">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Are you sure?</h2>
            <p className="text-foreground/40 text-sm mb-8">This action cannot be undone. All tracking data for this item will be permanently removed.</p>
            
            <div className="flex gap-4">
              <button onClick={closeModal} className="flex-1 py-4 border border-brand-border rounded-xl font-bold hover:bg-brand-border/30 transition-colors">
                Cancel
              </button>
              <button 
                disabled={isProcessing}
                onClick={handleAction}
                className="flex-1 py-4 bg-red-500 text-white rounded-xl font-bold hover:bg-red-600 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isProcessing ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" /> : "Delete"}
              </button>
            </div>
          </div>
        )}

        {/* Add Competitor Modal */}
        {activeModal === "competitor" && (
          <div className="p-8">
            <div className="w-12 h-12 rounded-xl bg-brand-accent/20 text-brand-accent flex items-center justify-center mb-6">
              <Users className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Add Competitor</h2>
            <p className="text-foreground/40 text-sm mb-8">Enter the domain of a competitor to track their AI share of voice.</p>
            
            <div className="space-y-6 mb-8">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-foreground/40">Competitor Domain</label>
                <input 
                  type="text"
                  placeholder="e.g. competitor.ai"
                  className="w-full bg-brand-primary border border-brand-border rounded-xl p-4 text-sm focus:outline-none focus:ring-1 focus:ring-brand-accent transition-all"
                />
              </div>
            </div>

            <button 
              disabled={isProcessing}
              onClick={handleAction}
              className="w-full btn-premium py-4 flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isProcessing ? (
                <div className="w-5 h-5 border-2 border-brand-primary border-t-transparent rounded-full animate-spin" />
              ) : isSuccess ? (
                <CheckCircle2 className="w-5 h-5" />
              ) : (
                <Plus className="w-5 h-5" />
              )}
              {isProcessing ? "Adding..." : isSuccess ? "Added!" : "Start Tracking"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
