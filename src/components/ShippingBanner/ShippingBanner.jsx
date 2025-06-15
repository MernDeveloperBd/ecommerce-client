import { FaShippingFast } from "react-icons/fa";

const ShippingBanner = () => {
    return (
        <div className='bg-white py-12'>
            <div className='container'>
                <div className='freeshipping w-full p-4 border-2 border-red-500 flex items-center justify-between rounded-md'>
                    <div className="col1 flex items-center gap-2 text-2xl">
                        <FaShippingFast /> <span className="font-bold">FREE SHIPPING</span>
                    </div>

                    <div>
                        <p>free delivery now on your first order and over 2000 TK</p>
                    </div>
                    <p className="font-bold text-[30px]">-Only Tk 2000*</p>
                </div>
            </div>
        </div>
    );
};

export default ShippingBanner;