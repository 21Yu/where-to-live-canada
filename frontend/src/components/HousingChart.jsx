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

export default function HousingChart({ memberId }) {
  const [apiData, setApiData] = useState([]);
  const [range, setRange] = useState(6);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!memberId) {
      setApiData([]);
      return;
    }

    let mounted = true;

    async function fetchHousingData(memberId = 1) {
      setLoading(true);
      setError(null);

      try {
        const url = `http://127.0.0.1:8000/api/statcan/housing?latestN=${range}&memberId=${memberId}`;
        const res = await fetch(url);
        if (!res.ok) throw new Error(res.statusText || "Fetch failed");
        const json = await res.json();

        const transformed = (json || []).map((it) => ({
          month: it.date,
          housing_price_index: Number(it["housing price index"]),
        }));

        if (mounted) setApiData(transformed);
      } catch (e) {
        if (mounted) setError(e.message || "Unknown error");
      } finally {
        if (mounted) setLoading(false);
      }
    }

    fetchHousingData(memberId);

    return () => {
      mounted = false;
    };
  }, [range, memberId]);

  if (!memberId) {
    return (
      <ChartCard title="Housing Metrics">
        <div className="p-4 text-[var(--muted)] text-sm">
          Housing data not available for this region.
        </div>
      </ChartCard>
    );
  }

  return (
    <ChartCard title="Housing Metrics">
      {loading ? (
        <div className="p-6 text-[var(--text)]">Loading Housing…</div>
      ) : error ? (
        <div className="p-6 text-[#b91c1c]">Error: {error}</div>
      ) : (
        <div className="w-full h-[300px] min-h-[300px] p-4 bg-[var(--surface)] rounded-[var(--radius)]">
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
            <LineChart data={range ? apiData.slice(-range) : apiData}>
              <defs>
                <linearGradient id="housingGrad" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="var(--accent-soft)" />
                  <stop offset="100%" stopColor="var(--accent)" />
                </linearGradient>
              </defs>

              <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" />
              <XAxis
                dataKey="month"
                interval={0}
                padding={{ left: 8, right: 8 }}
                tick={false}
                axisLine={false}
                tickLine={false}
              />
              <YAxis stroke="var(--text)" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "var(--surface)",
                  borderColor: "var(--border)",
                  color: "var(--text)",
                }}
              />
              <Legend wrapperStyle={{ color: "var(--text)" }} />
              <Line
                type="monotone"
                dataKey="housing_price_index"
                name="Housing Price Index"
                stroke="url(#housingGrad)"
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
