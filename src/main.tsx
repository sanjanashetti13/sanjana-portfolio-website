import { StrictMode, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "@/lib/fonts";
import "./index.css";
import App from "./App";
import { profile } from "@/data/content";
import { applyPortfolioTheme, PORTFOLIO_THEME } from "@/lib/portfolioTheme";

applyPortfolioTheme(PORTFOLIO_THEME);

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  email: profile.email,
  jobTitle: "Software Engineer",
  url: "https://sanjanashetti.dev",
  sameAs: [profile.github, profile.linkedin],
};

function RootJsonLd() {
  useEffect(() => {
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.textContent = JSON.stringify(jsonLd);
    document.head.appendChild(script);
    return () => script.remove();
  }, []);
  return null;
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <RootJsonLd />
      <App />
    </BrowserRouter>
  </StrictMode>
);
