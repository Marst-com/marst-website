
export const SITE = {
    name: "MARST",
    description: "Ideas into reality.",
    year: new Date().getFullYear(),

    navigation: [
        { label: "Home", href: "index.html" },
        { label: "History", href: "history.html" },
        { label: "Quick Links", href: "quick-links.html" },
        { label: "Purchase", href: "purchase.html", auth: true },
        { label: "Consult", href: "consult.html", auth: true }
    ]
};
