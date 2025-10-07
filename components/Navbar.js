export default function Navbar() {
  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center p-4">
        <h1 className="text-xl font-bold text-brand-700">Ingrective</h1>
        <ul className="flex gap-6">
          <li><a href="/" className="hover:text-brand-500">Dashboard</a></li>
          <li><a href="/scan" className="hover:text-brand-500">Scan</a></li>
          <li><a href="/history" className="hover:text-brand-500">History</a></li>
          <li><a href="/profile" className="hover:text-brand-500">Profile</a></li>
        </ul>
      </div>
    </nav>
  );
}

