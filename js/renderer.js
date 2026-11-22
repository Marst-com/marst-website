
function renderLinks(links) {
    const container = document.getElementById("links-container");

    container.innerHTML = "";

    const groups = new Map();

    for (const link of links) {
        if (
            !link.name ||
            !link.description ||
            !link.url ||
            !link.location
        ) {
            console.warn("[Marst] 잘못된 링크 데이터:", link);
            continue;
        }

        let url;

        try {
            url = new URL(link.url);

            if (!["http:", "https:"].includes(url.protocol)) {
                throw new Error("지원하지 않는 URL입니다.");
            }
        } catch {
            console.warn("[Marst] 잘못된 URL:", link.url);
            continue;
        }

        const location = link.location;

        if (!groups.has(location)) {
            groups.set(location, []);
        }

        groups.get(location).push({
            ...link,
            url: url.href
        });
    }

    if (groups.size === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <i data-lucide="folder-open"></i>
                <p>등록된 링크가 없습니다.</p>
            </div>
        `;
        lucide.createIcons();
        return;
    }

    for (const [location, groupLinks] of groups) {
        const section = document.createElement("section");
        section.className = "link-group";

        const parts = location.split("/");
        const groupName = parts[parts.length - 1];

        const heading = document.createElement("div");
        heading.className = "group-heading";

        const title = document.createElement("h3");
        title.textContent = groupName;

        const count = document.createElement("span");
        count.textContent = `${groupLinks.length}`;

        heading.appendChild(title);
        heading.appendChild(count);

        const grid = document.createElement("div");
        grid.className = "link-grid";

        for (const link of groupLinks) {
            const card = document.createElement("button");

            card.className = "link-card";
            card.type = "button";

            const icon = document.createElement("div");
            icon.className = "link-icon";

            const iconElement = document.createElement("i");
            iconElement.setAttribute(
                "data-lucide",
                link.icon || "link"
            );

            icon.appendChild(iconElement);

            const content = document.createElement("div");
            content.className = "link-content";

            const name = document.createElement("h4");
            name.textContent = link.name;

            const description = document.createElement("p");
            description.textContent = link.description;

            content.appendChild(name);
            content.appendChild(description);

            const arrow = document.createElement("div");
            arrow.className = "link-arrow";

            const arrowIcon = document.createElement("i");
            arrowIcon.setAttribute("data-lucide", "arrow-up-right");

            arrow.appendChild(arrowIcon);

            card.appendChild(icon);
            card.appendChild(content);
            card.appendChild(arrow);

            card.addEventListener("click", () => {
                navigateTo(link.url, link.name);
            });

            grid.appendChild(card);
        }

        section.appendChild(heading);
        section.appendChild(grid);

        container.appendChild(section);
    }

    lucide.createIcons();
}
