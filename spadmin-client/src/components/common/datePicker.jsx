import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers";

const MuxDatePicker = ({ Component, label, value, onChange, ...rest }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <DatePicker
        label={label}
        value={value}
        onChange={onChange}
        minDate={new Date()}
        {...rest}
      />
    </LocalizationProvider>
  );
};

export default MuxDatePicker;
