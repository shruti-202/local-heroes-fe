import { Button, Card } from "@mui/material";
import { useState } from "react";
import "./ProviderRequest.css"
import profile from "../../../../../assets/profile.jpg";
import ProviderRequestCard from "../../../../molecules/ProviderRequestCard";

const tabs = ["ALL", "IN PROGRESS", "COMPLETED", "CANCELLED"];

const ProviderRequest = () => {
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);
  
  return (
    <div>
      <div
        className="provider-request-tabs"
        style={{ display: "flex", gap: "12px", marginTop: "12px", flexWrap: "wrap",paddingBottom: "12px" }}
      >
        {tabs.map((tab, index) => (
          <Button  sx={{backgroundColor: selectedTabIndex === index ? 'var(--primary-color)' : null, 
          color: selectedTabIndex === index ? "var(--ternary-color)" : "var(--dark-black)",
          '&:hover': {
            backgroundColor: "var(--secondary-color)",
            color: "var(--ternary-color)"
          },}}
            variant={selectedTabIndex === index ? "contained" : "outlined"}
            onClick={() => setSelectedTabIndex(index)}
          >
            {tab}
          </Button>
        ))}
      </div>
      
      <ProviderRequestCard 
           userImg={profile}
           name="Shruti Gawande"
           phone="9876543210"
           status="Active"
           serviceType="Learning"
           dateTime="Nov 25, 8:00 AM"
           address="Nagpur"
      />
    </div>
  );
};

export default ProviderRequest;
