
(() => {
  "use strict";

  const section = document.querySelector(".showcase-scroll");
  const sticky = document.querySelector(".showcase-sticky");
  const workspace = document.getElementById("workspace");
  const heading = document.getElementById("showcaseHeading");
  const bottom = document.getElementById("showcaseBottom");
  const progressBar = document.getElementById("showcaseProgress");

  const cards = {
    web: document.querySelector('[data-result="web"]'),
    code: document.querySelector('[data-result="code"]'),
    video: document.querySelector('[data-result="video"]'),
    app: document.querySelector('[data-result="app"]'),
    idea: document.querySelector('[data-result="idea"]')
  };

  const eyebrow = document.getElementById("showcaseEyebrow");
  const text = document.getElementById("showcaseText");
  const step = document.querySelector(".showcase-step");

  const steps = [
    {
      eyebrow: "A SINGLE SPACE",
      title: "모든 것은 하나의<br>생각에서 시작됩니다.",
      number: "01 / 04"
    },
    {
      eyebrow: "CREATIVE POSSIBILITIES",
      title: "하나의 공간에서<br>다양한 아이디어가 펼쳐집니다.",
      number: "02 / 04"
    },
    {
      eyebrow: "FROM IDEA TO CREATION",
      title: "웹, 코드, 영상.<br>생각은 다양한 모습이 됩니다.",
      number: "03 / 04"
    },
    {
      eyebrow: "MAKE SOMETHING MORE",
      title: "하나의 아이디어.<br>수많은 결과물.",
      number: "04 / 04"
    }
  ];

  let progress = 0;
  let currentStep = -1;
  let raf = false;

  const clamp = (v, min = 0, max = 1) => Math.max(min, Math.min(max, v));
  const ease = (v) => {
    v = clamp(v);
    return v * v * (3 - 2 * v);
  };
  const mix = (a, b, t) => a + (b - a) * t;

  function getProgress() {
    const rect = section.getBoundingClientRect();
    const scrollDistance = section.offsetHeight - window.innerHeight;
    progress = scrollDistance <= 0
      ? 0
      : clamp(-rect.top / scrollDistance);

    update();
  }

  function setCard(card, x, y, rotation, scale, opacity) {
    if (!card) return;
    card.style.transform =
      `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) rotate(${rotation}deg) scale(${scale})`;
    card.style.opacity = opacity;
  }

  function update() {
    const p = progress;

    // Intro headline fades away as the workspace takes over.
    const headFade = 1 - ease(p / 0.22);
    heading.style.opacity = headFade;
    heading.style.transform = `translateY(${-30 * ease(p / .22)}px)`;

    // Workspace expansion
    const expand = ease((p - .06) / .46);
    const scale = mix(.72, 1.0, expand);
    const shiftY = mix(50, -8, expand);

    workspace.style.transform =
      `translate(-50%, calc(-50% + ${shiftY}px)) scale(${scale})`;

    // Workspace moves slightly upward to leave room for caption.
    workspace.style.borderRadius = `${mix(15, 8, expand)}px`;

    // Result cards start close to the workspace, then spread outward.
    const spread = ease((p - .25) / .5);
    const fade = ease((p - .18) / .24);

    const isMobile = window.innerWidth <= 650;

    const distance = isMobile ? 145 : 285;
    const vertical = isMobile ? 105 : 150;

    // Cards fan outward from the main window.
    setCard(
      cards.web,
      -distance * spread,
      -vertical * spread,
      mix(-2, -5, spread),
      mix(.72, 1, spread),
      fade
    );

    setCard(
      cards.code,
      distance * spread,
      -vertical * .7 * spread,
      mix(2, 4, spread),
      mix(.72, 1, spread),
      fade
    );

    setCard(
      cards.video,
      -distance * .85 * spread,
      vertical * spread,
      mix(2, 3, spread),
      mix(.72, 1, spread),
      fade
    );

    setCard(
      cards.app,
      distance * .85 * spread,
      vertical * .9 * spread,
      mix(-2, -3, spread),
      mix(.72, 1, spread),
      fade
    );

    setCard(
      cards.idea,
      0,
      vertical * 1.65 * spread,
      mix(0, 2, spread),
      mix(.65, .92, spread),
      fade * ease((p - .4) / .2)
    );

    // End: main window becomes smaller, cards form a balanced composition.
    const end = ease((p - .74) / .2);

    const finalScale = mix(1, .78, end);
    workspace.style.transform =
      `translate(-50%, calc(-50% + ${mix(-8, -35, end)}px)) scale(${finalScale})`;

    // Caption visibility
    bottom.style.opacity = ease((p - .22) / .15);
    bottom.style.transform = `translateY(${mix(20, 0, ease((p - .22) / .15))}px)`;

    // Progress
    progressBar.style.width = `${p * 100}%`;

    // Caption steps
    let index = 0;
    if (p >= .28) index = 1;
    if (p >= .50) index = 2;
    if (p >= .76) index = 3;

    if (index !== currentStep) {
      currentStep = index;
      eyebrow.textContent = steps[index].eyebrow;
      text.innerHTML = steps[index].title;
      step.textContent = steps[index].number;
    }

    // Final cards settle into place
    if (end > 0) {
      const finalDistance = isMobile ? 115 : 210;
      setCard(cards.web, -finalDistance, -95, -4, .86, fade);
      setCard(cards.code, finalDistance, -95, 4, .86, fade);
      setCard(cards.video, -finalDistance, 90, 3, .86, fade);
      setCard(cards.app, finalDistance, 90, -3, .86, fade);
      setCard(cards.idea, 0, 165, 0, .8, fade);
    }
  }

  function requestUpdate() {
    if (raf) return;
    raf = true;

    requestAnimationFrame(() => {
      raf = false;
      getProgress();
    });
  }

  window.addEventListener("scroll", requestUpdate, { passive: true });
  window.addEventListener("resize", requestUpdate, { passive: true });

  // Mobile navigation
  const menuButton = document.getElementById("menuButton");
  const nav = document.getElementById("nav");

  if (menuButton && nav) {
    menuButton.addEventListener("click", () => {
      nav.classList.toggle("open");
    });

    nav.querySelectorAll("a").forEach(a => {
      a.addEventListener("click", () => nav.classList.remove("open"));
    });
  }

  // Login placeholder: frontend-only, not real authentication
  document.querySelectorAll("[data-auth]").forEach(link => {
    link.addEventListener("click", event => {
      const loggedIn = sessionStorage.getItem("marst_logged_in") === "true";

      if (!loggedIn) {
        event.preventDefault();
        const destination = link.getAttribute("href");
        window.location.href =
          "login.html?return=" + encodeURIComponent(destination);
      }
    });
  });

  // Footer year
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  getProgress();
})();
