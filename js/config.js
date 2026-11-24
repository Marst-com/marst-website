
export const SITE = {
    name: "MARST",
    description: "Ideas into reality.",
    year: new Date().getFullYear(),


    navigation: [
        { label: "Home", key: "nav.home", href: "index.html" },
        { label: "History", key: "nav.history", href: "history.html" },
        { label: "Quick Links", key: "nav.links", href: "quick-links.html" },
        { label: "Purchase", key: "nav.purchase", href: "purchase.html", auth: true },
        { label: "Consult", key: "nav.consult", href: "consult.html", auth: true }
    ]
};
