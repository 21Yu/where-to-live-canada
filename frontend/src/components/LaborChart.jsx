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

export default function LaborChart({ memberId }) {
  const [chartData, setChartData] = useState([]);
  const [range, setRange] = useState(6);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!memberId) {
      setChartData([]);
      return;
    }

    let mounted = true;

    async function fetchLaborData(memberId = 1) {
      setLoading(true);
      setError(null);

      try {
        const empUrl = `http://127.0.0.1:8000/api/statcan/labor?latestN=${range}&memberId=${memberId}&umn=9`;
        const unempUrl = `http://127.0.0.1:8000/api/statcan/labor?latestN=${range}&memberId=${memberId}&umn=7`;

        const [empRes, unempRes] = await Promise.all([
          fetch(empUrl),
          fetch(unempUrl),
        ]);

        if (!empRes.ok || !unempRes.ok) {
          throw new Error("Failed to fetch labor data");
        }

        const empJson = await empRes.json();
        const unempJson = await unempRes.json();

        // Merge by date
        const map = {};

        empJson.forEach((it) => {
          map[it.date] = {
            month: it.date,
            employment_rate: Number(it["employment rate"]),
          };
        });

        unempJson.forEach((it) => {
          if (!map[it.date]) map[it.date] = { month: it.date };
          map[it.date].unemployment_rate = Number(it["unemployment rate"]);
        });

        const merged = Object.values(map).sort(
          (a, b) => new Date(a.month) - new Date(b.month)
        );

        if (mounted) setChartData(merged);
      } catch (e) {
        if (mounted) setError(e.message || "Unknown error");
      } finally {
        if (mounted) setLoading(false);
      }
    }

    fetchLaborData();

    return () => {
      mounted = false;
    };
  }, [range, memberId]);

  if (!memberId) {
    return (
      <ChartCard title="Labor Metrics">
        <div className="p-4 text-gray-400 text-sm">
          Labor data not available for this region.
        </div>
      </ChartCard>
    );
  }

  return (
    <ChartCard title="Labor Market">
      {loading ? (
        <div style={{ padding: 24 }}>Loading labor data…</div>
      ) : error ? (
        <div style={{ padding: 24, color: "#b91c1c" }}>
          Error: {error}
        </div>
      ) : (
        <div style={{ width: "100%", height: 340 }}>
          {/* Range selector */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 8,
            }}
          >
            <div style={{ fontSize: 14 }}>Range:</div>
            <div style={{ display: "flex", gap: 8 }}>
              {[6, 12, 24].map((r) => (
                <button
                  key={r}
                  onClick={() => setRange(r)}
                  className={
                    "px-3 py-1 rounded " +
                    (range === r
                      ? "bg-sky-500 text-white"
                      : "bg-neutral-700 text-gray-200")
                  }
                >
                  {r}m
                </button>
              ))}
            </div>
          </div>

          {/* Chart */}
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid horizontal={false} vertical={false} />
              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                tick={false}
              />
              <YAxis />
              <Tooltip formatter={(v) => `${v}%`} />
              <Legend />

              <Line
                type="monotone"
                dataKey="employment_rate"
                name="Employment rate (%)"
                stroke="#06b6d4"
                strokeWidth={2}
                dot={{ r: 3 }}
              />

              <Line
                type="monotone"
                dataKey="unemployment_rate"
                name="Unemployment rate (%)"
                stroke="#f97316"
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
