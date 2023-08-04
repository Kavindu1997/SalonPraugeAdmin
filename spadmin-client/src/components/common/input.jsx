import { TextField, Box } from "@mui/material";

const Input = ({ type, name, label, value, onChange, error, ...rest }) => {
  return (
    <Box>
      <TextField
        variant="outlined"
        label={label}
        name={name}
        value={value}
        onChange={onChange}
        autoComplete="off"
        margin="normal"
        fullWidth
        type={type}
        {...(error && { error: true, helperText: error })}
        {...rest}
      />
    </Box>
  );
};

export default Input;
