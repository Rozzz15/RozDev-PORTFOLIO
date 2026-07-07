import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";

if (typeof window !== "undefined") {
  gsap.registerPlugin(CustomEase);
}

const navLinks = [
  { label: "Home", href: "#home", shape: "1" },
  { label: "About", href: "#about", shape: "5" },
  { label: "Projects", href: "#projects", shape: "2" },
  { label: "Experience", href: "#experience", shape: "3" },
  { label: "Contact", href: "#contact", shape: "4" },
];

export default function KineticNavigation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Initial Setup & Hover Effects
  useEffect(() => {
    if (!containerRef.current) return;

    try {
      if (!gsap.parseEase("main")) {
        CustomEase.create("main", "0.65, 0.01, 0.05, 0.99");
        gsap.defaults({ ease: "main", duration: 0.7 });
      }
    } catch (e) {
      console.warn("CustomEase failed to load, falling back to default.", e);
      gsap.defaults({ ease: "power2.out", duration: 0.7 });
    }

    const ctx = gsap.context(() => {
      const menuItems = containerRef.current!.querySelectorAll(".menu-list-item[data-shape]");
      const shapesContainer = containerRef.current!.querySelector(".ambient-background-shapes") as HTMLElement | null;

      gsap.set(shapesContainer?.querySelectorAll(".bg-shape"), { opacity: 0 });

      menuItems.forEach((item) => {
        const shapeIndex = item.getAttribute("data-shape");
        const shape = shapesContainer ? shapesContainer.querySelector(`.bg-shape-${shapeIndex}`) : null;

        if (!shape) return;

        const shapeEls = shape.querySelectorAll(".shape-element");

        const onEnter = () => {
          if (shapesContainer) {
            shapesContainer.querySelectorAll(".bg-shape").forEach((s) => s.classList.remove("active"));
          }
          shape.classList.add("active");

          gsap.fromTo(shapeEls,
            { scale: 0.5, opacity: 0, rotation: -10 },
            { scale: 1, opacity: 1, rotation: 0, duration: 0.6, stagger: 0.08, ease: "back.out(1.7)", overwrite: "auto" }
          );
        };

        const onLeave = () => {
          gsap.to(shapeEls, {
            scale: 0.8, opacity: 0, duration: 0.3, ease: "power2.in",
            onComplete: () => shape.classList.remove("active"),
            overwrite: "auto"
          });
        };

        item.addEventListener("mouseenter", onEnter);
        item.addEventListener("mouseleave", onLeave);

        (item as any)._cleanup = () => {
          item.removeEventListener("mouseenter", onEnter);
          item.removeEventListener("mouseleave", onLeave);
        };
      });
    }, containerRef);

    return () => {
      ctx.revert();
      if (containerRef.current) {
        const items = containerRef.current.querySelectorAll(".menu-list-item[data-shape]");
        items.forEach((item: any) => item._cleanup && item._cleanup());
      }
    };
  }, []);

  // Menu Open/Close Animation Effect
  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const navWrap = containerRef.current!.querySelector<HTMLElement>(".nav-overlay-wrapper");
      const menu = containerRef.current!.querySelector<HTMLElement>(".menu-content");
      const overlay = containerRef.current!.querySelector<HTMLElement>(".overlay");
      const bgPanels = containerRef.current!.querySelectorAll<HTMLElement>(".backdrop-layer");
      const menuLinks = containerRef.current!.querySelectorAll<HTMLElement>(".nav-link");
      const fadeTargets = containerRef.current!.querySelectorAll<HTMLElement>("[data-menu-fade]");

      const menuButton = containerRef.current!.querySelector<HTMLElement>(".nav-close-btn");
      const menuButtonTexts = menuButton?.querySelectorAll<HTMLElement>("p");
      const menuButtonIcon = menuButton?.querySelector<HTMLElement>(".menu-button-icon");

      const tl = gsap.timeline();

      if (isMenuOpen) {
        if (navWrap) navWrap.setAttribute("data-nav", "open");

        tl.set(navWrap, { display: "block" })
          .set(menu, { xPercent: 0 }, "<")
          .fromTo(menuButtonTexts, { yPercent: 0 }, { yPercent: -100, stagger: 0.2 })
          .fromTo(menuButtonIcon, { rotate: 0 }, { rotate: 315 }, "<")
          .fromTo(overlay, { autoAlpha: 0 }, { autoAlpha: 1 }, "<")
          .fromTo(bgPanels, { xPercent: 101 }, { xPercent: 0, stagger: { each: 0.12, from: "end" }, duration: 0.575 }, "<")
          .fromTo(menuLinks, { yPercent: 140, rotate: 10 }, { yPercent: 0, rotate: 0, stagger: 0.05 }, "<+=0.35");

        if (fadeTargets.length) {
          tl.fromTo(fadeTargets, { autoAlpha: 0, yPercent: 50 }, { autoAlpha: 1, yPercent: 0, stagger: 0.04, clearProps: "all" }, "<+=0.2");
        }
      } else {
        if (navWrap) navWrap.setAttribute("data-nav", "closed");

        tl.to(overlay, { autoAlpha: 0 })
          .to(menu, { xPercent: 120 }, "<")
          .to(menuButtonTexts, { yPercent: 0 }, "<")
          .to(menuButtonIcon, { rotate: 0 }, "<")
          .set(navWrap, { display: "none" });
      }
    }, containerRef);

    return () => ctx.kill();
  }, [isMenuOpen]);

  // keydown Escape handling
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isMenuOpen) setIsMenuOpen(false);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isMenuOpen]);

  const toggleMenu = () => setIsMenuOpen((p) => !p);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <div ref={containerRef}>
      <div className="site-header-wrapper">
        <header className="header">
          <div className="container is--full">
            <nav className="nav-row">
              <a href="#home" aria-label="home" className="nav-logo-row w-inline-block">
                <span>ROZEL O. RAMOS</span>
                <span className="logo-sub">Digital Systems Architect</span>
              </a>

              <div className="nav-row__right">
                <div className="nav-toggle-label" onClick={toggleMenu}>
                  <span className="toggle-text">click me</span>
                </div>

                <button role="button" className="nav-close-btn" onClick={toggleMenu}>
                  <div className="menu-button-text">
                    <p className="p-large">Menu</p>
                    <p className="p-large">Close</p>
                  </div>
                  <div className="icon-wrap">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="100%"
                      viewBox="0 0 16 16"
                      fill="none"
                      className="menu-button-icon"
                    >
                      <path d="M7.33333 16L7.33333 -3.2055e-07L8.66667 -3.78832e-07L8.66667 16L7.33333 16Z" fill="currentColor" />
                      <path d="M16 8.66667L-2.62269e-07 8.66667L-3.78832e-07 7.33333L16 7.33333L16 8.66667Z" fill="currentColor" />
                      <path d="M6 7.33333L7.33333 7.33333L7.33333 6C7.33333 6.73637 6.73638 7.33333 6 7.33333Z" fill="currentColor" />
                      <path d="M10 7.33333L8.66667 7.33333L8.66667 6C8.66667 6.73638 9.26362 7.33333 10 7.33333Z" fill="currentColor" />
                      <path d="M6 8.66667L7.33333 8.66667L7.33333 10C7.33333 9.26362 6.73638 8.66667 6 8.66667Z" fill="currentColor" />
                      <path d="M10 8.66667L8.66667 8.66667L8.66667 10C8.66667 9.26362 9.26362 8.66667 10 8.66667Z" fill="currentColor" />
                    </svg>
                  </div>
                </button>
              </div>
            </nav>
          </div>
        </header>
      </div>

      <section className="fullscreen-menu-container">
        <div data-nav="closed" className="nav-overlay-wrapper">
          <div className="overlay" onClick={closeMenu} />

          <nav className="menu-content" onClick={closeMenu}>
            <div className="menu-bg">
              <div className="backdrop-layer first" />
              <div className="backdrop-layer second" />
              <div className="backdrop-layer" />

              <div className="ambient-background-shapes">
                <svg className="bg-shape bg-shape-1" viewBox="0 0 400 400" fill="none">
                  <circle className="shape-element" cx="80" cy="120" r="40" fill="rgba(167,136,115,0.5)" />
                  <circle className="shape-element" cx="300" cy="80" r="60" fill="rgba(167,136,115,0.4)" />
                  <circle className="shape-element" cx="200" cy="300" r="80" fill="rgba(88,72,39,0.4)" />
                  <circle className="shape-element" cx="350" cy="280" r="30" fill="rgba(167,136,115,0.5)" />
                </svg>

                <svg className="bg-shape bg-shape-2" viewBox="0 0 400 400" fill="none">
                  <path className="shape-element" d="M0 200 Q100 100, 200 200 T 400 200" stroke="rgba(167,136,115,0.5)" strokeWidth="60" fill="none" />
                  <path className="shape-element" d="M0 280 Q100 180, 200 280 T 400 280" stroke="rgba(167,136,115,0.4)" strokeWidth="40" fill="none" />
                </svg>

                <svg className="bg-shape bg-shape-3" viewBox="0 0 400 400" fill="none">
                  <circle className="shape-element" cx="50" cy="50" r="8" fill="rgba(167,136,115,0.6)" />
                  <circle className="shape-element" cx="150" cy="50" r="8" fill="rgba(167,136,115,0.6)" />
                  <circle className="shape-element" cx="250" cy="50" r="8" fill="rgba(88,72,39,0.6)" />
                  <circle className="shape-element" cx="350" cy="50" r="8" fill="rgba(167,136,115,0.6)" />
                  <circle className="shape-element" cx="100" cy="150" r="12" fill="rgba(167,136,115,0.5)" />
                  <circle className="shape-element" cx="200" cy="150" r="12" fill="rgba(88,72,39,0.5)" />
                  <circle className="shape-element" cx="300" cy="150" r="12" fill="rgba(167,136,115,0.5)" />
                  <circle className="shape-element" cx="50" cy="250" r="10" fill="rgba(88,72,39,0.6)" />
                  <circle className="shape-element" cx="150" cy="250" r="10" fill="rgba(167,136,115,0.6)" />
                  <circle className="shape-element" cx="250" cy="250" r="10" fill="rgba(167,136,115,0.6)" />
                  <circle className="shape-element" cx="350" cy="250" r="10" fill="rgba(88,72,39,0.6)" />
                  <circle className="shape-element" cx="100" cy="350" r="6" fill="rgba(167,136,115,0.6)" />
                  <circle className="shape-element" cx="200" cy="350" r="6" fill="rgba(167,136,115,0.6)" />
                  <circle className="shape-element" cx="300" cy="350" r="6" fill="rgba(88,72,39,0.6)" />
                </svg>

                <svg className="bg-shape bg-shape-4" viewBox="0 0 400 400" fill="none">
                  <path className="shape-element" d="M100 100 Q150 50, 200 100 Q250 150, 200 200 Q150 250, 100 200 Q50 150, 100 100" fill="rgba(167,136,115,0.4)" />
                  <path className="shape-element" d="M250 200 Q300 150, 350 200 Q400 250, 350 300 Q300 350, 250 300 Q200 250, 250 200" fill="rgba(88,72,39,0.4)" />
                </svg>
              </div>
            </div>

            <div className="menu-content-wrapper">
              <ul className="menu-list">
                {navLinks.map((link) => (
                  <li key={link.label} className="menu-list-item" data-shape={link.shape}>
                    <div className="nav-link-hover-bg" />
                    <a href={link.href} onClick={closeMenu} className="nav-link w-inline-block">
                      <p className="nav-link-text">{link.label}</p>
                    </a>
                  </li>
                ))}
                <li className="menu-list-item" data-shape="5" style={{ display: "none" }}>
                  <div className="nav-link-hover-bg" />
                  <a href="#" className="nav-link w-inline-block">
                    <p className="nav-link-text" data-menu-fade>Blog</p>
                  </a>
                </li>
              </ul>
              <div className="mt-12">
                <a
                  href="https://calendly.com/rozelramos17/30min"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-menu-fade="true"
                  className="cursor-target group inline-flex items-center gap-3 border border-[#A78873] px-6 py-4 text-sm font-medium text-[#F5F2EE] transition-all duration-500 hover:bg-[#A78873] hover:text-[#171614] hover:shadow-lg hover:shadow-[#A78873]/20"
                >
                  <span className="relative z-10">Schedule a Call</span>
                  <svg className="relative z-10 h-4 w-4 transition-transform duration-500 group-hover:translate-x-1" viewBox="0 0 16 16" fill="none">
                    <path d="M8 0L16 8L8 16" stroke="currentColor" strokeWidth="2" fill="none" />
                    <path d="M0 8H15" stroke="currentColor" strokeWidth="2" />
                  </svg>
                </a>
              </div>
            </div>
          </nav>
        </div>
      </section>
    </div>
  );
}
