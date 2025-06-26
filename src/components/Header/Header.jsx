import { Link, useNavigate } from "react-router-dom";
import Search from "./search/Search";
import Stack from '@mui/material/Stack';
import Badge from '@mui/material/Badge';
import { MdOutlineShoppingCart } from "react-icons/md";
import { IoGitCompareSharp } from "react-icons/io5";
import { FaRegHeart, FaRegUser } from "react-icons/fa6";
import Tooltip from '@mui/material/Tooltip';
import { Button, IconButton } from "@mui/material";
import Navigation from "./Navigation/Navigation";
import { useContext, useState } from "react";
import { MyContext } from "../../App";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { BsFillBagCheckFill } from "react-icons/bs";
import { IoIosLogOut, IoMdHeart } from "react-icons/io";
import { fetchDataFromApi } from "../../utils/api";

const Header = () => {
    const { setOpenCartModal, isLogin, setIsLogin, userData } = useContext(MyContext)
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const navigate = useNavigate()
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const logout = () => {
        setAnchorEl(null);
        fetchDataFromApi(`/api/user/logout?token=${localStorage.getItem("accessToken")}`, { withCredentials: true }).then((res) => {
            if (res?.error === false) {
                setIsLogin(false)
                localStorage.removeItem("accessToken");
                localStorage.removeItem("refreshToken");
                // localStorage.removeItem("actionType")
                navigate('/')
            }

        })
    }

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
                            <h2 className="text-2xl font-semibold">Haramain <span className="text-primary">Khushbo</span></h2>
                        </Link>
                    </div>
                    <div className="col2 w-[35%]">
                        <Search />
                    </div>
                    <div className="col2 w-[35%] flex items-center pl-5">
                        <ul className="flex items-center justify-end gap-2 w-full">
                            {
                                isLogin === false ? <li className="list-none">

                                    <Link to="/login" className="hover:text-linkHover transition text-[15px] font-[500]">Login</Link> / <Link to="/register" className="hover:text-linkHover transition text-[15px] font-[500]">Register</Link>
                                </li> :
                                    <>
                                        <Button onClick={handleClick} className="myAccountWrap flex items-center gap-3 cursor-pointer ">
                                            <Button className="!w-[35px] !h-[35px] !min-w-[35px] !rounded-full !bg-[#f1f1f1]"><FaRegUser className="text-[16px] text-[#000]" /></Button>
                                            <div className="info flex flex-col">
                                                <h4 className="text-[14px] font-bold text-[rgba(0,0,0,0.7)] mb-0 text-left justify-start leading-4">{userData?.name}</h4>
                                                <span className="text-[11px] text-left justify-start">{userData?.email}</span>

                                            </div>
                                        </Button>
                                        {/* menu*/}
                                        <Menu
                                            anchorEl={anchorEl}
                                            id="account-menu"
                                            open={open}
                                            onClose={handleClose}
                                            onClick={handleClose}
                                            slotProps={{
                                                paper: {
                                                    elevation: 0,
                                                    sx: {
                                                        overflow: 'visible',
                                                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                                        mt: 1.5,
                                                        '& .MuiAvatar-root': {
                                                            width: 32,
                                                            height: 32,
                                                            ml: -0.5,
                                                            mr: 1,
                                                        },
                                                        '&::before': {
                                                            content: '""',
                                                            display: 'block',
                                                            position: 'absolute',
                                                            top: 0,
                                                            right: 14,
                                                            width: 10,
                                                            height: 10,
                                                            bgcolor: 'background.paper',
                                                            transform: 'translateY(-50%) rotate(45deg)',
                                                            zIndex: 0,
                                                        },
                                                    },
                                                },
                                            }}
                                            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                                            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                                        >
                                            <Link to='/my-account'>
                                                <MenuItem onClick={handleClose} className="flex gap-2 !py-2">
                                                    <FaRegUser className="text-[16px]" /> <span className="text-[14px]">My account</span>
                                                </MenuItem></Link>
                                            <Link to='/my-list'>
                                                <MenuItem onClick={handleClose} className="flex gap-2 !py-2">
                                                    <IoMdHeart className="text-[16px]" /> <span className="text-[14px]">My Lists</span>
                                                </MenuItem>
                                            </Link>
                                            <Link to='/my-orders'>
                                                <MenuItem onClick={handleClose} className="flex gap-2 !py-2">
                                                    <BsFillBagCheckFill className="text-[16px]" /> <span className="text-[14px]">Orders</span>
                                                </MenuItem>
                                            </Link>

                                            <Link to='/logout'>
                                                <MenuItem onClick={logout} className="flex gap-2 !py-2">
                                                    <IoIosLogOut className="text-[16px]" /> <span className="text-[14px]">Logout</span>
                                                </MenuItem>
                                            </Link>
                                        </Menu>
                                    </>
                            }

                            <li>|</li>
                            <li>
                                <Tooltip title="Compare">
                                    <IconButton>
                                        <Stack spacing={4} direction="row" sx={{ color: 'action.active' }}>
                                            <Badge color="secondary" badgeContent={0} showZero>
                                                <IoGitCompareSharp className="text-xl" />
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
                                                <FaRegHeart className="text-xl" />
                                            </Badge>
                                        </Stack>
                                    </IconButton>
                                </Tooltip>
                            </li>
                            <li>
                                <Tooltip title="Cart">
                                    <IconButton onClick={() => setOpenCartModal(true)}>
                                        <Stack spacing={4} direction="row" sx={{ color: 'action.active' }}>
                                            <Badge color="secondary" badgeContent={0} showZero>
                                                <MdOutlineShoppingCart className="text-xl" />
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
            <Navigation />
        </header>
    );
};

export default Header;