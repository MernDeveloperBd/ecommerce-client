import { Button } from '@mui/material';
import TextField from '@mui/material/TextField';
import { useContext, useState } from 'react';
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from 'react-icons/fa6';
import { Link, useNavigate } from 'react-router-dom';
import { FcGoogle } from "react-icons/fc";
import { MyContext } from '../../../App';

const ForgotPassword = () => {
    const{openAlertBox} = useContext(MyContext)
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const navigate = useNavigate()

  
    return (
        <sectrion className="section ">
            <div className="container py-10">
                <div className="card shadow-md w-[450px] m-auto rounded-md bg-white p-5 px-10">
                <img src="https://i.ibb.co/PZntnvzy/Haramain-khushbo.jpg" alt="" className='w-16 h-16 mx-auto rounded-md'/>
                    <h3 className="text-center text-[20px]">Forgot password</h3>
                    <form className='w-full mt-5'>
                        <div className="form-group w-full mb-5 relative">
                            <TextField type={`${showPassword ? "text" : "password"}`} id="password" name='password' label="Password *" variant="outlined" className='w-full' />
                            <Button className='!text-black !text-[20px] !absolute top-[10px] right-[10px] z-50 !w-[35px] !h-[35px] !min-w-[35px] !rounded-full' onClick={() => setShowPassword(!showPassword)}>{showPassword ? <FaEyeSlash /> : <FaEye />}</Button>
                        </div>
                        <div className="form-group w-full mb-2 relative">
                            <TextField type={`${showConfirmPassword ? "text" : "password"}`} id="confirm_password" name='confirm_password' label="Confirm Password *" variant="outlined" className='w-full' />
                            <Button className='!text-black !text-[20px] !absolute top-[10px] right-[10px] z-50 !w-[35px] !h-[35px] !min-w-[35px] !rounded-full' onClick={() => setShowConfirmPassword(!showConfirmPassword)}>{showConfirmPassword ? <FaEyeSlash /> : <FaEye />}</Button>
                        </div>                        
                        <div type="submit" className='flex items-center w-full mt-3'>
                            <Button className='!bg-primary !text-white hover:!bg-sky-600 !w-full'>Change password</Button>
                        </div>
                        
                    </form>
                </div>
            </div>
        </sectrion>
    );
};

export default ForgotPassword;