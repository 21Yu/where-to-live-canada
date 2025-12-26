// components/Footer.js
export default function Footer() {
  return (
    <footer className="w-full py-3 text-center text-xs text-[var(--muted)] bg-[var(--surface)] border-t border-[var(--border)]">
      Data provided by{' '}
      <a
        href="https://www.statcan.gc.ca/en/developers/wds"
        target="_blank"
        rel="noopener noreferrer"
        className="underline hover:text-[var(--accent)]"
      >
        Statistics Canada Web Data Service (WDS)
      </a>
    </footer>
  );
}
