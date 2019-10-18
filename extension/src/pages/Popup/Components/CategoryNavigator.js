import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';
import OpenButton from './OpenButton';
import uniqid from 'uniqid';

//TODO: REPLACE TI STYLEDTREEITEM : https://material-ui.com/components/tree-view/#gmail-clone

export default function CategoryNavigator(props) {
  const useStyles = makeStyles({
    root: {},
  });
  const classes = useStyles();
  const groups = props.groups;
  return (
    <TreeView
      className={classes.root}
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpandIcon={<ChevronRightIcon />}
    >
      {props['categories'].map((category, key) => {
        return (
          <TreeItem key={uniqid()} nodeId={uniqid()} label={category}>
            {groups.map((group, index) => {
              if (category === group.category) {
                return (
                  <TreeItem key={uniqid()} nodeId={uniqid()} label={group.name}>
                    <a
                      onClick={() => {
                        chrome.runtime.sendMessage(
                          { directive: 'open-click', groupId: group.id },
                          function(response) {
                            this.close();
                          }
                        );
                      }}
                    >
                      Open Tab
                    </a>
                    {
                      <OpenButton
                        key={uniqid()}
                        group={group}
                        index={index}
                      ></OpenButton>
                    }
                  </TreeItem>
                );
              } else {
                return <React.Fragment key={uniqid()}></React.Fragment>;
              }
            })}
          </TreeItem>
        );
      })}
    </TreeView>
  );
}
