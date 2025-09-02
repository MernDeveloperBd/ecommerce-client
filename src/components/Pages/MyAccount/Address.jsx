import { useContext, useEffect, useState } from "react";
import AccountSideBar from "../../AccountSidebar/AccountSideBar";
import { Button, Radio, } from "@mui/material";
import { MyContext } from "../../../App";
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { deleteData, fetchDataFromApi, postData } from "../../../utils/api";
import { FaRegTrashAlt } from "react-icons/fa";

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

const Address = () => {
    const { openAlertBox, userData, setAddress, address } = useContext(MyContext);
    const [status, setStatus] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isOpenModal, setIsOpenModal] = useState(false)
    const [selectedValue, setSelectedValue] = useState('');
    const [isOpenFullScreenPanel, setIsOpenFullScreenPanel] = useState({
        open: false,
        model: ''
    });

    const [formFields, setFormFields] = useState({
        address_line1: '',
        division: '',
        city: '',
        upazila: '',
        state: '',
        postCode: '',
        country: '',
        mobile: '',
        status: '',
        userId: '',
        selected: false
    });

    useEffect(() => {
        if (userData?._id !== undefined) {
            setFormFields((prevState) => ({
                ...prevState,
                userId: userData?._id
            }));
        }


    }, [userData]);

    // address get 
    useEffect(() => {
        if (userData?._id !== "" && userData?._id !== undefined) {
            fetchDataFromApi(`/api/address/get?userId=${userData?._id}`).then((res) => {
                setAddress(res?.data)
            })
        }
    }, [userData, setAddress])
    const handleClose = () => {
        setIsOpenModal(false)
    };
    const handleChangeStatus = (event) => {
        setStatus(event.target.value);
        setFormFields((prevState) => ({
            ...prevState,
            status: event.target.value
        }))
    };

    const handleChange = (event) => {
        setSelectedValue(event.target.value);
        console.log(event);
    };

    const onChangeInput = (e) => {
        const { name, value } = e.target;
        setFormFields((prev) => ({
            ...prev,
            [name]: value
        }));
    };
    const removeAddress = (id) =>{
        console.log(id);
        deleteData(`/api/address/${id}`).then((res) =>{
           fetchDataFromApi(`/api/address/get?userId=${userData?._id}`).then((res) => {
                setAddress(res?.data)
            })
            
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true)

        if (formFields.address_line1 === "") {
            openAlertBox('error', "Please enter your Address line 1")
            return false
        }
        if (formFields.division === "") {
            openAlertBox('error', "Please enter your division")
            return false
        }
        if (formFields.city === "") {
            openAlertBox('error', "Please enter your city")
            return false
        }
        if (formFields.upazila === "") {
            openAlertBox('error', "Please enter your upazila")
            return false
        }
        if (formFields.state === "") {
            openAlertBox('error', "Please enter your state")
            return false
        }
        if (formFields.postCode === "") {
            openAlertBox('error', "Please enter your postCode")
            return false
        }
        if (formFields.country === "") {
            openAlertBox('error', "Please enter your country")
            return false
        }
        if (formFields.mobile === "") {
            openAlertBox('error', "Please enter your 11 digit Mobile Number using country code")
            return false
        }
        console.log(formFields);

        postData(`/api/address/add `, formFields, { withCredentials: true })
            .then((res) => {
                if (res?.error !== true) {
                    setIsLoading(false);
                    openAlertBox("success", res?.data?.message)
                    setIsOpenFullScreenPanel({ open: false })

                    
                } else {
                    openAlertBox("error", res?.data?.message)
                    setIsLoading(false)
                }

            })
    }


    return (
        <>
            <section className="py-10 w-full">
                <div className="container flex gap-5">
                    {/* left sidebar */}
                    <div className="col1 w-[20%]">
                        <AccountSideBar />
                    </div>
                    {/*  right*/}
                    <div className="col2 w-[50%]">
                        <div className="card bg-white p-5 shadow-md rounded-md">
                            <div className="flex items-center pb-3">
                                <h2 className="text-lg font-semibold pb-0">Address</h2>

                            </div>
                            <hr />
                            {/* Add Address */}
                            {/* Add Address */}
                            <div className="flex items center justify-center p-5 mb-5 rounded-md border border-dashed border-black bg-[#f1faff] hover:bg-[#e5eff5] cursor-pointer" onClick={() => setIsOpenModal(true)} >
                                <span className="text-[16px] font-[500]">Add Address</span>
                            </div>
                            <div className="flex flex-col gap-2 mt-4">
                                {
                                    address?.length > 0 ? address?.map((address, idx) => {
                                        return (
                                            <>
                                                <div key={idx} className="group relative addressBox border border-dashed border-black w-fll flex items-center justify-start bg-[#f1f1f1] p-3 rounded-md">
                                                    <div className="flex items-center w-[95%]">
                                                        <Radio {...label} name="address"
                                                        checked={selectedValue === (address?._id)}
                                                        value={address?._id} onChange={handleChange} />
                                                    <span>
                                                        {
                                                            <p>{`${address?.address_line1 + ", " + address?.division + ", " + address?.city + ", " + address?.upazila + ", " + address?.country + ", " + address?.postCode + ", " + address?.state}`}</p>
                                                        }
                                                    </span>
                                                    </div>
                                                    <span onClick={() => removeAddress(address?._id)} className=" hidden group-hover:flex items-center justify-center w-[30px] h-[30px] rounded-full bg-red-600 ml-auto cursor-pointer"><FaRegTrashAlt /></span>
                                                </div>
                                            </>
                                        )
                                    }) : <div>
                                        <p className="text-center text-red-600">No Address here</p>
                                    </div>
                                }

                            </div>
                            {/* Add Address end */}

                        </div>



                    </div>
                </div>
            </section>
            <Dialog onClose={handleClose} open={isOpenModal}>
                <DialogTitle>Add Address</DialogTitle>
                <form className="px-8 pb-5" onSubmit={handleSubmit}>
                    <div className="flex items-center gap-5 pb-3">
                        <div className="col w-[100%]">
                            <TextField
                                className="w-full"
                                label="Address Line 1"
                                variant="outlined"
                                size="small"
                                name='address_line1'
                                value={formFields.address_line1} onChange={onChangeInput}
                            />
                        </div>
                    </div>
                    <div className="flex items-center gap-5 pb-3">
                        <div className="col w-[50%]">
                            <TextField
                                className="w-full"
                                label="Division"
                                variant="outlined"
                                size="small"
                                name='division' value={formFields.division} onChange={onChangeInput}
                            />
                        </div>
                        <div className="col w-[50%]">
                            <TextField
                                className="w-full"
                                label="City"
                                variant="outlined"
                                size="small"
                                name='city' value={formFields.city} onChange={onChangeInput}
                            />
                        </div>
                    </div>
                    <div className="flex items-center gap-5 pb-3">
                        <div className="col w-[50%]">
                            <TextField
                                className="w-full"
                                label="Upazila"
                                variant="outlined"
                                size="small"
                                name='upazila' value={formFields.upazila} onChange={onChangeInput}
                            />
                        </div>
                        <div className="col w-[50%]">
                            <TextField
                                className="w-full"
                                label="state"
                                variant="outlined"
                                size="small"
                                name='state' value={formFields.state} onChange={onChangeInput}
                            />
                        </div>
                    </div>
                    <div className="flex items-center gap-5 pb-3">
                        <div className="col w-[50%]">
                            <TextField
                                className="w-full"
                                label="postCode"
                                variant="outlined"
                                size="small"
                                name='postCode' value={formFields.postCode} onChange={onChangeInput}
                            />
                        </div>
                        <div className="col w-[50%]">
                            <TextField
                                className="w-full"
                                label="Country"
                                variant="outlined"
                                size="small"
                                name='country' value={formFields.country} onChange={onChangeInput}
                            />
                        </div>
                    </div>
                    <div className="flex items-center gap-5 pb-3">
                        <div className="col w-[50%]">
                            <TextField
                                className="w-full"
                                label="mobile"
                                // disabled={isLoading === true ? true : false}
                                variant="outlined"
                                size="small"
                                name='mobile' value={formFields.mobile} onChange={onChangeInput}
                            />
                        </div>
                        {/* <h3 className="text-[16px] font-[600] mb-1">Address Line 1</h3> */}
                        <div className="col w-[50%]">
                            <Select
                                value={status}
                                onChange={handleChangeStatus}
                                displayEmpty
                                inputProps={{ 'aria-label': 'Without label' }}
                                size='small'
                                className='w-full'
                            >
                                <MenuItem value={true}>True</MenuItem>
                                <MenuItem value={false}>False</MenuItem>
                            </Select>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <Button onClick={handleClose}
                            className="bg-border border hover:bg-btn w-full flex items-center gap-2"
                        > Cancel
                        </Button>
                        <Button type="submit"
                            className="bg-btn hover:bg-btn w-full flex items-center gap-2"
                        > Save
                        </Button>
                    </div>

                </form>

            </Dialog>
        </>
    );
};

export default Address;