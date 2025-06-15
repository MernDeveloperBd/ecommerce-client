import { Button, Rating } from "@mui/material";
import QuantityBox from "../QuantityBox/QuantityBox";
import { MdOutlineShoppingCart, MdOutlineCompareArrows } from "react-icons/md";
import { FaRegHeart } from "react-icons/fa";
import { useState } from "react";


const ProductDetailsContent = () => {
     const [productActionIndex, setProductActionIndex] = useState(null)
    return (
        
            <div className="space-y-2">
                <h2 className="text-2xl font-semibold">Product Details title Details title Details title</h2>
                <div className="flex items-center gap-2">
                    <h3 className="text-[13px]">Brands: <span className="font-semibold">House of brand</span></h3>
                    <Rating name="size-small" defaultValue={4} size="small" readOnly />
                    <span className="text-[13px]">0 Reviews</span>
                </div>
                <div className="flex items-center gap-4">
                    <p className="flex gap-2 items-center "> <span className="line-through">Price: TK 1500</span><span className="text-red-600 font-semibold">Price: TK 1100</span></p>
                    <p className="text-[rgba(0,0,0,0.7)]">Available in Stock: <span className="text-green-700 font-bold">120 Items</span></p>
                </div>
               
                <p className="text-[14px]">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quo autem velit laudantium fugiat et itaque quas eaque repellat quasi assumenda, sit, suscipit voluptatum, perspiciatis corrupti porro necessitatibus dolore minima accusamus. Earum optio quae, deserunt praesentium veniam quisquam, maxime sequi repellendus officiis perspiciatis beatae adipisci aperiam libero. Minus, autem eligendi atque repudiandae commodi hic. Quas ducimus suscipit, atque earum iste provident blanditiis quo </p>

                <div className="flex gap-2 items-center">
                    <h4>Size:</h4>
                    <div className="flex gap-2 items-center">
                        <button onClick={() => setProductActionIndex(0)} className={`btn ${productActionIndex === 0 ? "bg-primary" : "bg-gray-100 "} px-2 py-1 rounded min-w-[40px]`}>S</button>
                        <button onClick={() => setProductActionIndex(1)} className={`btn ${productActionIndex === 1 ? "bg-primary" : "bg-gray-100 "} px-2 py-1 rounded min-w-[40px]`}>M</button>
                        <button onClick={() => setProductActionIndex(2)} className={`btn ${productActionIndex === 2 ? "bg-primary" : "bg-gray-100 "} px-2 py-1 rounded min-w-[40px]`}>L</button>
                    </div>
                </div>
                <div className="pt-1">
                    <p className="mb-2">Free shipping (Est. Delivery time 2-3 Days)</p>
                    <div className="flex items-center gap-2">
                    <div className="qtyBoxWrapper w-[55px]">
                        <QuantityBox />
                    </div>
                    <div className="flex items-center gap-4 ">
                        <Button className="!bg-orange-600 !text-white flex gap-2 font-bold"><MdOutlineShoppingCart className="text-[22px]" />Add To Cart</Button>
                        {/*  */}
                <div className="flex items-center gap-2 pt-1">
                    <span className="flex items-center gap-2 text-[13px] hover:text-orange-600 cursor-pointer transition-all duration-500 font-[500]"><FaRegHeart className="text-[16px]"/> Add to Wishlist</span>
                    <span className="flex items-center gap-1 text-[13px] hover:text-orange-600 cursor-pointer transition-all duration-500 font-[500]"><MdOutlineCompareArrows className="text-[16px]"/> Add to Compare</span>
                </div>
                    </div>
                </div>
                </div>
                
            </div>
           
       
    );
};

export default ProductDetailsContent;