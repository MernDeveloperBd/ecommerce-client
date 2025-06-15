import { Link } from "react-router-dom";
import { FaSquareWhatsapp } from "react-icons/fa6";
import { IoChatboxOutline } from "react-icons/io5";
import { Button } from "@mui/material";
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

const FooterBottom = () => {
    return (
        <div className="footer flex pt-8">
            <div className="part1 w-[25%] border-r border-black">
                <h2 className="text-[24px] font-[600] mb-2">Contact us</h2>
                <p className="text-[18px] font-[500] text-blue-600">Haramain Khushbo</p>
                <p className=" text-[rgba(0,0,0,0.8)]">Molla Complex, Sher-e-bangla Road</p>
                <p className="pb-1 text-[rgba(0,0,0,0.8)]">Nirala more, Khulna</p>
                <Link className="link" to="mailto:haramainshop@gmail.com">haramainshop@gmail.com</Link>
                <div className="flex items-center gap-1 mt-1">
                    <Link to="https://wa.me/8801793000111" className="text-2xl text-green-600"><FaSquareWhatsapp /></Link>
                    <Link to="https://wa.me/8801793000111"><p className="text-[16px] font-[600] pb-1 text-red-600">+880-1793-000111</p></Link>
                </div>
                <div className="flex items-center gap-2">
                    <IoChatboxOutline className="text-4xl text-red-600" />
                    <div>
                        <h4 className="text-[20px] font-[600]">Online Chat</h4>
                        <h4 className="text-[20px] font-[500]">Get Expert Help</h4>
                    </div>
                </div>
            </div>
            {/* part 2 */}
            <div className="part1 flex  w-[40%] pl-8">
                <div className="w-[50%]">
                    <h2 className="text-[24px] font-[600] mb-2">Products</h2>
                    <ul className="space-y-1">
                        <li><Link to='/' className="link transition-all">New Products </Link></li>
                        <li><Link to='/' className="link transition-all">Featured Products </Link></li>
                        <li><Link to='/' className="link transition-all">Latest Products </Link></li>
                        <li><Link to='/' className="link transition-all">Best sales </Link></li>
                        <li><Link to='/' className="link transition-all">Contact us </Link></li>
                        <li><Link to='/' className="link transition-all">sitemap </Link></li>
                    </ul>
                </div>
                <div className="w-[50%]">
                    <h2 className="text-[24px] font-[600] mb-2">Our Shop</h2>
                    <ul className="space-y-1">
                        <li><Link to='/' className="link transition-all">Delivery</Link></li>
                        <li><Link to='/' className="link transition-all">Legal notice </Link></li>
                        <li><Link to='/' className="link transition-all">T & C </Link></li>
                        <li><Link to='/' className="link transition-all">About Us </Link></li>
                        <li><Link to='/' className="link transition-all">Secure Payment </Link></li>
                        <li><Link to='/' className="link transition-all">Login </Link></li>
                    </ul>
                </div>
            </div>
            {/* part 3 */}
            <div className="part1 flex  w-[35%] pl-8">
                <div className="">
                    <h2 className="text-[24px] font-[600] mb-2">Subscribe to newsletter</h2>
                    <p className="text-[16px] font-[400]">Subscribe to our latest newsletter to get news about special discounts</p>
                    <form className="mt-3">
                        <input type="text" className="w-full h-[35px] border outline-none rounded-md px-2" placeholder="your email" />
                        <Button className="btn-subscribe !mt-2 ">Subscribe</Button>
                       <div>
                        <FormControlLabel control={<Checkbox defaultChecked />} label="I agree the terms and conditions" />
                       </div>
                    </form>
                </div>
                
            </div>
                  


        </div>
    );
};

export default FooterBottom;