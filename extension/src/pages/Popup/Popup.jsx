import React, { useEffect, useState } from 'react';
import { getStorageData } from '../Content/modules/storageHelpers';
import CategoryNavigator from './Components/CategoryNavigator';

import './Popup.css';

const Popup = () => {
  const [groups, setGroups] = useState([]);
  const [categories, setCategories] = useState(['Category 1', 'Category 2']);

  useEffect(() => {
    getStorageData(null).then((result) => {
      let tabs = [];
      for (const newTabs in result) {
        // console.log(result[newTabs][0]);
        tabs.push({ name: newTabs, data: result[newTabs][0] });
      }
      setGroups(...groups, tabs);
    });
  }, []);

  return (
    <div id="main-menu" className="layout-view">
      <ul className="vertical">
        <li>
          <a
            onClick={() => {
              chrome.runtime.sendMessage({ directive: 'spider-save' }, function(
                response
              ) {
                //this.close();
              });
            }}
          >
            Spider Save
          </a>
        </li>
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
            View Tabs
          </a>
        </li>
        <CategoryNavigator categories={categories} groups={groups}>
          {' '}
        </CategoryNavigator>
      </ul>
    </div>
  );
};

export default Popup;
