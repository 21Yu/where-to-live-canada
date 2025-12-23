import {
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";
import ChartCard from "./ChartCard";

const housingData = [
  { period: "2019", priceIndex: 95, vacancy: 3.2 },
  { period: "2020", priceIndex: 100, vacancy: 2.8 },
  { period: "2021", priceIndex: 115, vacancy: 2.1 },
  { period: "2022", priceIndex: 130, vacancy: 1.9 },
  { period: "2023", priceIndex: 142, vacancy: 1.7 },
];

export default function HousingChart({ data }) {
  const housingData = data ?? [
    { period: '2019', priceIndex: 95, vacancy: 3.2 },
    { period: '2020', priceIndex: 100, vacancy: 2.8 },
    { period: '2021', priceIndex: 115, vacancy: 2.1 },
    { period: '2022', priceIndex: 130, vacancy: 1.9 },
    { period: '2023', priceIndex: 142, vacancy: 1.7 },
  ];

  return (
    <ChartCard title="Housing Metrics (Core)">
      <ResponsiveContainer>
        <BarChart data={housingData}>
          <defs>
            <linearGradient id="housePriceGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#e9d7ff" />
              <stop offset="100%" stopColor="#7c3aed" />
            </linearGradient>
            <linearGradient id="houseVacancyGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#9ef6fb" />
              <stop offset="100%" stopColor="#06b6d4" />
            </linearGradient>
          </defs>
          <CartesianGrid horizontal={false} vertical={false} />
          <XAxis dataKey="period" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="priceIndex" name="Price Index" fill="url(#housePriceGrad)" />
          <Bar dataKey="vacancy" name="Vacancy (%)" fill="url(#houseVacancyGrad)" />
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}
