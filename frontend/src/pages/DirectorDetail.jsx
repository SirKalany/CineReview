import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

export default function DirectorDetail() {
  const { nom } = useParams();
  const [directorData, setDirectorData] = useState(null);
  const [films, setFilms] = useState([]);
  const [loadingDirector, setLoadingDirector] = useState(true);
  const [loadingFilms, setLoadingFilms] = useState(true);
  const [errorDirector, setErrorDirector] = useState(null);
  const [errorFilms, setErrorFilms] = useState(null);

  useEffect(() => {
    // Charger les infos du réalisateur
    fetch("http://localhost:3001/api/directors")
      .then((res) => {
        if (!res.ok) throw new Error("Réalisateur introuvable");
        return res.json();
      })
      .then((data) => {
        const found = data.find((d) => d.name === nom);
        if (!found) throw new Error("Réalisateur introuvable");
        setDirectorData(found);
        setLoadingDirector(false);
      })
      .catch((err) => {
        setErrorDirector(err);
        setLoadingDirector(false);
      });

    // Charger les films
    fetch("http://localhost:3001/api/articles")
      .then((res) => {
        if (!res.ok) throw new Error("Erreur de chargement des films");
        return res.json();
      })
      .then((data) => {
        // Filtrer les films du réalisateur
        const filtered = data.filter((film) => {
          if (!Array.isArray(film.director)) return false;
          // director est un tableau, on vérifie s'il contient nom
          return film.director.includes(nom);
        });

        setFilms(filtered);
        setLoadingFilms(false);
      })
      .catch((err) => {
        setErrorFilms(err);
        setLoadingFilms(false);
      });
  }, [nom]);

  if (loadingDirector) return <p className="text-gray-400">Chargement...</p>;
  if (errorDirector)
    return (
      <p className="text-red-500 font-semibold">
        {errorDirector.message || "Erreur lors du chargement du réalisateur"}
      </p>
    );

  return (
    <div className="flex-grow bg-gray-900 text-gray-200 flex flex-col items-center p-8 font-sans">
      <div className="max-w-4xl w-full bg-gray-800 rounded-lg shadow-lg p-8 flex gap-6">
        {/* Image du réalisateur */}
        <div className="w-40 flex-shrink-0">
          <img
            src={`http://localhost:3001${directorData.image}`}
            alt={directorData.name}
            className="rounded-md object-cover w-full h-56"
          />
        </div>

        {/* Biographie et films */}
        <div className="flex-1 flex flex-col">
          <h1 className="text-4xl font-extrabold mb-4 text-red-400 drop-shadow-lg">
            {directorData.name}
          </h1>
          <p className="text-gray-300 mb-6 leading-relaxed">{directorData.bio}</p>

          <h2 className="text-2xl font-semibold mb-2 border-b border-red-600 pb-1">
            Films réalisés
          </h2>

          {loadingFilms && <p className="text-gray-400">Chargement des films...</p>}
          {errorFilms && (
            <p className="text-red-500 font-semibold">
              {errorFilms.message || "Erreur lors du chargement des films"}
            </p>
          )}

          {!loadingFilms && films.length === 0 && (
            <p className="text-gray-500 italic">Aucun film trouvé pour ce réalisateur.</p>
          )}

          <ul className="space-y-2 overflow-auto max-h-64">
            {films.map((film) => (
              <li key={film.id}>
                <Link
                  to={`/articles/${film.id}`}
                  className="block text-red-400 hover:text-red-200 transition-colors"
                >
                  {film.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <Link
        to="/realisateurs"
        className="mt-8 text-red-400 hover:text-red-200 font-semibold"
      >
        ← Retour à la liste des réalisateurs
      </Link>
    </div>
  );
}
