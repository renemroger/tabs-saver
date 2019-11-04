import '../../assets/img/icon16.png';
import '../../assets/img/icon32.png';
import '../../assets/img/icon64.png';
import '../../assets/img/icon128.png';
import { saveData } from '../Content/modules/storageHelpers';

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  switch (request.directive) {
    case 'save-click':
      // saveData();
      break;
    case 'open-click':
      //get priveiously saved tabs
      chrome.storage.sync.get([request.groupId], (result) => {
        if (
          Object.entries(result).length !== 0 &&
          result.constructor === Object
        ) {
          console.log(result[request.groupId].tabs);
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
      chrome.storage.sync.clear(function() {
        var error = chrome.runtime.lastError;
        if (error) {
          console.error(error);
        }
        console.log('all tabs removed');
      });
      break;
    default:
      alert('Case not found');
  }
  sendResponse({});
  return true;
});
