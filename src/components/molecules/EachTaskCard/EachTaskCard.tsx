import { FunctionComponent } from "react";
import styles from './EachTaskCard.module.scss';
import { TaskListModel } from "../../../interfaces";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { IconButton, Menu, MenuItem } from "@mui/material";
import React from "react";

interface EachTaskCardProps {
    handleClickOpen: (type: string, task: TaskListModel) => void;
    task: TaskListModel;
}

const EachTaskCard: FunctionComponent<EachTaskCardProps> = ({ handleClickOpen, task }) => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleOpenDialog = (type: string, task: TaskListModel) => {
        handleClickOpen(type, task);
        handleClose();
    }
    
    // Truncating the description to fit in the task card
    const truncateString = (str: string, maxLength: number) => {
        if (str.length > maxLength) {
            return str.substring(0, maxLength) + '...';
        }
        return str;
    };

    return (
        <div className={styles['each-card-div']}>
            <div className={styles['icon-div']}>
                <p className={styles['task-name']}>{task.taskName}</p>
                <IconButton
                    aria-label="more"
                    id="long-button"
                    aria-controls={open ? 'long-menu' : undefined}
                    aria-expanded={open ? 'true' : undefined}
                    aria-haspopup="true"
                    onClick={handleClick}
                >
                    <MoreVertIcon />
                </IconButton>
                <Menu
                    id="long-menu"
                    MenuListProps={{
                        'aria-labelledby': 'long-button',
                    }}
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                >
                    <MenuItem key={"edit"} onClick={() => handleOpenDialog('edit', task)}> Edit </MenuItem>
                    <MenuItem key={"delete"} onClick={() => handleOpenDialog('delete', task)}>Delete</MenuItem>
                </Menu>
            </div>
            <p className={styles['task-description']}>{truncateString(task.taskDescription, 70)}</p>
            <p className={styles['due-date']}>{task.taskDueDate}</p>
        </div>
    );
}

export default EachTaskCard;