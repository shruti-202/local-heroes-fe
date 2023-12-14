import { useParams } from "react-router-dom";
import Container from "../components/atoms/Container";

const colorPalette = ["#cdb4db", "#ffc8dd", "#a2d2ff", "#a8dadc", "#e7c6ff"];

const providerList = [
  {
    name: "Shruti Gawande",
    service: "Cook",
    price: 800,
  },
  {
    name: "Samiksh Sharma",
    service: "Education",
    price: 900,
  },
  {
    name: "Diksha Jain",
    service: "Beauty",
    price: 700,
  },
  {
    name: "Nidhi Talwar",
    service: "Technology",
    price: 600,
  },
  {
    name: "Sneha Yadav",
    service: "Others",
    price: 1000,
  },
];
const Category = () => {
  const { categoryName } = useParams();
  return (
    <Container maxWidth="sm">
      <div>
        {providerList.map((provider, idx) => (
          <ProviderCard
            key={idx}
            idx={idx}
            name={provider.name}
            service={provider.service}
            price={provider.price}
          />
        ))}
      </div>
    </Container>
  );
};

const ProviderCard = ({ idx, name, service, price }: any) => {
  const logoLetter = name[0].toUpperCase();
  const nameBgColor = colorPalette[idx % 5];

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "16px",
        marginBottom: "16px",
        borderRadius: "12px",
        boxShadow:
          "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px",
      }}
    >
      <div style={{ display: "flex", gap: "16px" }}>
        <div
          style={{
            fontSize: "38px",
            fontWeight: "bold",
            width: "48px",
            height: "48px",
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
          <p style={{ fontSize: "22px", fontWeight: "bold" }}>{name}</p>
          <p>{service}</p>
        </div>
      </div>
      <div style={{ fontSize: "20px", fontWeight: "bold" }}>{price}₹</div>
    </div>
  );
};

export default Category;
