import { useState } from "react";
import ServiceCard from "./ServiceCard";
import dayjs from "dayjs";
import { Service } from "../../pages/Category";
import apiCall from "../../utils/apiUtils";
import API_ENUM from "../../enum/API_ENUM";
import { DatePicker, LocalizationProvider, TimePicker } from "@mui/x-date-pickers-pro";
import { AdapterDayjs } from "@mui/x-date-pickers-pro/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { Box, Button, FormControl, FormControlLabel, FormLabel, Modal, Radio, RadioGroup, TextField, Tooltip,Typography } from "@mui/material";

const colorPalette = ["#cdb4db", "#ffc8dd", "#a2d2ff", "#a8dadc", "#e7c6ff"];

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: 4,
  p: 4,
};

const ProviderCard = ({ idx, providerId, name, phone, services, availability }: any) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [showService, setShowService] = useState(false);
  const logoLetter = name[0].toUpperCase();
  const nameBgColor = colorPalette[idx % 5];

  const [bookingStep, setBookingStep] = useState(1);
  const [selectedService, setSelectedService] = useState<Service>();
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedStartTime, setSelectedStartTime] = useState("");
  const [selectedEndTime, setSelectedEndTime] = useState("");
  const [clientAddressDetails, setClientAddressDetails] = useState({
    addressLineOne: "",
    addressLineTwo: "",
    state: "",
    city: "",
    pinCode: "",
  });
  const [paymentMode, setPaymentMode] = useState("");

  console.log("selectedDate",selectedDate)

  const handleUserServiceSelection = (service : any) => {
    console.log("hurray");
    setSelectedService(service)
    handleOpen();
  };

  const handleBookService = async () => {
    const address = `${clientAddressDetails.addressLineOne}${clientAddressDetails.addressLineTwo ? `, ${clientAddressDetails.addressLineTwo}` : ''}, ${clientAddressDetails.state ? clientAddressDetails.state + ',' : ''}${clientAddressDetails.city ? clientAddressDetails.city + ',' : ''}${clientAddressDetails.pinCode ? clientAddressDetails.pinCode : ''}`;
    const data = await apiCall(API_ENUM.CLIENT_SERVICE_BOOKING, {
       providerId: providerId,
       providerServiceId: selectedService?._id,
       address: address,
      date: (selectedDate ? dayjs(selectedDate).date() + "/" + (dayjs(selectedDate).month() + 1) + "/" + dayjs(selectedDate).year() : ""),
       startTime: selectedStartTime,
       endTime: selectedEndTime,
       paymentMode: paymentMode
    })

    if(data?.success) {
      setSelectedService(undefined);
      setSelectedDate(null);
      setSelectedStartTime("");
      setSelectedEndTime("");

      setClientAddressDetails({
        addressLineOne: "",
        addressLineTwo: "",
        state: "",
        city: "",
        pinCode: "",
      });
  
      setPaymentMode("");
      setBookingStep(1)
       handleClose(); 
    }
  }
  
  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "16px",
          marginBottom: "16px",
          borderRadius: "12px",
          cursor: "pointer",
          boxShadow:
            "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px",
        }}
        onClick={() => setShowService(!showService)}
      >
        <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
          <div
            style={{
              fontSize: "28px",
              fontWeight: "bold",
              width: "38px",
              height: "38px",
              borderRadius: "50%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: nameBgColor,
            }}
          >
            {logoLetter}
          </div>
          <div>
            <p style={{ fontSize: "18px", fontWeight: "bold" }}>
              {name}
              {availability === undefined && (
                <Tooltip
                  title="Provider Availability is not present in the system.Please contact system administrator. "
                  arrow
                >
                  <span
                    style={{ fontSize: "16px", color: "var(--light-blue)" }}
                  >
                    {" "}
                    ⓘ{" "}
                  </span>
                </Tooltip>
              )}
            </p>
          </div>
        </div>
        <div style={{ fontSize: "18px", fontWeight: "bold" }}>{phone}☎️</div>
      </div>
      {showService &&
        services.map((service: any, idx: number) => (
          <ServiceCard
            key={idx}
            service={service}
            handleUserServiceSelection={handleUserServiceSelection}
          />
        ))}

      <Modal
        open={open}
        onClose={handleClose}
        
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          { availability === undefined ? (
            <div>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Provider availability is not present
              </Typography>
              <Typography id="modal-modal-description" sx={{ my: 2 }}>
                Please confirm by contacting provider on this number{" "}
                <a href={"tel:" + phone}>{phone}</a>
              </Typography>
              <Button
                sx={{
                  backgroundColor: "var(--primary-color)",
                  color: "var(--ternary-color)",
                  "&:hover": {
                    backgroundColor: "var(--secondary-color)",
                  },
                }}
                onClick={handleClose}
                variant="contained"
              >
                Close
              </Button>
            </div>
          ) : (
            <div>
              {" "}
              {bookingStep === 1 && (
                <>
                  <Typography
                    id="modal-modal-title"
                    variant="h5"
                    component="h2"
                    fontWeight={500}
                  >
                    Select the time slot
                  </Typography>
                  <div style={{ margin: "16px 0" }}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        disablePast
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e)}
                      />
                    </LocalizationProvider>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DemoContainer components={["TimePicker"]}>
                        <TimePicker
                          label="Start Time"
                          onChange={(newTime: Date | null) => {
                            if (newTime) {
                              const formattedTime =
                              dayjs(newTime).format("HH:mm");
                            setSelectedStartTime(formattedTime);
                            }
                          }}
                        />
                      </DemoContainer>
                    </LocalizationProvider>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DemoContainer components={["TimePicker"]}>
                        <TimePicker
                          label="End Time"
                          onChange={(newTime: Date | null) => {
                            if (newTime) {
                              const formattedTime =
                              dayjs(newTime).format("HH:mm");
                            setSelectedEndTime(formattedTime);
                            }
                          }}
                        />
                      </DemoContainer>
                    </LocalizationProvider>
                  </div>
                  <Button
                    sx={{
                      backgroundColor: "var(--primary-color)",
                      color: "var(--ternary-color)",
                      "&:hover": {
                        backgroundColor: "var(--secondary-color)",
                      },
                    }}
                    variant="contained"
                    disabled={
                      selectedStartTime === null ||
                      selectedEndTime === null ||
                      selectedDate === undefined
                    }
                    onClick={() => setBookingStep(bookingStep + 1)}
                  >
                    Continue
                  </Button>
                </>
              )}
              {bookingStep === 2 && (
                <>
                  <Typography
                    id="modal-modal-title"
                    variant="h5"
                    component="h2"
                    fontWeight={500}
                  >
                    Enter Your Address
                  </Typography>
                  <TextField
                    fullWidth
                    style={{ marginBottom: "10px" }}
                    type="text"
                    id="standard-basic"
                    label="Address Line One"
                    variant="standard"
                    value={clientAddressDetails.addressLineOne}
                    onChange={(e: any) =>
                      setClientAddressDetails({
                        ...clientAddressDetails,
                        addressLineOne: e.target.value,
                      })
                    }
                    required
                  />
                  <TextField
                    fullWidth
                    style={{ marginBottom: "10px" }}
                    type="text"
                    id="standard-basic"
                    label={
                      <>
                        Address Line Two{" "}
                        <span style={{ color: "var(--light-black)" }}>
                          (Optional)
                        </span>
                      </>
                    }
                    variant="standard"
                    value={clientAddressDetails.addressLineTwo}
                    onChange={(e: any) =>
                      setClientAddressDetails({
                        ...clientAddressDetails,
                        addressLineTwo: e.target.value,
                      })
                    }
                  />
                  <TextField
                    fullWidth
                    style={{ marginBottom: "10px" }}
                    type="text"
                    id="standard-basic"
                    label="State"
                    variant="standard"
                    value={clientAddressDetails.state}
                    onChange={(e: any) =>
                      setClientAddressDetails({
                        ...clientAddressDetails,
                        state: e.target.value,
                      })
                    }
                    required
                  />
                  <TextField
                    fullWidth
                    style={{ marginBottom: "10px" }}
                    type="text"
                    id="standard-basic"
                    label="City"
                    variant="standard"
                    value={clientAddressDetails.city}
                    onChange={(e: any) =>
                      setClientAddressDetails({
                        ...clientAddressDetails,
                        city: e.target.value,
                      })
                    }
                    required
                  />
                  <TextField
                    fullWidth
                    style={{ marginBottom: "10px" }}
                    type="number"
                    id="standard-basic"
                    label="Pincode"
                    variant="standard"
                    value={clientAddressDetails.pinCode}
                    onChange={(e: any) =>
                      setClientAddressDetails({
                        ...clientAddressDetails,
                        pinCode: e.target.value,
                      })
                    }
                    required
                  />
                  <Button
                    sx={{
                      backgroundColor: "var(--primary-color)",
                      color: "var(--ternary-color)",
                      "&:hover": {
                        backgroundColor: "var(--secondary-color)",
                      },
                    }}
                    variant="contained"
                    disabled={
                      clientAddressDetails.addressLineOne === "" ||
                      clientAddressDetails.state === "" ||
                      clientAddressDetails.city === "" ||
                      clientAddressDetails.pinCode === "" 
                    }
                    onClick={() => setBookingStep(bookingStep + 1)}
                  >
                    Continue
                  </Button>
                </>
              )}
              {bookingStep === 3 && (
                <>
                  <Typography
                    id="modal-modal-title"
                    variant="h5"
                    component="h2"
                    fontWeight={500}
                  >
                    Select Payment Mode
                  </Typography>
                  <FormControl fullWidth>
                    <FormLabel id="demo-controlled-radio-buttons-group">
                      Modes
                    </FormLabel>
                    <RadioGroup
                      aria-labelledby="demo-controlled-radio-buttons-group"
                      name="controlled-radio-buttons-group"
                      value={paymentMode}
                      onChange={(e:any) => setPaymentMode(e.target.value)}
                    >
                      <FormControlLabel
                        value="UPI"
                        control={<Radio />}
                        label="UPI"
                        disabled
                      />
                      <FormControlLabel
                        value="COD"
                        control={<Radio />}
                        label="Cash on Delivery"
                      />
                    </RadioGroup>
                  </FormControl>
                  <Button
                    sx={{
                      backgroundColor: "var(--primary-color)",
                      color: "var(--ternary-color)",
                      "&:hover": {
                        backgroundColor: "var(--secondary-color)",
                      },
                    }}
                    variant="contained"
                    disabled={
                      paymentMode === ""
                    }
                    onClick={() => setBookingStep(bookingStep + 1)}
                  >
                    Continue
                  </Button>
                </>
              )}
              {
                bookingStep === 4 && (
                  <>
                    <Typography
                    id="modal-modal-title"
                    variant="h5"
                    component="h2"
                    fontWeight={500}
                  >
                    Billing Details
                  </Typography>
                  <div className = "booking-details">
                  <div className = "booking-details-row">
                    <div className = "booking-details-row-key">Service Type</div>
                    <div className = "booking-details-row-values"> {selectedService?.title}</div>
                  </div>
                  <div className = "booking-details-row">
                    <div className = "booking-details-row-key">Date & Time</div>
                    <div className = "booking-details-row-values">{selectedDate? dayjs(selectedDate).format('DD-MM-YYYY') : ""}, {selectedStartTime + "-"+ selectedEndTime}</div>
                  </div>
                  <div className = "booking-details-row">
                    <div className = "booking-details-row-key">Address</div>
                    <div className = "booking-details-row-values">{clientAddressDetails.addressLineOne},{clientAddressDetails.addressLineTwo} {clientAddressDetails.state}, {clientAddressDetails.city},{clientAddressDetails.pinCode}</div>
                  </div>
                  <div className = "booking-details-row">
                    <div className = "booking-details-row-key">Payment Mode</div>
                    <div className = "booking-details-row-values">{paymentMode}</div>
                  </div>
                  </div>
                  
                  <Button
                    sx={{
                      backgroundColor: "var(--primary-color)",
                      color: "var(--ternary-color)",
                      "&:hover": {
                        backgroundColor: "var(--secondary-color)",
                      },
                    }}
                    variant ="contained"
                    disabled = {paymentMode === ""}
                    onClick={handleBookService}
                  >
                    BOOK
                  </Button>
                  </>
                )
              }
            </div>
          )}
        </Box>
      </Modal>
    </div>
  );
};

export default ProviderCard;
