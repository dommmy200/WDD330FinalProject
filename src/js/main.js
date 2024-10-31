import { fetchMockarooData } from "./utils.mjs";

console.log("Hello world!");

const backgroundElement = document.getElementById("backgroundElement");
const mobileImage = "../public/images/searchPage-mobile.webp";
const desktopImage = "../public/images/searchPage-desk.webp";
// Function to swap background based on screen size
function setBackground() {
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
