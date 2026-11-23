
let allLinks = [];
let currentFilter = "all";
let currentSearch = "";

function renderLinks(links) {
    allLinks = links.filter(link => link.hidden !== true);
    updateLinkDisplay();
}

function updateLinkDisplay() {
    const container = document.getElementById("links-container");
    const noResults = document.getElementById("no-results");

    container.innerHTML = "";

    const filtered = allLinks.filter(link => {
        const matchesFilter =
            currentFilter === "all" ||
            link.location === currentFilter;

        const searchText = [
            link.name,
            link.description,
            link.location
        ].join(" ").toLowerCase();

        const matchesSearch =
            searchText.includes(currentSearch.toLowerCase());

        return matchesFilter && matchesSearch;
    });

    if (filtered.length === 0) {
        noResults.classList.remove("hidden");
        return;
    }

    noResults.classList.add("hidden");

    const groups = new Map();

    filtered.forEach(link => {
        if (!groups.has(link.location)) {
            groups.set(link.location, []);
        }

        groups.get(link.location).push(link);
    });

    groups.forEach((items, location) => {
        const section = document.createElement("section");
        section.className = "link-group";

        const heading = document.createElement("div");
        heading.className = "group-heading";

        const title = document.createElement("h3");

        title.textContent = location.split("/").pop();

        const badge = document.createElement("span");
        badge.textContent = items.length + " LINKS";

        heading.append(title, badge);

        const grid = document.createElement("div");
        grid.className = "link-grid";

        items.forEach(link => {
            const card = document.createElement("button");
            card.className = "link-card";

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

            content.append(name, description);

            const arrow = document.createElement("div");
            arrow.className = "link-arrow";

            const arrowIcon = document.createElement("i");
            arrowIcon.setAttribute("data-lucide", "arrow-up-right");

            arrow.appendChild(arrowIcon);

            card.append(icon, content, arrow);

            card.addEventListener("click", () => {
                navigateTo(link.url, link.name);
            });

            grid.appendChild(card);
        });

        section.append(heading, grid);
        container.appendChild(section);
    });

    lucide.createIcons();
}

function initializeFilters(links) {
    const container = document.getElementById("category-filter");

    const categories = [
        ...new Set(
            links
                .filter(link => link.hidden !== true)
                .map(link => link.location)
        )
    ];

    categories.forEach(category => {
        const button = document.createElement("button");

        button.className = "filter-button";
        button.textContent = category.split("/").pop();
        button.dataset.filter = category;

        button.addEventListener("click", () => {
            currentFilter = category;

            container.querySelectorAll("button").forEach(item => {
                item.classList.toggle(
                    "active",
                    item.dataset.filter === category
                );
            });

            updateLinkDisplay();
        });

        container.appendChild(button);
    });

    container.querySelector('[data-filter="all"]')
        .addEventListener("click", () => {
            currentFilter = "all";

            container.querySelectorAll("button").forEach(item => {
                item.classList.toggle(
                    "active",
                    item.dataset.filter === "all"
                );
            });

            updateLinkDisplay();
        });
}

function initializeSearch() {
    const input = document.getElementById("link-search");

    input.addEventListener("input", () => {
        currentSearch = input.value.trim();
        updateLinkDisplay();
    });
}
