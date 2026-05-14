import posthog from 'posthog-js';

// Types for centralized event tracking
export type AnalyticsEvent = 
  | { name: 'user_signed_up'; properties: { method: 'email' | 'google' } }
  | { name: 'onboarding_completed'; properties: { time_to_complete_ms: number } }
  | { name: 'brand_created'; properties: { industry: string } }
  | { name: 'prompt_executed'; properties: { engine: string; query_length: number } }
  | { name: 'geo_report_viewed'; properties: { brand_id: string } }
  | { name: 'subscription_upgraded'; properties: { from_plan: string; to_plan: string } }
  | { name: 'teammate_invited'; properties: { role: string } };

class AnalyticsService {
  private initialized = false;

  init() {
    if (typeof window !== 'undefined' && !this.initialized) {
      posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
        api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://app.posthog.com',
        capture_pageview: false, // Handle manually for SPA
      });
      this.initialized = true;
    }
  }

  identify(userId: string, properties: Record<string, any> = {}) {
    posthog.identify(userId, properties);
  }

  track<T extends AnalyticsEvent>(event: T) {
    posthog.capture(event.name, event.properties);
    console.log(`[Analytics] Tracked: ${event.name}`, event.properties);
  }

  alias(distinctId: string, alias: string) {
    posthog.alias(distinctId, alias);
  }

  reset() {
    posthog.reset();
  }
}

export const analytics = new AnalyticsService();
