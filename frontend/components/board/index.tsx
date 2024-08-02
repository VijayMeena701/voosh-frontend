import React, { Dispatch, SetStateAction } from 'react';
import { DragDropContext, Droppable, resetServerContext, DroppableProvided, DropResult } from "react-beautiful-dnd";
import Columns from "./columns";
import Box from "@mui/material/Box"


type BoardProps = {
    items: Column[],
    handleDragEnd: (result: DropResult) => void
    setDialogData: Dispatch<SetStateAction<Card | undefined>>,
    handleEdit: () => void,
    handleView: () => void,
    handleDelete: (e: Card) => void,
}

const Board = ({ items, handleDragEnd, setDialogData, handleEdit, handleView, handleDelete }: BoardProps) => {
    resetServerContext()
    return (
        <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId='ROOT' type="COLUMNS" direction='horizontal' ignoreContainerClipping mode='standard' isCombineEnabled={false}  >
                {(provided: DroppableProvided) => (
                    <Box key={items[0].id} ref={provided.innerRef} {...provided.droppableProps} sx={{ display: "inline-flex", alignItems: { xs: "center", lg: "initial" }, flexFlow: { xs: "column", lg: "row" }, gap: 2, minHeight: "60dvh", width: "100%", maxWidth: 1600, mx: "auto" }}>
                        <Columns columns={items} setDialogData={setDialogData} handleEdit={handleEdit} handleView={handleView} handleDelete={handleDelete} />
                        {provided.placeholder}
                    </Box>
                )}
            </Droppable>
        </DragDropContext>
    )
}

export default Board