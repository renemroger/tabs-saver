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
import Switch from '@material-ui/core/Switch';

import Button from '@material-ui/core/Button';
import AddCircleOutlined from '@material-ui/icons/AddCircleOutlined';
import IconButton from '@material-ui/core/IconButton';
import NewCategory from './NewCategory';

const useStyles = makeStyles(() => ({
  form: {
    display: 'flex',
    flexDirection: 'row',
    margin: '0px',
    width: 'fit-content',
  },
  formControl: {
    margin: '16px, 0px',
    minWidth: 220,
  },
  DialogTitle: {
    alignSelf: 'baseline',
  },
  plus: {
    alignSelf: 'flex-start',
    padding: '8px 24px',
  },
}));

export default function SaveTab(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const [dimensions, setDimensions] = React.useState({
    height: window.innerHeight,
    width: window.innerWidth,
  });
  const [categoryName, setcategoryName] = React.useState('');
  const [showNewCategory, setShowNewCategory] = React.useState(false);

  const handleClickOpen = () => {
    console.log('open');
    document.body.style.height = '330px';
    document.body.style.width = '470px'; //TODO: make this dynamic

    setOpen(true);
  };

  const handleClose = () => {
    document.body.style.height = '0px';
    document.body.style.width = '470px'; //TODO: make this dynamic
    setOpen(false);
  };

  const handleCategoryNameChange = (event) => {
    setcategoryName(event.target.value);
  };

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Save all windows
      </Button>
      {!showNewCategory && (
        <Dialog
          fullScreen={true}
          open={open}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle className={classes.DialogTitle} id="form-dialog-title">
            Save Tab
          </DialogTitle>
          <form className={classes.form} noValidate>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="max-width">Category </InputLabel>
              <Select
                value={categoryName}
                onChange={handleCategoryNameChange}
                inputProps={{
                  name: 'existing-category',
                  id: 'existing-category',
                }}
              >
                {props.categories.map((category, key) => {
                  return (
                    <MenuItem key={category.name} value={category.name}>
                      {category.name}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </form>
          <NewCategory />
          <DialogContent>
            <TextField
              autoComplete="off"
              autoFocus
              margin="dense"
              id="name"
              label="Group Name"
              type="groupName"
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
      )}
    </div>
  );
}
