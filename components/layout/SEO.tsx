import { useEffect } from "react";

interface SEOProps {
  title?: string;
  description?: string;
}

function setMeta(name: string, content: string, property = false) {
  const attr = property ? "property" : "name";
  let el = document.querySelector(`meta[${attr}="${name}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

export function SEO({ title, description }: SEOProps) {
  useEffect(() => {
    if (title) document.title = title;
    if (description) {
      setMeta("description", description);
      setMeta("og:description", description, true);
    }
    if (title) setMeta("og:title", title, true);
  }, [title, description]);

  return null;
}
