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

const populationData = [
  { period: "2019", population: 37.6, netMigration: 0.25 },
  { period: "2020", population: 37.7, netMigration: -0.05 },
  { period: "2021", population: 37.9, netMigration: 0.15 },
  { period: "2022", population: 38.2, netMigration: 0.4 },
  { period: "2023", population: 38.5, netMigration: 0.35 },
];

export default function PopulationChart({ data }) {
  const populationDataLocal = data ?? [
    { period: '2019', population: 37.6, netMigration: 0.25 },
    { period: '2020', population: 37.7, netMigration: -0.05 },
    { period: '2021', population: 37.9, netMigration: 0.15 },
    { period: '2022', population: 38.2, netMigration: 0.4 },
    { period: '2023', population: 38.5, netMigration: 0.35 },
  ];

  return (
    <ChartCard title="Population / Migration Metrics">
      <ResponsiveContainer>
        <LineChart data={populationDataLocal}>
          <defs>
            <linearGradient id="popGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#9ef6fb" />
              <stop offset="100%" stopColor="#06b6d4" />
            </linearGradient>
            <linearGradient id="netMigGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#ffd0d9" />
              <stop offset="100%" stopColor="#fb7185" />
            </linearGradient>
          </defs>
          <CartesianGrid horizontal={false} vertical={false} />
          <XAxis dataKey="period" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="population"
            name="Population (M)"
            stroke="url(#popGrad)"
            strokeWidth={2}
            dot={{ r: 3 }}
          />
          <Line
            type="monotone"
            dataKey="netMigration"
            name="Net Migration (M)"
            stroke="url(#netMigGrad)"
            strokeWidth={2}
            dot={{ r: 3 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}
