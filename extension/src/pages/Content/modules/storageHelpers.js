const getStorageData = (key) =>
  new Promise((resolve, reject) =>
    chrome.storage.sync.get(key, (result) =>
      chrome.runtime.lastError
        ? reject(Error(chrome.runtime.lastError.message))
        : resolve(result)
    )
  );

const setStorageData = (data) =>
  new Promise((resolve, reject) =>
    chrome.storage.sync.set(data, () =>
      chrome.runtime.lastError
        ? reject(Error(chrome.runtime.lastError.message))
        : resolve(data)
    )
  );

async function saveData(tabs) {
  const groupName = prompt();

  if (groupName) {
    const { data } = await getStorageData(groupName);

    await setStorageData({ [groupName]: [tabs] }).then((data) => {
      console.log(data, 'was saved');
    });
  } else {
    alert('items were not saved');
  }
}

export { saveData, setStorageData, getStorageData };
