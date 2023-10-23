(async () => {
    const src = chrome.runtime.getURL('./db/websites.js');
    const contentMain = await import(src);

    contentMain.getWebsiteList(function (forbiddenSites) {
        const hostname = window.location.hostname;

        let forbidden = false;

        forbiddenSites.forEach((site) => {
                console.log(hostname.includes(site));
                if (hostname.includes(site)) {
                    forbidden = true;
                }
            }
        );

        if (forbidden) {
            console.log("Blocking Site!");

            document.head.innerHTML = ``;

            document.body.innerHTML = `
        <div id="wrapper">
            <p>BLOCKED</p>
        </div>
        `;

        }
    });
})();

