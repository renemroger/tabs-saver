import React, { useEffect, useState } from 'react';
import { getStorageData } from '../Content/modules/storageHelpers';
import CategoryNavigator from './Components/CategoryNavigator';

import './Popup.css';

const Popup = () => {
  const [groups, setGroups] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getStorageData(null).then((result) => {
      let tabs = groupTabs(result);
      let categories = groupCategories(result);
      setGroups(tabs);
      setCategories(categories);
    });
  }, []);

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
              });
            }}
          >
            Delete Tabs
          </a>
        </li>
      </ul>
      <div className="sep"></div>
      <ul className="vertical">
        <li>
          <a
            onClick={() => {
              chrome.runtime.sendMessage({ directive: 'view-click' }, function(
                response
              ) {
                //this.close();
              });
            }}
          >
            Console Tabs
          </a>
        </li>
        <CategoryNavigator categories={categories} groups={groups}>
          {' '}
        </CategoryNavigator>
      </ul>
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

function groupCategories(result) {
  let categories = [];
  for (const groups in result) {
    const group = result[groups];
    categories.push(group.Category[0]);
  }
  return categories;
}

export default Popup;
