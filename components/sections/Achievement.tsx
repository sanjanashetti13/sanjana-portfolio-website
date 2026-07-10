import { FileText, Github } from "lucide-react";
import { achievements } from "@/data/content";

function isValidLink(url: string | null | undefined): url is string {
  return Boolean(url && url !== "#");
}

export function Achievement() {
  return (
    <section id="achievement" className="achievement-section section-with-robot">
      <div className="achievement-shell">
        <header className="achievement-header">
          <h2 className="achievement-title">Achievements</h2>
        </header>

        <div className="achievement-list">
          {achievements.map((item) => {
            const hasGithub = isValidLink(item.github);
            const hasPaper = isValidLink(item.paper);

            return (
              <div key={item.title} className="achievement-card">
                <div className="achievement-card-grid">
                  <div className="achievement-rank">
                    <p className="achievement-rank-value">{item.rank}</p>
                    <p className="achievement-rank-scope">{item.scope}</p>
                  </div>
                  <div className="achievement-copy">
                    <h3 className="achievement-card-title">{item.title}</h3>
                    <p className="achievement-card-desc">{item.description}</p>
                    {(hasGithub || hasPaper) && (
                      <div className="achievement-card-links">
                        {hasGithub && (
                          <a
                            href={item.github!}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="achievement-card-link"
                          >
                            <Github className="h-3.5 w-3.5" aria-hidden="true" />
                            GitHub
                          </a>
                        )}
                        {hasPaper && (
                          <a
                            href={item.paper!}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="achievement-card-link"
                          >
                            <FileText className="h-3.5 w-3.5" aria-hidden="true" />
                            Research Paper
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                  <div className="achievement-prize-wrap">
                    <span className="achievement-prize">{item.prize}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
