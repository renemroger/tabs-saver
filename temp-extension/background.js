chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  switch (request.directive) {
    case "save-click":
      //Read all Tabs currently opened
      getAllTabs().then(tabs => {
        //work around to pass tabs object to the saver.js script
        chrome.tabs.executeScript(
          null,
          {
            code: "var tabs = " + JSON.stringify(tabs)
          },
          () => {
            chrome.tabs.executeScript(null, {
              file: "saver.js"
            });
          }
        );
      });
      break;
    case "open-click":
      chrome.tabs.executeScript(null, {
        file: "opener.js"
      });
      break;
    case "empty-click":
      chrome.tabs.executeScript(null, {
        file: "empty.js"
      });
      break;
    case "view-click":
      chrome.tabs.executeScript(null, {
        file: "viewer.js"
      });
      break;
    default:
      alert("Case not found");
  }
  sendResponse({});
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
