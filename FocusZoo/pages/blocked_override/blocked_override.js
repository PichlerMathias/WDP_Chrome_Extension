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

/*cannot use main.css, the styles will not be applied*/
.custombtn {
    background-color: #a3dec9;
    border: 2px solid #3E9C80;
    padding: 8px 16px;
    color: #127054;
    font-weight: bold;
}

.custombtn:hover {
    background-color: #f2f2f2;
    color: #000000;
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
    color: #83C5B1;
}

.base-timer__path-remaining.orange {
    color: #FFD18A;
}

.base-timer__path-remaining.red {
    color: #FFB38A;
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

