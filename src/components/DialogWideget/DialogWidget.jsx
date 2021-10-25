import './dialogwidget.css'

import {VisibilityOutlined}  from "@material-ui/icons";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';

export default function DialogWidget({open,onHandleDialogClose,dialogTitle,dialogText,yesButtonText,noButtonText,info}) {
    return (
        <Dialog
          open={open}
          onClose={onHandleDialogClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{dialogTitle}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {dialogText}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            {info ? <Button onClick={onHandleDialogClose} color="primary">OK</Button> : <><Button onClick={onHandleDialogClose} color="primary">
              {noButtonText}
            </Button>
            <Button onClick={onHandleDialogClose} color="primary" autoFocus>
              {yesButtonText}
            </Button></>}
          </DialogActions>
        </Dialog>
    )
}
