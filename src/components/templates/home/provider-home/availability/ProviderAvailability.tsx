import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider, TimePicker } from "@mui/x-date-pickers-pro";
import { AdapterDayjs } from "@mui/x-date-pickers-pro/AdapterDayjs";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
import { useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";
import apiCall from "../../../../../utils/apiUtils";
import API_ENUM from "../../../../../enum/API_ENUM";

const ProviderAvailability = () => {
  const today = dayjs();
  const [daysType, setDaysType] = useState("");
  const [startDate, setStartDate] = useState<Date | undefined>();
  const [endDate, setEndDate] = useState<Date | undefined>();
  const [startTime, setStartTime] = useState<Dayjs | null>(null);
  const [endTime, setEndTime] = useState<Dayjs | null>(null);

  const handleFormSubmit = async () => {
    const data = await apiCall(API_ENUM.PROVIDER_UPDATE_AVAILABILITY, {daysType, 
      startDate: startDate?.toDateString(), 
      endDate: endDate?.toDateString(), 
      startTime: dayjs(startTime).format('HH : mm'), 
      endTime: dayjs(endTime).format('HH : mm')})

    console.log(data);

    if(data?.success) {
      setDaysType(""); 
      setStartDate(undefined);
      setEndDate(undefined);
      setStartTime(null);
      setEndTime(null);
    }
  }

  return (
    <div
      style={{ display: "flex", marginTop: "16px", flexDirection: "column" }}
    >
      <FormControl style={{ maxWidth: "500px", margin: "auto",width:"100%" }}>
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
          value = {daysType}
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
                  setStartDate(e[0] === null ? undefined :dayjs(e[0]?.toDate()).toDate());
                  setEndDate(e[1] === null ? undefined : dayjs(e[1]?.toDate()).toDate());
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
                  setStartTime(newTime);
                }}
                value ={startTime}
              />
            </DemoContainer>
          </LocalizationProvider>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["TimePicker"]}>
              <TimePicker
                label="End Time"
                disabled={startTime === null ? true : false}
                onChange={(newTime) => {
                  setEndTime(newTime);
                }}
                value = {endTime}
              />
            </DemoContainer>
          </LocalizationProvider>
        </div>
        <Button sx={{backgroundColor: 'var(--primary-color)' , color: "var(--ternary-color)",'&:hover': {
              backgroundColor: "var(--secondary-color)"
            },}} variant="contained" onClick={handleFormSubmit}>Submit</Button>
      </FormControl>
    </div>
  );
};

export default ProviderAvailability;
