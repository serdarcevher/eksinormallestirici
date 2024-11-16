chrome.action.onClicked.addListener(function (tab) { //kullanici ikona tikladiginda calisir
    if (
        tab.url.indexOf("https://eksisozluk.com/") != -1)
        {
        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            files: ['favorileri_sirala.js']
        });
    }
});
