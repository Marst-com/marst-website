
async function initializeApp() {
    const errorContainer = document.getElementById("error-container");
    const app = document.getElementById("app");

    document.getElementById("year").textContent =
        new Date().getFullYear();

    try {
        const data = window.MARST_LINKS;

        if (!data || !Array.isArray(data.links)) {
            throw new Error("링크 데이터가 올바르지 않습니다.");
        }

        const links = data.links.filter(link => {
            return link.hidden !== true;
        });

        renderLinks(links);

        document.getElementById("link-count").textContent =
            `${links.length} LINKS`;

        if (window.lucide) {
            lucide.createIcons();
        }

    } catch (error) {
        console.error("[Marst Website]", error);

        app.classList.add("hidden");
        errorContainer.classList.remove("hidden");

        document.getElementById("error-message").textContent =
            error.message;

        if (window.lucide) {
            lucide.createIcons();
        }
    }
}

document.addEventListener("DOMContentLoaded", initializeApp);
