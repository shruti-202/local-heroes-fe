import Container from "../../atoms/Container";
import HomeCarousel from "./default-home/HomeCarousel";
import HomeBeauty from "../../../assets/icons/beauty.svg";
import HomeCook from "../../../assets/icons/cooking.svg";
import HomeDigital from "../../../assets/icons/electronics.svg";
import HomeEducation from "../../../assets/icons/education.svg";
import HomeMisc from "../../../assets/icons/miscellaneous.svg";
import { Link } from "react-router-dom";

const categories = [
  {
    element: HomeCook,
    name: "Home Cook",
    path: "/cook",
  },
  {
    element: HomeBeauty,
    name: "Beauty and Grooming",
    path: "/beauty",
  },
  {
    element: HomeDigital,
    name: "Technology and Electronics",
    path: "/technology",
  },
  {
    element: HomeEducation,
    name: "Education",
    path: "/education",
  },
  {
    element: HomeMisc,
    name: "Others",
    path: "/other-services",
  },
];

const ClientHome = () => {
  return (
    <div>
      <HomeCarousel />
      <Container>
        <section>
          <h1
            style={{
              textAlign: "center",
              fontSize: "36px",
              fontWeight: 500,
              marginBottom: "24px",
            }}
          >
            OUR TOP NOTCH SERVICES
          </h1>
          <div
            style={{
              display: "flex",
              width: "100%",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: "16px",
            }}
          >
            {categories.map((category, idx) => (
              <CategoryCard
                key={idx}
                name={category.name}
                element={category.element}
                path={category.path}
              />
            ))}
          </div>
        </section>
      </Container>
    </div>
  );
};

const CategoryCard = ({ element, name, path }: any) => {
  return (
    <div
      style={{
        width: "45%",
        maxHeight: "300px",
        textAlign: "center",
        fontSize: "bold",
        fontWeight: 600,
        borderRadius: "12px",
        marginBottom: "48px",
        cursor: "pointer",
        boxShadow:
          "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px",
      }}
    >
      <Link to={"/category" + path}>
        <img
          src={element}
          alt="service"
          style={{ width: "100%", height: "100%" }}
        />
        <p style={{ marginTop: "10px" }}>{name}</p>
      </Link>
    </div>
  );
};

export default ClientHome;
