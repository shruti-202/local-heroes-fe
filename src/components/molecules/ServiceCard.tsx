import { useContext, useState } from "react";
import { UserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";

const ServiceCard = ({ service, handleUserServiceSelection }: any) => {
  const [navigateToLogin, setNavigateToLogin] = useState<boolean>(false);
  const { userInfo, setUserInfo } = useContext(UserContext);
  const navigate = useNavigate();
  
  if (navigateToLogin) navigate("/login");

  const handleServiceCard = () => {
    if (userInfo?.userId === "") 
    {
        setNavigateToLogin(!navigateToLogin);
        return;
    }
    handleUserServiceSelection(service);
  };

  return (
    <div
      style={{ display: "flex", justifyContent: "center", marginBottom: "5px" }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "12px",
          width: "90%",
          marginBottom: "12px",
          boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
          cursor: "pointer",
        }}
        onClick={handleServiceCard}
      >
        <div>
          <p style={{ fontSize: "12x", fontWeight: 600 }}>{service.title}</p>
          <p style={{ fontSize: "14px", color: "var(--light-black)" }}>
            {service.description}
          </p>
        </div>
        <div>{service.price}₹</div>
      </div>
    </div>
  );
};

export default ServiceCard;
