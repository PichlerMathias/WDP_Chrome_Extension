const defaultWebsiteList = [
    'www.netflix.com',
    'www.youtube.com',
    'www.instagram.com'
]

const webSiteListName = 'websiteList';

export function initWebsites(callback) {
    getWebsiteList(function (retrievedList) {
        if(retrievedList == null){
            setWebsiteList(defaultWebsiteList, function () {
                callback();
            });
        }
    })
}

export function setWebsiteList(websiteList, callback) {
    console.log("Trying to set data: ", JSON.stringify(websiteList));

    chrome.storage.local.set({webSiteListName: JSON.stringify(websiteList)}, function () {
        console.log("Set websites: ", websiteList)
        callback(null);
    });
}

export function getWebsiteList(callback) {
    chrome.storage.local.get({webSiteListName}, function (data) {
        console.log("raw data: ", data.webSiteListName);

        try {
            let json = JSON.parse(data.webSiteListName);
            callback(json);
        } catch (error) {
            if (error instanceof SyntaxError) {
                console.log("No websites set");
                callback(null);
            }
            else {
                throw error;
            }
        }
    });
}

export function addWebsite(website, callback) {
    getWebsiteList(function (retrievedList) {
        retrievedList.push(website);
        setWebsiteList(retrievedList, function () {
            callback();
        });
    })
}

export function removeWebsite(website, callback) {
    getWebsiteList(function (retrievedList) {

        const updatedList = retrievedList.filter(item => item !== website);
        setWebsiteList(updatedList, function () {
            callback();
        });
    });
}


export function removeWebsiteContaining(website, callback) {
    getWebsiteList(function (retrievedList) {

        const updatedList = retrievedList.filter(item => !website.includes(item));
        setWebsiteList(updatedList, function () {
            callback();
        });
    });
}