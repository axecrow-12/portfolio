import { useReveal } from "../hooks.js";

export default function Reveal({ as = "div", className = "", delay = 0, children, ...rest }) {
  const Tag = as;
  const [ref, visible] = useReveal();
  return (
    <Tag
      ref={ref}
      className={`reveal${visible ? " visible" : ""} ${className}`.trim()}
      style={delay ? { transitionDelay: `${delay}s` } : undefined}
      {...rest}
    >
      {children}
    </Tag>
  );
}
