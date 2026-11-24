
import { renderHeader } from "./components/header.js";
import { renderFooter } from "./components/footer.js";
import { initReveal } from "./components/reveal.js";
import { renderHome } from "./pages/home.js";
import { initScrollScene } from "./components/scroll-scene.js";
import { initTheme } from "./core/theme.js";
import { initLanguage } from "./core/language.js";

function initializeSite() {
    // 1. 페이지 렌더링
    renderHeader();
    renderFooter();
    renderHome();

    // 2. 사용자 설정 적용
    initTheme();
    initLanguage();

    // 3. 애니메이션
    initReveal();
    initScrollScene();

    // 4. 공통 기능
    initializeAuthLinks();
    initializeCurrentPage();
}

function initializeAuthLinks() {
    document.querySelectorAll("[data-auth='true']").forEach(link => {
        link.addEventListener("click", event => {
            const loggedIn =
                sessionStorage.getItem("marst_logged_in") === "true";

            if (!loggedIn) {
                event.preventDefault();
                sessionStorage.setItem(
                    "marst_redirect_after_login",
                    link.getAttribute("href")
                );
                window.location.href = "./login.html";
            }
        });
    });
}

function initializeCurrentPage() {
    const path = window.location.pathname;

    if (path.endsWith("index.html") || path.endsWith("/")) {
        document.body.dataset.page = "home";
    }
}

document.addEventListener("DOMContentLoaded", initializeSite);
