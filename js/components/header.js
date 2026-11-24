
import { SITE } from "../config.js";

export function renderHeader() {
    const root = document.getElementById("header");
    if (!root) return;

    root.innerHTML = `
        <header class="header">
            <div class="header-inner">

                <a class="brand" href="./index.html">
                    <span class="brand-mark">M.</span>
                    <span class="brand-name">MARST</span>
                </a>

                <nav class="nav" id="main-nav">
                    ${SITE.navigation.map(item => `
                        <a
                            class="nav-link"
                            href="./${item.href}"
                            ${item.auth ? 'data-auth="true"' : ""}
                        >
                            ${item.label}
                        </a>
                    `).join("")}
                </nav>

                <div class="header-right">
                    <a class="header-login" href="./login.html">
                        <span>Sign in</span>
                        <span class="login-arrow">↗</span>
                    </a>

                    <button class="menu-button" id="menu-button" aria-label="Open menu">
                        <span></span>
                        <span></span>
                    </button>
                </div>

            </div>
        </header>
    `;

    setupHeaderEvents();
}

function setupHeaderEvents() {
    const button = document.getElementById("menu-button");
    const nav = document.getElementById("main-nav");

    if (!button || !nav) return;

    button.addEventListener("click", () => {
        const opened = nav.classList.toggle("nav-open");
        button.classList.toggle("menu-open", opened);
    });

    nav.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => {
            nav.classList.remove("nav-open");
            button.classList.remove("menu-open");
        });
    });
}
