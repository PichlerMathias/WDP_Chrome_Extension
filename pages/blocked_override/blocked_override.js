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


                    clockScript.startClock(remainingSeconds, function () {
                        location.reload();
                    });


                }
            });
        }

    });
})();

const blockedHead =`
                        <style>
                            #timer {
                                justify-content: center; /* Horizontal centering */
                                align-items: center; /* Vertical centering */
                                display: flex;
                                background-color: #333;
                                color: #fff;
                                padding: 10px 20px;
                                border-radius: 5px;
                                width: 80px;
                            }
                         </style>
                    `;

const blockedBody = `
                        <div id="wrapper">
                            <p>BLOCKED</p>
                            <div id="timer" style="display: none;"></div>
                        </div>
                    `;

