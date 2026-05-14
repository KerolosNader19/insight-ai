"use client";

import { Navigation } from "@/components/marketing/Navigation";
import { Footer } from "@/components/marketing/Footer";
import { ArrowUpRight } from "lucide-react";

export default function CareersPage() {
  return (
    <div className="flex flex-col min-h-screen bg-brand-primary">
      <Navigation />
      <main className="flex-1 pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-8">
            Build the <span className="text-brand-accent">Future</span> of Search.
          </h1>
          <p className="text-xl text-foreground/60 leading-relaxed mb-16 max-w-2xl mx-auto">
            Join a fast-growing team of innovators solving the hardest problems in AI search analytics.
          </p>
          
          <div className="space-y-4 text-left">
            {[
              { title: "Senior AI Engineer", location: "Remote / NYC", type: "Full-time" },
              { title: "Frontend Lead (React/Next.js)", location: "Remote", type: "Full-time" },
              { title: "Data Scientist", location: "San Francisco", type: "Full-time" },
              { title: "Technical Product Manager", location: "Remote", type: "Full-time" },
            ].map((job, i) => (
              <div key={i} className="p-6 rounded-2xl border border-brand-border bg-brand-surface/30 glass flex items-center justify-between hover:border-brand-accent/50 transition-all cursor-pointer group">
                <div>
                  <h3 className="text-lg font-bold group-hover:text-brand-accent transition-colors">{job.title}</h3>
                  <p className="text-xs text-foreground/40 mt-1 uppercase tracking-widest font-bold">{job.location} • {job.type}</p>
                </div>
                <ArrowUpRight className="w-5 h-5 text-foreground/20 group-hover:text-brand-accent transition-colors" />
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
