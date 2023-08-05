import { Datepicker } from "@ijavad805/react-datepicker";
import { render, screen } from "@testing-library/react";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";

const DatePickerr = (props) => {
  return (
    <>
      <Datepicker
        locale="en"
        theme="blue"
        onChange={(date) => props.handleDateInput(date.toLocaleString("fa-IR"))}
        value={props.chosenDate || moment()}
      />
    </>
  );
};

export default DatePickerr;
