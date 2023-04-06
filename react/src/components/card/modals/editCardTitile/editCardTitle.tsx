import React, {useState} from "react";
import {Box, IconButton, TextField, Tooltip, Typography, useTheme} from "@mui/material";
import {EditCardTitleProps} from "@/components/card/interfaces/editCardForm/editCardForm";
import {closeModal, openModal} from "@/services/utils/modalUtils/modalUtils";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import LockIcon from "@mui/icons-material/Lock";

const EditCardTitle = (props:EditCardTitleProps) => {
    const theme = useTheme()
    const [isEditing, setIsEditing] = useState(false)

    return(
        <>
            {isEditing && (
                <Box display={"flex"} alignItems={"center"}>
                    <TextField
                        sx={{margin:'0 0 8px 0', width:'80%'}}
                        id="outlined-basic"
                        label="Title"
                        variant="standard"
                        value={props.text}
                        onChange={props.handleChangeText}
                    />
                    <IconButton
                        sx={{
                            maxWidth:'35px',
                            maxHeight:'35px',
                            color:theme.palette.primary.main
                        }}
                        size={"small"}
                        onClick={() => closeModal(setIsEditing)}
                    >
                        <CheckIcon/>
                    </IconButton>
                    <IconButton
                        sx={{
                            maxWidth:'35px',
                            maxHeight:'35px'
                        }}
                        size={"small"}
                        onClick={() => closeModal(setIsEditing)}
                    >
                        <CloseIcon/>
                    </IconButton>
                </Box>
            )}
            {!isEditing && (
                <Box
                    width={'100%'}
                    display={"flex"}
                    justifyContent={"space-between"}
                >
                    <Box minWidth={'30px'}>
                    </Box>
                    <Box
                        display={"flex"}
                        alignItems={"center"}
                    >
                        {props.isLocked && (
                            <Tooltip title={'Card is Locked'} placement={"top"}>
                                <LockIcon sx={{
                                    color:theme.palette.primary.main,
                                    fontSize:'18px'
                                }}
                                />
                            </Tooltip>
                        )}
                        <Typography
                            variant={"h5"}
                            color={theme.palette.text.primary}
                        >
                            {props.text}
                        </Typography>
                    <Tooltip title={'Edit Title'}>
                        <IconButton
                            sx={{
                                maxWidth:'30px',
                                maxHeight:'30px'
                            }}
                            size={"small"}
                            onClick={() => openModal(setIsEditing)}
                        >
                            <BorderColorOutlinedIcon
                                sx={{
                                    maxWidth:'20px',
                                    maxHeight:'20px'
                                }}
                            />
                        </IconButton>
                    </Tooltip>
                    </Box>

                    <Box display={"flex"}>
                        <IconButton
                            onClick={() => closeModal(props.setModalEdit)}
                        >
                            <CloseIcon/>
                        </IconButton>
                    </Box>
                </Box>
            )}
        </>
    )
}
export default EditCardTitle