import React, { useEffect, useState } from "react";
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

export default function PopulationChart({ data }) {
  const [apiData, setApiData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;

    async function fetchPopulation() {
      setLoading(true);
      try {
        const res = await fetch("http://127.0.0.1:8000/api/statcan/population?years=5");
        if (!res.ok) throw new Error(res.statusText || "Fetch failed");
        const json = await res.json();
        console.log("/api/statcan/population response:", json);

        const transformed = (json || []).map((it) => ({
          period: String(it.year),
          population: Number(it.population) / 1000, // convert to millions
        }));
        console.log("transformed population data:", transformed);

        if (mounted) setApiData(transformed);
      } catch (e) {
        console.error("fetchPopulation error:", e);
        if (mounted) setError(String(e.message || e));
      } finally {
        if (mounted) setLoading(false);
      }
    }

    fetchPopulation();

    return () => {
      mounted = false;
    };
  }, []);

  const chartData = apiData ?? data ?? [
    { period: "2019", population: 37.6 },
    { period: "2020", population: 37.7 },
    { period: "2021", population: 37.9 },
    { period: "2022", population: 38.2 },
    { period: "2023", population: 38.5 },
  ];

  return (
    <ChartCard title="Population Metrics">
      {loading ? (
        <div style={{ padding: 24 }}>Loading population…</div>
      ) : error ? (
        <div style={{ padding: 24, color: "#b91c1c" }}>Error: {error}</div>
      ) : (
        <div style={{ width: "100%", height: 300, minHeight: 300 }}>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
            <defs>
              <linearGradient id="popGrad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#9ef6fb" />
                <stop offset="100%" stopColor="#06b6d4" />
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
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </ChartCard>
  );
}
