
export function renderHome() {
  const root = document.querySelector("#home-page");
  if (!root) return;

  root.innerHTML = `
    <!-- =========================================
         HERO
    ========================================== -->
    <section class="marst-hero" id="hero">
      <div class="hero-grain"></div>
      <div class="hero-topline">
        <span>INDEPENDENT CREATOR</span>
        <span>TECH / DESIGN / IDEAS</span>
      </div>

      <div class="hero-main">
        <div class="hero-eyebrow">
          <span class="live-dot"></span>
          <span>WELCOME TO MY WORLD</span>
        </div>

        <h1>
          Ideas don't<br>
          <span>stay ideas.</span>
        </h1>

        <p>
          생각을 떠올리는 데서 멈추지 않는다.<br>
          직접 만들고, 움직이고, 현실로.
        </p>

        <a href="#experience" class="hero-continue">
          <span>SCROLL TO EXPERIENCE</span>
          <span class="hero-continue-arrow">↓</span>
        </a>
      </div>

      <div class="hero-side-text">M / 2026</div>

      <div class="hero-bottomline">
        <span>MARST</span>
        <span>IDEAS INTO REALITY</span>
        <span>01 — 06</span>
      </div>
    </section>


    <!-- =========================================
         SCROLL EXPERIENCE
    ========================================== -->
    <section class="experience" id="experience">
      <div class="experience-sticky">

        <div class="experience-bg">
          <div class="experience-grid"></div>
          <div class="experience-vignette"></div>
        </div>

        <div class="experience-top">
          <span class="experience-brand">MARST / EXPERIMENT 001</span>
          <span class="experience-status">
            <span class="live-dot"></span>
            <span id="experience-status">INITIALIZING</span>
          </span>
        </div>

        <!-- Main stage -->
        <div class="experience-stage">

          <!-- The square -->
          <div class="transform-object" id="transform-object">
            <div class="transform-square" id="transform-square">
              <div class="square-inner"></div>
              <div class="square-cross square-cross-x"></div>
              <div class="square-cross square-cross-y"></div>
              <div class="square-corner square-corner-1"></div>
              <div class="square-corner square-corner-2"></div>
              <div class="square-corner square-corner-3"></div>
              <div class="square-corner square-corner-4"></div>
            </div>
          </div>

          <!-- Orbit -->
          <div class="object-orbit orbit-a"></div>
          <div class="object-orbit orbit-b"></div>
          <div class="object-orbit orbit-c"></div>

          <!-- Browser -->
          <div class="browser-window" id="browser-window">
            <div class="browser-toolbar">
              <div class="browser-dots">
                <i></i><i></i><i></i>
              </div>
              <div class="browser-address">
                <span>✦</span>
                marst.studio/creation
              </div>
              <div class="browser-toolbar-right">↗</div>
            </div>

            <div class="browser-content">
              <div class="browser-nav">
                <div class="browser-logo">M.</div>
                <div class="browser-nav-items">
                  <span>ABOUT</span>
                  <span>WORK</span>
                  <span>CONTACT</span>
                </div>
              </div>

              <div class="browser-hero">
                <div class="browser-small-label">CREATIVE TECHNOLOGY</div>
                <div class="browser-title">
                  MAKE IT<br>
                  <span>REAL.</span>
                </div>
                <div class="browser-description">
                  Ideas become something<br>
                  you can experience.
                </div>
                <div class="browser-button">EXPLORE ↗</div>
              </div>

              <div class="browser-decoration">
                <div class="browser-decoration-square"></div>
                <div class="browser-decoration-circle"></div>
              </div>
            </div>
          </div>

          <!-- Code editor -->
          <div class="code-editor" id="code-editor">
            <div class="editor-titlebar">
              <div class="editor-dots">
                <i></i><i></i><i></i>
              </div>
              <span>index.html</span>
              <span class="editor-right-label">HTML · LIVE</span>
            </div>

            <div class="editor-body">
              <div class="editor-lines" id="editor-lines">
                <div><span class="ln">01</span><span class="tag">&lt;main</span> <span class="attr">class</span>=<span class="str">"world"</span><span class="tag">&gt;</span></div>
                <div><span class="ln">02</span>&nbsp;&nbsp;<span class="tag">&lt;section</span> <span class="attr">class</span>=<span class="str">"ideas"</span><span class="tag">&gt;</span></div>
                <div><span class="ln">03</span>&nbsp;&nbsp;&nbsp;&nbsp;<span class="tag">&lt;h1&gt;</span></div>
                <div><span class="ln">04</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Ideas into reality.</div>
                <div><span class="ln">05</span>&nbsp;&nbsp;&nbsp;&nbsp;<span class="tag">&lt;/h1&gt;</span></div>
                <div><span class="ln">06</span>&nbsp;&nbsp;&nbsp;&nbsp;<span class="tag">&lt;p&gt;</span>Keep creating.<span class="tag">&lt;/p&gt;</span></div>
                <div><span class="ln">07</span>&nbsp;&nbsp;<span class="tag">&lt;/section&gt;</span></div>
                <div><span class="ln">08</span><span class="tag">&lt;/main&gt;</span></div>
                <div class="editor-cursor-line"><span class="ln">09</span><span class="typing-cursor"></span></div>
              </div>
            </div>

            <div class="editor-footer">
              <span><i class="live-dot"></i> BUILD SUCCESS</span>
              <span>HTML5</span>
            </div>
          </div>

          <!-- Service UI -->
          <div class="service-ui" id="service-ui">

            <div class="service-topbar">
              <div class="service-logo">
                <span class="service-logo-mark">M</span>
                <span>MARST</span>
              </div>

              <div class="service-nav">
                <span>Overview</span>
                <span>Projects</span>
                <span>Studio</span>
              </div>

              <div class="service-profile">
                <span>MS</span>
              </div>
            </div>

            <div class="service-body">

              <div class="service-sidebar">
                <span class="sidebar-active">◈ &nbsp; Overview</span>
                <span>▦ &nbsp; Projects</span>
                <span>⌘ &nbsp; Workspace</span>
                <span>↗ &nbsp; Analytics</span>
                <span>⚙ &nbsp; Settings</span>
              </div>

              <div class="service-main">
                <div class="service-welcome">
                  <div>
                    <span class="service-date">MONDAY, NOVEMBER 24</span>
                    <h2>Make something<br>remarkable.</h2>
                  </div>
                  <div class="service-hero-icon">↗</div>
                </div>

                <div class="service-stats">
                  <div class="service-stat">
                    <span>PROJECTS</span>
                    <strong>08</strong>
                    <small>Ideas in progress</small>
                  </div>
                  <div class="service-stat">
                    <span>CREATED</span>
                    <strong>24<span>+</span></strong>
                    <small>Experiments & builds</small>
                  </div>
                  <div class="service-stat">
                    <span>STATUS</span>
                    <strong class="stat-live">ACTIVE</strong>
                    <small>Always building</small>
                  </div>
                </div>

                <div class="service-projects">
                  <div class="service-project-header">
                    <span>RECENT PROJECTS</span>
                    <span>VIEW ALL ↗</span>
                  </div>

                  <div class="service-project-row">
                    <div class="project-icon project-icon-1">I</div>
                    <div class="project-name">
                      <strong>IEUM Studio</strong>
                      <small>Creative tools</small>
                    </div>
                    <div class="project-status">IN DEVELOPMENT</div>
                  </div>

                  <div class="service-project-row">
                    <div class="project-icon project-icon-2">⌘</div>
                    <div class="project-name">
                      <strong>Digital Lab</strong>
                      <small>Technology</small>
                    </div>
                    <div class="project-status project-status-live">ACTIVE</div>
                  </div>

                  <div class="service-project-row">
                    <div class="project-icon project-icon-3">↗</div>
                    <div class="project-name">
                      <strong>Next Idea</strong>
                      <small>Exploration</small>
                    </div>
                    <div class="project-status">PLANNING</div>
                  </div>
                </div>

              </div>
            </div>
          </div>

          <!-- Final object -->
          <div class="final-object" id="final-object">
            <div class="final-object-ring"></div>
            <div class="final-object-ring final-object-ring-2"></div>
            <div class="final-object-core">M.</div>
          </div>

          <!-- Text stages -->
          <div class="experience-copy" id="experience-copy">
            <div class="experience-text text-stage-1">
              <span class="stage-number">01 / AN IDEA</span>
              <h2>모든 것은<br>작은 생각에서.</h2>
              <p>Something begins.</p>
            </div>

            <div class="experience-text text-stage-2">
              <span class="stage-number">02 / MOVEMENT</span>
              <h2>생각은<br>움직이기 시작한다.</h2>
              <p>It doesn't have to stay still.</p>
            </div>

            <div class="experience-text text-stage-3">
              <span class="stage-number">03 / CREATION</span>
              <h2>직접 만들고<br>형태를 갖추고.</h2>
              <p>From imagination to structure.</p>
            </div>

            <div class="experience-text text-stage-4">
              <span class="stage-number">04 / EXPERIENCE</span>
              <h2>이제 실제로<br>작동하는 무언가가 된다.</h2>
              <p>Not just a concept. An experience.</p>
            </div>

            <div class="experience-text text-stage-5">
              <span class="stage-number">05 / MARST</span>
              <h2>Ideas into<br><span>reality.</span></h2>
              <p>And it starts all over again.</p>
            </div>
          </div>

        </div>

        <div class="experience-bottom">
          <span id="experience-step">01 / 05</span>
          <div class="experience-progress">
            <div id="experience-progress-bar"></div>
          </div>
          <span>SCROLL TO BUILD</span>
        </div>

      </div>
    </section>


    <!-- =========================================
         INTRODUCTION
    ========================================== -->
    <section class="marst-intro" id="intro">
      <div class="intro-container">

        <div class="intro-label reveal">
          <span class="live-dot"></span>
          A LITTLE INTRODUCTION
        </div>

        <h2 class="intro-headline reveal">
          안녕, 나는 <span>Marst.</span>
        </h2>

        <div class="intro-columns reveal">
          <div class="intro-large">
            아이디어를 생각하고,<br>
            직접 만드는 것을 좋아한다.
          </div>

          <div class="intro-detail">
            <p>
              기술, 코딩, AI, 웹, 다양한 프로젝트.
              단순히 관심을 가지는 것에 그치지 않고,
              직접 만들고 실험하면서 새로운 가능성을 찾아간다.
            </p>

            <p>
              완벽하지 않더라도 시작하고,
              문제를 만나면 해결하고,
              더 나은 결과를 만들기 위해 계속 발전시킨다.
            </p>
          </div>
        </div>

        <div class="intro-divider"></div>

        <div class="intro-meta-grid reveal">
          <div>
            <span>INTEREST</span>
            <strong>Technology / AI / Code</strong>
          </div>
          <div>
            <span>APPROACH</span>
            <strong>Think. Build. Improve.</strong>
          </div>
          <div>
            <span>OBJECTIVE</span>
            <strong>Ideas into Reality</strong>
          </div>
        </div>

      </div>
    </section>


    <!-- =========================================
         WHAT I CREATE
    ========================================== -->
    <section class="marst-work" id="work">
      <div class="work-container">

        <div class="work-heading reveal">
          <div>
            <span class="section-overline">BEYOND THE IDEA</span>
            <h2>Things I<br>bring to life.</h2>
          </div>
          <p>
            서로 다른 분야, 하나의 방향.<br>
            새로운 것을 만들고 직접 경험한다.
          </p>
        </div>

        <div class="work-grid">

          <article class="work-card work-card-main reveal">
            <div class="work-visual work-visual-code">
              <div class="work-code-window">
                <div class="mini-window-top">
                  <i></i><i></i><i></i>
                  <span>development</span>
                </div>
                <div class="mini-code">
                  <p><b>const</b> idea = <em>"something new"</em>;</p>
                  <p><b>function</b> <u>create</u>() {</p>
                  <p>&nbsp;&nbsp;return idea;</p>
                  <p>}</p>
                  <p class="mini-code-last">create(); <span>▋</span></p>
                </div>
              </div>
            </div>

            <div class="work-card-info">
              <div>
                <span>01 / TECHNOLOGY</span>
                <h3>Code & Development</h3>
                <p>직접 개발하고, 작동하는 것을 만든다.</p>
              </div>
              <span class="work-arrow">↗</span>
            </div>
          </article>

          <article class="work-card reveal">
            <div class="work-visual work-visual-idea">
              <div class="idea-visual-grid"></div>
              <div class="idea-visual-shape idea-shape-a"></div>
              <div class="idea-visual-shape idea-shape-b"></div>
              <div class="idea-visual-shape idea-shape-c"></div>
              <div class="idea-visual-center">IDEA<br><span>→</span></div>
            </div>

            <div class="work-card-info">
              <div>
                <span>02 / EXPLORATION</span>
                <h3>Ideas & Experiments</h3>
                <p>궁금한 것들을 탐구하고 실험한다.</p>
              </div>
              <span class="work-arrow">↗</span>
            </div>
          </article>

          <article class="work-card reveal">
            <div class="work-visual work-visual-digital">
              <div class="digital-card">
                <div class="digital-card-head">
                  <span>M / LAB</span>
                  <span>●</span>
                </div>
                <div class="digital-card-body">
                  <div class="digital-card-big">01</div>
                  <div class="digital-card-line"></div>
                  <div class="digital-card-line short"></div>
                  <div class="digital-card-bars">
                    <i></i><i></i><i></i><i></i><i></i>
                  </div>
                </div>
              </div>
            </div>

            <div class="work-card-info">
              <div>
                <span>03 / DIGITAL</span>
                <h3>Web & Digital</h3>
                <p>디지털 공간에서 새로운 경험을 설계한다.</p>
              </div>
              <span class="work-arrow">↗</span>
            </div>
          </article>

          <article class="work-card reveal">
            <div class="work-visual work-visual-creation">
              <div class="creation-visual-plane plane-1"></div>
              <div class="creation-visual-plane plane-2"></div>
              <div class="creation-visual-plane plane-3"></div>
              <div class="creation-visual-label">MAKE<br>IT REAL.</div>
            </div>

            <div class="work-card-info">
              <div>
                <span>04 / CREATION</span>
                <h3>Projects</h3>
                <p>생각을 실제 프로젝트로 완성한다.</p>
              </div>
              <span class="work-arrow">↗</span>
            </div>
          </article>

        </div>
      </div>
    </section>


    <!-- =========================================
         PHILOSOPHY
    ========================================== -->
    <section class="marst-philosophy" id="philosophy">
      <div class="philosophy-container">

        <span class="section-overline reveal">A SIMPLE PHILOSOPHY</span>

        <div class="philosophy-quote reveal">
          <span class="quote-mark">“</span>
          <h2>
            생각만 하고 끝내면<br>
            <span>아무것도 바뀌지 않는다.</span>
          </h2>
        </div>

        <div class="philosophy-bottom reveal">
          <p>
            작은 시작도 결과가 될 수 있다.<br>
            중요한 건 실제로 시작하고 만들어가는 것.
          </p>

          <div class="philosophy-stamp">
            <span>THINK</span>
            <span>↓</span>
            <span>MAKE</span>
            <span>↓</span>
            <span>REALITY</span>
          </div>
        </div>

      </div>
    </section>


    <!-- =========================================
         LINKS
    ========================================== -->
    <section class="marst-links" id="access">
      <div class="links-container">

        <div class="links-heading reveal">
          <span class="section-overline">OPEN THE DOORS</span>
          <h2>Explore<br>what's next.</h2>
        </div>

        <div class="links-list">

          <a href="history.html" class="link-row reveal">
            <span class="link-row-number">01</span>
            <span class="link-row-name">History</span>
            <span class="link-row-desc">The journey so far</span>
            <span class="link-row-arrow">↗</span>
          </a>

          <a href="quick-links.html" class="link-row reveal">
            <span class="link-row-number">02</span>
            <span class="link-row-name">Quick Links</span>
            <span class="link-row-desc">Things connected to Marst</span>
            <span class="link-row-arrow">↗</span>
          </a>

          <a href="purchase.html" class="link-row reveal" data-auth>
            <span class="link-row-number">03</span>
            <span class="link-row-name">Purchase</span>
            <span class="link-row-desc">Products & services</span>
            <span class="link-row-arrow">↗</span>
          </a>

          <a href="consult.html" class="link-row reveal" data-auth>
            <span class="link-row-number">04</span>
            <span class="link-row-name">Consult</span>
            <span class="link-row-desc">Contact & collaboration</span>
            <span class="link-row-arrow">↗</span>
          </a>

        </div>
      </div>
    </section>


    <!-- =========================================
         FINAL
    ========================================== -->
    <section class="marst-final" id="final">
      <div class="final-background">
        <div class="final-grid"></div>
        <div class="final-glow"></div>
      </div>

      <div class="final-content reveal">
        <span class="section-overline">THIS IS ONLY THE BEGINNING</span>

        <h2>
          The next idea<br>
          is <span>waiting.</span>
        </h2>

        <p>
          아직 만들어지지 않은 것들.<br>
          앞으로 만들어갈 수많은 가능성.
        </p>

        <a href="history.html" class="final-cta">
          <span>GET TO KNOW MARST</span>
          <span>↗</span>
        </a>
      </div>

      <div class="final-footerline">
        <span>MARST © 2026</span>
        <span>IDEAS INTO REALITY</span>
        <span>END / BEGIN</span>
      </div>
    </section>
  `;
}
