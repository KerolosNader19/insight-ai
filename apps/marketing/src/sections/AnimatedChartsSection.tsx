import { useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import {
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { SectionLabel } from '@/components/SectionLabel';
import { CharacterReveal } from '@/components/CharacterReveal';
import { SlideIn } from '@/components/SlideIn';

gsap.registerPlugin(ScrollTrigger);

const SOV_DATA = [
  { name: 'Your Brand', value: 23, color: '#79fcd4' },
  { name: 'Competitor A', value: 35, color: '#1d1d1d' },
  { name: 'Competitor B', value: 25, color: '#d0cec5' },
  { name: 'Competitor C', value: 17, color: '#979797' },
];

const SENTIMENT_DATA = [
  { day: 'Mon', positive: 45, neutral: 30, negative: 8 },
  { day: 'Tue', positive: 52, neutral: 25, negative: 12 },
  { day: 'Wed', positive: 38, neutral: 35, negative: 15 },
  { day: 'Thu', positive: 60, neutral: 28, negative: 10 },
  { day: 'Fri', positive: 55, neutral: 32, negative: 7 },
  { day: 'Sat', positive: 42, neutral: 38, negative: 5 },
  { day: 'Sun', positive: 48, neutral: 30, negative: 9 },
];

const TIME_TABS = ['7d', '30d', '90d'];

function LiveBadge() {
  return (
    <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-white/90 backdrop-blur-sm rounded px-2 py-1 z-10">
      <span className="w-1.5 h-1.5 rounded-full bg-brand-red animate-pulse-dot" />
      <span className="font-body text-[11px] font-medium text-brand-red">LIVE</span>
    </div>
  );
}

interface ChartCardProps {
  title: string;
  footer: string;
  children: React.ReactNode;
}

function ChartCard({ title, footer, children }: ChartCardProps) {
  const [activeTab, setActiveTab] = useState('7d');

  return (
    <div className="relative bg-white rounded-xl p-6 md:p-10 shadow-card transition-all duration-400 hover:-translate-y-1 hover:shadow-card-hover">
      <LiveBadge />
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-display text-[24px] text-brand-black">{title}</h3>
        <div className="flex gap-2">
          {TIME_TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`font-body text-[14px] px-2 py-1 transition-colors duration-300 ${
                activeTab === tab
                  ? 'text-brand-black border-b border-brand-black'
                  : 'text-dark-gray hover:text-brand-black'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>
      <div className="h-[240px] md:h-[320px]">{children}</div>
      <p className="font-body text-[13px] text-dark-gray mt-4">{footer}</p>
    </div>
  );
}

function ShareOfVoiceChart() {
  const [centerValue, setCenterValue] = useState(0);
  const chartRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.to(
      { val: 0 },
      {
        val: 23,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: chartRef.current,
          start: 'top 75%',
          toggleActions: 'play none none none',
        },
        onUpdate: function () {
          setCenterValue(Math.round(this.targets()[0].val));
        },
      }
    );
  }, { scope: chartRef });

  return (
    <div ref={chartRef} className="relative h-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={SOV_DATA}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={100}
            paddingAngle={3}
            dataKey="value"
            animationBegin={0}
            animationDuration={1200}
            animationEasing="ease-out"
          >
            {SOV_DATA.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        <span className="font-body text-[13px] text-dark-gray">Your Brand</span>
        <span className="font-display text-[36px] text-brand-black">{centerValue}%</span>
      </div>
      {/* Legend */}
      <div className="mt-2 space-y-2">
        {SOV_DATA.map((item) => (
          <div key={item.name} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
              <span className="font-body text-[14px] text-brand-black">{item.name}</span>
            </div>
            <span className="font-body text-[14px] text-dark-gray">{item.value}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function SentimentAreaChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={SENTIMENT_DATA} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
        <defs>
          <linearGradient id="gradPos" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#79fcd4" stopOpacity={0.3} />
            <stop offset="95%" stopColor="#79fcd4" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="gradNeu" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#d0cec5" stopOpacity={0.3} />
            <stop offset="95%" stopColor="#d0cec5" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="gradNeg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#ff1b1b" stopOpacity={0.3} />
            <stop offset="95%" stopColor="#ff1b1b" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#e2e2e2" vertical={false} />
        <XAxis
          dataKey="day"
          axisLine={false}
          tickLine={false}
          tick={{ fontSize: 12, fill: '#979797', fontFamily: 'Inter' }}
        />
        <YAxis
          axisLine={false}
          tickLine={false}
          tick={{ fontSize: 12, fill: '#979797', fontFamily: 'Inter' }}
        />
        <Tooltip
          contentStyle={{
            background: '#1d1d1d',
            border: 'none',
            borderRadius: '8px',
            color: '#fff',
            fontFamily: 'Inter',
            fontSize: '13px',
          }}
        />
        <Area
          type="monotone"
          dataKey="positive"
          stackId="1"
          stroke="#79fcd4"
          fill="url(#gradPos)"
          strokeWidth={2}
          animationDuration={1500}
          animationEasing="ease-out"
        />
        <Area
          type="monotone"
          dataKey="neutral"
          stackId="1"
          stroke="#d0cec5"
          fill="url(#gradNeu)"
          strokeWidth={2}
          animationDuration={1500}
          animationEasing="ease-out"
          animationBegin={300}
        />
        <Area
          type="monotone"
          dataKey="negative"
          stackId="1"
          stroke="#ff1b1b"
          fill="url(#gradNeg)"
          strokeWidth={2}
          animationDuration={1500}
          animationEasing="ease-out"
          animationBegin={600}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export function AnimatedChartsSection() {
  return (
    <section
      id="intelligence"
      className="relative w-full bg-beige-light section-gap page-padding"
    >
      <div className="max-w-[1200px] mx-auto">
        {/* Section Header */}
        <SectionLabel text="INTELLIGENCE ENGINE" />
        <CharacterReveal
          as="h2"
          className="font-display text-section-heading text-brand-black max-w-[600px] mb-20 md:mb-[80px]"
        >
          Data that drives decisions.
        </CharacterReveal>

        {/* Chart Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <SlideIn direction="left">
            <ChartCard title="Share of Voice" footer="Updated 2 hours ago">
              <ShareOfVoiceChart />
            </ChartCard>
          </SlideIn>

          <SlideIn direction="right" delay={0.2}>
            <ChartCard title="Sentiment Trend" footer="Based on 1,247 mentions">
              <ChartCardSentiment />
            </ChartCard>
          </SlideIn>
        </div>
      </div>
    </section>
  );
}

// Wrapper to pass children properly
function ChartCardSentiment() {
  return <SentimentAreaChart />;
}
