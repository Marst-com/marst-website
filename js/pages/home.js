export function renderHome() {
  const root = document.querySelector("#home-page");
  if (!root) return;

  root.innerHTML = `
    <!-- HERO -->
    <section class="marst-hero">
      <div class="hero-noise"></div>

      <div class="hero-content">
        <span class="hero-eyebrow">INDEPENDENT CREATOR · DEVELOPER</span>

        <h1>
          Ideas don't just<br>
          <span>stay ideas.</span>
        </h1>

        <p>
          I turn thoughts into code, code into products,<br>
          and products into something real.
        </p>

        <a href="#story" class="hero-scroll">
          <span>EXPLORE THE PROCESS</span>
          <span class="hero-arrow">↓</span>
        </a>
      </div>

      <div class="hero-side-label">MARST / DIGITAL CREATION</div>
      <div class="hero-bottom-label">SCROLL TO EXPLORE — 01</div>
    </section>

    <!-- CONTINUOUS SCROLL ART -->
    <section class="scroll-story" id="story">
      <div class="story-sticky">
        <canvas id="story-canvas"></canvas>

        <div class="story-top">
          <span>MARST — VISUAL JOURNEY</span>
          <span id="story-progress-number">000</span>
        </div>

        <div class="story-copy">
          <div class="story-copy-inner" id="story-caption">
            <span class="story-caption-index">01 / IDEA</span>
            <h2>Everything<br>starts <em>small.</em></h2>
            <p>One thought. One shape. One possibility.</p>
          </div>
        </div>

        <div class="story-bottom">
          <span>ONE IDEA. CONTINUOUS EVOLUTION.</span>
          <div class="story-progress-track">
            <div id="story-progress-bar"></div>
          </div>
          <span>SCROLL TO TRANSFORM</span>
        </div>
      </div>
    </section>

    <!-- INTRO -->
    <section class="home-intro section-padding">
      <div class="intro-grid">
        <div class="intro-label reveal">
          <span class="section-tag">01 — ABOUT</span>
        </div>

        <div class="intro-main reveal">
          <h2>
            Not just building things.<br>
            <span>Building what comes next.</span>
          </h2>

          <p>
            I'm Marst. I explore programming, technology, AI, and ideas.
            I enjoy taking something that doesn't exist yet and turning it
            into something people can actually experience.
          </p>

          <p>
            From small experiments to ambitious projects,
            I keep learning, building, and moving forward.
          </p>
        </div>
      </div>
    </section>

    <!-- FOCUS -->
    <section class="home-focus section-padding">
      <div class="section-heading reveal">
        <span class="section-tag">02 — WHAT I EXPLORE</span>
        <h2>Different fields.<br><span>One direction.</span></h2>
      </div>

      <div class="focus-list">
        <article class="focus-row reveal">
          <span class="focus-number">01</span>
          <div class="focus-main">
            <h3>Software & Development</h3>
            <p>Turning ideas into programs, systems, and real experiences.</p>
          </div>
          <span class="focus-symbol">↗</span>
        </article>

        <article class="focus-row reveal">
          <span class="focus-number">02</span>
          <div class="focus-main">
            <h3>Artificial Intelligence</h3>
            <p>Exploring intelligent systems and new ways to build with AI.</p>
          </div>
          <span class="focus-symbol">↗</span>
        </article>

        <article class="focus-row reveal">
          <span class="focus-number">03</span>
          <div class="focus-main">
            <h3>Digital Products</h3>
            <p>Creating tools and services that make things simpler.</p>
          </div>
          <span class="focus-symbol">↗</span>
        </article>

        <article class="focus-row reveal">
          <span class="focus-number">04</span>
          <div class="focus-main">
            <h3>Ideas & Experiments</h3>
            <p>Trying, testing, breaking, learning, and trying again.</p>
          </div>
          <span class="focus-symbol">↗</span>
        </article>
      </div>
    </section>

    <!-- STATEMENT -->
    <section class="home-statement">
      <div class="statement-content reveal">
        <span class="section-tag">03 — MY APPROACH</span>
        <h2>
          Think beyond<br>
          <span>what exists.</span>
        </h2>
        <p>
          The best way to predict the future<br>
          is to start creating it.
        </p>
      </div>
      <div class="statement-decoration"></div>
    </section>

    <!-- PROJECTS -->
    <section class="home-projects section-padding">
      <div class="section-heading reveal">
        <span class="section-tag">04 — PROJECTS</span>
        <h2>From imagination<br><span>to implementation.</span></h2>
        <p class="section-description">
          A collection of things I've been creating, exploring, and developing.
        </p>
      </div>

      <div class="project-grid">
        <a class="project-card project-large reveal" href="quick-links.html">
          <div class="project-art project-art-ieum">
            <div class="project-art-glow"></div>
            <span class="project-art-word">IEUM</span>
            <span class="project-art-sub">CONNECTING IDEAS & RESULTS</span>
          </div>
          <div class="project-info">
            <div>
              <h3>IEUM</h3>
              <p>Projects · Tools · Digital Products</p>
            </div>
            <span class="project-arrow">↗</span>
          </div>
        </a>

        <a class="project-card reveal" href="quick-links.html">
          <div class="project-art project-art-code">
            <div class="code-art-lines">
              <span>const idea = new Project();</span>
              <span>idea.build();</span>
              <span>idea.create();</span>
              <span class="code-art-highlight">// Make it real.</span>
            </div>
          </div>
          <div class="project-info">
            <div>
              <h3>Experiments</h3>
              <p>Code & explorations</p>
            </div>
            <span class="project-arrow">↗</span>
          </div>
        </a>
      </div>
    </section>

    <!-- LINKS -->
    <section class="home-links section-padding">
      <div class="links-heading reveal">
        <span class="section-tag">05 — CONNECT</span>
        <h2>Find me<br><span>around the internet.</span></h2>
      </div>

      <div class="home-link-list">
        <a href="quick-links.html" class="home-link-row reveal">
          <span>01</span>
          <h3>All Links</h3>
          <span>↗</span>
        </a>

        <a href="history.html" class="home-link-row reveal">
          <span>02</span>
          <h3>My History</h3>
          <span>↗</span>
        </a>

        <a href="consult.html" class="home-link-row reveal">
          <span>03</span>
          <h3>Contact / Consult</h3>
          <span>↗</span>
        </a>
      </div>
    </section>

    <!-- END -->
    <section class="home-end">
      <div class="end-inner reveal">
        <span class="section-tag">THE JOURNEY CONTINUES</span>
        <h2>Still <span>building.</span></h2>
        <p>There is always something more to create.</p>
        <a href="#" class="end-top-button">
          BACK TO TOP <span>↑</span>
        </a>
      </div>
    </section>
  `;

  document.querySelector(".end-top-button")?.addEventListener("click", (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}
