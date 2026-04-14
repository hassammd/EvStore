import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import { useSelector } from "react-redux";

const Layout = () => {
  const { isDark } = useSelector((state) => state.theme);
  return (
    <>
      <div data-theme={isDark ? "dark" : "light"}>
        {/* <Navbar /> */}
        <Outlet />
      </div>
    </>
  );
};
export default Layout;
