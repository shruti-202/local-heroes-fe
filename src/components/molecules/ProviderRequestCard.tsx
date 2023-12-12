const ProviderRequestCard = ({
  userImg,
  name,
  phone,
  status,
  serviceType,
  dateTime,
  address,
}: any) => {
  
  return (
    <div className="provider-request-card">
      <div className="provider-request-card-head">
        <div className="provider-request-card-head-left">
          <div className="provider-request-card-head-left-img">
            <img src={userImg} alt="profile" />
          </div>
          <div className="provider-request-card-head-left-info">
            <p>{name}</p>
            <p>{phone}</p>
            <p>{status}</p>
          </div>
        </div>
        <div className="provider-request-card-head-right">
          <p>🎖️ {serviceType}</p>
          <p>⏰ {dateTime}</p>
          <p>🏠 {address}</p>
        </div>
      </div>
    </div>
  );
};

export default ProviderRequestCard;
