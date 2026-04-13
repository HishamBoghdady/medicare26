//Import Mui Library
import {FeedIcon,EditIcon,ExitToAppIcon,DeleteForeverIcon} from '../../Lib/MuiIcon';
import {List,Dialog,Avatar,Typography,ListItemText,ListItemButton,ListItemAvatar} from "../../Lib/MuiComponents"

import {normalizeDateSafe} from '../../../utils/index';

export default function ControlDialog({ open, onClose,rowData, onEdit,onInfo,onExit,onDell}) {
    return (
        <>
            <Dialog open={open} onClose={onClose} >
                
                <List sx={{ width: '100%', maxWidth: 350, backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)", borderRadius: 2, boxShadow: "0 20px 32px rgba(0,0,0,0.4)", }}>
                    
                        <Typography variant="h6" component="h2">Name: {rowData?.FullData?.PersonalData?.Name}</Typography>
                        <Typography variant="h6" component="h2">Date: {normalizeDateSafe(rowData?.FullData?.EnteryData?.EntryTime)}</Typography>
                    

                        <ListItemButton sx={{ width: '100%' }} onClick={() =>onEdit(rowData)}>
                            <ListItemAvatar>
                                <Avatar sx={{ border: '1px solid #1565C0', backgroundColor: '#1565c050', color: '#1565C0' }}>
                                    <EditIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary="Edit Information" secondary="Jan 9, 2014" />
                        </ListItemButton>
                    
                        <ListItemButton sx={{ width: '100%' }} onClick={()=>{onInfo(rowData)}}>
                            <ListItemAvatar>
                                <Avatar sx={{ border: '1px solid #2E7D32', backgroundColor: '#2E7D3250', color: '#2E7D32' }}>
                                    <FeedIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary="View Information" secondary="Jan 7, 2014" />
                        </ListItemButton>
                    
                        <ListItemButton sx={{ width: '100%' }} onClick={()=>{onExit(rowData)}}
                            disabled={rowData?.FullData?.EnteryData?.Condition == 'out'}
                            >
                            <ListItemAvatar>
                                <Avatar sx={{ border: '1px solid #ED6C02', backgroundColor: '#ED6C0250', color: '#ED6C02' }}>
                                    <ExitToAppIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary="Exit" secondary="July 20, 2014" />
                        </ListItemButton>
                    
                        <ListItemButton sx={{ width: '100%' }} onClick={()=>{onDell(rowData)}}>
                            <ListItemAvatar>
                                <Avatar sx={{ border: '1px solid #D32F2F', backgroundColor: '#d32f2f50', color: '#D32F2F' }} >
                                    <DeleteForeverIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary="Delete" secondary="July 20, 2014" />
                        </ListItemButton>
                    
                </List>
            </Dialog>
        </>
    );
}
