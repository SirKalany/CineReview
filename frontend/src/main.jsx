import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./Main.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import App from "./pages/App.jsx";
import Article from "./pages/Article";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/articles/:id" element={<Article />} />
          <Route path="*" element={<Error />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  </StrictMode>
);
