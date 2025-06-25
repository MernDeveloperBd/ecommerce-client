import { Button } from "@mui/material";

import TextField from '@mui/material/TextField';
import AccountSideBar from "../../AccountSidebar/AccountSideBar";



const MyAccount = () => {
    return (
        <section className="py-10 w-full">
            <div className="container flex gap-5">
                {/* left sidebar */}
                <div className="col1 w-[20%]">
                    <AccountSideBar/>
                </div>
                {/*  right*/}
                <div className="col2 w-[50%]">
                    <div className="card bg-white p-5 shadow-md rounded-md">
                        <h2 className="text-lg font-semibold pb-3">My Profile</h2>
                        <hr />
                        <form className="mt-5">
                            <div className="flex items-center gap-5 mb-5">
                                <div className="w-[50%]">
                                    <TextField id="outlined-basic" label="Full Name" variant="outlined" size="small" className="w-full"/>
                                </div>
                                <div className="w-[50%]">
                                    <TextField id="outlined-basic" label="Email" variant="outlined" size="small" className="w-full"/>
                                </div>                            
                        </div>
                            <div className="flex items-center gap-5 mb-5">
                                <div className="w-[50%]">
                                    <TextField id="outlined-basic" label="Phone Number" variant="outlined" size="small" className="w-full"/>
                                </div>
                                                          
                        </div>
                        <div className="flex items-center gap-4">
                            <Button className="!bg-green-600 hover:!bg-green-700 !text-white w-[100px]">Save</Button>
                            <Button className="bg-btn hover:bg-btn w-[100px]">Cancel</Button>
                        </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default MyAccount;