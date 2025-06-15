
import { Link } from 'react-router-dom';
import './productItem.css'
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import Button from "@mui/material/Button"
import { MdOutlineShoppingCart, MdZoomOutMap } from "react-icons/md";
import { IoGitCompareOutline } from "react-icons/io5";
import { FaRegHeart } from "react-icons/fa6";
import Tooltip from '@mui/material/Tooltip';
import { useContext } from 'react';
import { MyContext } from '../../App';

const ProductItemListView = ({ image1, image2 }) => {
    const{setOpenProductDetailsModal} = useContext(MyContext)
    return (
        <div className='group productItem w-full flex flex-col md:flex-row justify-between gap-3 rounded overflow-hidden shadow-lg'>
            <div className="imgWraper md:w-[160px] md:h-[160px] overflow-hidden relative">
                <Link to='/'>
                    <div className='img md:h-full h-[220px] overflow-hidden '>
                        <img src={image1} alt="popular image" className="w-full" />
                        <img src={image2} alt="popular image" className="w-full absolute top-0 left-0 opacity-0 transition-all duration-700 group-hover:opacity-100 over" />
                    </div>

                </Link>
                <span className='discount flex items-center absolute top-[10px] left-[10px] z-50 bg-primary text-black px-2 py-1 rounded-md text-[12px] font-[500]'>10%</span>
                {/* icons */}
                <div className='actions absolute -top-[150px] right-[1px] z-50 flex items-center gap-2 flex-col w-[50px] transition-all duration-500 group-hover:top-[15px]'>
                    <Tooltip title="Zoom out map" placement="left"><Button onClick={()=>setOpenProductDetailsModal(true)} className='!w-[30px] !h-[30px] !min-w-[30px] !rounded-full !bg-white hover:!bg-primary  hover:text-white'><MdZoomOutMap className='text-xl' /></Button></Tooltip>
                    <Tooltip title="Compare" placement="left">
                        <Button className='!w-[30px] !h-[30px] !min-w-[30px] !rounded-full !bg-white hover:!bg-primary  hover:text-white'><IoGitCompareOutline className='text-xl' /></Button>
                    </Tooltip>
                    <Tooltip title="Wishlist" placement="left">
                        <Button className='!w-[30px] !h-[30px] !min-w-[30px] !rounded-full !bg-white hover:!bg-primary  hover:text-white'><FaRegHeart className='text-xl' /></Button>
                    </Tooltip>
                </div>
            </div>
            {/* product info */}
            <div className="info p-2 space-y-1 flex flex-col md:flex-row justify-between flex-1 gap-2">
              <div className='space-y-1'>
                  <h6 className="text-[13px]"><Link to={'/'} className='link transition-all'>Collton panjabi</Link></h6>
                <Link><h3 className="text-[16px] title mt-2 font-[500] text-[rgba(0,0,0,0.9)] hover:text-primary transition-all duration-300">100% cotton panjabi with gergousious looking</h3></Link>
                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit.sdfsd  sdfsdfsdfsd sdfs fsdfsdfsd fsdfsdf. </p>
                <Stack spacing={1}>
                    <Rating name="size-small" defaultValue={4} size="small" readOnly />
                </Stack>
                <button className='font-bold text-white bg-orange-700 flex items-center gap-1 border border-1 px-2 py-1 rounded hover:bg-orange-500 transition-all duration-600'><MdOutlineShoppingCart/> Add to Cart</button>
              </div>
                {/* price */}
                <div className='flex flex-col justify-center gap-2'>
                    <span className='text-[14px] font-[500]'>Tk 250</span>
                    <span className='text-red-500 line-through text-[14px]'>Tk 350</span>
                </div>
            </div>
            
        </div>
    );
};

export default ProductItemListView;