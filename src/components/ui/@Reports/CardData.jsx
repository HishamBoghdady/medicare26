import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";

function CardData({ totalPaid, totalOwed, Incenter, Outcenter }) {
    let cards = [
        {
            id: 1, title: "مدفوع", salary: totalPaid, color: 'green'
        },
        {
            id: 2, title: "متبقي", salary: totalOwed, color: 'red'
        },
        {
            id: 3, title: "موجودين", salary: Incenter, color: ''
        },
        {
            id: 4, title: "خرجوه", salary: Outcenter, color: ''
        },
    ]
    return (
        <>
            <Box
                sx={{ width: "100%", display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(200px, 100%), 1fr))", gap: 2, }}
            // sx={{width: "100%",display: "grid",gridTemplateColumns: {xs: "1fr",sm: "repeat(4, minmax(0, 1fr))",},gap: 2,}}
            >

                {cards.map((card) => (
                    <Card key={card.id} sx={{ width: '100%' }}>
                        <CardActionArea
                            sx={{
                                border: `0.5px solid ${card.color}`,
                                height: "100%",
                                "&[data-active]": {
                                    backgroundColor: "action.selected",
                                    "&:hover": { backgroundColor: "action.selectedHover", },
                                },
                            }}>

                            <CardContent
                                sx={{
                                    height: "100%",
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    gap: 2,
                                    textAlign: "left",
                                    direction: 'rtl'
                                }}
                            >
                                <Typography variant="h5" component="div" >{card.title}</Typography>
                                <Typography variant="h4" sx={{ color: card.color }}>{card.salary}</Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                ))}

            </Box>
        </>
    );
}

export default CardData;
