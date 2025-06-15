import Sidebar from "../../Sidebar/Sidebar";
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import ProductItem from "../../ProductItem/ProductItem";
import Button from "@mui/material/Button";
import { IoGridSharp } from "react-icons/io5";
import { FiMenu } from "react-icons/fi";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useState } from "react";
import ProductItemListView from "../../ProductItemListView/ProductItemListView";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';




function handleClick(event) {
    event.preventDefault();
    console.info('You clicked a breadcrumb.');
}



const ProductListing = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [itemView, setIsItemView] = useState('grid')
    const open = Boolean(anchorEl);
    const handleClickSort = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <section className="">
            <div role="presentation" onClick={handleClick} className="container py-2">
                <Breadcrumbs aria-label="breadcrumb">
                    <Link underline="hover" color="inherit" href="/" className="link">
                        Home
                    </Link>
                    <Link
                        underline="hover"
                        color="inherit"
                        href="/shop"
                        className="link"
                    >
                        Shop
                    </Link>

                </Breadcrumbs>
            </div>
            <div className="bg-white p-2">
                <div className="container flex gap-2">
                    {/* Left sidebar */}
                    <div className="sidebarWrapper w-[20%] h-full bg-white">
                        <Sidebar />
                    </div>
                    {/* Right side products */}
                    <div className="rightContent w-[80%] py-3">
                        <div className="bg-[#f1f1f1] p-2 w-full rounded-md flex items-center justify-between">
                            <div className="col1 flex items-center gap-2">
                                <Button onClick={() => setIsItemView('grid')} className={`!h-[40px] !w-[40px] !min-w-[40px] rounded-md ${itemView === 'grid' && 'text-red-500'}`}><IoGridSharp className="text-xl text-black" /></Button>

                                <Button onClick={() => setIsItemView('list')} className={`!h-[40px] !w-[40px] !min-w-[40px] rounded-md ${itemView === 'list' && 'text-red-500'}`}><FiMenu className="text-xl text-black" /></Button>
                                <span className="text-[14px] font-[500] text-[rgba(0,0,0,0.7)]">There are 27 Products</span>
                            </div>
                            <div className="col2 flex gap-2 items-center justify-end pr-2">
                                <span className="text-[14px] font-[500] text-[rgba(0,0,0,0.7)]">Sort by</span>
                                <div>
                                    <Button
                                        id="basic-button"
                                        aria-controls={open ? 'basic-menu' : undefined}
                                        aria-haspopup="true"
                                        aria-expanded={open ? 'true' : undefined}
                                        onClick={handleClickSort}
                                        className="!bg-white !text-black !font-[600]"
                                    >
                                        Sales High to Low
                                    </Button>
                                    <Menu
                                        id="basic-menu"
                                        anchorEl={anchorEl}
                                        open={open}
                                        onClose={handleClose}
                                        slotProps={{
                                            list: {
                                                'aria-labelledby': 'basic-button',
                                            },
                                        }}
                                    >
                                        <MenuItem onClick={handleClose}>Sales, High to Low</MenuItem>
                                        <MenuItem onClick={handleClose}>Name, A to Z</MenuItem>
                                        <MenuItem onClick={handleClose}>Name, Z to A</MenuItem>
                                        <MenuItem onClick={handleClose}>Price, low to high to A</MenuItem>
                                        <MenuItem onClick={handleClose}>Price, high to low</MenuItem>
                                    </Menu>
                                </div>
                            </div>
                        </div>

                        <div className="my-4">
                            {
                                itemView === 'grid' ? <div className="grid grid-cols-1 md:grid-cols-4 gap-2"><ProductItem image1={"https://i.ibb.co/p6N0c8Ys/Digital-Print-Lone-Three-Piece-3-kenakatabazar-bd.jpg"} image2={"https://i.ibb.co/dxfD53n/Digital-Print-Lone-Three-Piece-7-kenakatabazar-bd.jpg"} />
                                    <ProductItem image1={"https://i.ibb.co/p6N0c8Ys/Digital-Print-Lone-Three-Piece-3-kenakatabazar-bd.jpg"} image2={"https://i.ibb.co/dxfD53n/Digital-Print-Lone-Three-Piece-7-kenakatabazar-bd.jpg"} />
                                    <ProductItem image1={"https://i.ibb.co/p6N0c8Ys/Digital-Print-Lone-Three-Piece-3-kenakatabazar-bd.jpg"} image2={"https://i.ibb.co/dxfD53n/Digital-Print-Lone-Three-Piece-7-kenakatabazar-bd.jpg"} />
                                    <ProductItem image1={"https://i.ibb.co/p6N0c8Ys/Digital-Print-Lone-Three-Piece-3-kenakatabazar-bd.jpg"} image2={"https://i.ibb.co/dxfD53n/Digital-Print-Lone-Three-Piece-7-kenakatabazar-bd.jpg"} /></div> :
                                    <div className="flex flex-col gap-3">
                                        <ProductItemListView image1={"https://i.ibb.co/p6N0c8Ys/Digital-Print-Lone-Three-Piece-3-kenakatabazar-bd.jpg"} image2={"https://i.ibb.co/dxfD53n/Digital-Print-Lone-Three-Piece-7-kenakatabazar-bd.jpg"} />
                                        <ProductItemListView image1={"https://i.ibb.co/p6N0c8Ys/Digital-Print-Lone-Three-Piece-3-kenakatabazar-bd.jpg"} image2={"https://i.ibb.co/dxfD53n/Digital-Print-Lone-Three-Piece-7-kenakatabazar-bd.jpg"} />
                                        <ProductItemListView image1={"https://i.ibb.co/p6N0c8Ys/Digital-Print-Lone-Three-Piece-3-kenakatabazar-bd.jpg"} image2={"https://i.ibb.co/dxfD53n/Digital-Print-Lone-Three-Piece-7-kenakatabazar-bd.jpg"} />
                                        <ProductItemListView image1={"https://i.ibb.co/p6N0c8Ys/Digital-Print-Lone-Three-Piece-3-kenakatabazar-bd.jpg"} image2={"https://i.ibb.co/dxfD53n/Digital-Print-Lone-Three-Piece-7-kenakatabazar-bd.jpg"} />
                                    </div>
                            }
                        </div>
                        <div className="flex justify-center pt-4">
                            <Stack spacing={2}>
                                <Pagination count={10} showFirstButton showLastButton />
                            </Stack>
                        </div>

                    </div>
                </div>

            </div>

        </section>
    );
};

export default ProductListing;