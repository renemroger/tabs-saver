import '../../assets/img/icon16.png';
import '../../assets/img/icon32.png';
import '../../assets/img/icon64.png';
import '../../assets/img/icon128.png';
import { printGroups } from '../Content/modules/funcionalHelpers';
import { getAllTabs } from '../Content/modules/tabsHelpers';
import {
  saveData,
  setStorageData,
  getStorageData,
} from '../Content/modules/storageHelpers';

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
