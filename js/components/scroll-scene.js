
export function initScrollScene() {
  const section = document.querySelector("#experience");
  if (!section) return;

  const object = document.querySelector("#transform-object");
  const square = document.querySelector("#transform-square");
  const browser = document.querySelector("#browser-window");
  const editor = document.querySelector("#code-editor");
  const service = document.querySelector("#service-ui");
  const finalObject = document.querySelector("#final-object");

  const texts = [
    document.querySelector(".text-stage-1"),
    document.querySelector(".text-stage-2"),
    document.querySelector(".text-stage-3"),
    document.querySelector(".text-stage-4"),
    document.querySelector(".text-stage-5")
  ];

  const progressBar = document.querySelector("#experience-progress-bar");
  const stepLabel = document.querySelector("#experience-step");
  const statusLabel = document.querySelector("#experience-status");

  if (!object || !square || !browser || !editor || !service || !finalObject) {
    console.warn("[MARST] Scroll experience elements missing.");
    return;
  }

  let ticking = false;
  let lastProgress = -1;

  const clamp = (value, min = 0, max = 1) =>
    Math.min(max, Math.max(min, value));

  const smooth = (value) => {
    value = clamp(value);
    return value * value * (3 - 2 * value);
  };

  const lerp = (a, b, t) => a + (b - a) * t;

  const range = (progress, start, end) => {
    return smooth(clamp((progress - start) / (end - start)));
  };

  function update() {
    ticking = false;

    const rect = section.getBoundingClientRect();
    const total = section.offsetHeight - window.innerHeight;

    const progress = clamp(
      -rect.top / Math.max(total, 1)
    );

    if (Math.abs(progress - lastProgress) < 0.0005) return;
    lastProgress = progress;

    const p = progress;

    // Timeline stages
    const move = range(p, 0.00, 0.17);
    const morph = range(p, 0.12, 0.30);
    const browserIn = range(p, 0.23, 0.43);
    const browserOut = 1 - range(p, 0.40, 0.52);
    const codeIn = range(p, 0.38, 0.57);
    const codeOut = 1 - range(p, 0.55, 0.68);
    const serviceIn = range(p, 0.63, 0.82);
    const serviceOut = 1 - range(p, 0.80, 0.90);
    const finalIn = range(p, 0.86, 0.99);

    // Square movement
    const squareX = lerp(-240, 0, move);
    const squareY = lerp(100, -20, move);
    const squareScale = lerp(0.35, 1.25, move);
    const squareRotate = lerp(-45, 180, move);

    object.style.transform = `
      translate3d(${squareX}px, ${squareY}px, 0)
      scale(${squareScale})
      rotate(${squareRotate}deg)
    `;

    // Square morphing
    const radius = lerp(0, 24, morph);
    const border = lerp(1, 2.5, morph);

    square.style.borderRadius = `${radius}%`;
    square.style.borderWidth = `${border}px`;
    square.style.opacity = 1 - browserIn * 0.95;

    square.style.setProperty("--square-morph", morph);

    // Orbital geometry
    section.style.setProperty("--scroll-progress", p);

    const orbitSpin = p * 500;

    document.querySelectorAll(".object-orbit").forEach((orbit, index) => {
      orbit.style.transform = `
        rotate(${orbitSpin * (index % 2 ? -1 : 1)}deg)
      `;
    });

    // Browser transformation
    browser.style.opacity = browserIn * browserOut;
    browser.style.transform = `
      translate3d(
        ${lerp(160, 0, browserIn)}px,
        ${lerp(80, 0, browserIn)}px,
        0
      )
      scale(${lerp(0.55, 1, browserIn)})
      rotate(${lerp(8, 0, browserIn)}deg)
    `;

    browser.style.filter = `blur(${lerp(8, 0, browserIn)}px)`;

    // Editor
    editor.style.opacity = codeIn * codeOut;
    editor.style.transform = `
      translate3d(
        ${lerp(-140, 0, codeIn)}px,
        ${lerp(80, 0, codeIn)}px,
        0
      )
      scale(${lerp(0.7, 1, codeIn)})
      rotate(${lerp(-5, 0, codeIn)}deg)
    `;

    editor.style.filter = `blur(${lerp(6, 0, codeIn)}px)`;

    // Service UI
    service.style.opacity = serviceIn * serviceOut;
    service.style.transform = `
      translate3d(
        0,
        ${lerp(180, 0, serviceIn)}px,
        0
      )
      scale(${lerp(0.7, 1, serviceIn)})
      rotateX(${lerp(10, 0, serviceIn)}deg)
    `;

    service.style.filter = `blur(${lerp(8, 0, serviceIn)}px)`;

    // Final object
    finalObject.style.opacity = finalIn;
    finalObject.style.transform = `
      translate3d(0, ${lerp(100, 0, finalIn)}px, 0)
      scale(${lerp(0.2, 1, finalIn)})
      rotate(${lerp(-90, 0, finalIn)}deg)
    `;

    // Square fades as final object appears
    object.style.opacity = 1 - finalIn;

    // Copy stage switching
    const stageIndex = Math.min(
      4,
      Math.floor(p * 5)
    );

    texts.forEach((text, index) => {
      if (!text) return;

      const active = index === stageIndex;
      text.style.opacity = active ? 1 : 0;
      text.style.transform = active
        ? "translate3d(0,0,0)"
        : "translate3d(0,30px,0)";
      text.style.visibility = active ? "visible" : "hidden";
    });

    // Status
    const stageNames = [
      "INITIALIZING",
      "TRANSFORMING",
      "GENERATING CODE",
      "BUILDING EXPERIENCE",
      "CREATION COMPLETE"
    ];

    if (statusLabel) {
      statusLabel.textContent = stageNames[stageIndex];
    }

    if (stepLabel) {
      stepLabel.textContent =
        `${String(stageIndex + 1).padStart(2, "0")} / 05`;
    }

    if (progressBar) {
      progressBar.style.width = `${p * 100}%`;
    }

    // Square becomes more complex while moving
    const rotation = p * 720;
    square.style.setProperty("--square-rotation", `${rotation}deg`);
  }

  function requestUpdate() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(update);
  }

  window.addEventListener("scroll", requestUpdate, { passive: true });
  window.addEventListener("resize", requestUpdate);

  update();
}
