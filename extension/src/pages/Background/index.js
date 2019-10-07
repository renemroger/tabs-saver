import '../../assets/img/icon16.png';
import '../../assets/img/icon32.png';
import '../../assets/img/icon64.png';
import '../../assets/img/icon128.png';

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  switch (request.directive) {
    case 'save-click':
      console.log('save');
      getAllTabs().then((tabs) => {
        saveData(tabs);
      });
      break;
    case 'open-click':
      //get priveiously saved tabs
      chrome.storage.sync.get(['data'], (result) => {
        if (result.data) {
          //create new window
          chrome.windows.create({}, function() {
            //create tabs in new window
            for (const tab of result.data[0]) {
              chrome.tabs.create({ url: tab.url });
            }
          });
          chrome.tabs.query(
            {
              currentWindow: true,
            },
            (tabs) => {
              //delete empty tab from new window
              if (tabs[0] && tabs[0].url === 'chrome://newtab/') {
                chrome.tabs.remove(tabs[0].id);
              }
            }
          );
        } else {
          console.log('na saved tabs');
        }
      });
      break;
    case 'empty-click':
      chrome.storage.sync.clear(function() {
        var error = chrome.runtime.lastError;
        if (error) {
          console.error(error);
        }
        console.log('all tabs removed');
      });

      break;
    case 'view-click':
      printGroups(null); //null as argument finds all storedData
      break;
    default:
      alert('Case not found');
  }
  sendResponse({});
  return true;
});

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

function printGroups(key) {
  getStorageData(key)
    .then((result) => {
      for (const groups in result) {
        console.log(groups);
        const tabs = { name: groups, data: result[groups][0] };
        for (const tab of tabs.data) {
          console.log(tab.url);
        }
      }
    })
    .catch((error) => {
      console.log('nothing found');
    });
}

// if (result) {
// } else {
//   console.log('na saved tabs');
// }

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
  console.log('saving');
  const groupName = prompt();

  if (groupName) {
    const { data } = await getStorageData(groupName);

    await setStorageData({ [groupName]: [tabs] }).then((data) => {
      console.log(data, ' was saved');
    });
  } else {
    alert('items were not saved');
  }
}
