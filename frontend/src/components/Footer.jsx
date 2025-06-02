import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-red-400 text-gray-800 py-6 text-center text-sm border-t border-gray-700">
      <Link to="/contact" className="hover:text-gray-200 transition mx-2">
        Contact
      </Link>
      <span>·</span>
      <Link to="/regles" className="hover:text-gray-200 transition mx-2">
        Règles d’utilisation
      </Link>
    </footer>
  );
}
