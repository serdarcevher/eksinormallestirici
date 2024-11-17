const browserAPI = typeof browser !== 'undefined' ? browser : chrome;

browserAPI.action.onClicked.addListener(function (tab) {
    if (tab.url.indexOf("https://eksisozluk.com/") != -1) {
        browserAPI.tabs.sendMessage(tab.id, { action: "sortFavorites" });
    }
});
