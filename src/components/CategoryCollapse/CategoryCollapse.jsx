import { Button } from '@mui/material';
import { useState } from 'react';
import { FaRegSquarePlus, FaRegSquareMinus } from "react-icons/fa6";
import { Link } from 'react-router-dom';

const CategoryCollapse = () => {
     const [subMenuIndex, setSubMenuIndex] = useState(null)
  const [innerSubMenuIndex, seetInnerSubMenuIndex] = useState(null)

  

    const openSubmenu = (index) => {
    if (subMenuIndex === index) {
      setSubMenuIndex(null)
    } else {
      setSubMenuIndex(index)
    }
  }
  // Inner submenu
  const openInnerSubmenu = (index) => {
    if (innerSubMenuIndex === index) {
      seetInnerSubMenuIndex(null)
    } else {
      seetInnerSubMenuIndex(index)
    }
  }
    return (
        <div>
            <div className='scroll'>
        {/* menu */}
        <ul className='w-full px-2 space-y-1'>
          {/* Fashion */}
          <li className='list-none flex items-center relative flex-col'>
            <Button onClick={() => openSubmenu(0)} className='w-full text-left !justify-start !px-3 !text-black'>ফ্যাশন</Button>
            {
              subMenuIndex === 0 ? <FaRegSquareMinus className='absolute top-[10px] right-[15px] cursor-pointer' onClick={() => openSubmenu(0)} /> :
                <FaRegSquarePlus className='absolute top-[10px] right-[15px] cursor-pointer' onClick={() => openSubmenu(0)} />
            }

            {/* Submenu */}
            {
              subMenuIndex === 0 && <ul className='subMenu  w-full pl-3 space-y-1 mt-1'>
                <li className='list-none relative  space-y-1'>
                  <Button   className='w-full text-left !justify-start !px-3 !text-black'>পোশাক</Button>
                  {
                    innerSubMenuIndex === 0 ? <FaRegSquareMinus className='absolute top-[6px] right-[15px] cursor-pointer' onClick={() => openInnerSubmenu(0)} /> : <FaRegSquarePlus className='absolute top-[6px] right-[15px] cursor-pointer' onClick={() => openInnerSubmenu(0)} />
                  }


                  {/* sub sub menu */}
                  {
                    innerSubMenuIndex === 0 && <ul className='inner_SubMenu w-full px-2 space-y-1  '>
                      <li className='list-none relative mt-2 '>                        
                          <Link to={'/paijama'}  className='w-full text-left !justify-start !px-3 !text-black '><Button className='w-full text-left !justify-start !px-3 !text-black '>পাঞ্জাবী</Button></Link>
                      </li>
                      <li className='list-none relative mt-2 '>                        
                          <Link to={'/paijama'}  className='w-full text-left !justify-start !px-3 !text-black'><Button className='w-full text-left !justify-start !px-3 !text-black'>পায়জামা</Button></Link>
                      </li>                      
                    </ul>
                  }
                </li>

              </ul>
            }

          </li>
          {/* Islamic products */}
          <li className='list-none flex items-center relative flex-col'>
            <Button onClick={() => openSubmenu(1)} className='w-full text-left !justify-start !px-3 !text-black'>ইসলামিক পন্য</Button>
            {
              subMenuIndex === 1 ? <FaRegSquareMinus className='absolute top-[10px] right-[15px] cursor-pointer' onClick={() => openSubmenu(1)} /> :
                <FaRegSquarePlus className='absolute top-[10px] right-[15px] cursor-pointer' onClick={() => openSubmenu(1)} />
            }

            {/* Submenu */}
            {
              subMenuIndex === 1 && <ul className='subMenu  w-full pl-3 space-y-1 mt-1'>
                <li className='list-none relative  space-y-1'>
                  <Button   className='w-full text-left !justify-start !px-3 !text-black'>কিতাব</Button>
                  {
                    innerSubMenuIndex === 1 ? <FaRegSquareMinus className='absolute top-[6px] right-[15px] cursor-pointer' onClick={() => openInnerSubmenu(1)} /> : <FaRegSquarePlus className='absolute top-[6px] right-[15px] cursor-pointer' onClick={() => openInnerSubmenu(1)} />
                  }


                  {/* sub sub menu */}
                  {
                    innerSubMenuIndex === 1 && <ul className='inner_SubMenu w-full px-2 space-y-1  '>
                      <li className='list-none relative mt-2 '>                        
                          <Link to={'/paijama'}  className='w-full text-left !justify-start !px-3 !text-black '><Button className='w-full text-left !justify-start !px-3 !text-black '>বুখারি</Button></Link>
                      </li>
                      <li className='list-none relative mt-2 '>                        
                          <Link to={'/paijama'}  className='w-full text-left !justify-start !px-3 !text-black'><Button className='w-full text-left !justify-start !px-3 !text-black'>মুসলিম</Button></Link>
                      </li>                      
                    </ul>
                  }
                </li>

              </ul>
            }

          </li>
          {/* Fashion end */}
          {/* ঐতিহ্যবাহী পোশাক 1 */}
          <li className='list-none flex items-center relative flex-col'>
            <Button className='w-full text-left !justify-start !px-3 !text-black'>ঐতিহ্যবাহী পোশাক</Button>
            {
              subMenuIndex === 2 ? <FaRegSquareMinus className='absolute top-[10px] right-[15px] cursor-pointer' onClick={() => openSubmenu(2)} /> :
                <FaRegSquarePlus className='absolute top-[10px] right-[15px] cursor-pointer' onClick={() => openSubmenu(2)} />
            }

            {/* Submenu */}
            {
              subMenuIndex === 2 && <ul className='subMenu  w-full pl-3 space-y-1 mt-1'>
                <li className='list-none relative  space-y-1'>
                 <Link to={'/gamcha'}> <Button className='w-full text-left !justify-start !px-3 !text-black'>গামছা</Button></Link>

                </li>
                <li className='list-none relative  space-y-1'>
                  <Link to={'/lungi'}><Button className='w-full text-left !justify-start !px-3 !text-black'>লুঙ্গী</Button></Link>

                </li>

              </ul>
            }

          </li>
          {/* ঐতিহ্যবাহী পোশাক end */}        
        </ul>

      </div>
        </div>
    );
};

export default CategoryCollapse;