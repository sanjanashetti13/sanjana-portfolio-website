import { education } from "@/data/content";

export function Education() {
  return (
    <section id="education" className="education-section section-with-robot">
      <div className="education-shell">
        <header className="education-header">
          <p className="education-eyebrow"></p>
          <h2 className="education-title">Education</h2>
        </header>

        <div className="education-timeline">
          {education.map((item, index) => (
            <article key={item.school} className="education-item">
              <div className="education-item__marker" aria-hidden="true">
                <span className="education-item__dot" />
                {index < education.length - 1 && (
                  <span className="education-item__line" />
                )}
              </div>

              <div className="education-item__card">
                <time className="education-item__years" dateTime={item.years}>
                  {item.years}
                </time>
                <h3 className="education-item__school">{item.school}</h3>
                <p className="education-item__degree">{item.degree}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
