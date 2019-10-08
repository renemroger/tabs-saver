import { getStorageData } from './storageHelpers';

function printGroups(key) {
  getStorageData(key).then((result) => {
    if (Object.entries(result).length !== 0 && result.constructor === Object) {
      for (const groups in result) {
        const tabs = { name: groups, data: result[groups][0] };
        for (const tab of tabs.data) {
          console.log(tab.url);
        }
      }
    } else {
      console.log('No data');
    }
  });
}
export { printGroups };
