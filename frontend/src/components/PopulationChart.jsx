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

        const transformed = (json || [])
          .map((it) => ({
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

    // initial or updated load using the applied memberId prop
    fetchPopulation(memberId);

    return () => {
      mounted = false;
    };
  }, [range, memberId]);

  // PopulationChart receives `memberId` prop; fetch happens when `memberId` or `range` changes.


  return (
    <ChartCard title="Population Metrics">
      {loading ? (
        <div style={{ padding: 24 }}>Loading population…</div>
      ) : error ? (
        <div style={{ padding: 24, color: "#b91c1c" }}>Error: {error}</div>
      ) : (
        <div style={{ width: "100%", height: 300, minHeight: 300 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
            <div style={{ fontSize: 14, color: 'var(--text)' }}>Range:</div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button
                onClick={() => setRange(5)}
                className={"px-3 py-1 rounded " + (range === 5 ? 'bg-sky-500 text-white' : 'bg-neutral-700 text-gray-200')}
              >
                5y
              </button>
              <button
                onClick={() => setRange(10)}
                className={"px-3 py-1 rounded " + (range === 10 ? 'bg-sky-500 text-white' : 'bg-neutral-700 text-gray-200')}
              >
                10y
              </button>
              <button
                onClick={() => setRange(100)}
                className={"px-3 py-1 rounded " + (range === 100 ? 'bg-sky-500 text-white' : 'bg-neutral-700 text-gray-200')}
              >
                All
              </button>
            </div>

            
          </div>

          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={range ? apiData.slice(-range) : apiData}>
            <defs>
              <linearGradient id="popGrad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#9ef6fb" />
                <stop offset="100%" stopColor="#06b6d4" />
              </linearGradient>
            </defs>
            <CartesianGrid horizontal={false} vertical={false} />
            <XAxis
              dataKey="year"
              type="number"
              domain={["dataMin", "dataMax"]}
              allowDecimals={false}
              tickFormatter={(v) => String(v)}
              interval={0}
              padding={{ left: 20, right: 20 }}
            />
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
