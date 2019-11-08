import '../../assets/img/icon16.png';
import '../../assets/img/icon32.png';
import '../../assets/img/icon64.png';
import '../../assets/img/icon128.png';

import {
  getStorageData,
  setStorageData,
  deleteStorageData,
} from '../Content/modules/storageHelpers';

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  switch (request.directive) {
    case 'open-single':
      chrome.tabs.create({ url: request.tabUrl }, function() {
        //create tabs in new window
      });
      break;
    case 'delete-single':
      //get group
      getStorageData(request.groupId).then((result) => {
        deleteStorageData(request.groupId).then(() => {
          result[request.groupId].tabs.splice(request.urlKey, 1);
          setStorageData(result);
        });

        chrome.storage.sync.set(result, () => {
          var error = chrome.runtime.lastError;
          if (error) {
            console.error(error);
          }
        });
      });

      //console.log(result[request.groupId].tabs);

      break;
    case 'open-click':
      //get priveiously saved tabs
      chrome.storage.sync.get([request.groupId], (result) => {
        if (
          Object.entries(result).length !== 0 &&
          result.constructor === Object
        ) {
          chrome.windows.create({}, function() {
            //create tabs in new window
            for (const tab of result[request.groupId].tabs) {
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
        }
      });
      break;
    case 'empty-click':
      //bore
      getStorageData(null).then((result) => {
        console.log(result);
      });
      chrome.storage.sync.clear(function() {
        var error = chrome.runtime.lastError;
        if (error) {
          console.error(error);
        }
        //after
        getStorageData(null).then((result) => {
          console.log(result);
        });
      });
      break;
    case 'delete-click':
      deleteStorageData(request.groupId);
      break;
    default:
      alert('Case not found');
  }
  sendResponse({});
  return true;
});
