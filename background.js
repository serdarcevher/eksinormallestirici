chrome.browserAction.onClicked.addListener(function (tab) { //kullanici ikona tikladiginda calisir
    if (tab.url.indexOf("https://eksisozluk.com/") != -1 || tab.url.indexOf("https://eksisozluk2023.com/") != -1) {

        chrome.tabs.executeScript(tab.id, {
            "file": "favorileri_sirala.js"
        });
    }
});
