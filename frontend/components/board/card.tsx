import React, { Dispatch, SetStateAction } from 'react';
import { Draggable } from "react-beautiful-dnd";
import dayjs from 'dayjs';

import { Paper, Box, Typography } from '@mui/material';

type CardsProps = {
    cards: Card[],
    setDialogData: Dispatch<SetStateAction<Card>>,
    handleEdit: () => void,
    handleView: () => void,
    handleDelete: (e: Card) => void,
}

export const Cards = ({ cards, setDialogData, handleEdit, handleView, handleDelete }: CardsProps) => {
    return cards.map((card, index) => <Card key={card.id} item={card} id={card.id} index={index} setDialogData={setDialogData} handleEdit={handleEdit} handleView={handleView} handleDelete={handleDelete} />)
}

type CardProps = {
    item: Card,
    id: string,
    index: number,
    setDialogData: Dispatch<SetStateAction<Card>>,
    handleEdit: () => void,
    handleView: () => void,
    handleDelete: (e: Card) => void,
}
export const Card = ({ item, id, index, setDialogData, handleEdit, handleView, handleDelete }: CardProps) => {
    return (
        <Draggable draggableId={id} index={index}>
            {(provided) => (
                <Paper {...provided.dragHandleProps} {...provided.draggableProps} ref={provided.innerRef} sx={{ maxWidth: 400, width: "100%", height: 150, maxHeight: 150 }} >
                    <Box sx={{ display: "flex", flexFlow: "column", gap: 1, p: 1 }}>
                        <Typography>{item.title ?? "Task 1" + id}</Typography>
                        <Typography>{item.desc ?? "A small description about this task should be here"}</Typography>
                        <Typography>{dayjs(item.createdAt ?? new Date('2024-08-01T06:26:37.113Z')).format('D/MM/YYYY, HH:mm:ss')}</Typography>
                        <Box sx={{ display: "flex", flexFlow: "row", gap: 1 }}>
                            <Box sx={{ flexGrow: 1 }} />
                            <Typography component="button" variant='body2' onClick={() => handleDelete(item)} sx={{ px: 1, py: 0.5, outline: "none", border: "none", bgcolor: "red", borderRadius: 1 }}>Delete</Typography>
                            <Typography component="button" variant='body2' onClick={() => { setDialogData(item); handleEdit() }} sx={{ px: 1, py: 0.5, outline: "none", border: "none", bgcolor: "#2655A390", borderRadius: 1 }}>Edit</Typography>
                            <Typography component="button" variant='body2' onClick={() => { setDialogData(item); handleView() }} sx={{ px: 1, py: 0.5, outline: "none", border: "none", bgcolor: "#2655A3", borderRadius: 1 }}>View Details</Typography>
                        </Box>
                    </Box>
                </Paper>
            )}
        </Draggable>

    )
}

export default Cards