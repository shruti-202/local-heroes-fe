const ProviderRequestCard = ({
  userImg,
  name,
  phone,
  status,
  serviceType,
  dateTime,
  address,
}: any) => {
  const initials = name ? name.trim().split(" ")[0][0].toUpperCase() : "";

  return (
    <div className="provider-request-card">
      <div className="provider-request-card-head">
        <div className="provider-request-card-head-left">
          <div className="provider-request-card-head-left-img">
            {userImg ? (
              <img src={userImg} alt="Profile" />
            ) : (
              <div className="empty-profile-pic">{initials}</div>
            )}
          </div>
          <div className="provider-request-card-head-left-info">
            <p>{name}</p>
            <p>{phone}</p>
            <p>{status}</p>
          </div>
        </div>
        <div className="provider-request-card-head-right">
          <div>
            <p>🎖️ {serviceType}</p>
            <p>⏰ {dateTime}</p>
            <p>🏠 {address}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProviderRequestCard;
