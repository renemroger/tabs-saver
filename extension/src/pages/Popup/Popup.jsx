import React, { useEffect, useState } from 'react';
import { getStorageData } from '../Content/modules/storageHelpers';
import CategoryNavigator from './Components/CategoryNavigator';
import uniqid from 'uniqid';

import './Popup.css';

const Popup = () => {
  const [groups, setGroups] = useState([]);
  const [categories, setCategories] = useState([]);
  const [refresher, setRefresher] = useState(false);
  const [currentlyOpenedPanels, setCurrentlyOpenedPanels] = useState([]);

  useEffect(() => {
    getStorageData(null).then((result) => {
      setGroups(groupTabs(result));
      setCategories(groupCategories(result));
      setRefresher(false);
    });
  }, [refresher]);

  return (
    <div id="main-menu" className="layout-view">
      <ul className="vertical">
        <li>
          <a
            onClick={() => {
              chrome.runtime.sendMessage({ directive: 'save-click' }, function(
                response
              ) {
                //this.close();
                setRefresher(true);
              });
            }}
          >
            Save Tabs
          </a>
        </li>
        <li>
          <a
            onClick={() => {
              chrome.runtime.sendMessage({ directive: 'empty-click' }, function(
                response
              ) {
                //this.close();
                setRefresher(true);
              });
            }}
          >
            Delete All Tabs
          </a>
        </li>
        <li>
          <a
            onClick={() => {
              chrome.runtime.sendMessage({ directive: 'view-click' }, function(
                response
              ) {
                // this.close();
              });
            }}
          >
            Console Tabs
          </a>
        </li>
      </ul>
      <div className="sep"></div>
      <CategoryNavigator
        key={uniqid()}
        categories={categories}
        groups={groups}
        setCurrentlyOpenedPanels={setCurrentlyOpenedPanels}
        currentlyOpenedPanels={currentlyOpenedPanels}
      >
        {' '}
      </CategoryNavigator>
    </div>
  );
};

function groupTabs(result) {
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
function groupCategories(result) {
  const categories = [];
  for (const groups in result) {
    const group = result[groups];
    categories.push({ name: group.Category[0] });
  }
  return [...new Map(categories.map((item) => [item['name'], item])).values()];
}

export default Popup;
