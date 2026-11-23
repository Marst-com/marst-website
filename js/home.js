
(() => {
  "use strict";

  const canvas = document.getElementById("scene");
  const ctx = canvas.getContext("2d", { alpha: false });

  const cinematic = document.getElementById("cinematic");
  const progressBar = document.getElementById("progressBar");
  const sceneCounter = document.getElementById("sceneCounter");
  const sideSceneName = document.getElementById("sideSceneName");
  const scenes = [...document.querySelectorAll(".scene-copy")];

  const sceneNames = [
    "INTRODUCTION",
    "THE BEGINNING",
    "THE PROCESS",
    "THE RESULT",
    "WHAT'S NEXT"
  ];

  let width = 0;
  let height = 0;
  let dpr = 1;
  let progress = 0;
  let currentScene = -1;
  let animationFrame = 0;

  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  // -----------------------------
  // Canvas setup
  // -----------------------------

  function resize() {
    width = window.innerWidth;
    height = window.innerHeight;

    // Old PCs: limit pixel ratio to reduce GPU load.
    dpr = Math.min(window.devicePixelRatio || 1, 1.3);

    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);

    canvas.style.width = width + "px";
    canvas.style.height = height + "px";

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    requestRender();
  }

  // -----------------------------
  // Scroll progress
  // -----------------------------

  function updateScroll() {
    const rect = cinematic.getBoundingClientRect();
    const total = cinematic.offsetHeight - height;

    const scrolled = -rect.top;
    progress = total <= 0
      ? 0
      : Math.max(0, Math.min(1, scrolled / total));

    progressBar.style.width = (progress * 100) + "%";

    const sceneIndex = Math.min(
      scenes.length - 1,
      Math.floor(progress * scenes.length)
    );

    if (sceneIndex !== currentScene) {
      currentScene = sceneIndex;

      scenes.forEach((scene, i) => {
        scene.classList.toggle("active", i === sceneIndex);
      });

      sceneCounter.textContent =
        String(sceneIndex + 1).padStart(2, "0") +
        " / " +
        String(scenes.length).padStart(2, "0");

      sideSceneName.textContent = sceneNames[sceneIndex];
    }

    requestRender();
  }

  // -----------------------------
  // Helpers
  // -----------------------------

  function clamp(value, min = 0, max = 1) {
    return Math.max(min, Math.min(max, value));
  }

  function lerp(a, b, t) {
    return a + (b - a) * t;
  }

  function smooth(t) {
    t = clamp(t);
    return t * t * (3 - 2 * t);
  }

  function segment(start, end) {
    return smooth((progress - start) / (end - start));
  }

  function clear() {
    ctx.fillStyle = "#080910";
    ctx.fillRect(0, 0, width, height);
  }

  function glow(x, y, radius, color, alpha = 1) {
    const gradient = ctx.createRadialGradient(
      x, y, 0,
      x, y, radius
    );

    gradient.addColorStop(0, color);
    gradient.addColorStop(1, "rgba(0,0,0,0)");

    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.fillStyle = gradient;
    ctx.fillRect(x - radius, y - radius, radius * 2, radius * 2);
    ctx.restore();
  }

  function line(x1, y1, x2, y2, color, alpha = 1, lineWidth = 1) {
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.strokeStyle = color;
    ctx.lineWidth = lineWidth;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
    ctx.restore();
  }

  // -----------------------------
  // Stars / particles
  // -----------------------------

  const stars = Array.from({ length: 110 }, () => ({
    x: Math.random(),
    y: Math.random(),
    radius: Math.random() * 1.4 + .2,
    alpha: Math.random() * .55 + .1,
    speed: Math.random() * .4 + .1
  }));

  function drawStars(time) {
    for (const star of stars) {
      const twinkle = reducedMotion
        ? 0
        : Math.sin(time * star.speed + star.x * 30) * .15;

      ctx.beginPath();
      ctx.arc(
        star.x * width,
        star.y * height,
        star.radius,
        0,
        Math.PI * 2
      );

      ctx.fillStyle = `rgba(225,230,255,${clamp(star.alpha + twinkle)})`;
      ctx.fill();
    }
  }

  // -----------------------------
  // Orb
  // -----------------------------

  function drawOrb(x, y, radius, rotation, scale = 1) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rotation);

    const r = radius * scale;

    // Main sphere
    const sphere = ctx.createRadialGradient(
      -r * .32, -r * .38, r * .05,
      0, 0, r
    );

    sphere.addColorStop(0, "#b9a4ff");
    sphere.addColorStop(.2, "#7960d5");
    sphere.addColorStop(.55, "#352b68");
    sphere.addColorStop(.82, "#17152f");
    sphere.addColorStop(1, "#070810");

    ctx.beginPath();
    ctx.arc(0, 0, r, 0, Math.PI * 2);
    ctx.fillStyle = sphere;
    ctx.fill();

    // Sphere glow
    ctx.save();
    ctx.globalCompositeOperation = "screen";

    const halo = ctx.createRadialGradient(
      0, 0, r * .7,
      0, 0, r * 1.8
    );

    halo.addColorStop(0, "rgba(130,105,255,.12)");
    halo.addColorStop(1, "rgba(90,80,255,0)");

    ctx.beginPath();
    ctx.arc(0, 0, r * 1.8, 0, Math.PI * 2);
    ctx.fillStyle = halo;
    ctx.fill();
    ctx.restore();

    // Orb highlight
    ctx.beginPath();
    ctx.arc(-r * .32, -r * .38, r * .12, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(255,255,255,.22)";
    ctx.fill();

    ctx.restore();
  }

  // -----------------------------
  // Orbit rings
  // -----------------------------

  function drawOrbit(x, y, radius, rotation, color, lineWidth = 1, alpha = .4) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rotation);

    ctx.beginPath();
    ctx.ellipse(
      0, 0,
      radius,
      radius * .34,
      0,
      0,
      Math.PI * 2
    );

    ctx.strokeStyle = color;
    ctx.globalAlpha = alpha;
    ctx.lineWidth = lineWidth;
    ctx.stroke();

    ctx.restore();
  }

  // -----------------------------
  // Floating light points
  // -----------------------------

  function drawFloatingPoints(time, x, y, radius) {
    for (let i = 0; i < 12; i++) {
      const angle = time * .00015 + i * (Math.PI * 2 / 12);
      const orbit = radius * (1.3 + (i % 3) * .25);

      const px = x + Math.cos(angle) * orbit;
      const py = y + Math.sin(angle) * orbit * .55;

      ctx.beginPath();
      ctx.arc(px, py, (i % 3) + 1, 0, Math.PI * 2);
      ctx.fillStyle = i % 2 === 0
        ? "rgba(130,115,255,.7)"
        : "rgba(100,210,255,.7)";
      ctx.fill();
    }
  }

  // -----------------------------
  // Background grid
  // -----------------------------

  function drawGrid(alpha) {
    if (alpha <= 0) return;

    const spacing = 70;
    const offset = (progress * 120) % spacing;

    ctx.save();
    ctx.globalAlpha = alpha * .14;
    ctx.strokeStyle = "#9288ff";
    ctx.lineWidth = .5;

    for (let x = -spacing; x < width + spacing; x += spacing) {
      ctx.beginPath();
      ctx.moveTo(x + offset, 0);
      ctx.lineTo(x + offset, height);
      ctx.stroke();
    }

    for (let y = -spacing; y < height + spacing; y += spacing) {
      ctx.beginPath();
      ctx.moveTo(0, y + offset);
      ctx.lineTo(width, y + offset);
      ctx.stroke();
    }

    ctx.restore();
  }

  // -----------------------------
  // Main cinematic renderer
  // -----------------------------

  function render(time = 0) {
    clear();

    const centerX = width * .70;
    const centerY = height * .50;

    const intro = 1 - segment(0.08, 0.20);
    const beginning = segment(0.12, 0.34);
    const process = segment(0.34, 0.58);
    const result = segment(0.58, 0.80);
    const ending = segment(0.80, 0.98);

    // Dynamic background colors
    const colorShift = progress;

    glow(
      width * lerp(.75, .35, colorShift),
      height * .5,
      Math.max(width, height) * .7,
      "rgba(83,57,181,.18)",
      1
    );

    glow(
      width * lerp(.2, .8, colorShift),
      height * .7,
      Math.max(width, height) * .55,
      "rgba(37,126,185,.12)",
      1
    );

    drawStars(time);

    // Grid gradually appears and disappears
    drawGrid(process * (1 - ending));

    // Initial hero orb
    const orbProgress = smooth(progress);
    const orbScale = lerp(1.0, .55, orbProgress);

    const orbX = width * lerp(.74, .76, orbProgress);
    const orbY = height * .50 + Math.sin(time * .0004) * 12;
    const orbRadius = Math.min(width, height) * .19 * orbScale;

    // Scene 1: glowing orb
    const orbAlpha = clamp(1 - segment(.12, .32) + .25);

    glow(
      orbX,
      orbY,
      orbRadius * 3.2,
      "rgba(124,86,255,.30)",
      orbAlpha
    );

    drawOrbit(
      orbX,
      orbY,
      orbRadius * 1.7,
      time * .0002,
      "#9d8cff",
      1,
      .4 * orbAlpha
    );

    drawOrbit(
      orbX,
      orbY,
      orbRadius * 2.0,
      -time * .00015,
      "#65d8ff",
      1,
      .22 * orbAlpha
    );

    drawFloatingPoints(time, orbX, orbY, orbRadius);
    drawOrb(orbX, orbY, orbRadius, time * .0001, 1);

    // Scene 2: orb grows and gets brighter
    const growth = beginning * (1 - process);

    if (growth > 0) {
      const bigRadius = orbRadius * lerp(1, 1.6, growth);

      glow(
        orbX,
        orbY,
        bigRadius * 3,
        "rgba(111,90,255,.25)",
        growth
      );

      drawOrbit(
        orbX,
        orbY,
        bigRadius * 2,
        time * .00035,
        "#a38dff",
        1.5,
        .6 * growth
      );
    }

    // Scene 3: abstract network emerges
    if (process > 0) {
      drawNetwork(time, process);
    }

    // Scene 4: particle convergence / creation
    if (result > 0) {
      drawConvergence(time, result);
    }

    // Scene 5: final burst
    if (ending > 0) {
      drawFinal(time, ending);
    }
  }

  // -----------------------------
  // Network animation
  // -----------------------------

  function drawNetwork(time, amount) {
    const nodes = [];
    const count = 26;

    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      const radius = Math.min(width, height) * (.20 + (i % 4) * .055);

      const drift = reducedMotion ? 0 : Math.sin(time * .0005 + i) * 12;

      nodes.push({
        x: width * .65 + Math.cos(angle) * (radius + drift),
        y: height * .5 + Math.sin(angle) * (radius + drift),
        size: (i % 3) + 2
      });
    }

    ctx.save();
    ctx.globalAlpha = amount * .65;

    // Connections
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < Math.min(width, height) * .22) {
          line(
            nodes[i].x, nodes[i].y,
            nodes[j].x, nodes[j].y,
            "#8d7cff",
            (1 - dist / (Math.min(width, height) * .22)) * .3 * amount,
            .7
          );
        }
      }
    }

    // Nodes
    for (const node of nodes) {
      glow(node.x, node.y, 18, "rgba(118,128,255,.5)", amount * .5);

      ctx.beginPath();
      ctx.arc(node.x, node.y, node.size, 0, Math.PI * 2);
      ctx.fillStyle = "#b9aaff";
      ctx.fill();
    }

    ctx.restore();
  }

  // -----------------------------
  // Result convergence
  // -----------------------------

  function drawConvergence(time, amount) {
    const cx = width * .68;
    const cy = height * .5;
    const radius = Math.min(width, height) * .32;

    ctx.save();
    ctx.globalAlpha = amount;

    for (let i = 0; i < 65; i++) {
      const angle = i * 2.399963; // golden angle
      const distance = radius * (1 - amount) * (i / 65);

      const x = cx + Math.cos(angle + time * .00015) * distance;
      const y = cy + Math.sin(angle + time * .00015) * distance;

      ctx.beginPath();
      ctx.arc(x, y, 1 + (i % 3), 0, Math.PI * 2);
      ctx.fillStyle = i % 2 === 0 ? "#9b87ff" : "#70d9ff";
      ctx.fill();
    }

    glow(
      cx, cy,
      radius * (1 + amount),
      "rgba(115,100,255,.2)",
      amount
    );

    ctx.restore();
  }

  // -----------------------------
  // Final scene
  // -----------------------------

  function drawFinal(time, amount) {
    const cx = width * .72;
    const cy = height * .5;
    const radius = Math.min(width, height) * .15;

    glow(
      cx, cy,
      radius * 4,
      "rgba(105,130,255,.22)",
      amount
    );

    drawOrbit(
      cx, cy,
      radius * 2.2,
      time * .0001,
      "#8d87ff",
      1.2,
      amount * .5
    );

    drawOrbit(
      cx, cy,
      radius * 2.8,
      -time * .00008,
      "#65d9ff",
      1,
      amount * .35
    );

    drawOrb(cx, cy, radius, 0, amount);
  }

  // -----------------------------
  // Render scheduling
  // -----------------------------

  function requestRender() {
    if (animationFrame) return;

    animationFrame = requestAnimationFrame((time) => {
      animationFrame = 0;
      render(time);
    });
  }

  // -----------------------------
  // Events
  // -----------------------------

  window.addEventListener("resize", resize, { passive: true });
  window.addEventListener("scroll", updateScroll, { passive: true });

  resize();
  updateScroll();

  // Mobile menu
  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.querySelector(".nav-links");

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      navLinks.classList.toggle("open");
    });

    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("open");
      });
    });
  }

  // Footer year
  const yearElement = document.getElementById("year");
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  // Frontend-only login guard.
  // This is only a UI demonstration, not real authentication.
  document.querySelectorAll("[data-protected]").forEach((link) => {
    link.addEventListener("click", (event) => {
      const isLoggedIn = sessionStorage.getItem("marst_logged_in") === "true";

      if (!isLoggedIn) {
        event.preventDefault();

        const target = link.getAttribute("href");
        window.location.href =
          "login.html?return=" + encodeURIComponent(target);
      }
    });
  });

})();
