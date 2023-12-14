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

var root = document.getElementsByTagName("html")[0];

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

const modeToggleButton = document.querySelector(".toggleButton");
const modeToggleText = document.querySelector(".themeMode");

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

const setButtonLabel = currentSetting => {
  if (currentSetting === "dark") {
            (document.documentElement.style.setProperty("--main-color", "#000"))
    
  } else{
             (document.documentElement.style.setProperty("--main-color", "#fff"))
  }
    modeToggleText.innerText = `Switch Theme`;
};

modeToggleButton.addEventListener("click", evt => {
    evt.preventDefault();

    applySetting(toggleSetting());
});

applySetting();
