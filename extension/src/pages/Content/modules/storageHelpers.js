import uniqid from 'uniqid';
import { compose } from '@material-ui/system';

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
  let categoryName = prompt('Enter Category name');
  let groupName = prompt('Enter Group name');
  if (!categoryName) categoryName = 'Non-Default';

  if (groupName) {
    let groupKey = uniqid('groupKey-');
    await setStorageData({
      [groupKey]: {
        Data: [tabs],
        GroupName: [groupName],
        Category: [categoryName],
        Id: [groupKey],
      },
    }).then((data) => {
      console.log(data, 'was saved');
    });
  } else {
    alert('items were not saved');
  }
}

export { saveData, setStorageData, getStorageData };
