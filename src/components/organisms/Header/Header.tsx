import { FunctionComponent } from "react";
import styles from './Header.module.scss';

interface HeaderProps {

}

const Header: FunctionComponent<HeaderProps> = () => {
    return (
        <div className={styles['logo-text']}>JobPlanr</div>
    );
}

export default Header;