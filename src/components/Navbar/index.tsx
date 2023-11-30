import im_logo from "../../assets/icons/logo.png";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <nav
        id="navigation"
        className="z-30 flex items-center justify-between py-6 bg-white md:w-[1140px] mx-auto px-7 lg:px-0 top-0"
        x-data="{ scroll:null }"
      >
        <div className="justify-between hidden w-full wrapper md:flex">
          <div className="logo__wrapper">
            <Link to={"/"}>
              <img
                src={im_logo}
                width={40}
                height={40}
                className="w-[40px] h-[40px] rounded-lg"
                alt="logo-imunisasi"
              />
            </Link>
          </div>
          <div className="flex items-center justify-center space-x-8 nav__link">
            <div className="text-base font-semibold text-blc">
              <Link to="/">Beranda</Link>
            </div>
            {/* <div className="text-base font-semibold text-blc">
              <Link href="/">Service</Link>
            </div> */}
            <div className="text-base font-semibold text-blc">
              <Link to="/about-us">Tentang</Link>
            </div>
          </div>
          <div className="nav__button">
            <Button
              onClick={() => {
                navigate("/auth/login");
              }}
            >
              Login
            </Button>
          </div>
        </div>

        {/*  */}
        <div className="relative z-10 text-primary">
          <nav
            className={`fixed h-screen w-full top-0 left-0 bg-secondary text-blc transition-all duration-300 ease-in-out transform ${
              isOpen ? "transform-translate-x-0" : "-translate-x-full"
            }`}
          >
            <div className="w-full px-4 mt-24 space-y-5 __navWrap">
              <div className="text-base font-semibold text-white transition-all duration-400 hover:text-blueTagline">
                <Link to="/about-us" onClick={() => setIsOpen(false)}>
                  Tentang
                </Link>
              </div>
              <div className="text-base font-semibold text-white transition-all duration-400 hover:text-blueTagline">
                <Link to="/auth/login" onClick={() => setIsOpen(false)}>
                  Login
                </Link>
              </div>
            </div>
          </nav>
        </div>
        {/*  */}

        <div className="flex justify-between w-full __smNav md:hidden ">
          <div className="logo__wrapper">
            <Link to={"/"}>
              <img
                src={im_logo}
                width={40}
                height={40}
                className="w-[40px] h-[40px] rounded-lg"
                alt="logo-imunisasi"
              />
            </Link>
          </div>
          <button
            className={
              isOpen
                ? "z-40 p-2 border-2 drop-shadow-menu-inactive rounded-xl border-blc bg-white __btnMenu hover:bg-blue hover:drop-shadow-white transition-all duration-300"
                : "z-40 p-2 border-2 drop-shadow-menu rounded-xl border-blc bg-white __btnMenu hover:bg-blue transition-all duration-300"
            }
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? (
              <XMarkIcon className="w-5 h-5 text-blc" />
            ) : (
              <Bars3Icon className="w-5 h-5 text-blc" />
            )}
          </button>
        </div>
      </nav>
    </>
  );
}
