import { useParams } from "react-router-dom";
import Container from "../components/atoms/Container";
import { useEffect, useState } from "react";
import API_ENUM from "../enum/API_ENUM";
import apiCall from "../utils/apiUtils";
import ProviderCard from "../components/molecules/ProviderCard";

const paramToCategoryEnum = (param: string | undefined) => {
  switch (param) {
    case "home":
      return "HOME_SERVICES";
    case "beauty":
      return "BEAUTY_AND_GROOMING";
    case "technology":
      return "TECHNOLOGY_AND_ELECTRONICS";
    case "education":
      return "EDUCATIONAL_SERVICES";
    case "other-services":
      return "MISCELLANEOUS_SERVICES";
    default:
      return "MISCELLANEOUS_SERVICES";
  }
};

interface Availability {
  daysType: string;
  startDate: string | null;
  startTime: string;
  endDate: string | null;
  endTime: string;
 
}

export interface Service {
  _id: string,
  category: string;
  title: string;
  price: number;
  description: string;
}

interface Provider {
  availability: Availability;
  createdAt: string;
  email: string;
  name: string;
  password: string;
  phone: string;
  services: Service[];
  updatedAt: string;
  userType: string;
  username: string;
  __v: number;
  _id: string;
}

interface ProviderList extends Array<Provider> {}

const Category = () => {
  const { categoryName } = useParams();
  const [providerList, setProviderList] = useState<ProviderList>([]);
  
  const getProviders = async () => {
    const data = await apiCall(
      API_ENUM.PROVIDERS_BY_CATEGORY,
      undefined,
      `?category=${paramToCategoryEnum(categoryName)}`
    );
    setProviderList(data?.data?.providers);
  };

  useEffect(() => {
    getProviders();
  }, []);

  return (
    <Container maxWidth="sm">
      <div>
        {providerList.map((provider, idx) => (
          <ProviderCard
            key={idx}
            idx={idx}
            providerId={provider._id}
            name={provider.name}
            phone={provider.phone}
            services={provider.services}
            availability={provider.availability}
          />
        ))}
      </div>
    </Container>
  );
};

<ProviderCard/>

export default Category;
