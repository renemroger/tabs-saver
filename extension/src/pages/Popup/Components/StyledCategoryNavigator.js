/* eslint-disable jsx-a11y/anchor-is-valid */
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
import uniqid from 'uniqid';

import MailIcon from '@material-ui/icons/Mail';
import DeleteIcon from '@material-ui/icons/Delete';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import InfoIcon from '@material-ui/icons/Info';
import ForumIcon from '@material-ui/icons/Forum';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';

import './StyledCategoryNavigator.css';
import Tabs from './Tabs';
import DeleteButton from './DeleteButton';
import OpenAll from './OpenAll';

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
    borderTopRightRadius: theme.spacing(1),
    borderTopLeftRadius: theme.spacing(1),
    paddingRight: theme.spacing(1),
    width: 'inherit',
    fontWeight: theme.typography.fontWeightMedium,
    '$expanded > &': {
      fontWeight: theme.typography.fontWeightRegular,
    },
  },
  group: {
    marginLeft: 0,
    '& $content': {
      paddingLeft: theme.spacing(1),
      width: 'initial',
    },
  },
  label: {
    fontWeight: 'inherit',
    color: 'inherit',
    marginBottom: 0,
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
    height: 264,
    flexGrow: 1,
    maxWidth: 400,
  },
});

export default function StyledCategoryNavigator(props) {
  const classes = useStyles();
  const [displayDelete, setDisplayDelete] = React.useState(true);

  const setRefresher = props.setRefresher;

  const nameShortener = (tabName, size) => {
    if (tabName.length > size) {
      return `${tabName.slice(0, size)}...`;
    }
    return tabName;
  };

  return (
    <TreeView
      defaultCollapseIcon={<ArrowDropDownIcon />}
      defaultExpandIcon={<ArrowRightIcon />}
      defaultEndIcon={<div style={{ width: 24 }} />}
      defaultExpanded={props.currentlyOpenedPanels}
    >
      {props.categories &&
        props.categories.map((category, key) => {
          return (
            <StyledTreeItem
              style={{
                bcColor: 'red',
                borderStyle: 'solid',
                borderColor: 'grey',
                borderWidth: '3px',
                paddingBottom: '0px',
                marginBottom: '15px',
                borderRadius: '12px',
                borderBottomLeftRadius: '0px',
                borderBottomRightRadius: '0px',
              }}
              key={uniqid()}
              nodeId={category.name}
              labelText={category.name}
              labelIcon={Label}
            >
              {/*TODO: could be moved into function */}
              {props.groups &&
                props.groups.map((group, index) => {
                  //filtering out groups that dont belong to right category TODO: Could be improved
                  if (category.name === group.category) {
                    return (
                      <StyledTreeItem
                        style={{
                          width: '100%',
                          display: 'flex',
                          flexDirection: 'column',
                          marginBottom: '0px',
                          justifyContent: 'space-evenly',
                          alignItems: 'stretch',
                          backgroundColor: 'white',
                        }}
                        key={uniqid()}
                        nodeId={group.id}
                        labelText={group.name}
                        labelIcon={Label}
                        labelInfo={'2'}
                      >
                        <div
                          style={{
                            width: '100%',
                            height: 100,
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-evenly',
                            alignItems: 'stretch',
                          }}
                        >
                          <OpenAll
                            groupId={group.id}
                            setRefresher={setRefresher}
                          />
                          <DeleteButton
                            groupId={group.id}
                            setRefresher={setRefresher}
                            displayDelete={displayDelete}
                            setDisplayDelete={setDisplayDelete}
                          />
                        </div>
                        {group &&
                          group.data.map((tab, key) => {
                            return (
                              <Tabs
                                key={uniqid()}
                                nodeId={tab.id.toString()}
                                labelText={nameShortener(tab.url, 40)}
                                labelIcon={Link}
                                urlKey={key}
                                groupId={group.id}
                                setRefresher={setRefresher}
                              ></Tabs>
                            );
                          })}
                      </StyledTreeItem>
                    );
                  } else {
                    return <></>;
                  }
                })}
            </StyledTreeItem>
          );
        })}
    </TreeView>
  );
}
