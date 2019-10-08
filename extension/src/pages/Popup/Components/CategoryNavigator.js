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

  console.log(groups);
  return (
    <TreeView
      className={classes.root}
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpandIcon={<ChevronRightIcon />}
    >
      {props['categories'].map((category, key) => {
        return (
          <TreeItem nodeId={uniqid()} label={category}>
            {groups.map((group, index) => {
              return (
                <TreeItem key={index} nodeId={uniqid()} label={group.name}>
                  <OpenButton
                    key={index}
                    group={group}
                    index={index}
                  ></OpenButton>
                </TreeItem>
              );
            })}
          </TreeItem>
        );
      })}
    </TreeView>
  );
}
