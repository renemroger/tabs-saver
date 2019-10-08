import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';
import OpenButton from './OpenButton';
import uniqid from 'uniqid';

const useStyles = makeStyles({
  root: {
    paddingTop: 30,
  },
});

export default function CategoryNavigator(props) {
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
              console.log(category === group.category);
              if (category === group.category) {
                return (
                  <TreeItem key={index} nodeId={uniqid()} label={group.name}>
                    <a
                      onClick={() => {
                        chrome.runtime.sendMessage(
                          { directive: 'open-click', groupId: group.id },
                          function(response) {
                            //this.close();
                          }
                        );
                      }}
                    >
                      Open Tab
                    </a>
                    {
                      <OpenButton
                        key={index}
                        group={group}
                        index={index}
                      ></OpenButton>
                    }
                  </TreeItem>
                );
              } else {
                return <></>;
              }
            })}
          </TreeItem>
        );
      })}
    </TreeView>
  );
}
