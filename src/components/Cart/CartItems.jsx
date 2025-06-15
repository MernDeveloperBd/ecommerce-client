import { useState } from "react";
import { Link } from "react-router-dom";
import { IoCloseSharp } from "react-icons/io5";
import { VscTriangleDown } from "react-icons/vsc";
import Stack from '@mui/material/Stack';
import { Rating } from "@mui/material";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

const CartItems = ({ size, qty }) => {
    const [sizeanchorEl, setSizeAnchorEl] = useState(null);
    const [selectedSize, setSelectedSize] = useState(size)
    const openSize = Boolean(sizeanchorEl);

    const [qtyanchorEl, setQtyAnchorEl] = useState(null);
    const [selectedQty, setSelectedQty] = useState(qty)
    const openQty = Boolean(qtyanchorEl);

    const handleClickSize = (event) => {
        setSizeAnchorEl(event.currentTarget);
    };
    const handleCloseSize = (value) => {
        setSizeAnchorEl(null);
        if (value !== null) {
            setSelectedSize(value)
        }
    };

    const handleClickQty = (event) => {
        setQtyAnchorEl(event.currentTarget);
    };
    const handleCloseQty = (value) => {
        setQtyAnchorEl(null);
        if (value !== null) {
            setSelectedQty(value)
        }
    };

    return (
        <div>
            {/* 1st  */}
            <div className="cartItem w-full p-2 flex items-center gap-4 pb-2 border-b border-[rgba(0,0,0,0.2)]">
                <div className="img w-[15%]  rounded-md overflow-hidden">
                    <Link to={`/product/001`} className="group">
                        <img src="https://i.ibb.co/p6N0c8Ys/Digital-Print-Lone-Three-Piece-3-kenakatabazar-bd.jpg" alt="cart image" className="w-full  group-hover:scale-105 transition-all duration-500" />
                    </Link>
                </div>
                {/* info */}
                <div className="info w-[85%] relative">
                    <IoCloseSharp className="absolute top-[10px] right-[0px] text-[22px]" />
                    <p className="text-[13px] mb-0">Panjabi brand</p>
                    <Link to={`/product/001`} className="link inline-block"><h3 className="text-[16px] font-semibold ">Product title with full title</h3></Link>
                    {/* Ratings */}
                    <Stack spacing={1} className="mt-1">
                        <Rating name="size-small" defaultValue={4} size="small" readOnly />
                    </Stack>
                    {/* size and qty */}
                    <div className="flex items-center gap-2 mt-2">
                        {/* size */}
                        <div className=" relative">
                            <span className="flex gap-1 items-center justify-center bg-[#f1f1f1] text-[12px] font-[600] py-1 px-2 rounded cursor-pointer" onClick={handleClickSize}>Size:<span> {selectedSize}</span><VscTriangleDown /></span>
                            <Menu
                                id="size-menu"
                                anchorEl={sizeanchorEl}
                                open={openSize}
                                onClose={handleCloseSize}
                                slotProps={{
                                    list: {
                                        'aria-labelledby': 'basic-button',
                                    },
                                }}
                            >
                                <MenuItem onClick={() => handleCloseSize('S')}>S</MenuItem>
                                <MenuItem onClick={() => handleCloseSize('M')}>M</MenuItem>
                                <MenuItem onClick={() => handleCloseSize('L')}>L</MenuItem>
                                <MenuItem onClick={() => handleCloseSize('XL')}>XL</MenuItem>
                                <MenuItem onClick={() => handleCloseSize('XXL')}>XXL</MenuItem>
                            </Menu>
                        </div>
                        {/* Qty */}
                        <div className=" relative">
                            <span className="flex gap-1 items-center justify-center bg-[#f1f1f1] text-[12px] font-[600] py-1 px-2 rounded cursor-pointer" onClick={handleClickQty}>Qty:<span> {selectedQty}</span><VscTriangleDown /></span>
                            <Menu
                                id="size-menu"
                                anchorEl={qtyanchorEl}
                                open={openQty}
                                onClose={handleCloseQty}
                                slotProps={{
                                    list: {
                                        'aria-labelledby': 'basic-button',
                                    },
                                }}
                            >
                                <MenuItem onClick={() => handleCloseQty('1')}>1</MenuItem>
                                <MenuItem onClick={() => handleCloseQty('2')}>2</MenuItem>
                                <MenuItem onClick={() => handleCloseQty('3')}>3</MenuItem>
                                <MenuItem onClick={() => handleCloseQty('4')}>4</MenuItem>
                                <MenuItem onClick={() => handleCloseQty('5')}>5</MenuItem>
                                <MenuItem onClick={() => handleCloseQty('6')}>6</MenuItem>
                                <MenuItem onClick={() => handleCloseQty('7')}>7</MenuItem>
                                <MenuItem onClick={() => handleCloseQty('8')}>8</MenuItem>
                                <MenuItem onClick={() => handleCloseQty('9')}>9</MenuItem>
                                <MenuItem onClick={() => handleCloseQty('10')}>10</MenuItem>

                            </Menu>
                        </div>

                    </div>
                    {/* price */}
                    <div className='flex gap-4 items-center mt-2'>
                        <span className='text-[14px] font-[500]'>Tk <span>250</span></span>
                        <span className='text-red-500 line-through text-[14px]'>Tk <span>350</span></span>
                        <span className='text-red-500 line-through text-[14px]'>55% off</span>
                    </div>
                </div>
            </div>
            {/* 1st  */}
            <div className="cartItem w-full p-2 flex items-center gap-4 pb-2 border-b border-[rgba(0,0,0,0.2)]">
                <div className="img w-[15%]  rounded-md overflow-hidden">
                    <Link to={`/product/001`} className="group">
                        <img src="https://i.ibb.co/p6N0c8Ys/Digital-Print-Lone-Three-Piece-3-kenakatabazar-bd.jpg" alt="cart image" className="w-full  group-hover:scale-105 transition-all duration-500" />
                    </Link>
                </div>
                {/* info */}
                <div className="info w-[85%] relative">
                    <IoCloseSharp className="absolute top-[10px] right-[0px] text-[22px]" />
                    <p className="text-[13px] mb-0">Panjabi brand</p>
                    <Link to={`/product/001`} className="link inline-block"><h3 className="text-[16px] font-semibold ">Product title with full title</h3></Link>
                    {/* Ratings */}
                    <Stack spacing={1} className="mt-1">
                        <Rating name="size-small" defaultValue={4} size="small" readOnly />
                    </Stack>
                    {/* size and qty */}
                    <div className="flex items-center gap-2 mt-2">
                        {/* size */}
                        <div className=" relative">
                            <span className="flex gap-1 items-center justify-center bg-[#f1f1f1] text-[12px] font-[600] py-1 px-2 rounded cursor-pointer" onClick={handleClickSize}>Size:<span> {selectedSize}</span><VscTriangleDown /></span>
                            <Menu
                                id="size-menu"
                                anchorEl={sizeanchorEl}
                                open={openSize}
                                onClose={handleCloseSize}
                                slotProps={{
                                    list: {
                                        'aria-labelledby': 'basic-button',
                                    },
                                }}
                            >
                                <MenuItem onClick={() => handleCloseSize('S')}>S</MenuItem>
                                <MenuItem onClick={() => handleCloseSize('M')}>M</MenuItem>
                                <MenuItem onClick={() => handleCloseSize('L')}>L</MenuItem>
                                <MenuItem onClick={() => handleCloseSize('XL')}>XL</MenuItem>
                                <MenuItem onClick={() => handleCloseSize('XXL')}>XXL</MenuItem>
                            </Menu>
                        </div>
                        {/* Qty */}
                        <div className=" relative">
                            <span className="flex gap-1 items-center justify-center bg-[#f1f1f1] text-[12px] font-[600] py-1 px-2 rounded cursor-pointer" onClick={handleClickQty}>Qty:<span> {selectedQty}</span><VscTriangleDown /></span>
                            <Menu
                                id="size-menu"
                                anchorEl={qtyanchorEl}
                                open={openQty}
                                onClose={handleCloseQty}
                                slotProps={{
                                    list: {
                                        'aria-labelledby': 'basic-button',
                                    },
                                }}
                            >
                                <MenuItem onClick={() => handleCloseQty('1')}>1</MenuItem>
                                <MenuItem onClick={() => handleCloseQty('2')}>2</MenuItem>
                                <MenuItem onClick={() => handleCloseQty('3')}>3</MenuItem>
                                <MenuItem onClick={() => handleCloseQty('4')}>4</MenuItem>
                                <MenuItem onClick={() => handleCloseQty('5')}>5</MenuItem>
                                <MenuItem onClick={() => handleCloseQty('6')}>6</MenuItem>
                                <MenuItem onClick={() => handleCloseQty('7')}>7</MenuItem>
                                <MenuItem onClick={() => handleCloseQty('8')}>8</MenuItem>
                                <MenuItem onClick={() => handleCloseQty('9')}>9</MenuItem>
                                <MenuItem onClick={() => handleCloseQty('10')}>10</MenuItem>

                            </Menu>
                        </div>

                    </div>
                    {/* price */}
                    <div className='flex gap-4 items-center mt-2'>
                        <span className='text-[14px] font-[500]'>Tk <span>250</span></span>
                        <span className='text-red-500 line-through text-[14px]'>Tk <span>350</span></span>
                        <span className='text-red-500 line-through text-[14px]'>55% off</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartItems;