
export function renderHome() {
    const root = document.getElementById("home-page");
    if (!root) return;

    root.innerHTML = `
        <!-- HERO -->
        <section class="hero">

            <div class="hero-grid"></div>
            <div class="hero-glow"></div>

            <div class="hero-topline">
                <span>INDEPENDENT CREATIVE SPACE</span>
                <span>EST. 2026 — SOUTH KOREA</span>
            </div>

            <div class="hero-content">
                <div class="hero-label reveal">
                    <span class="hero-label-dot"></span>
                    WELCOME TO MARST
                </div>

                <h1 class="hero-title reveal delay-1">
                    Ideas into<br>
                    <span class="hero-title-highlight">reality.</span>
                </h1>

                <p class="hero-description reveal delay-2">
                    A space where ideas become something real.<br>
                    Exploring, building, and connecting beyond limits.
                </p>

                <div class="hero-actions reveal delay-3">
                    <a href="./history.html" class="button button-primary">
                        Explore Marst
                        <span class="button-arrow">↗</span>
                    </a>

                    <a href="#discover" class="button button-outline">
                        Discover more
                        <span class="button-arrow">↓</span>
                    </a>
                </div>
            </div>

            <div class="hero-art" aria-hidden="true">
                <div class="art-ring art-ring-1"></div>
                <div class="art-ring art-ring-2"></div>
                <div class="art-ring art-ring-3"></div>

                <div class="art-orb">
                    <div class="orb-inner"></div>
                </div>

                <div class="art-cross art-cross-1"></div>
                <div class="art-cross art-cross-2"></div>

                <div class="art-caption art-caption-1">
                    <span>01 / IDEAS</span>
                </div>

                <div class="art-caption art-caption-2">
                    <span>CREATION IN MOTION</span>
                </div>
            </div>

            <div class="hero-bottom">
                <div class="hero-bottom-left">
                    <span class="scroll-indicator"></span>
                    SCROLL TO EXPLORE
                </div>

                <div class="hero-bottom-right">
                    <span>CREATIVITY</span>
                    <span class="hero-bottom-divider"></span>
                    <span>TECHNOLOGY</span>
                    <span class="hero-bottom-divider"></span>
                    <span>IDEAS</span>
                </div>
            </div>
        </section>

        <!-- INTRO -->
        <section class="intro section" id="discover">
            <div class="container">
                <div class="intro-layout">

                    <div class="intro-left reveal">
                        <div class="section-label">01 — WHAT IS MARST</div>
                        <div class="intro-side-text">
                            NOT JUST<br>
                            AN IDEA.
                        </div>
                    </div>

                    <div class="intro-right">
                        <h2 class="intro-heading reveal">
                            The distance between<br>
                            <span class="muted-word">thinking</span> and
                            <span class="accent-word">creating</span><br>
                            is where we work.
                        </h2>

                        <p class="intro-paragraph reveal delay-1">
                            Marst is an independent space for exploration.
                            We turn curiosity into projects, thoughts into
                            experiments, and ideas into experiences.
                            Not everything needs to be perfect to begin.
                            It just needs to begin.
                        </p>

                        <a href="./history.html" class="text-link reveal delay-2">
                            Discover our story
                            <span>↗</span>
                        </a>
                    </div>

                </div>
            </div>
        </section>

        <!-- FOCUS -->
        <section class="focus-section section">
            <div class="container">

                <div class="focus-header reveal">
                    <div class="section-label">02 — OUR UNIVERSE</div>
                    <h2 class="section-title">
                        Different directions.<br>
                        <span class="muted-word">One curiosity.</span>
                    </h2>
                    <p class="focus-intro">
                        We don't limit ideas to a single category.
                        We explore wherever curiosity takes us.
                    </p>
                </div>

                <div class="focus-grid">

                    <article class="focus-card focus-card-large reveal">
                        <div class="focus-visual visual-code">
                            <div class="code-window">
                                <div class="code-window-top">
                                    <div class="code-dots">
                                        <i></i><i></i><i></i>
                                    </div>
                                    <span>experiment.js</span>
                                </div>

                                <div class="code-lines">
                                    <p><b>01</b> <span class="code-purple">const</span> idea = <span class="code-green">"something new"</span>;</p>
                                    <p><b>02</b></p>
                                    <p><b>03</b> <span class="code-purple">function</span> <span class="code-blue">create</span>() {</p>
                                    <p><b>04</b> &nbsp; <span class="code-orange">return</span> idea;</p>
                                    <p><b>05</b> }</p>
                                    <p><b>06</b></p>
                                    <p><b>07</b> <span class="code-muted">// Keep exploring.</span></p>
                                </div>
                            </div>
                        </div>

                        <div class="focus-card-info">
                            <div>
                                <span class="focus-number">01</span>
                                <h3>Technology</h3>
                            </div>
                            <p>Building things that didn't exist yesterday.</p>
                        </div>
                    </article>

                    <article class="focus-card reveal delay-1">
                        <div class="focus-visual visual-digital">
                            <div class="digital-circle">
                                <div class="digital-circle-inner">
                                    <span>M</span>
                                </div>
                            </div>
                            <div class="digital-line"></div>
                            <span class="digital-coordinate">35° / 128°</span>
                        </div>

                        <div class="focus-card-info">
                            <div>
                                <span class="focus-number">02</span>
                                <h3>Digital</h3>
                            </div>
                            <p>Experiences, interfaces and new possibilities.</p>
                        </div>
                    </article>

                    <article class="focus-card reveal">
                        <div class="focus-visual visual-ideas">
                            <div class="idea-shape idea-shape-1"></div>
                            <div class="idea-shape idea-shape-2"></div>
                            <div class="idea-shape idea-shape-3"></div>
                            <div class="idea-shape idea-shape-4"></div>
                            <span class="idea-center">IDEA<br>→ FORM</span>
                        </div>

                        <div class="focus-card-info">
                            <div>
                                <span class="focus-number">03</span>
                                <h3>Ideas</h3>
                            </div>
                            <p>Starting with a question. Going somewhere unexpected.</p>
                        </div>
                    </article>

                    <article class="focus-card reveal delay-1">
                        <div class="focus-visual visual-motion">
                            <div class="motion-frame">
                                <div class="motion-block"></div>
                                <div class="motion-block motion-block-2"></div>
                                <div class="motion-block motion-block-3"></div>
                            </div>
                            <span class="motion-label">FRAME / 001</span>
                        </div>

                        <div class="focus-card-info">
                            <div>
                                <span class="focus-number">04</span>
                                <h3>Creation</h3>
                            </div>
                            <p>Making, breaking, learning and making again.</p>
                        </div>
                    </article>

                </div>
            </div>
        </section>

        <!-- PROCESS -->
        <section class="process-section section">
            <div class="container">
                <div class="process-heading reveal">
                    <div class="section-label">03 — HOW WE MOVE</div>
                    <h2 class="section-title">
                        From nothing<br>
                        <span class="muted-word">to something.</span>
                    </h2>
                </div>

                <div class="process-list">

                    <div class="process-item reveal">
                        <span class="process-index">01</span>
                        <div class="process-name">Discover</div>
                        <p>Find the question worth asking.</p>
                        <span class="process-symbol">↗</span>
                    </div>

                    <div class="process-item reveal">
                        <span class="process-index">02</span>
                        <div class="process-name">Imagine</div>
                        <p>Explore what could be possible.</p>
                        <span class="process-symbol">↗</span>
                    </div>

                    <div class="process-item reveal">
                        <span class="process-index">03</span>
                        <div class="process-name">Create</div>
                        <p>Give an idea its first form.</p>
                        <span class="process-symbol">↗</span>
                   div>

                    <div class="process-item reveal">
                        <span class="process-index">04</span>
                        <div class="process-name">Connect</div>
                        <p>Bring things together in unexpected ways.</p>
                        <span class="process-symbol">↗</span>
                    </div>

                    <div class="process-item reveal">
                        <span class="process-index">05</span>
                        <div class="process-name">Realize</div>
                        <p>Turn possibility into reality.</p>
                        <span class="process-symbol">↗</span>
                    </div>

                </div>
            </div>
        </section>

        <!-- QUICK ACCESS -->
        <section class="access-section section">
            <div class="container">

                <div class="access-header reveal">
                    <div class="section-label">04 — TAKE A LOOK</div>
                    <h2 class="section-title">
                        Find your<br>
                        <span class="muted-word">way in.</span>
                    </h2>
                </div>

                <div class="access-grid">

                    <a href="./history.html" class="access-card reveal">
                        <span class="access-meta">01 / BACKGROUND</span>
                        <div class="access-content">
                            <h3>History</h3>
                            <p>Every beginning has a story.</p>
                        </div>
                        <span class="access-arrow">↗</span>
                    </a>

                    <a href="./quick-links.html" class="access-card reveal delay-1">
                        <span class="access-meta">02 / CONNECT</span>
                        <div class="access-content">
                            <h3>Quick Links</h3>
                            <p>Everything, in one place.</p>
                        </div>
                        <span class="access-arrow">↗</span>
                    </a>

                    <a href="./purchase.html" data-auth="true" class="access-card reveal delay-2">
                        <span class="access-meta">03 / SERVICES</span>
                        <div class="access-content">
                            <h3>Purchase</h3>
                            <p>Explore what you can get.</p>
                        </div>
                        <span class="access-arrow">↗</span>
                    </a>

                    <a href="./consult.html" data-auth="true" class="access-card reveal delay-3">
                        <span class="access-meta">04 / CONTACT</span>
                        <div class="access-content">
                            <h3>Consult</h3>
                            <p>Let's talk about your idea.</p>
                        </div>
                        <span class="access-arrow">↗</span>
                    </a>

                </div>
            </div>
        </section>

        <!-- FINAL CTA -->
        <section class="final-section">
            <div class="final-orb"></div>
            <div class="container final-container">

                <div class="section-label reveal">05 — YOUR NEXT STEP</div>

                <h2 class="final-title reveal">
                    An idea is only<br>
                    the <span>beginning.</span>
                </h2>

                <p class="final-description reveal delay-1">
                    What happens next is up to you.
                </p>

                <div class="final-actions reveal delay-2">
                    <a href="./history.html" class="button button-primary">
                        Start exploring <span class="button-arrow">↗</span>
                    </a>
                    <a href="./quick-links.html" class="button button-outline">
                        Quick links <span class="button-arrow">↗</span>
                    </a>
                </div>

                <div class="final-bottom-note">
                    MARST — IDEAS INTO REALITY.
                </div>
            </div>
        </section>
    `;
}
