import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="bg-red-400 text-gray-900 shadow-md">
      <div className="container mx-auto px-6 py-4 flex flex-col items-center">
        <h1 className="text-4xl font-extrabold mb-3 drop-shadow-sm">
          CinéScope
        </h1>
        <nav className="flex gap-8 text-gray-900 font-semibold">
          <Link to="/films" className="hover:text-gray-200 transition">
            Films
          </Link>
          <Link to="/series" className="hover:text-gray-200 transition">
            Séries
          </Link>
          <Link to="/realisateurs" className="hover:text-gray-200 transition">
            Réalisateurs
          </Link>
          <Link to="/articles" className="hover:text-gray-200 transition">
            Tous les articles
          </Link>
        </nav>
      </div>
    </header>
  );
}
