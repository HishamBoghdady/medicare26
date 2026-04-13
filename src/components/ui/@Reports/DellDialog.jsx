//Import Hooks
import { useState, useEffect } from 'react'
//Import MUI
import {Button,Dialog,DialogTitle,DialogActions,DialogContent} from '../../Lib/MuiComponents'
//Import Context
import usePatient from "../../../context/Patient/usePatient";

const DellDialog = ({ open, onClose, rowData }) => {
    const { deletePatient } = usePatient();
    const [selectedPatient, setSelectedPatient] = useState(null);

    useEffect(() => {
        if (rowData?.FullData) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setSelectedPatient(rowData.FullData);
        }
    }, [rowData]);
    return (
        <>
            <Dialog open={open} onClose={onClose} dir='rtl'>
                <DialogTitle>تأكيد الحذف</DialogTitle>
                <DialogContent>
                    هل أنت متأكد من حذف المريض: {selectedPatient?.PersonalData?.Name}؟
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose}>إلغاء</Button>
                    <Button onClick={() => {
                        deletePatient(rowData.id)
                        onClose()
                    }} color="error">تأكيد الحذف</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default DellDialog