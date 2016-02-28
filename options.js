// Saves options to chrome.storage
function save_options() {
  var topicPageSize = document.getElementById('topicPageSize').value;

  chrome.storage.sync.set({
    topicPageSize: topicPageSize
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Ayarlar kaydedildi.';
    setTimeout(function() {
      status.textContent = '';
    }, 3000);
  });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  chrome.storage.sync.get({
    topicPageSize: 10
  }, function(items) {
    document.getElementById('topicPageSize').value = items.topicPageSize;
  });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',  save_options);