import {memo} from "react"

import {Box,Paper,TextField,Typography,Radio,MenuItem,RadioGroup,FormControlLabel} from "../../Lib/MuiComponents"
const PersonalData =memo(function({ PaperStyle, TypographyStyle, DividerStyle, GridStyle,data,onChange})  {

    return (
        <Paper elevation={0} sx={PaperStyle}>
            {/* عنوان القسم */}
            <Typography variant="h5" sx={TypographyStyle}>البيانات الشخصية</Typography>
            {/* خط تحت العنوان */}
            <Box sx={DividerStyle} />
            {/* Grid */}
            <Box sx={GridStyle}>
                <Box>
                    <Typography sx={{ mb: 2, fontWeight: "bold", color: '#ff0000ff' }}>الاسم</Typography>
                    <TextField label="" fullWidth size="small" type="text" sx={{ '& .MuiInputLabel-root': { color: '#ff0000ff', fontWeight: 'bold' } }}
                        value={data.Name} onChange={onChange('Name')} />
                </Box>
                <Box >
                    <Typography sx={{ mb: 2, fontWeight: "bold", color: '#ff0000ff' }}>العنوان </Typography>
                    <TextField label="" fullWidth type="text" size="small" sx={{ '& .MuiInputLabel-root': { color: '#ff0000ff', fontWeight: 'bold' } }}
                        value={data.Address} onChange={onChange('Address')} />
                </Box>
                <Box>
                    <Typography sx={{ mb: 2, fontWeight: "bold", color: '#ff0000ff' }}>الرقم القومي </Typography>
                    <TextField label="" fullWidth type="number" size="small" sx={{ '& .MuiInputLabel-root': { color: '#ff0000ff', fontWeight: 'bold' } }}
                        value={data.ID} onChange={onChange('ID')} />
                </Box>
                <Box >
                    <Typography sx={{ mb: 2, fontWeight: "bold" }}> النوع</Typography>
                    {/* <TextField label="" fullWidth type="text" size="small" /> */}
                    <RadioGroup row name="gender"
                        value={data.Gender} onChange={onChange('Gender')}>
                        <FormControlLabel value="male" control={<Radio size='small' />} label="ذكر" size='small' />
                        <FormControlLabel value="female" control={<Radio size='small' />} label="أنثى" size='small' />
                    </RadioGroup>
                </Box>
                <Box >
                    <Typography sx={{ mb: 2, fontWeight: "bold" }}> الوظيفه</Typography>
                    <TextField label="" fullWidth type="text" size="small"
                        value={data.Work} onChange={onChange('Work')} />
                </Box>
                <Box >
                    <Typography sx={{ mb: 2, fontWeight: "bold" }}> السن</Typography>
                    <TextField label="" fullWidth type="number" size="small" sx={{ '& .MuiInputLabel-root': { color: '#ff0000ff', fontWeight: 'bold' } }}
                        value={data.Age} onChange={onChange('Age')} />
                </Box>
                <Box >
                    <Typography sx={{ mb: 2, fontWeight: "bold" }}> الديانه</Typography>
                    <TextField select fullWidth size="small" label='اختر هنا'
                        value={data.Religion} onChange={onChange('Religion')}>
                        <MenuItem value="Muslim">مسلم</MenuItem>
                        <MenuItem value="Christian">مسيحي</MenuItem>
                        <MenuItem value="Jew">يهودي</MenuItem>
                        <MenuItem value="Other">غير ذلك</MenuItem>
                    </TextField>
                </Box>
                <Box >
                    <Typography sx={{ mb: 2, fontWeight: "bold" }}>الحاله الاجتماعيه </Typography>
                    <TextField select fullWidth size="small" label='اختر هنا'
                        value={data.SocialStatus} onChange={onChange('SocialStatus')}>
                        <MenuItem value="Single">اعزب</MenuItem>
                        <MenuItem value="Married">متزوج</MenuItem>
                        <MenuItem value="Widower">ارمل</MenuItem>
                        <MenuItem value="Divorced">مطلق</MenuItem>
                    </TextField>
                </Box>
                <Box >
                    <Typography sx={{ mb: 2, fontWeight: "bold" }}> الجنسيه</Typography>
                    <TextField select fullWidth size="small" label='اختر هنا'
                        value={data.Nationnality} onChange={onChange('Nationnality')}>
                        <MenuItem value="Egyptian">مصري</MenuItem>
                        <MenuItem value="Forigen">اجنبي</MenuItem>
                    </TextField>
                </Box>
            </Box>
        </Paper>
    )
}) 

export default PersonalData