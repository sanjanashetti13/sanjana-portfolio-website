import { motion, useSpring, useTransform } from "framer-motion";
import { useMouseParallax } from "@/components/three/useMouseParallax";

const CODE_LINES = [
  { indent: 0, parts: [{ t: "import", c: "kw" }, { t: " { RAGPipeline } ", c: "dim" }, { t: "from", c: "kw" }, { t: ' "@/ai"', c: "str" }] },
  { indent: 0, parts: [{ t: "export", c: "kw" }, { t: " async ", c: "dim" }, { t: "function", c: "kw" }, { t: " deploy()", c: "fn" }] },
  { indent: 1, parts: [{ t: "const", c: "kw" }, { t: " graph = ", c: "dim" }, { t: "buildGraph", c: "fn" }, { t: "(config)", c: "dim" }] },
  { indent: 1, parts: [{ t: "await", c: "kw" }, { t: " vectorStore.", c: "dim" }, { t: "index", c: "fn" }, { t: "(docs)", c: "dim" }] },
  { indent: 1, parts: [{ t: "return", c: "kw" }, { t: " graph.", c: "dim" }, { t: "invoke", c: "fn" }, { t: "(query)", c: "dim" }] },
];

const TERMINAL_LINES = [
  "$ git push origin main",
  "Build passed - 42 tests",
  "$ npm run deploy",
  "Production ready",
];

export function LaptopWorkspaceScreen() {
  const { mouse, isTouch } = useMouseParallax();
  const springX = useSpring(isTouch ? 0 : mouse.x * 5, { stiffness: 120, damping: 22 });
  const springY = useSpring(isTouch ? 0 : mouse.y * 4, { stiffness: 120, damping: 22 });
  const parallaxX = useTransform(springX, (v) => v);
  const parallaxY = useTransform(springY, (v) => v);

  return (
    <motion.div
      className="laptop-workspace"
      style={{ x: parallaxX, y: parallaxY }}
      aria-hidden="true"
    >
      <div className="laptop-workspace__titlebar">
        <span className="laptop-workspace__dot laptop-workspace__dot--red" />
        <span className="laptop-workspace__dot laptop-workspace__dot--amber" />
        <span className="laptop-workspace__dot laptop-workspace__dot--green" />
        <span className="laptop-workspace__title">sanjanashetti13 — portfolio</span>
      </div>

      <div className="laptop-workspace__body">
        <aside className="laptop-workspace__activity">
          <span className="laptop-workspace__icon laptop-workspace__icon--active" />
          <span className="laptop-workspace__icon" />
          <span className="laptop-workspace__icon" />
          <span className="laptop-workspace__icon" />
        </aside>

        <div className="laptop-workspace__main">
          <div className="laptop-workspace__editor">
            <div className="laptop-workspace__tabs">
              <span className="laptop-workspace__tab laptop-workspace__tab--active">pipeline.ts</span>
              <span className="laptop-workspace__tab">api.ts</span>
            </div>
            <div className="laptop-workspace__code">
              {CODE_LINES.map((line, i) => (
                <div key={i} className="laptop-workspace__line" style={{ paddingLeft: `${line.indent * 14}px` }}>
                  <span className="laptop-workspace__ln">{i + 1}</span>
                  {line.parts.map((part, j) => (
                    <span key={j} className={`laptop-workspace__tok laptop-workspace__tok--${part.c}`}>
                      {part.t}
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>

          <div className="laptop-workspace__stack">
            <div className="laptop-workspace__panel laptop-workspace__panel--github">
              <div className="laptop-workspace__panel-head">
                <span className="laptop-workspace__panel-label">GitHub</span>
                <span className="laptop-workspace__panel-meta">sanjanashetti13/portfolio</span>
              </div>
              <div className="laptop-workspace__gh-row">
                <span className="laptop-workspace__gh-branch">main</span>
                <span className="laptop-workspace__gh-stat">12 stars</span>
              </div>
              <div className="laptop-workspace__gh-bars">
                <span style={{ width: "72%" }} />
                <span style={{ width: "48%" }} />
                <span style={{ width: "61%" }} />
              </div>
            </div>

            <div className="laptop-workspace__panel laptop-workspace__panel--ai">
              <div className="laptop-workspace__panel-head">
                <span className="laptop-workspace__panel-label">AI Assistant</span>
              </div>
              <p className="laptop-workspace__ai-msg">Optimize the RAG retrieval layer?</p>
              <p className="laptop-workspace__ai-reply">
                Suggest hybrid search with reranking for 18% better recall.
              </p>
            </div>

            <div className="laptop-workspace__panel laptop-workspace__panel--chart">
              <div className="laptop-workspace__panel-head">
                <span className="laptop-workspace__panel-label">Metrics</span>
              </div>
              <div className="laptop-workspace__chart">
                {[38, 52, 44, 68, 58, 74, 62].map((h, i) => (
                  <span key={i} style={{ height: `${h}%` }} />
                ))}
              </div>
            </div>

            <div className="laptop-workspace__panel laptop-workspace__panel--terminal">
              <div className="laptop-workspace__panel-head">
                <span className="laptop-workspace__panel-label">Terminal</span>
              </div>
              {TERMINAL_LINES.map((line) => (
                <p key={line} className="laptop-workspace__term-line">
                  {line}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
