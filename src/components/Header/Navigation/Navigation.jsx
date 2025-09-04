import { Button } from "@mui/material";
import "./Navigation.css";
import { RiMenu2Fill } from "react-icons/ri";
import { IoIosArrowDown } from "react-icons/io";
import { NavLink, useLocation } from "react-router-dom";
import { GoRocket } from "react-icons/go";
import CategoryPanel from "./CategoryPanel";
import { useContext, useMemo, useState } from "react";
import { MyContext } from "../../../App";

const Navigation = () => {
  const { catData } = useContext(MyContext);
  const [isOpenPanel, setIsOpenPanel] = useState(false);

  // কোন মেইন সাবমেনু খোলা আছে
  const [openMain, setOpenMain] = useState(null);
  // কোন inner সাবমেনু খোলা আছে
  const [openInner, setOpenInner] = useState(null);

  const openCategoryPanel = () => setIsOpenPanel(true);

  const buildListUrl = (q) => {
    const params = new URLSearchParams();
    if (q.cat) params.set("cat", q.cat);
    if (q.sub) params.set("sub", q.sub);
    if (q.third) params.set("third", q.third);
    return `/productListing?${params.toString()}`;
  };

  // URL query থেকে সিলেক্টেড আইডি পড়া (active highlight এর জন্য)
  const { pathname, search } = useLocation();
  const qs = useMemo(() => new URLSearchParams(search), [search]);
  const selCat = qs.get("cat");
  const selSub = qs.get("sub");
  const selThird = qs.get("third");
  const isCollectionsActive = pathname.startsWith("/productListing") && !(selCat || selSub || selThird);

  // Recursive submenu rendering
  const renderSubMenu = (children, parentKey, parentMenu) => {
    if (!children || children.length === 0) return null;

    return (
      <div
        className={`absolute top-full left-0 min-w-[200px] bg-white shadow-md transition-all duration-200 ${
          openMain === parentKey ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        <ul className="py-2">
          {children.map((sub, j) => {
            const isSubActive =
              String(sub._id) === String(selSub) ||
              sub.children?.some((inner) => String(inner._id) === String(selThird));

            return (
              <li
                key={sub._id}
                className="relative"
                onMouseEnter={() => setOpenInner(`${parentKey}-${j}`)}
                onMouseLeave={() => setOpenInner(null)}
              >
                <NavLink
                  to={buildListUrl({ cat: parentMenu._id, sub: sub._id })}
                  className={`block px-4 py-2 text-[14px] hover:text-linkHover hover:bg-gray-50 whitespace-nowrap truncate ${
                    isSubActive ? "text-violet-700 bg-violet-50 ring-1 ring-violet-200 rounded-md" : "text-black"
                  }`}
                  title={sub.name}
                >
                  {sub.name}
                </NavLink>

                {/* Inner submenu */}
                {sub.children && sub.children.length > 0 && (
                  <div
                    className={`absolute top-0 left-full min-w-[200px] bg-white shadow-md transition-all duration-200 ${
                      openInner === `${parentKey}-${j}` ? "opacity-100 visible" : "opacity-0 invisible"
                    }`}
                  >
                    <ul className="py-2">
                      {sub.children.map((inner) => {
                        const isInnerActive = String(inner._id) === String(selThird);
                        return (
                          <li key={inner._id}>
                            <NavLink
                              to={buildListUrl({ cat: parentMenu._id, sub: sub._id, third: inner._id })}
                              className={`block px-4 py-2 text-[14px] hover:text-linkHover hover:bg-gray-50 whitespace-nowrap truncate ${
                                isInnerActive ? "text-violet-700 bg-violet-50 ring-1 ring-violet-200 rounded-md" : "text-black"
                              }`}
                              title={inner.name}
                            >
                              {inner.name}
                            </NavLink>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    );
  };

  return (
    <>
      <nav className="relative py-0">
        <div className="container flex items-center justify-between gap-6 overflow-visible">
          {/* Left - Category Button */}
          <div className="col_1 w-[70%] md:w-[22%]">
            <div className="relative group">
              {/* Gradient frame */}
              <div className="rounded-xl p-[1.2px] bg-gradient-to-r from-sky-200/70 via-indigo-200/70 to-violet-200/70">
                <Button
                  onClick={openCategoryPanel}
                  aria-haspopup="true"
                  className="!w-full !h-10 md:!h-11 !rounded-[12px] !bg-white/80 !backdrop-blur !text-slate-800 !font-semibold !px-3 !py-0 flex items-center justify-between ring-1 ring-gray-200 shadow-sm hover:ring-sky-200 hover:!bg-white transition-all focus-visible:!ring-2 focus-visible:!ring-sky-300/60"
                >
                  {/* Left cluster */}
                  <span className="inline-flex items-center gap-2">
                    <span className="relative inline-flex h-7 w-7 items-center justify-center rounded-lg bg-sky-50 text-sky-700 ring-1 ring-sky-200">
                      <RiMenu2Fill className="text-[13px] md:text-[15px]" />
                      {/* Live pulse dot */}
                      <span className="absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full bg-emerald-500 ring-2 ring-white animate-pulse"></span>
                    </span>
                    <span className="text-[11px] md:text-[12px] tracking-wide">
                      Shop by Categories
                    </span>
                  </span>

                  {/* Right cluster */}
                  <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-white text-slate-600 ring-1 ring-gray-200 shadow-sm transition-all group-hover:bg-sky-50 group-hover:text-sky-700 group-hover:ring-sky-200 ml-1">
                    <IoIosArrowDown className="text-[12px] transition-transform duration-300 group-hover:rotate-180" />
                  </span>
                </Button>
              </div>

              {/* Shine sweep */}
              <span className="pointer-events-none absolute left-0 top-1/2 h-10 w-full -translate-y-1/2 -translate-x-full skew-x-[-20deg] bg-gradient-to-r from-transparent via-white/70 to-transparent opacity-0 transition-all duration-700 group-hover:translate-x-full group-hover:opacity-60"></span>
            </div>
          </div>

          {/* Middle - Navigation */}
          <div className="col_2 w-[70%] z-[1000] hidden md:block">
            <div className="rounded-full bg-white/60 backdrop-blur-md ring-1 ring-black/5 shadow-sm px-1 py-0 overflow-visible">
              <ul className="flex items-center gap-1 list-none m-0 p-0">
                {/* Home */}
                <li className="relative group">
                  <NavLink
                    to="/"
                    className={({ isActive }) =>
                      `relative inline-flex h-10 items-center rounded-full px-2 text-[13px] font-medium 
                      ${isActive ? "text-violet-700" : "text-gray-800"} 
                      hover:text-violet-700 transition whitespace-nowrap truncate max-w-[140px]`
                    }
                    title="Home"
                  >
                    Home
                    <span className="pointer-events-none absolute bottom-1 left-3 right-3 h-[2px] 
                      bg-gradient-to-r from-violet-500 to-fuchsia-500 
                      scale-x-0 group-hover:scale-x-100 transition-transform origin-left rounded-full" />
                  </NavLink>
                </li>

                {/* Collections (active when listing but no cat/sub/third) */}
                <li className="relative group">
                  <NavLink
                    to="/productListing"
                    className={`relative inline-flex h-10 items-center rounded-full px-2 text-[13px] font-medium 
                      ${isCollectionsActive ? "text-violet-700 bg-violet-50 ring-1 ring-violet-200" : "text-gray-800"} 
                      hover:text-violet-700 transition whitespace-nowrap truncate max-w-[140px]`}
                    title="Collections"
                  >
                    Collections
                    <span className="pointer-events-none absolute bottom-1 left-3 right-3 h-[2px] 
                      bg-gradient-to-r from-violet-500 to-fuchsia-500 
                      scale-x-0 group-hover:scale-x-100 transition-transform origin-left rounded-full" />
                  </NavLink>
                </li>

                {/* Dynamic Menus from API */}
                {catData.map((menu, i) => {
                  const isCatActive =
                    String(menu._id) === String(selCat) ||
                    menu.children?.some(
                      (sub) =>
                        String(sub._id) === String(selSub) ||
                        sub.children?.some((inner) => String(inner._id) === String(selThird))
                    );

                  return (
                    <li
                      key={menu._id}
                      className="relative group"
                      onMouseEnter={() => setOpenMain(i)}
                      onMouseLeave={() => {
                        setOpenMain(null);
                        setOpenInner(null);
                      }}
                    >
                      <NavLink
                        to={`/productListing?cat=${menu._id}`}
                        title={menu.name}
                        className={`relative inline-flex h-10 items-center rounded-full px-2 text-[13px] font-medium 
                          ${isCatActive ? "text-violet-700 bg-violet-50 ring-1 ring-violet-200" : "text-gray-800"} 
                          hover:text-violet-700 transition whitespace-nowrap truncate max-w-[140px]`}
                      >
                        <span className="truncate">{menu.name}</span>
                        <span className="pointer-events-none absolute bottom-1 left-3 right-3 h-[2px] 
                          bg-gradient-to-r from-violet-500 to-fuchsia-500 
                          scale-x-0 group-hover:scale-x-100 transition-transform origin-left rounded-full" />
                      </NavLink>

                      {/* Submenu */}
                      {menu.children && menu.children.length > 0 && renderSubMenu(menu.children, i, menu)}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>

          {/* Right - Free Delivery */}
          <div className="col_3 md:w-[10%] hidden md:flex justify-end">
            <div
              className="group relative inline-flex items-center gap-2 rounded-full px-3 py-1.5
               bg-white/70 backdrop-blur-md ring-1 ring-black/5 shadow-sm
               hover:ring-violet-200 hover:shadow-lg transition"
            >
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-y-0 left-0 w-1/3 -skew-x-12 bg-white/20 
                 translate-x-[-150%] group-hover:translate-x-[300%] opacity-0 
                 group-hover:opacity-100 transition-all duration-700 ease-out rounded-full"
              />
              <span className="flex h-6 w-6 items-center justify-center rounded-full 
                     bg-gradient-to-br from-violet-600 to-fuchsia-600 text-white shadow">
                <GoRocket className="text-[12px]" />
              </span>
              <p className="mb-0 text-[11px] md:text-[13px] font-semibold text-gray-800 whitespace-nowrap">
                Free Delivery
              </p>
            </div>
          </div>
        </div>
      </nav>

      {/* Category Panel */}
      <CategoryPanel isOpenPanel={isOpenPanel} setIsOpenPanel={setIsOpenPanel} />
    </>
  );
};

export default Navigation;