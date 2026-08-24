import { certificates } from "@/data/content";

export function Certificates() {
  return (
    <section id="certificates" className="certificates-section section-with-robot">
      <div className="certificates-shell">
        <header className="certificates-header">
          <h2 className="certificates-title">Certificates</h2>
        </header>

        <div className="certificates-list">
          {certificates.map((item) => (
            <article key={`${item.issuer}-${item.title}`} className="certificate-card">
              <div className="certificate-logo-wrap">
                <img src={item.logoUrl} alt={`${item.issuer} logo`} className="certificate-logo" />
              </div>

              <div className="certificate-copy">
                <h3 className="certificate-card-title">{item.title}</h3>
                <p className="certificate-card-issuer">{item.issuer}</p>
                <p className="certificate-card-meta">
                  Issued {item.issued}
                  {item.credentialId ? ` · Credential ID ${item.credentialId}` : ""}
                </p>
              </div>

              <div className="certificate-action-wrap">
                <a
                  href={item.certificateUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="achievement-prize"
                >
                  Certificate
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
