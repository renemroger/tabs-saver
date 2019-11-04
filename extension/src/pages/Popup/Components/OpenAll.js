import React from 'react';
export default function OpenAll(props) {
  return (
    <button
      onClick={() => {
        chrome.runtime.sendMessage(
          {
            directive: 'open-click',
            groupId: props.groupId,
          },
          function(response) {
            props.setRefresher(true);
          }
        );
      }}
    >
      OpenAll
    </button>
  );
}
