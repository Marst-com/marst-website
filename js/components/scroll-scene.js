export function initScrollScene() {
    const section = document.querySelector("#story");
    const stage = section?.querySelector(".story-sticky");
    const canvas = section?.querySelector("#story-canvas");

    if (!section || !stage || !canvas) {
        console.warn("[MARST SCENE] 요소를 찾지 못했습니다.");
        return;
    }

    const ctx = canvas.getContext("2d", {
        alpha: false
    });

    if (!ctx) return;

    // 중복 초기화 방지
    if (section.dataset.sceneInitialized === "true") return;
    section.dataset.sceneInitialized = "true";

    const progressBar = document.querySelector("#story-progress-bar");
    const progressNumber = document.querySelector("#story-progress-number");
    const caption = document.querySelector("#story-caption");

    const isMobile = () => window.innerWidth <= 768;

    let width = 0;
    let height = 0;
    let dpr = 1;

    let scrollProgress = 0;
    let currentMode = "before";

    let rafId = 0;
    let resizeObserver = null;

    const captions = [
        {
            point: 0,
            index: "01 / IDEA",
            title: "Everything<br>starts <em>small.</em>",
            description: "One thought. One shape. One possibility."
        },
        {
            point: 0.12,
            index: "02 / FORM",
            title: "A thought<br>takes <em>shape.</em>",
            description: "Ideas begin to gain structure and direction."
        },
            {
            point: 0.25,
            index: "03 / DESIGN",
            title: "Shape becomes<br><em>meaning.</em>",
            description: "The abstract becomes something people can see."
        },
        {
            point: 0.38,
            index: "04 / SYSTEM",
            title: "Every part<br>has a <em>purpose.</em>",
            description: "Separate elements connect to create something bigger."
        },
        {
            point: 0.52,
            index: "05 / CODE",
            title: "Ideas become<br><em>reality.</em>",
            description: "Logic turns imagination into something that works."
        },
        {
            point: 0.66,
            index: "06 / WEB",
            title: "Something you<br>can <em>experience.</em>",
            description: "A system becomes a product, a page, an experience."
        },
        {
            point: 0.8,
            index: "07 / CONNECT",
            title: "Everything<br>connects <em>together.</em>",
            description: "Design. Technology. Ideas. One continuous process."
        },
        {
            point: 0.93,
            index: "08 / MARST",
            title: "Ideas don't<br>stay <em>ideas.</em>",
            description: "I turn what I imagine into something real."
        }
    ];

    let activeCaption = -1;

    // ----------------------------------------
    // 캔버스 크기
    // ----------------------------------------

    function resizeCanvas() {
        width = stage.clientWidth || window.innerWidth;
        height = stage.clientHeight || window.innerHeight;
        dpr = Math.min(window.devicePixelRatio || 1, 2);

        canvas.width = Math.floor(width * dpr);
        canvas.height = Math.floor(height * dpr);

        canvas.style.width = width + "px";
        canvas.style.height = height + "px";

        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

        draw(scrollProgress);
    }

    // ----------------------------------------
    // Utils
    // ----------------------------------------

    function clamp(value, min = 0, max = 1) {
        return Math.max(min, Math.min(max, value));
    }

    function lerp(a, b, t) {
        return a + (b - a) * t;
    }

    function ease(value) {
        value = clamp(value);
        return value * value * (3 - 2 * value);
    }

    function segment(progress, start, end) {
        return ease(clamp((progress - start) / (end - start)));
    }

    function smoothstep(a, b, x) {
        const t = clamp((x - a) / (b - a));
        return t * t * (3 - 2 * t);
    }

    // ----------------------------------------
    // Scroll Pin System
    // ----------------------------------------

    function getScrollMetrics() {
        const rect = section.getBoundingClientRect();
        const absoluteTop = window.scrollY + rect.top;
        const sectionHeight = section.offsetHeight;
        const viewportHeight = window.innerHeight;

        const start = absoluteTop;
        const end = absoluteTop + sectionHeight - viewportHeight;

        return {
            start,
            end,
            sectionHeight,
            viewportHeight
        };
    }

    function pinStage() {
        if (stage.parentElement !== document.body) {
            document.body.appendChild(stage);
        }

        stage.classList.add("story-pinned");
        stage.classList.remove("story-ended");

        stage.style.position = "fixed";
        stage.style.top = "0";
        stage.style.left = "0";
        stage.style.right = "0";
        stage.style.bottom = "auto";
        stage.style.width = "100vw";
        stage.style.height = "100vh";
        stage.style.zIndex = "99999";

        currentMode = "pinned";

        resizeCanvas();
    }

    function unpinStage() {
        if (stage.parentElement !== section) {
            section.appendChild(stage);
        }

        stage.classList.remove("story-pinned");
        stage.classList.remove("story-ended");

        stage.style.position = "absolute";
        stage.style.top = "0";
        stage.style.left = "0";
        stage.style.right = "0";
        stage.style.bottom = "auto";
        stage.style.width = "100%";
        stage.style.height = "100vh";
        stage.style.zIndex = "10";

        currentMode = "before";

        resizeCanvas();
    }

    function endStage() {
        if (stage.parentElement !== section) {
            section.appendChild(stage);
        }

        stage.classList.remove("story-pinned");
        stage.classList.add("story-ended");

        stage.style.position = "absolute";
        stage.style.top = "auto";
        stage.style.left = "0";
        stage.style.right = "0";
        stage.style.bottom = "0";
        stage.style.width = "100%";
        stage.style.height = "100vh";
        stage.style.zIndex = "10";

        currentMode = "after";

        resizeCanvas();
    }

    function updatePin() {
        const metrics = getScrollMetrics();
        const scrollY = window.scrollY;

        if (scrollY < metrics.start) {
            if (currentMode !== "before") {
                unpinStage();
            }

            scrollProgress = 0;
            return;
        }

        if (scrollY >= metrics.end) {
            if (currentMode !== "after") {
                endStage();
            }

            scrollProgress = 1;
            return;
        }

        if (currentMode !== "pinned") {
            pinStage();
        }

        scrollProgress = clamp(
            (scrollY - metrics.start) /
            Math.max(1, metrics.end - metrics.start)
        );
    }

    // ----------------------------------------
    // Caption
    // ----------------------------------------

    function updateCaption(progress) {
        let targetIndex = 0;

        for (let i = 0; i < captions.length; i++) {
            if (progress >= captions[i].point) {
                targetIndex = i;
            }
        }

        if (targetIndex === activeCaption) return;

        activeCaption = targetIndex;

        const item = captions[targetIndex];

        if (!caption) return;

        caption.style.opacity = "0";
        caption.style.transform = "translateY(12px)";

        requestAnimationFrame(() => {
            const indexEl = caption.querySelector(".story-caption-index");
            const titleEl = caption.querySelector("h2");
            const descriptionEl = caption.querySelector("p");

            if (indexEl) indexEl.innerHTML = item.index;
            if (titleEl) titleEl.innerHTML = item.title;
            if (descriptionEl) descriptionEl.textContent = item.description;

            requestAnimationFrame(() => {
                caption.style.opacity = "1";
                caption.style.transform = "translateY(0)";
            });
        });
    }

    // ----------------------------------------
    // Drawing
    // ----------------------------------------

    function clear() {
        ctx.fillStyle = "#080908";
        ctx.fillRect(0, 0, width, height);
    }

    function drawGrid(progress) {
        const spacing = isMobile() ? 32 : 48;

        const fade = 1 - smoothstep(0.5, 0.9, progress);

        ctx.strokeStyle = `rgba(255,255,255,${0.035 * fade})`;
        ctx.lineWidth = 1;

        for (let x = 0; x < width; x += spacing) {
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, height);
            ctx.stroke();
        }

        for (let y = 0; y < height; y += spacing) {
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(width, y);
            ctx.stroke();
        }
    }

    function drawGlow(cx, cy, radius, opacity) {
        const gradient = ctx.createRadialGradient(
            cx, cy, 0,
            cx, cy, radius
        );

        gradient.addColorStop(0, `rgba(223,255,114,${opacity})`);
        gradient.addColorStop(0.4, `rgba(150,180,70,${opacity * 0.3})`);
        gradient.addColorStop(1, "rgba(8,9,8,0)");

        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);
    }

    function drawSquare(progress, cx, cy, size) {
        const rotation = progress * Math.PI * 2.5;

        const corner = lerp(0, size * 0.48, segment(0.1, 0.42, progress));
        const stretchX = lerp(1, 2.8, segment(0.3, 0.6, progress));
        const stretchY = lerp(1, 0.48, segment(0.3, 0.6, progress));

        ctx.save();

        ctx.translate(cx, cy);
        ctx.rotate(rotation);
        ctx.scale(stretchX, stretchY);

        ctx.beginPath();

        const half = size / 2;

        ctx.moveTo(-half + corner, -half);
        ctx.lineTo(half - corner, -half);
        ctx.quadraticCurveTo(half, -half, half, -half + corner);

        ctx.lineTo(half, half - corner);
        ctx.quadraticCurveTo(half, half, half - corner, half);

        ctx.lineTo(-half + corner, half);
        ctx.quadraticCurveTo(-half, half, -half, half - corner);

        ctx.lineTo(-half, -half + corner);
        ctx.quadraticCurveTo(-half, -half, -half + corner, -half);

        ctx.closePath();

        const fade = 1 - segment(0.72, 0.96, progress);

        ctx.strokeStyle = `rgba(223,255,114,${fade})`;
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.fillStyle = `rgba(223,255,114,${0.025 * fade})`;
        ctx.fill();

        ctx.restore();
    }

    function drawNetwork(progress, cx, cy, size) {
        const spread = lerp(size * 0.5, width * 0.48, segment(0.15, 0.6, progress));
        const count = 24;

        const nodes = [];

        for (let i = 0; i < count; i++) {
            const angle = (Math.PI * 2 / count) * i;
            const drift = Math.sin(i * 3.1 + progress * 8) * 30;

            const r = spread + drift;

            nodes.push({
                x: cx + Math.cos(angle) * r,
                y: cy + Math.sin(angle) * r,
                angle
            });
        }

        const alpha = segment(0.18, 0.5, progress) *
            (1 - segment(0.8, 1, progress));

        ctx.lineWidth = 0.7;
        ctx.strokeStyle = `rgba(223,255,114,${alpha * 0.25})`;

        // 원형 네트워크
        for (let i = 0; i < nodes.length; i++) {
            const a = nodes[i];
            const b = nodes[(i + 1) % nodes.length];

            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
        }

        // 내부 연결
        for (let i = 0; i < nodes.length; i++) {
            for (let j = i + 2; j < nodes.length; j += 4) {
                const a = nodes[i];
                const b = nodes[j];

                ctx.strokeStyle = `rgba(223,255,114,${alpha * 0.1})`;

                ctx.beginPath();
                ctx.moveTo(a.x, a.y);
                ctx.lineTo(b.x, b.y);
                ctx.stroke();
            }
        }

        // 노드
        nodes.forEach((node, i) => {
            const pulse = 1 + Math.sin(progress * 15 + i) * 0.5;

            ctx.beginPath();
            ctx.arc(node.x, node.y, 1.4 * pulse, 0, Math.PI * 2);

            ctx.fillStyle = `rgba(223,255,114,${alpha * 0.6})`;
            ctx.fill();
        });
    }

    function drawOrbit(progress, cx, cy, size) {
        const opacity = segment(0.35, 0.65, progress) *
            (1 - segment(0.85, 1, progress));

        const orbitSize = lerp(size, width * 0.45, progress);

        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(progress * 1.3);

        for (let i = 0; i < 3; i++) {
            ctx.beginPath();
            ctx.ellipse(
                0, 0,
                orbitSize * (1 + i * 0.13),
                orbitSize * (0.42 + i * 0.1),
                i * 0.7,
                0,
                Math.PI * 2
            );

            ctx.strokeStyle = `rgba(223,255,114,${opacity * 0.18})`;
            ctx.lineWidth = 1;
            ctx.stroke();
        }

        ctx.restore();
    }

    function drawCode(progress) {
        const p = segment(0.45, 0.7, progress);
        const fade = 1 - segment(0.86, 1, progress);

        if (p <= 0) return;

        const lines = [
            "const idea = new Possibility();",
            "idea.connect(design);",
            "idea.connect(technology);",
            "idea.build();",
            "return reality;"
        ];

        const startX = width * 0.58;
        const startY = height * 0.38;

        ctx.save();

        ctx.globalAlpha = p * fade * 0.6;

        ctx.font = isMobile() ? "10px monospace" : "13px monospace";

        lines.forEach((line, index) => {
            const lineProgress = clamp(p * 1.4 - index * 0.14);

            ctx.fillStyle = index === 4
                ? "#dfff72"
                : "rgba(255,255,255,.4)";

            ctx.fillText(
                line.substring(0, Math.floor(line.length * lineProgress)),
                startX,
                startY + index * 26
            );
        });

        ctx.restore();
    }

    function drawInterface(progress) {
        const p = segment(0.62, 0.82, progress);
        const fade = 1 - segment(0.93, 1, progress);

        if (p <= 0) return;

        const panelWidth = Math.min(width * 0.58, 620);
        const panelHeight = Math.min(height * 0.45, 360);

        const x = width * 0.5 - panelWidth * 0.5;
        const y = height * 0.5 - panelHeight * 0.5;

        ctx.save();

        ctx.globalAlpha = p * fade;

        ctx.strokeStyle = "rgba(255,255,255,.12)";
        ctx.lineWidth = 1;

        ctx.strokeRect(x, y, panelWidth, panelHeight);

        ctx.fillStyle = "#111411";
        ctx.fillRect(x, y, panelWidth, panelHeight);

        // UI Header
        ctx.fillStyle = "#dfff72";
        ctx.fillRect(x + 20, y + 20, 35, 3);

        ctx.fillStyle = "rgba(255,255,255,.2)";
        ctx.fillRect(x + 20, y + 36, panelWidth * 0.25, 2);

        // UI Content
        const rows = 4;

        for (let i = 0; i < rows; i++) {
            const rowY = y + 80 + i * 55;

            ctx.fillStyle = "rgba(255,255,255,.04)";
            ctx.fillRect(x + 20, rowY, panelWidth - 40, 38);

            ctx.fillStyle = i === 0
                ? "rgba(223,255,114,.7)"
                : "rgba(255,255,255,.12)";

            ctx.fillRect(
                x + 35,
                rowY + 12,
                (panelWidth - 80) * (0.35 + i * 0.1),
                3
            );
        }

        ctx.restore();
    }

    function drawParticles(progress, cx, cy) {
        const alpha = 1 - segment(0.8, 1, progress);
        const count = 70;

        for (let i = 0; i < count; i++) {
            const seed = i * 127.1;

            const x = (Math.sin(seed) * 0.5 + 0.5) * width;
            const y = (Math.cos(seed * 0.73) * 0.5 + 0.5) * height;

            const movement = Math.sin(progress * 10 + i) * 15;

            ctx.beginPath();
            ctx.arc(x + movement, y, 1, 0, Math.PI * 2);

            ctx.fillStyle = `rgba(223,255,114,${alpha * 0.2})`;
            ctx.fill();
        }
    }

    function drawFinal(progress) {
        const p = segment(0.84, 1, progress);

        if (p <= 0) return;

        const cx = width / 2;
        const cy = height / 2;
        const radius = lerp(20, Math.max(width, height) * 0.38, p);

        ctx.save();

        ctx.globalAlpha = p;

        ctx.strokeStyle = "#dfff72";
        ctx.lineWidth = 1.5;

        ctx.beginPath();
        ctx.arc(cx, cy, radius, 0, Math.PI * 2);
        ctx.stroke();

        ctx.fillStyle = "rgba(223,255,114,.025)";
        ctx.fill();

        ctx.font = `bold ${isMobile() ? 38 : 70}px sans-serif`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        ctx.fillStyle = "#f4f5ef";
        ctx.fillText("MARST", cx, cy);

        ctx.restore();
    }

    function draw(progress) {
        if (!ctx || !width || !height) return;

        clear();

        const cx = width * (isMobile() ? 0.5 : 0.58);
        const cy = height * 0.5;

        const baseSize = Math.min(width, height) * 0.2;

        drawGrid(progress);
        drawGlow(cx, cy, Math.max(width, height) * 0.6, 0.09);
        drawParticles(progress, cx, cy);
        drawSquare(progress, cx, cy, baseSize);
        drawNetwork(progress, cx, cy, baseSize);
        drawOrbit(progress, cx, cy, baseSize);
        drawCode(progress);
        drawInterface(progress);
        drawFinal(progress);

        updateCaption(progress);

        if (progressBar) {
            progressBar.style.width = (progress * 100) + "%";
        }

        if (progressNumber) {
            progressNumber.textContent =
                String(Math.round(progress * 100)).padStart(3, "0");
        }
    }

    // ----------------------------------------
    // Scroll handler
    // ----------------------------------------

    function update() {
        updatePin();
        draw(scrollProgress);
    }

    function onScroll() {
        if (rafId) return;

        rafId = requestAnimationFrame(() => {
            rafId = 0;
            update();
        });
    }

    function onResize() {
        resizeCanvas();
        update();
    }

    // ----------------------------------------
    // Init
    // ----------------------------------------

    section.style.position = "relative";
    section.style.overflow = "visible";

    stage.classList.remove("story-pinned", "story-ended");

    stage.style.position = "absolute";
    stage.style.top = "0";
    stage.style.left = "0";
    stage.style.bottom = "auto";
    stage.style.width = "100%";
    stage.style.height = "100vh";

    resizeCanvas();
    update();

    window.addEventListener("scroll", onScroll, {
        passive: true
    });

    window.addEventListener("resize", onResize);

    window.addEventListener("orientationchange", onResize);

    resizeObserver = new ResizeObserver(onResize);
    resizeObserver.observe(section);

    console.log("[MARST SCENE] JS Pin System Ready");
}
