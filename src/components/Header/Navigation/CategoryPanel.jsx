
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import PropTypes from 'prop-types';
import { IoCloseSharp } from "react-icons/io5";
import CategoryCollapse from '../../CategoryCollapse/CategoryCollapse';
import { NavLink } from 'react-router-dom';

const CategoryPanel = (props) => {

  const toggleDrawer = (newOpen) => () => {
    props.setIsOpenPanel(newOpen)
  };

  const DrawerList = (
    <Box sx={{ width: 280 }} role="presentation" className="categoryPanel">
  <div className="relative flex h-full flex-col">
    {/* Header */}
    <div className="sticky top-0 z-10 flex items-center justify-between border-b border-gray-200 bg-white/75 px-4 py-3 backdrop-blur">
      <h3 className="text-[15px] md:text-[18px] font-semibold tracking-tight text-slate-900">
        Shop by Category
      </h3>
      <IoCloseSharp
        onClick={toggleDrawer(false)}
        className="text-[20px] text-slate-600 cursor-pointer rounded-md p-1 ring-1 ring-transparent hover:bg-slate-100 hover:text-slate-900 hover:ring-gray-200 transition"
      />
    </div>

    {/* Content */}
    <div className="flex-1 overflow-y-auto px-3 py-3 space-y-3 bg-gradient-to-b from-white to-gray-50">
      {/* Quick link */}
      <ul className="w-full space-y-1">
        <li>
          <NavLink
            to="/productListing"
            className={({ isActive }) =>
              [
                "group inline-flex items-center gap-2 w-full rounded-lg px-3 py-2 text-sm font-semibold ring-1 transition",
                "ring-gray-200 bg-white hover:bg-sky-50 hover:ring-sky-200",
                isActive ? "bg-sky-50 text-sky-700 ring-sky-200 shadow-sm" : "text-slate-800",
              ].join(" ")
            }
          >
            {/* icon (inline SVG to avoid extra imports) */}
            <svg width="16" height="16" viewBox="0 0 24 24" className="text-sky-600">
              <path d="M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z" fill="currentColor" />
            </svg>
            Collections
          </NavLink>
        </li>
      </ul>

      <hr className="border-gray-200/70" />

      {/* Collapsible Categories */}
      <div className="rounded-xl border border-gray-200 bg-white/80 p-2 shadow-sm">
        <CategoryCollapse />
      </div>
    </div>

    {/* Soft decorative glows */}
    <div className="pointer-events-none absolute -top-10 -left-10 h-24 w-24 rounded-full bg-sky-100/50 blur-2xl" />
    <div className="pointer-events-none absolute -bottom-10 -right-10 h-24 w-24 rounded-full bg-indigo-100/50 blur-2xl" />
  </div>
</Box>
  );

  return (
    <div>
      <Drawer open={props.isOpenPanel} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </div>
  );
};

export default CategoryPanel;

CategoryPanel.propTypes = {
  setIsOpenPanel: PropTypes.func,
  isOpenPanel: PropTypes.bool,
}