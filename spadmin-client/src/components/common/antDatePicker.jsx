import { DatePicker } from "antd";
import moment from "moment";

const AntDatePicker = ({ selectedDate, error, ...rest }) => {
  return (
    <div>
      <DatePicker
        allowClear
        showToday={false}
        disabledDate={(current) =>
          current.isBefore(moment().subtract(1, "day"))
        }
        placeholder="Date"
        status={error && "error"}
        value={selectedDate ? moment(selectedDate) : ""}
        {...rest}
      />
      {error && <div className="errorhelper">{error}</div>}
    </div>
  );
};

export default AntDatePicker;
