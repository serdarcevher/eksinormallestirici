document.addEventListener("DOMContentLoaded", () => {
  const trollList = document.getElementById("trollList");
  const saveButton = document.getElementById("save");
  const clearButton = document.getElementById("clear");

  // Kaydedilmiş listeyi yükle
  chrome.storage.local.get(["trollList"], (result) => {
    if (result.trollList) {
      trollList.value = result.trollList.join("\n");
    }
  });

  // Kaydet butonuna tıklandığında
  saveButton.addEventListener("click", () => {
    const trolls = trollList.value
      .split("\n")
      .map((line) => line.trim().toLowerCase())
      .filter((line) => line !== "");

    chrome.storage.local.set({ trollList: trolls }, () => {
      // Content script'e listeyi güncellediğimizi bildir
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, {
          action: "updateTrollList",
          trollList: trolls,
        });
      });
    });
  });

  // Temizle butonuna tıklandığında
  clearButton.addEventListener("click", () => {
    trollList.value = "";
    chrome.storage.local.remove(["trollList"], () => {
      // Content script'e listeyi temizlediğimizi bildir
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, {
          action: "updateTrollList",
          trollList: [],
        });
      });
    });
  });
});
