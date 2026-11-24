
const clamp = (value, min = 0, max = 1) =>
    Math.max(min, Math.min(max, value));

const lerp = (a, b, t) => a + (b - a) * t;

const smoothstep = t => t * t * (3 - 2 * t);

export function initScrollScene() {
    const section = document.getElementById("scroll-scene");
    if (!section) return;

    const object = document.getElementById("scene-object");
    const copies = [...section.querySelectorAll(".scene-copy")];
    const progressBar = document.getElementById("scene-progress-bar");
    const percent = document.getElementById("scene-percent");
    const number = document.getElementById("scene-number");

    if (!object || copies.length === 0) return;

    let ticking = false;

    function update() {
        const rect = section.getBoundingClientRect();
        const scrollable = section.offsetHeight - window.innerHeight;

        const progress = clamp(-rect.top / Math.max(1, scrollable));
        const p = progress;

        // Object cinematic motion
        const scale = lerp(0.25, 2.7, smoothstep(clamp(p / 0.30)));
        const rotation = lerp(0, 220, p);
        const moveX = lerp(0, -window.innerWidth * 0.22, clamp((p - 0.55) / 0.35));
        const moveY = lerp(0, -window.innerHeight * 0.12, clamp(p / 0.85));

        object.style.transform =
            `translate(calc(-50% + ${moveX}px), calc(-50% + ${moveY}px)) ` +
            `scale(${scale}) rotate(${rotation}deg)`;

        object.style.opacity = String(lerp(1, 0.14, clamp((p - 0.72) / 0.25)));

        // Copy sequence
        const segment = 1 / copies.length;

        copies.forEach((copy, index) => {
            const start = index * segment;
            const local = (p - start) / segment;

            const fadeIn = smoothstep(clamp(local / 0.20));
            const fadeOut = 1 - smoothstep(clamp((local - 0.72) / 0.20));
            const opacity = fadeIn * fadeOut;

            const y = lerp(35, 0, fadeIn);
            const scaleText = lerp(0.96, 1, fadeIn);

            copy.style.opacity = String(opacity);
            copy.style.transform =
                `translate(-50%, calc(-50% + ${y}px)) scale(${scaleText})`;
        });

        const current = Math.min(
            copies.length,
            Math.floor(p * copies.length) + 1
        );

        if (number) number.textContent = String(current).padStart(2, "0");
        if (percent) percent.textContent = `${Math.round(p * 100)}%`;
        if (progressBar) progressBar.style.width = `${p * 100}%`;

        ticking = false;
    }

    function requestUpdate() {
        if (!ticking) {
            ticking = true;
            requestAnimationFrame(update);
        }
    }

    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    update();
}
