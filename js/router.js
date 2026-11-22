
function navigateTo(url, name = "페이지") {
    try {
        const target = new URL(url);

        if (!["http:", "https:"].includes(target.protocol)) {
            throw new Error("올바르지 않은 주소입니다.");
        }

        showLoader(`${name}(으)로 이동하고 있습니다.`);

        setTimeout(() => {
            window.location.assign(target.href);
        }, 600);

    } catch (error) {
        console.error("[Marst Router]", error);
        alert("이동할 수 없는 주소입니다.");
        hideLoader();
    }
}
