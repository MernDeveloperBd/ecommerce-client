import { LiaShippingFastSolid } from "react-icons/lia";
import { PiKeyReturn } from "react-icons/pi";
import { TbWallet } from "react-icons/tb";
import { LiaGiftSolid } from "react-icons/lia";
import { BiSupport } from "react-icons/bi";
import FooterBottom from "./FooterBottom";
import SocialIcons from "./SocialIcons";
import Drawer from '@mui/material/Drawer';
import { IoCloseSharp } from "react-icons/io5";
import { useContext } from 'react';
import { MyContext } from "../../App";
import CartPanel from "../CartPanel/CartPanel";

const Footer = () => {
    const { openCartModal, toggleCartModal } = useContext(MyContext);

    const footerItems = [
        {
            icon: <LiaShippingFastSolid />,
            title: "Free shipping",
            desc: "For all orders over TK 3000"
        },
        {
            icon: <PiKeyReturn />,
            title: "15 Days Returns",
            desc: "For an exchange Products"
        },
        {
            icon: <TbWallet />,
            title: "Secure payments",
            desc: "Now is only Cash on delivery"
        },
        {
            icon: <LiaGiftSolid />,
            title: "Special Gifts",
            desc: "On first product order"
        },
        {
            icon: <BiSupport />,
            title: "Support 24/7",
            desc: "Contact Us anytyme"
        }
    ];

    return (
        <>
            <div className="bg-white">
                <footer>
                    <div className="container mx-auto px-0 py-12">
                        {/* Footer Top */}
                        <div className="grid grid-cols-2 md:grid-cols-5 justify-center gap-2 md:gap-6">
                            {footerItems.map((item, idx) => (
                                <div key={idx} className="group relative w-[150px] sm:w-[170px] md:w-[230px]">
                                    {/* Gradient border frame */}
                                    <div className="relative overflow-hidden rounded-2xl p-[1.2px] bg-gradient-to-tr from-violet-300/60 via-fuchsia-300/60 to-rose-300/60 transition-colors duration-300 group-hover:from-violet-400/80 group-hover:via-fuchsia-400/80 group-hover:to-rose-400/80">
                                        {/* Glassy card */}
                                        <div className="relative h-full rounded-2xl bg-white/80 backdrop-blur-xl p-4 md:p-5 ring-1 ring-slate-200/70 shadow-[0_2px_12px_rgba(0,0,0,0.05)] transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-[0_16px_40px_rgba(139,92,246,0.18)]">
                                            {/* Soft aurora glows */}
                                            <div className="pointer-events-none absolute -top-12 -right-12 h-24 w-24 rounded-full bg-violet-400/10 blur-2xl" />
                                            <div className="pointer-events-none absolute -bottom-12 -left-12 h-24 w-24 rounded-full bg-rose-400/10 blur-2xl" />

                                            <div className="flex flex-col items-center text-center">
                                                {/* Icon with conic gradient ring */}
                                                <div className="relative mx-auto mb-3">
                                                    <div
                                                        className="rounded-full p-[2px]"
                                                        style={{
                                                            background:
                                                                'conic-gradient(from 180deg at 50% 50%, #8b5cf6, #ec4899, #f97316, #8b5cf6)',
                                                        }}
                                                    >
                                                        <div className="grid h-16 w-16 md:h-20 md:w-20 place-items-center rounded-full bg-white text-[36px] md:text-[42px] text-slate-900 ring-1 ring-slate-200/70 transition-colors duration-300 group-hover:text-violet-700">
                                                            {item.icon}
                                                        </div>
                                                    </div>
                                                    {/* Hover glow */}
                                                    <span
                                                        aria-hidden
                                                        className="pointer-events-none absolute inset-x-8 -bottom-1 h-8 rounded-full bg-violet-400/25 blur-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                                                    />
                                                </div>

                                                {/* Title */}
                                                <h3 className="text-base md:text-lg font-semibold tracking-tight text-slate-900">
                                                    {item.title}
                                                </h3>

                                                {/* Accent line */}
                                                <div className="mx-auto mt-1 mb-1.5 h-[2px] w-10 rounded-full bg-gradient-to-r from-violet-500 via-fuchsia-500 to-rose-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                                                {/* Description */}
                                                <p className="text-sm md:text-[14px] font-medium text-gray-600">
                                                    {item.desc}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <hr className="my-8 border-gray-300" />

                        {/* Footer Bottom */}
                        <FooterBottom />
                    </div>
                </footer>

                {/* Social Icons */}
                <SocialIcons />
            </div>

            {/* Cart Drawer */}
            <Drawer
                open={openCartModal}
                onClose={toggleCartModal(false)}
                anchor={'right'}
                PaperProps={{ sx: { width: { xs: '100%', sm: 400 } } }}
            >
                <div className="flex items-center justify-between py-3 px-4 border-b border-gray-200">
                    <h4 className='text-xl font-semibold'>Shopping Cart</h4>
                    <IoCloseSharp className='text-2xl cursor-pointer' onClick={toggleCartModal(false)} />
                </div>
                {/* Cart products */}
                <CartPanel />
            </Drawer>
        </>
    );
};

export default Footer;
