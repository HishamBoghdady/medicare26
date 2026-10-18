import { Box, Card, CardContent, Typography, CardActionArea } from "../../Lib/MuiComponents";
import viewDate from "../../../utils/date/viewDate";

function CardData({ totalPaid, totalOwed, Incenter, Outcenter }) {
    let { TheDate, TheDay } = viewDate()
    return (
        <>
            <Box
                sx={{
                    width: "100%",
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(min(260px, 100%), 1fr))",
                    gap: 2,
                }}
            >
                {/* الماليات */}
                <Card
                    sx={{
                        width: "100%",
                        aspectRatio: "2.2 / 1",
                        minHeight: 175,
                        borderRadius: 3,
                        boxShadow: 2,
                        transition: "0.2s",
                        "&:hover": {
                            boxShadow: 5,
                            transform: "translateY(-2px)",
                        },
                    }}
                >
                    <CardActionArea sx={{ height: "100%" }}>
                        <CardContent
                            sx={{
                                height: "100%",
                                boxSizing: "border-box",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "space-between",
                                direction: "rtl",
                                p: 2,
                                borderTop: "4px solid",
                                borderColor: "primary.main",
                            }}
                        >
                            <Typography variant="subtitle1" fontWeight="bold">
                                الماليات
                            </Typography>

                            <Box sx={{ textAlign: "center" }}>
                                <Typography variant="caption" color="text.secondary" sx={{ fontSize: '18px' }}>
                                    الإجمالي
                                </Typography>
                                <Typography variant="h5" fontWeight="bold" color="primary.main" sx={{ fontSize: '30px' }}>
                                    {(totalPaid + totalOwed).toLocaleString("ar-EG")}
                                </Typography>
                            </Box>

                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    gap: 1,
                                    borderTop: "1px solid",
                                    borderColor: "divider",
                                    pt: 1,
                                }}
                            >
                                <Box>
                                    <Typography variant="caption" color="text.secondary" sx={{ fontSize: '18px' }}>
                                        المدفوع
                                    </Typography>
                                    <Typography variant="body2" fontWeight="bold" sx={{ fontSize: '14px' }}>
                                        {totalPaid.toLocaleString("ar-EG")}
                                    </Typography>
                                </Box>

                                <Box sx={{ textAlign: "left" }}>
                                    <Typography variant="caption" color="text.secondary" sx={{ fontSize: '18px' }}>
                                        المتبقي
                                    </Typography>
                                    <Typography variant="body2" fontWeight="bold" color="error.main" sx={{ fontSize: '14px' }}>
                                        {totalOwed.toLocaleString("ar-EG")}
                                    </Typography>
                                </Box>
                            </Box>
                        </CardContent>
                    </CardActionArea>
                </Card>

                {/* التاريخ */}
                <Card
                    sx={{
                        width: "100%",
                        aspectRatio: "2.2 / 1",
                        minHeight: 175,
                        borderRadius: 3,
                        boxShadow: 2,
                        transition: "0.2s",
                        "&:hover": {
                            boxShadow: 5,
                            transform: "translateY(-2px)",
                        },
                    }}
                >
                    <CardActionArea sx={{ height: "100%" }}>
                        <CardContent
                            sx={{
                                height: "100%",
                                boxSizing: "border-box",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "space-between",
                                alignItems: "center",
                                direction: "rtl",
                                p: 2,
                                borderTop: "4px solid",
                                borderColor: "warning.main",
                            }}
                        >
                            <Typography
                                variant="subtitle1"
                                fontWeight="bold"
                                alignSelf="flex-start"
                            >
                                التاريخ
                            </Typography>

                            <Box sx={{ textAlign: "center" }}>
                                <Typography variant="h4" fontWeight="bold">
                                    {TheDate}
                                </Typography>

                                <Typography variant="body2" color="warning.main" sx={{ mt: 1, fontWeight: 'bold', fontSize: '25px' }}>
                                    {TheDay}
                                </Typography>
                            </Box>

                            <Typography variant="caption" color="text.secondary">
                                التاريخ الحالي
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>

                {/* الحالات */}
                <Card
                    sx={{
                        width: "100%",
                        aspectRatio: "2.2 / 1",
                        minHeight: 175,
                        borderRadius: 3,
                        boxShadow: 2,
                        transition: "0.2s",
                        "&:hover": {
                            boxShadow: 5,
                            transform: "translateY(-2px)",
                        },
                    }}
                >
                    <CardActionArea sx={{ height: "100%" }}>
                        <CardContent
                            sx={{
                                height: "100%",
                                boxSizing: "border-box",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "space-between",
                                direction: "rtl",
                                p: 2,
                                borderTop: "4px solid",
                                borderColor: "success.main",
                            }}
                        >
                            <Typography variant="subtitle1" fontWeight="bold">
                                الحالات
                            </Typography>

                            <Box sx={{ textAlign: "center" }}>
                                <Typography variant="caption" color="text.secondary" sx={{ fontSize: '18px' }}>
                                    إجمالي الحالات
                                </Typography>
                                <Typography variant="h5" fontWeight="bold" color="success.main" sx={{ fontSize: '30px' }}>
                                    {(Incenter + Outcenter).toLocaleString("ar-EG")}
                                </Typography>
                            </Box>

                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    gap: 1,
                                    borderTop: "1px solid",
                                    borderColor: "divider",
                                    pt: 1,
                                }}
                            >
                                <Box>
                                    <Typography variant="caption" color="text.secondary" sx={{ fontSize: '18px' }}>
                                        دخول
                                    </Typography>
                                    <Typography variant="body2" fontWeight="bold" sx={{ fontSize: '14px' }}>
                                        {Incenter.toLocaleString("ar-EG")}
                                    </Typography>
                                </Box>

                                <Box sx={{ textAlign: "left" }}>
                                    <Typography variant="caption" color="text.secondary" sx={{ fontSize: '18px' }}>
                                        خروج
                                    </Typography>
                                    <Typography variant="body2" fontWeight="bold" sx={{ fontSize: '14px' }}>
                                        {Outcenter.toLocaleString("ar-EG")}
                                    </Typography>
                                </Box>
                            </Box>
                        </CardContent>
                    </CardActionArea>
                </Card>


            </Box>

        </>
    );
}

export default CardData;