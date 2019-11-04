/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import { getStorageData, saveData } from '../Content/modules/storageHelpers';
import { getAllGroups, getAllCategories } from '../Content/modules/tabsHelpers';
import StyledCategoryNavigator from './Components/StyledCategoryNavigator';
import SaveTab from './Components/SaveTab';
import uniqid from 'uniqid';

import './Popup.css';

const Popup = () => {
  const [groups, setGroups] = useState([]);
  const [categories, setCategories] = useState([]);
  const [refresher, setRefresher] = useState(false);
  const [currentlyOpenedPanels, setCurrentlyOpenedPanels] = useState([]);
  const [isGroupsEmpty, setIsGroupEmpty] = useState(true);

  useEffect(() => {
    getStorageData(null)
      .then((result) => {
        if (
          Object.entries(result).length !== 0 &&
          result.constructor === Object
        ) {
          setIsGroupEmpty(false);
        }
        setCategories(getAllCategories(result));
        setGroups(getAllGroups(result));
      })
      .then(() => {
        setRefresher(false);
      });
  }, [refresher]);

  return (
    <div id="main-menu" className="layout-view">
      <ul className="vertical">
        <li>
          <a
            onClick={() => {
              chrome.runtime.sendMessage({ directive: 'empty-click' }, function(
                response
              ) {
                setRefresher(true);
              });
            }}
          >
            Delete All Tabs
          </a>
        </li>
      </ul>
      <div className="sep"></div>
      <SaveTab categories={categories} setRefresher={setRefresher} />
      <div className="sep"></div>
      {isGroupsEmpty && <p>No Saved Tabs</p>}
      <StyledCategoryNavigator
        setRefresher={setRefresher}
        key={uniqid()}
        categories={categories}
        groups={groups}
        setCurrentlyOpenedPanels={setCurrentlyOpenedPanels}
        currentlyOpenedPanels={currentlyOpenedPanels}
      >
        {' '}
      </StyledCategoryNavigator>
    </div>
  );
};

export default Popup;
