const mode_selector = document.getElementById("display");
const logo_image = document.getElementById("logo");
const body = document.querySelector("body");

mode_selector.addEventListener("change", changeTheme);

function changeTheme() {
    if (mode_selector.value == "light") {
        body.classList.remove("dark");
        logo_image.setAttribute("src", "logo_light.png");
    } else {
        body.classList.add("dark");
        logo_image.setAttribute("src", "logo_dark.png");
    }
}
