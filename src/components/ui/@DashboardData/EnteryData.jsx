import {memo} from "react"

import {Box,Paper,MenuItem,TextField,Typography} from "../../Lib/MuiComponents"
const EnteryData = memo(function EnteryData({PaperStyle,TypographyStyle,DividerStyle,GridStyle,data,onChange}) {

    return (
        <Paper elevation={0} sx={PaperStyle}>
            {/* عنوان section */}
            <Typography variant="h5" sx={TypographyStyle}> بيانات الدخول </Typography>
            {/* خط تحت العنوان */}
            <Box sx={DividerStyle} />
            {/* Grid مثل form-grid */}
            <Box sx={GridStyle}>
                {/* مادة الدخول */}
                <Box sx={{ minWidth: 0 }}>
                    <Typography sx={{ mb: "6px", fontWeight: "bold" }}> مادة الدخول</Typography>
                    <TextField select fullWidth size="small" label='اختر هنا'
                    value={data.EntryMaterial} onChange={onChange("EntryMaterial")}>
                        <MenuItem value="M10">M-10</MenuItem>
                        <MenuItem value="M12">M-12</MenuItem>
                        <MenuItem value="M13">M-13</MenuItem>
                    </TextField>
                </Box>
                {/* ميعاد الدخول */}
                <Box>
                    <Typography sx={{ mb: "6px", fontWeight: "bold", color: 'red' }}> ميعاد الدخول </Typography>
                    <TextField type="date" fullWidth size="small"
                    value={data.EntryTime} onChange={onChange("EntryTime")}/>
                </Box>
                {/* نوع المخدرات */}
                <Box>
                    <Typography sx={{ mb: "6px", fontWeight: "bold", color: "red" }}> نوع المخدرات</Typography>
                    <TextField fullWidth size="small"
                        value={data.TypeDisease} onChange={onChange("TypeDisease")}/>
                </Box>
                {/* رقم الكود المجلس */}
                <Box>
                    <Typography sx={{ mb: "6px", fontWeight: "bold" }}> رقم الكود المجلس</Typography>
                    <TextField fullWidth size="small" type="number"
                        value={data.CouncilCode} onChange={onChange("CouncilCode")}/>
                </Box>
            </Box>
        </Paper>
    )
})



export default EnteryData