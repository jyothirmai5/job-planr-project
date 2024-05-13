import { FunctionComponent, useState } from "react";
import Layout from "../../templates/Layout/Layout";
import styles from './TaskListPage.module.scss';
import Button from "../../atoms/Button/Button";
import EachTaskCard from "../../molecules/EachTaskCard/EachTaskCard";
import CreateTaskDialog from "../../organisms/CreateTaskDialog/CreateTaskDialog";
import { useSelector } from "react-redux";
import { TaskListModel } from "../../../interfaces";

const TaskListPage: FunctionComponent = () => {
    const [open, setOpen] = useState(false);
    const [type, setType] = useState("create");
    const [editTaskDetails, setEditTaskDetails] = useState(undefined as any);

    const taskList = useSelector(
        (state: any) => state?.persistedSlice?.tasks
    )

    const handleClickOpen = (dialogType: string, task?: TaskListModel) => {
        setOpen(true);
        setType(dialogType);
        if (dialogType === 'edit') {
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
                    <Button type="button" name="+ Add Task" width="200px" height="40px" onClick={() => handleClickOpen('create')}></Button>
                </div>
                <div className={styles['task-list']}>
                    {taskList && taskList.map((task: TaskListModel, index: number) => (
                        <div key={index}>
                            <EachTaskCard task={task} handleClickOpen={(editTask: TaskListModel) => handleClickOpen('edit', editTask)} />
                        </div>
                    ))}
                </div>
                {open && <CreateTaskDialog handleClose={handleClose} open={open} type={type} taskDetails={editTaskDetails} />}
            </div>
        </Layout>
    );
}

export default TaskListPage;