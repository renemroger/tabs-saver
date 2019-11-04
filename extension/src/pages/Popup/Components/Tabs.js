import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import DirectionsIcon from '@material-ui/icons/Directions';
import DeleteIcon from '@material-ui/icons/Delete';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    margin: '5px',
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));

export default function Tabs(props) {
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <Box
        style={{
          fontSize: '14px',
          minWidth: '300px',
          textAlign: 'start',
        }}
        component="div"
        display={props.labelText}
        p={1}
        m={1}
        bgcolor="background.paper"
      >
        {props.labelText}
      </Box>
      <Divider className={classes.divider} orientation="vertical" />
      <IconButton
        color="primary"
        className={classes.iconButton}
        aria-label="directions"
      >
        <DirectionsIcon />
      </IconButton>
      <Divider className={classes.divider} orientation="vertical" />
      <IconButton
        color="primary"
        className={classes.iconButton}
        aria-label="directions"
      >
        <DeleteIcon />
      </IconButton>
    </Paper>
  );
}
