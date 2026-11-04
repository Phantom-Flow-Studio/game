(function () {
  "use strict";


  const header = document.querySelector(".site-header");
  const navToggle = document.getElementById("nav-toggle");
  const siteNav = document.getElementById("site-nav");

  const yearEl = document.getElementById("year");

  function closeNav() {
    if (!header || !navToggle) return;
    header.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
    navToggle.setAttribute("aria-label", "開啟選單");
  }

  function openNav() {
    if (!header || !navToggle) return;
    header.classList.add("is-open");
    navToggle.setAttribute("aria-expanded", "true");
    navToggle.setAttribute("aria-label", "關閉選單");
  }

  function toggleNav() {
    if (!header || !navToggle) return;
    if (header.classList.contains("is-open")) {
      closeNav();
    } else {
      openNav();
    }
  }

  function initNavToggle() {
    if (!navToggle || !header) return;
    navToggle.addEventListener("click", toggleNav);

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeNav();
    });

    window.addEventListener("resize", function () {
      if (window.matchMedia("(min-width: 768px)").matches) {
        closeNav();
      }
    });
  }

  function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]:not(.skip-link)');
    links.forEach(function (anchor) {
      anchor.addEventListener("click", function (e) {
        const id = anchor.getAttribute("href");
        if (!id || id === "#") return;
        const target = document.querySelector(id);
        if (!target) return;
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
        closeNav();
        if (history.replaceState) {
          history.replaceState(null, "", id);
        }
      });
    });
  }

  function initReveal() {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      document.querySelectorAll(".reveal").forEach(function (el) {
        el.classList.add("is-visible");
      });
      return;
    }

    const elements = document.querySelectorAll(".reveal");
    if (!elements.length) return;

    const observer = new IntersectionObserver(
      function (entries, obs) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            obs.unobserve(entry.target);
          }
        });
      },
      { root: null, rootMargin: "0px 0px -8% 0px", threshold: 0.1 }
    );

    elements.forEach(function (el) {
      observer.observe(el);
    });
  }

  function initYear() {
    if (yearEl) {
      yearEl.textContent = String(new Date().getFullYear());
    }
  }

  function initTabs() {
    const tabButtons = document.querySelectorAll(".tabs__btn");
    const tabPanels = document.querySelectorAll(".tab-panel");
    if (!tabButtons.length) return;

    tabButtons.forEach(function (btn) {
      btn.addEventListener("click", function () {
        const target = btn.getAttribute("data-tab");
        tabButtons.forEach(function (b) {
          b.classList.remove("is-active");
          b.setAttribute("aria-selected", "false");
        });
        tabPanels.forEach(function (panel) {
          const isMatch = panel.getAttribute("data-panel") === target;
          panel.classList.toggle("is-active", isMatch);
          panel.hidden = !isMatch;
        });
        btn.classList.add("is-active");
        btn.setAttribute("aria-selected", "true");
      });
    });
  }

  /* ===== Random Space Decorations ===== */

  function initSpaceDecorations() {
  const space = document.createElement("div");
  space.className = "space-decoration";
  space.setAttribute("aria-hidden", "true");

  // 隨機星星
  const starCount = window.innerWidth < 768 ? 90 : 150;

  for (let i = 0; i < starCount; i++) {
    const star = document.createElement("span");
    star.className = "space-star";

    star.style.setProperty("--star-x", Math.random() * 100 + "%");
    star.style.setProperty("--star-y", Math.random() * 100 + "%");
    star.style.setProperty("--star-size", (Math.random() * 2.5 + 1) + "px");
    star.style.setProperty("--star-opacity", Math.random() * 0.6 + 0.3);
    star.style.setProperty("--star-speed", (Math.random() * 3 + 2) + "s");

    space.appendChild(star);
  }

  // 隨機星球
  const planetCount = window.innerWidth < 768 ? 1 : 2;

  for (let i = 0; i < planetCount; i++) {
    const planet = document.createElement("span");
    planet.className = "space-planet";

    planet.style.setProperty("--planet-x", Math.random() * 85 + "%");
    planet.style.setProperty("--planet-y", Math.random() * 90 + "%");
    planet.style.setProperty(
      "--planet-size",
      (Math.random() * 40 + 15) + "px"
    );

    space.appendChild(planet);
  }

  document.body.prepend(space);
  }

  document.addEventListener("DOMContentLoaded", function () {     
    initSpaceDecorations();
    initNavToggle();
    initSmoothScroll();
    initReveal();
    initYear();
    initTabs();
  });
})();