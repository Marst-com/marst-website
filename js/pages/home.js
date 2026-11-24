
export function renderHome() {
  const root = document.querySelector("#home-page");
  if (!root) return;

  root.innerHTML = `
    <!-- HERO -->
    <section class="hero-section" id="hero">
      <div class="hero-background">
        <div class="hero-grid"></div>
        <div class="hero-glow hero-glow-main"></div>
        <div class="hero-glow hero-glow-secondary"></div>
      </div>

      <div class="container hero-content">
        <div class="hero-label reveal">
          <span class="status-dot"></span>
          <span data-i18n="hero.label">INDEPENDENT CREATOR</span>
        </div>

        <h1 class="hero-title reveal">
          Ideas into
          <span class="hero-title-accent">reality.</span>
        </h1>

        <p class="hero-description reveal"
           data-i18n="hero.description">
          생각에서 시작해, 실제 결과물로 이어지는 과정.
          기술과 창작을 연결합니다.
        </p>

        <div class="hero-actions reveal">
          <a href="#intro" class="btn btn-primary">
            <span data-i18n="hero.explore">Explore</span>
            <span class="btn-arrow">↘</span>
          </a>

          <a href="quick-links.html" class="btn btn-outline">
            <span data-i18n="hero.discover">Discover</span>
          </a>
        </div>

        <div class="hero-bottom reveal">
          <span data-i18n="hero.scroll">SCROLL TO EXPLORE</span>
          <div class="scroll-indicator">
            <div class="scroll-indicator-line"></div>
          </div>
        </div>

        <div class="hero-visual">
          <div class="hero-orb">
            <div class="orb-ring orb-ring-1"></div>
            <div class="orb-ring orb-ring-2"></div>
            <div class="orb-ring orb-ring-3"></div>
            <div class="orb-core"></div>
            <div class="orb-light"></div>
          </div>

          <div class="hero-coordinate coordinate-1">
            <span>37°</span>
            <span>IDEA</span>
          </div>

          <div class="hero-coordinate coordinate-2">
            <span>∞</span>
            <span>CREATE</span>
          </div>
        </div>
      </div>
    </section>


    <!-- CINEMATIC SCROLL -->
    <section class="scroll-scene" id="scroll-scene">
      <div class="scene-sticky">

        <div class="scene-background">
          <div class="scene-grid"></div>
          <div class="scene-glow"></div>
        </div>

        <div class="scene-top">
          <span class="scene-label" data-i18n="scene.label">
            THE PROCESS
          </span>

          <span class="scene-counter">
            <span id="scene-current">01</span>
            <span class="scene-divider">/</span>
            <span>05</span>
          </span>
        </div>

        <div class="scene-object">
          <div class="scene-object-shadow"></div>

          <div class="scene-object-core">
            <div class="scene-object-inner"></div>
          </div>

          <div class="scene-ring scene-ring-1"></div>
          <div class="scene-ring scene-ring-2"></div>
          <div class="scene-ring scene-ring-3"></div>

          <div class="scene-cross scene-cross-1"></div>
          <div class="scene-cross scene-cross-2"></div>
          <div class="scene-cross scene-cross-3"></div>

          <div class="scene-particle scene-particle-1"></div>
          <div class="scene-particle scene-particle-2"></div>
          <div class="scene-particle scene-particle-3"></div>
          <div class="scene-particle scene-particle-4"></div>
        </div>

        <div class="scene-copy-container">

          <div class="scene-copy scene-copy-1 active">
            <span class="scene-copy-number">01 — BEGIN</span>
            <h2 data-i18n="scene.one">모든 것은<br>작은 생각에서.</h2>
          </div>

          <div class="scene-copy scene-copy-2">
            <span class="scene-copy-number">02 — IMAGINE</span>
            <h2 data-i18n="scene.two">생각은<br>가능성을 만듭니다.</h2>
          </div>

          <div class="scene-copy scene-copy-3">
            <span class="scene-copy-number">03 — CONNECT</span>
            <h2 data-i18n="scene.three">아이디어와<br>기술을 연결하고.</h2>
          </div>

          <div class="scene-copy scene-copy-4">
            <span class="scene-copy-number">04 — CREATE</span>
            <h2 data-i18n="scene.four">직접 만들고<br>끊임없이 발전시킵니다.</h2>
          </div>

          <div class="scene-copy scene-copy-5">
            <span class="scene-copy-number">05 — REALIZE</span>
            <h2 data-i18n="scene.five">생각을<br>현실로.</h2>
          </div>

        </div>

        <div class="scene-bottom">
          <span>MARST</span>

          <div class="scene-progress-track">
            <div class="scene-progress-bar" id="scene-progress"></div>
          </div>

          <span class="scene-bottom-right">SCROLL TO CONTINUE</span>
        </div>

      </div>
    </section>


    <!-- INTRO -->
    <section class="intro-section section" id="intro">
      <div class="container">

        <div class="section-heading reveal">
          <span class="section-label" data-i18n="intro.label">
            INTRODUCTION
          </span>

          <h2 class="section-title">
            <span data-i18n="intro.title1">단순히 생각하는 것을 넘어,</span>
            <br>
            <span class="text-muted" data-i18n="intro.title2">
              직접 만들어냅니다.
            </span>
          </h2>
        </div>

        <div class="intro-grid">
          <div class="intro-left reveal">
            <div class="intro-symbol">
              <div class="intro-symbol-circle">
                <span>M</span>
              </div>
              <div class="intro-symbol-orbit"></div>
            </div>
          </div>

          <div class="intro-right reveal">
            <p class="intro-text"
               data-i18n="intro.description1">
              새로운 아이디어를 떠올리는 것에서 끝내지 않습니다.
              직접 설계하고, 개발하고, 실험하고,
              실제로 작동하는 결과물을 만들어냅니다.
            </p>

            <p class="intro-text intro-text-secondary"
               data-i18n="intro.description2">
              기술은 아이디어를 현실로 만드는 도구입니다.
              그리고 그 과정에는 끝이 없습니다.
            </p>

            <div class="intro-meta">
              <div class="intro-meta-item">
                <span class="intro-meta-label">IDENTITY</span>
                <span class="intro-meta-value">MARST</span>
              </div>

              <div class="intro-meta-item">
                <span class="intro-meta-label">FIELD</span>
                <span class="intro-meta-value">TECH · CREATION</span>
              </div>

              <div class="intro-meta-item">
                <span class="intro-meta-label">APPROACH</span>
                <span class="intro-meta-value">IDEA → REALITY</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>


    <!-- FOCUS -->
    <section class="focus-section section" id="focus">
      <div class="container">

        <div class="section-heading reveal">
          <span class="section-label" data-i18n="focus.label">
            WHAT I DO
          </span>

          <h2 class="section-title">
            <span data-i18n="focus.title1">다양한 분야를 탐구하며</span>
            <br>
            <span class="text-muted" data-i18n="focus.title2">
              새로운 것을 만들어갑니다.
            </span>
          </h2>
        </div>

        <div class="focus-grid">

          <!-- TECHNOLOGY -->
          <article class="focus-card focus-card-large reveal">
            <div class="focus-card-top">
              <span class="focus-card-number">01</span>
              <span class="focus-card-tag">TECHNOLOGY</span>
            </div>

            <div class="focus-art focus-art-code">
              <div class="code-window">
                <div class="code-window-header">
                  <div class="code-dots">
                    <span></span><span></span><span></span>
                  </div>
                  <span>project.py</span>
                </div>

                <div class="code-content">
                  <div class="code-line">
                    <span class="code-number">01</span>
                    <span class="code-purple">class</span>
                    <span class="code-yellow">Idea</span>:
                  </div>

                  <div class="code-line">
                    <span class="code-number">02</span>
                    &nbsp;&nbsp;<span class="code-purple">def</span>
                    <span class="code-blue">build</span>(self):
                  </div>

                  <div class="code-line">
                    <span class="code-number">03</span>
                    &nbsp;&nbsp;&nbsp;&nbsp;<span class="code-green">return</span>
                    <span class="code-yellow">reality</span>
                  </div>

                  <div class="code-line">
                    <span class="code-number">04</span>
                    <span class="code-muted"># keep creating</span>
                  </div>

                  <div class="code-line code-cursor-line">
                    <span class="code-number">05</span>
                    <span class="code-cursor"></span>
                  </div>
                </div>
              </div>
            </div>

            <div class="focus-card-content">
              <h3 data-i18n="focus.technology.title">
                Technology
              </h3>

              <p data-i18n="focus.technology.description">
                코드와 기술을 활용해 새로운 시스템을 설계하고,
                문제를 해결하며 작동하는 결과물을 만듭니다.
              </p>

              <div class="focus-card-footer">
                <span>DEVELOPMENT</span>
                <span>↗</span>
              </div>
            </div>
          </article>


          <!-- DIGITAL -->
          <article class="focus-card reveal">
            <div class="focus-card-top">
              <span class="focus-card-number">02</span>
              <span class="focus-card-tag">DIGITAL</span>
            </div>

            <div class="focus-art focus-art-digital">
              <div class="digital-orbit digital-orbit-1"></div>
              <div class="digital-orbit digital-orbit-2"></div>
              <div class="digital-orbit digital-orbit-3"></div>

              <div class="digital-sphere">
                <div class="digital-sphere-shine"></div>
              </div>

              <div class="digital-node digital-node-1"></div>
              <div class="digital-node digital-node-2"></div>
              <div class="digital-node digital-node-3"></div>
            </div>

            <div class="focus-card-content">
              <h3 data-i18n="focus.digital.title">
                Digital
              </h3>

              <p data-i18n="focus.digital.description">
                웹과 디지털 환경을 탐구하고,
                새로운 경험과 서비스를 구성합니다.
              </p>

              <div class="focus-card-footer">
                <span>DIGITAL EXPERIENCE</span>
                <span>↗</span>
              </div>
            </div>
          </article>


          <!-- IDEAS -->
          <article class="focus-card reveal">
            <div class="focus-card-top">
              <span class="focus-card-number">03</span>
              <span class="focus-card-tag">IDEAS</span>
            </div>

            <div class="focus-art focus-art-ideas">
              <div class="idea-shape idea-shape-1"></div>
              <div class="idea-shape idea-shape-2"></div>
              <div class="idea-shape idea-shape-3"></div>
              <div class="idea-shape idea-shape-4"></div>
              <div class="idea-center">IDEA</div>
            </div>

            <div class="focus-card-content">
              <h3 data-i18n="focus.ideas.title">
                Ideas
              </h3>

              <p data-i18n="focus.ideas.description">
                기존의 방식에서 벗어나 새로운 가능성을 발견하고,
                아이디어를 구체적인 계획으로 발전시킵니다.
              </p>

              <div class="focus-card-footer">
                <span>EXPLORATION</span>
                <span>↗</span>
              </div>
            </div>
          </article>


          <!-- CREATION -->
          <article class="focus-card focus-card-wide reveal">
            <div class="focus-card-top">
              <span class="focus-card-number">04</span>
              <span class="focus-card-tag">CREATION</span>
            </div>

            <div class="focus-art focus-art-creation">
              <div class="creation-block creation-block-1"></div>
              <div class="creation-block creation-block-2"></div>
              <div class="creation-block creation-block-3"></div>
              <div class="creation-block creation-block-4"></div>

              <div class="creation-line creation-line-1"></div>
              <div class="creation-line creation-line-2"></div>

              <div class="creation-center">
                <span>BUILD</span>
                <span>→</span>
                <span>CREATE</span>
              </div>
            </div>

            <div class="focus-card-content">
              <h3 data-i18n="focus.creation.title">
                Creation
              </h3>

              <p data-i18n="focus.creation.description">
                상상했던 것을 직접 구현하고,
                하나의 완성된 프로젝트로 만들어냅니다.
              </p>

              <div class="focus-card-footer">
                <span>BUILD SOMETHING</span>
                <span>↗</span>
              </div>
            </div>
          </article>

        </div>
      </div>
    </section>


    <!-- PROCESS -->
    <section class="process-section section" id="process">
      <div class="container">

        <div class="section-heading reveal">
          <span class="section-label" data-i18n="process.label">
            HOW IT WORKS
          </span>

          <h2 class="section-title">
            <span data-i18n="process.title1">아이디어에서</span>
            <br>
            <span class="text-muted" data-i18n="process.title2">
              결과물까지.
            </span>
          </h2>
        </div>

        <div class="process-list">

          <div class="process-item reveal">
            <div class="process-number">01</div>

            <div class="process-main">
              <h3 data-i18n="process.step1.title">Think</h3>
              <p data-i18n="process.step1.description">
                새로운 아이디어와 문제를 발견하고
                방향을 고민합니다.
              </p>
            </div>

            <div class="process-symbol">↗</div>
          </div>

          <div class="process-item reveal">
            <div class="process-number">02</div>

            <div class="process-main">
              <h3 data-i18n="process.step2.title">Plan</h3>
              <p data-i18n="process.step2.description">
                생각을 구체화하고 필요한 기술과 구조를 설계합니다.
              </p>
            </div>

            <div class="process-symbol">⌘</div>
          </div>

          <div class="process-item reveal">
            <div class="process-number">03</div>

            <div class="process-main">
              <h3 data-i18n="process.step3.title">Build</h3>
              <p data-i18n="process.step3.description">
                코드와 도구를 활용해 직접 구현합니다.
              </p>
            </div>

            <div class="process-symbol">↗</div>
          </div>

          <div class="process-item reveal">
            <div class="process-number">04</div>

            <div class="process-main">
              <h3 data-i18n="process.step4.title">Improve</h3>
              <p data-i18n="process.step4.description">
                테스트하고 개선하며 완성도를 높입니다.
              </p>
            </div>

            <div class="process-symbol">∞</div>
          </div>

        </div>

      </div>
    </section>


    <!-- ACCESS -->
    <section class="access-section section" id="access">
      <div class="container">

        <div class="section-heading reveal">
          <span class="section-label" data-i18n="access.label">
            EXPLORE MORE
          </span>

          <h2 class="section-title">
            <span data-i18n="access.title1">더 많은 것들을</span>
            <br>
            <span class="text-muted" data-i18n="access.title2">
              만나보세요.
            </span>
          </h2>
        </div>

        <div class="access-grid">

          <!-- HISTORY -->
          <a href="history.html" class="access-card reveal">
            <div class="access-card-top">
              <span class="access-card-index">01</span>
              <span class="access-card-arrow">↗</span>
            </div>

            <div class="access-card-visual access-history-visual">
              <div class="history-line"></div>
              <div class="history-node history-node-1"></div>
              <div class="history-node history-node-2"></div>
              <div class="history-node history-node-3"></div>
              <div class="history-year">2026</div>
            </div>

            <div class="access-card-bottom">
              <div>
                <h3 data-i18n="access.history.title">History</h3>
                <p data-i18n="access.history.description">
                  지금까지의 과정과 기록
                </p>
              </div>

              <span class="access-arrow">↗</span>
            </div>
          </a>


          <!-- QUICK LINKS -->
          <a href="quick-links.html" class="access-card reveal">
            <div class="access-card-top">
              <span class="access-card-index">02</span>
              <span class="access-card-arrow">↗</span>
            </div>

            <div class="access-card-visual access-links-visual">
              <div class="link-tile link-tile-1">01</div>
              <div class="link-tile link-tile-2">02</div>
              <div class="link-tile link-tile-3">03</div>
              <div class="link-tile link-tile-4">04</div>
            </div>

            <div class="access-card-bottom">
              <div>
                <h3 data-i18n="access.links.title">Quick Links</h3>
                <p data-i18n="access.links.description">
                  다양한 프로젝트와 연결
                </p>
              </div>

              <span class="access-arrow">↗</span>
            </div>
          </a>


          <!-- PURCHASE -->
          <a href="purchase.html" class="access-card reveal" data-auth>
            <div class="access-card-top">
              <span class="access-card-index">03</span>
              <span class="access-card-arrow">↗</span>
            </div>

            <div class="access-card-visual access-purchase-visual">
              <div class="purchase-ring"></div>
              <div class="purchase-ring purchase-ring-2"></div>
              <div class="purchase-core">
                <span>SHOP</span>
              </div>
            </div>

            <div class="access-card-bottom">
              <div>
                <h3 data-i18n="access.purchase.title">Purchase</h3>
                <p data-i18n="access.purchase.description">
                  제작한 제품과 서비스
                </p>
              </div>

              <span class="access-arrow">↗</span>
            </div>
          </a>


          <!-- CONSULT -->
          <a href="consult.html" class="access-card reveal" data-auth>
            <div class="access-card-top">
              <span class="access-card-index">04</span>
              <span class="access-card-arrow">↗</span>
            </div>

            <div class="access-card-visual access-consult-visual">
              <div class="consult-dot consult-dot-1"></div>
              <div class="consult-dot consult-dot-2"></div>
              <div class="consult-dot consult-dot-3"></div>
              <div class="consult-connect"></div>

              <div class="consult-center">
                <span>LET'S</span>
                <span>CONNECT</span>
              </div>
            </div>

            <div class="access-card-bottom">
              <div>
                <h3 data-i18n="access.consult.title">Consult</h3>
                <p data-i18n="access.consult.description">
                  문의 및 협업 제안
                </p>
              </div>

              <span class="access-arrow">↗</span>
            </div>
          </a>

        </div>
      </div>
    </section>


    <!-- FINAL CTA -->
    <section class="final-section section" id="final">
      <div class="container">

        <div class="final-content reveal">
          <div class="final-orb">
            <div class="final-orb-ring"></div>
            <div class="final-orb-core"></div>
          </div>

          <span class="section-label" data-i18n="final.label">
            THE NEXT STEP
          </span>

          <h2 class="final-title">
            <span data-i18n="final.title1">생각은</span>
            <span class="final-title-accent"
                  data-i18n="final.title2">계속됩니다.</span>
          </h2>

          <p class="final-description" data-i18n="final.description">
            새로운 아이디어는 언제든 시작될 수 있습니다.
            그리고 그것을 현실로 만드는 과정은 계속됩니다.
          </p>

          <a href="history.html" class="btn btn-primary final-button">
            <span data-i18n="final.button">Explore MARST</span>
            <span class="btn-arrow">↗</span>
          </a>
        </div>

        <div class="final-bottom">
          <span>MARST — INDEPENDENT CREATOR</span>
          <span>IDEAS INTO REALITY.</span>
        </div>

      </div>
    </section>
  `;
}
