import { getStorageData } from './storageHelpers';

function printGroups(key) {
  getStorageData(key).then((result) => {
    //testing if we got an object back.
    if (Object.entries(result).length !== 0 && result.constructor === Object) {
      for (const groups in result) {
        const group = result[groups];
        const tabs = {
          name: group.GroupName[0],
          data: group.Data[0],
          id: group.Id[0],
        };
        console.log(`Name: ${tabs.name}, Id: ${tabs.id}`);
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
