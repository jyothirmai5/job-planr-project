import { FunctionComponent } from "react";
import Layout from "../../templates/Layout/Layout";
import Button from "../../atoms/Button/Button";
import styles from './NoTasksFound.module.scss';

interface NoTasksFoundProps {

}

const NoTasksFound: FunctionComponent<NoTasksFoundProps> = () => {
    const onClick = () => {

    }
    return (
        <Layout>
            <div className={styles['main-div']}>
                <div className={styles.title}>No Tasks Found</div>
                <div className={styles.subtitle}>Looks like you’re all caught up! Take a moment to celebrate your productivity or plan your next move.</div>
                <Button type="button" name="+ Add Task" width="200px" height="40px" onClick={onClick}></Button>
            </div>
        </Layout >
    );
}

export default NoTasksFound;