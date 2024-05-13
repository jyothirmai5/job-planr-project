import { FunctionComponent, useState } from "react";
import Button from "../../atoms/Button/Button";
import styles from './NoTasksFound.module.scss';
import CreateTaskDialog from "../../organisms/CreateTaskDialog/CreateTaskDialog";

interface NoTasksFoundProps {

}

const NoTasksFound: FunctionComponent<NoTasksFoundProps> = () => {
    const [open, setOpen] = useState(false);

    return (
        <div className={styles['main-div']}>
            <div className={styles.title}>No Tasks Found</div>
            <div className={styles.subtitle}>Looks like you’re all caught up! Take a moment to celebrate your productivity or plan your next move.</div>
            <Button type="button" name="+ Add Task" width="200px" height="40px" onClick={() => setOpen(true)}></Button>
            {open && <CreateTaskDialog handleClose={() => setOpen(false)} open={open} type={"create"} />}
        </div>
    );
}

export default NoTasksFound;