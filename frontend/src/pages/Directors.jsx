import { useEffect, useState } from "react";

export default function Directors() {
  const [articles, setArticles] = useState([]);
  const [directors, setDirectors] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("http://localhost:3001/api/articles")
      .then((res) => res.json())
      .then((data) => {
        setArticles(data);

        const allDirectors = data.flatMap((article) =>
          Array.isArray(article.director)
            ? article.director
            : [article.director]
        );

        const uniqueDirectors = [...new Set(allDirectors)];
        setDirectors(uniqueDirectors);
      });
  }, []);

  const filtered = directors.filter((name) =>
    name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex-grow bg-gray-900 text-gray-200 flex flex-col items-center p-8 font-sans">
      <h2 className="text-5xl font-extrabold mb-6 border-b-4 border-red-600 pb-3 text-red-400 drop-shadow-lg">
        Réalisateurs
      </h2>

      <input
        type="text"
        placeholder="Rechercher un réalisateur..."
        className="mb-6 p-2 w-full max-w-md rounded bg-gray-800 border border-gray-700 text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <ul className="w-full max-w-md space-y-2">
        {filtered.map((name, index) => (
          <li
            key={index}
            className="bg-gray-800 hover:bg-red-700 transition-colors px-4 py-2 rounded text-red-300 hover:text-white shadow"
          >
            {name}
          </li>
        ))}
        {filtered.length === 0 && (
          <li className="text-gray-500 italic">Aucun résultat trouvé.</li>
        )}
      </ul>
    </div>
  );
}
