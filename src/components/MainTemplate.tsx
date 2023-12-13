import { Navigate, Outlet } from "react-router-dom";
import SideBar from "./SideBar";
import NavBar from "./NavBar";
import { ContextProvider } from "../provider/ContextProvider";
import { useSelector } from "react-redux";
import { initialState } from "../redux/redux.store";

const MainTemplate = () => {
  const user = useSelector<initialState>((state: initialState) => state.user);
  if (!user) {
    return <Navigate to="/" replace />;
  }

  return (
    <ContextProvider>
      <div>
        <NavBar />
        <SideBar element={<Outlet />} />
      </div>
    </ContextProvider>
  );
};

export default MainTemplate;
