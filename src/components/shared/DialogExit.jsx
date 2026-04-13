import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function AlertDialog({ open, onClose, onConfirm }) {
  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">تأكيد تسجيل الخروج</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            هل تريد تسجيل الخروج الآن؟
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>إلغاء</Button>
          <Button onClick={onConfirm ?? onClose} autoFocus>
            خروج
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
