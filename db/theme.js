// updateColorScheme (in main aufgerufen)
// eigenen db eintrag checken getmode
// wenn set => return
// else
// setmode (default user conf)

// setmode
// getmode

// settings-page:
// setmode aufrufen wenn toggle

const currentThemeObject = 'currentThemeObject';

export function updateColorScheme() {
    let isDarkMode = DarkMode();
    if (isDarkMode === null) {
        isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;

    }
        if (isDarkMode) {
            let currentThemeObject = {theme: 'dark'};
            //chrome.storage.local.set({currentThemeObject}, function (data) ....
            localStorage.setItem('darkMode', 'true');
        } else {
            let currentThemeObject = {theme: 'light'};
            //chrome.storage.local.set({currentThemeObject}, function (data) ....
            localStorage.setItem('darkMode', 'false');
        }

    setMode(false); // not switching

}

function DarkMode() {
    const currMode = localStorage.getItem('darkMode');
    //chrome.storage.local.get({currentThemeObject}, function (data) ....
    if (currMode === null) {
        return null;
    }
    //return currMode === 'true';

    chrome.storage.local.get({currentThemeObject}, function (data) {
        let json = JSON.parse(data.currentCountdownObject);
    });

}

export function setMode(doSwitch) {
    let isDarkMode = localStorage.getItem('darkMode');
    let themeObject = {theme: dark};
    if (doSwitch) {
        if (isDarkMode === 'true') {
            document.body.classList.remove('dark-mode');
        } else {
            document.body.classList.add('dark-mode');
        }
    } else {
        if (isDarkMode === 'true') {
            document.body.classList.add('dark-mode');
        }
    }
}
