import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import PropTypes from 'prop-types';
import TreeView from '@material-ui/lab/TreeView';
import TreeItem from '@material-ui/lab/TreeItem';
import Typography from '@material-ui/core/Typography';
import Label from '@material-ui/icons/Label';
import Link from '@material-ui/icons/Link';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import Box from '@material-ui/core/Box';
import uniqid from 'uniqid';

//TODO: REMOVE UNNECESARY CODE
const useTreeItemStyles = makeStyles((theme) => ({
  root: {
    color: theme.palette.text.secondary,
    '&:focus > $content': {
      backgroundColor: `var(--tree-view-bg-color, ${theme.palette.grey[400]})`,
      color: 'var(--tree-view-color)',
    },
  },
  content: {
    color: theme.palette.text.secondary,
    borderTopRightRadius: theme.spacing(2),
    borderBottomRightRadius: theme.spacing(2),
    paddingRight: theme.spacing(1),
    fontWeight: theme.typography.fontWeightMedium,
    '$expanded > &': {
      fontWeight: theme.typography.fontWeightRegular,
    },
  },
  group: {
    marginLeft: 0,
    '& $content': {
      paddingLeft: theme.spacing(2),
    },
  },
  expanded: {},
  label: {
    fontWeight: 'inherit',
    color: 'inherit',
  },
  labelRoot: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0.5, 0),
  },
  labelIcon: {
    marginRight: theme.spacing(1),
  },
  labelText: {
    fontWeight: 'inherit',
    flexGrow: 1,
  },
}));

function StyledTreeItem(props) {
  const classes = useTreeItemStyles();
  const {
    labelText,
    labelIcon: LabelIcon,
    labelInfo,
    color,
    bgColor,
    Tabs,
    ...other
  } = props;
  return (
    <TreeItem
      label={
        <div className={classes.labelRoot}>
          <LabelIcon color="inherit" className={classes.labelIcon} />
          <Typography variant="body2" className={classes.labelText}>
            {labelText}
          </Typography>
          <Typography variant="caption" color="inherit">
            {labelInfo}
          </Typography>
        </div>
      }
      style={{
        '--tree-view-color': color,
        '--tree-view-bg-color': bgColor,
      }}
      classes={{
        root: classes.root,
        content: classes.content,
        expanded: classes.expanded,
        group: classes.group,
        label: classes.label,
      }}
      {...other}
    />
  );
}

StyledTreeItem.propTypes = {
  bgColor: PropTypes.string,
  color: PropTypes.string,
  labelIcon: PropTypes.elementType.isRequired,
  labelInfo: PropTypes.string,
  labelText: PropTypes.string.isRequired,
};

export default function StyledCategoryNavigator(props) {
  const onNodeToggle = (nodeId, isExpanded) => {
    if (isExpanded) {
      props.setCurrentlyOpenedPanels((arr) => [...arr, nodeId]);
    } else {
      props.setCurrentlyOpenedPanels((arr) => [
        ...arr.filter((item) => item !== nodeId),
      ]);
    }
  };

  const nameShortener = (tabName, size) => {
    return `${tabName.slice(0, size)}...`;
  };

  return (
    <TreeView
      defaultCollapseIcon={<ArrowDropDownIcon />}
      defaultExpandIcon={<ArrowRightIcon />}
      defaultEndIcon={<div style={{ width: 24 }} />}
      defaultExpanded={props.currentlyOpenedPanels}
      onNodeToggle={onNodeToggle}
    >
      {props.categories &&
        props.categories.map((category, key) => {
          return (
            <StyledTreeItem
              key={uniqid()}
              nodeId={category.name}
              labelText={category.name}
              labelIcon={Label}
              // labelInfo={'1'}
            >
              {/*TODO: could be moved into function */}
              {props.groups &&
                props.groups.map((group, index) => {
                  //filtering out groups that dont belong to right category TODO: Could be improved
                  if (category.name === group.category) {
                    return (
                      <StyledTreeItem
                        key={uniqid()}
                        nodeId={group.id}
                        labelText={group.name}
                        labelIcon={Label}
                        //TODO: Icon from tab are .ICO
                        //use https://www.npmjs.com/package/ico-to-png to transform ICO to PNG
                        //use https://www.npmjs.com/package/potrace to transform PNG to SVG
                        // https://material-ui.com/components/icons/#svgicon to display SVG

                        labelInfo={'2'}
                      >
                        <div style={{ width: 450 }}>
                          <Box display="flex" p={1} bgcolor="background.paper">
                            <Box flexGrow={1}>
                              <a
                                style={{
                                  margin: 0,
                                  padding: 0,
                                  backgroundColor: '#A4EBC7',
                                }}
                                onClick={() => {
                                  chrome.runtime.sendMessage(
                                    {
                                      directive: 'open-click',
                                      groupId: group.id,
                                    },
                                    function(response) {
                                      //this.close();
                                    }
                                  );
                                }}
                              >
                                Open Tab
                              </a>
                            </Box>
                            <Box flexGrow={1}>
                              <a
                                style={{
                                  margin: 0,
                                  padding: 0,
                                  backgroundColor: '#00DFFF',
                                }}
                                onClick={() => {
                                  chrome.runtime.sendMessage(
                                    {
                                      directive: 'delete-click',
                                      groupId: group.id,
                                    },
                                    function(response) {
                                      //this.close();
                                    }
                                  );
                                }}
                              >
                                Delete Group
                              </a>
                            </Box>
                          </Box>
                        </div>
                        {group &&
                          group.data.map((tab, key) => {
                            return (
                              <StyledTreeItem
                                key={uniqid()}
                                nodeId={tab.id.toString()}
                                labelText={nameShortener(tab.url, 40)}
                                labelIcon={Link} //TODO: Dynamically load items from tab.favIcon
                              ></StyledTreeItem>
                            );
                          })}
                      </StyledTreeItem>
                    );
                  } else {
                    return <React.Fragment key={uniqid()}></React.Fragment>;
                  }
                })}
            </StyledTreeItem>
          );
        })}
    </TreeView>
  );
}
