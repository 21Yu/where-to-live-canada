export default function Header() {
  return (
    <header
      className="w-full"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between py-3 px-4">
        <div className="flex items-center gap-3">
          <div
            style={{
              width: 32,
              height: 32,
              backgroundColor: 'var(--accent-soft)',
            }}
          />
          <h1 className="text-lg font-semibold text-[var(--text)]">Where to Live</h1>
          <span className="ml-2 text-sm text-[var(--muted)]">Canada</span>
        </div>
      </div>
    </header>
  );
}