import Button from "@mui/material/Button";
import RangeSlider from 'react-range-slider-input';
import 'react-range-slider-input/dist/style.css';
import { useContext, useEffect, useRef, useState } from "react";
import Rating from "@mui/material/Rating";
import { Collapse } from 'react-collapse';
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { fetchDataFromApi } from "../../utils/api";
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { MyContext } from "../../App";
import { FaRegSquareMinus, FaRegSquarePlus } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Sidebar = ({
  filters,
  onUpdateFilters,
  price,
  setPrice,
  counts = { cat: {}, sub: {}, third: {} },
}) => {

  const [isOpenSizeFIleter, setIsOpenSizeFIlter] = useState(true);
  const [isOpenColorFilter, setIsOpenColorFilter] = useState(true);
  const [inOpenRatingfilter, setIsOpenRatingFilter] = useState(true);
  const [colors, setColors] = useState([]);
  const [sizes, setSizes] = useState([]);

  const { catData } = useContext(MyContext);
  const [openMenu, setOpenMenu] = useState(null);
  const [openSubMenu, setOpenSubMenu] = useState(null);

  const toggleMenu = (index) => {
    setOpenMenu(openMenu === index ? null : index);
    setOpenSubMenu(null);
  };
  const toggleSubMenu = (index) => {
    setOpenSubMenu(openSubMenu === index ? null : index);
  };

  useEffect(() => {
    fetchDataFromApi(`/api/product/productColor/get`).then((res) => {
      if (res?.error === false) setColors(res?.data || []);
    });
  }, []);
  useEffect(() => {
    fetchDataFromApi(`/api/product/productSize/get`).then((res) => {
      if (res?.error === false) setSizes(res?.data || []);
    });
  }, []);

  // Price -> debounce করে filters এ পাঠানো (initial mount skip)
  const didInitPriceSync = useRef(false);
  useEffect(() => {
    if (!didInitPriceSync.current) {
      didInitPriceSync.current = true;
      return; // প্রথম মাউন্টে ফিল্টার আপডেট নয় (double-fetch এড়াতে)
    }
    const t = setTimeout(() => {
      onUpdateFilters({ minPrice: price?.[0], maxPrice: price?.[1] });
    }, 350);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [price]);

  // helpers
  const toggleFromArray = (arr = [], value, checked) => {
    const set = new Set(arr);
    if (checked) set.add(value);
    else set.delete(value);
    return Array.from(set);
  };

  const handleToggleSize = (name, checked) => {
    onUpdateFilters((prev) => ({
      ...prev,
      productSize: toggleFromArray(prev.productSize || [], name, checked),
    }));
  };

  const handleToggleColor = (name, checked) => {
    onUpdateFilters((prev) => ({
      ...prev,
      color: toggleFromArray(prev.color || [], name, checked),
    }));
  };

  const handleRatingClick = (value) => {
    onUpdateFilters({ rating: [value] });
  };

  const handleAvailabilityChange = (boolVal, checked) => {
    onUpdateFilters((prev) => {
      const current = Array.isArray(prev.availability)
        ? new Set(prev.availability)
        : prev.availability === undefined
          ? new Set()
          : new Set([prev.availability]);

      if (checked) current.add(boolVal);
      else current.delete(boolVal);

      let next;
      if (current.size === 0) next = undefined;
      else if (current.size === 1) next = [...current][0];
      else next = Array.from(current);

      return { ...prev, availability: next };
    });
  };

  // Utility
  const idKey = (id) => (id && id.$oid ? id.$oid : String(id || ""));


  // Parent Category select
  const handleCategoryClick = (index, categoryObj) => {
    toggleMenu(index); // UI একই
    // শুধু catId সেট করুন, অন্যগুলো ক্লিয়ার
    onUpdateFilters({
      catId: [categoryObj._id],
      subCatId: [],
      thirdSubCatId: [],
    });
  };
  // Subcategory select
  const handleSubCategoryClick = (index, subObj, parentObj) => {
    toggleSubMenu(index); // UI একই
    // subCatId (context রাখতে parent catId-ও দিন), third ক্লিয়ার
    onUpdateFilters({
      catId: [parentObj._id],
      subCatId: [subObj._id],
      thirdSubCatId: [],
    });
  };
  // Child select (unchanged)
  const handleInnerCategoryClick = (e, id) => {
    e.preventDefault();
    onUpdateFilters({
      thirdSubCatId: [id],
      catId: [],
      subCatId: [],
    });
  };
  // Counts helpers
  const getThirdCount = (inner) => (counts?.third?.[idKey(inner._id)] ?? 0);
  const getSubCount = (submenu) => {
    const direct = counts?.sub?.[idKey(submenu._id)];
    if (typeof direct === "number") return direct;
    const fromThird =
      submenu?.children?.reduce((sum, inner) => sum + (counts?.third?.[idKey(inner._id)] || 0), 0) || 0;
    return fromThird;
  };
  const getCatCount = (menu) => {
    const direct = counts?.cat?.[idKey(menu._id)];
    if (typeof direct === "number") return direct;
    const fromSubs =
      menu?.children?.reduce((sum, sub) => {
        const subDirect = counts?.sub?.[idKey(sub._id)];
        if (typeof subDirect === "number") return sum + subDirect;
        const subFromThird =
          sub?.children?.reduce((s, inner) => s + (counts?.third?.[idKey(inner._id)] || 0), 0) || 0;
        return sum + subFromThird;
      }, 0) || 0;
    return fromSubs;
  };
  

  // derive availability checkbox states
  const avail = filters?.availability;
  const isAvailChecked = Array.isArray(avail) ? avail.includes(true) : avail === true;
  const isNotAvailChecked = Array.isArray(avail) ? avail.includes(false) : avail === false;

  // helpers (কম্পোনেন্টের ভিতরে, return-এর আগে)
  const nameToHex = {
    black: "#000000",
    white: "#ffffff",
    red: "#ef4444",
    blue: "#3b82f6",
    green: "#10b981",
    yellow: "#f59e0b",
    orange: "#f97316",
    purple: "#8b5cf6",
    pink: "#ec4899",
    gray: "#6b7280",
    grey: "#6b7280",
    brown: "#92400e",
    teal: "#14b8a6",
    cyan: "#06b6d4",
    navy: "#1e3a8a",
    maroon: "#7f1d1d",
    olive: "#6b8e23",
  };

  const stringToColor = (str = "") => {
    // কোনো ম্যাপ না মিললে string hash থেকে soft color
    let hash = 0;
    for (let i = 0; i < str.length; i++) hash = str.charCodeAt(i) + ((hash << 5) - hash);
    const h = Math.abs(hash) % 360;
    return `hsl(${h}, 70%, 50%)`;
  };

  const normalizeHex = (hex) => {
    if (!hex) return null;
    let h = hex.toString().trim();
    if (h[0] !== "#") h = `#${h}`;
    if (h.length === 4) {
      // #abc -> #aabbcc
      h = `#${h[1]}${h[1]}${h[2]}${h[2]}${h[3]}${h[3]}`;
    }
    return /^#([0-9a-f]{6})$/i.test(h) ? h : null;
  };

  const getHex = (c) => {
    const byHex = normalizeHex(c?.hex);
    if (byHex) return byHex;
    const byName = nameToHex[(c?.name || "").toLowerCase()];
    if (byName) return byName;
    return stringToColor(c?.name || "");
  };

  const hexToRgb = (hex) => {
    const h = normalizeHex(hex);
    if (!h) return { r: 0, g: 0, b: 0 };
    const int = parseInt(h.slice(1), 16);
    return { r: (int >> 16) & 255, g: (int >> 8) & 255, b: int & 255 };
  };

  const isLight = (hex) => {
    const { r, g, b } = hexToRgb(hex);
    // perceived luminance
    const l = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return l > 0.82; // খুব উজ্জ্বল হলে true
  };

  return (
    <aside className="sidebar relative rounded-3xl border border-gray-200/70 bg-gradient-to-b from-white to-gray-50 p-4 md:p-5 shadow-[0_1px_12px_rgba(2,6,23,0.05)] space-y-4">
      {/* Shop by categories */}
      <div className="box rounded-2xl border border-gray-200 bg-white/80 backdrop-blur-sm shadow-sm">
        <h3 className="flex items-center justify-between px-3 md:px-4 py-3 text-[14px] md:text-[15px] font-semibold text-slate-900">
          <span className="inline-flex items-center gap-2">
            <span className="inline-flex h-5 w-5 items-center justify-center rounded-md bg-sky-50 text-sky-600 ring-1 ring-sky-200">
              <svg width="12" height="12" viewBox="0 0 24 24">
                <path d="M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z" fill="currentColor" />
              </svg>
            </span>
            Shop by categories
          </span>
        </h3>
{/* category */}
        <div className="scroll max-h-[320px] overflow-y-auto px-2 pb-3">
          <ul className="w-full space-y-2">
            {catData.map((menu, i) => (
              <li key={menu._id} className="list-none relative">
                <div className={`relative rounded-xl ring-1 transition-all ${openMenu === i ? 'bg-sky-50/60 ring-sky-200' : 'bg-white ring-gray-200 hover:bg-sky-50/40 hover:ring-sky-100'}`}>
                  {/* Parent Category (keep numbers in parentheses) */}
                  <Button
                    onClick={() => handleCategoryClick(i, menu)}
                    className="!w-full !justify-start !gap-2 !px-3.5 !py-2.5 !text-slate-800 !font-semibold !text-[13px] !normal-case !rounded-xl"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-sky-300 shrink-0" />
                    <span className="truncate">{menu.name}</span>
                    <span className="text-[11px] text-violet-500">({getCatCount(menu)})</span>
                  </Button>

                  {/* Expand/Collapse for Parent */}
                  {openMenu === i ? (
                    <FaRegSquareMinus
                      className="absolute top-2.5 right-2.5 h-6 w-6 p-1.5 rounded-md bg-white text-slate-600 ring-1 ring-gray-200 shadow-sm cursor-pointer hover:bg-sky-50 hover:text-sky-700"
                      onClick={() => toggleMenu(i)}
                    />
                  ) : (
                    <FaRegSquarePlus
                      className="absolute top-2.5 right-2.5 h-6 w-6 p-1.5 rounded-md bg-white text-slate-600 ring-1 ring-gray-200 shadow-sm cursor-pointer hover:bg-sky-50 hover:text-sky-700"
                      onClick={() => toggleMenu(i)}
                    />
                  )}
                </div>

                {/* Submenu */}
                {openMenu === i && menu.children?.length > 0 && (
                  <ul className="relative w-full pl-3.5 pr-2 space-y-1.5 pb-2 mt-2 before:content-[''] before:absolute before:left-2 before:top-1.5 before:bottom-1.5 before:w-px before:bg-gray-200">
                    {menu.children.map((submenu, j) => (
                      <li key={submenu._id} className="list-none relative">
                        <div className={`relative rounded-lg transition-all ring-1 ${openSubMenu === j ? 'bg-sky-50/60 ring-sky-200' : 'bg-white ring-gray-200 hover:bg-sky-50/30 hover:ring-sky-100'}`}>
                          <Button
                            onClick={() => handleSubCategoryClick(j, submenu, menu)}
                            className="!w-full !justify-start !gap-2 !px-3 !py-2 !text-slate-700 !text-[12px] !normal-case !rounded-lg hover:!text-sky-700"
                          >
                            <span className="h-1.5 w-1.5 rounded-full bg-indigo-300 shrink-0" />
                            <span className="truncate">{submenu.name}</span>
                            <span className="text-[11px] text-yellow-500">({getSubCount(submenu)})</span>
                          </Button>

                          {openSubMenu === j ? (
                            <FaRegSquareMinus
                              className="absolute top-1.5 right-2 h-6 w-6 p-1.5 rounded-md bg-white text-slate-600 ring-1 ring-gray-200 shadow-sm cursor-pointer hover:bg-sky-50 hover:text-sky-700"
                              onClick={() => toggleSubMenu(j)}
                            />
                          ) : (
                            <FaRegSquarePlus
                              className="absolute top-1.5 right-2 h-6 w-6 p-1.5 rounded-md bg-white text-slate-600 ring-1 ring-gray-200 shadow-sm cursor-pointer hover:bg-sky-50 hover:text-sky-700"
                              onClick={() => toggleSubMenu(j)}
                            />
                          )}
                        </div>

                        {/* Inner Submenu */}
                        {openSubMenu === j && submenu.children?.length > 0 && (
                          <ul className="relative w-full pl-4 pr-1 space-y-1.5 mt-2 before:content-[''] before:absolute before:left-3 before:top-0.5 before:bottom-0.5 before:w-px before:bg-gray-200">
                            {submenu.children.map((inner, k) => (
                              <li key={inner._id} className="list-none">
                                <Link
                                  to={`/category/${inner._id}`}
                                  key={k}
                                  onClick={(e) => handleInnerCategoryClick(e, inner._id)}
                                >
                                  <Button className="!w-full !justify-start !gap-2 !px-3 !py-1.5 !text-slate-700 !text-[12px] !normal-case !rounded-md !bg-white ring-1 ring-gray-200 hover:!bg-indigo-50 hover:!text-indigo-700 hover:ring-indigo-200 transition">
                                    <span className="h-1.5 w-1.5 rounded-full bg-violet-300 shrink-0" />
                                    <span className="truncate">{inner.name}</span>
                                    <span className="text-[11px] text-green-500">({getThirdCount(inner)})</span>
                                  </Button>
                                </Link>
                              </li>
                            ))}
                          </ul>
                        )}
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Shop by Size */}
      <div className="box rounded-2xl border border-gray-200 bg-white/80 backdrop-blur-sm shadow-sm">
        <h3 className="flex items-center justify-between px-3 md:px-4 py-3 text-[14px] md:text-[15px] font-semibold text-slate-900">
          <span className="inline-flex items-center gap-2">
            <span className="inline-flex h-5 w-5 items-center justify-center rounded-md bg-emerald-50 text-emerald-600 ring-1 ring-emerald-200">
              <svg width="12" height="12" viewBox="0 0 24 24">
                <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" />
              </svg>
            </span>
            Shop by Size
          </span>
          <Button onClick={() => setIsOpenSizeFIlter(!isOpenSizeFIleter)} className="!text-lg !text-sky-700 !min-w-0 !px-2">
            {isOpenSizeFIleter ? <IoIosArrowUp /> : <IoIosArrowDown />}
          </Button>
        </h3>
        <Collapse isOpened={isOpenSizeFIleter}>
          <div className="scroll max-h-[220px] overflow-y-auto px-3 pb-3">
            <div className="grid grid-cols-3 md:grid-cols-1 md:ml-4">
              {sizes?.length !== 0 &&
                sizes?.map((size, index) => (
                  <FormControlLabel
                    key={index}
                    control={
                      <Checkbox
                        size="small"
                        sx={{
                          py: 0.6, px: 1,
                          color: '#94a3b8',
                          '&.Mui-checked': { color: '#0ea5e9' },
                        }}
                        checked={(filters?.productSize || []).includes(size?.name)}
                        onChange={(e) => handleToggleSize(size?.name, e.target.checked)}
                      />
                    }
                    label={size?.name}
                    className="rounded-md px-2 py-1 hover:bg-sky-50 transition"
                    sx={{ '& .MuiFormControlLabel-label': { fontSize: '13px', color: '#334155' } }}
                  />
                ))}
            </div>
          </div>
        </Collapse>
      </div>

      {/* Shop by Color */}
      <div className="box rounded-2xl border border-gray-200 bg-white/80 backdrop-blur-sm shadow-sm">
        <h3 className="flex items-center justify-between px-3 md:px-4 py-3 text-[14px] md:text-[15px] font-semibold text-slate-900">
          <span className="inline-flex items-center gap-2">
            <span className="inline-flex h-5 w-5 items-center justify-center rounded-md bg-rose-50 text-rose-600 ring-1 ring-rose-200">
              <svg width="12" height="12" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="6" fill="currentColor" />
              </svg>
            </span>
            Shop by Color
          </span>
          <Button onClick={() => setIsOpenColorFilter(!isOpenColorFilter)} className="!text-lg !text-sky-700 !min-w-0 !px-2">
            {isOpenColorFilter ? <IoIosArrowUp /> : <IoIosArrowDown />}
          </Button>
        </h3>
        {/* color */}
        <Collapse isOpened={isOpenColorFilter}>
          <div className="scroll max-h-[220px] overflow-y-auto px-3 pb-3">
            <div className="grid grid-cols-3 md:grid-cols-1 md:ml-4">
              {colors?.length !== 0 &&
                colors?.map((color, index) => {
                  const hex = getHex(color);
                  const light = isLight(hex);
                  const ringStyle = {
                    backgroundColor: hex,
                    boxShadow: light ? "inset 0 0 0 2px rgba(148,163,184,0.8)" : "inset 0 0 0 2px rgba(255,255,255,0.6)",
                  };

                  return (
                    <FormControlLabel
                      key={index}
                      control={
                        <Checkbox
                          size="small"
                          sx={{
                            py: 0.6,
                            px: 1,
                            color: "#94a3b8",
                            "&.Mui-checked": { color: "#0ea5e9" },
                          }}
                          checked={(filters?.color || []).includes(color?.name)}
                          onChange={(e) => handleToggleColor(color?.name, e.target.checked)}
                        />
                      }
                      label={
                        <span className="inline-flex items-center gap-2">
                          {/* color dot */}
                          <span
                            className="h-2.5 w-2.5 rounded-full"
                            style={ringStyle}
                            title={hex}
                          />
                          {/* name (dynamic tint if readable) */}
                          <span>{color?.name}</span>
                        </span>
                      }
                      className="rounded-md px-2 py-1 hover:bg-sky-50 transition"
                      sx={{ "& .MuiFormControlLabel-label": { fontSize: "13px", color: "#334155" } }}
                    />
                  );
                })}
            </div>
          </div>
        </Collapse>
      </div>

      {/* Filter by price */}
      <div className="box rounded-2xl border border-gray-200 bg-white/80 backdrop-blur-sm shadow-sm">
        <h3 className="px-3 md:px-4 py-3 text-[14px] md:text-[15px] font-semibold text-slate-900">
          Filter by price
        </h3>
        <div className="px-3 pb-3">
          <div className="w-full rounded-xl bg-white ring-1 ring-gray-200 hover:ring-sky-200 transition">
            <div className="w-full px-3 py-2">
              <RangeSlider value={price} onInput={setPrice} min={100} max={10000} step={5} />
            </div>
          </div>
          <div className="flex pt-2 pb-2 priceRange w-full text-[12px] text-slate-700 px-3">
            <span>
              From: <strong className="text-slate-900">TK {price?.[0]}</strong>
            </span>
            <span className="ml-auto">
              To: <strong className="text-slate-900">TK {price?.[1]}</strong>
            </span>
          </div>
        </div>
      </div>

      {/* Filter by ratings */}
      <div className="box rounded-2xl border border-gray-200 bg-white/80 backdrop-blur-sm shadow-sm">
        <h3 className="flex items-center justify-between px-3 md:px-4 py-3 text-[14px] md:text-[15px] font-semibold text-slate-900">
          <span className="inline-flex items-center gap-2">
            <span className="inline-flex h-5 w-5 items-center justify-center rounded-md bg-amber-50 text-amber-600 ring-1 ring-amber-200">
              ★
            </span>
            Filter by ratings
          </span>
          <Button onClick={() => setIsOpenRatingFilter(!inOpenRatingfilter)} className="!text-lg !text-sky-700 !min-w-0 !px-2">
            {inOpenRatingfilter ? <IoIosArrowUp /> : <IoIosArrowDown />}
          </Button>
        </h3>
        <Collapse isOpened={inOpenRatingfilter}>
          <div className="px-3 pb-3 space-y-1">
            {[5, 4, 3, 2, 1].map((r) => (
              <div
                key={r}
                onClick={() => handleRatingClick(r)}
                className="cursor-pointer rounded-lg px-2 py-1 hover:bg-sky-50 transition"
              >
                <Rating name="size-small" defaultValue={r} size="small" readOnly />
              </div>
            ))}
          </div>
        </Collapse>
      </div>

      {/* Availability */}
      <div className="box rounded-2xl border border-gray-200 bg-white/80 backdrop-blur-sm shadow-sm">
        <h3 className="px-3 md:px-4 py-3 text-[14px] md:text-[15px] font-semibold text-slate-900">
          Availability
        </h3>
        <div className="px-3 pb-3">
          <div className="grid grid-cols-2 md:grid-cols-1 md:ml-2">
            <FormControlLabel
              control={
                <Checkbox
                  size="small"
                  sx={{
                    py: 0.6, px: 1,
                    color: '#94a3b8',
                    '&.Mui-checked': { color: '#0ea5e9' },
                  }}
                  checked={!!isAvailChecked}
                  onChange={(e) => handleAvailabilityChange(true, e.target.checked)}
                />
              }
              label="Available"
              className="rounded-md px-2 py-1 hover:bg-sky-50 transition"
              sx={{ '& .MuiFormControlLabel-label': { fontSize: '13px', color: '#334155' } }}
            />
            <FormControlLabel
              control={
                <Checkbox
                  size="small"
                  sx={{
                    py: 0.6, px: 1,
                    color: '#94a3b8',
                    '&.Mui-checked': { color: '#0ea5e9' },
                  }}
                  checked={!!isNotAvailChecked}
                  onChange={(e) => handleAvailabilityChange(false, e.target.checked)}
                />
              }
              label="Not Available"
              className="rounded-md px-2 py-1 hover:bg-sky-50 transition"
              sx={{ '& .MuiFormControlLabel-label': { fontSize: '13px', color: '#334155' } }}
            />
          </div>
        </div>
      </div>

      {/* Decorative glows */}
      <div className="pointer-events-none absolute -top-10 -left-10 h-24 w-24 rounded-full bg-sky-100/50 blur-2xl" />
      <div className="pointer-events-none absolute -bottom-10 -right-10 h-24 w-24 rounded-full bg-indigo-100/50 blur-2xl" />
    </aside>
  );
};

export default Sidebar;