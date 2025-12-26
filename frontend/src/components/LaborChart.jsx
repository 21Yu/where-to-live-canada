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

        const [empRes, unempRes] = await Promise.all([fetch(empUrl), fetch(unempUrl)]);

        if (!empRes.ok || !unempRes.ok) throw new Error("Failed to fetch labor data");

        const empJson = await empRes.json();
        const unempJson = await unempRes.json();

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
        <div className="p-4 text-[var(--muted)] text-sm">
          Labor data not available for this region.
        </div>
      </ChartCard>
    );
  }

  return (
    <ChartCard title="Labor Market">
      {loading ? (
        <div className="p-6 text-[var(--text)]">Loading labor data…</div>
      ) : error ? (
        <div className="p-6 text-[#b91c1c]">Error: {error}</div>
      ) : (
        <div className="w-full h-[340px] p-4 bg-[var(--surface)] rounded-[var(--radius)]">
          {/* Range selector */}
          <div className="flex justify-between items-center mb-2">
            <div className="text-sm text-[var(--text)]">Range:</div>
            <div className="flex gap-2">
              {[6, 12, 24].map((r) => (
                <button
                  key={r}
                  onClick={() => setRange(r)}
                  className={`px-3 py-1 rounded-[var(--radius)] ${
                    range === r
                      ? "bg-[var(--accent)] text-white"
                      : "bg-[var(--surface)] text-[var(--muted)] border border-[var(--border)]"
                  }`}
                >
                  {r}m
                </button>
              ))}
            </div>
          </div>

          {/* Chart */}
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <defs>
                <linearGradient id="empGrad" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="var(--accent-soft)" />
                  <stop offset="100%" stopColor="var(--accent)" />
                </linearGradient>
                <linearGradient id="unempGrad" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="var(--muted)" />
                  <stop offset="100%" stopColor="var(--accent)" />
                </linearGradient>
              </defs>

              <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" />
              <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: "var(--text)" }} />
              <YAxis stroke="var(--text)" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "var(--surface)",
                  borderColor: "var(--border)",
                  color: "var(--text)",
                }}
                formatter={(v) => `${v}%`}
              />
              <Legend wrapperStyle={{ color: "var(--text)" }} />

              <Line
                type="monotone"
                dataKey="employment_rate"
                name="Employment rate (%)"
                stroke="url(#empGrad)"
                strokeWidth={2}
                dot={{ r: 3 }}
              />

              <Line
                type="monotone"
                dataKey="unemployment_rate"
                name="Unemployment rate (%)"
                stroke="url(#unempGrad)"
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
