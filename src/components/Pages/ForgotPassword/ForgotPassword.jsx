import { Button } from '@mui/material';
import TextField from '@mui/material/TextField';
import { useContext, useState } from 'react';
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';;
import { MyContext } from '../../../App';
import CircularProgress from '@mui/material/CircularProgress';
import { postData } from '../../../utils/api';

const ForgotPassword = () => {
    const { openAlertBox } = useContext(MyContext)
    const [showPassword, setShowPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [formFields, setFormFields] = useState({
        email: localStorage.getItem("userEmail"),
        newPassword: '',
        confirmPassword: ''
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
    const validValue = Object.values(formFields).every(e1 => e1);
    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true)

        if (formFields.newPassword === "") {
            setIsLoading(false)
            openAlertBox('error', "Please enter your New Password")
            return false
        }
        if (formFields.confirmPassword === "") {
            setIsLoading(false)
            openAlertBox('error', "Please enter your confirm New Password")
            return false
        }
        if (formFields.confirmPassword !== formFields.newPassword) {
            setIsLoading(false)
            openAlertBox('error', "Password and confirm New Password not match")
            return false
        }
        postData(`/api/user/reset-password`, formFields).then((res) => {
            if(res?.error === false){
                localStorage.removeItem("userEmail")
            localStorage.removeItem("actionType")
            setIsLoading(false)
            openAlertBox('success', res?.message)
            navigate('/login')
            }
            else{
                openAlertBox('error', res?.message)
            }
        })

    }


    return (
        <section className="section ">
            <div className="container py-10">
                <div className="card shadow-md w-[450px] m-auto rounded-md bg-white p-5 px-10">
                    <img src="https://i.ibb.co/PZntnvzy/Haramain-khushbo.jpg" alt="" className='w-16 h-16 mx-auto rounded-md' />
                    <h3 className="text-center text-[20px]">Forgot password</h3>
                    <form className='w-full mt-5' onSubmit={handleSubmit}>
                        <div className="form-group w-full mb-5 relative">
                            <TextField type={`${showPassword ? "text" : "password"}`} id="password" name='newPassword' value={formFields.newPassword} disabled={isLoading === true ? true : false} label="newPassword *" variant="outlined" className='w-full' onChange={onChangeInput} />
                            <Button className='!text-black !text-[20px] !absolute top-[10px] right-[10px] z-50 !w-[35px] !h-[35px] !min-w-[35px] !rounded-full' onClick={() => setShowPassword(!showPassword)}>{showPassword ? <FaEyeSlash /> : <FaEye />}</Button>
                        </div>
                        <div className="form-group w-full mb-2 relative">
                            <TextField type={`${showConfirmPassword ? "text" : "password"}`} id="confirm_password" name='confirmPassword' value={formFields.confirmPassword} disabled={isLoading === true ? true : false} label="confrim New Password *" variant="outlined" className='w-full' onChange={onChangeInput} />
                            <Button className='!text-black !text-[20px] !absolute top-[10px] right-[10px] z-50 !w-[35px] !h-[35px] !min-w-[35px] !rounded-full' onClick={() => setShowConfirmPassword(!showConfirmPassword)}>{showConfirmPassword ? <FaEyeSlash /> : <FaEye />}</Button>
                        </div>
                        <div type="submit" className='flex items-center w-full mt-3'>
                            <Button type='submit' disabled={!validValue} className={`${!validValue ? '!bg-gray-800 cursor-not-allowed' : '!bg-primary hover:!bg-sky-600'
                                } !text-white !w-full flex gap-3`}>
                                {
                                    isLoading === true ? <CircularProgress className='reg_loading' color="inherit" /> : 'Change Password'
                                }

                            </Button>
                        </div>

                    </form>
                </div>
            </div>
        </section>
    );
};

export default ForgotPassword;