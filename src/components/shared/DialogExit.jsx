import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "../Lib/MuiComponents"

export default function AlertDialog({ open, onClose, onConfirm }) {
  return (
    <>
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
    </>
  );
}
