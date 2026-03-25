import Head from "next/head";
import { useEffect, useRef, useState } from "react";

// ─── DATA ────────────────────────────────────────────────────────────────────

const skills = [
  { category: "Languages", items: ["Golang", "PHP", "JavaScript", "Java", "Python"] },
  { category: "Frameworks", items: ["Laravel", "CodeIgniter", "Echo", "Next.js", "Django", "Spring Boot"] },
  { category: "Messaging & RPC", items: ["Apache Kafka", "gRPC", "REST API"] },
  { category: "Databases", items: ["MySQL", "PostgreSQL", "Redis"] },
  { category: "Cloud & Infra", items: ["GCP", "AWS", "Docker", "CI/CD"] },
  { category: "Tools", items: ["Git", "Agile/Scrum", "Code Review"] },
];

const experiences = [
  {
    role: "Junior IT – Project Officer (Squad Lead)",
    company: "PT Bank Rakyat Indonesia (BRI)",
    period: "Jun 2025 – Present",
    location: "South Jakarta, Indonesia",
    type: "Contract · On-site",
    points: [
      "Running a cross-functional squad — devs, QA, stakeholders. Basically the bridge between what's needed and what gets built.",
      "Pushed the call to migrate from REST to gRPC. Inter-service communication got cleaner and faster.",
      "Led the revamp of iLearn — BRI's internal exam platform — so it could handle thousands of concurrent users without going down.",
      "Worked on team dynamics too, so people could ship without waiting on me for every little thing.",
    ],
  },
  {
    role: "Full Stack Developer",
    company: "PT Bank Rakyat Indonesia (BRI)",
    period: "Jul 2023 – Jun 2025",
    location: "Jakarta, Indonesia",
    type: "Contract · Hybrid · 2 yrs",
    points: [
      "Worked on an internal Learning Management System — a platform that covers e-learning, exams, gamification, a social feed with video/reels, forums, and search.",
      "Built and maintained multiple services across the platform in Golang and PHP. If something was slow, that was on me to fix.",
      "Optimized a bunch of queries — got retrieval times down by up to 80% on MySQL and PostgreSQL.",
      "Did regular code reviews to keep the team's code quality consistent across services.",
    ],
  },
  {
    role: "Software Engineer (Outsource)",
    company: "Astrajingga",
    period: "Jul 2023 – Jun 2024",
    location: "Jakarta, Indonesia",
    type: "Contract · Hybrid · 1 yr",
    points: [
      "Handled multiple client projects at once — from requirements to production, on time.",
      "Talked directly with clients, translated what they actually needed into something buildable.",
      "Kept testing and debugging tight so what went out was clean.",
    ],
  },
  {
    role: "Software Engineer → Tech Lead",
    company: "Solu Filantropi Teknologi",
    period: "Nov 2020 – Jul 2023",
    location: "Jakarta, Indonesia",
    type: "Contract · On-site · 2 yrs 9 mos",
    points: [
      "Started as a dev, grew into Tech Lead at the same place. Mentoring juniors became part of the daily routine.",
      "Designed the web architecture to actually scale as the product grew — not just what works today.",
      "Brought DevOps automation into the workflow. Deployments got more predictable, less stressful.",
      "Sat with clients regularly to turn business goals into something the team could actually build.",
    ],
  },
  {
    role: "Back End Developer Intern",
    company: "PT Multi Cipta Management",
    period: "Jun 2020 – Nov 2020",
    location: "Tangerang, Indonesia",
    type: "Internship · Remote · 6 mos",
    points: [
      "Helped with back-end dev, database management, and got into a proper Git workflow for the first time.",
      "Contributed to performance improvements and learned how to debug things remotely.",
    ],
  },
];

const projects = [
  {
    name: "iLearn — Exam Platform",
    desc: "BRI's internal exam platform that used to lag and crash during peak hours. Rebuilt the whole thing with Next.js, gRPC, and Kafka. Now it handles thousands of concurrent exam sessions without a hiccup.",
    tech: ["Next.js", "gRPC", "Kafka", "Golang"],
    highlight: "Zero downtime at peak load",
  },
  {
    name: "LMS Platform — Social & Gamification",
    desc: "Part of a large internal LMS ecosystem — built the gamification system, social feed with reels and video sharing, and a discussion forum. Multiple services talking to each other, all in one platform.",
    tech: ["Golang", "PHP", "MySQL", "Redis", "Kafka"],
    highlight: "All-in-one internal platform",
  },
  {
    name: "Elastic Search Integration",
    desc: "Integrated Elasticsearch into the LMS platform to power fast, relevant search across learning content, users, and forum posts. Replaced slow SQL-based search that didn't scale.",
    tech: ["Elasticsearch", "Golang", "PHP"],
    highlight: "Platform-wide search",
  },
  {
    name: "Solu Platform Architecture",
    desc: "As Tech Lead at Solu, redesigned the entire web architecture so it could actually grow with the product. Brought in CI/CD and automation to replace a lot of manual, error-prone steps.",
    tech: ["PHP", "CodeIgniter", "MySQL", "CI/CD", "Docker"],
    highlight: "Led the team end-to-end",
  },
];

// ─── HOOKS ───────────────────────────────────────────────────────────────────

function useIntersectionObserver(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

// ─── COMPONENTS ──────────────────────────────────────────────────────────────

function GlitchText({ text, className = "" }: { text: string; className?: string }) {
  return (
    <span className={`glitch-text ${className}`} data-text={text}>
      {text}
    </span>
  );
}

function SectionLabel({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3 mb-12">
      <span className="text-xs font-mono tracking-[0.3em] text-red-500 uppercase">{label}</span>
      <div className="h-px flex-1 bg-gradient-to-r from-red-500/40 to-transparent" />
    </div>
  );
}

function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = ["about", "skills", "experience", "projects", "hobbies", "contact"];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "bg-black/90 backdrop-blur-md border-b border-white/5" : ""
        }`}
    >
      <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
        <a href="#" className="font-display text-lg font-black tracking-widest text-white">
          DN<span className="text-red-500">.</span>
        </a>
        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l}
              href={`#${l}`}
              className="text-xs font-mono tracking-[0.2em] uppercase text-zinc-400 hover:text-white transition-colors duration-200"
            >
              {l}
            </a>
          ))}
        </div>
        <button
          className="md:hidden text-zinc-400 hover:text-white"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <div className="w-5 flex flex-col gap-1.5">
            <span className={`h-px bg-current transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
            <span className={`h-px bg-current transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`h-px bg-current transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
          </div>
        </button>
      </div>
      {menuOpen && (
        <div className="md:hidden bg-black/95 border-t border-white/5 px-6 py-6 flex flex-col gap-5">
          {links.map((l) => (
            <a
              key={l}
              href={`#${l}`}
              onClick={() => setMenuOpen(false)}
              className="text-sm font-mono tracking-[0.2em] uppercase text-zinc-400 hover:text-white"
            >
              {l}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}

function HeroSection() {
  return (
    <section
      id="about"
      className="relative min-h-screen flex flex-col justify-center px-6 pt-24 pb-16 overflow-hidden"
    >
      <div className="absolute inset-0 bg-grid opacity-[0.04] pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-red-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-red-900/10 rounded-full blur-[80px] pointer-events-none" />

      <div className="relative max-w-6xl mx-auto w-full">
        <div className="inline-flex items-center gap-2 mb-8 px-3 py-1.5 border border-green-500/30 bg-green-500/5 rounded-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
          <span className="text-xs font-mono text-green-400 tracking-widest uppercase">Open to Remote</span>
        </div>

        <div className="space-y-4">
          <h1 className="font-display text-6xl md:text-8xl lg:text-[9rem] font-black leading-none tracking-tight text-white">
            DEAN
            <br />
            <GlitchText text="TRISTAN" className="text-white" />
          </h1>
        </div>

        <div className="mt-8 flex flex-col md:flex-row md:items-end gap-8 md:gap-16">
          <div className="max-w-lg">
            <p className="text-zinc-300 text-lg leading-relaxed font-light">
              Backend engineer, 5+ years building internal platforms at scale.
              Currently at{" "}
              <span className="text-white font-medium">BRI</span> — writing code and leading a squad.
            </p>
            <p className="mt-3 text-zinc-500 text-sm leading-relaxed">
              Mainly Golang and PHP. I like the problems that only show up at scale —
              Kafka, gRPC, systems that hold up when things get busy. Based in Jakarta.
            </p>
          </div>

          <div className="flex gap-4">
            <a
              href="#projects"
              className="px-6 py-3 bg-red-600 hover:bg-red-500 text-white text-sm font-mono tracking-widest uppercase transition-colors duration-200"
            >
              View Work
            </a>
            <a
              href="#contact"
              className="px-6 py-3 border border-white/20 hover:border-white/50 text-white text-sm font-mono tracking-widest uppercase transition-colors duration-200"
            >
              Contact
            </a>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-3 gap-px bg-white/5 border border-white/5">
          {[
            { n: "5+", label: "Years Experience" },
            { n: "80%", label: "Faster Query Times" },
            { n: "BRI", label: "Current Company" },
          ].map(({ n, label }) => (
            <div key={label} className="bg-black px-6 py-5">
              <div className="font-display text-2xl font-black text-red-500">{n}</div>
              <div className="text-xs font-mono text-zinc-500 tracking-wider mt-1 uppercase">{label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
        <span className="text-[10px] font-mono tracking-[0.4em] text-zinc-500 uppercase">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-zinc-500 to-transparent animate-pulse" />
      </div>
    </section>
  );
}

function SkillsSection() {
  const { ref, visible } = useIntersectionObserver();
  return (
    <section id="skills" className="py-24 px-6 border-t border-white/5">
      <div className="max-w-6xl mx-auto">
        <SectionLabel label="02 — Tech Stack" />
        <div
          ref={ref}
          className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
        >
          {skills.map(({ category, items }, i) => (
            <div
              key={category}
              className="bg-black p-6 group hover:bg-zinc-900/50 transition-colors duration-300"
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              <h3 className="text-[10px] font-mono tracking-[0.3em] text-red-500 uppercase mb-4">
                {category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {items.map((item) => (
                  <span
                    key={item}
                    className="text-xs px-2.5 py-1 border border-white/10 text-zinc-300 font-mono group-hover:border-white/20 transition-colors duration-300"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ExperienceSection() {
  const { ref, visible } = useIntersectionObserver();
  const [active, setActive] = useState(0);

  return (
    <section id="experience" className="py-24 px-6 border-t border-white/5">
      <div className="max-w-6xl mx-auto">
        <SectionLabel label="03 — Experience" />
        <div
          ref={ref}
          className={`flex flex-col md:flex-row gap-0 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
        >
          <div className="md:w-56 flex md:flex-col border-b md:border-b-0 md:border-r border-white/10 overflow-x-auto md:overflow-visible">
            {experiences.map((exp, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`text-left px-4 py-4 text-xs font-mono whitespace-nowrap md:whitespace-normal border-b border-white/5 transition-all duration-200 ${active === i
                  ? "text-white bg-white/5 border-l-2 border-l-red-500"
                  : "text-zinc-500 hover:text-zinc-300 hover:bg-white/[0.02]"
                  }`}
              >
                <div className="font-bold text-[11px] tracking-wide">
                  {exp.company.split(" ").slice(0, 3).join(" ")}
                </div>
                <div className="text-[10px] text-zinc-600 mt-0.5 tracking-wider">
                  {exp.period.split(" – ")[0]}
                </div>
              </button>
            ))}
          </div>

          <div className="flex-1 md:pl-8 pt-6 md:pt-0">
            {(() => {
              const exp = experiences[active];
              return (
                <div key={active} className="animate-fadeIn">
                  <h3 className="font-display text-xl font-black text-white mb-1">{exp.role}</h3>
                  <div className="flex flex-wrap gap-x-4 gap-y-1 mb-6">
                    <span className="text-red-400 text-sm font-mono">{exp.company}</span>
                    <span className="text-zinc-600 text-xs font-mono self-center">·</span>
                    <span className="text-zinc-500 text-xs font-mono">{exp.period}</span>
                    <span className="text-zinc-600 text-xs font-mono self-center">·</span>
                    <span className="text-zinc-500 text-xs font-mono">{exp.type}</span>
                  </div>
                  <ul className="space-y-3">
                    {exp.points.map((p, j) => (
                      <li key={j} className="flex gap-3 text-sm text-zinc-400 leading-relaxed">
                        <span className="text-red-500 mt-1.5 text-[8px]">▶</span>
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })()}
          </div>
        </div>
      </div>
    </section>
  );
}

function ProjectsSection() {
  const { ref, visible } = useIntersectionObserver();
  return (
    <section id="projects" className="py-24 px-6 border-t border-white/5">
      <div className="max-w-6xl mx-auto">
        <SectionLabel label="04 — Selected Work" />
        <div
          ref={ref}
          className={`grid grid-cols-1 md:grid-cols-2 gap-px bg-white/5 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
        >
          {projects.map((p, i) => (
            <div
              key={p.name}
              className="bg-black p-7 group hover:bg-zinc-900/40 transition-colors duration-300 flex flex-col"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <div className="flex items-start justify-between mb-4">
                <span className="text-[10px] font-mono tracking-[0.3em] text-zinc-600 uppercase">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 border border-green-500/20 text-green-400 bg-green-500/5">
                  {p.highlight}
                </span>
              </div>
              <h3 className="font-display text-xl font-black text-white mb-3 group-hover:text-red-400 transition-colors duration-200">
                {p.name}
              </h3>
              <p className="text-sm text-zinc-400 leading-relaxed flex-1 mb-5">{p.desc}</p>
              <div className="flex flex-wrap gap-2">
                {p.tech.map((t) => (
                  <span
                    key={t}
                    className="text-[10px] font-mono px-2 py-0.5 border border-white/10 text-zinc-500"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HobbiesSection() {
  const { ref, visible } = useIntersectionObserver();

  const hobbies = [
    {
      id: "guitar",
      title: "Guitar",
      tag: "Metal & Heavy",
      desc: "Been playing guitar for years — mostly heavy stuff. Rhythm is where I live, locking in with the drums and making things hit hard.",
      photo: "/images/hobby-guitar.jpg",
    },
    {
      id: "gaming",
      title: "Gaming",
      tag: "Current Obsession",
      desc: "A good game scratches the same itch as a good engineering problem — systems, patterns, figuring things out.",
      photo: "/images/hobby-gaming.jpg",
    },
    {
      id: "hiking",
      title: "Hiking",
      tag: "Trails & Mountains",
      desc: "Used to hit trails and dark mountain paths whenever I needed to reset. There's something about being out there with no signal that actually clears the head.",
      photo: "/images/hobby-hiking.jpg",
    },
  ];

  return (
    <section id="hobbies" className="py-24 px-6 border-t border-white/5">
      <div className="max-w-6xl mx-auto">
        <SectionLabel label="05 — Beyond the Code" />
        <div
          ref={ref}
          className={`grid grid-cols-1 md:grid-cols-3 gap-px bg-white/5 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
        >
          {hobbies.map((h, i) => (
            <div
              key={h.id}
              className="bg-black group flex flex-col overflow-hidden"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              {/* Photo slot */}
              <div className="relative w-full aspect-[4/3] bg-zinc-900 overflow-hidden">
                <img
                  src={h.photo}
                  alt={h.title}
                  className="w-full h-full object-cover opacity-70 group-hover:opacity-90 group-hover:scale-105 transition-all duration-500"
                  onError={(e) => {
                    const target = e.currentTarget;
                    target.style.display = "none";
                    const parent = target.parentElement;
                    if (parent) {
                      parent.innerHTML = `<div class="w-full h-full flex items-center justify-center"><span class="text-xs font-mono text-zinc-600 tracking-widest uppercase">Add photo: ${h.photo}</span></div>`;
                    }
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <span className="absolute top-3 right-3 text-[10px] font-mono px-2 py-0.5 border border-white/10 bg-black/60 text-zinc-400 tracking-widest uppercase">
                  {h.tag}
                </span>
              </div>
              {/* Content */}
              <div className="py-6 md:p-6 flex-1 flex flex-col">
                <h3 className="font-display text-2xl font-black text-white mb-3 group-hover:text-red-400 transition-colors duration-200">
                  {h.title}
                </h3>
                <p className="text-sm text-zinc-400 leading-relaxed">{h.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  return (
    <section id="contact" className="py-24 px-6 border-t border-white/5">
      <div className="max-w-6xl mx-auto">
        <SectionLabel label="06 — Get In Touch" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
          <div>
            <h2 className="font-display text-4xl md:text-5xl font-black text-white leading-tight mb-6">
              Got something
              <br />
              <span className="text-red-500">interesting?</span>
              <br />
              Let&apos;s talk.
            </h2>
            <p className="text-zinc-400 text-sm leading-relaxed max-w-sm">
              Open to remote work, freelance, or anything technically challenging.
              No need to be formal — just reach out.
            </p>
          </div>

          <div className="space-y-px bg-white/5">
            {[
              { label: "Email", value: "tristandean7@gmail.com", href: "mailto:tristandean7@gmail.com" },
              { label: "LinkedIn", value: "linkedin.com/in/deantristan", href: "https://linkedin.com/in/deantristan" },
              { label: "GitHub", value: "github.com/deantristan", href: "https://github.com/deantristan" },
            ].map(({ label, value, href }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                className="flex items-center justify-between bg-black px-6 py-5 group hover:bg-zinc-900/50 transition-colors duration-200"
              >
                <span className="text-[8px] md:text-[10px] font-mono text-zinc-600 tracking-[0.2em] uppercase w-20">
                  {label}
                </span>
                <span className="text-[10px] md:text-sm font-mono text-zinc-300 group-hover:text-white transition-colors duration-200 flex-1 text-right">
                  {value}
                </span>
                <span className="ml-4 text-zinc-700 group-hover:text-red-500 transition-colors duration-200 text-sm">
                  →
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/5 px-6 py-8">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <span className="font-display text-sm font-black tracking-widest text-zinc-600">
          DN<span className="text-red-600">.</span>
        </span>
        <span className="text-xs font-mono text-zinc-700 tracking-wider">
          © {new Date().getFullYear()} Dean Tristan · Jakarta, Indonesia
        </span>
        <div className="flex gap-6">
          {[
            { label: "GH", href: "https://github.com/deantristan" },
            { label: "LI", href: "https://linkedin.com/in/deantristan" },
          ].map(({ label, href }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              className="text-xs font-mono text-zinc-600 hover:text-white transition-colors"
            >
              {label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────

export default function Home() {
  return (
    <>
      <Head>
        <title>Dean Tristan Portofolio</title>
        <meta
          name="description"
          content="Backend engineer — Golang, PHP, distributed systems. 5+ years building internal platforms at scale."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=JetBrains+Mono:wght@300;400;700&display=swap"
          rel="stylesheet"
        />
      </Head>

      <style jsx global>{`
        :root {
          --red: #dc2626;
          --red-dim: #991b1b;
        }

        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body {
          background: #000;
          color: #fff;
          font-family: "JetBrains Mono", monospace;
          -webkit-font-smoothing: antialiased;
        }

        .font-display { font-family: "Bebas Neue", sans-serif; }

        .glitch-text { position: relative; display: inline-block; }
        .glitch-text::before,
        .glitch-text::after {
          content: attr(data-text);
          position: absolute;
          top: 0; left: 0;
          width: 100%;
          overflow: hidden;
        }
        .glitch-text::before {
          color: #dc2626;
          animation: glitch1 3.5s infinite;
          clip-path: polygon(0 0, 100% 0, 100% 40%, 0 40%);
        }
        .glitch-text::after {
          color: #3b82f6;
          animation: glitch2 3.5s infinite;
          clip-path: polygon(0 60%, 100% 60%, 100% 100%, 0 100%);
        }
        @keyframes glitch1 {
          0%, 90%, 100% { transform: none; opacity: 0; }
          91% { transform: translateX(-3px); opacity: 0.7; }
          93% { transform: translateX(3px); opacity: 0.7; }
          95% { transform: none; opacity: 0; }
        }
        @keyframes glitch2 {
          0%, 92%, 100% { transform: none; opacity: 0; }
          93% { transform: translateX(3px); opacity: 0.5; }
          95% { transform: translateX(-3px); opacity: 0.5; }
          97% { transform: none; opacity: 0; }
        }

        .bg-grid {
          background-image:
            linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px);
          background-size: 60px 60px;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn { animation: fadeIn 0.35s ease forwards; }

        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #000; }
        ::-webkit-scrollbar-thumb { background: #27272a; border-radius: 2px; }
        ::-webkit-scrollbar-thumb:hover { background: #dc2626; }

        ::selection { background: #dc2626; color: #fff; }
      `}</style>

      <div className="bg-black min-h-screen">
        <NavBar />
        <HeroSection />
        <SkillsSection />
        <ExperienceSection />
        <ProjectsSection />
        <HobbiesSection />
        <ContactSection />
        <Footer />
      </div>
    </>
  );
}
