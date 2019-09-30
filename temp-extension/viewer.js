chrome.storage.sync.get(["data"], result => {
  if (result.data) {
    for (const tab of result.data[0]) {
      console.log(tab.url);
    }
  } else {
    console.log("na saved tabs");
  }
});
