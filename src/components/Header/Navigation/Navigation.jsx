import { Button } from '@mui/material';
import './Navigation.css'
import { RiMenu2Fill } from "react-icons/ri";
import { IoIosArrowDown } from "react-icons/io";
import { Link, NavLink } from 'react-router-dom';
import { GoRocket } from "react-icons/go";
import CategoryPanel from './CategoryPanel';
import { useState } from 'react';

const Navigation = () => {
    const [isOpenPanel, setIsOpenPanel] = useState(false)

    const openCategoryPanel = () => {
        setIsOpenPanel(true)
    };

    return (
        <>
            <nav className=''>
                <div className='container flex items-center justify-end gap-6'>
                    <div className='col_1 w-[20%]'>
                        <Button onClick={openCategoryPanel} className='!text-black gap-2 !font-bold w-full'><RiMenu2Fill className='text-[18px]' />Shop By Categories <IoIosArrowDown className='text-[13px] ml-auto font-bold ' /></Button>
                    </div>
                    {/* middle side */}
                    <div className='col_2 w-[70%]'>
                        <ul className='flex items-center gap-3 nav '>
                            <li className=''>
                                <NavLink to={"/"} className='hover:text-linkHover transition text-[14px] font-[500]'>হোম</NavLink>
                            </li>
                            <li className='relative'>
                                <NavLink to={"/fashion"} className='hover:text-linkHover transition text-[14px] font-[500]'>পোশাক</NavLink>
                                {/* submenu */}
                                <div className='subMunu absolute top-[120%] left-[0%] min-w-[150px] bg-white shadow-md opacity-0 transition-all'>
                                    <ul>
                                        <li className='w-full mt-2'>
                                            <Link to='/panjabi'><Button className='!text-black w-full !text-left !justify-start !rounded-none'>পাঞ্জাবী</Button></Link>
                                             {/* inner Sub menu */}
                                            {/* submenu */}
                                            <div className='subMunu absolute top-[0%] left-[100%] min-w-[150px] bg-white shadow-md opacity-0 transition-all'>
                                                <ul>
                                                    <li className='w-full relative mt-2'>
                                                        <Link to='/panjabi'><Button className='!text-black w-full !text-left !justify-start !rounded-none'>পাঞ্জাবী 1</Button></Link>
                                                        {/* inner Sub menu */}

                                                    </li>
                                                    <li className='w-full'>
                                                        <Link to='/paijama'><Button className='!text-black w-full !text-left !justify-start !rounded-none'>পায়জামা 1</Button></Link>
                                                    </li>
                                                </ul>
                                            </div>
                                        </li>
                                        <li className='w-full'>
                                            <Link to='/paijama'><Button className='!text-black w-full !text-left !justify-start !rounded-none'>পায়জামা</Button></Link>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                            <li className='relative'>
                                <NavLink to={"/islamic-products"} className='hover:text-linkHover transition text-[14px] font-[500]'>ইসলামিক সামগ্রী</NavLink>
                                {/* submenu */}
                                <div className='subMunu absolute top-[120%] left-[0%] min-w-[150px] bg-white shadow-md opacity-0 transition-all'>
                                    <ul>
                                        <li className='w-full relative mt-2'>
                                            <Link to='/panjabi'><Button className='!text-black w-full !text-left !justify-start !rounded-none'>পাঞ্জাবী</Button></Link>
                                            {/* inner Sub menu */}
                                            <div className='subMunu absolute top-[0%] left-[100%] min-w-[150px] bg-white shadow-md opacity-0 transition-all'>
                                                <ul>
                                                    <li className='w-full relative'>
                                                        <Link to='/panjabi'><Button className='!text-black w-full !text-left !justify-start !rounded-none'>পাঞ্জাবী 1</Button></Link>
                                                        {/* inner Sub menu */}

                                                    </li>
                                                    <li className='w-full'>
                                                        <Link to='/paijama'><Button className='!text-black w-full !text-left !justify-start !rounded-none'>পায়জামা 1</Button></Link>
                                                    </li>
                                                </ul>
                                            </div>

                                        </li>
                                        <li className='w-full'>
                                            <Link to='/paijama'><Button className='!text-black w-full !text-left !justify-start !rounded-none'>পায়জামা</Button></Link>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                            <li className='relative'>
                                <NavLink to={"/traditional-products"} className='hover:text-linkHover transition text-[14px] font-[500]'>ঐতিহ্যবাহী পোশাক</NavLink>
                                {/* submenu */}
                                <div className='subMunu absolute top-[120%] left-[0%] min-w-[150px] bg-white shadow-md opacity-0 transition-all'>
                                    <ul>
                                        <li className='w-full mt-2'>
                                            <Link to='/panjabi'><Button className='!text-black w-full !text-left !justify-start !rounded-none'>পাঞ্জাবী</Button></Link>
                                        </li>
                                        <li className='w-full'>
                                            <Link to='/paijama'><Button className='!text-black w-full !text-left !justify-start !rounded-none'>পায়জামা</Button></Link>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                            <li className='relative'>
                                <NavLink to={"/moshari"} className='hover:text-linkHover transition text-[14px] font-[500]'>মশারী</NavLink>
                                {/* submenu */}
                                <div className='subMunu absolute top-[120%] left-[0%] min-w-[150px] bg-white shadow-md opacity-0 transition-all'>
                                    <ul>
                                        <li className='w-full mt-2'>
                                            <Link to='/panjabi'><Button className='!text-black w-full !text-left !justify-start !rounded-none'>পাঞ্জাবী</Button></Link>
                                        </li>
                                        <li className='w-full'>
                                            <Link to='/paijama'><Button className='!text-black w-full !text-left !justify-start !rounded-none'>পায়জামা</Button></Link>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                            <li className='relative'>
                                <NavLink to={"/organic-products"} className='hover:text-linkHover transition text-[14px] font-[500]'>অরগানিক দ্রব্য</NavLink>
                                {/* submenu */}
                                <div className='subMunu absolute top-[120%] left-[0%] min-w-[150px] bg-white shadow-md opacity-0 transition-all'>
                                    <ul>
                                        <li className='w-full'>
                                            <Link to='/panjabi'><Button className='!text-black w-full !text-left !justify-start !rounded-none'>পাঞ্জাবী</Button></Link>
                                        </li>
                                        <li className='w-full'>
                                            <Link to='/paijama'><Button className='!text-black w-full !text-left !justify-start !rounded-none'>পায়জামা</Button></Link>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                            <li className='relative'>
                                <NavLink to={"/muja"} className='hover:text-linkHover transition text-[14px] font-[500]'>মোজা</NavLink>
                                {/* submenu */}
                                <div className='subMunu absolute top-[120%] left-[0%] min-w-[150px] bg-white shadow-md opacity-0 transition-all'>
                                    <ul>
                                        <li className='w-full'>
                                            <Link to='/panjabi'><Button className='!text-black w-full !text-left !justify-start !rounded-none'>পাঞ্জাবী</Button></Link>
                                        </li>
                                        <li className='w-full'>
                                            <Link to='/paijama'><Button className='!text-black w-full !text-left !justify-start !rounded-none'>পায়জামা</Button></Link>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                        </ul>
                    </div>
                    {/* right side */}
                    <div className='col_3 w-[10%]'>

                        <p className='text-[14px] font-[500] flex items-center gap-3 mb-0 mt-0'>
                            <GoRocket className='text-[18px]' />
                            Free Delivery
                        </p>
                    </div>

                </div>
            </nav>
            {/* Category panel component */}
            <CategoryPanel isOpenPanel={isOpenPanel} setIsOpenPanel={setIsOpenPanel} />
        </>
    );
};

export default Navigation;