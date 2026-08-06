(function () {
  const LANG_KEY = "site-lang";
  const html = document.documentElement;
  const langToggle = document.getElementById("langToggle");
  const navToggle = document.getElementById("navToggle");
  const mainNav = document.getElementById("mainNav");
  const yearEl = document.getElementById("year");

  if (yearEl) yearEl.textContent = new Date().getFullYear();

  function applyLanguage(lang) {
    const dict = translations[lang];
    if (!dict) return;

    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      if (dict[key] !== undefined) el.textContent = dict[key];
    });

    html.lang = lang;
    html.dir = lang === "ar" ? "rtl" : "ltr";
    if (langToggle) langToggle.textContent = lang === "ar" ? "EN" : "AR";
    localStorage.setItem(LANG_KEY, lang);
  }

  function initialLanguage() {
    const stored = localStorage.getItem(LANG_KEY);
    if (stored === "ar" || stored === "en") return stored;
    return navigator.language && navigator.language.toLowerCase().startsWith("ar") ? "ar" : "en";
  }

  applyLanguage(initialLanguage());

  if (langToggle) {
    langToggle.addEventListener("click", () => {
      const current = html.lang === "ar" ? "ar" : "en";
      applyLanguage(current === "ar" ? "en" : "ar");
    });
  }

  if (navToggle && mainNav) {
    navToggle.addEventListener("click", () => {
      const isOpen = mainNav.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
    });

    mainNav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        mainNav.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  const sections = document.querySelectorAll("main section[id], main#home");
  const navLinks = document.querySelectorAll(".main-nav a");

  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const id = entry.target.getAttribute("id");
        navLinks.forEach((link) => {
          link.classList.toggle("active", link.getAttribute("href") === `#${id}`);
        });
      });
    },
    { rootMargin: "-45% 0px -50% 0px" }
  );

  sections.forEach((section) => sectionObserver.observe(section));

  const siteHeader = document.getElementById("siteHeader");
  if (siteHeader) {
    const onScroll = () => siteHeader.classList.toggle("scrolled", window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  // Elements only get the hidden "reveal" treatment once JS is confirmed running,
  // so a JS error/block never leaves content permanently invisible.
  const revealTargets = document.querySelectorAll("[data-reveal]");
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  revealTargets.forEach((el) => {
    el.classList.add("reveal");
    revealObserver.observe(el);
  });
})();
