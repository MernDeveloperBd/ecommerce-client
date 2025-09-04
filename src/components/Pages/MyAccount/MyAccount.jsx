import { Button, CircularProgress } from "@mui/material";

import TextField from '@mui/material/TextField';
import AccountSideBar from "../../AccountSidebar/AccountSideBar";
import { useContext, useEffect, useState } from "react";
import { MyContext } from "../../../App";
import { useNavigate } from "react-router-dom";
import { editData, postData } from "../../../utils/api";
import { Collapse } from 'react-collapse';
import 'react-international-phone/style.css';


const MyAccount = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [isLoading2, setIsLoading2] = useState(false);
    const [userId, setUserId] = useState("");
    const [isChangePasswordFormShow, setIsChangePasswordFromShow] = useState(false)

    const [formFields, setFormFields] = useState({
        name: '',
        email: '',
        mobile: ''
    });
    const [changePassword, setChangePassword] = useState({
        email: '',
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
    });
    const { isLogin, userData, openAlertBox } = useContext(MyContext);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("accessToken")
        if (token === null) {
            navigate('/')
        }
    }, [navigate]);
    // 
    useEffect(() => {
        if (userData?._id !== "" && userData?._id !== undefined) {
            setUserId(userData?._id)
            setFormFields({
                name: userData?.name,
                email: userData?.email,
                mobile: userData?.mobile
            })
            setChangePassword({
                email: userData?.email
            })
        }
    }, [userData])

    const onChangeInput = (e) => {
        const { name, value } = e.target;
        setFormFields(() => {
            return {
                ...formFields,
                [name]: value
            }
        })
        setChangePassword(() => {
            return {
                ...changePassword,
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
                   
                    setFormFields({
                        name: '',
                        email: '',
                        mobile: ''
                    })
                     navigate('/')
                } else {
                    openAlertBox("error", res?.data?.message)
                    setIsLoading(false)
                }

            })
    }
    const handleSubmitChangePassword = async (e) => {
        e.preventDefault();
        setIsLoading2(true)

        if (changePassword.oldPassword === "") {
            openAlertBox('error', "Please enter Old Password")
            return false
        }
        if (changePassword.newPassword === "") {
            openAlertBox('error', "Please enter New Password")
            return false
        }
        if (changePassword.confirmPassword === "") {
            openAlertBox('error', "Please enter Confirm Password")
            return false
        }
        if (changePassword.confirmPassword !== changePassword.newPassword) {
            openAlertBox('error', "Password not matche")
            return false
        }
        await postData(`/api/user/reset-password`, changePassword, { withCredentials: true })
            .then((res) => {
                if (res?.error !== true) {
                    setIsLoading2(false);
                    openAlertBox("success", res?.message)
                    navigate('/')
                } else {
                    openAlertBox("error", res?.message)
                    setIsLoading2(false)
                }

            })
    }

    return (
        <section className="py-10 w-full">
            <div className="container flex flex-col md:flex-row gap-5">
                {/* left sidebar */}
                <div className="col1 w-full md:w-[20%]">
                    <AccountSideBar />
                </div>
                {/*  right*/}
                <div className="col2 w-full md:w-[50%]">
                    <div className="card bg-white p-5 shadow-md rounded-md">
                        <div className="flex items-center pb-3">
                            <h2 className="text-lg font-semibold pb-0">My Profile</h2>
                            <Button className="!ml-auto" onClick={() => setIsChangePasswordFromShow(!isChangePasswordFormShow)}>Change Password</Button>
                        </div>
                        <hr />
                        <form className="mt-5" onSubmit={handleSubmit}>
                            <div className="flex flex-col md:flex-row items-center gap-5 mb-5">

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


                                <TextField
                                    type='email'
                                    id="email"
                                    label="Email"
                                    name='email'
                                    value={formFields.email}
                                    disabled={true}
                                    variant="outlined"
                                    size="small"
                                    className='w-full'
                                    onChange={onChangeInput} />

                            </div>
                            <div className="flex items-center mb-5">
                                <div className="md:w-[50%] w-full">
                                    <TextField
                                        id="mobile"
                                        label="Mobile Number *"
                                        name='mobile'
                                        defaultValue={formFields.mobile}
                                        disabled={isLoading === true ? true : false}
                                        variant="outlined"
                                        size="small"
                                        className="w-full"
                                        onChange={onChangeInput} />
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <Button type="submit" disabled={!validValue} className={`${!validValue ? '!bg-gray-800 cursor-not-allowed' : '!bg-green-600 hover:!bg-green-700 !text-white !w-[140px]'} !text-white  flex gap-3`} >
                                    {
                                        isLoading === true ? <CircularProgress className='reg_loading' color="inherit" /> : <span className="text-[13px] w-[140px]">Update Profile</span>
                                    }
                                </Button>
                            </div>
                        </form>
                    </div>
                    {/* Change password */}


                    <Collapse isOpened={isChangePasswordFormShow}>
                        <div className="card bg-white mt-4 p-5 shadow-md rounded-md">
                            <div className="flex items-center pb-1">
                                <Button className="pb-0">Change Password</Button>
                            </div>
                            <hr />
                            <form className="mt-5" onSubmit={handleSubmitChangePassword}>
                                <div className="grid grid-grid-cols-2 items-center gap-5 mb-5">
                                    <div className="">
                                        {
                                            userData?.signUpWithGoolge === false && <TextField
                                                id="oldPassword"
                                                label="old password"
                                                name='oldPassword'
                                                size="small"
                                                variant="outlined"
                                                className="w-full"
                                                disabled={isLoading2 === true ? true : false}
                                                value={changePassword.oldPassword}
                                                onChange={onChangeInput} />
                                        }

                                    </div>

                                    <div className="">
                                        <TextField
                                            type='text'
                                            id="newPassword"
                                            label="New Password"
                                            variant="outlined"
                                            size="small"
                                            className='w-full'
                                            name='newPassword'
                                            value={changePassword.newPassword}
                                            onChange={onChangeInput} />
                                    </div>

                                </div>
                                <div className=" mb-5">
                                    <div className="">
                                        <TextField
                                            id="confirmPassword"
                                            label="Confirm Password"
                                            variant="outlined"
                                            size="small"
                                            className="w-full"
                                            name='confirmPassword'
                                            value={changePassword.confirmPassword}
                                            onChange={onChangeInput} />
                                    </div>

                                </div>
                                <div className="flex items-center gap-4">
                                    <Button type="submit" className={`cursor-not-allowed !bg-red-600 hover:!bg-red-700 !text-white '} !text-white  flex gap-3`} >
                                        Change Password
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </Collapse>

                </div>
            </div>
        </section>
    );
};

export default MyAccount;