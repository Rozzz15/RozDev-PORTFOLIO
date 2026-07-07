"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion"
import { LinkPreview } from "@/components/ui/link-preview"

const testimonials = [
  {
    quote: "100/10 sa pag creat ng portfolio. Super ganda and will be helpful for clients!! 🩵",
    author: "Maiden Macasaet",
    role: "Client",
    company: "Portfolio Review",
    image: "/images/test.png",
  },
  {
    quote: "Very approachable and professional. Sir Ramos took time to understand my background and my skills, resulting in a very organized presentation of my work. His work will definitely help me in finding potential clients. Thank You, Sir!",
    author: "Deen Hazel Maralit",
    role: "Client",
    company: "Portfolio Review",
    image: "/images/test1.png",
  },
  {
    quote: "Magaling si kuya gumawa ng portfolio ang bilis lang nya nagawa and nakuha nya yung gusto ko plus unli revision pa saknya hehe",
    author: "Justin Slvdr",
    role: "Client",
    company: "Portfolio Review",
    image: "/images/test2.png",
  },
]

export function Testimonial() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const springConfig = { damping: 25, stiffness: 200 }
  const x = useSpring(mouseX, springConfig)
  const y = useSpring(mouseY, springConfig)

  const numberX = useTransform(x, [-200, 200], [-20, 20])
  const numberY = useTransform(y, [-200, 200], [-10, 10])

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect()
    if (rect) {
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      mouseX.set(e.clientX - centerX)
      mouseY.set(e.clientY - centerY)
    }
  }

  const goNext = () => setActiveIndex((prev) => (prev + 1) % testimonials.length)
  const goPrev = () => setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)

  useEffect(() => {
    if (isPaused) return
    const timer = setInterval(goNext, 6000)
    return () => clearInterval(timer)
  }, [isPaused])

  const current = testimonials[activeIndex]

  return (
    <section
      className="border-t border-[rgba(245,242,238,0.08)] bg-[#1c1a17] pt-28 pb-0 overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div ref={containerRef} className="relative w-full max-w-6xl mx-auto px-5 lg:px-8" onMouseMove={handleMouseMove}>
        {/* Oversized index number */}
        <motion.div
          className="absolute -left-8 top-1/2 -translate-y-1/2 text-[12rem] sm:text-[20rem] md:text-[28rem] font-bold text-[#A78873]/[0.04] select-none pointer-events-none leading-none tracking-tighter"
          style={{ x: numberX, y: numberY }}
        >
          <AnimatePresence mode="wait">
            <motion.span
              key={activeIndex}
              initial={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="block"
            >
              {String(activeIndex + 1).padStart(2, "0")}
            </motion.span>
          </AnimatePresence>
        </motion.div>

        {/* Main content */}
        <div className="relative flex">
          {/* Left column - vertical text */}
          <div className="hidden md:flex flex-col items-center justify-center pr-16 border-r border-[rgba(245,242,238,0.1)]">
            <motion.span
              className="text-xs font-mono text-[rgba(245,242,238,0.4)] tracking-widest uppercase"
              style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Testimonials
            </motion.span>

            {/* Vertical progress line */}
            <div className="relative h-32 w-px bg-[rgba(245,242,238,0.1)] mt-8">
              <motion.div
                className="absolute top-0 left-0 w-full bg-[#A78873] origin-top"
                animate={{
                  height: `${((activeIndex + 1) / testimonials.length) * 100}%`,
                }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>
          </div>

          {/* Center - main content */}
          <div className="flex-1 md:pl-16 py-12">
            {/* Company badge */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.4 }}
                className="mb-8"
              >
                <span className="inline-flex items-center gap-2 text-xs font-mono text-[rgba(245,242,238,0.5)] border border-[rgba(245,242,238,0.12)] rounded-full px-3 py-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#A78873]" />
                  {current.company}
                </span>
              </motion.div>
            </AnimatePresence>

            {/* Quote with character reveal */}
            <div className="relative mb-12 min-h-[140px]">
              <AnimatePresence mode="wait">
                <motion.blockquote
                  key={activeIndex}
                  className="text-4xl md:text-5xl font-light text-[#F5F2EE] leading-[1.15] tracking-tight"
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  {current.quote.split(" ").map((word, i) => (
                    <motion.span
                      key={i}
                      className="inline-block mr-[0.3em]"
                      variants={{
                        hidden: { opacity: 0, y: 20, rotateX: 90 },
                        visible: {
                          opacity: 1,
                          y: 0,
                          rotateX: 0,
                          transition: {
                            duration: 0.5,
                            delay: i * 0.05,
                            ease: [0.22, 1, 0.36, 1],
                          },
                        },
                        exit: {
                          opacity: 0,
                          y: -10,
                          transition: { duration: 0.2, delay: i * 0.02 },
                        },
                      }}
                    >
                      <LinkPreview
                        url="https://rozelramos.vercel.app"
                        isStatic
                        imageSrc={current.image ?? "/images/hero.png"}
                        className="text-inherit hover:underline decoration-1 underline-offset-4 decoration-[#A78873]/40"
                      >
                        {word}
                      </LinkPreview>
                    </motion.span>
                  ))}
                </motion.blockquote>
              </AnimatePresence>
            </div>

            {/* Author row */}
            <div className="flex items-end justify-between">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                  className="flex items-center gap-4"
                >
                  <motion.div
                    className="w-8 h-px bg-[#F5F2EE]"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    style={{ originX: 0 }}
                  />
                  <div>
                    <p className="text-base font-medium text-[#F5F2EE]">{current.author}</p>
                    <p className="text-sm text-[rgba(245,242,238,0.5)]">{current.role}</p>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Navigation */}
              <div className="flex items-center gap-4">
                <motion.button
                  onClick={goPrev}
                  className="group relative w-12 h-12 rounded-full border border-[rgba(245,242,238,0.15)] flex items-center justify-center overflow-hidden hover:border-[#A78873] transition-colors"
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.div
                    className="absolute inset-0 bg-[#A78873]"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "0%" }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  />
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 16 16"
                    fill="none"
                    className="relative z-10 text-[#F5F2EE] group-hover:text-[#171614] transition-colors"
                  >
                    <path
                      d="M10 12L6 8L10 4"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </motion.button>

                <motion.button
                  onClick={goNext}
                  className="group relative w-12 h-12 rounded-full border border-[rgba(245,242,238,0.15)] flex items-center justify-center overflow-hidden hover:border-[#A78873] transition-colors"
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.div
                    className="absolute inset-0 bg-[#A78873]"
                    initial={{ x: "100%" }}
                    whileHover={{ x: "0%" }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  />
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 16 16"
                    fill="none"
                    className="relative z-10 text-[#F5F2EE] group-hover:text-[#171614] transition-colors"
                  >
                    <path
                      d="M6 4L10 8L6 12"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </motion.button>
              </div>
            </div>

            {/* Leave a Review button */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="mt-8"
            >
              <a
                href="https://www.facebook.com/CodeVisionPH/reviews"
                target="_blank"
                rel="noopener noreferrer"
                className="cursor-target group inline-flex items-center gap-2 border border-[#A78873] px-5 py-3 text-xs font-medium uppercase tracking-[0.15em] text-[#F5F2EE] transition hover:bg-[#A78873] hover:text-[#171614]"
              >
                Leave a Review
                <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
              </a>
            </motion.div>
          </div>
        </div>
      </div>

        {/* Bottom ticker - full width */}
        <div className="relative h-20 mt-12 overflow-hidden opacity-[0.06] pointer-events-none w-full">
          <motion.div
            className="flex whitespace-nowrap text-6xl font-bold tracking-tight text-[#F5F2EE]"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          >
            {[...Array(10)].map((_, i) => (
              <span key={i} className="mx-8">
                {testimonials.map((t) => t.company).join(" • ")} •
              </span>
            ))}
          </motion.div>
        </div>

      {/* Animated wave divider */}
      <div className="relative w-full overflow-hidden leading-[0] -mb-[2px]">
        <svg
          className="block w-full h-[60px] sm:h-[80px] md:h-[100px]"
          viewBox="0 0 1440 122"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="1440" height="122" fill="#1c1a17" />
          <motion.path
            animate={{
              d: [
                "M0 47.40849C120 97.40849 240 2.59151 360 47.40849S600 97.40849 720 47.40849 960 2.59151 1080 47.40849 1320 97.40849 1440 47.40849V122H0Z",
                "M0 37.40849C120 87.40849 240 12.59151 360 37.40849S600 87.40849 720 37.40849 960 12.59151 1080 37.40849 1320 87.40849 1440 37.40849V122H0Z",
                "M0 57.40849C120 107.40849 240 2.59151 360 57.40849S600 107.40849 720 57.40849 960 2.59151 1080 57.40849 1320 107.40849 1440 57.40849V122H0Z",
                "M0 47.40849C120 97.40849 240 2.59151 360 47.40849S600 97.40849 720 47.40849 960 2.59151 1080 47.40849 1320 97.40849 1440 47.40849V122H0Z",
              ]
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            fill="#171614"
          />
        </svg>
      </div>

    </section>
  )
}
