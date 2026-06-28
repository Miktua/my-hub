"use client";

import type { MouseEvent } from "react";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { Github, Instagram, Linkedin, Mail, Send } from "lucide-react";

const sidebarItems = [
  { id: "me", label: "me" },
  { id: "featured", label: "featured" },
  { id: "contact", label: "contact" },
] as const;

const featuredProjects = [
  {
    name: "crumbroad",
    description: "Create, use, and sell AI workflows for any purpose.",
    stack: ["Next.js", "Supabase"],
    url: "https://crumbroad.com/",
    image: "/projects/crumbroad.png",
    accent:
      "bg-[linear-gradient(135deg,#2f333b_0%,#1b1e24_45%,#121419_100%)]",
  },
  {
    name: "dash",
    description: "A landing page for a creative dev agency.",
    stack: ["Next.js", "Framer Motion"],
    url: "https://desh.group/",
    image: "/projects/dash.png",
    accent:
      "bg-[linear-gradient(135deg,#363238_0%,#221f26_45%,#121419_100%)]",
  },
  {
    name: "Predictrum",
    description: "A Web3 PvP prediction game.",
    stack: ["React", "Node.js", "WebSockets"],
    url: "https://desh.group/cases/predictrum",
    image: "/projects/predictrum.webp",
    accent:
      "bg-[linear-gradient(135deg,#343742_0%,#1d1f2c_45%,#121419_100%)]",
  },
] as const;

const contacts = [
  { label: "email", href: "mailto:" },
  { label: "github", href: "https://github.com/" },
  { label: "linkedin", href: "https://www.linkedin.com/" },
  { label: "instagram", href: "https://www.instagram.com/" },
  { label: "telegram", href: "https://t.me/" },
] as const;

const socialLinks: Array<{ label: string; href: string; icon: LucideIcon }> = [
  { label: "email", href: "mailto:", icon: Mail },
  { label: "github", href: "https://github.com/", icon: Github },
  { label: "linkedin", href: "https://www.linkedin.com/", icon: Linkedin },
  { label: "instagram", href: "https://www.instagram.com/", icon: Instagram },
  { label: "telegram", href: "https://t.me/", icon: Send },
];

export default function Home() {
  const [activeSlide, setActiveSlide] = useState(0);
  const projectRailRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<Array<HTMLElement | null>>([]);
  const desktopNavRef = useRef<HTMLDivElement>(null);
  const desktopNavItemRefs = useRef<Array<HTMLAnchorElement | null>>([]);
  const mobileNavRef = useRef<HTMLDivElement>(null);
  const mobileNavItemRefs = useRef<Array<HTMLAnchorElement | null>>([]);
  const [desktopIndicatorTop, setDesktopIndicatorTop] = useState(0);
  const [mobileIndicatorLeft, setMobileIndicatorLeft] = useState(0);
  const [showLeftProjectShade, setShowLeftProjectShade] = useState(false);
  const [showRightProjectShade, setShowRightProjectShade] = useState(false);

  useEffect(() => {
    const updateActiveSlide = () => {
      const viewportCenter = window.innerHeight / 2;

      let nextActiveSlide = 0;
      let closestDistance = Number.POSITIVE_INFINITY;

      sectionRefs.current.forEach((section, index) => {
        if (!section) {
          return;
        }

        const rect = section.getBoundingClientRect();
        const sectionCenter = rect.top + rect.height / 2;
        const distance = Math.abs(sectionCenter - viewportCenter);

        if (distance < closestDistance) {
          closestDistance = distance;
          nextActiveSlide = index;
        }
      });

      setActiveSlide(nextActiveSlide);
    };

    updateActiveSlide();

    window.addEventListener("scroll", updateActiveSlide, { passive: true });
    window.addEventListener("resize", updateActiveSlide);

    return () => {
      window.removeEventListener("scroll", updateActiveSlide);
      window.removeEventListener("resize", updateActiveSlide);
    };
  }, []);

  useEffect(() => {
    const updateIndicators = () => {
      const desktopNav = desktopNavRef.current;
      const desktopItem = desktopNavItemRefs.current[activeSlide];

      if (desktopNav && desktopItem) {
        setDesktopIndicatorTop(
          desktopItem.offsetTop + desktopItem.offsetHeight / 2 - 5
        );
      }

      const mobileNav = mobileNavRef.current;
      const mobileItem = mobileNavItemRefs.current[activeSlide];

      if (mobileNav && mobileItem) {
        setMobileIndicatorLeft(
          mobileItem.offsetLeft + mobileItem.offsetWidth / 2 - 5
        );
      }
    };

    updateIndicators();
    window.addEventListener("resize", updateIndicators);

    return () => {
      window.removeEventListener("resize", updateIndicators);
    };
  }, [activeSlide]);

  useEffect(() => {
    const rail = projectRailRef.current;

    if (!rail) {
      return;
    }

    const updateProjectShades = () => {
      const maxScrollLeft = Math.max(rail.scrollWidth - rail.clientWidth, 0);

      setShowLeftProjectShade(rail.scrollLeft > 2);
      setShowRightProjectShade(rail.scrollLeft < maxScrollLeft - 2);
    };

    updateProjectShades();

    rail.addEventListener("scroll", updateProjectShades, { passive: true });
    window.addEventListener("resize", updateProjectShades);

    return () => {
      rail.removeEventListener("scroll", updateProjectShades);
      window.removeEventListener("resize", updateProjectShades);
    };
  }, []);

  const handleProjectsWheel = (event: React.WheelEvent<HTMLDivElement>) => {
    const rail = event.currentTarget;
    const delta =
      Math.abs(event.deltaX) > Math.abs(event.deltaY)
        ? event.deltaX
        : event.deltaY;

    if (delta === 0) {
      return;
    }

    const atStart = rail.scrollLeft <= 0;
    const atEnd = rail.scrollLeft + rail.clientWidth >= rail.scrollWidth - 1;

    if ((delta < 0 && !atStart) || (delta > 0 && !atEnd)) {
      event.preventDefault();
      rail.scrollLeft += delta;
    }
  };

  const handleSidebarLinkClick = (event: MouseEvent<HTMLAnchorElement>) => {
    event.stopPropagation();
  };

  return (
    <main className="relative bg-[#0f1013] text-white">
      <div className="relative">
        <motion.section
          id="me"
          ref={(element) => {
            sectionRefs.current[0] = element;
          }}
          animate={{ opacity: activeSlide === 0 ? 1 : 0.35 }}
          transition={{ duration: 0.28, ease: "easeOut" }}
          className="flex min-h-screen items-center px-6 pb-40 pt-14 sm:px-10 sm:pb-44 lg:px-16 lg:py-14"
        >
          <div className="max-w-4xl">
            <p className="text-sm uppercase tracking-[0.35em] text-white/45">
              FULL STACK DEVELOPER
            </p>
            <h1 className="mt-6 text-5xl font-medium tracking-[-0.05em] sm:text-7xl lg:text-[5.5rem]">
              Hi, I&apos;m Dmytro.
            </h1>
            <div className="mt-8 max-w-2xl space-y-3 text-base leading-6 text-white/72 sm:text-lg sm:leading-7">
              <p>I build web and mobile products for startups.</p>
              <p>
                I&apos;ve been working remotely for six years now, and I&apos;m
                based in Kraków.
              </p>
              <p>
                I enjoy collaborating with entrepreneurs and small teams, and
                I&apos;m happy to work with you whether you have just an idea, a
                prototype, or an existing product that you&apos;re looking to
                develop further.
              </p>
              <p>
                I&apos;m used to handling projects on my own, but when it comes
                to bigger ones, I often collaborate with{" "}
                <a
                  href="https://desh.group/"
                  target="_blank"
                  rel="noreferrer"
                  className="text-white underline decoration-white/35 underline-offset-4 transition hover:decoration-white"
                >
                  desh.group
                </a>
                . This teamwork helps me tackle more complex tasks and deliver
                better results.
              </p>
            </div>
          </div>
        </motion.section>

        <motion.section
          id="featured"
          ref={(element) => {
            sectionRefs.current[1] = element;
          }}
          animate={{ opacity: activeSlide === 1 ? 1 : 0.35 }}
          transition={{ duration: 0.28, ease: "easeOut" }}
          className="flex min-h-screen items-center justify-start pb-40 pt-14 sm:pb-44 lg:py-14"
        >
          <div className="relative w-full">
            {showLeftProjectShade && (
              <div className="pointer-events-none absolute inset-y-0 left-0 z-20 w-14 bg-gradient-to-r from-[#0f1013] via-[#0f1013]/88 to-transparent sm:w-24" />
            )}
            {showRightProjectShade && (
              <div className="pointer-events-none absolute inset-y-0 right-0 z-20 w-14 bg-gradient-to-l from-[#0f1013] via-[#0f1013]/88 to-transparent sm:w-24" />
            )}

            <div
              ref={projectRailRef}
              onWheel={handleProjectsWheel}
              className="flex gap-5 overflow-x-auto overflow-y-hidden pl-14 pr-24 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:pl-24 sm:pr-32 lg:pr-40"
            >
              {featuredProjects.map((project, index) => (
                <a
                  key={project.name}
                  href={project.url}
                  target="_blank"
                  rel="noreferrer"
                  className={`relative aspect-[16/10] min-w-[88%] overflow-hidden rounded-[1.5rem] border border-white/10 shadow-[0_30px_120px_rgba(0,0,0,0.28)] sm:min-w-[80%] lg:min-w-[68%] ${project.accent}`}
                >
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:48px_48px]" />
                  <div
                    className="absolute inset-x-0 top-0 h-[58%] bg-cover bg-center bg-no-repeat"
                    style={{
                      backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.08), rgba(0,0,0,0.24)), url("${project.image}")`,
                    }}
                  />
                  <div className="absolute inset-x-0 top-[58%] bottom-0 bg-[linear-gradient(180deg,rgba(15,16,19,0)_0%,rgba(15,16,19,0.32)_14%,rgba(10,11,14,0.96)_100%)]" />
                  <div className="absolute right-6 top-6">
                    <span className="text-sm text-white/45">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <div className="absolute inset-x-6 bottom-6">
                    <p className="text-3xl font-medium tracking-[-0.04em] text-white">
                      {project.name}
                    </p>
                    <p className="mt-3 max-w-lg text-sm leading-5 text-white/65 sm:text-base sm:leading-6">
                      {project.description}
                    </p>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {project.stack.map((item) => (
                        <span
                          key={item}
                          className="rounded-full border border-white/10 bg-white/7 px-3 py-1 text-xs uppercase tracking-[0.22em] text-white/72"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </motion.section>

        <motion.section
          id="contact"
          ref={(element) => {
            sectionRefs.current[2] = element;
          }}
          animate={{ opacity: activeSlide === 2 ? 1 : 0.35 }}
          transition={{ duration: 0.28, ease: "easeOut" }}
          className="flex min-h-screen items-center px-6 pb-40 pt-14 sm:px-10 sm:pb-44 lg:px-16 lg:py-14"
        >
          <div className="max-w-2xl">
            <p className="text-sm uppercase tracking-[0.35em] text-white/45">
              dm me:
            </p>
            <div className="mt-8 space-y-5">
              {contacts.map((contact) => (
                <a
                  key={contact.label}
                  href={contact.href}
                  target="_blank"
                  rel="noreferrer"
                  className="block text-3xl font-medium tracking-[-0.04em] text-white transition hover:text-white/70 sm:text-5xl"
                >
                  {contact.label}
                </a>
              ))}
            </div>
          </div>
        </motion.section>

        <aside className="pointer-events-none fixed inset-y-0 right-0 z-20 hidden h-screen flex-col items-end justify-center px-8 md:flex lg:px-12">
          <nav
            ref={desktopNavRef}
            className="relative flex flex-col items-end gap-4 pr-6 text-right"
          >
            <span
              className="absolute right-0 h-2.5 w-2.5 bg-white transition-transform duration-300 ease-out"
              style={{ transform: `translateY(${desktopIndicatorTop}px)` }}
              aria-hidden="true"
            />
            {sidebarItems.map((item, index) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={handleSidebarLinkClick}
                ref={(element) => {
                  desktopNavItemRefs.current[index] = element;
                }}
                className={`pointer-events-auto text-sm uppercase tracking-[0.28em] transition hover:text-white ${
                  activeSlide === index ? "text-white" : "text-white/55"
                }`}
              >
                <span>{item.label}</span>
              </a>
            ))}
          </nav>

          <div className="mt-10 flex items-center justify-end gap-3">
            {socialLinks.map((link) => {
              const Icon = link.icon;

              return (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={link.label}
                  onClick={handleSidebarLinkClick}
                  className="pointer-events-auto p-1 text-white/70 transition hover:text-white"
                >
                  <Icon size={16} strokeWidth={1.8} />
                </a>
              );
            })}
          </div>
        </aside>

        <aside className="fixed inset-x-0 bottom-0 z-30 border-t border-white/10 bg-[#0f1013]/96 px-4 pt-3 pb-[calc(0.85rem+env(safe-area-inset-bottom))] backdrop-blur md:hidden">
          <nav
            ref={mobileNavRef}
            className="relative flex items-start justify-between pt-4"
          >
            <span
              className="absolute top-0 h-2.5 w-2.5 bg-white transition-transform duration-300 ease-out"
              style={{ transform: `translateX(${mobileIndicatorLeft}px)` }}
              aria-hidden="true"
            />
            {sidebarItems.map((item, index) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={handleSidebarLinkClick}
                ref={(element) => {
                  mobileNavItemRefs.current[index] = element;
                }}
                className={`text-xs uppercase tracking-[0.24em] transition ${
                  activeSlide === index ? "text-white" : "text-white/55"
                }`}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="mt-3 flex items-center justify-between">
            {socialLinks.map((link) => {
              const Icon = link.icon;

              return (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={link.label}
                  onClick={handleSidebarLinkClick}
                  className="p-1 text-white/70 transition hover:text-white"
                >
                  <Icon size={16} strokeWidth={1.8} />
                </a>
              );
            })}
          </div>
        </aside>
      </div>
    </main>
  );
}
