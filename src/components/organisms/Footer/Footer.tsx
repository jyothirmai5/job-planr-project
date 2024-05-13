import { FunctionComponent } from "react";
import styles from './Footer.module.scss';

interface FooterProps {

}

const Footer: FunctionComponent<FooterProps> = () => {
    return (
        <div className={styles.footer}>
            Copyright ©2024 All Rights Reserved
        </div>
    );
}

export default Footer;