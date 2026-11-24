
const STORAGE_KEY = "marst_language";

const translations = {
    ko: {
        "nav.home": "홈",
        "nav.history": "역사",
        "nav.links": "빠른 링크",
        "nav.purchase": "구매",
        "nav.consult": "상담",
        "nav.login": "로그인",

        "hero.label": "독립적인 크리에이티브 공간",
        "hero.title": "아이디어를 현실로.",
        "hero.description": "아이디어가 실제로 무언가가 되는 공간.\n한계를 넘어 탐구하고, 만들고, 연결합니다.",
        "hero.explore": "Marst 탐험하기",
        "hero.discover": "더 알아보기",
        "hero.scroll": "스크롤하여 탐험",

        "scene.label": "아이디어에서 현실로",
        "scene.one": "모든 것은 작은 아이디어에서 시작됩니다.",
        "scene.two": "가능성을 상상하고",
        "scene.three": "형태를 만들고",
        "scene.four": "세상을 연결하며",
        "scene.five": "현실이 됩니다.",

        "footer.message": "아이디어는 시작일 뿐입니다.",
        "theme.light": "라이트 모드로 전환",
        "theme.dark": "다크 모드로 전환"
    },

    en: {
        "nav.home": "Home",
        "nav.history": "History",
        "nav.links": "Quick Links",
        "nav.purchase": "Purchase",
        "nav.consult": "Consult",
        "nav.login": "Sign in",

        "hero.label": "Independent creative space",
        "hero.title": "Ideas into reality.",
        "hero.description": "A space where ideas become something real.\nExploring, building, and connecting beyond limits.",
        "hero.explore": "Explore Marst",
        "hero.discover": "Discover more",
        "hero.scroll": "Scroll to explore",

        "scene.label": "From ideas to reality",
        "scene.one": "Everything begins with a small idea.",
        "scene.two": "Imagine the possibilities.",
        "scene.three": "Give them a form.",
        "scene.four": "Connect them to the world.",
        "scene.five": "Make them real.",

        "footer.message": "Ideas are just the beginning.",
        "theme.light": "Switch to light mode",
        "theme.dark": "Switch to dark mode"
    }
};

let currentLanguage = "en";

export function initLanguage() {
    currentLanguage = localStorage.getItem(STORAGE_KEY) || "en";

    applyLanguage(currentLanguage);
    bindLanguageToggle();

    return currentLanguage;
}

export function applyLanguage(language) {
    if (!translations[language]) return;

    currentLanguage = language;
    localStorage.setItem(STORAGE_KEY, language);

    document.documentElement.lang = language;
    document.documentElement.dataset.language = language;

    document.querySelectorAll("[data-i18n]").forEach(element => {
        const key = element.dataset.i18n;
        const value = translations[language][key];

        if (value !== undefined) {
            element.textContent = value;
        }
    });

    document.querySelectorAll("[data-i18n-placeholder]").forEach(element => {
        const key = element.dataset.i18nPlaceholder;
        const value = translations[language][key];

        if (value !== undefined) {
            element.placeholder = value;
        }
    });

    updateLanguageButton();
}

export function toggleLanguage() {
    applyLanguage(currentLanguage === "ko" ? "en" : "ko");
}

export function t(key) {
    return translations[currentLanguage]?.[key] ?? key;
}

function updateLanguageButton() {
    const button = document.getElementById("language-toggle");
    if (!button) return;

    button.textContent = currentLanguage.toUpperCase();
}

function bindLanguageToggle() {
    const button = document.getElementById("language-toggle");
    if (!button || button.dataset.bound) return;

    button.dataset.bound = "true";
    button.addEventListener("click", toggleLanguage);
}
