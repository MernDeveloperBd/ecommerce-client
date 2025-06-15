
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import { IoCloseSharp } from "react-icons/io5";
import CategoryCollapse from '../../CategoryCollapse/CategoryCollapse';


const categories = ["পোশাক", "ইসলামিক সামগ্রী", "ঐতিহ্যবাহী পোশাক", "মশারী", "বেডিং", "রুমাল", "মোজা"];

const Subcategories = ["পাঞ্জাবী", "পায়জামা", "গামছা", "লুঙ্গী", "আতর", "কিতাব", "টুপি", "হিজাব", "রেহাল", "তজবীহ", "মেছওয়াক", "ফোল্ডিং মশারি", "চামড়ার মোজা", "কাপড়ের মোজা"];


const CategoryPanel = (props) => {

  const toggleDrawer = (newOpen) => () => {
    props.setIsOpenPanel(newOpen)
  };
 

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" className="categoryPanel" >
      <h3 className='p-2 text-[18px] font-[500]  flex items-center justify-between'>Shop By Category <IoCloseSharp onClick={toggleDrawer(false)} className='text-[20px] cursor-pointer' /></h3>
     <CategoryCollapse/>
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