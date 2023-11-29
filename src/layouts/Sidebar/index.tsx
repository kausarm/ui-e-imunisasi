import { useState } from "react";
import propTypes from "prop-types";
// import Navbar from "../Navbar";
import IMPP from "../../assets/images/im-pp.png";
import { Bars3Icon } from "@heroicons/react/24/solid";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { LayoutGrid } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Sheet, SheetContent } from "../../components/ui/sheet";
import ArrRightIcon from "../../components/icons-components/arrRightIcon";

interface SidebarProps {
  children: React.ReactNode;
  active?: string;
  navpage?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ children, active, navpage }) => {
  const stringUser: any = Cookies.get("user");
  const user = JSON.parse(stringUser);
  const navigation = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <main>
      <nav
        className={`fixed ${
          isOpen ? "" : "top-0 z-20"
        }  flex items-center top-0 justify-between w-full h-20 px-6 py-4 bg-white border-b-2 navbar border-soft-blue`}
      >
        <div className="flex items-center space-x-10 wrapper-toggle">
          <button onClick={toggleSidebar}>
            {!isOpen ? (
              <Bars3Icon className="w-8 h-8 text-black hover:text-secondary" />
            ) : (
              <XMarkIcon className="w-8 h-8 text-black hover:text-blue-pim" />
            )}
          </button>
          {/* breadcrum */}
          <div className="text-sm breadcrumbs">
            <ul className="flex space-x-2">
              <li className="flex items-center">
                <Link to="/dashboard">
                  <p
                    // href="/dashboard"
                    className="flex items-center text-grey-pim"
                  >
                    {/* <LayoutGrid className="w-8 h-8" /> */}
                    Dashboard
                  </p>
                </Link>
              </li>
              {navpage !== undefined ? (
                <li className="flex items-center">
                  <ArrRightIcon />
                  <p className="ml-2">{navpage}</p>
                </li>
              ) : null}
            </ul>
          </div>

          {/* breadcrum */}
        </div>

        <div className="flex items-center justify-end space-x-2 profile">
          <h1 className="capitalize userName">{user?.nama}</h1>
          <img
            src={IMPP}
            alt="profile picture"
            width={50}
            height={50}
            className="rounded-full shadow-sm"
          />
        </div>
      </nav>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        {/* <SheetTrigger>Open</SheetTrigger> */}
        <SheetContent side="left" className="bg-secondary">
          <div className="flex justify-between mb-8 side__wrapper">
            <div className="flex wrapper__title">
              <h1 className="text-2xl font-bold name text-blue-pim">E-</h1>
              <h1 className="text-2xl font-bold name">Imunisasi</h1>
            </div>
          </div>
          <div className="space-y-6 wrapper__list__menu">
            <Button
              variant={active === "DASHBOARD" ? "secondary" : "ghost"}
              className="justify-start w-full rounded-[16px]"
              onClick={() => navigation("/dashboard")}
            >
              <LayoutGrid className="w-4 h-4 mr-2" />
              Dashboard
            </Button>
            <Button
              variant={active === "imunisasi" ? "secondary" : "ghost"}
              onClick={() => navigation("/dashboard/imunisasi")}
              className="justify-start w-full rounded-[16px]"
            >
              <LayoutGrid className="w-4 h-4 mr-2" />
              Imunisasi
            </Button>
            {user?.role === 1 && (
              <Button
                variant={active === "pengguna" ? "secondary" : "ghost"}
                onClick={() => navigation("/dashboard/pengguna")}
                className="justify-start w-full rounded-[16px]"
              >
                <LayoutGrid className="w-4 h-4 mr-2" />
                Pengguna
              </Button>
            )}
          </div>
          <div className="mt-16 wrapper__logout">
            <Button
              variant="ghost"
              onClick={() => {
                Cookies.remove("tkn");
                navigation("/");
              }}
              className="justify-start w-full rounded-[16px] "
            >
              <LayoutGrid className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </SheetContent>
      </Sheet>
      {/* <div
        className={`sidebar  z-10 min-h-screen top-0 inset-y-0 p-6 absolute ${
          isOpen ? "open" : ""
        }`}
      ></div> */}
      <div
        className={
          isOpen
            ? "content__wrapper open overflow-x-hidden p-6 w-full"
            : "content__wrapper  p-6 overflow-x-hidden"
        }
      >
        <div className={`mt-24 `}>{children}</div>
      </div>
    </main>
  );
};

Sidebar.propTypes = {
  children: propTypes.node.isRequired, // Memastikan 'children' ada dan berupa node
  active: propTypes.string, //
  navpage: propTypes.string, //
};

export default Sidebar;
