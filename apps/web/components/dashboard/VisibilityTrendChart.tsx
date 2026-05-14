"use client";

import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from "recharts";

const DATA = [
  { date: "May 1", score: 40 },
  { date: "May 2", score: 45 },
  { date: "May 3", score: 42 },
  { date: "May 4", score: 50 },
  { date: "May 5", score: 48 },
  { date: "May 6", score: 55 },
  { date: "May 7", score: 62 },
  { date: "May 8", score: 58 },
  { date: "May 9", score: 65 },
  { date: "May 10", score: 72 },
];

export function VisibilityTrendChart() {
  return (
    <div className="bg-brand-surface border border-brand-border rounded-xl p-6 h-full">
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-sm font-medium text-foreground/60">Visibility Index (GEO Score)</h3>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-brand-accent/20 border border-brand-accent" />
          <span className="text-[10px] text-foreground/40 uppercase font-bold tracking-widest">30 Day Trend</span>
        </div>
      </div>
      
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#00f5d4" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#00f5d4" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#30363d" />
            <XAxis 
              dataKey="date" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: "#484f58", fontSize: 10 }}
              dy={10}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: "#484f58", fontSize: 10 }}
            />
            <Tooltip 
              contentStyle={{ backgroundColor: "#161b22", border: "1px solid #30363d", borderRadius: "8px" }}
              itemStyle={{ color: "#00f5d4" }}
            />
            <Area 
              type="monotone" 
              dataKey="score" 
              stroke="#00f5d4" 
              strokeWidth={3}
              fillOpacity={1} 
              fill="url(#colorScore)" 
              animationDuration={2000}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
