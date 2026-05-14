"use client";

import { UserCircle, Building2, Bell, Key } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";

export default function SettingsPage() {
  const { t } = useTranslation();

  const SECTIONS = [
    { icon: UserCircle, title: t.dashboard.settings.profile, desc: "Update your personal information and password." },
    { icon: Building2, title: t.dashboard.settings.organization, desc: "Manage your team members and billing." },
    { icon: Bell, title: t.dashboard.settings.notifications, desc: "Configure how you receive alerts." },
    { icon: Key, title: t.dashboard.settings.api, desc: "Manage API keys for programmatic access." },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{t.nav.settings}</h1>
        <p className="text-foreground/40 text-sm mt-1">Configure your Insight AI experience.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {SECTIONS.map((section, i) => (
          <div key={i} className="p-8 rounded-2xl border border-brand-border bg-brand-surface/30 glass cursor-pointer hover:border-brand-accent/30 transition-all group">
            <div className="flex items-start gap-6">
              <div className="w-12 h-12 rounded-xl bg-brand-border/30 flex items-center justify-center shrink-0 group-hover:bg-brand-accent/10 transition-colors">
                <section.icon className="w-6 h-6 text-foreground/40 group-hover:text-brand-accent transition-colors" />
              </div>
              <div>
                <h3 className="text-lg font-bold mb-1 group-hover:text-foreground transition-colors">{section.title}</h3>
                <p className="text-foreground/40 text-sm">{section.desc}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
