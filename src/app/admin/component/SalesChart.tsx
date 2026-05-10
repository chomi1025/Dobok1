"use client";

import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";

const data = [
  { name: "04/18", sales: 400000 },
  { name: "04/19", sales: 300000 },
  { name: "04/20", sales: 200000 },
  { name: "04/21", sales: 278000 },
  { name: "04/22", sales: 189000 },
  { name: "04/23", sales: 239000 },
  { name: "04/24", sales: 349000 },
  { name: "04/25", sales: 349000 },
  { name: "04/26", sales: 349000 },
  { name: "04/27", sales: 349000 },
];

export default function SalesChart() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div style={{ width: "100%", height: 300, marginTop: "20px" }} />;
  }

  return (
    <div style={{ width: "100%", height: 500, marginTop: "20px", minWidth: 0 }}>
      <AreaChart
        width={1144}
        height={500}
        data={data}
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        style={{ width: "100%" }}
      >
        <defs>
          <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.1} />
            <stop offset="95%" stopColor="#4f46e5" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
        <XAxis
          dataKey="name"
          axisLine={false}
          tickLine={false}
          tick={{ fill: "#9ca3af", fontSize: 12 }}
          dy={10}
        />
        <YAxis
          axisLine={false}
          tickLine={false}
          tick={{ fill: "#9ca3af", fontSize: 12 }}
          tickFormatter={(value) => `${(value / 10000).toLocaleString()}만`}
        />
        <Tooltip
          contentStyle={{
            borderRadius: "8px",
            border: "none",
            boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
          }}
          formatter={(value: any) => {
            if (value === undefined || value === null) return ["0원", "매출"];
            return [`${Number(value).toLocaleString()}원`, "매출"];
          }}
        />
        <Area
          type="monotone"
          dataKey="sales"
          stroke="#4f46e5"
          strokeWidth={2}
          fillOpacity={1}
          fill="url(#colorSales)"
        />
      </AreaChart>
    </div>
  );
}
