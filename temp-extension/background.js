chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  getAllTabs().then(tabs => {
    chrome.tabs.executeScript(
      null,
      {
        code: "var tabs = " + JSON.stringify(tabs)
      },
      () => {
        switch (request.directive) {
          case "popup-click":
            chrome.tabs.executeScript(null, {
              file: "contentscript.js"
            });
            break;
          default:
            alert("yo");
        }
        sendResponse({});
      }
    );
  });
  return true;
});

function getAllTabs() {
  return new Promise(function(resolve, reject) {
    chrome.tabs.query(
      {
        currentWindow: true
      },
      function(tabs) {
        resolve(tabs);
      }
    );
  });
}
