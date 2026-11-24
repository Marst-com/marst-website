import { SITE } from "./config.js";

import {
  renderHeader as createHeader
} from "./components/header.js";

import {
  renderFooter as createFooter
} from "./components/footer.js";

import { initReveal } from "./components/reveal.js";
import { initScrollScene } from "./components/scroll-scene.js";

import {
  renderHome as createHome
} from "./pages/home.js";

import { initTheme } from "./core/theme.js";
import { initLanguage } from "./core/language.js";


/* =========================================================
   MARST CORE
========================================================= */

const Marst = {
  version: "1.0.1",

  initialized: false,

  init() {
    if (this.initialized) return;

    this.initialized = true;

    this.prepareDocument();
    this.render();
    this.initializeFeatures();
    this.bindEvents();
    this.finishLoading();

    console.log(
      `%c${SITE.name || "MARST"}`,
      "color:#dfff72;font-size:20px;font-weight:900;"
    );

    console.log(`MARST website initialized · v${this.version}`);
  },


  /* =========================================================
     DOCUMENT
  ========================================================= */

  prepareDocument() {
    document.documentElement.classList.add("js-enabled");
    document.body.classList.add("marst-app");

    document.documentElement.dataset.theme =
      localStorage.getItem("marst_theme") || "dark";

    document.documentElement.lang =
      localStorage.getItem("marst_language") || "en";

    document.title =
      `${SITE.name || "MARST"} — Ideas into Reality`;
  },


  /* =========================================================
     RENDER
  ========================================================= */

  render() {
    this.renderHeader();
    this.renderHome();
    this.renderFooter();
  },


  renderHeader() {
    const header = document.querySelector("#header");

    if (!header) {
      console.warn("[MARST] Header container not found.");
      return;
    }

    createHeader();
  },


  renderHome() {
    const home = document.querySelector("#home-page");

    if (!home) {
      console.warn("[MARST] Home container not found.");
      return;
    }

    createHome();
  },


  renderFooter() {
    const footer = document.querySelector("#footer");

    if (!footer) {
      console.warn("[MARST] Footer container not found.");
      return;
    }

    createFooter();
  },


  /* =========================================================
     FEATURES
  ========================================================= */

  initializeFeatures() {
    initTheme();
    initLanguage();

    initReveal();
    initScrollScene();

    this.initializeAuth();
    this.initializePageTracking();
  },


  /* =========================================================
     AUTH GATE
  ========================================================= */

  initializeAuth() {
    document.querySelectorAll("[data-auth]").forEach(link => {
      link.addEventListener("click", event => {
        const loggedIn =
          localStorage.getItem("marst_logged_in") === "true";

        if (loggedIn) return;

        event.preventDefault();

        const destination = link.getAttribute("href");

        if (destination) {
          sessionStorage.setItem(
            "marst_redirect_after_login",
            destination
          );
        }

        window.location.href = "login.html";
      });
    });
  },


  /* =========================================================
     PAGE TRACKING
  ========================================================= */

  initializePageTracking() {
    const currentPage =
      window.location.pathname.split("/").pop() || "index.html";

    document.body.dataset.page =
      currentPage.replace(".html", "");

    document.querySelectorAll(
      ".nav-link, .mobile-nav-link"
    ).forEach(link => {
      const href = link.getAttribute("href");

      if (!href) return;

      const normalizedHref = href.split("/").pop();

      if (normalizedHref === currentPage) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });
  },


  /* =========================================================
     EVENTS
  ========================================================= */

  bindEvents() {
    this.bindSmoothScroll();
    this.bindExternalLinks();
  },


  bindSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener("click", event => {
        const targetId = anchor.getAttribute("href");

        if (!targetId || targetId === "#") return;

        const target = document.querySelector(targetId);

        if (!target) return;

        event.preventDefault();

        target.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      });
    });
  },


  bindExternalLinks() {
    document.querySelectorAll('a[target="_blank"]').forEach(link => {
      const relTokens = new Set(
        link.rel.split(/\s+/).filter(Boolean)
      );

      relTokens.add("noopener");
      relTokens.add("noreferrer");

      link.rel = [...relTokens].join(" ");
    });
  },


  /* =========================================================
     LOADER
  ========================================================= */

  finishLoading() {
    const loader = document.querySelector("#app-loader");

    if (!loader) return;

    const hide = () => {
      loader.classList.add("hidden");

      setTimeout(() => {
        loader.remove();
      }, 700);
    };

    if (document.readyState === "complete") {
      setTimeout(hide, 250);
    } else {
      window.addEventListener(
        "load",
        () => setTimeout(hide, 250),
        { once: true }
      );
    }
  }
};


/* =========================================================
   BOOT
========================================================= */

function boot() {
  try {
    Marst.init();
  } catch (error) {
    console.error("[MARST] Initialization failed:", error);

    const loader = document.querySelector("#app-loader");

    if (loader) {
      loader.classList.add("hidden");
    }
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", boot, {
    once: true
  });
} else {
  boot();
}


/* =========================================================
   GLOBAL ACCESS
========================================================= */

window.MARST = Marst;
