import { fetchMockarooData } from "./utils.mjs";

console.log("Hello world!");


// Function to swap background based on screen size
function setBackground() {
    const backgroundElement = document.getElementById("backgroundElement");
    const mobileImage = "/images/searchPage-mobile.webp";
    const desktopImage = "/images/searchPage-desk.webp";
    console.log("function call!");
    if (window.matchMedia("(max-width: 768px)").matches) {
        // Mobile view
        backgroundElement.style.backgroundImage = `url(${mobileImage})`;
    } else {
        // Desktop view
        backgroundElement.style.backgroundImage = `url(${desktopImage})`;
    }
}
fetchMockarooData();
setBackground();
// Listen for changes in screen size
window.addEventListener("resize", setBackground);
