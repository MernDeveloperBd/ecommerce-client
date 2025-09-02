import { Button } from "@mui/material";
import "./Navigation.css";
import { RiMenu2Fill } from "react-icons/ri";
import { IoIosArrowDown } from "react-icons/io";
import { Link, NavLink } from "react-router-dom";
import { GoRocket } from "react-icons/go";
import CategoryPanel from "./CategoryPanel";
import { useEffect, useState } from "react";
import { menuData } from "../../FilterCategory/filterCategory";
import { fetchDataFromApi } from "../../../utils/api";



const Navigation = () => {
  const [isOpenPanel, setIsOpenPanel] = useState(false);
  const [openMain, setOpenMain] = useState(null); // কোন মেইন সাবমেনু খোলা
  const [openInner, setOpenInner] = useState(null); // কোন ইনার সাবমেনু খোলা
const[catData, setCatData] = useState([])
  const openCategoryPanel = () => setIsOpenPanel(true);

  useEffect(() =>{
    fetchDataFromApi(`/api/category`).then((res) =>{
      console.log(res);
      if(res?.error === false){
        setCatData(res?.data)
      }      
    })
  },[])

  return (
    <>
      <nav className="relative">
        <div className="container flex items-center justify-between gap-6 overflow-visible">
          {/* Left - Category Button */}
          <div className="col_1 w-[70%] md:w-[20%]">
            <Button
              onClick={openCategoryPanel}
              className="!text-black gap-2 !font-bold w-full flex justify-between"
            >
              <RiMenu2Fill className="text-[11px] md:text-[18px]" />
              Shop By Categories
              <IoIosArrowDown className="text-[13px]" />
            </Button>
          </div>

          {/* Middle - Navigation */}
          <div className="col_2 w-[70%] z-[1000] hidden md:block">
            <ul className="flex items-center gap-3 list-none m-0 p-0">
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    `transition text-[14px] font-[500] ${
                      isActive ? "text-linkHover" : "text-black"
                    }`
                  }
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/productListing"
                  className={({ isActive }) =>
                    `transition text-[14px] font-[500] ${
                      isActive ? "text-linkHover" : "text-black"
                    }`
                  }
                >
                  Collections
                </NavLink>
              </li>

              {/* Dynamic Menus */}
              {menuData.map((menu, i) => (
                <li
                  key={i}
                  className="relative"
                  onMouseEnter={() => setOpenMain(i)}
                  onMouseLeave={() => {
                    setOpenMain(null);
                    setOpenInner(null);
                  }}
                >
                  <NavLink
                    to={menu.link}
                    className="transition text-[14px] font-[500] hover:text-linkHover"
                  >
                    {menu.title}
                  </NavLink>

                  {/* Submenu */}
                  {menu.sub && (
                    <div
                      className={`absolute top-[120%] left-0 min-w-[180px] bg-white shadow-md transition-all duration-150 ${
                        openMain === i ? "opacity-100 visible" : "opacity-0 invisible"
                      }`}
                    >
                      <ul className="py-2">
                        {menu.sub.map((sub, j) => (
                          <li
                            key={j}
                            className="relative"
                            onMouseEnter={() => setOpenInner(`${i}-${j}`)}
                            onMouseLeave={() => setOpenInner(null)}
                          >
                            <Button
                              component={Link}
                              to={sub.link}
                              className="!text-black w-full !justify-start !rounded-none !normal-case"
                              fullWidth
                            >
                              {sub.title}
                            </Button>

                            {/* Inner submenu */}
                            {sub.sub && (
                              <div
                                className={`absolute top-0 left-full min-w-[180px] bg-white shadow-md transition-all duration-150 ${
                                  openInner === `${i}-${j}`
                                    ? "opacity-100 visible"
                                    : "opacity-0 invisible"
                                }`}
                              >
                                <ul className="py-2">
                                  {sub.sub.map((inner, k) => (
                                    <li key={k}>
                                      <Button
                                        component={Link}
                                        to={inner.link}
                                        className="!text-black w-full !justify-start !rounded-none !normal-case"
                                        fullWidth
                                      >
                                        {inner.title}
                                      </Button>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Right - Free Delivery */}
          <div className="col_3 md:w-[10%] text-right hidden md:block">
            <p className="text-[10px] md:text-[14px] font-[500] flex items-center gap-2 mb-0">
              <GoRocket className="text-[14px] md:text-[18px]" />
              Free Delivery
            </p>
          </div>
        </div>
      </nav>

      {/* Category Panel */}
      <CategoryPanel isOpenPanel={isOpenPanel} setIsOpenPanel={setIsOpenPanel} />
    </>
  );
};

export default Navigation;
