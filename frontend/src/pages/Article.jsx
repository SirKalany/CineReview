import { useEffect, useState } from 'react';

export default function Article() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:3001/api/articles')
      .then((res) => res.json())
      .then((data) => {
        setArticles(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Erreur lors de la récupération des articles :', err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Chargement...</p>;

  return (
    <div>
      <h1>Articles</h1>
      <ul>
        {articles.map((item, index) => (
          <li key={index}>
            <strong>{item.title}</strong> — {item.content}
          </li>
        ))}
      </ul>
    </div>
  );
}