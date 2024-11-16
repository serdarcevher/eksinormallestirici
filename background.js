const browserAPI = typeof browser !== 'undefined' ? browser : chrome;

browserAPI.action.onClicked.addListener(function (tab) {
    if (
        tab.url.indexOf("https://eksisozluk.com/") != -1)
        {
        browserAPI.scripting.executeScript({
            target: { tabId: tab.id },
            files: ['favorileri_sirala.js']
        });
    }
});
