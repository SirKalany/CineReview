import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

export default function Article() {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3001/api/articles/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Article non trouvé");
        return res.json();
      })
      .then((data) => {
        setArticle(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, [id]);

  if (loading)
    return <p className="text-gray-400 text-center mt-10">Chargement...</p>;

  if (error)
    return (
      <p className="text-red-500 text-center mt-10">
        {error.message || error.toString()}
      </p>
    );

  return (
    <div className="flex-grow bg-gray-900 text-gray-200 flex flex-col items-center p-8 font-sans">
      <div className="max-w-3xl w-full bg-gray-800 rounded-lg shadow-lg p-8">
        <h2 className="text-5xl font-extrabold mb-6 border-b-4 border-red-600 pb-3 text-red-400 drop-shadow-lg">
          {article.title}
        </h2>
        <img
          src={`http://localhost:3001${article.image}`}
          alt={article.title}
          className="w-full h-80 rounded object-cover mb-6 shadow-md"
        />
        {article.director && Array.isArray(article.director) ? (
          <h3 className="text-xl font-bold text-red-400">
            {article.director.join(", ")}
          </h3>
        ) : (
          <h3 className="text-xl font-bold text-red-400">{article.director}</h3>
        )}
        <p className="text-lg leading-relaxed text-gray-300">
          {article.content}
        </p>

        <Link
          to="/"
          className="inline-block mt-10 text-red-400 hover:text-red-200 font-semibold transition-colors"
        >
          ← Retour à la liste
        </Link>
      </div>
    </div>
  );
}
