import { experienceMarquee } from "@/data/content";

const SEPARATOR = "•";
const MARQUEE_COPIES = 6;

function MarqueeItems({ idPrefix }: { idPrefix: string }) {
  return (
    <>
      {experienceMarquee.map((name, index) => (
        <span key={`${idPrefix}-${index}-${name}`} className="exp-marquee-item">
          <span className="exp-marquee-name">{name}</span>
          <span className="exp-marquee-sep">{SEPARATOR}</span>
        </span>
      ))}
    </>
  );
}

export function CompanyMarquee() {
  return (
    <div className="exp-marquee" aria-hidden="true">
      <div
        className="exp-marquee-inner"
        style={{ "--marquee-copies": MARQUEE_COPIES } as React.CSSProperties}
      >
        {Array.from({ length: MARQUEE_COPIES }, (_, copyIndex) => (
          <div key={copyIndex} className="exp-marquee-content">
            <MarqueeItems idPrefix={`copy-${copyIndex}`} />
          </div>
        ))}
      </div>
    </div>
  );
}
