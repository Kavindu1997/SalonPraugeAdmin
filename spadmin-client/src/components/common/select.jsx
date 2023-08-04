import { Select, MenuItem, Box, FormControl, InputLabel } from "@mui/material";

const SelectDropDown = ({ label, options, ...rest }) => {
  return (
    <Box>
      <FormControl fullWidth>
        <InputLabel>{label}</InputLabel>
        <Select
          {...rest}
          label={label}
          style={{ width: 400, height: 60, marginBottom: 10 }}
        >
          {options.map((option) => (
            <MenuItem key={option._id} value={option._id}>
              {option.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default SelectDropDown;
