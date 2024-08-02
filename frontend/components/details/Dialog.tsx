import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import dayjs from 'dayjs';

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function DetailsDialogSlide({ open, data, handleClose }: { open: boolean, data: Card, handleClose: () => void }) {

    return (
        <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            maxWidth="sm"
            fullWidth
        >
            <DialogTitle>{"Task Details"}</DialogTitle>
            <DialogContent>
                <DialogContentText variant='subtitle1'>
                    Title: {data.title}
                </DialogContentText>
                <DialogContentText variant='subtitle2'>
                    Description: {data.desc}
                </DialogContentText>
                <DialogContentText variant='subtitle2'>
                    Created at: {dayjs(data.createdAt ?? new Date('2024-08-01T06:26:37.113Z')).format('D/MM/YYYY, HH:mm:ss')}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button variant='contained' onClick={handleClose}>Close</Button>
            </DialogActions>
        </Dialog>
    );
}
