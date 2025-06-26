import { Button, CircularProgress } from "@mui/material";

import TextField from '@mui/material/TextField';
import AccountSideBar from "../../AccountSidebar/AccountSideBar";
import { useContext, useEffect, useState } from "react";
import { MyContext } from "../../../App";
import { useNavigate } from "react-router-dom";
import { editData } from "../../../utils/api";



const MyAccount = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [userId, setUserId] = useState("");

    const [formFields, setFormFields] = useState({
        name: '',
        email: '',
        mobile: ''
    });
    const { isLogin, setIsLogin, userData, openAlertBox } = useContext(MyContext);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("accessToken")
        if (token === null) {
            navigate('/')
        }
    }, [isLogin, navigate]);
    // 
    useEffect(() => {
        if (userData?._id !== "" && userData?._id !== undefined) {
            setUserId(userData?._id)
            setFormFields({
                name: userData?.name,
                email: userData?.email,
                mobile: userData?.mobile
            })
        }
    }, [userData?._id, userData?.name, userData?.email, userData?.mobile])

    const onChangeInput = (e) => {
        const { name, value } = e.target;
        setFormFields(() => {
            return {
                ...formFields,
                [name]: value
            }
        })
    };

    const validValue = Object.values(formFields).every(e1 => e1)
    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true)

        if (formFields.name === "") {
            openAlertBox('error', "Please enter your full name")
            return false
        }
        if (formFields.email === "") {
            openAlertBox('error', "Please enter your email Id")
            return false
        }
        if (formFields.mobile === "") {
            openAlertBox('error', "Please enter your Mobile number")
            return false
        }
        editData(`/api/user/${userId}`, formFields, { withCredentials: true })
            .then((res) => {
                if (res?.error !== true) {
                    setIsLoading(false);
                    openAlertBox("success", res?.data?.message)
                    navigate('/')
                    setFormFields({
                        name: '',
                        email: '',
                        mobile: ''
                    })
                    /* localStorage.setItem("accessToken", res?.data?.accessToken);
                    localStorage.setItem("refreshToken", res?.data?.refreshToken);
                    localStorage.removeItem("actionType") */
                   /*  setIsLogin(true)
                    setIsLoading(false) */
                } else {
                    openAlertBox("error", res?.data?.message)
                    setIsLoading(false)
                }

            })
    }


    return (
        <section className="py-10 w-full">
            <div className="container flex gap-5">
                {/* left sidebar */}
                <div className="col1 w-[20%]">
                    <AccountSideBar />
                </div>
                {/*  right*/}
                <div className="col2 w-[50%]">
                    <div className="card bg-white p-5 shadow-md rounded-md">
                        <h2 className="text-lg font-semibold pb-3">My Profile</h2>
                        <hr />
                        <form className="mt-5" onSubmit={handleSubmit}>
                            <div className="flex items-center gap-5 mb-5">
                                <div className="w-[50%]">
                                    <TextField
                                        id="name"
                                        label="Full Name *"
                                        name='name'
                                        value={formFields.name}
                                        disabled={isLoading === true ? true : false}
                                        variant="outlined"
                                        size="small"
                                        className="w-full"
                                        onChange={onChangeInput} />
                                </div>
                                <div className="w-[50%]">
                                    <TextField
                                        type='email'
                                        id="email"
                                        label="Email *"
                                        name='email'
                                        value={formFields.email}
                                        disabled={true}
                                        variant="outlined"
                                        size="small"
                                        className='w-full'
                                        onChange={onChangeInput} />
                                </div>
                            </div>
                            <div className="flex items-center gap-5 mb-5">
                                <div className="w-[50%]">
                                    <TextField
                                        id="mobile"
                                        label="Phone Number"
                                        name='mobile'
                                        value={formFields.mobile}
                                        disabled={isLoading === true ? true : false}
                                        variant="outlined"
                                        size="small"
                                        className="w-full"
                                        onChange={onChangeInput} />
                                </div>

                            </div>
                            <div className="flex items-center gap-4">
                                <Button type="submit" disabled={!validValue} className={`${!validValue ? '!bg-gray-800 cursor-not-allowed' : '!bg-green-600 hover:!bg-green-700 !text-white !w-[130px]'} !text-white  flex gap-3`} >
                                    {
                                        isLoading === true ? <CircularProgress className='reg_loading' color="inherit" /> : <span className="text-[13px] w-[130px]">Update Profile</span>
                                    }
                                </Button>
                                {/* <Button className="bg-btn hover:bg-btn w-[100px] !text-[12px]">
                                    {
                                        isLoading === true ? <CircularProgress className='reg_loading' color="inherit" /> : 'Cancel'
                                    }
                                </Button> */}
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default MyAccount;