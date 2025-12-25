export default function Header() {
  return (
    <header className="w-full" style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
      <div className="max-w-7xl mx-auto flex items-center justify-between py-3 px-4">
        <div className="flex items-center gap-3">
          <div className="rounded-md" style={{ width: 32, height: 32, background: 'linear-gradient(135deg,#7c3aed,#06b6d4)' }} />
          <h1 className="text-lg font-semibold">Where to Live</h1>
          <span className="muted ml-2 text-sm">Canada</span>
        </div>
      </div>
    </header>
  );
}
