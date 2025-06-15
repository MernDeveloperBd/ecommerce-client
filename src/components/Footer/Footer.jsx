import { LiaShippingFastSolid } from "react-icons/lia";
import { PiKeyReturn } from "react-icons/pi";
import { TbWallet } from "react-icons/tb";
import { LiaGiftSolid } from "react-icons/lia";
import { BiSupport } from "react-icons/bi";
import FooterBottom from "./FooterBottom";
import SocialIcons from "./SocialIcons";
import Drawer from '@mui/material/Drawer';
import { IoCloseSharp } from "react-icons/io5";
import { useContext } from "react";
import { MyContext } from "../../App";
import CartPanel from "../CartPanel/CartPanel";



const Footer = () => {
    const{openCartModal,toggleCartModal} = useContext(MyContext)
    return (
        <>
        <div className=" t-8 bg-white">
            <footer>
                <div className="container py-12">
                    <div className="flex items-center  justify-center gap-12 ">
                        <div className="col flex items-center justify-center flex-col group">
                            <LiaShippingFastSolid className="text-[50px] group-hover:text-red-500 transition-all duration-300 group-hover:translate-x-1" />
                            <h3 className="text-[18px] font-[600]">Free shipping</h3>
                            <p className="text-[14px] font-[500] text-[rgba(0,0,0,0.7)]">For all orders over TK 2000</p>
                        </div>
                        <div className="col flex items-center justify-center flex-col group">
                            <PiKeyReturn className="text-[50px] group-hover:text-red-500 transition-all duration-300 group-hover:translate-x-1" />
                            <h3 className="text-[18px] font-[600]">15 Days Returns</h3>
                            <p className="text-[14px] font-[500] text-[rgba(0,0,0,0.7)]">For an exchange Products</p>
                        </div>
                        <div className="col flex items-center justify-center flex-col group">
                            <TbWallet className="text-[50px] group-hover:text-red-500 transition-all duration-300 group-hover:translate-x-1" />
                            <h3 className="text-[18px] font-[600]">Secure payments</h3>
                            <p className="text-[14px] font-[500] text-[rgba(0,0,0,0.7)]">Now is only Cash on delivery</p>
                        </div>
                        <div className="col flex items-center justify-center flex-col group">
                            <LiaGiftSolid className="text-[50px] group-hover:text-red-500 transition-all duration-300 group-hover:translate-x-1" />
                            <h3 className="text-[18px] font-[600]">Special Gifts</h3>
                            <p className="text-[14px] font-[500] text-[rgba(0,0,0,0.7)]">On first product order</p>
                        </div>
                        <div className="col flex items-center justify-center flex-col group">
                            <BiSupport className="text-[50px] group-hover:text-red-500 transition-all duration-300 group-hover:translate-x-1" />
                            <h3 className="text-[18px] font-[600]">Support 24/7</h3>
                            <p className="text-[14px] font-[500] text-[rgba(0,0,0,0.7)]">Contact Us anytyme</p>
                        </div>

                    </div>
                    <hr className="my-8"/>
                    <FooterBottom/>
                </div>
            </footer>
                <SocialIcons/>
        </div>
        
             {/* Cart */}
      <Drawer open={openCartModal} onClose={toggleCartModal(false)} anchor={'right'} className='cartPanel'>
        <div className="flex items-center justify-between py-3 px-4 gap-3 border border-b border-[rgba(0,0,0,0.1) overflow-hidden]">
          <h4 className='text-xl font-semibold'>Shopping Cart</h4>
          <IoCloseSharp className='text-[20px] cursor-pointer' onClick={toggleCartModal(false)} />
        </div>
        {/* cart product panel */}
        <CartPanel/>
      </Drawer>
        </>
    );
};

export default Footer;