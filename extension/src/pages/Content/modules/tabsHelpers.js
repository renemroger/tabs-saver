function getAllTabs() {
  return new Promise(function(resolve, reject) {
    chrome.tabs.query(
      {
        currentWindow: true,
      },
      function(tabs) {
        resolve(tabs);
      }
    );
  });
}

export { getAllTabs };
