import React, { useMemo, useRef, useEffect, useState, type ElementType, type CSSProperties } from "react";

export interface TextRevealProps {
  text: string;
  as?: ElementType;
  href?: string;
  target?: string;
  className?: string;
  style?: CSSProperties;
  fontSize?: string;
  staggerDelay?: number;
  duration?: number;
  easing?: string;
  color?: string;
  hoverColor?: string;
  onClick?: (e: React.MouseEvent) => void;
}

function TextReveal({
  text,
  as: Component = "a",
  href,
  target,
  className = "",
  style,
  fontSize = "3rem",
  staggerDelay = 50,
  duration = 350,
  easing = "ease-out",
  color = "inherit",
  hoverColor = "#b2c73a",
  onClick,
}: TextRevealProps) {
  const rootRef = useRef<HTMLElement>(null);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const onEnter = () => setHovered(true);
    const onLeave = () => setHovered(false);
    el.addEventListener("mouseenter", onEnter);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mouseenter", onEnter);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  const words = useMemo(() => text.split(" "), [text]);

  const tagProps: Record<string, unknown> = {
    ref: rootRef,
    className: `relative cursor-pointer select-none ${className}`.trim(),
    style: { fontSize, ...style },
    onClick,
    "aria-label": text,
  };

  if (Component === "a") {
    const ahref = href ?? "#";
    tagProps.href = ahref;
    if (target) {
      tagProps.target = target;
      if (target === "_blank") tagProps.rel = "noopener noreferrer";
    }
  }

  return (
    <Component {...tagProps}>
      <span aria-hidden="true">
        {words.map((word, i) => (
          <React.Fragment key={i}>
            <span
              className="inline-block overflow-hidden align-top"
              style={{
                transition: `transform ${duration}ms ${easing}`,
                transitionDelay: `${i * staggerDelay}ms`,
                transform: hovered ? "translateY(-0.3em)" : "translateY(0)",
              }}
            >
              <span
                className="inline-block"
                style={{
                  transition: `color ${duration}ms ${easing}`,
                  transitionDelay: `${i * staggerDelay}ms`,
                  color: hovered ? hoverColor : color,
                }}
              >
                {word}
              </span>
            </span>
            {i < words.length - 1 && <span> </span>}
          </React.Fragment>
        ))}
      </span>
    </Component>
  );
}

TextReveal.displayName = "TextReveal";
export { TextReveal };
