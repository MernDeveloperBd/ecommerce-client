import { Button } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { BsFillBagCheckFill } from "react-icons/bs";
import { FaCloudUploadAlt } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa6";
import { IoIosLogOut, IoMdHeart } from "react-icons/io";
import { NavLink } from "react-router-dom";
import { MyContext } from "../../App";
import CircularProgress from '@mui/material/CircularProgress';
import { uploadImage } from "../../utils/api";
const AccountSideBar = () => {
    const [preview, setPriview] = useState([]);
    const [uploading, setUploading] = useState(false);
    
    const { openAlertBox, userData } = useContext(MyContext);

    useEffect(() => {
        const userAvatar = [];
        if (userData?.avatar !== "" && userData?.avatar !== undefined) {
            userAvatar.push(userData?.avatar);
            setPriview(userAvatar)
        }

    }, [userData?.avatar])
    let img_arr = [];
    let uniqueArray = [];
    let selectedImage = [];
    const formData = new FormData();

    const onChangeFile = async (e, apiEndPoint) => {
        try {
            setPriview([]);
            const files = e.target.files;
            setUploading(true);
            
            for (let i = 0; i < files?.length; i++) {
                if (files[i] && (files[i].type === "image/jpeg" || files[i].type === "image/jpg" || files[i].type === "image/png" || files[i].type === "image/webp")
                ) {
                    const file = files[i];
                    selectedImage.push(file);
                    formData.append(`avatar`, file);

                } else {
                    openAlertBox("error", "Please select a valid jpeg or jpg or png or webp file")
                    setUploading(false);
                    return false
                }
            }
            uploadImage("/api/user/user-avatar", formData).then((res) => {
                setUploading(false);
                let avatar = [];
                avatar.push(res?.data?.avatar);
                setPriview(avatar)

            })
        } catch (error) {
            console.log(error);

        }
    }
    return (
        <div className="card bg-white shadow-md rounded-md sticky top-[10px] ">
            <div className="w-full p-5 flex items-center justify-center flex-col">

                <div className="w-[110px] h-[110px] rounded-full overflow-hidden mb-4 relative group flex items-center justify-center bg-gray-200 ">
                    {
                        uploading === true ? <CircularProgress color="inherit" /> : <>
                            {
                                preview?.length !== 0 ? preview?.map((img, index) => {
                                    return (
                                        <img src={img} key={index} className="w-full h-full object-cover" />
                                    )
                                }):<img src="https://img.freepik.com/premium-vector/male-face-avatar-icon-set-flat-design-social-media-profiles_1281173-3806.jpg?semt=ais_hybrid&w=740" className="w-full h-full object-cover" />
                                

                            }
                        </>
                    }


                    <div className="overlay w-[100%] h-[100%] absolute top-0 left-0 z-50 bg-[rgba(0,0,0,0.5)] flex items-center justify-center cursor-pointer opacity-0 transition-all group-hover:opacity-100 duration-300">
                        <FaCloudUploadAlt className="text-[#fff] text-[25px] " />
                        <input type="file" name="avatar" id="" className="absolute top-0 left-0 w-full h-full opacity-0" accept="image/*" onChange={(e) => onChangeFile(e, "/api/user/user-avatar")} />
                    </div>
                </div>

                <h3 className="text-lg font-semibold">{userData?.name}</h3>
                <p className="text-[14px] font-[400]">{userData?.email}</p>
            </div>
            {/*  */}
            <ul className="list-none pb-5 bg-[#f1f1f1] myAccountTabs">
                <li className="w-full">
                    <NavLink to='/my-account' exact={true} activeClassName="isActive" >
                        <Button className="w-full flex items-center gap-2 !text-left !py-2 !px-5 !justify-start !rounded-none !text-[rgba(0,0,0,0.7)] !font-[600]"><FaRegUser className="text-[15px]" /> My Profile</Button>
                    </NavLink>

                </li>
                <li className="w-full">
                    <NavLink to='/my-list' exact={true} activeClassName="isActive" >
                        <Button className="w-full flex items-center gap-2 !text-left !py-2  !px-5 !justify-start !rounded-none !text-[rgba(0,0,0,0.7)] !font-[600]"><IoMdHeart className="text-[15px]" /> My Lists</Button>
                    </NavLink>
                </li>
                <li className="w-full">
                    <NavLink to='/my-orders' exact={true} activeClassName="isActive" >
                        <Button className="w-full flex items-center gap-2 !text-left !py-2  !px-5 !justify-start !rounded-none !text-[rgba(0,0,0,0.7)] !font-[600]"><BsFillBagCheckFill className="text-[15px]" /> Orders</Button>
                    </NavLink>
                </li>

                <li className="w-full">
                    <NavLink to='/logout' exact={true} activeClassName="isActive" >
                        <Button className="w-full flex items-center gap-2 !text-left !py-2  !px-5 !justify-start !rounded-none !text-[rgba(0,0,0,0.7)] !font-[600]"><IoIosLogOut className="text-[15px]" /> Logout</Button>
                    </NavLink>
                </li>
            </ul>
        </div>
    );
};

export default AccountSideBar;