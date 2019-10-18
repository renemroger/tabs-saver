import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';
import OpenButton from './OpenButton';
import uniqid from 'uniqid';

const useStyles = makeStyles({
  span: {
    float: 'left',
  },
});

export default function CategoryNavigatorSpider(props) {
  //TODO: REPLACE TI STYLEDTREEITEM : https://material-ui.com/components/tree-view/#gmail-clone
  const useStyles = makeStyles({
    root: {},
  });

  const onNodeToggle = (nodeId, isExpanded) => {
    if (isExpanded) {
      props.setCurrentlyOpenedPanels((arr) => [...arr, nodeId]);
    } else {
      props.setCurrentlyOpenedPanels((arr) => [
        ...arr.filter((item) => item !== nodeId),
      ]);
    }
  };
  const classes = useStyles();
  const groups = props.groups;
  return (
    <TreeView
      className={classes.root}
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpandIcon={<ChevronRightIcon />}
      defaultExpanded={props.currentlyOpenedPanels}
      onNodeToggle={onNodeToggle}
    >
      {props.categories.map((category, key) => {
        return (
          <TreeItem key={uniqid()} nodeId={category.name} label={category.name}>
            {groups.map((group, index) => {
              const GROUPCURRENTID = uniqid();

              //filtering out groups that dont belong to right category TODO: Could be improved
              if (category.name === group.category) {
                return (
                  <TreeItem key={uniqid()} nodeId={group.id} label={group.name}>
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
                    {/* <div>
                      {group &&
                        group.data.map((tab, key) => {
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
                                nodeId={tab.id.toString()}
                                label={tab.url}
                              ></TreeItem>
                            </div>
                          );
                        })}
                    </div> */}
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
