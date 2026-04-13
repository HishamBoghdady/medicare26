//Import Hooks
import { useState, useEffect } from 'react'
//Import MUI
import {Stack,Button,Dialog,TextField,DialogContent,DialogActions} from "../../Lib/MuiComponents"


// import {} from "../../Lib/MuiComponents"
// import {} from "../../Lib/MuiComponents"
//Import Context
import usePatient from "../../../context/Patient/usePatient";

const ExitDialog = ({ open, onClose, rowData }) => {
    const { exitPatient } = usePatient();
    const [selectedPatient, setSelectedPatient] = useState(null);
    useEffect(() => {
        if (rowData?.FullData) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setSelectedPatient(rowData.FullData);
        }
    }, [rowData]);
    return (
        <>
            <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
                <DialogContent>
                    <Stack spacing={2} sx={{ mt: 1 }}>
                        <TextField type='date' fullWidth value={selectedPatient?.ExitTime || ''}
                            onChange={(e) => setSelectedPatient({ ...selectedPatient, ExitTime: e.target.value })} />

                        <TextField label="سبب الخروج" fullWidth value={selectedPatient?.ReasonExit || ''}
                            onChange={(e) => setSelectedPatient({ ...selectedPatient, ReasonExit: e.target.value })} />
                    </Stack>
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose}>Cancel</Button>
                    <Button onClick={() => {
                        exitPatient(rowData.FullData.id, {
                            ExitData: {
                                ExitTime: selectedPatient.ExitTime,
                                ReasonExit: selectedPatient.ReasonExit,
                            },
                        })
                        onClose();
                    }} variant="contained" color="primary">Exit</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default ExitDialog