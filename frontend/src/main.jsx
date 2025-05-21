import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./style/Main.scss";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/article/:id" element={<Article />} />
        <Route path="/info" element={<Info />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </Router>
  </StrictMode>
);
