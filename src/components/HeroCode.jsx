import { useRef } from "react";
import { projects } from "../data/content.js";

const building = projects.filter((p) => p.status === "In Progress").map((p) => p.title);

// Small syntax-highlighting helpers.
const K = ({ children }) => <span className="tok-kw">{children}</span>;
const V = ({ children }) => <span className="tok-var">{children}</span>;
const P = ({ children }) => <span className="tok-prop">{children}</span>;
const S = ({ children }) => <span className="tok-str">"{children}"</span>;
const B = ({ children }) => <span className="tok-bool">{children}</span>;
const F = ({ children }) => <span className="tok-fn">{children}</span>;
const C = ({ children }) => <span className="tok-cm">{children}</span>;

const list = (items) =>
  items.map((item, i) => (
    <span key={item}>
      {i > 0 && ", "}
      <S>{item}</S>
    </span>
  ));

const lines = [
  <><K>const</K> <V>wilmar</V> = {"{"}</>,
  <>  <P>role</P>: <S>Software Engineering Student</S>,</>,
  <>  <P>based</P>: <S>Harare, Zimbabwe</S>,</>,
  <>  <P>focus</P>: [{list(["mobile", "backend", "agri-tech"])}],</>,
  <>  <P>building</P>: [{list(building)}],</>,
  <>  <P>openTo</P>: [{list(["internships", "collabs"])}],</>,
  <>  <P>available</P>: <B>true</B>,</>,
  <>{"};"}</>,
  <></>,
  <><V>wilmar</V>.<F>ship</F>(); <C>{"// one commit at a time"}</C></>,
];

// Profile rendered as a code editor window that tilts toward the cursor.
export default function HeroCode() {
  const ref = useRef(null);

  const onMove = (e) => {
    const el = ref.current;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.setProperty("--ry", `${x * 10}deg`);
    el.style.setProperty("--rx", `${-y * 10}deg`);
    el.style.setProperty("--gx", `${(x + 0.5) * 100}%`);
    el.style.setProperty("--gy", `${(y + 0.5) * 100}%`);
  };
  const onLeave = () => {
    ref.current.style.setProperty("--rx", "0deg");
    ref.current.style.setProperty("--ry", "0deg");
  };

  return (
    <div className="code-stage" onPointerMove={onMove} onPointerLeave={onLeave}>
      <figure ref={ref} className="code-window" aria-label="Profile summary">
        <div className="code-titlebar" aria-hidden="true">
          <span className="dots"><i /><i /><i /></span>
          <span className="code-tab">profile.ts</span>
        </div>

        <pre className="code-body" aria-hidden="true">
          {lines.map((line, i) => (
            <span key={i} className="code-line" style={{ "--i": i }}>
              <span className="ln">{i + 1}</span>
              <span className="lc">
                {line}
                {i === lines.length - 1 && <span className="cursor code-caret" />}
              </span>
            </span>
          ))}
        </pre>

        {/* Plain-text version for screen readers. */}
        <figcaption className="sr-only">
          Software Engineering Student based in Harare, Zimbabwe. Focus: mobile,
          backend and agri-tech. Currently building {building.join(" and ")}.
          Open to internships and collaborations. Available for opportunities.
        </figcaption>

        <div className="code-status" aria-hidden="true">
          <span className="live-dot">Available for opportunities</span>
          <span className="code-status-meta">TypeScript · UTF-8</span>
        </div>
      </figure>
    </div>
  );
}
