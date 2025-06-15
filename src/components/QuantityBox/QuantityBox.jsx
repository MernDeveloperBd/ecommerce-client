import { Button } from "@mui/material";
import { useState } from "react";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";


const QuantityBox = () => {
    const[qtyVal, setQtyVal] = useState(1)
    const plusQty = ()=>{
        setQtyVal(qtyVal + 1)
    }
    const minusQty = ()=>{
        if(qtyVal === 1){
            return
        }else{
            setQtyVal(qtyVal - 1)
        }
    }
    return (
        <div className="qtyBox flex items-center relative">
            <input type="number" className="w-full h-[35px] p-2 text-[15px] focus:outline-none border border-[rgba(0,0,0,0.3)] rounded-md" value={qtyVal}/>
            <div className="flex items-center flex-col justify-between h-[38px] absolute top-0 right-0 z-50">
                <Button onClick={plusQty} className="!min-w-[30px] !w-[20px] !h-[15px] !text-[16px] !text-black"><FaAngleUp/></Button>
                <Button onClick={minusQty} className="!min-w-[30px] !w-[20px] !h-[15px] !text-[16px] !text-black"><FaAngleDown/></Button>
            </div>
        </div>
    );
};

export default QuantityBox;