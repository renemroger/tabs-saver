import React, { Component } from 'react';
import './Popup.css';

class Popup extends Component {
  render() {
    return (
      <div id="main-menu" class="layout-view">
        <ul class="vertical">
          <li>
            <button
              onClick={() => {
                chrome.runtime.sendMessage(
                  { directive: 'save-click' },
                  function(response) {
                    this.close();
                  }
                );
              }}
            >
              Save Tabs
            </button>
          </li>
          <li>
            <button
              onClick={() => {
                chrome.runtime.sendMessage(
                  { directive: 'view-click' },
                  function(response) {
                    this.close();
                  }
                );
              }}
            >
              View Tabs
            </button>
          </li>
          <li>
            <button
              onClick={() => {
                chrome.runtime.sendMessage(
                  { directive: 'empty-click' },
                  function(response) {
                    this.close();
                  }
                );
              }}
            >
              Delete Tabs
            </button>
          </li>
        </ul>
        <div class="sep"></div>
        <ul class="vertical">
          <li>
            <button
              onClick={() => {
                chrome.runtime.sendMessage(
                  { directive: 'open-click' },
                  function(response) {
                    this.close();
                  }
                );
              }}
            >
              Open Tabs
            </button>
          </li>
        </ul>
      </div>
    );
  }
}

export default Popup;
