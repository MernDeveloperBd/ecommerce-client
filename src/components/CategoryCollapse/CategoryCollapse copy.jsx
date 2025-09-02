import { Button } from '@mui/material';
import { useContext,  useState } from 'react';
import { FaRegSquarePlus, FaRegSquareMinus } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import { MyContext } from '../../App';

const CategoryCollapse = () => {
   const{catData} = useContext(MyContext)   
  const [openMenu, setOpenMenu] = useState(null);
  const [openSubMenu, setOpenSubMenu] = useState(null);

 

  const toggleMenu = (index) => {
    setOpenMenu(openMenu === index ? null : index);
    setOpenSubMenu(null); // parent বদলালে inner submenu রিসেট
  };

  const toggleSubMenu = (index) => {
    setOpenSubMenu(openSubMenu === index ? null : index);
  };

  return (
    <div className="scroll">
      <ul className="w-full px-2 space-y-1">
        {catData.map((menu, i) => (
          <li key={menu._id} className="list-none flex items-center relative flex-col">
            {/* Parent Category */}
            <Button
              onClick={() => toggleMenu(i)}
              className="w-full text-left !justify-start !px-3 !text-gray-800 !font-semibold"
            >
              {menu.name}
            </Button>

            {openMenu === i ? (
              <FaRegSquareMinus
                className="absolute top-[10px] right-[15px] cursor-pointer"
                onClick={() => toggleMenu(i)}
              />
            ) : (
              <FaRegSquarePlus
                className="absolute top-[10px] right-[15px] cursor-pointer"
                onClick={() => toggleMenu(i)}
              />
            )}

            {/* Submenu */}
            {openMenu === i && menu.children?.length > 0 && (
              <ul className="subMenu w-full pl-3 space-y-1 mt-1">
                {menu.children.map((submenu, j) => (
                  <li key={submenu._id} className="list-none relative space-y-1">
                    <Button
                      onClick={() => toggleSubMenu(j)}
                      className="w-full !text-xs text-left !justify-start !px-3 !text-violet-800"
                    >
                      {submenu.name}
                    </Button>

                    {openSubMenu === j ? (
                      <FaRegSquareMinus
                        className="absolute top-[6px] right-[15px] cursor-pointer"
                        onClick={() => toggleSubMenu(j)}
                      />
                    ) : (
                      <FaRegSquarePlus
                        className="absolute top-[6px] right-[15px] cursor-pointer"
                        onClick={() => toggleSubMenu(j)}
                      />
                    )}

                    {/* Inner Submenu */}
                    {openSubMenu === j && submenu.children?.length > 0 && (
                      <ul className="inner_SubMenu w-full px-2 space-y-1">
                        {submenu.children.map((inner, k) => (
                          <li key={inner._id} className="list-none relative mt-2">
                            <Link to={`/category/${inner._id}`} key={k}>
                              <Button className="w-full !text-xs text-left !justify-start !px-3 !text-yellow-700">
                                {inner.name}
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
  );
};

export default CategoryCollapse;
