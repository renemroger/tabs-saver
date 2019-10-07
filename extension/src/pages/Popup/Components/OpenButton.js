import React from 'react';
export default function OpenButton(props) {
  return (
    <>
      <a onClick={props.onClick}>{props.tabs.name}</a>
      <ul>
        {props.tabs.data.map((tab) => {
          return <li>{tab.url}</li>;
        })}
      </ul>
    </>
  );
}
