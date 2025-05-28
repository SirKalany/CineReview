const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const app = express();
const PORT = 3001;

app.use(cors());

app.get("/api/articles", (req, res) => {
  const filePath = path.join(__dirname, "data", "testing.json"); // <--- CORRIGÉ

  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error("Erreur de lecture :", err); // LOG DÉTAILLÉ
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

app.listen(PORT, () => {
  console.log(`Backend en cours sur http://localhost:${PORT}`);
});
