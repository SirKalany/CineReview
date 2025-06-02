import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function App() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3001/api/articles")
      .then((res) => {
        if (!res.ok) throw new Error("Erreur lors du chargement des articles");
        return res.json();
      })
      .then((data) => {
        setArticles(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="flex-grow bg-gray-900 text-gray-200 flex flex-col items-center p-8 font-sans">
      <h1 className="text-6xl font-extrabold text-red-400 mb-12 drop-shadow-lg">
        W.I.P
      </h1>

      {loading && <p className="text-gray-400">Chargement des articles...</p>}
      {error && (
        <p className="text-red-500 font-semibold">
          Erreur : {error.message || error.toString()}
        </p>
      )}

      <ul className="w-full max-w-xl space-y-4">
        {articles.map(({ id, title }) => (
          <li key={id}>
            <Link
              to={`/articles/${id}`}
              className="block bg-gray-800 rounded-lg p-4 hover:bg-red-700 transition-colors cursor-pointer shadow-md text-xl font-semibold text-red-400 hover:text-red-200"
            >
              {title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
