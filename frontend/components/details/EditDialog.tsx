import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

type ModalProps = {
    open: boolean,
    data: Card,
    setData: React.Dispatch<React.SetStateAction<Card>>,
    handleSave: () => void,
    handleClose: () => void
}


export default function DetailsDialogSlide({ open, data, setData, handleSave, handleClose }: ModalProps) {

    return (
        <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            maxWidth="sm"
            fullWidth
        >
            <DialogTitle>{"Edit Details"}</DialogTitle>
            <DialogContent>
                <TextField fullWidth label="Title" variant='standard' name="title" value={data.title} onChange={(e) => setData(p => ({ ...p, [e.target.name]: e.target.value }))} />
                <TextField fullWidth label="Description" variant='standard' name="desc" multiline minRows={3} maxRows={3} sx={{ mt: 1 }} value={data.desc} onChange={(e) => setData(p => ({ ...p, [e.target.name]: e.target.value }))} />

            </DialogContent>
            <DialogActions>
                <Button variant='contained' color='primary' onClick={handleSave} disabled={!(data.title && data.desc)} >Save</Button>
                <Button variant='contained' color='error' onClick={handleClose}>Close</Button>
            </DialogActions>
        </Dialog>
    );
}
