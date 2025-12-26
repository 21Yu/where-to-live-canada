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

export default function PopulationChart({ memberId }) {
  const [apiData, setApiData] = useState([]);
  const [range, setRange] = useState(10); 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;

    async function fetchPopulation(memberId = 1) {
      setLoading(true);
      setError(null);
      try {
        const latestN = range;
        const url = `http://127.0.0.1:8000/api/statcan/population?latestN=${latestN}&memberId=${memberId}`;
        const res = await fetch(url);
        if (!res.ok) throw new Error(res.statusText || "Fetch failed");
        const json = await res.json();

        const transformed = (json || []).map((it) => ({
          year: Number(it.year),
          population: Number(it.population) / 1000000,
        }));

        if (mounted) setApiData(transformed);
      } catch (e) {
        if (mounted) setError(String(e.message || e));
      } finally {
        if (mounted) setLoading(false);
      }
    }

    fetchPopulation(memberId);

    return () => {
      mounted = false;
    };
  }, [range, memberId]);

  return (
    <ChartCard title="Population Metrics">
      {loading ? (
        <div className="p-6 text-[var(--text)]">Loading population…</div>
      ) : error ? (
        <div className="p-6 text-[#b91c1c]">Error: {error}</div>
      ) : (
        <div className="w-full h-[300px] min-h-[300px] p-4 bg-[var(--surface)] rounded-[var(--radius)]">
          <div className="flex justify-between items-center mb-2">
            <div className="text-sm text-[var(--text)]">Range:</div>
            <div className="flex gap-2">
              {[5, 10, 100].map((r) => (
                <button
                  key={r}
                  onClick={() => setRange(r)}
                  className={`px-3 py-1 rounded-[var(--radius)] ${
                    range === r
                      ? "bg-[var(--accent)] text-white"
                      : "bg-[var(--surface)] text-[var(--muted)] border border-[var(--border)]"
                  }`}
                >
                  {r === 100 ? "All" : r + "y"}
                </button>
              ))}
            </div>
          </div>

          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={range ? apiData.slice(-range) : apiData}>
              <defs>
                <linearGradient id="popGrad" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="var(--accent-soft)" />
                  <stop offset="100%" stopColor="var(--accent)" />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" />
              <XAxis
                dataKey="year"
                type="number"
                domain={["dataMin", "dataMax"]}
                allowDecimals={false}
                tickFormatter={(v) => String(v)}
                interval={0}
                padding={{ left: 20, right: 20 }}
                stroke="var(--text)"
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
