"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";

export default function LoginPage() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-brand-primary flex flex-col items-center justify-center px-6 relative overflow-hidden">
      <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-brand-accent/5 blur-[120px] rounded-full pointer-events-none" />
      
      <Link href="/" className="absolute top-8 left-8 flex items-center gap-2 text-foreground/40 hover:text-brand-accent transition-colors">
        <ArrowLeft className="w-4 h-4" /> {t.common.backToHome}
      </Link>

      <div className="w-full max-w-md p-8 rounded-3xl border border-brand-border bg-brand-surface/30 glass animate-in fade-in zoom-in duration-500">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold tracking-tight">{t.auth.loginTitle}</h1>
          <p className="text-foreground/40 text-sm mt-2">{t.auth.loginSubtitle}</p>
        </div>

        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-foreground/40">{t.auth.email}</label>
            <input 
              type="email" 
              placeholder="name@company.com"
              className="w-full bg-brand-surface border border-brand-border rounded-xl py-3 px-4 focus:outline-none focus:ring-1 focus:ring-brand-accent transition-all"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-foreground/40">{t.auth.password}</label>
            <input 
              type="password" 
              placeholder="••••••••"
              className="w-full bg-brand-surface border border-brand-border rounded-xl py-3 px-4 focus:outline-none focus:ring-1 focus:ring-brand-accent transition-all"
            />
          </div>

          <Link href="/dashboard" className="w-full btn-premium py-4 flex items-center justify-center">
            {t.auth.signIn}
          </Link>
        </form>

        <p className="text-center mt-8 text-sm text-foreground/40">
          {t.auth.noAccount} <Link href="/register" className="text-brand-accent hover:underline">{t.auth.signUp}</Link>
        </p>
      </div>
    </div>
  );
}
