function clickHandler(e) {
  chrome.runtime.sendMessage({ directive: "popup-click" }, function(response) {
    this.close();
  });
}

document.addEventListener("DOMContentLoaded", function() {
  document.getElementById("click-me").addEventListener("click", clickHandler);
});
