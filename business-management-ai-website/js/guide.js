(function () {
  const LANG_KEY = "guide-lang";
  const html = document.documentElement;
  const langButtons = document.querySelectorAll(".lang-btn");
  const siteHeader = document.getElementById("siteHeader");
  const navToggle = document.getElementById("navToggle");
  const mainNav = document.getElementById("mainNav");
  const yearEl = document.getElementById("year");

  if (yearEl) yearEl.textContent = new Date().getFullYear();

  function applyLanguage(lang) {
    const dict = guideTranslations[lang];
    if (!dict) return;

    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      if (dict[key] !== undefined) el.textContent = dict[key];
    });

    html.lang = lang;
    html.dir = lang === "ar" ? "rtl" : "ltr";

    langButtons.forEach((btn) => {
      btn.classList.toggle("active", btn.getAttribute("data-lang") === lang);
    });

    localStorage.setItem(LANG_KEY, lang);
  }

  function initialLanguage() {
    const stored = localStorage.getItem(LANG_KEY);
    if (stored === "ar" || stored === "en" || stored === "it") return stored;
    const browserLang = (navigator.language || "en").toLowerCase();
    if (browserLang.startsWith("ar")) return "ar";
    if (browserLang.startsWith("it")) return "it";
    return "en";
  }

  applyLanguage(initialLanguage());

  langButtons.forEach((btn) => {
    btn.addEventListener("click", () => applyLanguage(btn.getAttribute("data-lang")));
  });

  if (siteHeader) {
    const onScroll = () => siteHeader.classList.toggle("scrolled", window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
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

  const tocLinks = document.querySelectorAll(".guide-toc a");
  const sections = document.querySelectorAll(".guide-section[id]");

  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const id = entry.target.getAttribute("id");
        tocLinks.forEach((link) => {
          link.classList.toggle("active", link.getAttribute("href") === `#${id}`);
        });
      });
    },
    { rootMargin: "-20% 0px -70% 0px" }
  );

  sections.forEach((section) => sectionObserver.observe(section));

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
    { threshold: 0.1 }
  );

  revealTargets.forEach((el) => {
    el.classList.add("reveal");
    revealObserver.observe(el);
  });
})();
