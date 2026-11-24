
import { SITE } from "../config.js";

export function renderFooter() {
    const root = document.getElementById("footer");
    if (!root) return;

    root.innerHTML = `
        <footer class="footer">
            <div class="container">

                <div class="footer-top">
                    <a href="./index.html" class="footer-brand">
                        MARST<span>.</span>
                    </a>

                    <p class="footer-message">
                        Ideas are just the beginning.
                    </p>
                </div>

                <div class="footer-bottom">
                    <span>© ${SITE.year} MARST. All rights reserved.</span>

                    <div class="footer-links">
                        <a href="./quick-links.html">Links</a>
                        <a href="./consult.html" data-auth="true">Contact</a>
                    </div>

                    <span class="footer-credit">MADE WITH INTENTION.</span>
                </div>

            </div>
        </footer>
    `;
}
