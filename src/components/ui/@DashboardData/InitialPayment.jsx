import {memo} from "react"

import {Box,Paper,TextField,Typography} from "../../Lib/MuiComponents"
const InitialPayment = memo(function ({ PaperStyle, TypographyStyle, DividerStyle, GridStyle,data,onChange }) {
    return (
        <Paper elevation={0} sx={PaperStyle}>
            {/* عنوان القسم */}
            <Typography variant="h5" sx={TypographyStyle}>دفع اولي</Typography>
            {/* خط تحت العنوان */}
            <Box sx={DividerStyle} />
            {/* Grid */}
            <Box sx={GridStyle}>
                <Box >
                    <Typography sx={{ mb: 2, fontWeight: "bold", color: '#ff0000ff' }}>تاريخ الدفع </Typography>
                    <TextField label="" size="small" fullWidth type="date" InputLabelProps={{ shrink: true }} sx={{ '& .MuiInputLabel-root': { color: '#ff0000ff', fontWeight: 'bold' } }}
                        value={data.PaymentDate} onChange={onChange('PaymentDate')} />
                </Box>
                <Box >
                    <Typography sx={{ mb: 2, fontWeight: "bold", color: '#ff0000ff' }}>مبلغ المدفوع </Typography>
                    <TextField label="" size="small" fullWidth sx={{ '& .MuiInputLabel-root': { color: '#ff0000ff', fontWeight: 'bold' } }}
                        value={data.AmountPaid} onChange={onChange('AmountPaid')} type="number"/>
                </Box>
            </Box>
        </Paper>
    )
})

export default InitialPayment