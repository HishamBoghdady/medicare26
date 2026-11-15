import { useState } from "react";


export function useSelect() {
    //--Selection items--//
    //--Select items
    const [selectedIds, setSelectedIds] = useState([]);
    //--box exit
    const [bulkAction, setBulkAction] = useState(null);
    const [bulkBusy, setBulkBusy] = useState(false);
    const [bulkError, setBulkError] = useState("");
    const [bulkExitTime, setBulkExitTime] = useState(() => {
        const today = new Date();
        return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
    });
    const [bulkExitReason, setBulkExitReason] = useState("");

    return {
        selectedIds, setSelectedIds,
        bulkAction, setBulkAction,
        bulkBusy, setBulkBusy,
        bulkError, setBulkError,
        bulkExitTime, setBulkExitTime,
        bulkExitReason, setBulkExitReason
    }
}
