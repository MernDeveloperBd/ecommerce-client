import { Button } from '@mui/material';
import { useContext, useState } from 'react';
import { FaRegSquarePlus, FaRegSquareMinus } from "react-icons/fa6";
import { Link, useNavigate } from 'react-router-dom';
import { MyContext } from '../../App';

const CategoryCollapse = () => {
  const { catData } = useContext(MyContext);
  const [openMenu, setOpenMenu] = useState(null);
  const [openSubMenu, setOpenSubMenu] = useState(null);
  const navigate = useNavigate();

  const toggleMenu = (index) => {
    setOpenMenu(openMenu === index ? null : index);
    setOpenSubMenu(null); // parent বদলালে inner submenu রিসেট
  };

  const toggleSubMenu = (index) => {
    setOpenSubMenu(openSubMenu === index ? null : index);
  };

  const buildListUrl = (q) => {
    const params = new URLSearchParams();
    if (q.cat) params.set("cat", q.cat);
    if (q.sub) params.set("sub", q.sub);
    if (q.third) params.set("third", q.third);
    return `/productListing?${params.toString()}`;
  };

  return (
    <div className="scroll max-h-[72vh] overflow-y-auto rounded-2xl border border-gray-200 bg-white/70 p-2 shadow-sm">
  <ul className="w-full px-1 space-y-2">
    {catData.map((menu, i) => (
      <li key={menu._id} className="list-none relative">
        <div
          className={`group relative rounded-xl ring-1 shadow-sm transition-all ${
            openMenu === i
              ? 'bg-sky-50/50 ring-sky-200'
              : 'bg-white/90 ring-gray-200 hover:bg-sky-50/30 hover:ring-sky-100'
          }`}
        >
          {/* Parent Category */}
          <Button
            onClick={() => navigate(buildListUrl({ cat: menu._id }))}
            className="w-full !justify-start !px-3.5 !py-2.5 !text-slate-800 !font-semibold !normal-case !rounded-xl"
          >
            <span className="inline-flex items-center gap-2">
              {/* tiny icon */}
              <svg width="14" height="14" viewBox="0 0 24 24" className="text-sky-600">
                <path d="M3 7h18M7 7v10m10-10v10M5 17h14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
              <span className="truncate">{menu.name}</span>
            </span>
          </Button>

          {/* Expand/Collapse for Parent */}
          {openMenu === i ? (
            <FaRegSquareMinus
              aria-label="Collapse"
              className="absolute top-2.5 right-2.5 h-6 w-6 p-1.5 rounded-md bg-white text-slate-600 ring-1 ring-gray-200 shadow-sm cursor-pointer hover:bg-sky-50 hover:text-sky-700"
              onClick={() => toggleMenu(i)}
            />
          ) : (
            <FaRegSquarePlus
              aria-label="Expand"
              className="absolute top-2.5 right-2.5 h-6 w-6 p-1.5 rounded-md bg-white text-slate-600 ring-1 ring-gray-200 shadow-sm cursor-pointer hover:bg-sky-50 hover:text-sky-700"
              onClick={() => toggleMenu(i)}
            />
          )}

          {/* Submenu */}
          {openMenu === i && menu.children?.length > 0 && (
            <ul className="relative w-full pl-3.5 pr-2 space-y-1.5 pb-2 mt-1.5 before:content-[''] before:absolute before:left-2 before:top-2 before:bottom-2 before:w-px before:bg-gray-200">
              {menu.children.map((submenu, j) => (
                <li key={submenu._id} className="list-none relative">
                  <div
                    className={`relative rounded-lg transition-all ring-1 ${
                      openSubMenu === j
                        ? 'bg-sky-50/60 ring-sky-200'
                        : 'bg-white ring-gray-200 hover:bg-sky-50/40 hover:ring-sky-100'
                    }`}
                  >
                    <Button
                      onClick={() => navigate(buildListUrl({ cat: menu._id, sub: submenu._id }))}
                      className="w-full !text-xs !text-slate-700 !justify-start !px-3 !py-2 !normal-case !rounded-lg hover:!text-sky-700"
                    >
                      <span className="inline-flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-sky-300"></span>
                        <span className="truncate">{submenu.name}</span>
                      </span>
                    </Button>

                    {/* Expand/Collapse Sub */}
                    {openSubMenu === j ? (
                      <FaRegSquareMinus
                        aria-label="Collapse"
                        className="absolute top-1.5 right-2 h-6 w-6 p-1.5 rounded-md bg-white text-slate-600 ring-1 ring-gray-200 shadow-sm cursor-pointer hover:bg-sky-50 hover:text-sky-700"
                        onClick={() => toggleSubMenu(j)}
                      />
                    ) : (
                      <FaRegSquarePlus
                        aria-label="Expand"
                        className="absolute top-1.5 right-2 h-6 w-6 p-1.5 rounded-md bg-white text-slate-600 ring-1 ring-gray-200 shadow-sm cursor-pointer hover:bg-sky-50 hover:text-sky-700"
                        onClick={() => toggleSubMenu(j)}
                      />
                    )}
                  </div>

                  {/* Inner Submenu */}
                  {openSubMenu === j && submenu.children?.length > 0 && (
                    <ul className="relative w-full pl-4 pr-1 space-y-1.5 mt-2 before:content-[''] before:absolute before:left-3 before:top-0.5 before:bottom-0.5 before:w-px before:bg-gray-200">
                      {submenu.children.map((inner, index) => (
                        <li key={index} className="list-none">
                          <Link to={buildListUrl({ cat: menu._id, sub: submenu._id, third: inner._id })}>
                            <Button className="w-full !text-xs !justify-start !px-3 !py-1.5 !text-slate-700 !normal-case !rounded-md hover:!bg-indigo-50 hover:!text-indigo-700 !bg-white ring-1 ring-gray-200 hover:ring-indigo-200 transition">
                              <span className="inline-flex items-center gap-2">
                                <span className="h-1.5 w-1.5 rounded-full bg-indigo-300"></span>
                                <span className="truncate">{inner.name}</span>
                              </span>
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
        </div>
      </li>
    ))}
  </ul>
</div>
  );
};

export default CategoryCollapse;