const browserAPI = typeof browser !== "undefined" ? browser : chrome;

browserAPI.action.onClicked.addListener(function (tab) {
  if (tab.url.indexOf("https://eksisozluk.com/") != -1) {
    browserAPI.tabs.sendMessage(tab.id, { action: "sortFavorites" });
  }
});

chrome.runtime.onInstalled.addListener(() => {
  console.log("Eklenti yüklendi");
});

// Content script'lerin yüklenmesini sağla
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (
    changeInfo.status === "complete" &&
    tab.url?.startsWith("https://eksisozluk.com")
  ) {
    chrome.scripting.executeScript({
      target: { tabId: tabId },
      files: ["script.js"],
    });
  }
});
