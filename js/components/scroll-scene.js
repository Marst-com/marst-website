export function initScrollScene() {
  const section = document.querySelector("#story");
  const canvas = document.querySelector("#story-canvas");
  const sticky = document.querySelector(".story-sticky");

  if (!section || !canvas || !sticky) return;

  const ctx = canvas.getContext("2d", { alpha: false });
  const progressBar = document.querySelector("#story-progress-bar");
  const progressNumber = document.querySelector("#story-progress-number");
  const caption = document.querySelector("#story-caption");

  let width = 0;
  let height = 0;
  let dpr = 1;
  let progress = 0;
  let raf = 0;

  const captions = [
    {
      at: 0.00,
      index: "01 / IDEA",
      title: "Everything<br>starts <em>small.</em>",
      desc: "One thought. One shape. One possibility."
    },
    {
      at: 0.12,
      index: "02 / MOVEMENT",
      title: "An idea<br>begins to <em>move.</em>",
      desc: "Curiosity turns a thought into momentum."
    },
    {
      at: 0.24,
      index: "03 / CONNECTION",
      title: "Everything<br>is <em>connected.</em>",
      desc: "Different pieces find their place in one system."
    },
    {
      at: 0.37,
      index: "04 / CODE",
      title: "A thought<br>becomes <em>code.</em>",
      desc: "Abstract ideas become logic, structure, and possibility."
    },
    {
      at: 0.51,
      index: "05 / STRUCTURE",
      title: "Structure<br>creates <em>meaning.</em>",
      desc: "The invisible foundation starts taking shape."
    },
    {
      at: 0.65,
      index: "06 / CREATION",
      title: "Something new<br>is <em>taking shape.</em>",
      desc: "The pieces evolve into something that can be experienced."
    },
    {
      at: 0.78,
      index: "07 / EXPERIENCE",
      title: "From concept<br>to <em>experience.</em>",
      desc: "An idea becomes more than just an idea."
    },
    {
      at: 0.91,
      index: "08 / MARST",
      title: "Keep<br><em>creating.</em>",
      desc: "There is always another idea waiting to become real."
    }
  ];

  function clamp(v, min = 0, max = 1) {
    return Math.max(min, Math.min(max, v));
  }

  function lerp(a, b, t) {
    return a + (b - a) * t;
  }

  function ease(t) {
    t = clamp(t);
    return t * t * (3 - 2 * t);
  }

  function segment(value, start, end) {
    return ease((value - start) / (end - start));
  }

  function resize() {
    const rect = sticky.getBoundingClientRect();

    width = rect.width;
    height = rect.height;
    dpr = Math.min(window.devicePixelRatio || 1, 1.8);

    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    draw(progress);
  }

  function getProgress() {
    const rect = section.getBoundingClientRect();
    const scrollLength = section.offsetHeight - window.innerHeight;

    if (scrollLength <= 0) return 0;

    return clamp(-rect.top / scrollLength);
  }

  function getCaptionIndex(p) {
    let index = 0;

    for (let i = 0; i < captions.length; i++) {
      if (p >= captions[i].at) index = i;
    }

    return index;
  }

  function updateCaption(p) {
    const index = getCaptionIndex(p);
    const data = captions[index];

    if (caption.dataset.current === String(index)) return;
    caption.dataset.current = String(index);

    caption.classList.add("caption-changing");

    window.setTimeout(() => {
      const current = captions[getCaptionIndex(progress)];

      caption.innerHTML = `
        <span class="story-caption-index">${current.index}</span>
        <h2>${current.title}</h2>
        <p>${current.desc}</p>
      `;

      caption.classList.remove("caption-changing");
    }, 180);
  }

  // Continuous connected path
  function drawContinuousShape(p, cx, cy, baseSize) {
    const ctx = ctxRef;
  }

  // Canvas drawing context
  const ctxRef = ctx;

  function drawGrid(p) {
    const gridSize = 48;
    const shift = p * 24;

    ctx.save();
    ctx.strokeStyle = "rgba(255,255,255,0.035)";
    ctx.lineWidth = 1;

    for (let x = (width % gridSize) / 2; x < width; x += gridSize) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }

    for (let y = (height % gridSize) / 2 - shift; y < height; y += gridSize) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    ctx.restore();
  }

  function drawGlow(cx, cy, radius, alpha) {
    const gradient = ctx.createRadialGradient(
      cx, cy, 0,
      cx, cy, radius
    );

    gradient.addColorStop(0, `rgba(205,255,105,${alpha})`);
    gradient.addColorStop(0.35, `rgba(155,220,80,${alpha * 0.35})`);
    gradient.addColorStop(1, "rgba(100,150,50,0)");

    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(cx, cy, radius, 0, Math.PI * 2);
    ctx.fill();
  }

  // Square transforms into one continuously connected illustration.
  function drawMorph(p) {
    const cx = width * 0.5;
    const cy = height * 0.5;

    const startSize = Math.min(width, height) * 0.075;
    const finalSize = Math.min(width, height) * 0.36;

    const expand = segment(p, 0.02, 0.28);
    const expand2 = segment(p, 0.28, 0.58);
    const expand3 = segment(p, 0.58, 0.86);

    const size = lerp(startSize, finalSize, expand);
    const finalScale = lerp(1, 1.28, expand3);

    const moveX =
      Math.sin(p * Math.PI * 2) * width * 0.12 * segment(p, 0.08, 0.5);

    const moveY =
      Math.cos(p * Math.PI * 2.2) * height * 0.09 * segment(p, 0.15, 0.65);

    const x = cx + moveX;
    const y = cy + moveY;

    const rotation = lerp(0, Math.PI * 2.4, segment(p, 0.08, 0.62));
    const corner = lerp(0, size * 0.48, segment(p, 0.15, 0.4));

    // One shape, evolving from square into a connected visual form.
    const points = 120;
    const radius = size * finalScale;

    const squareAmount = 1 - segment(p, 0.2, 0.48);
    const organicAmount = segment(p, 0.32, 0.72);
    const spreadAmount = segment(p, 0.58, 0.92);

    drawGlow(x, y, radius * 3.2, 0.12 + spreadAmount * 0.1);

    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rotation);

    // Shape outline
    ctx.beginPath();

    for (let i = 0; i <= points; i++) {
      const a = (i / points) * Math.PI * 2;
      const nx = Math.cos(a);
      const ny = Math.sin(a);

      // Square-to-circle morph
      const squareRadius = radius / Math.max(
        Math.abs(nx),
        Math.abs(ny),
        0.001
      );

      const circularRadius = radius;
      let r = lerp(squareRadius, circularRadius, organicAmount);

      // Organic waveform changes the original contour
      const wave =
        Math.sin(a * 3 + p * 7) * 0.12 +
        Math.cos(a * 5 - p * 5) * 0.06 +
        Math.sin(a * 8 + p * 9) * 0.025;

      r *= 1 + wave * organicAmount;
      r += Math.sin(a * 2 + p * 4) * radius * 0.15 * spreadAmount;

      const px = nx * r;
      const py = ny * r;

      if (i === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }

    ctx.closePath();

    ctx.strokeStyle = `rgba(220,255,150,${0.7 + organicAmount * 0.3})`;
    ctx.lineWidth = lerp(2.5, 1, organicAmount);
    ctx.stroke();

    // Inner connected lines
    const lineProgress = segment(p, 0.12, 0.82);

    ctx.save();
    ctx.clip();

    ctx.strokeStyle = `rgba(220,255,150,${0.15 + lineProgress * 0.24})`;
    ctx.lineWidth = 1;

    const innerLines = 24;

    for (let i = 0; i < innerLines; i++) {
      const t = i / innerLines;
      const a = t * Math.PI * 2;

      const startR = radius * 0.1;
      const endR = radius * (0.45 + 0.55 * lineProgress);

      const startX = Math.cos(a + p * 2) * startR;
      const startY = Math.sin(a + p * 2) * startR;

      const endX = Math.cos(a + p * 3) * endR;
      const endY = Math.sin(a + p * 3) * endR;

      ctx.beginPath();
      ctx.moveTo(startX, startY);
      ctx.lineTo(
        lerp(startX, endX, lineProgress),
        lerp(startY, endY, lineProgress)
      );
      ctx.stroke();
    }

    // Connected web-like network emerging from the original shape.
    const networkProgress = segment(p, 0.38, 0.88);
    const nodeCount = 34;

    ctx.strokeStyle = `rgba(210,255,140,${0.12 * networkProgress})`;

    for (let i = 0; i < nodeCount; i++) {
      const a = (i / nodeCount) * Math.PI * 2;

      const inner = radius * 0.3;
      const outer = radius * (1.1 + networkProgress * 1.15);

      const ax = Math.cos(a + p) * inner;
      const ay = Math.sin(a + p) * inner;

      const bx = Math.cos(a * 1.7 + p * 2) * outer;
      const by = Math.sin(a * 1.7 + p * 2) * outer;

      const reach = segment(p, 0.4 + i * 0.002, 0.85);

      ctx.beginPath();
      ctx.moveTo(ax, ay);
      ctx.lineTo(lerp(ax, bx, reach), lerp(ay, by, reach));
      ctx.stroke();
    }

    // The same path gradually becomes a connected rectangular interface.
    const interfaceProgress = segment(p, 0.46, 0.76);
    const rectWidth = radius * 2.7 * interfaceProgress;
    const rectHeight = radius * 1.9 * interfaceProgress;

    ctx.strokeStyle = `rgba(220,255,150,${interfaceProgress * 0.32})`;
    ctx.lineWidth = 1;

    ctx.beginPath();
    ctx.rect(
      -rectWidth / 2,
      -rectHeight / 2,
      rectWidth,
      rectHeight
    );
    ctx.stroke();

    // Continuous UI lines - drawn inside the expanding composition.
    for (let i = 0; i < 8; i++) {
      const lineY = -rectHeight / 2 + (rectHeight / 8) * i;
      const lineWidth = rectWidth * (0.2 + ((i * 7) % 5) * 0.12);

      ctx.beginPath();
      ctx.moveTo(-rectWidth / 2, lineY);
      ctx.lineTo(
        -rectWidth / 2 + lineWidth * interfaceProgress,
        lineY
      );
      ctx.stroke();
    }

    // Gradually reveal code-like strokes, as part of the same image.
    const codeProgress = segment(p, 0.34, 0.7);

    ctx.strokeStyle = `rgba(220,255,150,${codeProgress * 0.55})`;

    for (let i = 0; i < 12; i++) {
      const lineY = radius * 0.65 + i * radius * 0.095;
      const lineWidth = radius * (0.5 + ((i * 3) % 6) * 0.12);

      ctx.beginPath();
      ctx.moveTo(-radius * 0.7, lineY);
      ctx.lineTo(
        -radius * 0.7 + lineWidth * codeProgress,
        lineY
      );
      ctx.stroke();
    }

    ctx.restore();

    // The original square's center remains the source of the entire drawing.
    ctx.beginPath();
    ctx.arc(0, 0, radius * 0.055, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(225,255,170,${1 - squareAmount * 0.4})`;
    ctx.fill();

    ctx.restore();
  }

  function draw(p) {
    if (!width || !height) return;

    ctx.fillStyle = "#080908";
    ctx.fillRect(0, 0, width, height);

    drawGrid(p);
    drawMorph(p);

    // Edge shading
    const vignette = ctx.createRadialGradient(
      width * 0.5,
      height * 0.5,
      height * 0.12,
      width * 0.5,
      height * 0.5,
      height * 0.85
    );

    vignette.addColorStop(0, "rgba(0,0,0,0)");
    vignette.addColorStop(1, "rgba(0,0,0,0.58)");

    ctx.fillStyle = vignette;
    ctx.fillRect(0, 0, width, height);
  }

  function update() {
    raf = 0;
    progress = getProgress();

    draw(progress);

    if (progressBar) {
      progressBar.style.transform = `scaleX(${progress})`;
    }

    if (progressNumber) {
      progressNumber.textContent = String(Math.round(progress * 100))
        .padStart(3, "0");
    }

    updateCaption(progress);
  }

  function requestUpdate() {
    if (raf) return;
    raf = requestAnimationFrame(update);
  }

  const resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(sticky);

  window.addEventListener("scroll", requestUpdate, { passive: true });
  window.addEventListener("resize", resize, { passive: true });

  resize();
  requestUpdate();
}
