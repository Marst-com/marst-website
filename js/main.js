
import { renderHeader } from "./components/header.js";
import { renderFooter } from "./components/footer.js";
import { initReveal } from "./components/reveal.js";
import { renderHome } from "./pages/home.js";

function initializeSite() {
    renderHeader();
    renderFooter();
    renderHome();

    initReveal();
    initializeAuthLinks();
    initializeCurrentPage();
}

function initializeAuthLinks() {
    const authLinks = document.querySelectorAll("[data-auth='true']");

    authLinks.forEach(link => {
        link.addEventListener("click", event => {
            const loggedIn =
                sessionStorage.getItem("marst_logged_in") === "true";

            if (!loggedIn) {
                event.preventDefault();

                const target = link.getAttribute("href");

                sessionStorage.setItem("marst_redirect_after_login", target);

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
