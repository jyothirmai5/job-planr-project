import { FunctionComponent } from "react";
import Header from "../../organisms/Header/Header";
import Footer from "../../organisms/Footer/Footer";
import styles from './Layout.module.scss';

interface LayoutProps {
    children: React.ReactNode
}

const Layout: FunctionComponent<LayoutProps> = ({ children }) => {
    return (
        <div className={styles.layout}>
            <Header />
            <div className={styles['child-background']}>
                {children}
            </div>
            <Footer />
        </div>
    );
}

export default Layout;