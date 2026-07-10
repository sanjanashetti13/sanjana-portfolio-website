import { experienceMarquee } from "@/data/content";

const SEPARATOR = "•";

function MarqueeItems({ idPrefix }: { idPrefix: string }) {
  return (
    <>
      {experienceMarquee.map((name) => (
        <span key={`${idPrefix}-${name}`} className="exp-marquee-item">
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
      <div className="exp-marquee-inner">
        <div className="exp-marquee-content">
          <MarqueeItems idPrefix="a" />
        </div>
        <div className="exp-marquee-content">
          <MarqueeItems idPrefix="b" />
        </div>
      </div>
    </div>
  );
}
