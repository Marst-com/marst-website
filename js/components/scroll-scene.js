import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.170.0/build/three.module.js";

export function initScrollScene() {
    const section = document.querySelector("#story");
    const stage = section?.querySelector(".story-sticky");
    const canvas = section?.querySelector("#story-canvas");

    if (!section || !stage || !canvas || stage.dataset.initialized) return;
    stage.dataset.initialized = "true";

    const progressBar = document.querySelector("#story-progress-bar");
    const progressNumber = document.querySelector("#story-progress-number");
    const caption = document.querySelector("#story-caption");

    const clamp = (v, a = 0, b = 1) => Math.max(a, Math.min(b, v));
    const lerp = (a, b, t) => a + (b - a) * t;
    const smooth = (a, b, x) => {
        const t = clamp((x - a) / (b - a));
        return t * t * (3 - 2 * t);
    };

    let progress = 0;
    let currentMode = "before";
    let frame = 0;
    let activeCaption = -1;
    let width = 1;
    let height = 1;

    // ==============================
    // THREE.JS
    // ==============================

    const renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true,
        alpha: false,
        powerPreference: "high-performance"
    });

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#080908");
    scene.fog = new THREE.FogExp2("#080908", 0.018);

    const camera = new THREE.PerspectiveCamera(
        38,
        window.innerWidth / window.innerHeight,
        0.1,
        100
    );

    camera.position.set(0, 0, 13);

    // ==============================
    // LIGHTS
    // ==============================

    scene.add(new THREE.AmbientLight(0xffffff, 0.65));

    const keyLight = new THREE.PointLight(0xdfff72, 90, 35);
    keyLight.position.set(4, 5, 5);
    scene.add(keyLight);

    const whiteLight = new THREE.PointLight(0xffffff, 120, 30);
    whiteLight.position.set(-5, 3, 6);
    scene.add(whiteLight);

    const rimLight = new THREE.PointLight(0x8ea4ff, 65, 30);
    rimLight.position.set(0, -5, -5);
    scene.add(rimLight);

    // ==============================
    // MATERIALS
    // ==============================

    const limeMetal = new THREE.MeshStandardMaterial({
        color: 0xdfff72,
        metalness: 0.8,
        roughness: 0.24
    });

    const darkMetal = new THREE.MeshStandardMaterial({
        color: 0x242824,
        metalness: 0.86,
        roughness: 0.3
    });

    const silver = new THREE.MeshStandardMaterial({
        color: 0xb9c0bd,
        metalness: 0.92,
        roughness: 0.19
    });

    const blackGlass = new THREE.MeshPhysicalMaterial({
        color: 0x101512,
        metalness: 0.45,
        roughness: 0.15,
        transmission: 0.15,
        thickness: 0.8,
        transparent: true,
        opacity: 0.94
    });

    const glass = new THREE.MeshPhysicalMaterial({
        color: 0xc9e0cf,
        metalness: 0.1,
        roughness: 0.1,
        transmission: 0.7,
        thickness: 0.5,
        transparent: true,
        opacity: 0.65
    });

    const glowMaterial = new THREE.MeshBasicMaterial({
        color: 0xdfff72
    });

    // ==============================
    // WORLD
    // ==============================

    const world = new THREE.Group();
    scene.add(world);

    const mainObject = new THREE.Group();
    world.add(mainObject);

    const cubeGeometry = new THREE.BoxGeometry(1.15, 1.15, 1.15);

    const mainCube = new THREE.Mesh(cubeGeometry, limeMetal);
    mainObject.add(mainCube);

    const innerCube = new THREE.Mesh(
        new THREE.BoxGeometry(0.72, 0.72, 0.72),
        darkMetal
    );
    mainObject.add(innerCube);

    const cubeWire = new THREE.LineSegments(
        new THREE.EdgesGeometry(new THREE.BoxGeometry(1.42, 1.42, 1.42)),
        new THREE.LineBasicMaterial({
            color: 0xdfff72,
            transparent: true,
            opacity: 0.5
        })
    );
    mainObject.add(cubeWire);

    // 작은 중심 큐브
    const core = new THREE.Mesh(
        new THREE.BoxGeometry(0.25, 0.25, 0.25),
        glowMaterial
    );
    mainObject.add(core);

    // ==============================
    // MULTI ELEMENTS
    // ==============================

    const modules = [];

    const geometries = [
        new THREE.BoxGeometry(0.7, 0.7, 0.7),
        new THREE.BoxGeometry(0.45, 0.45, 0.45),
        new THREE.BoxGeometry(1.1, 0.12, 0.75),
        new THREE.BoxGeometry(0.12, 1.0, 0.65),
        new THREE.BoxGeometry(0.8, 0.08, 0.8),
        new THREE.BoxGeometry(0.28, 0.28, 0.28)
    ];

    const materials = [
        limeMetal,
        darkMetal,
        silver,
        blackGlass,
        glass
    ];

    // Deterministic pseudo-random
    let seed = 9382;
    function random() {
        seed = (seed * 16807) % 2147483647;
        return (seed - 1) / 2147483646;
    }

    for (let i = 0; i < 72; i++) {
        const group = new THREE.Group();

        const geometry = geometries[Math.floor(random() * geometries.length)];
        const material = materials[Math.floor(random() * materials.length)];

        const mesh = new THREE.Mesh(geometry, material);

        mesh.castShadow = false;
        mesh.receiveShadow = false;

        group.add(mesh);

        // Some pieces have wireframes
        if (i % 4 === 0) {
            const edges = new THREE.LineSegments(
                new THREE.EdgesGeometry(geometry),
                new THREE.LineBasicMaterial({
                    color: i % 8 === 0 ? 0xdfff72 : 0xffffff,
                    transparent: true,
                    opacity: 0.25
                })
            );
            group.add(edges);
        }

        // Starting position: around the core
        const startRadius = 0.8 + random() * 1.4;

        const angle = random() * Math.PI * 2;
        const vertical = (random() - 0.5) * 2.8;

        const start = new THREE.Vector3(
            Math.cos(angle) * startRadius,
            vertical,
            Math.sin(angle) * startRadius
        );

        // Expanded position: huge geometric architecture
        const end = new THREE.Vector3(
            (random() - 0.5) * 12,
            (random() - 0.5) * 7,
            (random() - 0.5) * 6
        );

        // Service/interface formation
        const service = new THREE.Vector3(
            (i % 12 - 5.5) * 0.72,
            (Math.floor(i / 12) - 2) * 0.8,
            (random() - 0.5) * 0.7
        );

        const scaleStart = 0.15 + random() * 0.55;
        const scaleEnd = 0.65 + random() * 1.2;

        group.position.copy(start);
        group.scale.setScalar(scaleStart);

        group.rotation.set(
            random() * Math.PI,
            random() * Math.PI,
            random() * Math.PI
        );

        world.add(group);

        modules.push({
            group,
            start,
            end,
            service,
            startRotation: group.rotation.clone(),
            endRotation: new THREE.Euler(
                random() * Math.PI * 2,
                random() * Math.PI * 2,
                random() * Math.PI * 2
            ),
            scaleStart,
            scaleEnd,
            phase: random() * Math.PI * 2,
            speed: 0.5 + random() * 1.5
        });
    }

    // ==============================
    // FLOATING PLATES
    // ==============================

    const plates = [];

    for (let i = 0; i < 16; i++) {
        const geo = new THREE.BoxGeometry(
            1.2 + random() * 2,
            0.035,
            1.2 + random() * 2
        );

        const plate = new THREE.Mesh(
            geo,
            i % 3 === 0 ? silver : darkMetal
        );

        const start = new THREE.Vector3(
            (random() - 0.5) * 3,
            (random() - 0.5) * 3,
            (random() - 0.5) * 3
        );

        const end = new THREE.Vector3(
            (random() - 0.5) * 15,
            (random() - 0.5) * 9,
            -2 - random() * 3
        );

        plate.position.copy(start);
        plate.rotation.set(random(), random(), random());

        world.add(plate);

        plates.push({
            mesh: plate,
            start,
            end,
            phase: random() * Math.PI * 2
        });
    }

    // ==============================
    // PARTICLES
    // ==============================

    const particleCount = 500;

    const particlePositions = new Float32Array(particleCount * 3);
    const particleSeeds = [];

    for (let i = 0; i < particleCount; i++) {
        const x = (random() - 0.5) * 22;
        const y = (random() - 0.5) * 13;
        const z = (random() - 0.5) * 15;

        particlePositions[i * 3] = x;
        particlePositions[i * 3 + 1] = y;
        particlePositions[i * 3 + 2] = z;

        particleSeeds.push({
            x,
            y,
            z,
            phase: random() * Math.PI * 2,
            speed: 0.3 + random() * 1.4
        });
    }

    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute(
        "position",
        new THREE.BufferAttribute(particlePositions, 3)
    );

    const particleMaterial = new THREE.PointsMaterial({
        color: 0xdfff72,
        size: 0.025,
        transparent: true,
        opacity: 0.5,
        depthWrite: false
    });

    const particles = new THREE.Points(
        particleGeometry,
        particleMaterial
    );

    scene.add(particles);

    // ==============================
    // RINGS
    // ==============================

    const rings = [];

    for (let i = 0; i < 8; i++) {
        const ring = new THREE.Mesh(
            new THREE.TorusGeometry(1.5 + i * 0.35, 0.008, 8, 160),
            new THREE.MeshBasicMaterial({
                color: i % 2 ? 0x85945c : 0xdfff72,
                transparent: true,
                opacity: 0.22
            })
        );

        ring.rotation.x = Math.PI / 2 + random();
        ring.rotation.y = random() * Math.PI;

        world.add(ring);

        rings.push({
            mesh: ring,
            initialScale: 0.6 + random() * 0.6
        });
    }

    // ==============================
    // FLOOR
    // ==============================

    const floor = new THREE.Mesh(
        new THREE.PlaneGeometry(200, 200),
        new THREE.MeshStandardMaterial({
            color: 0x080908,
            metalness: 0.3,
            roughness: 0.7
        })
    );

    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -5;
    scene.add(floor);

    // ==============================
    // SCROLL PIN
    // ==============================

    function getMetrics() {
        const rect = section.getBoundingClientRect();
        const top = window.scrollY + rect.top;

        return {
            start: top,
            end: top + section.offsetHeight - window.innerHeight
        };
    }

    function pin() {
        if (stage.parentElement !== document.body) {
            document.body.appendChild(stage);
        }

        stage.classList.add("story-pinned");
        stage.classList.remove("story-ended");

        stage.style.position = "fixed";
        stage.style.top = "0";
        stage.style.left = "0";
        stage.style.bottom = "auto";
        stage.style.right = "0";
        stage.style.width = "100vw";
        stage.style.height = "100vh";
        stage.style.zIndex = "20";

        currentMode = "pinned";
    }

    function unpin() {
        if (stage.parentElement !== section) {
            section.appendChild(stage);
        }

        stage.classList.remove("story-pinned", "story-ended");

        stage.style.position = "absolute";
        stage.style.top = "0";
        stage.style.left = "0";
        stage.style.bottom = "auto";
        stage.style.right = "auto";
        stage.style.width = "100%";
        stage.style.height = "100vh";
        stage.style.zIndex = "10";

        currentMode = "before";
    }

    function finishPin() {
        if (stage.parentElement !== section) {
            section.appendChild(stage);
        }

        stage.classList.remove("story-pinned");
        stage.classList.add("story-ended");

        stage.style.position = "absolute";
        stage.style.top = "auto";
        stage.style.bottom = "0";
        stage.style.left = "0";
        stage.style.right = "auto";
        stage.style.width = "100%";
        stage.style.height = "100vh";
        stage.style.zIndex = "10";

        currentMode = "after";
    }

    function updatePin() {
        const m = getMetrics();
        const y = window.scrollY;

        if (y < m.start) {
            if (currentMode !== "before") unpin();
            progress = 0;
            return;
        }

        if (y >= m.end) {
            if (currentMode !== "after") finishPin();
            progress = 1;
            return;
        }

        if (currentMode !== "pinned") pin();

        progress = clamp((y - m.start) / Math.max(1, m.end - m.start));
    }

    // ==============================
    // STORY TEXT
    // ==============================

    const captions = [
        [0.00, "01 / IDEA", "Everything<br>starts <em>small.</em>", "One thought. One shape. One possibility."],
        [0.13, "02 / FORM", "A thought<br>takes <em>shape.</em>", "A single form begins to unfold."],
        [0.27, "03 / EXPLORE", "More than<br>one <em>possibility.</em>", "One shape becomes a world of ideas."],
        [0.42, "04 / BUILD", "Pieces become<br><em>something bigger.</em>", "Every element finds its place."],
        [0.57, "05 / CREATE", "From abstract<br>to <em>real.</em>", "A concept becomes something tangible."],
        [0.72, "06 / EXPERIENCE", "Built to be<br><em>experienced.</em>", "Technology meets design."],
        [0.86, "07 / MARST", "Ideas into<br><em>reality.</em>", "I build what I imagine."]
    ];

    function updateCaption(p) {
        let index = 0;

        for (let i = 0; i < captions.length; i++) {
            if (p >= captions[i][0]) index = i;
        }

        if (index === activeCaption) return;
        activeCaption = index;

        const c = captions[index];

        if (!caption) return;

        caption.style.opacity = "0";
        caption.style.transform = "translateY(18px)";

        setTimeout(() => {
            if (!caption.isConnected) return;

            const indexEl = caption.querySelector(".story-caption-index");
            const titleEl = caption.querySelector("h2");
            const descEl = caption.querySelector("p");

            if (indexEl) indexEl.textContent = c[1];
            if (titleEl) titleEl.innerHTML = c[2];
            if (descEl) descEl.textContent = c[3];

            caption.style.opacity = "1";
            caption.style.transform = "translateY(0)";
        }, 180);
    }

    // ==============================
    // CAMERA
    // ==============================

    function updateCamera(p) {
        const expansion = smooth(0.1, 0.55, p);
        const layout = smooth(0.55, 0.82, p);
        const final = smooth(0.82, 1, p);

        const mobile = window.innerWidth < 768;

        const initialX = mobile ? 0 : 1.2;
        const expandedX = mobile ? 0 : 2.5;
        const serviceX = 0;

        camera.position.x = lerp(initialX, expandedX, expansion);
        camera.position.x = lerp(camera.position.x, serviceX, layout);

        camera.position.y = Math.sin(p * Math.PI * 2) * 0.4;
        camera.position.z = lerp(13, 19, expansion);
        camera.position.z = lerp(camera.position.z, 16, layout);
        camera.position.z = lerp(camera.position.z, 12, final);

        camera.lookAt(0, 0, 0);

        camera.fov = lerp(38, 52, expansion);
        camera.fov = lerp(camera.fov, 43, layout);
        camera.updateProjectionMatrix();
    }

    // ==============================
    // MORPH
    // ==============================

    function updateObjects(p) {
        const designPhase = smooth(0.08, 0.30, p);
        const codePhase = smooth(0.30, 0.52, p);
        const webPhase = smooth(0.52, 0.74, p);
        const servicePhase = smooth(0.74, 0.91, p);
        const finalPhase = smooth(0.91, 1, p);

        const mobile = window.innerWidth < 768;
        const spacing = mobile ? 0.48 : 0.68;

        // 각 요소의 정돈된 목적지 생성
        function designPosition(i) {
            const col = i % 9;
            const row = Math.floor(i / 9);

            return new THREE.Vector3(
                (col - 4) * spacing,
                (3.5 - row) * spacing,
                ((col + row) % 3) * 0.12
            );
        }

        // 코드 에디터 형태
        function codePosition(i) {
            const row = Math.floor(i / 12);
            const col = i % 12;

            const lengths = [7, 10, 5, 9, 6, 11];

            const visible = col < (lengths[row % lengths.length] || 5);

            return new THREE.Vector3(
                -3.9 + col * 0.7,
                2.2 - row * 0.62,
                visible ? 0.2 + (row % 2) * 0.15 : -0.3
            );
        }

        // 브라우저 레이아웃
        function webPosition(i) {
            const col = i % 9;
            const row = Math.floor(i / 9);

            let x = (col - 4) * 0.68;
            let y = (3.5 - row) * 0.68;

            // 상단 내비게이션
            if (row === 0) {
                y = 2.6;
                x = (col - 4) * 0.68;
            }

            // 메인 콘텐츠 영역
            if (row >= 1 && row <= 4) {
                y = 1.6 - (row - 1) * 0.68;
            }

            // 하단 영역
            if (row >= 5) {
                y = -2.1 - (row - 5) * 0.55;
            }

            return new THREE.Vector3(x, y, 0);
        }

        // 대시보드 형태
        function servicePosition(i) {
            const col = i % 9;
            const row = Math.floor(i / 9);

            const x = (col - 4) * 0.68;
            const y = (3.5 - row) * 0.68;

            return new THREE.Vector3(x, y, 0);
        }

        function mixPosition(a, b, t) {
            return a.clone().lerp(b, t);
        }

        // 최초 큐브
        mainObject.position.set(0, 0, 0);
        mainObject.scale.setScalar(
            lerp(1, 0.22, designPhase)
        );

        mainObject.rotation.set(
            p * 0.5,
            p * Math.PI * 0.8,
            p * 0.2
        );

        mainCube.material = p > 0.52 ? silver : limeMetal;

        innerCube.scale.setScalar(lerp(1, 0.3, designPhase));
        innerCube.rotation.set(p, p * 1.2, 0);

        cubeWire.scale.setScalar(lerp(1, 1.8, designPhase));

        // 사각형 모듈
        modules.forEach((item, i) => {
            const { group } = item;

            const start = item.start.clone().multiplyScalar(0.25);
            const design = designPosition(i);
            const code = codePosition(i);
            const web = webPosition(i);
            const service = servicePosition(i);

            let target = start;

            // 하나의 큐브에서 디자인 구조로
            target = mixPosition(target, design, designPhase);

            // 디자인에서 코드 구조로
            target = mixPosition(target, code, codePhase);

            // 코드에서 웹 레이아웃으로
            target = mixPosition(target, web, webPhase);

            // 웹에서 서비스 대시보드로
            target = mixPosition(target, service, servicePhase);

            // 작은 깊이 차이로 입체감 유지
            const depth = Math.sin(i * 1.7) * 0.12;

            target.z += depth;

            group.position.copy(target);

            // 요소별 무작위 회전 제거
            // 회전도 일정한 패턴으로 정렬
            const rotation = lerp(
                Math.PI * 0.25,
                0,
                Math.max(designPhase, codePhase, webPhase, servicePhase)
            );

            group.rotation.set(
                rotation * 0.3,
                rotation * 0.5,
                rotation
            );

            // 사각형 크기 통일감
            const scale = lerp(
                0.2,
                0.62,
                designPhase
            );

            group.scale.setScalar(scale);

            // 마지막에는 중심으로 모임
            group.position.lerp(
                new THREE.Vector3(
                    (i % 9 - 4) * 0.12,
                    (Math.floor(i / 9) - 3.5) * 0.12,
                    0
                ),
                finalPhase
            );

            group.scale.multiplyScalar(
                lerp(1, 0.35, finalPhase)
            );
        });

        // 바닥 판도 구조에 맞춰 정렬
        plates.forEach((item, i) => {
            const col = i % 4;
            const row = Math.floor(i / 4);

            const target = new THREE.Vector3(
                (col - 1.5) * 2.1,
                (1.5 - row) * 1.5,
                -0.6
            );

            item.mesh.position.lerp(target, designPhase);

            item.mesh.rotation.x = lerp(
                item.mesh.rotation.x,
                0,
                designPhase
            );

            item.mesh.rotation.z = lerp(
                item.mesh.rotation.z,
                0,
                designPhase
            );

            item.mesh.scale.setScalar(
                lerp(0.2, 0.8, designPhase)
            );
        });

        // 링은 장식이 아닌 구조를 강조하는 역할
        rings.forEach((item, i) => {
            const ring = item.mesh;

            ring.scale.setScalar(
                lerp(0.4, 1.4 + i * 0.1, designPhase)
            );

            ring.rotation.set(
                Math.PI / 2,
                0,
                0
            );

            ring.material.opacity =
                0.12 * (1 - servicePhase);
        });

        // 파티클도 중심에서 바깥으로 확장
        const positions = particleGeometry.attributes.position.array;

        particleSeeds.forEach((s, i) => {
            const expansion = designPhase;

            positions[i * 3] =
                s.x * expansion;

            positions[i * 3 + 1] =
                s.y * expansion;

            positions[i * 3 + 2] =
                s.z * expansion;
        });

        particleGeometry.attributes.position.needsUpdate = true;
    }

    // ==============================
    // ANIMATION
    // ==============================

    function render() {
        updateObjects(progress);
        updateCamera(progress);

        world.rotation.y = lerp(-0.2, 0.18, progress);
        world.rotation.x = Math.sin(progress * Math.PI) * 0.08;

        renderer.render(scene, camera);
    }

    // ==============================
    // RESIZE
    // ==============================

    function resize() {
        width = window.innerWidth;
        height = window.innerHeight;

        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
        renderer.setSize(width, height, false);

        camera.aspect = width / height;
        camera.updateProjectionMatrix();

        render();
    }

    // ==============================
    // SCROLL LOOP
    // ==============================

    function onScroll() {
        if (frame) return;

        frame = requestAnimationFrame(() => {
            frame = 0;

            updatePin();

            render();

            updateCaption(progress);

            if (progressBar) {
                progressBar.style.width = `${progress * 100}%`;
            }

            if (progressNumber) {
                progressNumber.textContent = String(
                    Math.round(progress * 100)
                ).padStart(3, "0");
            }
        });
    }

    // ==============================
    // INIT
    // ==============================

    section.style.position = "relative";
    section.style.overflow = "visible";

    stage.classList.remove("story-pinned", "story-ended");
    stage.style.position = "absolute";
    stage.style.top = "0";
    stage.style.left = "0";
    stage.style.bottom = "auto";
    stage.style.width = "100%";
    stage.style.height = "100vh";

    resize();

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", resize);

    console.log("[MARST] 3D Scroll Experience Initialized");
}
