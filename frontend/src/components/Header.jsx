export default function Header() {
  return (
    <header className="bg-blue-600 text-white shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center p-4">
        {/* Logo / Title */}
        <h1 className="text-2xl font-bold">Where to Live Canada</h1>

        {/* Navigation */}
        <nav className="space-x-6">
          <a href="#" className="hover:text-gray-200 font-medium">
            Home
          </a>
          <a href="#" className="hover:text-gray-200 font-medium">
            Cities
          </a>
          <a href="#" className="hover:text-gray-200 font-medium">
            Trends
          </a>
          <a href="#" className="hover:text-gray-200 font-medium">
            About
          </a>
        </nav>
      </div>
    </header>
  );
}
