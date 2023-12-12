import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider, TimePicker } from "@mui/x-date-pickers-pro";
import { AdapterDayjs } from "@mui/x-date-pickers-pro/AdapterDayjs";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
import { useState } from "react";
import dayjs from "dayjs";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";

const ProviderAvailability = () => {
  const today = dayjs();
  const [daysType, setDaysType] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  return (
    <div
      style={{ display: "flex", marginTop: "16px", flexDirection: "column" }}
    >
      <FormControl style={{ minWidth: "500px", margin: "auto" }}>
        <Typography
          style={{
            marginBottom: "3px",
            paddingBottom: "10px",
            fontFamily: "serif",
          }}
          variant="h5"
          align="center"
        >
          Select Availability
        </Typography>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          defaultValue="female"
          name="radio-buttons-group"
          row
          onChange={(e) => setDaysType(e.target.value)}
        >
          <FormControlLabel
            value="ALL_DAYS"
            control={<Radio />}
            label="All Days"
          />
          <FormControlLabel
            value="DATE_RANGE"
            control={<Radio />}
            label="Select Days"
          />
        </RadioGroup>
        {daysType === "DATE_RANGE" && (
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DateRangePicker"]}>
              <DateRangePicker
                localeText={{ start: "Start-Date", end: "End-Date" }}
                minDate={today}
                autoFocus
                onChange={(e) => {
                  setStartDate(dayjs(e[0]?.toDate()).toDate());
                  setEndDate(dayjs(e[1]?.toDate()).toDate());
                }}
              />
            </DemoContainer>
          </LocalizationProvider>
        )}

        <div style={{ display: "flex", gap: "16px", marginBottom: "16px" }}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["TimePicker"]}>
              <TimePicker
                label="Start Time"
                onChange={(newTime) => {
                  const formattedTime = dayjs(newTime).format("HH:mm");
                  setStartTime(formattedTime);
                }}
              />
            </DemoContainer>
          </LocalizationProvider>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["TimePicker"]}>
              <TimePicker
                label="End Time"
                disabled={startTime === "" ? true : false}
                onChange={(newTime) => {
                  const formattedTime = dayjs(newTime).format("HH:mm");
                  setEndTime(formattedTime);
                }}
              />
            </DemoContainer>
          </LocalizationProvider>
        </div>
        <Button sx={{backgroundColor: 'var(--primary-color)' , color: "var(--ternary-color)",'&:hover': {
              backgroundColor: "var(--secondary-color)"
            },}} variant="contained">Submit</Button>
      </FormControl>
    </div>
  );
};

export default ProviderAvailability;
