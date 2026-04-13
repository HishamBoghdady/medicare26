import {memo} from "react"

import {Box,Paper,MenuItem,TextField,Typography} from "../../Lib/MuiComponents"
const AdmissionApplicant = memo(function ({ PaperStyle, TypographyStyle, DividerStyle, GridStyle,data,onChange}) {

    return (
        <Paper elevation={0} sx={PaperStyle}>
            {/* عنوان القسم */}
            <Typography variant="h5" sx={TypographyStyle}>طالب الدخول</Typography>
            {/* خط تحت العنوان */}
            <Box sx={DividerStyle} />
            {/* Grid */}
            <Box sx={GridStyle}>
                <Box >
                    <Typography sx={{ mb: 2, fontWeight: "bold", color: '#ff0000ff' }}>الاسم</Typography>
                    <TextField label="" fullWidth size="small" type="text" sx={{ '& .MuiInputLabel-root': { color: '#ff0000ff', fontWeight: 'bold' } }}
                        value={data.Name} onChange={onChange('Name')} />
                </Box>
                <Box >
                    <Typography sx={{ mb: 2, fontWeight: "bold", color: '#ff0000ff' }}>العنوان</Typography>
                    <TextField label="" fullWidth size="small" type="text" sx={{ '& .MuiInputLabel-root': { color: '#ff0000ff', fontWeight: 'bold' } }}
                        value={data.Address} onChange={onChange('Address')} />
                </Box>
                <Box >
                    <Typography sx={{ mb: 2, fontWeight: "bold", color: '#ff0000ff' }}>الرقم القومي </Typography>
                    <TextField label="" fullWidth size="small" type="number" sx={{ '& .MuiInputLabel-root': { color: '#ff0000ff', fontWeight: 'bold' } }}
                        value={data.ID} onChange={onChange('ID')} />
                </Box>
                <Box >
                    <Typography sx={{ mb: 2, fontWeight: "bold" }}> الجنسيه</Typography>
                    <TextField select fullWidth size="small" label='اختر هنا'
                        value={data.Nationnality} onChange={onChange('Nationnality')}>
                        <MenuItem value="Egyptian_">مصري</MenuItem>
                        <MenuItem value="Forigan_">متزوج</MenuItem>
                    </TextField>
                </Box>
                <Box >
                    <Typography sx={{ mb: 2, fontWeight: "bold" }}> الوظيفه</Typography>
                    <TextField label="" fullWidth type="text" size="small"
                        value={data.Work} onChange={onChange('Work')} />
                </Box>
                <Box>
                    <Typography sx={{ mb: 2, fontWeight: "bold" }}> الصفه</Typography>
                    <TextField label="" fullWidth size="small" type="text"
                        value={data.Kinship} onChange={onChange('Kinship')} />
                </Box>
                <Box >
                    <Typography sx={{ mb: 2, fontWeight: "bold", color: '#ff0000ff' }}>رقم التليفون </Typography>
                    <TextField label="" fullWidth size="small" type="number"
                        value={data.PhoneNumber} onChange={onChange('PhoneNumber')} />
                </Box>
                <Box >
                    <Typography sx={{ mb: 2, fontWeight: "bold", color: '#ff0000ff' }}>اقرار الجلسات </Typography>
                    <TextField select fullWidth size="small" label='اختر هنا'
                        value={data.ApprovalSession} onChange={onChange('ApprovalSession')}>
                        <MenuItem value="Yes">نعم</MenuItem>
                        <MenuItem value="No">لا</MenuItem>
                    </TextField>
                </Box>
            </Box>
        </Paper>
    )
})


export default AdmissionApplicant