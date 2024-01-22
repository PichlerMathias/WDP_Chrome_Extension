// function that overrides the content of the blocked page
// with a timer and the option to cancel the timer or unblock the website
(async () => {
    const websitesScript = await import(chrome.runtime.getURL('./db/websites.js'));
    const clockScript = await import(chrome.runtime.getURL('./pages/timer/clock.js'));

    websitesScript.getWebsiteList(function (forbiddenSites) {
        const hostname = window.location.hostname;

        let forbidden = false;

        forbiddenSites.forEach((site) => {
                if (hostname.includes(site)) {
                    forbidden = true;
                }
            }
        );

        if (forbidden) {
            clockScript.getRemainingSeconds(function (remainingSeconds) {
                if (remainingSeconds > 0) {
                    document.head.innerHTML = blockedHead;
                    document.body.innerHTML = blockedBody;

                    let cancel = document.getElementById("cancel");
                    cancel.addEventListener("click", function () {
                        clockScript.cancelClock();
                        location.reload();
                    });

                    let deblock = document.getElementById("deblockWebsite");
                    deblock.addEventListener("click", function () {
                        console.log("Try to deblock site: ");
                        websitesScript.removeWebsiteContaining(hostname, function (){
                            location.reload();
                        });
                    });

                    clockScript.initClock(function (timerIsRunning) {
                        console.log("timerIsRunning: ", timerIsRunning);
                        if (timerIsRunning) {
                            clockScript.getRemainingSeconds(function (remainingSeconds, limit) {
                                clockScript.startClock(remainingSeconds, limit, () => location.reload());
                            });
                        }

                    })

                }
            });
        }

    });
})();

const blockedHead =`
                        <style>
:root {
    /* colors */
    --colorBackground: #F5F5F5FF;
    --colorAccentBackground: #e5e4e4;

    --colorButton: #a3dec9;
    --colorButtonOutline: #3E9C80;
    --colorButtonText: #127054;

    --colorLightRed: #FFB38A;
    --colorLightYellow: #FFD18A;

    --colorText: #232323;
}

@media (prefers-color-scheme: dark) {
    :root {
        --colorBackground: #232323;
        --colorAccentBackground: #414040;

        --colorButton: #22655d;
        --colorButtonOutline: #255b49;
        --colorButtonText: #b5f3db;

        --colorText: #F5F5F5FF;
    }
}

body {
    background-color: var(--colorBackground);
    color: var(--colorText);
}

.wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
}

.buttonContainer {
    display: flex;
    gap: 10px; 
}

.custombtn {
    background-color: var(--colorButton);
    border: 2px solid var(--colorButtonOutline);
    padding: 8px 16px;
    color: var(--colorButtonText);
    font-weight: bold;
}

.custombtn:hover {
    background-color: var(--colorAccentBackground);
    color: var(--colorText);
}

p {
    font-family: "Calibri Light", sans-serif;
    font-size: 20px;
}

#timer {

}

.base-timer {
    position: relative;
    width: 300px;
    height: 300px;
}

.base-timer__svg {
    transform: scaleX(-1);
}

.base-timer__circle {
    fill: none;
    stroke: none;
}

.base-timer__path-elapsed {
    stroke-width: 7px;
    stroke: #c4c4c4;
}

.base-timer__path-remaining {
    stroke-width: 7px;
    stroke-linecap: round;
    transform: rotate(90deg);
    transform-origin: center;
    transition: 1s linear all;
    fill-rule: nonzero;
    stroke: currentColor;
}

.base-timer__path-remaining.green {
    color: var(--colorButton);
}

.base-timer__path-remaining.orange {
    color: var(--colorLightYellow);
}

.base-timer__path-remaining.red {
    color: var(--colorLightRed);
}

.base-timer__label {
    position: absolute;
    width: 300px;
    height: 300px;
    top: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 48px;
}
                         </style>
                    `;

const blockedBody = `
                        <div class="wrapper">
                            <p>The timer is still running! Get back to work!</p>
                            <div class="timer" id="timer" style="display: none;"></div>
                            <p>You can stop the timer, or remove the page from blocked pages, if you need it for studying</p>
                            <div class="buttonContainer">
                                <button id="cancel" class="custombtn">Cancel</button>
                                <button id="deblockWebsite" class="custombtn">Webseite entblockieren</button>
                            </div>
                        </div>
                    `;

