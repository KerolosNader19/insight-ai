"use client";

import { Search, Bell, UserCircle, ChevronDown } from "lucide-react";
import { useAuthStore } from "@/store/authStore";
import { useTranslation } from "@/hooks/useTranslation";
import { LanguageSwitcher } from "@/components/i18n/LanguageSwitcher";

export function TopBar() {
  const { currentOrg, user } = useAuthStore();
  const { t } = useTranslation();

  return (
    <header className="h-16 border-b border-brand-border bg-brand-primary/80 backdrop-blur-md flex items-center justify-between px-8 shrink-0 relative z-20">
      <div className="flex items-center gap-4 flex-1">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-brand-border bg-brand-surface/50 cursor-pointer hover:bg-brand-border/30 transition-colors">
          <div className="w-5 h-5 bg-brand-accent rounded flex items-center justify-center text-[10px] text-brand-primary font-bold">
            {currentOrg?.name?.charAt(0) || "I"}
          </div>
          <span className="text-sm font-medium">{currentOrg?.name || "Insight AI Org"}</span>
          <ChevronDown className="w-4 h-4 text-foreground/40" />
        </div>

        <div className="relative max-w-md w-full ml-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/40" />
          <input 
            type="text" 
            placeholder={t.dashboard.prompts.filterPrompts}
            className="w-full bg-brand-surface/50 border border-brand-border rounded-lg py-1.5 pl-10 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-brand-accent transition-all"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <LanguageSwitcher />
        <button className="p-2 text-foreground/60 hover:text-foreground transition-colors relative">
          <Bell className="w-5 h-5" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-brand-accent rounded-full border-2 border-brand-primary" />
        </button>

        <div className="h-8 w-[1px] bg-brand-border mx-2" />

        <div className="flex items-center gap-3 cursor-pointer group">
          <div className="text-right">
            <p className="text-sm font-medium group-hover:text-brand-accent transition-colors">
              {user?.fullName || "Omar Alexander"}
            </p>
            <p className="text-[10px] text-foreground/40 uppercase tracking-widest font-bold">
              {currentOrg?.role || "OWNER"}
            </p>
          </div>
          <div className="w-9 h-9 rounded-full bg-brand-border/50 flex items-center justify-center overflow-hidden border border-brand-border group-hover:border-brand-accent transition-colors">
            {user?.avatarUrl ? (
              <img src={user.avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
            ) : (
              <UserCircle className="w-6 h-6 text-foreground/40" />
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
