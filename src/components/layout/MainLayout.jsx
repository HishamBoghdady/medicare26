import { Box ,Paper} from "../Lib/MuiComponents"
import Navbar from '../shared/Navbar'
import { Outlet } from "react-router-dom";

function MainLayout () {
    return (
        <>
            <Navbar/> {/*Done -/*/}
            <Box sx={{ p: 2 ,backgroundColor:'#f4f7fa85'}}>
                <Paper sx={{ p: 3, borderRadius: 3,  }}>
                    <Outlet/>
                </Paper>
            </Box>
        </>
    )
}
export default MainLayout;
