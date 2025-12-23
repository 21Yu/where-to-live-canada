import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

const mockData = [
  { month: "Jan", users: 400 },
  { month: "Feb", users: 620 },
  { month: "Mar", users: 810 },
  { month: "Apr", users: 760 },
  { month: "May", users: 920 },
  { month: "Jun", users: 1100 },
];

export default function Chart() {
  return (
    <div className="mx-auto mt-10 w-fit rounded-xl border border-gray-200 bg-white p-6 shadow">
      <h2 className="mb-4 text-lg font-semibold text-gray-800">
        Monthly User Growth
      </h2>

      <LineChart
        width={600}
        height={300}
        data={mockData}
        className="bg-gray-50 rounded-lg"
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Line
          type="monotone"
          dataKey="users"
          stroke="#2563eb"
          strokeWidth={3}
          dot={{ r: 4 }}
        />
      </LineChart>
    </div>
  );
}
