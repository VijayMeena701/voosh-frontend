'use client';
import * as React from "react";
import axios from "axios";
import { DropResult } from "react-beautiful-dnd";
import { Box, Typography } from '@mui/material';
import { useState } from 'react';
import Board from "@/components/board";
import Dialog from "@/components/details/Dialog";
import EditDialog from "@/components/details/EditDialog";
import Search from "@/components/Search";
import Button from "@mui/material/Button";

export default function Home() {
    const [originalData, setOriginalData] = useState<Column[]>([]);
    const [items, setItems] = useState<Column[]>([]);
    const [dialogData, setDialogData] = useState<Card>();
    const [editOpen, setEditOpen] = useState<boolean>(false);
    const [detailsOpen, setDetailsOpen] = useState<boolean>(false);
    const [search, setSearch] = useState('');

    const handleAddTask = async () => {
        try {
            const newTask = await axios.post(`${process.env.BACKEND}/tasks`, { title: 'Task', description: 'abc', statusId: 1, });

            setItems(p => {
                let newItems = [...p];
                newItems.forEach(status => {
                    if (status.id === '1')
                        status.data.splice(0, 0, { ...newTask.data, id: newTask.data.id.toString() })
                });

                return newItems;
            })

        } catch (error) {
            console.log(error)
            console.log("something went wrong")
        }

    }

    const handleSearch = (val: string) => {
        setSearch(val);
        const searchQuery = val.toLowerCase();

        if (!searchQuery) {
            setItems(originalData);
            return;
        }

        const filtered = originalData.map(status => ({
            ...status,
            data: status.data.filter(task => task.title.toLowerCase().includes(searchQuery) || task.desc.toLowerCase().includes(searchQuery))
        }));

        setItems(filtered);
    };

    const onDragEnd = (result: DropResult) => {

        const { destination, source, type } = result;

        if (!destination) return;

        if ((destination.droppableId === source.droppableId) && (destination.index === source.index)) return;

        if (type === "COLUMNS") {
            const reorderedItems = [...items];
            const [movedItem] = reorderedItems.splice(source.index, 1);
            reorderedItems.splice(destination.index, 0, movedItem);

            return setItems(reorderedItems);
        };

        const sourceIndex = items.findIndex(item => item.id === source.droppableId);
        const destinationIndex = items.findIndex(item => item.id === destination.droppableId);


        const newSourceItems = [...items[sourceIndex].data];
        const newDestinationItems = source.droppableId !== destination.droppableId ? [...items[destinationIndex].data] : newSourceItems

        const [deletedItem] = newSourceItems.splice(source.index, 1);
        newDestinationItems.splice(destination.index, 0, deletedItem);

        handleUpdateTask({ task: deletedItem, statusId: items[destinationIndex].id })

        const newItems = [...items];

        newItems[sourceIndex] = {
            ...items[sourceIndex],
            data: newSourceItems
        }

        newItems[destinationIndex] = {
            ...items[destinationIndex],
            data: newDestinationItems
        }

        return setItems(newItems)

    };

    const handleDialogClose = () => {
        setEditOpen(false);
        setDetailsOpen(false);
    };

    const handleEdit = () => setEditOpen(true);
    const handleView = () => setDetailsOpen(true);

    const handleDelete = async (item: Card) => {
        if (!item) return;

        try {
            await axios.delete(`${process.env.BACKEND}/tasks/${item.id}`)
            const newItems = items.map(status => ({
                ...status,
                data: status.data.filter(task => task.id !== item.id)
            }));
            setItems(newItems);
        } catch (error) {
            console.log(error)
        }

    };

    const handleUpdateTask = async ({ task, statusId }: { task: Card, statusId: string }) => {
        try {
            await axios.patch(`${process.env.BACKEND}/tasks/${task.id}`, { ...task, statusId })
        } catch (error) {
            console.log(error)
        }
    }

    const handleEditSave = () => {
        const newData = [...items];

        for (const data of newData) {
            const task = data.data.findIndex(task => task.id === dialogData?.id);
            if (task !== -1) {
                data.data[task] = { ...data.data[task], ...dialogData };
                handleUpdateTask({ task: { ...data.data[task], ...dialogData }, statusId: data.id })
                setItems(newData)
            }
        };
        return handleDialogClose()
    };

    React.useEffect(() => {
        if (typeof window !== 'undefined') {
            const token = localStorage.getItem('authToken');
            if (token) axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            else window.location.href = '/login'
        }
    }, []);


    React.useEffect(() => {
        const fetchStatuses = async () => {
            try {
                const allStatuses = await axios.get(`${process.env.BACKEND}/tasks`)
                setItems(allStatuses.data)
                setOriginalData(allStatuses.data)
            } catch (err) {
                console.log(err)
            }
        };

        if (typeof window !== undefined) fetchStatuses()

    }, [])


    return (
        <Box display="flex" flexDirection="column" alignItems="center" sx={{ height: "calc(100dvh - 64px)", width: "100%", overflowX: "hidden", overflowY: "auto" }}>
            <Box sx={{ px: 2, width: "100%", mt: 2 }}>
                <Button variant="contained" sx={{ px: 5 }} onClick={handleAddTask} >Add Task</Button>
                <Box sx={{ display: "flex", flexFlow: "row", width: "100%", mt: 2, px: 2, py: 1, bgcolor: "#FFF", borderRadius: 2, boxShadow: "0 0 5px 0 rgba(0,0,0,0.25)" }}>
                    <Box sx={{ display: "flex", flexFlow: "row", gap: 1, alignItems: "center" }}>
                        <Typography>Search</Typography>
                        <Search value={search} handleSearch={handleSearch} />
                    </Box>
                </Box>
            </Box>
            {items.length > 0 && <Board items={items} handleDragEnd={onDragEnd} setDialogData={setDialogData} handleEdit={handleEdit} handleView={handleView} handleDelete={handleDelete} />}
            {dialogData && <Dialog open={detailsOpen} handleClose={handleDialogClose} data={dialogData} />}
            {dialogData && <EditDialog open={editOpen} handleClose={() => setEditOpen(false)} data={dialogData} setData={setDialogData} handleSave={handleEditSave} />}
        </Box>
    );
};