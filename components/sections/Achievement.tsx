import { achievements } from "@/data/content";

export function Achievement() {
  return (
    <section id="achievement" className="achievement-section section-with-robot">
      <div className="achievement-shell">
        <header className="achievement-header">
          <h2 className="achievement-title">Achievements</h2>
        </header>

        <div className="achievement-list">
          {achievements.map((item) => (
            <div key={item.title} className="achievement-card">
              <div className="achievement-card-grid">
                <div className="achievement-rank">
                  <p className="achievement-rank-value">{item.rank}</p>
                  <p className="achievement-rank-scope">{item.scope}</p>
                </div>
                <div className="achievement-copy">
                  <h3 className="achievement-card-title">{item.title}</h3>
                  <p className="achievement-card-desc">{item.description}</p>
                </div>
                <div className="achievement-prize-wrap">
                  <span className="achievement-prize">{item.prize}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
