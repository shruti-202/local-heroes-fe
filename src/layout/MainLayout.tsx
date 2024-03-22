import { Outlet } from "react-router-dom";
import Header from "../components/organisms/Header";

const MainLayout = () => {
  return (
    <main>
      <Header />
      <Outlet />
    </main>
  );
};

export default MainLayout;
