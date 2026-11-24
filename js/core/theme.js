
const STORAGE_KEY = "marst_theme";

export function initTheme() {
    const saved = localStorage.getItem(STORAGE_KEY);
    const theme = saved || "dark";

    applyTheme(theme);
    bindThemeToggle();

    return theme;
}

export function applyTheme(theme) {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem(STORAGE_KEY, theme);
    updateThemeButton(theme);
}

export function toggleTheme() {
    const current = document.documentElement.dataset.theme || "dark";
    const next = current === "dark" ? "light" : "dark";

    applyTheme(next);
    return next;
}

function updateThemeButton(theme) {
    const button = document.getElementById("theme-toggle");
    if (!button) return;

    button.textContent = theme === "dark" ? "☀" : "☾";
    button.setAttribute(
        "aria-label",
        theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
    );
}

function bindThemeToggle() {
    const button = document.getElementById("theme-toggle");
    if (!button || button.dataset.bound) return;

    button.dataset.bound = "true";

    button.addEventListener("click", toggleTheme);
}
