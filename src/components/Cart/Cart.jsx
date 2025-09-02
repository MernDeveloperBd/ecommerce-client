import { Button } from "@mui/material";
import { BsFillBagCheckFill } from "react-icons/bs";
import CartItems from "./CartItems";
import { Link } from "react-router-dom";


const Cart = () => {

    return (
        <section className="section py-5 pb-10">
            <div className="container md:w-[80%]  flex flex-col md:flex-row gap-2">
                {/* left side */}
                <div className="leftPart md:w-[70%]">
                    <div className="shadow-m rounded-md bg-white">
                        <div className="py-2 px-3 border-b border-[rgba(0,0,0,0.2)]">
                            <h2 className="text-xl font-bold">Your Cart</h2>
                            <p>There are <span className="font-bold text-primary">2</span> Products in your cart</p>
                        </div>
                        {/*cart main box  */}
                        <CartItems size={'S'} qty={1}/>

                    </div>
                </div>
                {/* Right side */}
                <div className="rightPart md:w-[30%]">
                    <div className="shadow-md rounded-md bg-white p-5 space-y-3">
                        <h3 className="pb-3">Cart Totals</h3>
                        <hr />
                        <p className="flex items-center justify-between mt-2">
                            <span className="text-[14px] font-[500]">Subtotal</span>
                            <span className="text-primary font-bold">Tk <span>1520</span></span>
                        </p>
                        <p className="flex items-center justify-between">
                            <span className="text-[14px] font-[500]">Shipping</span>
                            <span className="font-bold">Free</span>
                        </p>
                        <p className="flex items-center justify-between">
                            <span className="text-[14px] font-[500]">Estimated for</span>
                            <span className="font-bold">Locaion</span>
                        </p>
                        <p className="flex items-center justify-between">
                            <span className="text-[14px] font-[500]">Total</span>
                            <span className="text-primary font-bold">Tk <span>1820</span></span>
                        </p>
                        <Link to='/checkout'>
                        <Button className="bg-btn hover:bg-btn w-full flex gap-1"><BsFillBagCheckFill className="text-[16px]" />Checkout</Button></Link>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default Cart;