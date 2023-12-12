import { useContext } from "react";
import DefaultHome from "../components/templates/home/DefaultHome";
import ProviderHome from "../components/templates/home/ProviderHome";
import { UserContext } from "../context/UserContext";

const Home = () => {
  const { userInfo } = useContext(UserContext);

  if (userInfo?.type === "PROVIDER") {
    return <ProviderHome />;
  } else {
    return <DefaultHome />;
  }
};

export default Home;
