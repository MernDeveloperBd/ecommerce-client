import Button from "@mui/material/Button";
import AvailabilityCollaspe from "../AvailabilityCollaspe/AvailabilityCollaspe";
import CategoryCollapse2 from "../CategoryCollapse/CategoryCollapse2";
import ColorCollaspe from "../ColorCollaspe/ColorCollaspe";
import SizeCollaspe from "../SizeCollaspe/SizeCollaspe";
import RangeSlider from 'react-range-slider-input';
import 'react-range-slider-input/dist/style.css';
import { useState } from "react";
import Rating from "@mui/material/Rating";


const Sidebar = () => {
    const [isOpenSizeFIleter, setIsOpenSizeFIlter] = useState(true)
    return (
        <aside className="sidebar py-5 space-y-4">
            <div className="box">
                <h3 className="mb-2 text-[16px] font-[600] ">Shop by categories</h3>
                <div className="scroll">
                    {/* <CategoryCollapse/> try it */}
                    <CategoryCollapse2 />
                </div>
            </div>
            <div className="box">
                <h3 className="mb-2 text-[16px] font-[600] ">Shop by Size</h3>
                <div className="scroll">
                    {/* <CategoryCollapse/> try it */}
                    <SizeCollaspe />
                </div>
            </div>
            <div className="box">
                <h3 className="mb-2 text-[16px] font-[600] ">Shop by Size</h3>
                <div className="scroll">
                    {/* <CategoryCollapse/> try it */}
                    <ColorCollaspe />
                </div>
            </div>
            <div className="box">
                <h3 className="mb-2 text-[16px] font-[600] ">Filter by price</h3>
                <div className="scroll">
                    <Button onClick={() => setIsOpenSizeFIlter(!isOpenSizeFIleter)}
                        className="!w-[70%] !h-[2px] !min-w-[70%] !rounded-full !text-black">
                        <RangeSlider />                      

                    </Button>
                    <div className="flex pt-2 pb-2 priceRange w-[80%] text-[13px]">
                            <span>From:<strong className="text-dark">TK 50</strong></span>
                            <span className="ml-auto">To:<strong className="text-dark">TK 5000</strong></span>
                        </div>

                </div>
            </div>
            <div className="box">
                <h3 className="mb-2 text-[16px] font-[600] ">Filter by ratings</h3>
                <div className="">
                    <Rating name="size-small" defaultValue={5} size="small" readOnly/>  
                </div>
                <div className="">
                    <Rating name="size-small" defaultValue={4} size="small" readOnly/>  
                </div>
                <div className="">
                    <Rating name="size-small" defaultValue={3}size="small" readOnly/>  
                </div>
                <div className="">
                    <Rating name="size-small" defaultValue={2} size="small" readOnly/>  
                </div>
                <div className="">
                    <Rating name="size-small" defaultValue={1} size="small" readOnly/>  
                </div>
            </div>
            <div className="box">
                <h3 className="mb-2 text-[16px] font-[600] ">Availability</h3>
                <div className="scroll">
                    {/* <CategoryCollapse/> try it */}
                    <AvailabilityCollaspe />
                </div>
            </div>

        </aside>
    );
};

export default Sidebar;