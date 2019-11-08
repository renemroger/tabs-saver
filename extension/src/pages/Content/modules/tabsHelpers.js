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

function getAllCategories(result) {
  const categories = [];
  for (const groups in result) {
    const group = result[groups];
    categories.push({ name: group.category });
  }
  //filter duplicate categories
  return [...new Map(categories.map((item) => [item['name'], item])).values()];
}

function getAllGroups(result) {
  let tabs = [];
  for (const groups in result) {
    const group = result[groups];
    const groupId = groups;
    tabs.push({
      name: group.name,
      category: group.category,
      data: group.tabs,
      id: groupId,
    });
  }
  return tabs;
}

function createGroupTabs(result) {
  let tabs = [];
  for (const groups in result) {
    const group = result[groups];
    tabs.push({
      name: group.GroupName[0],
      category: group.Category[0],
      data: group.Data[0],
      id: group.Id[0],
    });
  }
  return tabs;
}

//get unique categories. object contains name and id
function createGroupCategories(result) {
  const categories = [];
  for (const groups in result) {
    const group = result[groups];
    categories.push({ name: group.Category[0] });
  }
  return [...new Map(categories.map((item) => [item['name'], item])).values()];
}

export {
  getAllTabs,
  createGroupTabs,
  createGroupCategories,
  getAllGroups,
  getAllCategories,
};
