//Import MUI
import { Box, Stack, Button, TextField, IconButton } from "../components/Lib/MuiComponents"
import { UpdateIcon, MoreVertIcon } from "../components/Lib/MuiIcon"
import { DataGrid } from '@mui/x-data-grid';
//Import Hooks
import { useState, useMemo, useEffect } from "react";
//Import Context Data
import usePatient from '../context/Patient/usePatient';
//Components
import { FilterDialog, ControlDialog, EditDialog, InfoDialog, ExitDialog, DellDialog } from "../components/ui/@Reports/Index"
//****************//
import normalizeDateSafe from '../utils/functions/normalizeDateSafe';
import { CalcDate, CalcOwed } from '../utils/index';
import useTheme from "../context/ThemeMode/useTheme";
//***** */
import DataCard from "../components/test/Card";
//***** */
function Reports() {
  const { darkMode } = useTheme()
  const { patient, /**setPatient */ refreshPatients } = usePatient();
  //Controll Dialog=> start './Reports/ControlDialog'
  const [openControllDialog, setOpenControllDialog] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const handleOpenDialog = (row) => {
    setSelectedRow(row);
    setOpenControllDialog(true);
    console.log("row from grid:", row);
  };
  const handleCloseDialog = () => {
    setOpenControllDialog(false);
    setSelectedRow(null);
  };
  //Controll Dialog=> End './Reports/ControlDialog'

  //*****Start: Edit Dialog*/
  const [openEdit, setOpenEdit] = useState(false);
  const handleEditClick = (row) => {
    setSelectedRow(row);    // تمرير البيانات للـ EditDialog
    setOpenControllDialog(false);  // إغلاق ControlDialog
    setOpenEdit(true);      // فتح EditDialog
  };
  //*****End: Edit Dialog*/
  //*****Start: Info Dialog*/
  const [openInfo, setOpenInfo] = useState(false);
  const handleInfoClick = (row) => {
    setSelectedRow(row);
    setOpenControllDialog(false);
    setOpenInfo(true)
  }
  //*****End: Info Dialog*/
  //******Start: Exit Dialog*/
  const [openExit, setOpenExit] = useState(false);
  const handleExitClick = (row) => {
    setSelectedRow(row);
    setOpenControllDialog(false);
    setOpenExit(true)
  }
  //******End: Exit Dialog*/
  //*****Start: Dell Dialog*/
  const [openDell, setOpenDell] = useState(false);
  const handleDellClick = (row) => {
    setSelectedRow(row);
    setOpenControllDialog(false);
    setOpenDell(true)
  }
  //*****End: Dell Dialog*/

  // ----------------------- Start=> Search Logic-----------------------
  const [selected, setSelected] = useState("");
  const [CouncilCodeFilter, setCouncilCodeFilter] = useState("");
  const [filtredDate, setFiltredDate] = useState({ start: "", end: "" });
  const [searchTerm, setSearchTerm] = useState("");

  // ================= FILTER LOGIC =================
  const handleFilterChange = ({ type, dateRange }) => {
    setSearchTerm("");

    switch (type) {
      case "Council":
        setSelected("");
        setCouncilCodeFilter("has");
        setFiltredDate({ start: "", end: "" });
        break;

      case "In":
        setSelected("in");
        setCouncilCodeFilter("");
        setFiltredDate({ start: "", end: "" });
        break;

      case "Out":
        setSelected("out");
        setCouncilCodeFilter("");
        setFiltredDate({ start: "", end: "" });
        break;

      case "Date":
        setSelected("");
        setCouncilCodeFilter("");
        setFiltredDate(dateRange);
        break;

      default:
        setSelected("");
        setCouncilCodeFilter("");
        setFiltredDate({ start: "", end: "" });
    }
  };

  const filteredPatients = useMemo(() => {
    return patient.filter((p) => {

      const matchName =
        p.PersonalData.Name
          .toLowerCase()
          .includes(searchTerm.toLowerCase());

      const matchCondition =
        selected === ""
          ? true
          : p.EnteryData.Condition
            .toLowerCase()
            .includes(selected.toLowerCase());

      const matchCouncilCode =
        CouncilCodeFilter === ""
          ? true
          : CouncilCodeFilter === "has"
            ? p.EnteryData.CouncilCode && p.EnteryData.CouncilCode !== ""
            : CouncilCodeFilter === "empty"
              ? !p.EnteryData.CouncilCode
              : p.EnteryData.CouncilCode?.toLowerCase() ===
              CouncilCodeFilter.toLowerCase();

      if (filtredDate.start && filtredDate.end) {
        const entryDate = new Date(p.EnteryData.EntryTime);
        const startDate = new Date(filtredDate.start);
        const endDate = new Date(filtredDate.end);

        entryDate.setHours(0, 0, 0, 0);
        startDate.setHours(0, 0, 0, 0);
        endDate.setHours(23, 59, 59, 999);

        const matchDate = entryDate >= startDate && entryDate <= endDate;

        return (matchName && matchCondition && matchDate && matchCouncilCode);
      }

      return matchName && matchCondition && matchCouncilCode;
    });
  }, [
    patient,
    searchTerm,
    selected,
    filtredDate,
    CouncilCodeFilter,
  ]);
  //
  //XXXXXXXXXXXXXXXXXXXX
  let day = Date.now()
  const [todayTick, setTodayTick] = useState(day);

  useEffect(() => {
    let midnightTimer;

    const scheduleNextTick = () => {
      const now = new Date();
      const nextMidnight = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate() + 1,
        0, 0, 1, 0
      );

      const msUntilMidnight = nextMidnight.getTime() - now.getTime();

      midnightTimer = setTimeout(() => {
        setTodayTick(Date.now()); // يجبر إعادة الحساب بعد منتصف الليل
        scheduleNextTick();
      }, msUntilMidnight);
    };

    scheduleNextTick();
    return () => clearTimeout(midnightTimer);
  }, []);


  //XXXXXXXXXXXXXXXXXXXX
  const flatData = useMemo(() => {
    return filteredPatients
      .slice() // نسخة حتى لا نعدل الأصل
      .sort((a, b) => new Date(a.EnteryData.EntryTime) - new Date(b.EnteryData.EntryTime)) // ترتيب حسب الإضافة (الأقدم أول)
      .map((e, index) => {
        // const exitDateObj = normalizeDateSafe(e.ExitData?.ExitTime);

        const entry = normalizeDateSafe(e.EnteryData?.EntryTime);
        const exit = normalizeDateSafe(e.ExitData?.ExitTime);

        const days = CalcDate(entry, exit);
        const paid = Number(e.FinancialData?.AmountPaid) || 0;
        const owed = CalcOwed(days, paid);
        return {

          id: e.id,
          Num: index + 1, // رقم متسلسل مضبوط بعد الترتيب
          EntryTime: entry,
          ExitData: exit ? exit : "is here",
          Name: e.PersonalData.Name,
          Address: e.PersonalData.Address,
          NumberDays: days,
          AmountPaid: paid,
          AmountOwed: owed,
          TypeDiseas: e.EnteryData.TypeDiseas,
          Condition: e.EnteryData.Condition,
          FullData: e,
        }
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filteredPatients, todayTick]);
  const totalPaid = flatData.reduce((sum, r) => sum + (r.AmountPaid || 0), 0);
  const totalOwed = flatData.reduce((sum, r) => sum + (r.AmountOwed || 0), 0);
  const Incenter = flatData.filter((n) => n.Condition == "in").length;
  const Outcenter = flatData.filter((n) => n.Condition == "out").length;
  //--------------------------------------------Columns--------------------------------------------//
  const columns = [
    { field: 'Num', headerName: 'م', width: 50 },
    { field: 'Name', headerName: 'الاسم', width: 200 },
    { field: 'EntryTime', headerName: 'تاريخ الدخول', width: 200 },
    { field: 'NumberDays', headerName: 'عدد الأيام', width: 100 },
    { field: 'AmountPaid', headerName: 'المدفوع', width: 100 },
    { field: 'AmountOwed', headerName: 'المتبقي', width: 100 },
    { field: 'TypeDiseas', headerName: 'نوع الحالة', width: 100 },
    { field: 'Address', headerName: 'العنوان', width: 100 },
    { field: 'Condition', headerName: 'الحالة', width: 100 },
    {
      field: 'actions', headerName: 'إجراءات', width: 100,
      renderCell: (params) => (
        <Stack direction="row" spacing={1} gap={1} sx={{ alignItems: 'center', height: '100%' }}>
          <IconButton color="primary" size="small" onClick={() => handleOpenDialog(params.row)}
            sx={{ border: '1px solid #1565C0', backgroundColor: '#1565c050', borderRadius: '20%' }}>
            <MoreVertIcon />
          </IconButton>
        </Stack>
      ),
    },
  ];

  return (
    <>
      <Box sx={{ width: "100%", mb: 2 }}>
        <Stack direction="row" spacing={2} gap={2} sx={{ margin: '10px 0' }}>

          <TextField label="🔍 بحث" fullWidth variant="outlined" sx={{ mb: 2, direction: 'rtl' }}
            value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} size='small' />

          <Box sx={{ display: "flex", gap: 1, alignItems: "center", flexDirection: 'column' }}>

            {/* Select */}
            <FilterDialog onChange={handleFilterChange} width={180} />

          </Box>
          <Button size='small'
            sx={{
              bgcolor: "#2e7d32", color: "#fff", borderRadius: "30%", p: 1.3, minWidth: "48px",
              "&:hover": { bgcolor: "#1b5e20", transform: "scale(1.05)", transition: "all 0.2s ease", },
            }} onClick={refreshPatients}>
            <UpdateIcon fontSize="medium" />
          </Button>
        </Stack>

        <Stack direction="row" spacing={2} gap={2} sx={{ margin: '10px 0' }}>
          <DataCard totalPaid={totalPaid} totalOwed={totalOwed} Incenter={Incenter} Outcenter={Outcenter} />
        </Stack>

        {/*  Datatable  */}
        <DataGrid rows={flatData} columns={columns} pageSize={5} rowsPerPageOptions={[5]} autoHeight
          dir='rtl'
          getRowClassName={(params) => {
            if (params.row.AmountOwed < 5000) return "GR-min";
            if (params.row.AmountOwed >= 5000 && params.row.AmountOwed <= 9000) return "YW-normal";
            return "red-high";
          }}

          sx={{
            direction: 'rtl',
            // backgroundColor: '#ffffffff',
            fontFamily: 'Arial, sans-serif', // تغيير الخط العام
            fontSize: '20px',
            fontWeight: 'bold',            // حجم الخط
            '& .MuiDataGrid-columnHeaders': {
              fontFamily: 'Verdana, sans-serif', // خط رؤوس الأعمدة
              fontWeight: 'bold',
              fontSize: '16px',
            },
            '& .MuiDataGrid-cell': {
              fontFamily: 'Tahoma, sans-serif', // خط الخلايا
            },
            // 
            '& .GR-min': {
              // backgroundColor: '#00000070 !important',
              color: darkMode ? '#ffffff !important' : '#000 !important',
            },

            '& .YW-normal': {
              // backgroundColor: '#ff000088 !important',
              color: '#ff0000ff !important',
            },
            '& .red-high': {
              // backgroundColor: '#51ff008e !important',
              color: '#0026ffff !important',
            },
          }} />
        {/*ControlDialog*/}
        <ControlDialog
          open={openControllDialog}
          onClose={handleCloseDialog}
          rowData={selectedRow}

          onEdit={handleEditClick}
          onInfo={handleInfoClick}
          onExit={handleExitClick}
          onDell={handleDellClick}
        />
        {/*EditDialog*/}
        <EditDialog
          open={openEdit}
          onClose={() => setOpenEdit(false)}
          rowData={selectedRow}      // تمرير بيانات الصف
        />
        {/*InformationDialog*/}
        <InfoDialog
          open={openInfo}
          onClose={() => setOpenInfo(false)}
          rowData={selectedRow}
        />
        {/*ExitDialog*/}
        <ExitDialog
          open={openExit}
          onClose={() => setOpenExit(false)}
          rowData={selectedRow}
        />
        {/*DellDialog*/}
        <DellDialog
          open={openDell}
          onClose={() => setOpenDell(false)}
          rowData={selectedRow}
        />
      </Box>
    </>
  )
}

export default Reports