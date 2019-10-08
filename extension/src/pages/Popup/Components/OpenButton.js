import React from 'react';
import TreeItem from '@material-ui/lab/TreeItem';
import uniqid from 'uniqid';
export default function OpenButton(props) {
  return (
    <>
      {props.group &&
        props.group.data.map((tab, key) => {
          return (
            <TreeItem key={key} nodeId={uniqid()} label={tab.url}></TreeItem>
          );
        })}
    </>
  );
}
