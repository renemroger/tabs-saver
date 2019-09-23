var contextMenus = {};

contextMenus.createTestingMenu = chrome.contextMenus.create(
  {
    id: "testinContext",
    title: "testing",
    contexts: ["selection"]
  },
  function() {
    if (chrome.runtime.lastError) {
      console.error(chrome.runtime.lastError.message);
    }
  }
);
