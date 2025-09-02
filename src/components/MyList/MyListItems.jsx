
import { Link } from "react-router-dom";
import { IoCloseSharp } from "react-icons/io5";
import Stack from '@mui/material/Stack';
import { Button, Rating } from "@mui/material";

const MyListItem = () => {

    return (
        <div>
            {/* 1st  */}
            <div className="cartItem w-full p-2 flex items-center gap-4 pb-2 border-b border-[rgba(0,0,0,0.2)] relative">
                <IoCloseSharp className="absolute top-[10px] right-[15px] text-[22px] cursor-pointer" />
                <div className="img w-[15%]  rounded-md overflow-hidden">
                    <Link to={`/product/001`} className="group">
                        <img src="https://i.ibb.co/p6N0c8Ys/Digital-Print-Lone-Three-Piece-3-kenakatabazar-bd.jpg" alt="cart image" className="w-full h-[70px] md:h-[90px] group-hover:scale-105 transition-all duration-500 object-cover" />
                    </Link>
                </div>
                {/* info */}
                <div className="info w-[65%] ">
                    {/* <IoCloseSharp className="absolute top-[10px] right-[0px] text-[22px] cursor-pointer" /> */}
                    <p className="text-[13px] mb-0">Panjabi brand</p>
                    <Link to={`/product/001`} className="link inline-block"><h3 className="text-[12px] md:text-[16px] font-semibold ">Product title with full title</h3></Link>
                    {/* Ratings */}
                    <Stack spacing={1} className="mt-1">
                        <Rating name="size-small" defaultValue={4} size="small" readOnly />
                    </Stack>
                    {/* size and qty */}

                    {/* price */}
                    <div className='flex gap-4 items-center mt-2'>
                        <span className='text-[14px] font-[500]'>Tk <span>250</span></span>
                        <span className='text-red-500 line-through text-[14px]'>Tk <span>350</span></span>
                        <span className='text-red-500 line-through text-[14px]'>55% off</span>
                    </div>
                   
                </div>
                 <div className="w-[20%] flex justify-end self-end">
                        <Button className="bg-btn hover:bg-btn btn-sm !text-[11px]">Add to Cart</Button>
                    </div>
                {/* br */}
                <br />
            </div>

        </div>
    );
};

export default MyListItem;