import { Link } from 'react-router-dom';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import Button from "@mui/material/Button";
import {  MdZoomOutMap } from "react-icons/md";
import { IoGitCompareOutline } from "react-icons/io5";
import { FaRegHeart } from "react-icons/fa6";
import Tooltip from '@mui/material/Tooltip';
import { useContext } from 'react';
import { MyContext } from '../../App';

const ProductItem = ({ id,image1, image2 ,price, oldPrice, catName, name}) => {
    const { setOpenProductDetailsModal } = useContext(MyContext);
     // ✅ Discount Calculation
    const discount =
        oldPrice && price
            ? Math.round(((oldPrice - price) / oldPrice) * 100)
            : 0;

    return (
        <div className="group productItem rounded-lg overflow-hidden shadow-sm hover:shadow-2xl transition-shadow duration-300 bg-white">
            {/* Image */}
            <div className="relative w-full h-36 md:h-44 overflow-hidden">
                <Link to={`/productDetails/${id}`}>
                    <img
                        src={image1}
                        alt="product"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <img
                        src={image2}
                        alt="product hover"
                        className="w-full h-full object-cover absolute top-0 left-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    />
                </Link>

                {/* Discount Badge */}
                <span className='absolute top-2 left-2 z-10 bg-primary text-black px-2 py-1 rounded-md text-xs font-semibold'>
                    -{discount}%
                </span>

                {/* Action Buttons */}
                <div className='absolute top-2 right-2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500'>
                    <Tooltip title="Quick View" placement="left">
                        <Button
                            onClick={() => setOpenProductDetailsModal(true)}
                            className='!w-8 !h-8 !min-w-0 !rounded-full !bg-white hover:!bg-primary hover:text-white'
                        >
                            <MdZoomOutMap className='text-lg' />
                        </Button>
                    </Tooltip>
                    <Tooltip title="Compare" placement="left">
                        <Button className='!w-8 !h-8 !min-w-0 !rounded-full !bg-white hover:!bg-primary hover:text-white'>
                            <IoGitCompareOutline className='text-lg' />
                        </Button>
                    </Tooltip>
                    <Tooltip title="Wishlist" placement="left">
                        <Button className='!w-8 !h-8 !min-w-0 !rounded-full !bg-white hover:!bg-primary hover:text-white'>
                            <FaRegHeart className='text-lg' />
                        </Button>
                    </Tooltip>
                </div>
            </div>

            {/* Product Info */}
            <div className="p-3 space-y-2">
                <h6 className="text-xs md:text-sm text-gray-500">
                    <h2 className='text-green-600'>{catName}</h2>
                </h6>
                <Link to='/productDetails/67ef9c737ba894425ea81652'>
                    <h3 className="text-xs md:text-sm font-medium text-gray-900 hover:text-primary transition-colors">
                        {`${name}`.length > 20
                            ? `${name}`.slice(0, 20) + "..."
                            : `${name}`}
                    </h3>
                </Link>
                <Stack spacing={0.5}>
                    <Rating name="size-small" defaultValue={4} size="small" readOnly />
                </Stack>

                {/* Price */}
                <div className='flex justify-between items-center mt-1'>
                    <span className='text-xs md:text-sm font-semibold'>Tk {price}</span>
                    {
                        oldPrice && <span className='text-red-500 line-through text-xs'>Tk {oldPrice}</span>
                    }
                </div>

                {/* Add to Cart */}
               {/*  <button className='w-full flex items-center justify-center gap-2 bg-violet-500 text-white font-semibold py-2 rounded hover:bg-violet-600 transition-colors duration-300 mt-2 text-sm md:text-base'>
                    <MdOutlineShoppingCart className='text-lg hidden md:block' /> Add to Cart
                </button> */}
            </div>
        </div>
    );
};

export default ProductItem;
