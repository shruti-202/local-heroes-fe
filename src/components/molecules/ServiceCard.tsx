import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContext";
import { useNavigate, useLocation } from "react-router-dom";

const ServiceCard = ({ service, handleUserServiceSelection }: any) => {
  const [navigateToLogin, setNavigateToLogin] = useState<boolean>(false);
  const { userInfo } = useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation();
  
  useEffect(() => {
    if (userInfo.userId !== "" && navigateToLogin) {
      navigate(location.state?.from || "/");
      setNavigateToLogin(false);
    }
  }, [userInfo, navigateToLogin, navigate, location.state]);

  const handleServiceCard = () => {
    if (userInfo?.userId === "") {
      navigate("/login", { state: { from: location.pathname } });
      setNavigateToLogin(true);
    } else {
      handleUserServiceSelection(service);
    }
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
          <p style={{ fontSize: "14px", fontWeight: 600 }}>{service.title}</p>
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
