$(() => {
  $("#save-tabs").click(() => {
    chrome.runtime.sendMessage({ directive: "save-click" }, function(response) {
      this.close();
    });
  });
  $("#open-tabs").click(() => {
    chrome.runtime.sendMessage({ directive: "open-click" }, function(response) {
      this.close();
    });
  });
  $("#empty-tabs").click(() => {
    chrome.runtime.sendMessage({ directive: "empty-click" }, function(
      response
    ) {
      this.close();
    });
  });
  $("#view-tabs").click(() => {
    chrome.runtime.sendMessage({ directive: "view-click" }, function(response) {
      this.close();
    });
  });
});
