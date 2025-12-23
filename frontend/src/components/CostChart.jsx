import {
  ResponsiveContainer,
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";
import ChartCard from "./ChartCard";

const costData = [
  { period: "2019", inflation: 1.9, groceries: 100 },
  { period: "2020", inflation: 0.7, groceries: 103 },
  { period: "2021", inflation: 3.4, groceries: 110 },
  { period: "2022", inflation: 6.8, groceries: 125 },
  { period: "2023", inflation: 4.0, groceries: 130 },
];

export default function CostChart({ data }) {
  const costDataLocal = data ?? [
    { period: '2019', inflation: 1.9, groceries: 100 },
    { period: '2020', inflation: 0.7, groceries: 103 },
    { period: '2021', inflation: 3.4, groceries: 110 },
    { period: '2022', inflation: 6.8, groceries: 125 },
    { period: '2023', inflation: 4.0, groceries: 130 },
  ];

  return (
    <ChartCard title="Cost of Living Metrics">
      <ResponsiveContainer>
        <AreaChart data={costDataLocal}>
          <defs>
            <linearGradient id="costInflationGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#e9d7ff" />
              <stop offset="100%" stopColor="#7c3aed" />
            </linearGradient>
            <linearGradient id="costGroceriesGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#9ef6fb" />
              <stop offset="100%" stopColor="#06b6d4" />
            </linearGradient>
          </defs>
          <CartesianGrid horizontal={false} vertical={false} />
          <XAxis dataKey="period" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Area
            type="monotone"
            dataKey="inflation"
            name="Inflation (%)"
            stroke="url(#costInflationGrad)"
            fill="url(#costInflationGrad)"
            fillOpacity={0.18}
            strokeWidth={2}
          />
          <Area
            type="monotone"
            dataKey="groceries"
            name="Groceries Index"
            stroke="url(#costGroceriesGrad)"
            fill="url(#costGroceriesGrad)"
            fillOpacity={0.12}
            strokeWidth={2}
          />
        </AreaChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}
