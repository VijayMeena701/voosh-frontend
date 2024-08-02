import React, { Dispatch, SetStateAction } from 'react';
import { Draggable, DraggableProvided, DraggableStateSnapshot, Droppable, DroppableProvided } from "react-beautiful-dnd";
import { Box, Paper, Typography } from "@mui/material"

import Cards from "./card";

type ColumnsProps = {
    columns: Column[],
    setDialogData: Dispatch<SetStateAction<Card | undefined>>,
    handleEdit: () => void,
    handleView: () => void,
    handleDelete: (e: Card) => void
}


// returns all the columns with a map
const Columns = ({ columns, setDialogData, handleEdit, handleView, handleDelete }: ColumnsProps) => {
    return (columns.map((column, index) => <Column column={column} index={index} key={index} setDialogData={setDialogData} handleEdit={handleEdit} handleView={handleView} handleDelete={handleDelete} />))
};

export default Columns;

type ColumnProps = {
    column: Column,
    index: number,
    setDialogData: Dispatch<SetStateAction<Card | undefined>>,
    handleEdit: () => void,
    handleView: () => void,
    handleDelete: (e: Card) => void
}


// returns a specific column with all the column data.
export const Column = ({ column, index, setDialogData, handleEdit, handleView, handleDelete }: ColumnProps) => {
    return (
        <Draggable key={index} draggableId={column.id} index={index}>
            {(provided: DraggableProvided, snapshot: DraggableStateSnapshot) => (
                <Box component={Paper} ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} sx={{ display: "flex", flexDirection: "column", gap: 2, bgcolor: snapshot.isDragging ? "#ABC" : "#FFF", margin: 1, height: 600, p: 1, borderRadius: 2, maxWidth: 400, width: 400 }} >
                    <Box sx={{ bgcolor: "#2655A380" }}>
                        <Typography sx={{ px: 2, py: 1, color: "#FFF", fontWeight: 700 }} >{column.name}</Typography>
                    </Box>
                    <Box sx={{ display: "flex", flexFlow: "column", gap: 1 }}>
                        <Droppable droppableId={column.id}>
                            {(innerProvided: DroppableProvided) => (
                                <Box ref={innerProvided.innerRef} {...innerProvided.droppableProps} sx={{ display: "flex", flexDirection: "column", gap: 2, minHeight: 150 }} >
                                    <Cards key={column.data.length} cards={column.data} setDialogData={setDialogData} handleView={handleView} handleEdit={handleEdit} handleDelete={handleDelete} />
                                    {innerProvided.placeholder}
                                </Box>
                            )}
                        </Droppable>
                    </Box>
                </Box>
            )}
        </Draggable>
    )
};