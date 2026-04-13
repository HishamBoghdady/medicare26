import { useState } from "react";
import {Box,Select,MenuItem,Popover,TextField,Button,Fade,Stack,} from "../../Lib/MuiComponents"

export default function FilterDialog({onChange, width = 160, options = ["In", "Out", "Council", "Date"],}) {
  const [value, setValue] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [dateRange, setDateRange] = useState({ start: "", end: "" });

  // ================= SELECT =================
  const handleSelectChange = (e) => {
    const v = e.target.value;
    setValue(v);

    if (v !== "Date") {
      setAnchorEl(null); // إخفاء Toolbar
      onChange({ type: v });
    } else {
      setAnchorEl(e.currentTarget); // إظهار Popover
    }
  };

  // ================= DATE =================
  const handleStartDate = (val) => {
    setDateRange({ start: val, end: "" }); // 🔒 reset end
  };

  const handleEndDate = (val) => {
    const updated = { ...dateRange, end: val };
    setDateRange(updated);

    if (updated.start && updated.end) {
      onChange({
        type: "Date",
        dateRange: updated,
      });
      setAnchorEl(null); // ✅ إخفاء Toolbar بعد اختيار الفترة
    }
  };

  // 🧹 زر الإلغاء خارج Popover
  const handleCancel = () => {
    setDateRange({ start: "", end: "" });
    setValue("");
    setAnchorEl(null);
    onChange({ type: "" });
  };

  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
      {/* ================= SELECT ================= */}
      <Select
        value={value}
        onChange={handleSelectChange}
        size="small"
        displayEmpty
        sx={{ width, height: 32, borderRadius: 2 }}
      >
        <MenuItem value="" disabled>
          Select Search
        </MenuItem>

        {options.includes("In") && <MenuItem value="In">In</MenuItem>}
        {options.includes("Out") && <MenuItem value="Out">Out</MenuItem>}
        {options.includes("Council") && <MenuItem value="Council">Council</MenuItem>}
        {options.includes("Date") && (
          <MenuItem
            value="Date"
            onMouseEnter={(e) => {
              setValue("Date");
              setAnchorEl(e.currentTarget);
            }}
          >
            Date ▸
          </MenuItem>
        )}
      </Select>

      {/* ================= زر الإلغاء خارج Popover ================= */}
      {value && (
        <Button
          size="small"
          color="error"
          variant="outlined"
          onClick={handleCancel}
        >
          Cancel
        </Button>
      )}

      {/* ================= DATE TOOLBAR ================= */}
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        TransitionComponent={Fade} // ✨ Animation ناعمة
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "left" }}
        PaperProps={{
          sx: {
            p: 1,
            borderRadius: 2,
            minWidth: 240,
          },
        }}
      >
        <Stack spacing={1}>
          <TextField
            type="date"
            size="small"
            label="From"
            value={dateRange.start}
            onChange={(e) => handleStartDate(e.target.value)}
            InputLabelProps={{ shrink: true }}
          />

          <TextField
            type="date"
            size="small"
            label="To"
            value={dateRange.end}
            onChange={(e) => handleEndDate(e.target.value)}
            InputLabelProps={{ shrink: true }}
            disabled={!dateRange.start} // 🔒 منع End قبل Start
            inputProps={{ min: dateRange.start }}
          />

          <Button
            size="small"
            color="primary"
            variant="contained"
            onClick={() => {
              if (dateRange.start && dateRange.end) {
                handleEndDate(dateRange.end); // البحث عند الضغط
              }
            }}
          >
            Search
          </Button>
        </Stack>
      </Popover>
    </Box>
  );
}