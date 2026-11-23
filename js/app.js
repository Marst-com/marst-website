
document.addEventListener("DOMContentLoaded", () => {
    const data = window.MARST_LINKS;

    const app = document.getElementById("app");
    const errorContainer = document.getElementById("error-container");

    try {
        if (!data || !Array.isArray(data.links)) {
            throw new Error("links 데이터가 올바르지 않습니다.");
        }

        const links = data.links;

        renderLinks(links);
        initializeFilters(links);
        initializeSearch(links);
        initializeTheme();
        initializeNavigation();

        const visibleLinks = links.filter(link => link.hidden !== true);

        document.getElementById("stat-links").textContent =
            visibleLinks.length;

        document.getElementById("stat-groups").textContent =
            new Set(visibleLinks.map(link => link.location)).size;

        const year = new Date().getFullYear();

        document.getElementById("year").textContent = year;
        document.getElementById("footer-year").textContent = year;

        updateClock();

        setInterval(updateClock, 1000);

        document.body.classList.add("loaded");

        if (window.lucide) {
            lucide.createIcons();
        }

    } catch (error) {
        console.error("[Marst]", error);

        errorContainer.classList.remove("hidden");

        document.getElementById("error-message").textContent =
            error.message;

        if (window.lucide) {
            lucide.createIcons();
        }
    }
});

function updateClock() {
    const now = new Date();

    const clock = document.getElementById("clock");

    clock.textContent = now.toLocaleTimeString("ko-KR", {
        hour12: false
    });

    document.getElementById("current-date").textContent =
        now.toLocaleDateString("ko-KR", {
            year: "numeric",
            month: "long",
            day: "numeric",
            weekday: "long"
        });
}

function initializeTheme() {
    const button = document.getElementById("theme-toggle");

    const saved = localStorage.getItem("marst-theme");

    if (saved === "dark") {
        document.body.classList.add("dark");
    }

    updateThemeIcon();

    button.addEventListener("click", () => {
        document.body.classList.toggle("dark");

        const theme = document.body.classList.contains("dark")
            ? "dark"
            : "light";

        localStorage.setItem("marst-theme", theme);

        updateThemeIcon();
    });
}

function updateThemeIcon() {
    const button = document.getElementById("theme-toggle");

    button.innerHTML = document.body.classList.contains("dark")
        ? '<i data-lucide="sun"></i>'
        : '<i data-lucide="moon"></i>';

    if (window.lucide) {
        lucide.createIcons();
    }
}

function initializeNavigation() {
    const menuButton = document.getElementById("mobile-menu-button");
    const navigation = document.querySelector(".navigation");

    menuButton.addEventListener("click", () => {
        navigation.classList.toggle("mobile-open");

        menuButton.innerHTML = navigation.classList.contains("mobile-open")
            ? '<i data-lucide="x"></i>'
            : '<i data-lucide="menu"></i>';

        lucide.createIcons();
    });

    navigation.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => {
            navigation.classList.remove("mobile-open");
        });
    });

    window.addEventListener("scroll", () => {
        document.getElementById("header").classList.toggle(
            "scrolled",
            window.scrollY > 20
        );
    });

    document.addEventListener("keydown", event => {
        if (event.key === "/" && !["INPUT", "TEXTAREA"].includes(
            document.activeElement.tagName
        )) {
            event.preventDefault();
            document.getElementById("link-search").focus();
        }

        if (event.key === "Escape") {
            document.getElementById("link-search").blur();
        }
    });
}
