export const createPatientBackup = (patients) => {
    return {
        app: "MediCare System",
        version: "1.0",
        exportedAt: new Date().toISOString(),
        dataType: "patients",
        patients: patients,
    };
};

export const downloadJsonFile = (data, fileName = "patients-backup.json") => {
    const json = JSON.stringify(data, null, 2);

    const blob = new Blob([json], {
        type: "application/json",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;
    link.download = fileName;

    document.body.appendChild(link);

    link.click();

    link.remove();

    // Let the browser start the download before releasing the object URL.
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
};

export const validatePatientBackup = (data) => {
    if (!data || typeof data !== "object") {
        return {
            valid: false,
            message: "Invalid JSON data.",
        };
    }

    if (data.app !== "MediCare System") {
        return {
            valid: false,
            message: "This file does not belong to MediCare System.",
        };
    }

    if (data.dataType !== "patients") {
        return {
            valid: false,
            message: "This file does not contain patient data.",
        };
    }

    if (!Array.isArray(data.patients)) {
        return {
            valid: false,
            message: "Patients data must be an array.",
        };
    }

    return {
        valid: true,
        message: "Valid MediCare patient backup.",
    };
};

export const readJsonFile = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = (event) => {
            try {
                const data = JSON.parse(event.target.result);

                resolve(data);
                // eslint-disable-next-line no-unused-vars
            } catch (error) {
                reject(new Error("The selected file is not valid JSON."));
            }
        };

        reader.onerror = () => {
            reject(new Error("Failed to read the file."));
        };

        reader.readAsText(file);
    });
};
