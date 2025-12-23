import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";
import ChartCard from "./ChartCard";

const economyData = [
  { period: "2019", unemployment: 5.6, jobs: 120 },
  { period: "2020", unemployment: 9.5, jobs: 100 },
  { period: "2021", unemployment: 7.8, jobs: 110 },
  { period: "2022", unemployment: 6.2, jobs: 125 },
  { period: "2023", unemployment: 5.0, jobs: 135 },
];

export default function EconomyChart({ data }) {
  const economyDataLocal = data ?? [
    { period: '2019', unemployment: 5.6, jobs: 120 },
    { period: '2020', unemployment: 9.5, jobs: 100 },
    { period: '2021', unemployment: 7.8, jobs: 110 },
    { period: '2022', unemployment: 6.2, jobs: 125 },
    { period: '2023', unemployment: 5.0, jobs: 135 },
  ];

  return (
    <ChartCard title="Economy / Employment Metrics">
      <ResponsiveContainer>
        <LineChart data={economyDataLocal}>
          <defs>
            <linearGradient id="econUnempGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#fff0d6" />
              <stop offset="100%" stopColor="#f59e0b" />
            </linearGradient>
            <linearGradient id="econJobsGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#dde0ff" />
              <stop offset="100%" stopColor="#6366f1" />
            </linearGradient>
          </defs>
          <CartesianGrid horizontal={false} vertical={false} />
          <XAxis dataKey="period" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="unemployment"
            name="Unemployment (%)"
            stroke="url(#econUnempGrad)"
            strokeWidth={2}
            dot={{ r: 3 }}
          />
          <Line
            type="monotone"
            dataKey="jobs"
            name="Jobs (k)"
            stroke="url(#econJobsGrad)"
            strokeWidth={2}
            dot={{ r: 3 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}
