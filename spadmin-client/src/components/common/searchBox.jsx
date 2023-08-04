import { TextField, Box } from "@mui/material";

const SearchBox = ({ value, onChange, placeholder, label }) => {
  return (
    <Box>
      <TextField
        variant="outlined"
        label={label}
        name="query"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.currentTarget.value)}
        autoComplete="off"
        margin="normal"
        sx={{ width: "300px" }}
      />
    </Box>
  );
};

export default SearchBox;
