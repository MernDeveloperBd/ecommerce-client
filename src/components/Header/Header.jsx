import { Link } from "react-router-dom";
import Search from "./search/Search";
import Stack from '@mui/material/Stack';
import Badge from '@mui/material/Badge';
import { MdOutlineShoppingCart } from "react-icons/md";
import { IoGitCompareSharp } from "react-icons/io5";
import { FaRegHeart } from "react-icons/fa6";
import Tooltip from '@mui/material/Tooltip';
import { IconButton } from "@mui/material";
import Navigation from "./Navigation/Navigation";

const Header = () => {
    return (
        <header className="bg-white">
            <div className="top-strip py-2">
                <div className="container">
                    <div className="flex items-center justify-between">
                        <div className="col1 w-[50%]">
                            <p className="text-[14px] font-[500px]">Get upto 20% Discount on first buy. Limited time only</p>
                        </div>
                        {/* Right side */}
                        <div className="col2 flex items-center justify-end">
                            <ul className="flex items-center gap-2">
                                <li><Link to='/help-center' className="hover:text-linkHover font-[500] text-[13px] transition">Help Center</Link></li>
                                <li><Link to='/order-tracking' className="hover:text-linkHover font-[500] text-[13px] transition">Order Tracking</Link></li>
                                <li><Link to='/my-account' className="hover:text-linkHover font-[500] text-[13px] transition">My Account</Link></li>
                                <li><Link to='/help-center' className="hover:text-linkHover font-[500] text-[13px] transition">Help Center</Link></li>

                            </ul>
                        </div>

                    </div>

                </div>
            </div>
            {/* menu */}
            <div className="header py-3 border border-b-[1px]">
                <div className="container flex items-center justify-between gap-2">
                    <div className="col1 w-[30%]">
                        <Link to={'/'}>
                            {/* <img src="https://i.ibb.co/PZntnvzy/Haramain-khushbo.jpg"/> */}
                            <h2 className="text-2xl font-semibold">Haramain <span className="text-primary">Khushbo</span></h2>
                        </Link>
                    </div>
                    <div className="col2 w-[40%]">
                        <Search />
                    </div>
                    <div className="col2 w-[30%] flex items-center pl-5">
                        <ul className="flex items-center justify-end gap-2 w-full">
                            <li className="list-none">
                                
                                <Link to="/login" className="hover:text-linkHover transition text-[15px] font-[500]">Login</Link> / <Link to="/register" className="hover:text-linkHover transition text-[15px] font-[500]">Register</Link>
                            </li>
                            <li>|</li>
                            <li>
                                  <Tooltip title="Compare">
                               <IconButton>
                                         <Stack spacing={4} direction="row" sx={{ color: 'action.active' }}>
                                  <Badge color="secondary" badgeContent={0} showZero>
                                        <IoGitCompareSharp className="text-xl"/>
                                    </Badge>
                                </Stack>
                               </IconButton>
                               </Tooltip>
                            </li>
                            <li>
                                <Tooltip title="Wishlist">
                               <IconButton>
                                <Stack spacing={4} direction="row" sx={{ color: 'action.active' }}>
                                  <Badge color="secondary" badgeContent={0} showZero>
                                        <FaRegHeart className="text-xl"/>
                                    </Badge>
                                </Stack>
                                </IconButton>
                               </Tooltip>
                            </li>
                            <li>
                                <Tooltip title="Cart">
                               <IconButton>
                                <Stack spacing={4} direction="row" sx={{ color: 'action.active' }}>
                                  <Badge color="secondary" badgeContent={0} showZero>
                                        <MdOutlineShoppingCart className="text-xl"/>
                                    </Badge>
                                </Stack>
                                </IconButton>
                               </Tooltip>
                            </li>
                        </ul>
                    </div>

                </div>
            </div>
            {/* Navigation */}
            <Navigation/>
        </header>
    );
};

export default Header;