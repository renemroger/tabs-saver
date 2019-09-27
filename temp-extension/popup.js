$(() => {
  $("#save-tabs").click(() => {
    chrome.runtime.sendMessage({ directive: "popup-click" }, function(
      response
    ) {
      this.close();
    });
  });
});
// document.addEventListener("DOMContentLoaded", function() {
//   document.getElementById("save-tabs").addEventListener("click", clickHandler);
// });
