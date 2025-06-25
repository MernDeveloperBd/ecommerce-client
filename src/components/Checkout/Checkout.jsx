import { Button } from '@mui/material';
import TextField from '@mui/material/TextField';
import { BsFillBagCheckFill } from 'react-icons/bs';

const Checkout = () => {
    return (
        <section className="py-10 ">
            <div className="container flex gap-5">
                {/* left */}
                <div className="left w-[70%]">
                    <div className="card bg-white shadow-md p-5 rounded-md w-full">
                        <h1 className='text-[18px] font-bold'>Billing Details</h1>
                        <form className="w-full mt-5">
                            <div className="flex items-center gap-5 pb-3">
                                <div className="col w-[50%]">
                                    <TextField id="outlined-basic" className='w-full' label="Full Name" variant="outlined" size='small' required />
                                </div>
                                <div className="col w-[50%]">
                                    <TextField id="outlined-basic" className='w-full' label="Email" variant="outlined" size='small' required />
                                </div>
                            </div>
                            <h4 className='text-[14px] font-[500] mb-3'>Street Address *</h4>
                            <div className="flex items-center gap-5 pb-3">
                                <div className="col w-full">
                                    <TextField id="outlined-basic" className='w-full' label="Your full address" variant="outlined" size='small' required />
                                </div>
                            </div>
                            <div className="flex items-center gap-5 pb-3">
                                <div className="col w-full">
                                    <TextField id="outlined-basic" className='w-full' label="Apartment, suite,unit etc(optional)" variant="outlined" size='small' />
                                </div>
                            </div>
                            {/* city */}
                            <div className="flex items-center gap-5 pb-3">
                                <div className="col w-[50%]">
                                    <TextField id="outlined-basic" className='w-full' label="Town / City" variant="outlined" size='small' required />
                                </div>
                                <div className="col w-[50%]">
                                    <TextField id="outlined-basic" className='w-full' label="Town / City" variant="outlined" size='small' required />
                                </div>
                            </div>
                            {/* zip code */}
                            <h4 className='text-[14px] font-[500] mb-3'>Postcode / Zip *</h4>
                            <div className="flex items-center gap-5 pb-3">
                                <div className="col w-full">
                                    <TextField id="outlined-basic" className='w-full' label="Postcode / Zip" variant="outlined" size='small' required />
                                </div>
                            </div>
                            <h4 className='text-[14px] font-[500] mb-3'>Phone Number *</h4>
                            <div className="flex items-center gap-5 pb-3">
                                <div className="col w-full">
                                    <TextField id="outlined-basic" className='w-full' label="Phone Number" variant="outlined" size='small' required />
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                {/* right */}
                <div className="rightCol w-[30%]">
                    <div className="card shadow-md bg-white p-5 rounded-md">
                        <h2 className='text-[18px] font-bold mb-4'>Your Order</h2>
                        <div className='flex items-center justify-between py-3 border-y border-[rgba(0,0,0,0.1)]'>
                            <span className='text-[14px] font-[600]'>Product</span>
                            <span className='text-[14px] font-[600]'>Subtotal</span>
                        </div>
                        {/*  */}
                        <div className="scrollSm max-h-[250px] overflow-y-scroll overflow-x-hidden pr-2 mb-5">
                            {/*  */}
                            <div className="flex items-center justify-between py-2">
                                <div className="part1 flex items-center gap-3">
                                    <div className="img w-[50px] h-[50px] object-cover overflow-hidden rounded-md group cursor-pointer">
                                        <img src="https://i.ibb.co/dxfD53n/Digital-Print-Lone-Three-Piece-7-kenakatabazar-bd.jpg" alt="" className='w-full transition-all group-hover:scale-105' />
                                    </div>
                                    {/* info */}
                                    <div className="info">
                                        <h4 className='text-[14px]'>Product title</h4>
                                        <p className='text-[14px]'>Qty: <span>1</span></p>
                                    </div>
                                </div>
                                <span className='text-[14px] font-[500] text-primary'>TK <span>1250</span></span>
                            </div>
                            <div className="flex items-center justify-between py-2">
                                <div className="part1 flex items-center gap-3">
                                    <div className="img w-[50px] h-[50px] object-cover overflow-hidden rounded-md group cursor-pointer">
                                        <img src="https://i.ibb.co/dxfD53n/Digital-Print-Lone-Three-Piece-7-kenakatabazar-bd.jpg" alt="" className='w-full transition-all group-hover:scale-105' />
                                    </div>
                                    {/* info */}
                                    <div className="info">
                                        <h4 className='text-[14px]'>Product title</h4>
                                        <p className='text-[14px]'>Qty: <span>1</span></p>
                                    </div>
                                </div>
                                <span className='text-[14px] font-[500] text-primary'>TK <span>1250</span></span>
                            </div>
                            <div className="flex items-center justify-between py-2">
                                <div className="part1 flex items-center gap-3">
                                    <div className="img w-[50px] h-[50px] object-cover overflow-hidden rounded-md group cursor-pointer">
                                        <img src="https://i.ibb.co/dxfD53n/Digital-Print-Lone-Three-Piece-7-kenakatabazar-bd.jpg" alt="" className='w-full transition-all group-hover:scale-105' />
                                    </div>
                                    {/* info */}
                                    <div className="info">
                                        <h4 className='text-[14px]'>Product title</h4>
                                        <p className='text-[14px]'>Qty: <span>1</span></p>
                                    </div>
                                </div>
                                <span className='text-[14px] font-[500] text-primary'>TK <span>1250</span></span>
                            </div>
                            <div className="flex items-center justify-between py-2">
                                <div className="part1 flex items-center gap-3">
                                    <div className="img w-[50px] h-[50px] object-cover overflow-hidden rounded-md group cursor-pointer">
                                        <img src="https://i.ibb.co/dxfD53n/Digital-Print-Lone-Three-Piece-7-kenakatabazar-bd.jpg" alt="" className='w-full transition-all group-hover:scale-105' />
                                    </div>
                                    {/* info */}
                                    <div className="info">
                                        <h4 className='text-[14px]'>Product title</h4>
                                        <p className='text-[14px]'>Qty: <span>1</span></p>
                                    </div>
                                </div>
                                <span className='text-[14px] font-[500] text-primary'>TK <span>1250</span></span>
                            </div>
                        </div>
                        <Button className='bg-btn hover:bg-btn w-full flex items-center gap-2'><BsFillBagCheckFill className='text-[20px]'/> Checkout</Button>

                    </div>
                </div>
            </div>
        </section>
    );
};

export default Checkout;