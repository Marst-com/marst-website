
function navigateTo(url, name = "페이지") {
    let target;

    try {
        target = new URL(url);

        if (!["http:", "https:"].includes(target.protocol)) {
            throw new Error("지원하지 않는 URL입니다.");
        }

    } catch (error) {
        alert("올바르지 않은 링크입니다.");
        console.error(error);
        return;
    }

    showLoader(`${name}(으)로 이동하고 있습니다.`);

    setTimeout(() => {
        window.location.assign(target.href);
    }, 650);
}
