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

  const renderAddressDetails = () => {
    if (typeof address === "object") {
      const { _id, ...restAddress } = address;
      return Object.values(restAddress)
        .filter((detail) => !!detail)
        .join(", ");
    } else {
      return address;
    }
  };
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
            {name && <p>{name}</p>}
            {phone && <p>{phone}</p>}
            {status && <p>{status}</p>}
          </div>
        </div>
        <div className="provider-request-card-head-right">
          <div className="booking-details">
            <div className="booking-details-row">
              <p className="booking-details-row-key">📌</p>
              <p>{serviceType}</p>
            </div>
            <div className="booking-details-row">
              <p className="booking-details-row-key">⏰</p>
              <p>{dateTime}</p>
            </div>
            <div className="booking-details-row">
              <p className="booking-details-row-key">🏠</p>
              <p>{renderAddressDetails()}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProviderRequestCard;
