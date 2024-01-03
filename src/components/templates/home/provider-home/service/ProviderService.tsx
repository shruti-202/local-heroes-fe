import { useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { Button, TextField, Typography } from "@mui/material";
import apiCall from "../../../../../utils/apiUtils";
import API_ENUM from "../../../../../enum/API_ENUM";

const ServiceCategories = {
  HOME_SERVICES: "Home Service",
  TECHNOLOGY_AND_ELECTRONICS: "Technology and Electronics",
  BEAUTY_AND_GROOMING: "Beauty and Grooming",
  EDUCATIONAL_SERVICES: "Educational Services",
  MISCELLANEOUS_SERVICES: "Miscellaneous Services",
};

const ProviderService = () => {
  const [serviceType, setServiceType] = useState("");
  const [serviceDetails, setServiceDetails] = useState({
    title: "",
    price: "",
    description: "",
  });

  const handleServiceTypeChange = (event: SelectChangeEvent) => {
    setServiceType(event.target.value as string);
  };

  const setServiceData = (e: any) => {
    const { name, value } = e.target;
    if (name === 'price' && parseFloat(value) > 5000) {
      return;
    }
    setServiceDetails({ ...serviceDetails, [name]: value });
  }

  const handleFormSubmit = async () => {
    const data = await apiCall(API_ENUM.PROVIDER_ADD_SERVICE, { serviceType, serviceDetails });
    if(data?.success){
      setServiceType("");
      setServiceDetails({
        title: "",
        price: "",
        description: "",
      });
    }
  }

  return (
    <div style={{ display: "flex", marginTop: "16px", flexDirection:"column"  }}>
      <Typography
        style={{
          marginBottom: "3px",
          paddingBottom: "10px",
          fontFamily:"serif",
        }}
        variant="h5"
        align="center"
      >
        Add Service
      </Typography>
      <FormControl style={{ maxWidth: "500px", margin: "auto",width:"100%" }}>
        <InputLabel id="demo-simple-select-label">Select Category</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={serviceType}
          label="Select Category"
          onChange={handleServiceTypeChange}
        >
          {Object.entries(ServiceCategories).map(([key, value]) => (
            <MenuItem key={key} value={key}>
              {value}
            </MenuItem>
          ))}
        </Select>
        <TextField
          style={{ marginBottom: "10px" }}
          type="text"
          name="title"
          id="standard-basic"
          label="Title"
          variant="standard"
          value={serviceDetails.title}
          onChange={(e) => setServiceData(e)}
        />
        <TextField
          style={{ marginBottom: "10px" }}
          type="number"
          name="price"
          id="standard-basic"
          label="Price"
          variant="standard"
          value={serviceDetails.price}
          onChange={(e) => setServiceData(e)}
        />
        <TextField
          style={{ marginBottom: "10px" }}
          type="text"
          name="description"
          id="standard-basic"
          label="Description"
          variant="standard"
          value={serviceDetails.description}
          onChange={(e) => setServiceData(e)}
        />
        <Button sx={{backgroundColor: 'var(--primary-color)' , color: "var(--ternary-color)",'&:hover': {
              backgroundColor: "var(--secondary-color)"
            },}}  variant="contained" onClick={handleFormSubmit}>Add Service</Button>
      </FormControl>
    </div>
  );
};

export default ProviderService;
