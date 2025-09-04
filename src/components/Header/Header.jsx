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
import { FiHelpCircle, FiTruck, FiUploadCloud, FiUser } from "react-icons/fi";


const Header = () => {
    const { setOpenCartModal, isLogin, setIsLogin, userData, cartData, setUserData, setCartData} = useContext(MyContext)
    const [anchorEl, setAnchorEl] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
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
                localStorage.removeItem("actionType")
                setUserData(null)
                setCartData([])
                navigate('/')
            }

        })
    }

    return (
        <header className="bg-white sticky -top-[90px] md:-top-[60px] z-50 shadow-md py-1">
            <div className="top-strip py-1 ">
                <div className=" ">
                    <div className="relative bg-gradient-to-r from-gray-50 via-white to-gray-50 text-gray-700 text-xs md:text-sm border-b border-gray-200/70">
                        <div className="container mx-auto">
                            <div className="py-1.5 flex flex-col md:flex-row md:items-center md:justify-between gap-2">

                                {/* Left - Offer (md+: half width) */}
                                <div className="flex items-center gap-2 md:w-1/2 md:pr-3">

                                    {/* Desktop: marquee inside half width */}
                                    <div className=" relative w-full">
                                        {/* Fade edges */}
                                        <span className="pointer-events-none absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-white to-transparent" />
                                        <span className="pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-white to-transparent" />

                                        {/* Marquee container */}
                                        <div className="marq overflow-hidden h-7 flex items-center">
                                            <div className="marq-track flex items-center gap-8 whitespace-nowrap hover:[animation-play-state:paused]">
                                                {/* items 1x */}
                                                <span className="text-gray-600">
                                                    Get up to <span className="font-semibold text-gray-900">10% discount</span> on first buy.
                                                    <span className="ml-1 font-medium text-gray-900">Limited time only</span>
                                                </span>
                                                {/* আরও লেখা যোগ করুন */}
                                                <span className="text-gray-600">
                                                    Use code <span className="font-semibold text-violet-700">WELCOME10</span>
                                                </span>
                                                <span className="text-gray-600">
                                                    Free delivery on orders over <span className="font-semibold text-gray-900">TK 3000</span>
                                                </span>
                                                <span className="text-gray-600">
                                                    এক প্ল্যাটফর্মে কিনুন  <span className="font-semibold text-gray-900">ও বিক্রি করুন</span>
                                                </span>

                                                {/* items 2x (continuous loop-এর জন্য duplicate) */}
                                                <span className="text-gray-600">
                                                    Get up to <span className="font-semibold text-gray-900">10% discount</span> on first buy.
                                                    <span className="ml-1 font-medium text-gray-900">Limited time only</span>
                                                </span>
                                                <span className="text-gray-600">
                                                    Use code <span className="font-semibold text-violet-700">WELCOME10</span>
                                                </span>
                                                <span className="text-gray-600">
                                                    Free delivery on orders over <span className="font-semibold text-gray-900">TK 3000</span>
                                                </span>

                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Right - Links (md+: half width, right aligned) */}
                                <div className="w-full md:w-1/2">
                                    <ul className="flex items-center justify-center md:justify-end gap-2 sm:gap-4 text-center md:text-left">
                                        <li className="hidden md:block " >
                                            <Link
                                                to="/help-center"
                                                className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md transition-colors hover:text-primary hover:bg-primary/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
                                            >
                                                <FiHelpCircle className="text-sm opacity-80" />
                                                Help Center
                                            </Link>
                                        </li>

                                        <li className="hidden md:block h-4 w-px bg-gray-300/70" aria-hidden="true" />
                                        <li className="hidden md:block " >
                                            <Link
                                                to="/order-tracking"
                                                className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md transition-colors hover:text-primary hover:bg-primary/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
                                            >
                                                <FiTruck className="text-sm opacity-80" />
                                                Order Tracking
                                            </Link>
                                        </li>

                                        <li className="hidden sm:block h-4 w-px bg-gray-300/70" aria-hidden="true" />

                                        <li>
                                            <Link
                                                to="/my-account"
                                                className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md transition-colors hover:text-primary hover:bg-primary/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
                                            >
                                                <FiUser className="text-sm opacity-80" />
                                                My Account
                                            </Link>
                                        </li>

                                        {/* Divider before CTA */}
                                        <li className="hidden sm:block h-4 w-px bg-gray-300/70" aria-hidden="true" />

                                        {/* New CTA: Post product / Sell */}
                                        <>
                                            {/* Button */}
                                            <li title="upcoming">
                                                <button
                                                    onClick={() => setIsOpen(true)}
                                                    className="inline-flex items-center gap-1.5 px-2 py-1.5 rounded-full
          bg-gradient-to-r from-violet-500 to-rose-400 text-white
          font-semibold shadow-sm transition hover:opacity-95
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400/40"
                                                    aria-label="Post your product"
                                                >
                                                    <FiUploadCloud className="text-sm" />
                                                    Become a Seller
                                                </button>
                                            </li>

                                            {/* Modal */}
                                            {isOpen && (
                                                <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-[90]">
                                                    <div className="bg-gradient-to-r from-violet-100 to-rose-100 p-8 rounded-3xl shadow-2xl max-w-md w-full text-center relative animate-fadeIn">
                                                        {/* Icon / Emoji */}
                                                        <div className="w-16 h-16 flex items-center justify-center mx-auto rounded-full bg-gradient-to-r from-violet-600 to-rose-500 text-white text-3xl shadow-md mb-4">
                                                            🚀
                                                        </div>

                                                        {/* Title */}
                                                        <h2 className="text-2xl font-extrabold text-gray-900 mb-3">
                                                            ✨ Coming Soon ✨
                                                        </h2>

                                                        {/* Message */}
                                                        <p className="text-gray-700 leading-relaxed font-medium">
                                                            আমরা আপনার জন্য <span className="text-violet-600 font-semibold">Reselling করার দারুণ সুযোগ</span>
                                                            নিয়ে আসছি 💡
                                                            <br />
                                                            অনুগ্রহ করে একটু অপেক্ষা করুন 🙂
                                                        </p>

                                                        {/* Button */}
                                                        <button
                                                            onClick={() => setIsOpen(false)}
                                                            className="mt-6 px-6 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-rose-500 
                 text-white font-semibold shadow-md hover:scale-105 hover:shadow-lg 
                 transition-all duration-300 ease-in-out"
                                                        >
                                                            Got it!
                                                        </button>
                                                    </div>
                                                </div>

                                            )}
                                        </>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            {/* menu */}
            <div className="header py-1 border border-b-[1px]">
                <div className="container flex flex-col md:flex-row md:items-start md:justify-between gap-2">
                    <div className="col1 w-full md:w-[30%] ">
                        <Link to={'/'} className="flex items-center justify-center md:justify-start gap-2">
                            <img src="https://res.cloudinary.com/dqokqca8p/image/upload/v1756018288/My%20Brand/Misam_Marifa_Fashion_World_jkz3o8.png" alt="logo" className="w-8 md:w-8 h-8 md:h-8 rounded-full" />
                            <h2 className="!text-sm md:!text-xl !font-semibold">MM Fashion <span className="text-primary">World</span></h2>
                        </Link>
                    </div>
                    <div className="col2 w-full md:w-[30%] hidden md:block">
                        <Search />
                    </div>
                    <div className="col2 md:w-[40%] flex items-center pl-0 md:pl-5">
                        <ul className="flex items-center justify-end gap-2 w-full">
                            {
                                isLogin === false ? <li className="list-none">

                                    <Link to="/login" className="logInReg-link">Login</Link> / <Link to="/register" className="logInReg-link">Register</Link>
                                </li> :
                                    <>
                                        <Button onClick={handleClick} className="myAccountWrap flex items-center gap-2 cursor-pointer ">
                                            <Button className="!w-[35px] !h-[35px] !min-w-[35px] !rounded-full !bg-[#f1f1f1]">{userData ? <img src={userData?.avatar} alt="user_image" className="!w-[35px] !h-[35px] !min-w-[35px] rounded-full object-cover" /> : <FaRegUser className="text-[16px] text-[#000]" />}</Button>
                                            <div className="info flex flex-col">
                                                <h4 className="text-[10px] md:text-[12px] font-bold text-[rgba(0,0,0,0.7)] mb-0 text-left justify-start leading-4">{userData?.name}</h4>
                                                <span className="text-[9px] md:text-[11px] text-left justify-start">{userData?.email}</span>

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
                            <div className="flex flex-wrap md:flex-row">
                                <li className="hidden md:block">
                                    <Tooltip title="Compare">
                                        <IconButton>
                                            <Stack spacing={2} direction="row" sx={{ color: 'action.active' }}>
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
                                            <Stack spacing={1} direction="row" sx={{ color: 'action.active' }}>
                                                <Badge color="secondary" badgeContent={2} showZero>
                                                    <FaRegHeart className="text-xl" />
                                                </Badge>
                                            </Stack>
                                        </IconButton>
                                    </Tooltip>
                                </li>
                                <li>
                                    <Tooltip title="Cart">
                                        <IconButton onClick={() => setOpenCartModal(true)}>
                                            <Stack spacing={1} direction="row" sx={{ color: 'action.active' }}>
                                                <Badge color="secondary" badgeContent={cartData?.length} showZero>
                                                    <MdOutlineShoppingCart className="text-xl" />
                                                </Badge>
                                            </Stack>
                                        </IconButton>
                                    </Tooltip>
                                </li>
                            </div>
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