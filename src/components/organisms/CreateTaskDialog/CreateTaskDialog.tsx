import { Dialog, DialogTitle, DialogContent, DialogActions, styled, Button, IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";
import { FunctionComponent } from "react";
import Input from "../../atoms/Input/Input";
import { DatePicker, LocalizationProvider, PickersDay } from "@mui/x-date-pickers";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import styles from './CreateTaskDialog.module.scss';
import RedirectButton from "../../atoms/Button/Button";
import { useDispatch } from "react-redux";
import { addTask, deleteTask, editTask } from "../../../redux/slices/persistedSlice";
import { TaskListModel } from "../../../interfaces";
import { v4 as uuidv4 } from 'uuid';
import CloseIcon from '@mui/icons-material/Close';

interface CreateTaskDialogProps {
    open: boolean;
    handleClose: () => void;
    type: string;
    taskDetails?: TaskListModel;
}

// Define your custom styles for the Dialog component
const CustomDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialog-paper': {
        // Add your custom styles for the Dialog paper
        backgroundColor: '#F8F7F2',
        color: '#ED8173',
        borderRadius: '25px',
        padding: theme.spacing(3),
    },
    '& .MuiDialogContent-root': {
        // Add your custom styles for the Dialog content
        color: '#AFADA9', // Change color to whatever you desire
        fontSize: '15px'
    },
}));

const StyledDay = styled(PickersDay)(() => ({
    borderRadius: '25px',
    color: "#ED8173",
    '&.Mui-selected': {
        backgroundColor: '#ED8173', // Change background color of selected date to red
        color: 'white', // Change text color of selected date to white
        '&:hover, &:focus': {
            backgroundColor: '#ED8173',
        },
    },
}));

const CreateTaskDialog: FunctionComponent<CreateTaskDialogProps> = ({ open, handleClose, type, taskDetails }) => {
    const [taskDetailsForm, setTaskDetailsForm] = useState({
        projectName: '',
        taskName: '',
        taskDescription: '',
        taskDueDate: new Date().toDateString()
    });
    const [clicked, setClicked] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        if (type === 'edit' && taskDetails) {
            setTaskDetailsForm(taskDetails)
        }
    }, [taskDetails, type]);

    const handleSubmit = () => {
        if (!taskDetailsForm.projectName || !taskDetailsForm.taskName || !taskDetailsForm.taskDescription || !taskDetailsForm.taskDueDate) {
            return;
        }
        if (type === 'edit') {
            dispatch(editTask({ task: taskDetailsForm }));
            resetTaskDetails();
            handleClose();
        } else {
            const taskId = uuidv4();
            let task = {
                ...taskDetailsForm,
                id: taskId
            }
            dispatch(addTask({ task }));
            resetTaskDetails();
            handleClose();
        }
    };

    const onChange = (e: any) => {
        setTaskDetailsForm({
            ...taskDetailsForm,
            [e.target.name]: e.target.value
        });
    }

    const onDateChange = (dateValue: Date | null) => {
        if (dateValue !== null) {
            setTaskDetailsForm({
                ...taskDetailsForm,
                taskDueDate: dateValue.toDateString()
            })
        }
    }

    const closeDialog = () => {
        resetTaskDetails();
        handleClose();
    }

    const resetTaskDetails = () => {
        setTaskDetailsForm({
            projectName: '',
            taskName: '',
            taskDescription: '',
            taskDueDate: new Date().toDateString()
        });
    }

    const onDeleteTask = () => {
        dispatch(deleteTask({ id: taskDetails?.id }));
        closeDialog();
    }

    return (
        type === 'delete' ?
            <CustomDialog
                open={open}
            >
                <DialogTitle className={styles['dialog-title']}>
                    <p>Confirm Task Deletion</p>
                    <IconButton onClick={handleClose}><CloseIcon /></IconButton>
                </DialogTitle>
                <DialogContent>
                    <p className={styles['dialog-content']}>
                        Are you sure you want to delete this task? This action cannot be undone. Deleting this task will remove it from your task list permanently. Please confirm whether you would like to proceed with the deletion.
                    </p>
                </DialogContent>
                <DialogActions>
                    <div className={styles['btn-div']}>
                        <Button sx={{ color: '#ED8173', borderRadius: '25px' }} className={styles['cancel-btn']} onClick={() => closeDialog()}>Cancel</Button>
                        <RedirectButton type="button" name={"Delete Task"} width="180px" height="40px" onClick={onDeleteTask} />
                    </div>
                </DialogActions>
            </CustomDialog> :
            <CustomDialog
                open={open}
                PaperProps={{
                    component: 'form',
                    onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
                        event.preventDefault();
                        handleSubmit();
                    },
                }}
            >
                <DialogTitle className={styles['dialog-title']}>
                    <p>{type === 'create' ? "Create Task" : "Edit Task"}</p>
                    <IconButton onClick={handleClose}><CloseIcon /></IconButton>
                </DialogTitle>
                <DialogContent className={styles['dialog-content']}>
                    <p >
                        {type === "create" ? "Complete the fields below to define your task" : "Modify the task details below to update your task"}
                    </p>
                    <Input
                        id="projectName"
                        name="projectName"
                        label="Project Name"
                        value={taskDetailsForm.projectName}
                        onChange={onChange}
                        error={clicked && !taskDetailsForm.projectName.trim()}
                    />
                    <div className={styles['input-div-flex']}>
                        <div className={styles['task-name-div']}>
                            <Input
                                id="taskName"
                                name="taskName"
                                label="Task Name"
                                value={taskDetailsForm.taskName}
                                onChange={onChange}
                                error={clicked && !taskDetailsForm.taskName.trim()}
                            />
                        </div>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DemoContainer components={['DatePicker']}>
                                <DatePicker
                                    className={styles['date-picker']}
                                    label="Styled picker"
                                    slots={{
                                        day: StyledDay,
                                    }}
                                    disablePast
                                    value={taskDetailsForm.taskDueDate ? new Date(taskDetailsForm.taskDueDate) : new Date()}
                                    name="taskDueDate"
                                    onChange={(e) => onDateChange(e)}
                                    slotProps={{
                                        openPickerIcon: { fontSize: 'medium' },
                                        openPickerButton: { style: { color: '#ED8173' } },
                                        textField: {
                                            variant: 'outlined',
                                            focused: true,
                                            InputLabelProps: { style: { color: '#AFADA9' } }, // Change label color
                                            sx: {
                                                '& fieldset': {
                                                    borderColor: '#AFADA9 !important',
                                                    borderRadius: '12px',
                                                }
                                            }, // Change outline color
                                        },
                                    }}
                                />
                            </DemoContainer>
                        </LocalizationProvider>
                    </div>
                    <Input
                        id="taskDescription"
                        label="Task Description"
                        multiline={true}
                        rows={4}
                        name={"taskDescription"}
                        value={taskDetailsForm.taskDescription}
                        onChange={onChange}
                        error={clicked && !taskDetailsForm.taskDescription.trim()}
                    />
                </DialogContent>
                <DialogActions>
                    <div className={styles['btn-div']}>
                        <Button sx={{ color: '#ED8173', borderRadius: '25px' }} className={styles['cancel-btn']} onClick={() => closeDialog()}>Cancel</Button>
                        <RedirectButton onClick={() => setClicked(true)} type="submit" name={type === "edit" ? "Save Changes" : "Create"} width="180px" height="40px" />
                    </div>
                </DialogActions>
            </CustomDialog>
    );
}

export default CreateTaskDialog;