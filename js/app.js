
async function initializeApp() {
    const container = document.getElementById("links-container");
    const errorContainer = document.getElementById("error-container");
    const app = document.getElementById("app");

    document.getElementById("year").textContent =
        new Date().getFullYear();

    try {
        const response = await fetch("./data/links.json", {
            cache: "no-cache"
        });

        if (!response.ok) {
            throw new Error(
                `JSON 파일을 불러오지 못했습니다. (${response.status})`
            );
        }

        const data = await response.json();

        if (!data || !Array.isArray(data.links)) {
            throw new Error("links 배열이 존재하지 않습니다.");
        }

        const links = data.links.filter(link => {
            return link.hidden !== true;
        });

        renderLinks(links);

        document.getElementById("link-count").textContent =
            `${links.length} LINKS`;

        lucide.createIcons();

    } catch (error) {
        console.error("[Marst Website]", error);

        app.classList.add("hidden");
        errorContainer.classList.remove("hidden");

        document.getElementById("error-message").textContent =
            error.message;

        lucide.createIcons();
    }
}

document.addEventListener("DOMContentLoaded", initializeApp);
