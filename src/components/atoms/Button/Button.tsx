import { FunctionComponent } from "react";
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import styles from './Button.module.scss';

interface RedirectButtonProps {
    name: string;
    width: string;
    height: string;
    onClick?: () => void;
    type: string;
}
const ColorButton = styled(Button)<{ width?: string, height?: string }>(({ width, height }) => ({
    color: '#ffffff',
    backgroundColor: '#000000',
    width: width,
    height: height,
    borderRadius: '25px',
    '&:hover': {
        backgroundColor: '#ED8173',
    },
}));

const RedirectButton: FunctionComponent<RedirectButtonProps> = ({ name, width, height, onClick, type, ...rest }) => {
    return (
        <ColorButton className={styles.btn} type={type === 'submit' ? 'submit' : 'button'} variant="contained" onClick={onClick} style={{ width, height }} {...rest}>{name}</ColorButton>
    );
}

export default RedirectButton;