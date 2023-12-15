function toggleSidebar() {
    const sidebar = document.querySelector(".sidebar");
    const burger = document.querySelector(".burger-menu");

    document.querySelector(".bar1").classList.toggle("to-white");
    document.querySelector(".bar2").classList.toggle("to-white");
    document.querySelector(".bar3").classList.toggle("to-white");
    sidebar.classList.toggle("active");
    burger.classList.toggle("ganti-x");
    document.querySelector(".bar1").classList.toggle("open");
    document.querySelector(".bar2").classList.toggle("hide");
    document.querySelector(".bar3").classList.toggle("open");
}

// darkModeToggle.addEventListener("change", () => {
//     const paragraph = document.getElementById("paragraph");
//     const closeIcon = document.getElementById("bar");
//     if (darkModeToggle.checked) {
//         document.documentElement.style.setProperty("--main-color", "#fff");
//         document.body.style.backgroundColor = "#333";
//         paragraph.style.color = "#fff";
//         closeIcon.style.color("#fff");
//     } else {
//         document.body.style.backgroundColor = "#fff";
//         document.documentElement.style.setProperty("--main-color", "#000");
//     }
// });

var body = document.body;
var root = document.getElementsByTagName("html")[0];

body.classList.remove("no-js");

window.addEventListener(
    "load",
    function load() {
        window.removeEventListener("load", load, false);
        root.classList.remove("preload");
    },
    false
);

const STORAGE_KEY = "user-color-scheme";
const COLOR_MODE_KEY = "--color-mode";

/** Andy Bell’s dark mode technique
https://hankchizljaw.com/wrote/create-a-user-controlled-dark-or-light-mode/
**/

const modeToggleButton = document.querySelector(".toggleButton");
const modeToggleText = document.querySelector(".themeMode");
// const modeStatusElement = document.querySelector('.js-mode-status');

/**
 * Pass in a custom prop key and this function will return its
 * computed value.
 * A reduced version of this: https://andy-bell.design/wrote/get-css-custom-property-value-with-javascript/
 */
const getCSSCustomProp = propKey => {
    let response = getComputedStyle(document.documentElement).getPropertyValue(
        propKey
    );

    // Tidy up the string if there’s something to work with
    if (response.length) {
        response = response.replace(/\'|"/g, "").trim();
    }

    // Return the string response by default
    return response;
};

/**
 * Takes either a passed setting ('light'|'dark') or grabs that from localStorage.
 * If it can’t find the setting in either, it tries to load the CSS color mode,
 * controlled by the media query
 */
const applySetting = passedSetting => {
    let currentSetting = passedSetting || localStorage.getItem(STORAGE_KEY);

    if (currentSetting) {
        document.documentElement.setAttribute(
            "data-user-color-scheme",
            currentSetting
        );
        setButtonLabel(currentSetting);
    } else {
        setButtonLabel(getCSSCustomProp(COLOR_MODE_KEY));
    }
};

/**
 * Gets the current setting > reverses it > stores it
 */
const toggleSetting = () => {
    let currentSetting = localStorage.getItem(STORAGE_KEY);

    switch (currentSetting) {
        case null:
            currentSetting =
                getCSSCustomProp(COLOR_MODE_KEY) === "dark" ? "light" : "dark";
            break;
        case "light":
            currentSetting = "dark";
            break;
        case "dark":
            currentSetting = "light";
            break;
    }

    localStorage.setItem(STORAGE_KEY, currentSetting);

    return currentSetting;
};

/**
 * A shared method for setting the button text label and visually hidden status element
 */
const setButtonLabel = currentSetting => {
    modeToggleText.innerText = `Switch to ${
        currentSetting === "dark" ? "dark" : "light"
    } theme`;
    // modeStatusElement.innerText = `Color mode is now "${currentSetting}"`;
};

/**
 * Clicking the button runs the apply setting method which grabs its parameter
 * from the toggle setting method.
 */
modeToggleButton.addEventListener("click", evt => {
    evt.preventDefault();

    applySetting(toggleSetting());
});

applySetting();
