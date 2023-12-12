import { useState } from "react";
import myImage from "../../public/logo.png";
import { IoMdClose, IoMdLogOut } from "react-icons/io";
import { AiFillPieChart, AiFillSetting } from "react-icons/ai";
import { BiHistory, BiSolidAlarm } from "react-icons/bi";
import { Link } from "react-router-dom";
import { FaBell, FaChevronDown, FaChevronUp, FaUsers,FaLayerGroup } from "react-icons/fa";
import { GiFlyingFlag } from "react-icons/gi";
import { Logout } from "../utils/Logout";

interface IMenu {
  Path?: string;
  Icon: React.ReactNode;
  Name: string;
  Children?: Array<{
    Path: string;
    Icon: React.ReactNode;
    Name: string;
  }>;
}

const SideBar = ({ element }: { element: JSX.Element }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [submenuOpen, setSubmenuOpen] = useState<Record<string, boolean>>({});
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  const toggleSubmenu = (name: string) => {
    setSubmenuOpen((prevState) => ({
      ...prevState,
      [name]: !prevState[name],
    }));
  };

  const menu: IMenu[] = [
    {
      Path: "/dashboard",
      Icon: <AiFillPieChart />,
      Name: "DashBoard",
    },
    {
      Path: "/project",
      Icon: <AiFillPieChart />,
      Name: "Project",
    },
    {
      Name: "Setting",
      Icon: <AiFillSetting />,
      Children: [
        {
          Path: "/manage-group-country",
          Icon: <FaLayerGroup />,
          Name: "Group Country",
        },
        {
          Path: "/manage-country",
          Icon: <GiFlyingFlag />,
          Name: "Country",
        },
        {
          Path: "/manage-user",
          Icon: <FaUsers />,
          Name: "Manage User",
        },
      ],
    },
  ];

  return (
    <div>
      <button
        type="button"
        className="inline-flex items-center p-2 mt-2 ml-3 text-sm  rounded-lg sm:hidden focus:outline-none focus:ring-2  text-gray-400 hover:bg-gray-700 focus:ring-gray-600"
        onClick={toggleSidebar} // Toggle the sidebar when the button is clicked
      >
        <svg
          className="w-6 h-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="../../public/MEA_logo.png"
        >
          <path
            clipRule="evenodd"
            fillRule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          ></path>
        </svg>
      </button>

      <aside
        className={`fixed h-full top-0 left-0 z-40 w-64 h-screen transition-transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-gray-800 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <div className="flex items-center pl-2.5 mb-5">
                <img src={myImage} className="h-10 mr-3 sm:h-12" />
                <p className="self-center text-xl font-semibold whitespace-nowrap text-white">
                  Watchdog
                </p>
              </div>
              <p className="sm:hidden mb-5">
                <IoMdClose
                  onClick={() => setIsOpen(false)}
                  className="w-5 h-5 text-white"
                />
              </p>
            </div>

            <ul className="space-y-2 font-medium">
              {menu.map((e) => {
                return (
                  <li key={e.Name}>
                    <Link
                      to={e.Path ?? "#"}
                      className={`flex items-center p-2 text-gray-900 rounded-lg text-white  hover:bg-gray-700 group ${
                        e.Children ? "cursor-pointer" : ""
                      }`}
                      onClick={() => e.Children && toggleSubmenu(e.Name)}
                    >
                      <div
                        className={`text-2xl flex items-center p-2 text-gray-900 rounded-lg text-white  hover:bg-gray-700 group ${
                          e.Children ? "cursor-pointer" : ""
                        }`}
                      >
                        {e.Icon}
                      </div>
                      <span className="ml-3">{e.Name}</span>
                      {e.Children && (
                        <div className="ml-auto">
                          {submenuOpen[e.Name] ? (
                            <FaChevronUp />
                          ) : (
                            <FaChevronDown />
                          )}
                        </div>
                      )}
                    </Link>

                    {/* Submenu */}
                    {e.Children && submenuOpen[e.Name] && (
                      <ul className="ml-6 space-y-2">
                        {e.Children.map((child) => (
                          <li key={child.Name}>
                            <Link
                              to={child.Path}
                              className="flex items-center p-2 text-gray-900 rounded-lg text-white hover:bg-gray-700 group"
                            >
                              <div className="text-2xl flex items-center p-2 text-gray-900 rounded-lg text-white hover:bg-gray-700 group">
                                {child.Icon}
                              </div>
                              <span className="ml-3">{child.Name}</span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
          <div
            className=" w-full flex items-center mb-20 md:mb-0 cursor-pointer text-white"
            onClick={Logout}
          >
            <div className="text-2xl flex items-center p-2 text-gray-900 rounded-lg text-white hover:bg-gray-700 group">
              <IoMdLogOut />
            </div>
            <p className="font-semibold">Logout</p>
          </div>
        </div>
      </aside>

      <div className={`ml-${isOpen ? "64" : "16"} mt-8   p-4 sm:ml-64`}>
        {element}
      </div>
    </div>
  );
};

export default SideBar;
