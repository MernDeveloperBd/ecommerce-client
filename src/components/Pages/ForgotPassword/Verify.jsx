import { useContext, useState } from "react";
import OtpInput from "../../OtpInput/OtpInput";
import { MyContext } from '../../../App';
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";


const Verify = () => {
    const context = useContext(MyContext)
    const [isLoading, setIsLoading] = useState(false)
    const [otp, setOtp] = useState("")
    const navigate = useNavigate()
    const handleOtpChange = (value) => {
        setOtp(value)
    };
    const verifyOTP = (e) =>{
        e.preventDefault()
        alert(otp)
    }
    return (
        <section className="section py-5">
            <div className="container">
                <div className="card shadow-md w-[400px] m-auto rounded-md bg-white p-5 px-10">
                    <div className="text-center flex items-center justify-center">
                        <img src="/public/verify.png" alt="" className="w-20" />
                    </div>
                    <h3 className="text-center text-[18px] text-black mt-2 font-bold mb-2">Verify OTP</h3>
                    <p className="text-center mb-3">OTP send to <span className="text-primary font-bold">merndevelpler@gmail.com</span></p>
                    <form onSubmit={verifyOTP}>
                        <OtpInput length={6} onChange={handleOtpChange} />
                    <div className="flex items-center justify-center mt-4">
                        <Button type="submit" className="w-full bg-btn hover:bg-btn ">Verify OTP</Button>
                    </div>
                    </form>
                    
                </div>
            </div>
        </section>
    );
};

export default Verify;