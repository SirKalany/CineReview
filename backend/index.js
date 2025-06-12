const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const app = express();
const PORT = 3001;

app.use(cors());

app.use("/images", express.static(path.join(__dirname, "data", "images")));

app.get("/api/articles", (req, res) => {
  const filePath = path.join(__dirname, "data", "testing.json");

  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error("Erreur de lecture :", err);
      return res.status(500).json({ error: "Erreur de lecture du fichier" });
    }

    try {
      const parsed = JSON.parse(data);
      res.json(parsed);
    } catch (parseErr) {
      console.error("Erreur de parsing JSON :", parseErr);
      res.status(500).json({ error: "Fichier JSON invalide" });
    }
  });
});

app.get("/api/articles/:id", (req, res) => {
  const filePath = path.join(__dirname, "data", "testing.json");

  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error("Erreur de lecture :", err);
      return res.status(500).json({ error: "Erreur de lecture du fichier" });
    }

    try {
      const articles = JSON.parse(data);
      const article = articles.find((a) => a.id === req.params.id);

      if (!article) {
        return res.status(404).json({ error: "Article non trouvé" });
      }

      res.json(article);
    } catch (parseErr) {
      console.error("Erreur de parsing JSON :", parseErr);
      res.status(500).json({ error: "Fichier JSON invalide" });
    }
  });
});

app.get("/api/directors", (req, res) => {
  const filePath = path.join(__dirname, "data", "directors.json");
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error("Erreur de lecture :", err);
      return res.status(500).json({ error: "Erreur de lecture du fichier" });
    }

    try {
      const parsed = JSON.parse(data);
      res.json(parsed);
    } catch (parseErr) {
      console.error("Erreur de parsing JSON :", parseErr);
      res.status(500).json({ error: "Fichier JSON invalide" });
    }
  });
});

app.get("/api/directors/:nom", (req, res) => {
  const filePath = path.join(__dirname, "data", "directors.json");
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error("Erreur de lecture :", err);
      return res.status(500).json({ error: "Erreur de lecture du fichier" });
    }

    try {
      const parsed = JSON.parse(data);
      const director = parsed.find(
        (d) => d.name.toLowerCase() === req.params.nom.toLowerCase()
      );

      if (!director) {
        return res.status(404).json({ error: "Réalisateur non trouvé" });
      }

      res.json(director);
    } catch (parseErr) {
      console.error("Erreur de parsing JSON :", parseErr);
      res.status(500).json({ error: "Fichier JSON invalide" });
    }
  });
});

app.listen(PORT, () => {
  console.log(`Backend en cours sur http://localhost:${PORT}`);
});
