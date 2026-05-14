"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";

const DATA = [
  { name: "Your Brand", value: 45, color: "#00f5d4" },
  { name: "Competitor A", value: 25, color: "#30363d" },
  { name: "Competitor B", value: 20, color: "#484f58" },
  { name: "Other", value: 10, color: "#21262d" },
];

export function ShareOfVoiceChart() {
  return (
    <div className="bg-brand-surface border border-brand-border rounded-xl p-6 h-full">
      <h3 className="text-sm font-medium text-foreground/60 mb-6">Share of Voice</h3>
      
      <div className="h-[250px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={DATA}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={90}
              paddingAngle={4}
              dataKey="value"
              stroke="none"
            >
              {DATA.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{ backgroundColor: "#161b22", border: "1px solid #30363d", borderRadius: "8px" }}
              itemStyle={{ color: "#f0f6fc" }}
            />
            <Legend verticalAlign="bottom" height={36}/>
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
