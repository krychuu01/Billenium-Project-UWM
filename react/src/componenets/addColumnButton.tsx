import React, {useState} from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import {v4 as uuidv4} from "uuid";

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function AddColumnButton(props:any) {
    const [open, setOpen] = React.useState(false);
    const [name, setName] = useState("");
    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    };

    const handleSubmit = ({event}: { event: any }) => {
        event.preventDefault();
        console.log(name);
        // możesz tutaj przesłać dane do serwera lub zaktualizować stan aplikacji
    };
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    function addColumn(name:string) {
        const newColumnId = uuidv4();
        const newColumn = {
            title: name,
            items: [],
            index: Object.keys(props.columns).length, // use current length of columns as index
        };
        props.setColumns({ ...props.columns, [newColumnId]: newColumn });
        handleClose();
    }

    return (
        <div>
            <div style={{display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center"}}>
                Add Column
            <Button
                onClick={handleOpen}
                sx={{width:"200px", maxHeight:"50px"}}
                variant="outlined"
            >
                +
            </Button>
            </div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}
            >
                <Fade in={open}>
                    <Box sx={style}>
                        <Typography id="transition-modal-title" variant="h6" component="h2">
                            Set column name
                        </Typography>
                        <div style={{display:"flex", justifyContent:"space-between"}}>
                        <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                            <TextField
                                id="outlined-basic"
                                label="Name"
                                variant="outlined"
                                value={name}
                                onChange={handleNameChange}
                            />
                        </Typography>
                        <Button
                            onClick={() => addColumn(name)}
                            variant="contained"
                        >
                            Dodaj
                        </Button>
                        </div>
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
}