import { ScrollTicker } from './ScrollTicker';

const NAV_LINKS = [
  'Brand Monitoring',
  'Competitor Intelligence',
  'Sentiment Analysis',
  'Citation Tracking',
  'GEO Optimization',
];

export function Footer() {
  return (
    <footer id="pricing" className="relative w-full bg-dark-teal overflow-hidden py-[60px] md:py-[100px] page-padding pb-8 md:pb-12">
      {/* Marquee Background */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-full overflow-hidden pointer-events-none z-0">
        <ScrollTicker
          items={['Insight AI', 'Insight AI', 'Insight AI', 'Insight AI', 'Insight AI', 'Insight AI']}
          className="opacity-[0.06]"
          itemClassName="text-[60px] md:text-[120px] text-white"
          separator="●"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-[1200px] mx-auto">
        {/* Top Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          {/* Brand Column */}
          <div>
            <h3 className="font-display text-[28px] md:text-[42px] font-bold text-white mb-2">
              Insight AI
            </h3>
            <p className="font-body text-[16px] text-white/60">
              AI Search Visibility Platform
            </p>
          </div>

          {/* Navigation Column */}
          <div>
            <h4 className="text-label uppercase text-white/50 mb-6">Platform</h4>
            <ul className="flex flex-col gap-4">
              {NAV_LINKS.map((link) => (
                <li key={link}>
                  <span className="font-body text-[16px] text-white hover:text-brand-teal transition-colors duration-400 cursor-pointer">
                    {link}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h4 className="text-label uppercase text-white/50 mb-6">Get in Touch</h4>
            <p className="font-body text-[18px] font-medium text-brand-teal mb-2">
              hello@insightai.com
            </p>
            <p className="font-body text-[16px] text-white/70 mb-8">
              +1 (555) 000-0000
            </p>
            <a
              href="#"
              className="inline-block font-body text-[16px] font-medium text-dark-teal bg-brand-teal px-7 py-3.5 rounded hover:bg-[#5de8c0] transition-colors duration-400"
            >
              Start Free Trial
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-white/15 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-body text-[14px] text-white/50">
            © 2025 Insight AI. All rights reserved.
          </p>
          <div className="flex gap-6">
            <span className="font-body text-[14px] text-white/50 hover:text-white transition-colors duration-400 cursor-pointer">
              Privacy Policy
            </span>
            <span className="font-body text-[14px] text-white/50 hover:text-white transition-colors duration-400 cursor-pointer">
              Terms of Service
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
