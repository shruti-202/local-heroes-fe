import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import "./ProviderRequest.css";
import ProviderRequestCard from "../../../../molecules/ProviderRequestCard";
import apiCall from "../../../../../utils/apiUtils";
import API_ENUM from "../../../../../enum/API_ENUM";

const tabs = ["ALL", "IN_PROGRESS", "COMPLETED", "CANCELLED"];

const ProviderRequest = () => {
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);

  return (
    <div>
      <div
        className="provider-request-tabs"
        style={{
          display: "flex",
          gap: "12px",
          marginTop: "12px",
          flexWrap: "wrap",
          paddingBottom: "12px",
        }}
      >
        {tabs.map((tab, index) => (
          <Button
            key={index}
            sx={{
              backgroundColor:
                selectedTabIndex === index ? "var(--primary-color)" : null,
              color:
                selectedTabIndex === index
                  ? "var(--ternary-color)"
                  : "var(--dark-black)",
              "&:hover": {
                backgroundColor: "var(--secondary-color)",
                color: "var(--ternary-color)",
              },
            }}
            onClick={() => setSelectedTabIndex(index)}
            variant={selectedTabIndex === index ? "contained" : "outlined"}
           
          >
            {tab}
          </Button>
        ))}
      </div>
      <RequestList selectedTabIndex={selectedTabIndex} />
    </div>
  );
};

const RequestList = ({ selectedTabIndex }: any) => {
  const [requestList, setRequestList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
 
  useEffect(() => {
    let requestStatus: string | undefined = tabs[selectedTabIndex];
    let queryString = "";

    if (requestStatus === "ALL") {
      requestStatus = undefined;
    }

    if (requestStatus) {
      queryString = `?status=${requestStatus}`;
    }

    apiCall(API_ENUM.PROVIDER_GET_REQUEST, undefined, queryString).then(
      (response) => {
        setRequestList(response?.data);
        setLoading(false);
      }
    )
    .catch(error => {
      setLoading(false); 
    });
  }, [selectedTabIndex]);

  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(':');
    const formattedHours = parseInt(hours) % 12;
    const period = parseInt(hours) >= 12 ? 'PM' : 'AM';
    return `${formattedHours}:${minutes} ${period}`;
  };


  return (
    <div>
      {loading ? (
        <h1>Loading....</h1>
      ) : requestList.length === 0 ? (
        <h1>No Request Found</h1>
      ) : (
        <>
          <h1>Request List</h1>
          {requestList.map((request: any, index: number) => (
            <ProviderRequestCard
              key={index}
              name={request.clientId.name}
              phone={request.clientId.phone}
              status={request.status}
              serviceType={request.serviceName}
              dateTime={`${request.date}, ${formatTime(request.startTime)} - ${formatTime(request.endTime)}`}
              address={request.clientAddress}
            />
          ))}
        </>
      )}
    </div>
  );
};

export default ProviderRequest;
