
import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import { IoCloseSharp } from "react-icons/io5";
import { FaRegSquarePlus, FaRegSquareMinus } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import { useState } from 'react';



const categories = ["পোশাক", "ইসলামিক সামগ্রী", "ঐতিহ্যবাহী পোশাক", "মশারী", "বেডিং", "রুমাল", "মোজা"];


const Subcategories = ["পাঞ্জাবী", "পায়জামা", "গামছা", "লুঙ্গী", "আতর", "কিতাব", "টুপি", "হিজাব", "রেহাল", "তজবীহ", "মেছওয়াক", "ফোল্ডিং মশারি", "চামড়ার মোজা", "কাপড়ের মোজা"];


const CategoryPanel = (props) => {

  const [subMenuIndex, setSubMenuIndex] = useState(null)
  const [innerSubMenuIndex, seetInnerSubMenuIndex] = useState(null)

  const toggleDrawer = (newOpen) => () => {
    props.setIsOpenPanel(newOpen)
  };
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

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" className="categoryPanel" >
      <h3 className='p-2 text-[18px] font-[500]  flex items-center justify-between'>Shop By Category <IoCloseSharp onClick={toggleDrawer(false)} className='text-[20px] cursor-pointer' /></h3>
      {/* scroll */}
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
                  <Button  className='w-full text-left !justify-start !px-3 !text-black'>পোশাক</Button>
                  {
                    innerSubMenuIndex === 0 ? <FaRegSquareMinus className='absolute top-[6px] right-[15px] cursor-pointer' onClick={() => openInnerSubmenu(0)} /> : <FaRegSquarePlus className='absolute top-[6px] right-[15px] cursor-pointer' onClick={() => openInnerSubmenu(0)} />
                  }


                  {/* sub sub menu */}
                  {
                    innerSubMenuIndex === 0 && <ul className='inner_SubMenu w-full px-2 space-y-1  '>
                      <li className='list-none relative mt-2 '>                        
                          <Link to={'/paijama'} onClick={toggleDrawer(false)} className='w-full text-left !justify-start !px-3 !text-black '><Button className='w-full text-left !justify-start !px-3 !text-black '>পাঞ্জাবী</Button></Link>
                      </li>
                      <li className='list-none relative mt-2 '>                        
                          <Link to={'/paijama'} onClick={toggleDrawer(false)} className='w-full text-left !justify-start !px-3 !text-black'><Button className='w-full text-left !justify-start !px-3 !text-black'>পায়জামা</Button></Link>
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