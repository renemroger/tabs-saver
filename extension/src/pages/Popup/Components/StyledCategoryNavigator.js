import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import TreeView from '@material-ui/lab/TreeView';
import TreeItem from '@material-ui/lab/TreeItem';
import Typography from '@material-ui/core/Typography';
import Label from '@material-ui/icons/Label';
import Link from '@material-ui/icons/Link';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import InfoIcon from '@material-ui/icons/Info';
import ForumIcon from '@material-ui/icons/Forum';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import Icon from '@material-ui/core/Icon';
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

const useStyles = makeStyles({
  root: {
    width: 420,
  },
});
const getGroupsCount = (groups) => {
  let nOfGroupsPerCategory = {};
  for (const g in groups) {
    if (nOfGroupsPerCategory[groups[g].category]) {
      nOfGroupsPerCategory[groups[g].category]++;
    } else {
      nOfGroupsPerCategory[groups[g].category] = 1;
    }
  }
  return nOfGroupsPerCategory;
};

export default function StyledCategoryNavigator(props) {
  const classes = useStyles();
  const groups = props.groups;

  const onNodeToggle = (nodeId, isExpanded) => {
    if (isExpanded) {
      props.setCurrentlyOpenedPanels((arr) => [...arr, nodeId]);
    } else {
      props.setCurrentlyOpenedPanels((arr) => [
        ...arr.filter((item) => item !== nodeId),
      ]);
    }
  };

  const nOfGroupsPerCategory = getGroupsCount(groups);

  return (
    <TreeView
      className={classes.root}
      defaultCollapseIcon={<ArrowDropDownIcon />}
      defaultExpandIcon={<ArrowRightIcon />}
      defaultEndIcon={<div style={{ width: 24 }} />}
      defaultExpanded={props.currentlyOpenedPanels}
      onNodeToggle={onNodeToggle}
    >
      {/*TODO: could be moved into function */}
      {props.categories.map((category, key) => {
        return (
          <StyledTreeItem
            key={uniqid()}
            nodeId={category.name}
            labelText={category.name}
            labelIcon={Label}
            labelInfo={nOfGroupsPerCategory[category.name].toString()}
          >
            {/*TODO: could be moved into function */}
            {groups.map((group, index) => {
              const GROUPCURRENTID = uniqid();

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

                    labelInfo={group.data.length.toString()}
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
                                { directive: 'open-click', groupId: group.id },
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
                            labelText={tab.url}
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
