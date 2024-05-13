import { TextField, styled } from "@mui/material";
import { FunctionComponent } from "react";

interface InputProps {
    name: string;
    id: string;
    value: string;
    label: string;
    multiline?: boolean;
    rows?: number;
    onChange: (e: any) => void;
}

// Define your custom styles for the TextField component
const CustomTextField = styled(TextField)({
    '& .MuiInputLabel-root': { color: '#AFADA9 !important' },
    '& .MuiOutlinedInput-root': {
        '& fieldset': { borderColor: '#AFADA9' },
        '&:hover fieldset': { borderColor: '#AFADA9' },
        '&.Mui-focused fieldset': { borderColor: '#AFADA9' },
        '&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#AFADA9',
        },
    },
});

const Input: FunctionComponent<InputProps> = ({ name, id, value, label, rows, multiline, onChange }) => {
    return (
        <CustomTextField
            autoFocus
            required
            margin="dense"
            id={id}
            name={name}
            label={label}
            type="string"
            value={value}
            onChange={onChange}
            multiline={multiline}
            rows={rows}
            fullWidth
            focused
            variant="outlined"
            sx={{
                marginTop: '20px',
            }}
        />
    );
}

export default Input;