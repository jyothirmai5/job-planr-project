import { TextField } from "@mui/material";
import { FunctionComponent } from "react";

interface InputProps {
    name: string;
    id: string;
    value: string;
    label: string;
    multiline?: boolean;
    rows?: number;
    onChange: (e: any) => void;
    error: boolean;
}

const Input: FunctionComponent<InputProps> = ({ name, id, value, label, rows, multiline, onChange, error }) => {
    return (
        <TextField
            autoFocus
            required
            error={error}
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
            InputProps={{
                style: {
                    borderRadius: '12px'
                }
            }}
            sx={{
                marginTop: '20px',
            }}
        />
    );
}

export default Input;