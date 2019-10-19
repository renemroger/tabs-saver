import React from 'react';
import Button from '@material-ui/core/Button';
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

const useStyles = makeStyles((theme) => ({
  form: {
    display: 'flex',
    flexDirection: 'row',
    margin: '0px',
    width: 'fit-content',
  },
  formControl: {
    marginTop: theme.spacing(2),
    minWidth: 120,
  },
}));

export default function FormDialog(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const [dimensions, setDimensions] = React.useState({
    height: window.innerHeight,
    width: window.innerWidth,
  });
  const [categoryName, setcategoryName] = React.useState('');

  React.useEffect(() => {
    console.log('run');
  }, []);

  const handleClickOpen = () => {
    console.log('open');
    document.body.style.height = '440px'; //TODO: make this dynamic

    setOpen(true);
  };

  const handleClose = () => {
    document.body.style.height = '0px';
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
      <Dialog
        fullScreen={true}
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Saving</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Group name"
            type="groupName"
            fullWidth
          />
        </DialogContent>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="New Category"
            type="categoryName"
            fullWidth
          />
        </DialogContent>

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
