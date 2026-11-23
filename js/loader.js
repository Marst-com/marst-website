
function showLoader(message = "잠시만 기다려 주세요.") {
    const loader = document.getElementById("navigation-loader");

    document.getElementById("loader-message").textContent = message;

    loader.classList.add("active");
}

function hideLoader() {
    document.getElementById("navigation-loader")
        .classList.remove("active");
}
