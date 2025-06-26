import { Button } from '@mui/material';
import TextField from '@mui/material/TextField';
import { useContext, useState } from 'react';
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from 'react-icons/fa6';
import { Link, useNavigate } from 'react-router-dom';
import { FcGoogle } from "react-icons/fc";
import { postData } from '../../../utils/api';
import { MyContext } from '../../../App';
import CircularProgress from '@mui/material/CircularProgress';


const Register = () => {
    const { openAlertBox } = useContext(MyContext)
    const [isLoading, setIsLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false);
    const [formFields, setFormFields] = useState({
        name: "",
        email: "",
        password: ""
    });
    const navigate = useNavigate();
    
    const onChangeInput = (e) => {
        const { name, value } = e.target;
        setFormFields(() => {
            return {
                ...formFields,
                [name]: value
            }
        })
    }
    const validValue = Object.values(formFields).every(e1 => e1)
    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true)
        if (formFields.name === "") {
            openAlertBox('error', "Please enter full name")
            return false
        }
        if (formFields.email === "") {
            openAlertBox('error', "Please enter your email")
            return false
        }
        if (formFields.password === "") {
            openAlertBox('error', "Please enter your password")
            return false
        }
        postData("/api/user/register", formFields)
            .then((res) => {
                console.log(res);
                if (res?.error !== true) {
                    setIsLoading(false);
                    openAlertBox("success", res?.message)
                    localStorage.setItem("userEmail", formFields.email)
                    navigate('/verify')
                    setFormFields({
                        name: "",
                        email: "",
                        password: ""
                    })
                } else {
                    openAlertBox("error", res?.message)
                    setIsLoading(false)
                }

            })
    }

    return (
        <section className="section ">
            <div className="container py-10">
                <div className="card shadow-md w-[450px] m-auto rounded-md bg-white p-5 px-10">
                    <img src="https://i.ibb.co/PZntnvzy/Haramain-khushbo.jpg" alt="" className='w-16 h-16 mx-auto rounded-md' />
                    <h3 className="text-center text-[20px]">Register to your account</h3>
                    <form className='w-full mt-5' onSubmit={handleSubmit}>
                        <div className="form-group w-full mb-5">
                            <TextField type='text' id="name" name='name' value={formFields.name} disabled={isLoading === true ? true : false} label="name *" variant="outlined" className='w-full' onChange={onChangeInput} />
                        </div>
                        <div className="form-group w-full mb-5">
                            <TextField type='email' name='email' value={formFields.email} disabled={isLoading === true ? true : false} id="email" label="Email *" variant="outlined" className='w-full' onChange={onChangeInput} />
                        </div>
                        <div className="form-group w-full mb-2 relative">
                            <TextField type={`${showPassword ? "text" : "password"}`} id="password" name='password' value={formFields.password} disabled={isLoading === true ? true : false} label="Password *" variant="outlined" className='w-full' onChange={onChangeInput} />
                            <Button className='!text-black !text-[20px] !absolute top-[10px] right-[10px] z-50 !w-[35px] !h-[35px] !min-w-[35px] !rounded-full' onClick={() => setShowPassword(!showPassword)}>{showPassword ? <FaEyeSlash /> : <FaEye />}</Button>
                        </div>
                        <Link className='link text-[14px] font-[500]'>Forgot Password?</Link>
                        <div className='flex items-center w-full mt-3'>
                            <Button type='submit' disabled={!validValue} className={`${!validValue ? '!bg-gray-800 cursor-not-allowed' : '!bg-primary hover:!bg-sky-600'
                                } !text-white !w-full flex gap-3`}>
                                {
                                    isLoading === true ? <CircularProgress className='reg_loading' color="inherit" /> : 'Register'
                                }

                            </Button>
                        </div>
                        <p className='mt-3 text-center'>Already have an account? <Link to={'/login'} className='link text-[14px] font-[600]'>Login</Link></p>
                        <p className='mt-3 text-center font-[500]'>Or Continue with Social account</p>
                        <Button className='flex gap-3 w-full !bg-[#f1f1f1] hover:!bg-gray-200 !font-[600] !text-sky-700'><FcGoogle className='text-[20px]' />Login with Google</Button>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default Register;