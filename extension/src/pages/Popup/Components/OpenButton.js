import React from 'react';
import TreeItem from '@material-ui/lab/TreeItem';
import { makeStyles } from '@material-ui/core/styles';
import uniqid from 'uniqid';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';

//TODO: REPLACE TI STYLEDTREEITEM : https://material-ui.com/components/tree-view/#gmail-clone

export default function OpenButton(props) {
  const useStyles = makeStyles({});
  const classes = useStyles();
  return (
    <div>
      {props.group &&
        props.group.data.map((tab, key) => {
          return (
            <div
              style={{
                flexDirection: 'row',
              }}
              key={key}
            >
              <img
                style={{
                  alignSelf: 'stretch',
                  width: 16,
                  height: 16,
                }}
                src={tab.favIconUrl}
              ></img>

              <TreeItem
                style={{ flexWrap: 'nowrap' }}
                nodeId={uniqid()}
                label={tab.url}
              ></TreeItem>
            </div>
          );
        })}
    </div>
  );
}
