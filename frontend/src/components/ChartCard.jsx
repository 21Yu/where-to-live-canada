export default function ChartCard({ title, children }) {
  return (
    <div
      className="w-full p-3 h-full flex flex-col border shadow-sm"
      style={{
        backgroundColor: 'var(--surface)',
        borderColor: 'var(--border)',
        color: 'var(--text)',
        minHeight: 0,
      }}
    >
      <h3
        className="mb-2 text-sm font-semibold"
        style={{ color: 'var(--muted)' }}
      >
        {title}
      </h3>
      <div style={{ width: '100%', flex: 1, minHeight: 0 }}>{children}</div>
    </div>
  );
}
