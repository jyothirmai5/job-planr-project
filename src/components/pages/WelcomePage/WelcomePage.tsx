import { FunctionComponent } from "react";
import Layout from "../../templates/Layout/Layout";
import styles from './WelcomePage.module.scss';
import Button from "../../atoms/Button/Button";
import { useNavigate } from "react-router-dom";

interface WelcomePageProps {

}

const WelcomePage: FunctionComponent<WelcomePageProps> = () => {
    const navigate = useNavigate();

    const onClick = () => {
        navigate('/tasks');
    }
    return (
        <Layout>
            <div className={styles['main-div']}>
                <div className={styles.title}>Achieve More, Together</div>
                <div className={styles.subtitle}>Unlock synergy with <span className={styles['logo-color']}>JobPlanr</span>. Seamlessly align tasks with goals, maximizing efficiency and impact. Foster collaboration and transparency for unparalleled productivity.</div>
                <Button type="button" width="300px" height="60px" name="Let's go!!" onClick={onClick}></Button>
            </div>
        </Layout >
    );
}

export default WelcomePage;