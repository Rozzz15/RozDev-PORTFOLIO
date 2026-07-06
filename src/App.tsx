import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, ArrowUp, X, Mail, Phone, MapPin, Send, CheckCircle, AlertCircle } from "lucide-react";
import KineticNavigation from "@/components/ui/kinetic-navigation";
import TargetCursor from "@/components/ui/target-cursor";
import { HeroParallax } from "@/components/ui/hero-parallax";
import { ChatbotModal } from "@/components/ui/chatbot-modal";
import { TextReveal } from "@/components/ui/cascade-text";
import { WaveText } from "@/components/ui/wave-text";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FloatingPaths } from "@/components/ui/background-paths";
import BorderGlow from "@/components/ui/border-glow";
import TubesCursor from "@/components/ui/tubes-cursor";
import { Footer } from "@/components/ui/modem-animated-footer";
import { Testimonial } from "@/components/ui/design-testimonial";

const categories = [
  "All",
  "Websites",
  "Web Portfolio",
  "Web Invitation",
  "Mobile App",
  "Custom Games",
  "Graphics Design",
  "Video Editing",
];

const projects = [
  {
    title: "181 Lounge Coffee Shop",
    description:
      "A complete restaurant and lounge website featuring menu showcases, gallery, online presence, and brand identity for 181 Lounge Coffee Shop.",
    url: "https://www.181lounge.com/",
    category: "Websites",
    tags: ["Restaurant", "Web Design", "Branding", "Gallery"],
    image: "/images/181.png",
    gallery: [
      "/images/181a.png",
      "/images/181b.png",
      "/images/181c.png",
      "/images/181d.png",
      "/images/181e.png",
      "/images/181f.png",
      "/images/181g.png",
      "/images/181h.png",
    ],
    video: "/videos/181.mp4",
  },
  {
    title: "Eyir Clinic Website",
    description:
      "A complete clinic website featuring service showcases, online presence, and brand identity for Eyir Clinic.",
    url: "https://eyirclinicwebsite.netlify.app/",
    category: "Websites",
    tags: ["Clinic", "Web Design", "Healthcare", "Branding"],
    image: "/images/eyir1.png",
    gallery: [
      "/images/eyir1.png",
      "/images/eyir2.png",
      "/images/eyir3.png",
      "/images/eyir4.png",
      "/images/eyir5.png",
      "/images/eyir6.png",
    ],
    video: "/videos/eyir-clinic-tour.mp4",
  },
  {
    title: "Louise Freedom Portfolio Website",
    description:
      "A personal portfolio website showcasing creative projects, skills, and design work with a modern, responsive interface.",
    url: "https://louisefreedomportfolio.netlify.app/",
    category: "Web Portfolio",
    tags: ["Portfolio", "Web Design", "Frontend", "Creative"],
    image: "/images/louise.png",
    gallery: [
      "/images/louise.png",
      "/images/louise1.png",
      "/images/louise2.png",
      "/images/louise3.png",
      "/images/louise4.png",
      "/images/louise5.png",
    ],
    video: "/videos/louise.mp4",
  },
  {
    title: "Jenefer's Portfolio Website",
    description:
      "A personal portfolio website showcasing work, skills, and creative projects with a clean, modern design.",
    url: "https://jeneferuson.netlify.app/",
    category: "Web Portfolio",
    tags: ["Portfolio", "Web Design", "Frontend", "Creative"],
    image: "/images/jen1.png",
    gallery: [
      "/images/jen1.png",
      "/images/jen2.png",
      "/images/jen3.png",
      "/images/jen4.png",
      "/images/jen5.png",
      "/images/jen6.png",
      "/images/jen7.png",
      "/images/jen8.png",
    ],
    video: "/videos/jen_opt.mp4",
  },
  {
    title: "Jas's Portfolio Website",
    description:
      "A personal portfolio website showcasing creative work, skills, and projects with a modern and elegant design.",
    url: "https://jassportfoliova.netlify.app/",
    category: "Web Portfolio",
    tags: ["Portfolio", "Web Design", "Frontend", "Creative"],
    image: "/images/jas.png",
    gallery: [
      "/images/jas.png",
      "/images/jas2.png",
      "/images/jas3.png",
      "/images/jas4.png",
      "/images/jas5.png",
      "/images/jas6.png",
      "/images/jas7.png",
    ],
    video: "/videos/jasmine_opt.mp4",
  },
  {
    title: "Aries America's Portfolio Website",
    description:
      "A sleek personal portfolio website showcasing creative projects, skills, and experiences with a modern UI.",
    url: "https://ariesamericaportfolio.netlify.app/",
    category: "Web Portfolio",
    tags: ["Portfolio", "Web Design", "Frontend", "Creative"],
    image: "/images/ar.png",
    gallery: [
      "/images/ar.png",
      "/images/ar1.png",
      "/images/ar2.png",
      "/images/ar3.png",
      "/images/ar4.png",
      "/images/ar5.png",
      "/images/ar6.png",
    ],
    video: "/videos/ar_opt.mp4",
  },
  {
    title: "Machrislyn Villanueva's Portfolio Website",
    description:
      "A creative personal portfolio website showcasing skills, projects, and design work with a polished interface.",
    url: "https://machrislynvillanuevaportfolio.netlify.app/",
    category: "Web Portfolio",
    tags: ["Portfolio", "Web Design", "Frontend", "Creative"],
    image: "/images/ma.png",
    gallery: [
      "/images/ma.png",
      "/images/ma1.png",
      "/images/ma2.png",
      "/images/ma3.png",
      "/images/ma4.png",
    ],
    video: "/videos/ma_opt.mp4",
  },
  {
    title: "Kai Zacedral's Portfolio Website",
    description:
      "A personal portfolio website showcasing creative projects, skills, and design work with a modern, responsive interface.",
    url: "https://kaizacatedralportfolio.netlify.app/",
    category: "Web Portfolio",
    tags: ["Portfolio", "Web Design", "Frontend", "Creative"],
    image: "/images/kai1.png",
    gallery: [
      "/images/kai1.png",
      "/images/kai2.png",
      "/images/kai3.png",
      "/images/kai4.png",
      "/images/kai5.png",
      "/images/kai6.png",
    ],
    video: "/videos/kai.mp4",
  },
  {
    title: "Cas Portfolio Website",
    description:
      "A personal portfolio website showcasing projects, skills, and creative work with a modern, responsive design.",
    url: "https://casporfolio.netlify.app/",
    category: "Web Portfolio",
    tags: ["Portfolio", "Web Design", "Frontend", "Creative"],
    image: "/images/cas.png",
    gallery: [
      "/images/cas.png",
      "/images/cas1.png",
      "/images/cas2.png",
      "/images/cas3.png",
      "/images/cas4.png",
      "/images/cas5.png",
      "/images/cas6.png",
    ],
    video: "/videos/cas.mp4",
  },
  {
    title: "NJ Bania's Portfolio Website",
    description:
      "A personal portfolio website showcasing projects, skills, and experience with a modern, responsive design and interactive UI.",
    url: "https://njbaniasportfolio.netlify.app/",
    category: "Web Portfolio",
    tags: ["Portfolio", "Web Design", "Frontend", "Responsive"],
    image: "/images/nj.png",
    gallery: [
      "/images/nj.png",
      "/images/nj1.png",
      "/images/nj2.png",
      "/images/nj3.png",
      "/images/nj4.png",
      "/images/nj5.png",
      "/images/nj6.png",
    ],
    video: "/videos/nj_opt2.mp4",
  },
  {
    title: "Roman Eros Portfolio Website",
    description:
      "A personal portfolio website showcasing creative projects, skills, and design work with a modern, responsive interface.",
    url: "https://romanerosportfolio.netlify.app/",
    category: "Web Portfolio",
    tags: ["Portfolio", "Web Design", "Frontend", "Creative"],
    image: "/images/eros.png",
    gallery: [
      "/images/eros.png",
      "/images/eros1.png",
      "/images/eros2.png",
      "/images/eros3.png",
      "/images/eros4.png",
    ],
    video: "/videos/eros.mp4",
  },
  {
    title: "Justin Salvador Portfolio Website",
    description:
      "A personal portfolio website showcasing creative projects, skills, and design work with a modern, responsive interface.",
    url: "https://justinsalvadorportfolio.netlify.app/",
    category: "Web Portfolio",
    tags: ["Portfolio", "Web Design", "Frontend", "Creative"],
    image: "/images/jus.png",
    gallery: [
      "/images/jus.png",
      "/images/jus1.png",
      "/images/jus2.png",
      "/images/jus3.png",
      "/images/jus4.png",
      "/images/jus5.png",
      "/images/jus6.png",
    ],
    video: "/videos/jus.mp4",
  },
  {
    title: "Jake Castro Portfolio Website",
    description:
      "A personal portfolio website showcasing creative projects, skills, and design work with a modern, responsive interface.",
    url: "https://jakecastroportfolio.netlify.app/",
    category: "Web Portfolio",
    tags: ["Portfolio", "Web Design", "Frontend", "Creative"],
    image: "/images/jake.png",
    gallery: [
      "/images/jake.png",
      "/images/jake1.png",
      "/images/jake2.png",
      "/images/jake3.png",
      "/images/jake4.png",
    ],
    video: "/videos/jake.mp4",
  },
  {
    title: "Javerick Arcenio Portfolio Website",
    description:
      "A personal portfolio website showcasing creative projects, skills, and design work with a modern, responsive interface.",
    url: "https://javerickarcenioportfolio.netlify.app/",
    category: "Web Portfolio",
    tags: ["Portfolio", "Web Design", "Frontend", "Creative"],
    image: "/images/jav.png",
    gallery: [
      "/images/jav.png",
      "/images/jav1.png",
      "/images/jav2.png",
      "/images/jav3.png",
      "/images/jav4.png",
      "/images/jav5.png",
      "/images/jav6.png",
    ],
    video: "/videos/jav.mp4",
  },
  {
    title: "Monica Portfolio Website",
    description:
      "A personal portfolio website showcasing creative projects, skills, and design work with a modern, responsive interface.",
    url: "https://monicaaa.netlify.app/",
    category: "Web Portfolio",
    tags: ["Portfolio", "Web Design", "Frontend", "Creative"],
    image: "/images/mon1.png",
    gallery: [
      "/images/mon1.png",
      "/images/mon2.png",
      "/images/mon3.png",
      "/images/mon4.png",
      "/images/mon5.png",
      "/images/mon6.png",
    ],
    video: "/videos/mon.mp4",
  },
  {
    title: "Babybella Santos Portfolio Website",
    description:
      "A personal portfolio website showcasing creative projects, skills, and design work with a modern, responsive interface.",
    url: "https://babybellasantosportfolio.netlify.app/",
    category: "Web Portfolio",
    tags: ["Portfolio", "Web Design", "Frontend", "Creative"],
    image: "/images/bab.png",
    gallery: [
      "/images/bab.png",
      "/images/bab1.png",
      "/images/bab2.png",
      "/images/bab3.png",
      "/images/bab4.png",
    ],
    video: "/videos/bab.mp4",
  },
  {
    title: "Christine Mae Valencia Portfolio Website",
    description:
      "A personal portfolio website showcasing creative projects, skills, and design work with a modern, responsive interface.",
    url: "https://christinemaevalenciaportfolio.netlify.app/",
    category: "Web Portfolio",
    tags: ["Portfolio", "Web Design", "Frontend", "Creative"],
    image: "/images/ch.png",
    gallery: [
      "/images/ch.png",
      "/images/ch1.png",
      "/images/ch2.png",
      "/images/ch3.png",
      "/images/ch4.png",
      "/images/ch5.png",
      "/images/ch6.png",
    ],
    video: "/videos/ch.mp4",
  },
  {
    title: "Chen Prencess Portfolio Website",
    description:
      "A personal portfolio website showcasing creative projects, skills, and design work with a modern, responsive interface.",
    url: "https://chenprencessportfolio.netlify.app/",
    category: "Web Portfolio",
    tags: ["Portfolio", "Web Design", "Frontend", "Creative"],
    image: "/images/chen.png",
    gallery: [
      "/images/chen.png",
      "/images/chen1.png",
      "/images/chen2.png",
      "/images/chen3.png",
      "/images/chen4.png",
      "/images/chen5.png",
    ],
    video: "/videos/chen.mp4",
  },
  {
    title: "Patrick David Rosario Portfolio Website",
    description:
      "A personal portfolio website showcasing creative projects, skills, and design work with a modern, responsive interface.",
    url: "https://patrickdavidrosario.netlify.app/",
    category: "Web Portfolio",
    tags: ["Portfolio", "Web Design", "Frontend", "Creative"],
    image: "/images/pat1.png",
    gallery: [
      "/images/pat1.png",
      "/images/pat2.png",
      "/images/pat3.png",
      "/images/pat4.png",
      "/images/pat5.png",
      "/images/pat6.png",
    ],
    video: "/videos/patrick.mp4",
  },
  {
    title: "Vincent Carl Matucabe Portfolio Website",
    description:
      "A personal portfolio website showcasing creative projects, skills, and design work with a modern, responsive interface.",
    url: "https://vincentcarlmatucabe.netlify.app/",
    category: "Web Portfolio",
    tags: ["Portfolio", "Web Design", "Frontend", "Creative"],
    image: "/images/vin1.png",
    gallery: [
      "/images/vin1.png",
      "/images/vin2.png",
      "/images/vin3.png",
      "/images/vin4.png",
      "/images/vin5.png",
    ],
    video: "/videos/vincent.mp4",
  },
  {
    title: "Customer Journey Automation",
    description:
      "Mapped and automated the entire customer journey from first touchpoint to repeat engagement and retention.",
    url: "#",
    category: "Mobile App",
    tags: ["Customer Journey", "CRM", "Email Automation"],
    image:
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=500&fit=crop",
  },
  {
    title: "Duyanan Restaurant Website",
    description:
      "A complete restaurant website featuring menu showcases, gallery, online presence, and brand identity for Duyanan Restaurant.",
    url: "https://duyananrestaurant.netlify.app/",
    category: "Websites",
    tags: ["Restaurant", "Web Design", "Branding", "Gallery"],
    image: "/images/duyan1.png",
    gallery: [
      "/images/duyan1.png",
      "/images/duyan2.png",
      "/images/duyan3.png",
      "/images/duyan4.png",
      "/images/duyan5.png",
      "/images/duyan6.png",
      "/images/duyan7.png",
      "/images/duyan8.png",
    ],
    video: "/videos/Duyanan.mp4",
  },
  {
    title: "Kainan sa Garahe Restaurant Website",
    description:
      "A complete restaurant and event venue website featuring menu showcases, gallery, online presence, and brand identity for Kainan sa Garahe.",
    url: "https://kainansagaraherestu.netlify.app/",
    category: "Websites",
    tags: ["Restaurant", "Web Design", "Branding", "Gallery"],
    image: "/images/ksg.png",
    gallery: [
      "/images/ksg.png",
      "/images/ksg1.png",
      "/images/ksg2.png",
      "/images/ksg3.png",
      "/images/ksg4.png",
      "/images/ksg5.png",
    ],
    video: "/videos/KSG.mp4",
  },
  {
    title: "Manong Gadget Store",
    description:
      "A complete e-commerce website for gadget sales featuring product showcases, catalog browsing, and online presence for Manong Gadget Store.",
    url: "https://manonggadgetstore.netlify.app/",
    category: "Websites",
    tags: ["E-commerce", "Web Design", "Gadgets", "Online Store"],
    image: "/images/manong.png",
    gallery: [
      "/images/manong.png",
      "/images/manong1.png",
      "/images/manong2.png",
      "/images/manong3.png",
      "/images/manong4.png",
      "/images/manong5.png",
    ],
    video: "/videos/manong.mp4",
  },
  {
    title: "Jlad Samgyup",
    description:
      "A complete restaurant website for a samgyupsal place featuring menu showcases, gallery, online presence, and brand identity for Jlad Samgyup.",
    url: "https://jladsamgyup.netlify.app/",
    category: "Websites",
    tags: ["Restaurant", "Web Design", "Menu", "Branding"],
    image: "/images/jlad.png",
    gallery: [
      "/images/jlad.png",
      "/images/jlad1.png",
      "/images/jlad2.png",
      "/images/jlad3.png",
      "/images/jlad4.png",
      "/images/jlad5.png",
      "/images/jlad6.png",
    ],
    video: "/videos/jlad.mp4",
  },
  {
    title: "EyirPOS System",
    description:
      "A point-of-sale system design with a clean and modern UI for retail transactions.",
    url: "#",
    category: "Graphics Design",
    tags: ["POS", "UI Design", "Graphics", "Retail"],
    image: "",
    video: "/videos/EyirPOS.mp4",
  },
];

const experience = [
  {
    role: "Freelance Web & Mobile Developer",
    dates: "2025 - Present",
    focus:
      "Solving operational problems through digital tools, websites, automations, and structured customer workflows.",
  },
  {
    role: "Online Chat Support / Sales Chatter",
    dates: "2025 - 2026",
    focus:
      "Built customer experience discipline through live conversations, sales support, response systems, and conversion awareness.",
  },
  {
    role: "ID Processing Staff / Admission Assistant Officer",
    dates: "2022 - 2023",
    focus:
      "Developed systems thinking through administrative operations, documentation, data handling, and process accuracy.",
  },
];

const heroProducts = [
  { title: "181 Lounge", link: "https://www.181lounge.com/", thumbnail: "/images/181.png" },
  { title: "Eyir Clinic", link: "https://eyirclinicwebsite.netlify.app/", thumbnail: "/images/eyir1.png" },
  { title: "Duyanan Restaurant", link: "https://duyananrestaurant.netlify.app/", thumbnail: "/images/duyan1.png" },
  { title: "Kainan sa Garahe", link: "https://kainansagaraherestu.netlify.app/", thumbnail: "/images/ksg.png" },
  { title: "Manong Gadget Store", link: "https://manonggadgetstore.netlify.app/", thumbnail: "/images/manong.png" },
  { title: "Jlad Samgyup", link: "https://jladsamgyup.netlify.app/", thumbnail: "/images/jlad.png" },
  { title: "Louise", link: "https://louisefreedomportfolio.netlify.app/", thumbnail: "/images/louise.png" },
  { title: "Jenefer", link: "https://jeneferuson.netlify.app/", thumbnail: "/images/jen1.png" },
  { title: "Jas", link: "https://jassportfoliova.netlify.app/", thumbnail: "/images/jas.png" },
  { title: "Aries America", link: "https://ariesamericaportfolio.netlify.app/", thumbnail: "/images/ar.png" },
  { title: "Machrislyn", link: "https://machrislynvillanuevaportfolio.netlify.app/", thumbnail: "/images/ma.png" },
  { title: "Kai", link: "https://kaizacatedralportfolio.netlify.app/", thumbnail: "/images/kai1.png" },
  { title: "Cas", link: "https://casporfolio.netlify.app/", thumbnail: "/images/cas.png" },
  { title: "NJ Bania", link: "https://njbaniasportfolio.netlify.app/", thumbnail: "/images/nj.png" },
  { title: "Roman Eros", link: "https://romanerosportfolio.netlify.app/", thumbnail: "/images/eros.png" },
  { title: "Justin Salvador", link: "https://justinsalvadorportfolio.netlify.app/", thumbnail: "/images/jus.png" },
  { title: "Jake Castro", link: "https://jakecastroportfolio.netlify.app/", thumbnail: "/images/jake.png" },
  { title: "Javerick Arcenio", link: "https://javerickarcenioportfolio.netlify.app/", thumbnail: "/images/jav.png" },
  { title: "Monica", link: "https://monicaaa.netlify.app/", thumbnail: "/images/mon1.png" },
  { title: "Babybella Santos", link: "https://babybellasantosportfolio.netlify.app/", thumbnail: "/images/bab.png" },
  { title: "Christine Mae", link: "https://christinemaevalenciaportfolio.netlify.app/", thumbnail: "/images/ch.png" },
  { title: "Chen Prencess", link: "https://chenprencessportfolio.netlify.app/", thumbnail: "/images/chen.png" },
  { title: "Patrick David", link: "https://patrickdavidrosario.netlify.app/", thumbnail: "/images/pat1.png" },
  { title: "Vincent Carl", link: "https://vincentcarlmatucabe.netlify.app/", thumbnail: "/images/vin1.png" },
];

const fadeUpVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
};

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-medium uppercase tracking-[0.35em] text-[rgba(245,242,238,0.5)]">
      {children}
    </p>
  );
}

function Button({
  children,
  href,
  variant = "primary",
}: {
  children: React.ReactNode;
  href: string;
  variant?: "primary" | "secondary";
}) {
  return (
    <a
      href={href}
      className={
        variant === "primary"
          ? "cursor-target group inline-flex items-center justify-center gap-3 border border-[#A78873] bg-[#A78873] px-6 py-4 text-sm font-medium text-[#171614] transition duration-300 hover:bg-[#F5F2EE] hover:border-[#F5F2EE]"
          : "cursor-target group inline-flex items-center justify-center gap-3 border border-[rgba(245,242,238,0.18)] px-6 py-4 text-sm font-medium text-[#F5F2EE] transition duration-300 hover:border-[#A78873] hover:bg-[rgba(167,136,115,0.08)]"
      }
    >
      {children}
      <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
    </a>
  );
}

function HeroSection() {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);
  const titleY = useTransform(scrollY, [0, 600], [0, -120]);
  const imageY = useTransform(scrollY, [0, 600], [0, -60]);
  const scale = useTransform(scrollY, [0, 600], [1, 0.95]);

  return (
    <section id="home" className="relative h-[300vh]">
      <div className="absolute inset-0 z-0">
        <HeroParallax products={heroProducts} />
      </div>

      <motion.div
        style={{ opacity, scale }}
        className="sticky top-0 h-screen flex flex-col items-end z-10 pointer-events-none pt-32"
      >
        <div className="mx-auto grid w-full max-w-7xl items-end gap-12 px-5 pb-24 md:pb-32 lg:grid-cols-[1fr_0.64fr] lg:px-8">
          <motion.div
            style={{ y: titleY }}
            initial="hidden"
            animate="visible"
            variants={fadeUpVariants}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="pb-12 lg:pb-24"
          >
            <h1 className="max-w-5xl text-5xl font-semibold leading-[0.94] tracking-[-0.055em] text-[#F5F2EE] md:text-7xl lg:text-8xl">
              <WaveText text="Building Systems That Help Businesses Scale" />
            </h1>
            <p className="mt-8 max-w-2xl text-lg leading-8 text-[rgba(245,242,238,0.75)] md:text-xl">
              I design digital infrastructure, automation workflows, and customer-focused
              systems that streamline operations, reduce manual work, and support sustainable
              business growth.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row pointer-events-auto">
              <Button href="https://calendly.com/rozelramos17/30min">
                Schedule a Discovery Call
              </Button>
              <a
                href="/pdf/Rozel Ramos CV.pdf"
                download
                className="cursor-target group inline-flex items-center justify-center gap-3 border border-[rgba(245,242,238,0.18)] px-6 py-4 text-sm font-medium text-[#F5F2EE] transition duration-300 hover:border-[#A78873] hover:bg-[rgba(167,136,115,0.08)]"
              >
                Download CV
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </div>
          </motion.div>

          <motion.div
            style={{ y: imageY }}
            initial={{ opacity: 0, y: 40, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1, delay: 0.15, ease: "easeOut" }}
            className="relative mx-auto h-[48vh] min-h-[420px] w-full max-w-[520px] self-end lg:h-[78vh] group pointer-events-auto"
          >
            <div className="absolute inset-x-8 bottom-0 top-12 border border-[#745D4B]/55" />
            <div className="absolute inset-x-0 bottom-0 top-0 bg-[#3E3025]/30 shadow-2xl shadow-black/40" />
            <BorderGlow
              backgroundColor="transparent"
              borderRadius={0}
              glowColor="40 80 80"
              colors={["#A78873", "#c084fc", "#f472b6"]}
              edgeSensitivity={20}
              glowRadius={20}
              glowIntensity={0.5}
              coneSpread={30}
              className="absolute inset-0 h-full w-full"
            >
              <img
                src="/images/hero.png"
                alt="Rozel O. Ramos, Digital Systems Architect"
                className="flex-1 min-h-0 w-full object-cover object-center mix-blend-luminosity group-hover:mix-blend-normal transition-all duration-500"
                loading="eager"
              />
            </BorderGlow>
            <div className="absolute inset-0 bg-gradient-to-t from-[#171614] via-transparent to-transparent opacity-100 group-hover:opacity-0 transition-opacity duration-500 pointer-events-none" />
            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#171614] to-transparent opacity-100 group-hover:opacity-0 transition-opacity duration-500 pointer-events-none" />
          </motion.div>
        </div>
      </motion.div>

      <div className="absolute bottom-0 left-0 w-full pointer-events-none z-20">
        <WaveDivider fill="#1c1a17" />
      </div>
    </section>
  );
}

function AboutSection() {
  return (
    <section id="about" className="bg-[#1c1a17] overflow-hidden">
      <div className="mx-auto max-w-[1600px] px-8 py-16 lg:h-screen lg:px-12 lg:py-0">
        <div className="grid h-full items-center gap-10 lg:grid-cols-[2fr_3fr] lg:gap-0">
          {/* Left Column — Text */}
          <div className="flex flex-col justify-center">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="text-sm font-bold uppercase tracking-[2px] text-[#A78873]"
            >
              Web Dev
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
              className="mt-4 font-[family-name:var(--font-bebas)] text-[clamp(5rem,15vw,13rem)] font-bold uppercase leading-[0.85] text-[#F5F2EE]"
            >
              About
              <br />
              Me
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
              className="mt-8 max-w-[600px]"
            >
              <p className="text-base leading-[1.6] text-[rgba(245,242,238,0.75)] lg:text-lg">
                Virtual Assistant, Admissions Assistant, and Freelance Web Developer with 2+
                years of professional experience supporting administrative operations,
                admissions services, and digital transformation projects. As a Freelance Web
                Developer since 2024, has successfully completed numerous client projects,
                delivering modern, responsive websites and professional portfolios with a
                strong emphasis on performance, usability, and visual appeal.
              </p>
              <p className="mt-5 text-base leading-[1.6] text-[rgba(245,242,238,0.75)] lg:text-lg">
                Proficient in admissions support, document and records management, data
                entry, email and calendar management, client communication, website
                development, mobile portfolio creation, and IT support. Combines technical
                expertise with exceptional organizational and problem-solving skills to
                consistently deliver efficient workflows, successful project outcomes, and
                high client satisfaction.
              </p>
            </motion.div>
          </div>

          {/* Right Column — Portrait */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
            className="relative flex h-full items-end justify-center lg:justify-end"
          >
            <img
              src="/images/about.png"
              alt="Rozel O. Ramos — About"
              className="h-[80vh] w-auto object-contain object-bottom lg:h-[110vh]"
              loading="lazy"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function ProjectsSection() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedProject, setSelectedProject] = useState<(typeof projects)[number] | null>(null);
  const [lightboxImg, setLightboxImg] = useState<string | null>(null);
  const [reveal, setReveal] = useState(false);

  useEffect(() => {
    const el = document.getElementById("tubes-container");
    if (el) {
      el.style.display = selectedProject ? "none" : "";
    }
  }, [selectedProject]);

  const handleSeeMore = useCallback(() => {
    sessionStorage.setItem("returnFromProjects", "true");
    const params = activeCategory !== "All" ? `?category=${encodeURIComponent(activeCategory)}` : "";
    window.location.href = `/projects.html${params}`;
  }, [activeCategory]);

  const filtered =
    activeCategory === "All"
      ? projects
      : projects.filter((p) => p.category === activeCategory);
  const displayed = filtered.slice(0, 6);

  return (
    <section id="projects" className="bg-[#1c1a17] py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="max-w-2xl">
          <SectionLabel>Featured projects</SectionLabel>
          <TextReveal
            as="h2"
            text="Selected Work"
            className="mt-5 text-4xl font-semibold tracking-[-0.045em] text-[#F5F2EE] md:text-6xl"
            color="#F5F2EE"
            hoverColor="#A78873"
          />
        </div>

        <div
          className="mt-12 flex gap-3 overflow-x-auto pb-2 scrollbar-hide"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`cursor-target whitespace-nowrap px-5 py-2 text-sm font-light tracking-[0.05em] transition duration-300 ${
                activeCategory === cat
                  ? "text-[#F5F2EE]"
                  : "text-[rgba(245,242,238,0.3)] hover:text-[rgba(245,242,238,0.6)]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {displayed.map((project, i) => (
              <motion.div
                key={project.title}
                layout
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 16 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                onClick={() => setSelectedProject(project)}
                className="cursor-target group cursor-pointer space-y-4"
              >
                <div className="overflow-hidden bg-[rgba(245,242,238,0.02)]">
                  {project.video ? (
                    <video
                      src={project.video}
                      autoPlay
                      loop
                      muted
                      playsInline
                      preload="auto"
                      draggable={false}
                      onContextMenu={(e) => e.preventDefault()}
                      className="aspect-[4/3] w-full object-cover transition duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <img
                      src={project.image}
                      alt={project.title}
                      draggable={false}
                      onContextMenu={(e) => e.preventDefault()}
                      className="aspect-[4/3] w-full object-cover transition duration-700 group-hover:scale-105"
                    />
                  )}
                </div>
                <div className="space-y-1.5">
                  <span className="text-[11px] font-light uppercase tracking-[0.25em] text-[rgba(167,136,115,0.6)]">
                    {project.category}
                  </span>
                  <h3 className="text-base font-medium text-[#F5F2EE]">{project.title}</h3>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filtered.length > 6 && (
          <motion.div
            className="mt-16 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <a
              href="/projects.html"
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => { e.preventDefault(); handleSeeMore(); }}
              className="cursor-target group relative inline-flex items-center gap-3 overflow-hidden border border-[#A78873]/40 px-8 py-4 text-sm font-medium tracking-[0.06em] text-[#F5F2EE] transition-all duration-500 hover:border-[#A78873] hover:text-[#A78873]"
            >
              <span className="absolute inset-0 translate-y-full bg-[#A78873]/10 transition-transform duration-500 group-hover:translate-y-0" />
              <span className="relative z-10">See More Projects</span>
              <ArrowUpRight className="relative z-10 h-4 w-4 transition-all duration-500 group-hover:translate-x-1 group-hover:-translate-y-0.5" />
            </a>
          </motion.div>
        )}
      </div>

      <AnimatePresence>
        {selectedProject && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="cursor-target fixed inset-0 z-50 bg-black/80"
              onClick={() => setSelectedProject(null)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="fixed inset-x-4 top-8 z-50 mx-auto max-w-4xl bg-[#171614] max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div
                className="relative bg-[#0f0e0c] group"
                onMouseEnter={(e) => (e.currentTarget.querySelector('video')!.controls = true)}
                onMouseLeave={(e) => (e.currentTarget.querySelector('video')!.controls = false)}
              >
                {selectedProject.video ? (
                  <video
                    src={selectedProject.video}
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="auto"
                    controlsList="nodownload"
                    onContextMenu={(e) => e.preventDefault()}
                    draggable={false}
                    className="w-full max-h-[80vh] object-contain bg-black"
                  />
                ) : (
                  <img
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    draggable={false}
                    onContextMenu={(e) => e.preventDefault()}
                    className="w-full aspect-[16/9] object-cover"
                  />
                )}
                <button
                  onClick={() => setSelectedProject(null)}
                  className="cursor-target absolute right-4 top-4 flex h-8 w-8 items-center justify-center bg-black/70 text-[rgba(245,242,238,0.6)] transition hover:bg-[#A78873] hover:text-[#171614]"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="px-8 py-8 md:px-12 md:py-10">
                <div className="flex flex-wrap items-start justify-between gap-6">
                  <div className="flex-1 min-w-0">
                    <span className="text-xs font-medium uppercase tracking-[0.2em] text-[#A78873]">
                      {selectedProject.category}
                    </span>
                    <h3 className="mt-2 text-2xl font-semibold text-[#F5F2EE] md:text-3xl">
                      {selectedProject.title}
                    </h3>
                  </div>
                  <a
                    href={selectedProject.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cursor-target shrink-0 inline-flex items-center gap-2 border border-[#A78873] px-5 py-3 text-xs font-medium uppercase tracking-[0.15em] text-[#F5F2EE] transition hover:bg-[#A78873] hover:text-[#171614]"
                  >
                    Launch <ArrowUpRight className="h-3 w-3" />
                  </a>
                </div>

                <div className="mt-8 grid gap-8 md:grid-cols-[1fr_1.5fr]">
                  <div className="space-y-6">
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.2em] text-[rgba(245,242,238,0.25)]">
                        Stack
                      </p>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {selectedProject.tags.map((tag) => (
                          <span
                            key={tag}
                            className="inline-block border border-[rgba(167,136,115,0.25)] bg-[rgba(167,136,115,0.08)] px-3 py-1 text-xs font-medium text-[rgba(245,242,238,0.75)]"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.2em] text-[rgba(245,242,238,0.25)]">
                      Overview
                    </p>
                    <p className="mt-2 text-sm leading-7 text-[rgba(245,242,238,0.65)]">
                      {selectedProject.description}
                    </p>
                  </div>
                </div>

                {selectedProject.gallery && selectedProject.gallery.length > 0 && (
                  <div className="mt-10 border-t border-[rgba(245,242,238,0.08)] pt-8">
                    <p className="text-xs font-medium uppercase tracking-[0.2em] text-[rgba(245,242,238,0.3)] mb-5">
                      Gallery ({selectedProject.gallery.length})
                    </p>
                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
                      {selectedProject.gallery.map((img, idx) => (
                        <img
                          key={idx}
                          src={img}
                          alt={`${selectedProject.title} ${idx + 1}`}
                          onClick={() => setLightboxImg(img)}
                          draggable={false}
                          onContextMenu={(e) => e.preventDefault()}
                          className="w-full aspect-[4/3] object-cover bg-[rgba(245,242,238,0.03)] transition duration-300 hover:opacity-90 cursor-pointer"
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {lightboxImg && selectedProject?.gallery && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4 md:p-10"
            onClick={() => setLightboxImg(null)}
          >
            <motion.img
              key={lightboxImg}
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              src={lightboxImg}
              alt="Gallery image"
              draggable={false}
              onContextMenu={(e) => e.preventDefault()}
              className="max-w-full max-h-full object-contain"
              onClick={(e) => e.stopPropagation()}
            />

            <button
              onClick={(e) => {
                e.stopPropagation();
                const g = selectedProject.gallery!;
                const i = g.indexOf(lightboxImg);
                setLightboxImg(g[(i - 1 + g.length) % g.length]);
              }}
              className="cursor-target absolute left-4 top-1/2 -translate-y-1/2 flex h-14 w-14 items-center justify-center bg-black/80 text-white/90 transition hover:bg-[#A78873] hover:text-[#171614] border border-white/20"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                const g = selectedProject.gallery!;
                const i = g.indexOf(lightboxImg);
                setLightboxImg(g[(i + 1) % g.length]);
              }}
              className="cursor-target absolute right-4 top-1/2 -translate-y-1/2 flex h-14 w-14 items-center justify-center bg-black/80 text-white/90 transition hover:bg-[#A78873] hover:text-[#171614] border border-white/20"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
            </button>

            <button
              onClick={() => setLightboxImg(null)}
              className="cursor-target absolute right-4 top-4 flex h-12 w-12 items-center justify-center bg-black/80 text-white/90 transition hover:bg-[#A78873] hover:text-[#171614] border border-white/20"
            >
              <X className="h-5 w-5" />
            </button>

            <span className="absolute bottom-6 left-1/2 -translate-x-1/2 text-sm font-medium tracking-[0.15em] bg-black/60 px-4 py-1.5 text-white/90">
              {selectedProject.gallery.indexOf(lightboxImg) + 1} / {selectedProject.gallery.length}
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {reveal && <OvalReveal href="/projects.html" />}
      </AnimatePresence>
    </section>
  );
}

function WaveDivider({
  fill,
  baseFill = "#171614",
}: {
  fill: string;
  baseFill?: string;
}) {
  return (
    <div className="relative w-full overflow-hidden leading-[0] -mb-[1px]">
      <svg
        className="block w-full h-[60px] sm:h-[80px] md:h-[100px]"
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {baseFill !== "transparent" && (
          <rect width="1440" height="120" fill={baseFill} />
        )}
        <motion.path
          animate={{
            d: [
              "M0 50C120 100 240 0 360 50S600 100 720 50 960 0 1080 50 1320 100 1440 50V120H0Z",
              "M0 40C120 90 240 10 360 40S600 90 720 40 960 10 1080 40 1320 90 1440 40V120H0Z",
              "M0 60C120 110 240 0 360 60S600 110 720 60 960 0 1080 60 1320 110 1440 60V120H0Z",
              "M0 50C120 100 240 0 360 50S600 100 720 50 960 0 1080 50 1320 100 1440 50V120H0Z",
            ],
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          fill={fill}
        />
      </svg>
    </div>
  );
}

function ExperienceSection() {
  return (
    <section id="experience" className="relative overflow-hidden w-full py-28">
      <div id="tubes-container" className="absolute inset-0 z-0 pointer-events-none">
        <TubesCursor />
      </div>

      <div className="mx-auto grid max-w-7xl gap-14 px-5 lg:grid-cols-[0.7fr_1.3fr] lg:px-8">
        <div className="relative z-10">
          <SectionLabel>Experience</SectionLabel>
          <TextReveal
            as="h2"
            text="Systems Thinking in Practice"
            className="mt-5 text-4xl font-semibold tracking-[-0.045em] text-[#F5F2EE] md:text-6xl"
            color="#F5F2EE"
            hoverColor="#A78873"
          />
        </div>

        <div className="relative z-10 border-l border-[#745D4B] pl-8">
          {experience.map((exp) => (
            <div key={exp.role} className="relative pb-12 last:pb-0">
              <span className="absolute -left-[41px] top-1 h-4 w-4 border border-[#A78873] bg-[#171614]" />
              <p className="text-sm text-[#A78873]">{exp.dates}</p>
              <h3 className="mt-3 text-2xl font-semibold text-[#F5F2EE]">{exp.role}</h3>
              <p className="mt-4 max-w-2xl leading-8 text-[rgba(245,242,238,0.68)]">
                {exp.focus}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Toast({ message, type, onClose }: { message: string; type: "success" | "error"; onClose: () => void }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 5000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0, y: -20, x: "-50%" }}
      animate={{ opacity: 1, y: 0, x: "-50%" }}
      exit={{ opacity: 0, y: -20, x: "-50%" }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="fixed top-6 left-1/2 z-[9999] flex items-center gap-3 px-6 py-4 shadow-2xl shadow-black/40 backdrop-blur-sm"
      style={{
        background: type === "success" ? "rgba(34, 197, 94, 0.15)" : "rgba(239, 68, 68, 0.15)",
        border: `1px solid ${type === "success" ? "rgba(34, 197, 94, 0.3)" : "rgba(239, 68, 68, 0.3)"}`,
        borderRadius: "2px",
      }}
    >
      {type === "success" ? (
        <CheckCircle className="h-5 w-5 text-green-400 shrink-0" />
      ) : (
        <AlertCircle className="h-5 w-5 text-red-400 shrink-0" />
      )}
      <span className="text-sm text-[#F5F2EE]">{message}</span>
      <button onClick={onClose} className="ml-2 text-[rgba(245,242,238,0.4)] hover:text-[#F5F2EE] transition shrink-0">
        <X className="h-4 w-4" />
      </button>
    </motion.div>
  );
}

function ContactSection() {
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [projectType, setProjectType] = useState("");
  const [budget, setBudget] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setToast(null);

    try {
      await fetch("https://script.google.com/macros/s/AKfycbw3K0Jgfa5O4AWRb9xHbdBuGBwiIfLP-SZa27uRrG2Qf7Uubcid3TnotvOjsbffx-LvsQ/exec", {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, company, projectType, budget, message }),
      });
      setToast({ message: "Message sent! Check your email for a confirmation.", type: "success" });
      setName("");
      setCompany("");
      setEmail("");
      setProjectType("");
      setBudget("");
      setMessage("");
    } catch {
      setToast({ message: "Failed to send. Please try again or email me directly.", type: "error" });
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact" className="relative overflow-hidden py-20 -mt-[2px]">
      <AnimatePresence>
        {toast && (
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={() => setToast(null)}
          />
        )}
      </AnimatePresence>
      <div className="absolute inset-0">
        <FloatingPaths position={1} />
        <FloatingPaths position={-1} />
      </div>
      <div
        className="absolute inset-0 bg-[#171614]/60 z-10"
        style={{ top: "-1px", bottom: "-1px" }}
      />

      <div className="relative z-20 mx-auto grid max-w-7xl gap-16 px-5 lg:grid-cols-[0.85fr_1.15fr] lg:px-8">
        <div>
          <SectionLabel>Next step</SectionLabel>
          <TextReveal
            as="h2"
            text="Ready to Build a More Efficient Business?"
            className="mt-5 text-4xl font-semibold tracking-[-0.045em] text-[#F5F2EE] md:text-6xl"
            color="#F5F2EE"
            hoverColor="#A78873"
          />
          <p className="mt-7 text-lg leading-8 text-[rgba(245,242,238,0.72)]">
            Let's discuss how digital systems, automation, and process optimization can help
            your business operate more effectively.
          </p>

          <div className="border-t border-[rgba(245,242,238,0.08)] pt-10">
            <p className="text-sm uppercase tracking-[0.28em] text-[rgba(245,242,238,0.4)] mb-6">
              Get in touch
            </p>
            <div className="space-y-5">
              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=rozelramos17@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 text-[rgba(245,242,238,0.72)] transition hover:text-[#A78873]"
              >
                <div className="flex h-12 w-12 items-center justify-center border border-[rgba(245,242,238,0.1)] bg-[rgba(245,242,238,0.03)] transition group-hover:border-[#A78873]/30 group-hover:bg-[#A78873]/5">
                  <Mail className="h-5 w-5 text-[#A78873]" />
                </div>
                <div>
                  <p className="text-xs text-[rgba(245,242,238,0.4)]">Email</p>
                  <p className="text-sm">rozelramos17@gmail.com</p>
                </div>
              </a>

              <a
                href="tel:+639166219195"
                className="group flex items-center gap-4 text-[rgba(245,242,238,0.72)] transition hover:text-[#A78873]"
              >
                <div className="flex h-12 w-12 items-center justify-center border border-[rgba(245,242,238,0.1)] bg-[rgba(245,242,238,0.03)] transition group-hover:border-[#A78873]/30 group-hover:bg-[#A78873]/5">
                  <Phone className="h-5 w-5 text-[#A78873]" />
                </div>
                <div>
                  <p className="text-xs text-[rgba(245,242,238,0.4)]">Phone</p>
                  <p className="text-sm">+63 916 621 9195</p>
                </div>
              </a>

              <a
                href="https://www.google.com/maps/search/Lopez,+Quezon,+Philippines"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 text-[rgba(245,242,238,0.72)] transition hover:text-[#A78873]"
              >
                <div className="flex h-12 w-12 items-center justify-center border border-[rgba(245,242,238,0.1)] bg-[rgba(245,242,238,0.03)] transition group-hover:border-[#A78873]/30 group-hover:bg-[#A78873]/5">
                  <MapPin className="h-5 w-5 text-[#A78873]" />
                </div>
                <div>
                  <p className="text-xs text-[rgba(245,242,238,0.4)]">Location</p>
                  <p className="text-sm">Lopez, Quezon, Philippines</p>
                </div>
              </a>

              <a
                href="viber://chat?number=%2B639166219195"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 text-[rgba(245,242,238,0.72)] transition hover:text-[#A78873]"
              >
                <div className="flex h-12 w-12 items-center justify-center border border-[rgba(245,242,238,0.1)] bg-[rgba(245,242,238,0.03)] transition group-hover:border-[#A78873]/30 group-hover:bg-[#A78873]/5">
                  <svg
                    className="h-5 w-5 text-[#A78873]"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M11.39 0C5.066 0 5.8 4.663 5.8 4.663l.008 4.056s-.27-.546-1.256-.546c-1.11 0-1.138.986-1.138.986S2 21.674 5.526 24c1.612 1.037 3.672-.35 3.672-.35l2.04-2.994s-1.416 1.764-3.76 1.094c-2.872-.83-5.37-4.11-5.494-4.266-.258-.33-2.1-3.01-2.1-5.942 0-3.674 2.122-6.874 5.54-6.874 2.37 0 3.548 1.018 3.548 1.018S9.36 5.2 11.4 5.2c2.038 0 2.85.88 2.85.88s.83-1.02 2.784-1.02c.888 0 1.72.194 2.352.64.17.118.33.254.476.404C20.694 6.654 21.4 8.438 21.4 8.438s.466-1.366 1.678-1.366c.808 0 1.446.436 1.446.436S24 10.626 24 13.24c0 5.19-2.924 10.76-10.838 10.76-4.812 0-8.74-2.044-8.74-2.044S2.24 23.996.834 23.996c-1.65 0-1.316-2.096-1.316-2.096S-.58 13.664 2.684 8.382C4.538 5.378 7.7 2.7 11.39 2.7V0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-[rgba(245,242,238,0.4)]">Viber</p>
                  <p className="text-sm">+63 916 621 9195</p>
                </div>
              </a>

              <a
                href="https://wa.me/639166219195"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 text-[rgba(245,242,238,0.72)] transition hover:text-[#A78873]"
              >
                <div className="flex h-12 w-12 items-center justify-center border border-[rgba(245,242,238,0.1)] bg-[rgba(245,242,238,0.03)] transition group-hover:border-[#A78873]/30 group-hover:bg-[#A78873]/5">
                  <svg
                    className="h-5 w-5 text-[#A78873]"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-[rgba(245,242,238,0.4)]">WhatsApp</p>
                  <p className="text-sm">+63 916 621 9195</p>
                </div>
              </a>
            </div>
          </div>

          <div className="mt-10 flex gap-4">
            <a
              href="https://www.linkedin.com/in/urboyrozzz05/"
              target="_blank"
              rel="noopener noreferrer"
              className="cursor-target flex h-11 w-11 items-center justify-center border border-[rgba(245,242,238,0.1)] bg-[rgba(245,242,238,0.03)] text-[rgba(245,242,238,0.6)] transition hover:border-[#A78873]/50 hover:bg-[#A78873]/10 hover:text-[#A78873]"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
            <a
              href="https://www.facebook.com/urboyrozzz"
              target="_blank"
              rel="noopener noreferrer"
              className="cursor-target flex h-11 w-11 items-center justify-center border border-[rgba(245,242,238,0.1)] bg-[rgba(245,242,238,0.03)] text-[rgba(245,242,238,0.6)] transition hover:border-[#A78873]/50 hover:bg-[#A78873]/10 hover:text-[#A78873]"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </a>
            <a
              href="https://github.com/Rozzz15"
              target="_blank"
              rel="noopener noreferrer"
              className="cursor-target flex h-11 w-11 items-center justify-center border border-[rgba(245,242,238,0.1)] bg-[rgba(245,242,238,0.03)] text-[rgba(245,242,238,0.6)] transition hover:border-[#A78873]/50 hover:bg-[#A78873]/10 hover:text-[#A78873]"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            </a>
          </div>

          <div className="mt-10 flex flex-col gap-4">
            <a
              href="https://calendly.com/rozelramos17/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="cursor-target group inline-flex items-center justify-center gap-3 border border-[#A78873] bg-[#A78873] px-6 py-4 text-sm font-medium text-[#171614] transition duration-300 hover:bg-[#F5F2EE] hover:border-[#F5F2EE]"
            >
              Schedule a Discovery Call
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
            <a
              href="#"
              className="cursor-target group inline-flex items-center justify-center gap-3 border border-[rgba(245,242,238,0.18)] px-6 py-4 text-sm font-medium text-[#F5F2EE] transition duration-300 hover:border-[#A78873] hover:bg-[rgba(167,136,115,0.08)]"
            >
              Start a Project
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </div>
        </div>

        <div className="relative">
          <BorderGlow
            backgroundColor="#1c1a17"
            borderRadius={4}
            glowColor="40 80 80"
            colors={["#A78873", "#c084fc", "#f472b6"]}
            edgeSensitivity={30}
            glowRadius={30}
            glowIntensity={0.6}
            coneSpread={25}
          >
            <form
              className="relative p-8 md:p-10"
              onSubmit={handleSubmit}
            >
              <div className="mb-8">
                <p className="text-sm uppercase tracking-[0.28em] text-[#A78873]">
                  Send a message
                </p>
                <h3 className="mt-3 text-2xl font-semibold text-[#F5F2EE]">
                  Let's start a project
                </h3>
                <p className="mt-2 text-sm text-[rgba(245,242,238,0.5)]">
                  Fill out the form below and I'll get back to you within 24 hours.
                </p>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <Input
                  label="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                />
                <Input
                  label="Email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                />
                <Input
                  label="Company"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder="Your company"
                />
                <Input
                  label="Project Type"
                  value={projectType}
                  onChange={(e) => setProjectType(e.target.value)}
                  placeholder="e.g., Website, Automation"
                />
                <div className="md:col-span-2">
                  <Input
                    label="Budget Range"
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    placeholder="e.g., $1,000 - $5,000"
                  />
                </div>
                <div className="md:col-span-2">
                  <Textarea
                    label="Message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell me about your project..."
                    rows={5}
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={sending}
                className="cursor-target mt-8 inline-flex w-full items-center justify-center gap-3 bg-[#A78873] px-6 py-4 text-sm font-semibold text-[#171614] transition duration-300 hover:bg-[#F5F2EE] hover:shadow-lg hover:shadow-[#A78873]/20 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {sending ? "Sending..." : "Send Inquiry"} <Send className="h-4 w-4" />
              </button>

              <p className="mt-4 text-center text-xs text-[rgba(245,242,238,0.35)]">
                I respect your privacy. No spam, ever.
              </p>
            </form>
          </BorderGlow>
        </div>
      </div>
    </section>
  );
}

function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          onClick={scrollToTop}
          aria-label="Back to top"
          className="cursor-target fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center border border-[#A78873] bg-[#171614] text-[#A78873] shadow-lg shadow-black/30 transition duration-300 hover:bg-[#A78873] hover:text-[#171614] md:bottom-8 md:right-8"
        >
          <ArrowUp className="h-5 w-5" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

const welcomeMessages = [
  "Tuloy po kayo!",
  "Please come in",
  "どうぞお入りください",
  "Pasukan",
  "Pase, por favor",
];

function SplashScreen() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((i) => (i + 1) % welcomeMessages.length);
    }, 600);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed inset-0 z-[100] grid place-items-center bg-[#171614]"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(116,93,75,0.15),transparent_60%)]" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative text-center px-6"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-8"
        >
          <p className="text-xs uppercase tracking-[0.5em] text-[rgba(245,242,238,0.4)] mb-4">
            Welcome to my portfolio
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <h1 className="text-3xl font-semibold tracking-[-0.04em] text-[#F5F2EE] md:text-5xl">
            Rozel O. Ramos
          </h1>
          <p className="mt-3 text-sm uppercase tracking-[0.35em] text-[#A78873]">
            Digital Systems Architect
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-10 h-8 overflow-hidden"
        >
          <AnimatePresence mode="wait">
            <motion.p
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="text-lg text-[rgba(245,242,238,0.6)] md:text-xl"
            >
              {welcomeMessages[index]}
            </motion.p>
          </AnimatePresence>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="mt-10 flex justify-center"
        >
          <div className="h-px w-32 overflow-hidden bg-[rgba(245,242,238,0.12)]">
            <motion.div
              className="h-full bg-gradient-to-r from-transparent via-[#A78873] to-transparent"
              initial={{ x: "-100%" }}
              animate={{ x: "100%" }}
              transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

function OvalReveal({ href }: { href: string }) {
  useEffect(() => {
    window.location.href = href;
  }, [href]);

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex items-end justify-center pointer-events-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <motion.div
        className="w-[300vw] aspect-[3/1] bg-[#A78873] rounded-[50%]"
        initial={{ scaleY: 0, y: "100%" }}
        animate={{ scaleY: 1, y: "85%" }}
        exit={{ scaleY: 0, y: "100%" }}
        transition={{ duration: 0.5, ease: [0.6, 0, 0.2, 1] }}
        style={{ transformOrigin: "bottom center" }}
      />
    </motion.div>
  );
}

export default function App() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const returning = sessionStorage.getItem("returnFromProjects");
    if (returning) {
      sessionStorage.removeItem("returnFromProjects");
      setShowSplash(false);
      return;
    }
    const timer = window.setTimeout(() => setShowSplash(false), 600);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-[#171614] text-[#F5F2EE] selection:bg-[#A78873] selection:text-[#171614]">
      <AnimatePresence>
        {showSplash && <SplashScreen />}
      </AnimatePresence>

      <KineticNavigation />
      <TargetCursor
        targetSelector=".cursor-target"
        cursorColor="#A78873"
        hideDefaultCursor={false}
      />

      <main>
        <HeroSection />
        <AboutSection />
        <ProjectsSection />
        <WaveDivider fill="#000000" baseFill="#1c1a17" />
        <ExperienceSection />
        <WaveDivider fill="#1c1a17" baseFill="#000000" />
        <Testimonial />
        <ContactSection />
      </main>

      <ChatbotModal />
      <BackToTop />

      <Footer
        brandName="Rozel O. Ramos"
        brandDescription="Digital Systems Architect helping businesses streamline operations, automate workflows, and build scalable digital infrastructure."
        socialLinks={[
          {
            icon: (
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            ),
            href: "https://www.linkedin.com/in/urboyrozzz05/",
            label: "LinkedIn",
          },
          {
            icon: (
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            ),
            href: "https://www.facebook.com/urboyrozzz",
            label: "Facebook",
          },
          {
            icon: (
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            ),
            href: "https://github.com/Rozzz15",
            label: "GitHub",
          },
          {
            icon: <Mail className="w-6 h-6" />,
            href: "https://mail.google.com/mail/?view=cm&fs=1&to=rozelramos17@gmail.com",
            label: "Email",
          },
        ]}
        navLinks={[
          { label: "Projects", href: "#projects" },
          { label: "Contact", href: "#contact" },
        ]}
        brandIcon={
          <img
            src="/images/splash.png"
            alt="Rozel O. Ramos"
            className="w-full h-full object-cover rounded-2xl"
          />
        }
      />
    </div>
  );
}
