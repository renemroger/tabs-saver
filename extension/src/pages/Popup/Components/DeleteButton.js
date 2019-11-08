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
          onClick={(event) => {
            event.preventDefault();
            chrome.runtime.sendMessage(
              {
                directive: 'delete-click',
                groupId: props.groupId,
              },
              function(response) {
                props.setDisplayDelete(false);
                props.setRefresher(true);
              }
            );
          }}
        >
          Confirm
        </button>{' '}
        <button
          onClick={(event) => {
            event.preventDefault();
            props.setDisplayDelete(true);
          }}
        >
          Cancel
        </button>
      </div>
    );
  }
}
