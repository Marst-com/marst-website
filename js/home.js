
(() => {
  "use strict";

  const $ = (selector) => document.querySelector(selector);
  const $$ = (selector) => [...document.querySelectorAll(selector)];

  const showcase = $("#showcase");
  const workspace = $("#workspace");
  const heading = $("#sceneHeading");
  const progress = $("#showcaseProgress");
  const step = $("#showcaseStep");
  const counter = $("#sceneCounter");
  const eyebrow = $("#showcaseEyebrow");
  const text = $("#showcaseText");
  const glow = $("#sceneGlow");
  const cards = $$(".result-card");

  $("#year").textContent = new Date().getFullYear();

  const scenes = [
    {
      eyebrow: "AN IDEA IS THE START",
      text: "Every creation begins somewhere.<br>Sometimes, all it takes is one thought."
    },
    {
      eyebrow: "EXPLORE THE POSSIBILITIES",
      text: "A single thought can go in a thousand directions.<br>Find the one worth following."
    },
    {
      eyebrow: "TURN THOUGHT INTO FORM",
      text: "Design it. Develop it. Experiment with it.<br>Give your idea a shape."
    },
    {
      eyebrow: "MORE THAN JUST ONE THING",
      text: "Websites, tools, systems, media, and more.<br>One idea can become many creations."
    },
    {
      eyebrow: "IDEAS INTO REALITY",
      text: "This is where imagination becomes something real.<br>And where the next idea begins."
    }
  ];

  let ticking = false;

  const clamp = (v, min = 0, max = 1) => Math.max(min, Math.min(max, v));
  const lerp = (a, b, t) => a + (b - a) * t;
  const smooth = (t) => t * t * (3 - 2 * t);

  function range(p, a, b) {
    return smooth(clamp((p - a) / (b - a)));
  }

  function setCard(card, x, y, rotation, scale, opacity) {
    if (!card) return;

    card.style.transform =
      `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) ` +
      `rotate(${rotation}deg) scale(${scale})`;

    card.style.opacity = opacity;
  }

  function update() {
    if (!showcase) return;

    const rect = showcase.getBoundingClientRect();
    const total = showcase.offsetHeight - window.innerHeight;

    const p = clamp(-rect.top / total);
    const mobile = window.innerWidth <= 700;

    // 1. Heading
    const headingFade = 1 - range(p, 0.08, 0.25);

    if (heading) {
      heading.style.opacity = headingFade;
      heading.style.transform = `translateY(${-p * 35}px)`;
    }

    // 2. Workspace
    const workspaceShrink = range(p, 0.25, 0.65);

    const scale = lerp(1, mobile ? 0.66 : 0.53, workspaceShrink);
    const moveY = lerp(0, mobile ? -10 : -20, workspaceShrink);
    const moveX = lerp(0, mobile ? 0 : -20, workspaceShrink);

    if (workspace) {
      workspace.style.transform =
        `translate(calc(-50% + ${moveX}px), calc(-50% + ${moveY}px)) scale(${scale})`;

      workspace.style.opacity = lerp(1, 0.76, workspaceShrink);
    }

    // 3. Cards appear and spread
    const cardProgress = range(p, 0.28, 0.78);
    const spread = smooth(cardProgress);
    const fade = clamp(cardProgress * 1.35);

    const distance = mobile ? 112 : 315;
    const vertical = mobile ? 115 : 155;

    const positions = [
      [0, -vertical * 1.5, -4, mobile ? 0.78 : 0.9],
      [-distance, -vertical * 0.3, -9, mobile ? 0.76 : 0.88],
      [distance, -vertical * 0.3, 8, mobile ? 0.76 : 0.88],
      [-distance * 0.65, vertical * 1.05, 7, mobile ? 0.74 : 0.86],
      [distance * 0.65, vertical * 1.05, -7, mobile ? 0.74 : 0.86]
    ];

    cards.forEach((card, i) => {
      const [finalX, finalY, finalRotation, finalScale] = positions[i];

      const startX = i % 2 === 0 ? 15 : -15;
      const startY = i % 2 === 0 ? 10 : -10;

      const x = lerp(startX, finalX, spread);
      const y = lerp(startY, finalY, spread);
      const rotation = lerp(0, finalRotation, spread);
      const cardScale = lerp(0.4, finalScale, spread);
      const opacity = clamp(fade * 1.1);

      setCard(card, x, y, rotation, cardScale, opacity);
    });

    // 4. Caption progression
    let sceneIndex = 0;

    if (p >= 0.76) sceneIndex = 4;
    else if (p >= 0.56) sceneIndex = 3;
    else if (p >= 0.36) sceneIndex = 2;
    else if (p >= 0.17) sceneIndex = 1;

    const currentScene = scenes[sceneIndex];

    if (eyebrow) eyebrow.textContent = currentScene.eyebrow;
    if (text) text.innerHTML = currentScene.text;
    if (step) step.textContent = String(sceneIndex + 1).padStart(2, "0");
    if (counter) counter.textContent = `0${sceneIndex + 1} — 05`;

    if (progress) {
      progress.style.width = `${p * 100}%`;
    }

    // 5. Ambient glow
    if (glow) {
      glow.style.opacity = 0.35 + cardProgress * 0.65;
      glow.style.transform =
        `translate(-50%, -50%) scale(${1 + cardProgress * 0.5})`;
    }
  }

  function onScroll() {
    if (ticking) return;
    ticking = true;

    requestAnimationFrame(() => {
      update();
      ticking = false;
    });
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
  update();

  // Mobile navigation
  const menuButton = $("#menuButton");
  const nav = $("#nav");

  if (menuButton && nav) {
    menuButton.addEventListener("click", () => {
      nav.classList.toggle("open");
    });

    nav.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => nav.classList.remove("open"));
    });
  }

  // Temporary login gate (not real authentication)
  const loggedIn = sessionStorage.getItem("marst_logged_in") === "true";

  $$("[data-auth]").forEach(link => {
    link.addEventListener("click", (event) => {
      if (!loggedIn) {
        event.preventDefault();
        window.location.href = "login.html";
      }
    });
  });

  const loginLink = $("#loginLink");
  if (loginLink && loggedIn) {
    loginLink.innerHTML = "My account <span>↗</span>";
  }

})();
