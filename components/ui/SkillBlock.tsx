interface SkillBlockProps {
  category: string;
  items: string[];
}

export function SkillBlock({ category, items }: SkillBlockProps) {
  return (
    <article className="skill-card">
      <h3 className="skill-card__title">{category}</h3>
      <ul className="skill-card__list">
        {items.map((item) => (
          <li key={item}>
            <span className="skill-chip">{item}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}
