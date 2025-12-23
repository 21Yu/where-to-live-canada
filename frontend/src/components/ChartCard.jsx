export default function ChartCard({ title, children }) {
  return (
    <div
      className="w-full rounded-lg bg-neutral-800/50 p-3 h-full flex flex-col"
      style={{ color: 'var(--text)', minHeight: 0 }}
    >
      <h3 className="mb-2 text-sm font-semibold text-gray-200">{title}</h3>
      <div style={{ width: '100%', flex: 1, minHeight: 0 }}>{children}</div>
    </div>
  );
}
