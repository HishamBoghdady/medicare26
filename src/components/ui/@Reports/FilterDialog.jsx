// import { useState } from "react";
// import {Box,Select,MenuItem,Popover,TextField,Button,Fade,Stack,} from "../../Lib/MuiComponents"

// export default function FilterDialog({onChange, width = 160, options = ["In", "Out", "Council", "Date"],}) {
//   const [value, setValue] = useState("");
//   const [anchorEl, setAnchorEl] = useState(null);
//   const [dateRange, setDateRange] = useState({ start: "", end: "" });

//   // ================= SELECT =================
//   const handleSelectChange = (e) => {
//     const v = e.target.value;
//     setValue(v);

//     if (v !== "Date") {
//       setAnchorEl(null); // إخفاء Toolbar
//       onChange({ type: v });
//     } else {
//       setAnchorEl(e.currentTarget); // إظهار Popover
//     }
//   };

//   // ================= DATE =================
//   const handleStartDate = (val) => {
//     setDateRange({ start: val, end: "" }); // 🔒 reset end
//   };

//   const handleEndDate = (val) => {
//     const updated = { ...dateRange, end: val };
//     setDateRange(updated);

//     if (updated.start && updated.end) {
//       onChange({
//         type: "Date",
//         dateRange: updated,
//       });
//       setAnchorEl(null); // ✅ إخفاء Toolbar بعد اختيار الفترة
//     }
//   };

//   // 🧹 زر الإلغاء خارج Popover
//   const handleCancel = () => {
//     setDateRange({ start: "", end: "" });
//     setValue("");
//     setAnchorEl(null);
//     onChange({ type: "" });
//   };

//   return (
//     <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//       {/* ================= SELECT ================= */}
//       <Select
//         value={value}
//         onChange={handleSelectChange}
//         size="small"
//         displayEmpty
//         sx={{ width, height: 32, borderRadius: 2 }}
//       >
//         <MenuItem value="" disabled>
//           Select Search
//         </MenuItem>

//         {options.includes("In") && <MenuItem value="In">In</MenuItem>}
//         {options.includes("Out") && <MenuItem value="Out">Out</MenuItem>}
//         {options.includes("Council") && <MenuItem value="Council">Council</MenuItem>}
//         {options.includes("Date") && (
//           <MenuItem
//             value="Date"
//             onMouseEnter={(e) => {
//               setValue("Date");
//               setAnchorEl(e.currentTarget);
//             }}
//           >
//             Date ▸
//           </MenuItem>
//         )}
//       </Select>

//       {/* ================= زر الإلغاء خارج Popover ================= */}
//       {value && (
//         <Button
//           size="small"
//           color="error"
//           variant="outlined"
//           onClick={handleCancel}
//         >
//           Cancel
//         </Button>
//       )}

//       {/* ================= DATE TOOLBAR ================= */}
//       <Popover
//         open={Boolean(anchorEl)}
//         anchorEl={anchorEl}
//         TransitionComponent={Fade} // ✨ Animation ناعمة
//         anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
//         transformOrigin={{ vertical: "top", horizontal: "left" }}
//         PaperProps={{
//           sx: {
//             p: 1,
//             borderRadius: 2,
//             minWidth: 240,
//           },
//         }}
//       >
//         <Stack spacing={1}>
//           <TextField
//             type="date"
//             size="small"
//             label="From"
//             value={dateRange.start}
//             onChange={(e) => handleStartDate(e.target.value)}
//             InputLabelProps={{ shrink: true }}
//           />

//           <TextField
//             type="date"
//             size="small"
//             label="To"
//             value={dateRange.end}
//             onChange={(e) => handleEndDate(e.target.value)}
//             InputLabelProps={{ shrink: true }}
//             disabled={!dateRange.start} // 🔒 منع End قبل Start
//             inputProps={{ min: dateRange.start }}
//           />

//           <Button
//             size="small"
//             color="primary"
//             variant="contained"
//             onClick={() => {
//               if (dateRange.start && dateRange.end) {
//                 handleEndDate(dateRange.end); // البحث عند الضغط
//               }
//             }}
//           >
//             Search
//           </Button>
//         </Stack>
//       </Popover>
//     </Box>
//   );
// }



import { useState, useRef } from "react";
import {
  Box,
  Select,
  MenuItem,
  Popover,
  TextField,
  Button,
  Stack,
  InputAdornment,
} from "../../Lib/MuiComponents";

import FilterListIcon from "@mui/icons-material/FilterList";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import CloseIcon from "@mui/icons-material/Close";

export default function FilterDialog({
  onChange,
  width = 180,
  options = ["In", "Out", "Council", "Date"],
}) {
  const filterRef = useRef(null);
  const [value, setValue] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [dateRange, setDateRange] = useState({
    start: "",
    end: "",
  });

  const isDateOpen = Boolean(anchorEl) && value === "Date";

  const labels = {
    In: "داخل المركز",
    Out: "خارج المركز",
    Council: "المجلس",
    Date: "بحث بالتاريخ",
  };

  // ================= SELECT FILTER =================

  const handleSelectChange = (event) => {
    const selected = event.target.value;

    setValue(selected);

    if (selected === "Date") {
      setDateRange({ start: "", end: "" });
      setAnchorEl(filterRef.current);
      return;
    }

    setAnchorEl(null);
    setDateRange({ start: "", end: "" });

    onChange({ type: selected });
  };

  // ================= START DATE =================

  const handleStartDate = (start) => {
    setDateRange((previous) => ({
      start,
      end:
        previous.end && previous.end >= start
          ? previous.end
          : "",
    }));
  };

  // ================= END DATE =================

  const handleEndDate = (end) => {
    setDateRange((previous) => ({
      ...previous,
      end,
    }));
  };

  // ================= APPLY DATE FILTER =================

  const handleDateSearch = () => {
    const { start, end } = dateRange;

    if (!start || !end || end < start) return;

    onChange({
      type: "Date",
      dateRange: { start, end },
    });

    setAnchorEl(null);
  };

  // ================= CANCEL FILTER =================

  const handleCancel = () => {
    setValue("");
    setDateRange({ start: "", end: "" });
    setAnchorEl(null);

    onChange({ type: "" });
  };

  // ================= CLOSE DATE POPOVER =================

  const handleCloseDate = () => {
    setAnchorEl(null);
  };

  return (
    <Box
      ref={filterRef}
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1,
        width: { xs: "100%", sm: "auto" },
        minWidth: 0,
        flexWrap: "wrap",
      }}
    >
      {/* ================= FILTER SELECT ================= */}

      <Select
        value={value}
        onChange={handleSelectChange}
        displayEmpty
        fullWidth
        size="small"
        renderValue={(selected) =>
          selected ? (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                overflow: "hidden",
              }}
            >
              {selected === "Date" ? (
                <CalendarMonthIcon
                  fontSize="small"
                  color="primary"
                />
              ) : (
                <FilterListIcon
                  fontSize="small"
                  color="primary"
                />
              )}

              <Box component="span" noWrap>
                {labels[selected] || selected}
              </Box>
            </Box>
          ) : (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                color: "text.secondary",
              }}
            >
              <FilterListIcon fontSize="small" />
              تصفية النتائج
            </Box>
          )
        }
        sx={{
          width: { xs: "100%", sm: width },
          minWidth: 0,
          height: 42,
          borderRadius: 3,
          bgcolor: "background.paper",

          "& .MuiSelect-select": {
            display: "flex",
            alignItems: "center",
            textAlign: "right",
            py: 1,
            pr: 1.5,
          },

          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "divider",
          },

          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "primary.main",
          },

          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "primary.main",
            borderWidth: 1,
          },
        }}
      >
        <MenuItem value="" disabled>
          تصفية النتائج
        </MenuItem>

        {options.includes("In") && (
          <MenuItem value="In">داخل المركز</MenuItem>
        )}

        {options.includes("Out") && (
          <MenuItem value="Out">خارج المركز</MenuItem>
        )}

        {options.includes("Council") && (
          <MenuItem value="Council">المجلس</MenuItem>
        )}

        {options.includes("Date") && (
          <MenuItem value="Date">
            <ListItemIconFallback>
              <CalendarMonthIcon fontSize="small" />
            </ListItemIconFallback>
            بحث بالتاريخ
          </MenuItem>
        )}
      </Select>

      {/* ================= CLEAR FILTER ================= */}

      {value !== "" && (
        <Button
          variant="outlined"
          color="error"
          size="small"
          onClick={handleCancel}
          startIcon={<CloseIcon />}
          sx={{
            height: 42,
            borderRadius: 3,
            px: 1.5,
            whiteSpace: "nowrap",
            flexShrink: 0,
            width: { xs: "100%", sm: "auto" },
          }}
        >
          إلغاء التصفية
        </Button>
      )}

      {/* ================= DATE SEARCH POPOVER ================= */}

      <Popover
        open={isDateOpen}
        anchorEl={anchorEl}
        onClose={handleCloseDate}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        slotProps={{
          paper: {
            sx: {
              width: { xs: "calc(100vw - 32px)", sm: 310 },
              maxWidth: 310,
              p: 2,
              mt: 1,
              borderRadius: 3,
              border: 1,
              borderColor: "divider",
              bgcolor: "background.paper",
              boxShadow: 4,
            },
          },
        }}
      >
        <Stack spacing={2}>
          {/* Header */}

          <Box>
            <Stack
              direction="row"
              alignItems="center"
              spacing={1}
              sx={{ mb: 0.5 }}
            >
              <CalendarMonthIcon color="primary" />

              <Box
                component="span"
                sx={{
                  fontSize: "1rem",
                  fontWeight: 700,
                  color: "text.primary",
                }}
              >
                البحث بالتاريخ
              </Box>
            </Stack>

            <Box
              sx={{
                fontSize: "0.8rem",
                color: "text.secondary",
              }}
            >
              اختر الفترة الزمنية لعرض المرضى
            </Box>
          </Box>

          {/* Start Date */}

          <TextField
            label="من تاريخ"
            type="date"
            value={dateRange.start}
            onChange={(event) =>
              handleStartDate(event.target.value)
            }
            fullWidth
            size="small"
            slotProps={{
              inputLabel: { shrink: true },
              htmlInput: {
                max: dateRange.end || undefined,
              },
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
              },
            }}
          />

          {/* End Date */}

          <TextField
            label="إلى تاريخ"
            type="date"
            value={dateRange.end}
            onChange={(event) =>
              handleEndDate(event.target.value)
            }
            disabled={!dateRange.start}
            fullWidth
            size="small"
            slotProps={{
              inputLabel: { shrink: true },
              htmlInput: {
                min: dateRange.start || undefined,
              },
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
              },
            }}
          />

          {/* Actions */}

          <Stack direction="row" spacing={1}>
            <Button
              variant="contained"
              fullWidth
              onClick={handleDateSearch}
              disabled={
                !dateRange.start ||
                !dateRange.end ||
                dateRange.end < dateRange.start
              }
              sx={{
                minHeight: 40,
                borderRadius: 2,
              }}
            >
              تطبيق البحث
            </Button>

            <Button
              variant="outlined"
              fullWidth
              onClick={handleCloseDate}
              sx={{
                minHeight: 40,
                borderRadius: 2,
              }}
            >
              إغلاق
            </Button>
          </Stack>
        </Stack>
      </Popover>
    </Box>
  );
}

// عنصر مساعد لعرض الأيقونة داخل القائمة
function ListItemIconFallback({ children }) {
  return (
    <Box
      component="span"
      sx={{
        display: "inline-flex",
        alignItems: "center",
        mr: 1.5,
      }}
    >
      {children}
    </Box>
  );
}
