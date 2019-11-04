import React from 'react';
export default function DeleteButton(props) {
  if (props.displayDelete) {
    return (
      <button
        onClick={() => {
          props.setDisplayDelete(false);
        }}
      >
        Delete
      </button>
    );
  } else {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignContent: 'stretch',
          justifyContent: 'space-evenly',
        }}
      >
        <button
          onClick={() => {
            chrome.runtime.sendMessage(
              {
                directive: 'delete-click',
                groupId: props.groupId,
              },
              function(response) {
                props.setRefresher(true);
                props.setDisplayDelete(false);
              }
            );
          }}
        >
          Confirm
        </button>{' '}
        <button
          onClick={() => {
            props.setRefresher(true);
            props.setDisplayDelete(true);
          }}
        >
          Cancel
        </button>
      </div>
    );
  }
}
