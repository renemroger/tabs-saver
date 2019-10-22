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
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import { makeStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import AddCircleOutlined from '@material-ui/icons/AddCircleOutlined';
import IconButton from '@material-ui/core/IconButton';

const useStyles = makeStyles(() => ({
  DialogTitle: {
    alignSelf: 'baseline',
  },
}));

export default function NewCategory(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const [dimensions, setDimensions] = React.useState({
    height: window.innerHeight,
    width: window.innerWidth,
  });
  const [categoryName, setCategoryName] = React.useState('');

  const handleClickOpen = () => {
    console.log('open');
    document.body.style.height = '220px';
    document.body.style.width = '470px'; //TODO: make this dynamic

    setOpen(true);
  };

  const handleClose = () => {
    document.body.style.height = '330px';
    document.body.style.width = '470px'; //TODO: make this dynamic
    setOpen(false);
  };

  const handleCategoryNameChange = (event) => {
    setcategoryName(event.target.value);
  };

  return (
    <div
      style={{
        padding: '0px',
        margin: '10px 24px',
        alignSelf: 'baseline',
      }}
    >
      <IconButton onClick={handleClickOpen}>
        <AddCircleOutlined />
      </IconButton>

      <Dialog
        fullScreen={true}
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle className={classes.DialogTitle} id="form-dialog-title">
          Save Category
        </DialogTitle>

        <DialogContent>
          <TextField
            autoFocus
            autoComplete="off"
            margin="dense"
            id="name"
            label="Category Name"
            type="CategoryName"
            fullWidth
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
