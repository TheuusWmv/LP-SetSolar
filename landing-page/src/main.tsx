import "./index.css";

// The critical hero uses native controls. React is loaded only for nearby islands.
const hero = document.querySelector<HTMLElement>(".solar-hero");
const content = hero?.querySelector<HTMLElement>("[data-hero-content]");
const toggle = hero?.querySelector<HTMLButtonElement>(
  '[aria-controls="hero-mobile-menu"]',
);
const menu = document.getElementById("hero-mobile-menu");
function setMenu(open: boolean) {
  if (!menu || !toggle) return;
  menu.hidden = !open;
  toggle.setAttribute("aria-expanded", String(open));
  toggle.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
}
toggle?.addEventListener("click", () => setMenu(menu?.hidden ?? true));
menu?.addEventListener("click", (event) => {
  if ((event.target as Element).closest("a")) setMenu(false);
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && menu && !menu.hidden) {
    setMenu(false);
    toggle?.focus();
  }
});
const mobile = window.matchMedia("(max-width:767px)");
const reduce = window.matchMedia("(prefers-reduced-motion:reduce)");
let request = 0;
let previousProgress = 0;
function updateHero() {
  request = 0;
  if (!hero || !content) return;
  const minHeight = mobile.matches ? content.getBoundingClientRect().height + 176 : 0;
  const height = minHeight > window.innerHeight ? minHeight + 'px' : '';
  if (hero.style.getPropertyValue('--hero-height') !== height) {
    if (height) hero.style.setProperty('--hero-height', height);
    else hero.style.removeProperty('--hero-height');
  }
  const travel = Math.max(1, hero.offsetHeight - window.innerHeight);
  const progress = reduce.matches
    ? 0
    : Math.max(0, Math.min(1, -hero.getBoundingClientRect().top / travel));
  // The HTML already contains the initial frame. Avoid repainting it on startup.
  if (Math.abs(progress - previousProgress) < 0.001) return;
  previousProgress = progress;
  hero.style.setProperty(
    "--frame-padding",
    Math.min(1, progress / 0.6) * 16 + "px",
  );
  hero.style.setProperty(
    "--frame-radius",
    Math.min(1, progress / 0.6) * (mobile.matches ? 20 : 32) + "px",
  );
  hero.style.setProperty(
    "--frame-opacity",
    String(Math.max(0, Math.min(1, (progress - 0.08) / 0.47))),
  );
  hero.style.setProperty(
    "--ear-scale",
    String(Math.max(0, Math.min(1, (progress - 0.08) / 0.47))),
  );
  hero.style.setProperty(
    "--ear-opacity",
    String(Math.max(0, Math.min(1, (progress - 0.1) / 0.35))),
  );
}
function queueHero() {
  if (!request) request = requestAnimationFrame(updateHero);
}
window.addEventListener("scroll", queueHero, { passive: true });
window.addEventListener("resize", queueHero);
if (content) new ResizeObserver(queueHero).observe(content);
document.documentElement.classList.add("js-ready");
queueHero();

const loaders = {
  Hero: () =>
    import("./components/SolarFramedHero").then((m) => m.SolarFramedHero),
  AboutUs: () => import("./components/AboutUs").then((m) => m.AboutUs),
  HowItWorks: () => import("./components/HowItWorks").then((m) => m.HowItWorks),
  Services: () => import("./components/Services").then((m) => m.Services),
  Testimonials: () =>
    import("./components/Testimonials").then((m) => m.Testimonials),
  FAQ: () => import("./components/FAQ").then((m) => m.FAQ),
  CTA: () => import("./components/CTA").then((m) => m.CTA),
  Footer: () => import("./components/Footer").then((m) => m.Footer),
};
const observer = new IntersectionObserver(
  (entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      const region = entry.target as HTMLElement;
      const name = region.dataset.island as keyof typeof loaders;
      observer.unobserve(region);
      Promise.all([
        loaders[name](),
        import("react"),
        import("react-dom/client"),
      ])
        .then(([Component, React, ReactDOM]) => {
          ReactDOM.hydrateRoot(region, React.createElement(Component));
          region.dataset.hydrated = "true";
        })
        .catch((error) =>
          console.error("Não foi possível ativar a região", name, error),
        );
    }
  },
  { rootMargin: "600px" },
);
for (const region of document.querySelectorAll<HTMLElement>("[data-island]"))
  observer.observe(region);
