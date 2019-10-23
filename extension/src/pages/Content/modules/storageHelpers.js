import uniqid from 'uniqid';
import { getAllTabs } from './tabsHelpers';

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

async function saveData(
  categoryName = prompt('Enter Category name'),
  groupName = prompt('Enter Group name')
) {
  let userId = 'test';
  getAllTabs().then((tabs) => {
    if (!categoryName) categoryName = 'default';
    if (!groupName) groupName = 'default';

    let groupKey = uniqid('groupKey-');

    setStorageData({
      [groupKey]: {
        name: groupName,
        category: categoryName,
        tabs: tabs,
      },
    }).then((data) => {
      getStorageData(null).then((result) => {
        console.log(result);
      });
    });
  });
}

export { saveData, setStorageData, getStorageData };
