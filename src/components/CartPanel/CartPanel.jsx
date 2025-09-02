import { Button } from "@mui/material";
import { useContext } from "react";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import { MyContext } from "../../App";


const CartPanel = () => {
    const{toggleCartModal} = useContext(MyContext)
    
    return (
        <>           
                <div className="scroll w-full overflow-y-scroll overflow-x-hidden py-3 px-4 flex-1 max-h-[350px]">
                 
                    {/* 1st cart */}
                    <div className="flex gap-2 border-b border-[rgba(85,53,53,0.4)] pb-2 mb-2">
                        <div className="cartItem w-full flex items-center gap-3 ">
                            <div className="img w-[25%] h-[90px] overflow-hidden rounded-md">
                                <Link to={`/product/title`} className="block group">
                                <img src="https://i.ibb.co/S4sxz04T/Cotton-Print-Panjabi-1-kenakata-bazar-bd.jpg" alt="cart image" className='w-full group-hover:scale-105 transition-all duration-500' /></Link>
                            </div>
                            {/* info */}
                            <div className="info w-[75%] ">
                                <Link className="link" to={`/product/title`}><h4 className="text-xs md:text-sm font-semibold">Product title sdf sdfsdfsd sdfsds dfsd fsdf</h4></Link>
                                <p className="flex items-center gap-5 mt-2">
                                    <p>Qty:<span> 2</span></p>
                                    <p className="text-primary font-bold text-xs md:text-sm">Price: TK<span>1200</span></p>
                                </p>

                            </div>
                        </div>
                        <div className="info w-[5%] flex items-start pt-1"><MdDelete className="link text-[20px] " /></div>
                    </div>
                    {/* 1st cart */}
                    <div className="flex gap-2 border-b border-[rgba(85,53,53,0.4)] pb-2 mb-2">
                        <div className="cartItem w-full flex items-center gap-3 ">
                            <div className="img w-[25%] h-[90px] overflow-hidden rounded-md">
                                <Link to={`/product/title`} className="block group">
                                <img src="https://i.ibb.co/S4sxz04T/Cotton-Print-Panjabi-1-kenakata-bazar-bd.jpg" alt="cart image" className='w-full group-hover:scale-105 transition-all duration-500' /></Link>
                            </div>
                            {/* info */}
                            <div className="info w-[75%] ">
                                <Link className="link" to={`/product/title`}><h4 className="text-xs md:text-sm font-semibold">Product title sdf sdfsdfsd sdfsds dfsd fsdf</h4></Link>
                                <p className="flex items-center gap-5 mt-2">
                                    <p>Qty:<span> 2</span></p>
                                    <p className="text-primary font-bold text-xs md:text-sm">Price: TK<span>1200</span></p>
                                </p>

                            </div>
                        </div>
                        <div className="info w-[5%] flex items-start pt-1"><MdDelete className="link text-[20px] " /></div>
                    </div>
                    {/* 1st cart */}
                    <div className="flex gap-2 border-b border-[rgba(85,53,53,0.4)] pb-2 mb-2">
                        <div className="cartItem w-full flex items-center gap-3 ">
                            <div className="img w-[25%] h-[90px] overflow-hidden rounded-md">
                                <Link to={`/product/title`} className="block group">
                                <img src="https://i.ibb.co/S4sxz04T/Cotton-Print-Panjabi-1-kenakata-bazar-bd.jpg" alt="cart image" className='w-full group-hover:scale-105 transition-all duration-500' /></Link>
                            </div>
                            {/* info */}
                            <div className="info w-[75%] ">
                                <Link className="link" to={`/product/title`}><h4 className="text-xs md:text-sm font-semibold">Product title sdf sdfsdfsd sdfsds dfsd fsdf</h4></Link>
                                <p className="flex items-center gap-5 mt-2">
                                    <p>Qty:<span> 2</span></p>
                                    <p className="text-primary font-bold text-xs md:text-sm">Price: TK<span>1200</span></p>
                                </p>

                            </div>
                        </div>
                        <div className="info w-[5%] flex items-start pt-1"><MdDelete className="link text-[20px] " /></div>
                    </div>
                  
                </div>
                {/* Bottom info */}
                <div className="bottomSec absolute bottom-[10px] left-[0px] w-full overflow-hidden">
                    <div className="bottomInfo py-3 px-4 w-full border-t border-[rgba(0,0,0,0.1)] ">
                        <div className="flex items-center justify-between w-full">
                            <span className="text-[14px] font-[600]">1 item</span>
                            <p className="text-primary font-bold text-xs md:text-sm">TK <span>1200</span></p>
                        </div>
                        <div className="flex items-center justify-between w-full">
                            <span className="text-[14px] font-[600]">Shipping</span>
                            <p className="text-primary font-bold text-xs md:text-sm">TK <span>130</span></p>
                        </div>
                    </div>
                    <div className="bottomInfo py-3 px-4 w-full border-t border-[rgba(0,0,0,0.1)] ">
                        <div className="flex items-center justify-between w-full">
                            <span className="text-[14px] font-[600]">Total (tax excl)</span>
                            <p className="text-primary font-bold text-xs md:text-sm">TK <span>1330</span></p>
                        </div>
                    </div>
                    {/* Button */}
                    <div className="flex gap-2 items-center justify-between w-full px-4">
                        <Link to='/cart' onClick={toggleCartModal(false)} className="w-[50%]"><Button className="bg-btn hover:bg-btn !text-white w-full">View Cart</Button></Link>
                        <Link to='/checkout' onClick={toggleCartModal(false)} className="w-[50%]"><Button className="bg-btn hover:bg-btn !text-white w-full">Checkout</Button></Link>
                    </div>
                </div>

        </>
    );
};

export default CartPanel;