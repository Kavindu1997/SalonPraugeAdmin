import { TimePicker } from "antd";
import moment from "moment";

const AntTimePicker = ({ selectedTime, selectedDate, error, ...rest }) => {
  const format = "hh:mm A";
  const today = moment(new Date()).format("YYYY-MM-DD");

  function getDisabledHours() {
    var hours = [0, 1, 2, 3, 4, 5, 6, 7, 18, 19, 20, 21, 22, 23];
    if (selectedDate === today) {
      const currentHour = moment().hour();
      for (let i = 8; i < currentHour && i < 18; i++) {
        hours.push(i);
      }
    }

    return hours;
  }

  function getDisabledMinutes(selectedHour) {
    const minutes = [];

    if (selectedDate === today) {
      const currentMinute = moment().minute();
      if (
        selectedHour === moment().hour() &&
        currentMinute > 0 &&
        currentMinute <= 30
      ) {
        minutes.push(0);
      } else if (selectedHour === moment().hour() && currentMinute > 30) {
        minutes.push(0);
        minutes.push(30);
      }
    }

    if (moment().hour() > 17) {
      minutes.push(0);
      minutes.push(30);
    }

    return minutes;
  }
  return (
    <div>
      <TimePicker
        allowClear
        showNow={false}
        disabledHours={getDisabledHours}
        disabledMinutes={getDisabledMinutes}
        format={format}
        minuteStep={60}
        value={selectedTime ? moment(selectedTime, format) : ""}
        placeholder="Time"
        status={error && "error"}
        disabled={selectedDate ? false : true}
        {...rest}
      />
      {error && <div className="errorhelper">{error}</div>}
    </div>
  );
};

export default AntTimePicker;
