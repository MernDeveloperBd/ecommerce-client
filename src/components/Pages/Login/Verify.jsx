import { useContext,  useState } from "react";
import OtpInput from "../../OtpInput/OtpInput";
import { Button } from "@mui/material";
import { postData } from "../../../utils/api";
import { useNavigate } from "react-router-dom";
import { MyContext } from "../../../App";


const Verify = () => {
    const { openAlertBox } = useContext(MyContext)
    const [otp, setOtp] = useState("")
    const handleOtpChange = (value) => {
        setOtp(value)
    };
    const navigate = useNavigate()

    
    const verifyOTP = (e) => {
        e.preventDefault();
        const actionType = localStorage.getItem('actionType');
        if (actionType !== 'forgot-password') {
            postData("/api/user/verifyEmail", {
                email: localStorage.getItem("userEmail"),
                otp: otp
            }).then((res) => {
                if (res?.error === false) {
                    openAlertBox("success", res?.message)
                    localStorage.removeItem("userEmail")
                    navigate('/login')
                }
                else {
                    openAlertBox("error", res?.message)
                }

            })
        }
        else{
            postData("/api/user/verify-forgot-password-otp", {
                email: localStorage.getItem("userEmail"),
                otp: otp
            }).then((res) => {
                if (res?.error === false) {
                    openAlertBox("success", res?.message)
                    navigate('/forgot-password')
                }
                else {
                    openAlertBox("error", res?.message)
                }

            })
        }
      }
    return (
        <section className="section py-5">
            <div className="container">
                <div className="card shadow-md w-[400px] m-auto rounded-md bg-white p-5 px-10">
                    <div className="text-center flex items-center justify-center">
                        <img src="/public/verify.png" alt="" className="w-20" />
                    </div>
                    <h3 className="text-center text-[18px] text-black mt-2 font-bold mb-2">Verify OTP</h3>
                    <p className="text-center mb-3">OTP send to <span className="text-primary font-bold">{localStorage.getItem("userEmail")}</span></p>
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