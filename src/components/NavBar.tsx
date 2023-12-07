import { useContext } from "react";
import { SiteContext } from "../context/Context";

const NavBar = () => {
  const context = useContext(SiteContext);
  if (!context) {
    throw new Error("useContext must be used within a MyProvider");
  }

  return (
    <div className="flex w-[150px] justify-end p-5 absolute top-0 right-0">
      <div className="relative inline-block"></div>
    </div>
  );
};

export default NavBar;
