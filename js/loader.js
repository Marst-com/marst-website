
function showLoader(message = "잠시만 기다려 주세요.") {
    const loader = document.getElementById("navigation-loader");
    const messageElement = document.getElementById("loader-message");

    messageElement.textContent = message;

    loader.classList.add("active");
}

function hideLoader() {
    const loader = document.getElementById("navigation-loader");

    loader.classList.remove("active");
}
