import { useRef, useState } from "react";

import {
    Alert, Box, Button, Dialog, DialogActions, Select,
    DialogContent, DialogTitle, Stack, Typography, MenuItem
} from "../../Lib/MuiComponents";

import { DownloadIcon, UploadFileIcon } from "../../Lib/MuiIcon";

import {
    createPatientBackup,
    downloadJsonFile,
    readJsonFile,
    validatePatientBackup,
} from "../../../utils/patient/patientJson.new";
import usePatients from "../../../context/Patient/usePatient";
const MangeData = () => {

    const { patient, preparePatientImport, importPatients } = usePatients();
    const fileInputRef = useRef(null);

    const [error, setError] = useState("");

    const [previewData, setPreviewData] = useState(null);

    const [openPreview, setOpenPreview] = useState(false);
    const [importPlan, setImportPlan] = useState(null);
    const [decisions, setDecisions] = useState({});
    const [isImporting, setIsImporting] = useState(false);
    const [importResult, setImportResult] = useState(null);

    //
    const handlePrepareImport = async (backup) => {
        try {
            const plan = await preparePatientImport(backup.patients);

            setPreviewData(backup);
            setImportPlan(plan);
            setDecisions(
                Object.fromEntries(
                    plan.conflicts.map((conflict) => [conflict.id, "skip"])
                )
            );
            setOpenPreview(true);
        } catch (error) {
            setError(error.message || "Failed to prepare patient import.");
        }
    };
    //
    const handleExport = () => {
        try {
            const backup = createPatientBackup(patient);

            downloadJsonFile(
                backup,
                `medicare-patients-${new Date()
                    .toISOString()
                    .slice(0, 10)}.json`
            );
            // eslint-disable-next-line no-unused-vars
        } catch (error) {
            setError("Failed to export patient data.");
        }
    };

    const handleSelectFile = () => {
        fileInputRef.current?.click();
    };

    const handleImportFile = async (event) => {
        const file = event.target.files?.[0];

        if (!file) return;

        setError("");

        try {
            const data = await readJsonFile(file);

            const validation = validatePatientBackup(data);

            if (!validation.valid) {
                setError(validation.message);
                return;
            }

            await handlePrepareImport(data);
        } catch (error) {
            setError(error.message);
        }

        event.target.value = "";
    };

    const handleConfirmImport = async () => {
        if (!importPlan || isImporting) return;

        setIsImporting(true);
        setError("");
        setImportResult(null);

        try {
            const result = await importPatients({
                newPatients: importPlan.newPatients,
                conflicts: importPlan.conflicts,
                decisions,
            });

            setImportResult({
                ...result,
                invalidSkipped: importPlan.invalidPatients.length,
            });
            setPreviewData(null);
            setImportPlan(null);
            setDecisions({});
            setOpenPreview(false);
        } catch (error) {
            setError(
                error.message || "Failed to import patient data."
            );
        } finally {
            setIsImporting(false);
        }
    };

    return (
        <>
            <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={2}
            >
                <Button
                    variant="contained"
                    startIcon={<DownloadIcon />}
                    onClick={handleExport}
                >
                    Export JSON
                </Button>

                <Button
                    variant="outlined"
                    startIcon={<UploadFileIcon />}
                    onClick={handleSelectFile}
                >
                    Import JSON
                </Button>

                <input
                    ref={fileInputRef}
                    type="file"
                    accept=".json,application/json"
                    hidden
                    onChange={handleImportFile}
                />
            </Stack>
            {importPlan && (
                <Box sx={{ mt: 2 }}>
                    <Typography>
                        New patients: {importPlan.newPatients.length}
                    </Typography>

                    <Typography>
                        Conflicts: {importPlan.conflicts.length}
                    </Typography>

                    <Typography>
                        Invalid records: {importPlan.invalidPatients.length}
                    </Typography>

                    {importPlan.conflicts.map((conflict) => (
                        <Box
                            key={conflict.id}
                            sx={{
                                mt: 2,
                                p: 2,
                                border: 1,
                                borderColor: "divider",
                                borderRadius: 2,
                            }}
                        >
                            <Typography>
                                Patient ID: {conflict.id}
                            </Typography>

                            <Typography variant="body2">
                                Current: {conflict.current.name ?? "Unknown"}
                            </Typography>

                            <Typography variant="body2">
                                Backup: {conflict.incoming.name ?? "Unknown"}
                            </Typography>

                            <Select
                                fullWidth
                                size="small"
                                value={decisions[conflict.id] ?? "skip"}
                                onChange={(event) =>
                                    setDecisions((previous) => ({
                                        ...previous,
                                        [conflict.id]: event.target.value,
                                    }))
                                }
                                sx={{ mt: 1 }}
                            >
                                <MenuItem value="skip">
                                    Keep current patient
                                </MenuItem>

                                <MenuItem value="replace">
                                    Replace with backup
                                </MenuItem>
                            </Select>
                        </Box>
                    ))}
                </Box>
            )}
            {error && (
                <Alert
                    severity="error"
                    sx={{ mt: 2 }}
                    onClose={() => setError("")}
                >
                    {error}
                </Alert>
            )}

            {importResult && (
                <Alert severity="success" sx={{ mt: 2 }}>
                    Import complete: {importResult.imported} written, {importResult.skipped} conflicts skipped, {importResult.invalidSkipped} invalid records skipped.
                </Alert>
            )}

            <Dialog
                open={openPreview}
                onClose={() => setOpenPreview(false)}
                fullWidth
                maxWidth="sm"
            >
                <DialogTitle>
                    Import Patient Data
                </DialogTitle>

                <DialogContent>
                    {previewData && (
                        <Box>
                            <Typography>
                                Application: {previewData.app}
                            </Typography>

                            <Typography>
                                Version: {previewData.version}
                            </Typography>

                            <Typography>
                                Export Date: {previewData.exportedAt}
                            </Typography>

                            <Typography>
                                Patients: {previewData.patients.length}
                            </Typography>
                            {importPlan?.invalidPatients.map((invalid, index) => (
                                <Alert
                                    key={`${invalid.id ?? "record"}-${invalid.index ?? index}`}
                                    severity="warning"
                                    sx={{ mt: 1 }}
                                >
                                    Record {(invalid.index ?? index) + 1}
                                    {invalid.id ? ` (ID: ${invalid.id})` : ""}: {invalid.reason}
                                </Alert>
                            ))}
                        </Box>
                    )}
                </DialogContent>

                <DialogActions>
                    <Button
                        onClick={() => setOpenPreview(false)}
                    >
                        Cancel
                    </Button>

                    <Button
                        variant="contained"
                        onClick={handleConfirmImport}
                        disabled={isImporting || !importPlan}
                    >
                        {isImporting ? "Importing…" : "Import valid records"}
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default MangeData;
