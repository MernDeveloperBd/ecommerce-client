import { Button } from '@mui/material';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import { FcGoogle } from "react-icons/fc";

const Register = () => {
    const [showPassword, setShowPassword] = useState(false)
    return (
        <sectrion className="section ">
            <div className="container py-10">
                <div className="card shadow-md w-[450px] m-auto rounded-md bg-white p-5 px-10">
                    <img src="https://i.ibb.co/PZntnvzy/Haramain-khushbo.jpg" alt="" className='w-16 h-16 mx-auto rounded-md'/>
                    <h3 className="text-center text-[20px]">Register to your account</h3>
                    <form className='w-full mt-5'>
                        <div className="form-group w-full mb-5">
                            <TextField type='email' id="email" label="Email *" variant="outlined" className='w-full' />
                        </div>
                        <div className="form-group w-full mb-2 relative">
                            <TextField type={`${showPassword ? "text" : "password"}`} id="password" label="Password *" variant="outlined" className='w-full' />
                            <Button className='!text-black !text-[20px] !absolute top-[10px] right-[10px] z-50 !w-[35px] !h-[35px] !min-w-[35px] !rounded-full' onClick={() => setShowPassword(!showPassword)}>{showPassword ? <FaEyeSlash /> : <FaEye />}</Button>
                        </div>
                        <Link className='link text-[14px] font-[500]'>Forgot Password?</Link>
                        <div className='flex items-center w-full mt-3'>
                            <Button className='!bg-primary !text-white hover:!bg-sky-600 !w-full'>Register</Button>
                        </div>
                        <p className='mt-3 text-center'>Already have an account? <Link to={'/login'} className='link text-[14px] font-[600]'>Login</Link></p>
                        <p className='mt-3 text-center font-[500]'>Or Continue with Social account</p>
                        <Button className='flex gap-3 w-full !bg-[#f1f1f1] hover:!bg-gray-200 !font-[600] !text-sky-700'><FcGoogle className='text-[20px]'/>Login with Google</Button>
                    </form>
                </div>
            </div>
        </sectrion>
    );
};

export default Register;