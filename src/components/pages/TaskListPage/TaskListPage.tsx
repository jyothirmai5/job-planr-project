import { FunctionComponent, useState } from "react";
import Layout from "../../templates/Layout/Layout";
import styles from './TaskListPage.module.scss';
import Button from "../../atoms/Button/Button";
import EachTaskCard from "../../molecules/EachTaskCard/EachTaskCard";
import CreateTaskDialog from "../../organisms/CreateTaskDialog/CreateTaskDialog";
import { useSelector } from "react-redux";
import { TaskListModel } from "../../../interfaces";
import NoTasksFound from "../../molecules/NoTasksFound/NoTasksFound";

const TaskListPage: FunctionComponent = () => {
    const [open, setOpen] = useState(false);
    const [openDeleteAlert, setOpenDeleteAlert] = useState(false);
    const [type, setType] = useState("create");
    const [editTaskDetails, setEditTaskDetails] = useState(undefined as any);

    const taskList = useSelector(
        (state: any) => state?.persistedSlice?.tasks
    )

    const handleClickOpen = (dialogType: string, task?: TaskListModel) => {
        setType(dialogType);
        if (type === 'delete') {
            setOpenDeleteAlert(true);
        } else {
            setOpen(true);
        }
        if (dialogType !== 'create') {
            setEditTaskDetails(task);
        }
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Layout>
            <div className={styles['main-div']}>
                <div className={styles['heading-div']}>
                    <h3>Tasks</h3>
                    {taskList.length !== 0 && <Button type="button" name="+ Add Task" width="200px" height="40px" onClick={() => handleClickOpen('create')}></Button>}
                </div>
                {
                    taskList.length === 0 ?
                        <NoTasksFound />
                        :
                        <div className={styles['task-list']}>
                            {taskList && taskList.map((task: TaskListModel, index: number) => (
                                <div key={index}>
                                    <EachTaskCard task={task} handleClickOpen={(type: string, taskDetails: TaskListModel) => handleClickOpen(type, taskDetails)} />
                                </div>
                            ))}
                        </div>
                }
                {open && <CreateTaskDialog handleClose={handleClose} open={open} type={type} taskDetails={editTaskDetails} />}
                {openDeleteAlert && <CreateTaskDialog handleClose={() => setOpenDeleteAlert(false)} open={openDeleteAlert} type={type} taskDetails={editTaskDetails} />}
            </div>
        </Layout>
    );
}

export default TaskListPage;