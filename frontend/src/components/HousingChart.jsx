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
        if (!res.ok) throw new Error(res.statusText || "Fetch failed")  
        const json = await res.json();

        const transformed = (json || [])
          .map((it) => ({
            month: it.date,
            housing_price_index: Number(it["housing price index"]),
          }))

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
        <div className="p-4 text-gray-400 text-sm">
          Housing data not available for this region.
        </div>
      </ChartCard>
    );
  }

  return (
    <ChartCard title="Housing Metrics">
      {loading ? (
        <div style={{ padding: 24 }}>Loading Housing…</div>
      ) : error ? (
        <div style={{ padding: 24, color: "#b91c1c" }}>Error: {error}</div>
      ) : (
        <div style={{ width: "100%", height: 300, minHeight: 300 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
            <div style={{ fontSize: 14, color: 'var(--text)' }}>Range:</div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button
                onClick={() => setRange(6)}
                className={"px-3 py-1 rounded " + (range === 6 ? 'bg-sky-500 text-white' : 'bg-neutral-700 text-gray-200')}
              >
                6m
              </button>
              <button
                onClick={() => setRange(12)}
                className={"px-3 py-1 rounded " + (range === 12 ? 'bg-sky-500 text-white' : 'bg-neutral-700 text-gray-200')}
              >
                12m
              </button>
              <button
                onClick={() => setRange(24)}
                className={"px-3 py-1 rounded " + (range === 24 ? 'bg-sky-500 text-white' : 'bg-neutral-700 text-gray-200')}
              >
                24m
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
              dataKey="month"
              interval={0}
              padding={{ left: 8, right: 8 }}
              tick={false}
              axisLine={false}
              tickLine={false}
            />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="housing_price_index"
              name="Housing Price Index"
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
