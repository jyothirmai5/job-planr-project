import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, styled, Button, IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";
import { FunctionComponent } from "react";
import Input from "../../atoms/Input/Input";
import { DatePicker, LocalizationProvider, PickersDay } from "@mui/x-date-pickers";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import styles from './CreateTaskDialog.module.scss';
import RedirectButton from "../../atoms/Button/Button";
import { useDispatch } from "react-redux";
import { addTask, editTask } from "../../../redux/slices/persistedSlice";
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
        } else {
            const taskId = uuidv4();
            let task = {
                ...taskDetailsForm,
                id: taskId
            }
            dispatch(addTask({ task }));
            resetTaskDetails();
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

    return (
        <CustomDialog
            open={open}
            PaperProps={{
                component: 'form',
                onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
                    event.preventDefault();
                    handleSubmit();
                    handleClose();
                },
            }}
        >
            <DialogTitle className={styles['dialog-title']}>
                <p>{type === 'create' ? "Create Task" : "Edit Task"}</p>
                <IconButton onClick={handleClose}><CloseIcon /></IconButton>
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    To subscribe to this website, please enter your email address here. We
                    will send updates occasionally.
                </DialogContentText>
                <Input
                    id="projectName"
                    name="projectName"
                    label="Project Name"
                    value={taskDetailsForm.projectName}
                    onChange={onChange}
                />
                <div className={styles['input-div-flex']}>
                    <div style={{ width: '50%' }}>
                        <Input
                            id="taskName"
                            name="taskName"
                            label="Task Name"
                            value={taskDetailsForm.taskName}
                            onChange={onChange}
                        />
                    </div>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DemoContainer components={['DatePicker']}
                            sx={{ paddingTop: '20px', width: "50%" }}>
                            <DatePicker
                                label="Styled picker"
                                slots={{
                                    day: StyledDay,
                                }}
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
                                        sx: { '& fieldset': { borderColor: '#AFADA9 !important' } }, // Change outline color
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
                />
            </DialogContent>
            <DialogActions>
                <div className={styles['btn-div']}>
                    <Button sx={{ color: '#ED8173', borderRadius: '25px' }} className={styles['cancel-btn']} onClick={() => closeDialog()}>Cancel</Button>
                    <RedirectButton type="submit" name={type === "edit" ? "Edit Task" : "Create Task"} width="180px" height="40px" />
                </div>
            </DialogActions>
        </CustomDialog>
    );
}

export default CreateTaskDialog;