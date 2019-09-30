chrome.storage.sync.clear(function() {
  var error = chrome.runtime.lastError;
  if (error) {
    console.error(error);
  }
  console.log("all tabs removed");
});
