import React, {useState} from "react";
import {Grid, Box, useTheme, Typography, IconButton, Tooltip} from "@mui/material";
import {ColorModeContext} from "@/App";
import {Link} from "react-router-dom";
import {BoardCardProps} from "@/components/board/interfaces/boardCard/boardCard";
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import ModalLeaveBoard from "@/components/board/modalLeaveBoard/modalLeaveBoard";
import {openModal} from "@/services/utils/modalUtils/modalUtils";


const BoardCard = (props:BoardCardProps) => {
    const [modalLeaveBoard, setModalLeaveBoard] = useState(false);
    const theme = useTheme()
    const colorMode = React.useContext(ColorModeContext);
    React.useEffect(() => {
        // Pobieranie elementu body i ustawienie stylu tła
        document.body.style.backgroundColor = theme.palette.background.default;
    }, [theme]);
    return(
            <Grid
                item
                xs={2}
                padding={2}
                minWidth={'250px'}
            >
                <Box
                    borderLeft={`20px solid ${theme.palette.primary.main}`}
                    boxShadow={'0px 4px 4px rgba(0, 0, 0, 0.25)'}
                    height={'140px'}
                    display={'flex'}
                    flexDirection={'column'}
                    justifyContent={"end"}
                    bgcolor={theme.palette.background.cell}
                    padding={1}
                    borderRadius={'10px 0 0 10px'}
                >
                    <Box height={'75%'}>
                        <Link to={`/board/${props.id}`} style={{textDecoration:'none'}}>
                        <Typography variant={"h5"} color={theme.palette.text.primary}>
                            {props.title}
                        </Typography>
                        <Typography variant={"subtitle1"} color={theme.palette.text.primary}>
                            Creator: {props.creator}
                        </Typography>
                        </Link>
                    </Box>
                    <Box
                        justifyContent={"end"}
                        display={"flex"}
                        height={'25%'}
                    >
                        <Tooltip title={'Leave board'} placement={"bottom"}>
                            <IconButton
                                sx={{color:'red'}}
                                size={"small"}
                                onClick={() => openModal(setModalLeaveBoard)}
                            >
                                <ExitToAppIcon/>
                            </IconButton>
                        </Tooltip>
                    </Box>

                </Box>
                <ModalLeaveBoard
                    id={props.id}
                    userId={props.userId}
                    title={props.title}
                    modalDelete={modalLeaveBoard}
                    setModalDelete={setModalLeaveBoard}
                    setUserBoards={props.setUserBoards}
                />
            </Grid>

    )
}
export default BoardCard