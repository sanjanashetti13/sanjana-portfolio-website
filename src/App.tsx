import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { HeroNavNameProvider } from "@/components/layout/HeroNavNameContext";
import { SplashProvider, useSplash } from "@/components/layout/SplashContext";
import { Nav } from "@/components/layout/Nav";
import { SocialRail } from "@/components/layout/SocialRail";
import { Footer } from "@/components/layout/Footer";
import { LoadingScreen } from "@/components/ui/LoadingScreen";
import { Toaster } from "@/components/ui/use-toast";
import { PageTransition } from "@/components/layout/PageTransition";
import { SEO } from "@/components/layout/SEO";
import { HomePage } from "@/src/pages/HomePage";
import { ProjectPage } from "@/src/pages/ProjectPage";
import { BlogPage } from "@/src/pages/BlogPage";
import { BlogPostPage } from "@/src/pages/BlogPostPage";
import { NotFoundPage } from "@/src/pages/NotFoundPage";
import { profile } from "@/data/content";

function ScrollToHash() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const el = document.querySelector(hash);
      el?.scrollIntoView({ behavior: "smooth" });
    } else if (pathname !== "/") {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  return null;
}

function AppChrome() {
  const { splashActive } = useSplash();

  if (splashActive) return null;

  return (
    <>
      <Nav />
      <SocialRail />
    </>
  );
}

function AppContent() {
  const { splashActive } = useSplash();

  return (
    <>
      <SEO
        title="Sanjana Shetti — Software Engineer, Full-Stack & AI"
        description={profile.tagline}
      />

      <LoadingScreen />
      <AppChrome />
      <main className="relative overflow-x-clip">
        <ScrollToHash />
        <PageTransition>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/projects/:slug" element={<ProjectPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/:slug" element={<BlogPostPage />} />
            <Route path="/404" element={<NotFoundPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </PageTransition>
      </main>
      {!splashActive && <Footer />}
      <Toaster />
      <Analytics />
      <SpeedInsights />
    </>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <HeroNavNameProvider>
        <SplashProvider>
          <AppContent />
        </SplashProvider>
      </HeroNavNameProvider>
    </ThemeProvider>
  );
}
