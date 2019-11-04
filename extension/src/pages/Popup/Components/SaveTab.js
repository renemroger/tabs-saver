import React from 'react';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import InputLabel from '@material-ui/core/InputLabel';
import { makeStyles } from '@material-ui/core/styles';
import Switch from '@material-ui/core/Switch';

import Button from '@material-ui/core/Button';
import AddCircleOutlined from '@material-ui/icons/AddCircleOutlined';
import IconButton from '@material-ui/core/IconButton';
import CategorySelector from './CategorySelector';

import { saveData } from '../../Content/modules/storageHelpers';

const useStyles = makeStyles(() => ({
  form: {
    display: 'flex',
    flexDirection: 'row',
    padding: '8px 24px',
  },
  formControl: {
    minWidth: '100%',
  },
  DialogTitle: {
    alignSelf: 'baseline',
    padding: '2px 8px',
  },
}));

export default function SaveTab(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const [dimensions, setDimensions] = React.useState({
    height: window.innerHeight,
    width: window.innerWidth,
  });
  const [categoryName, setCategoryName] = React.useState('default');
  const [groupName, setGroupName] = React.useState('default');

  const handleClickOpen = () => {
    document.body.style.height = '280px';
    document.body.style.width = '470px';

    setOpen(true);
  };

  const handleClose = () => {
    document.body.style.height = '0px';
    document.body.style.width = '470px';
    console.log(categoryName, 'categoryname', groupName, 'groupName');
    setOpen(false);
  };

  const handleSave = () => {
    document.body.style.height = '0px';
    document.body.style.width = '470px';
    saveData(categoryName, groupName).then(() => {
      setCategoryName('default');
      setGroupName('default');
      setOpen(false);
      props.setRefresher(true);
    });
  };

  const handleGroupNameChange = (event) => {
    setGroupName(event.target.value);
  };

  //TODO: https://react-select.com/creatable
  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Save all windows
      </Button>

      <Dialog
        fullScreen={true}
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle className={classes.DialogTitle} id="form-dialog-title">
          Saving Tabs
        </DialogTitle>
        <CategorySelector
          setCategoryName={setCategoryName}
          categories={props.categories}
        />
        <DialogContent>
          <TextField
            autoComplete="off"
            autoFocus="false"
            margin="dense"
            id="name"
            onChange={handleGroupNameChange}
            label="Group Name"
            type="groupName"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
