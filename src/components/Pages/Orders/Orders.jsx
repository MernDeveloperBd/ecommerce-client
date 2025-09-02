import { Button } from "@mui/material";
import AccountSideBar from "../../AccountSidebar/AccountSideBar";
import { FaAngleDown } from "react-icons/fa6";
import Badge from "../../Badge/Badge";
import { useState } from "react";
import { FaAngleUp } from "react-icons/fa";



const Orders = () => {
    const [isOpenOrderedProduct, setIsOpenOrderedProduct] = useState(null)

    const isShowOrderedProduct = (index) => {
        if (isOpenOrderedProduct === index) {
            setIsOpenOrderedProduct(null)
        } else {
            setIsOpenOrderedProduct(index)
        }
    }
    return (
        <section className="py-10 w-full">
            <div className="container flex gap-5">
                {/* left sidebar */}
                <div className="col1 w-[20%]">
                    <AccountSideBar />
                </div>
                {/*  right*/}
                <div className="col2 w-[80%]">
                    <div className="shadow-m rounded-md bg-white">
                        <div className="py-2 px-3 border-b border-[rgba(0,0,0,0.2)]">
                            <h2 className="text-xl font-bold">My Orders</h2>
                            <p>There are <span className="font-bold text-primary">2</span> Products in my Order list</p>
                            <div className="relative overflow-x-auto mt-5">
                                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                        <tr>
                                            <th  className="px-6 py-3">
                                               &nbsp;
                                            </th>
                                            <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                                Order Id
                                            </th>
                                            <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                                Payment Id
                                            </th>
                                            <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                                Name
                                            </th>
                                            <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                                Phone Number
                                            </th>
                                            <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                                Address
                                            </th>
                                            <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                                Total Amount
                                            </th>
                                            <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                                Email
                                            </th>
                                            <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                                User Id
                                            </th>
                                            <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                                Order Status
                                            </th>
                                            <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                                Date
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                                            <td className="px-6 py-4">
                                                 <Button onClick={() => isShowOrderedProduct(0)} className="!w-[35px] !h-[35px] !min-w-[35px] !rounded-full !bg-[#f1f1f1]">
                                                    {isOpenOrderedProduct === 0 ? <FaAngleUp className="text-[18px]" /> : <FaAngleDown className="text-[18px]" />}
                                                </Button>
                                            </td>
                                            <td className="px-6 py-4">
                                                id123456
                                            </td>
                                            <td className="px-6 py-4">
                                                SPI2546587s74
                                            </td>
                                            <td className="px-6 py-4">
                                                Abdul Aziz
                                            </td>
                                            <td className="px-6 py-4">
                                                +880157845896
                                            </td>
                                            <td className="px-6 py-4">
                                                Dhaka, Dhanmondi, kasdfs
                                            </td>
                                            <td className="px-6 py-4">
                                                Tk 2999
                                            </td>
                                            <td className="px-6 py-4">
                                                merndevelpler@gmail.com
                                            </td>
                                            <td className="px-6 py-4">
                                                UI564555
                                            </td>
                                            <td className="px-6 py-4">
                                                <Badge status="Delivered" />
                                            </td>
                                            <td className="px-6 py-4">
                                                17 Jun 2025
                                            </td>

                                        </tr>                                       
                                        {
                                            isOpenOrderedProduct === 0 && (
                                                <tr>
                                                    <td className="bg-[#f1f1f1]" colSpan={12}>
                                                        <div className=" overflow-x-auto mt-5">
                                                            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                                                    <tr>
                                                                        <td className="px-6 py-4">
                                                                            &nbsp;
                                                                        </td>

                                                                        <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                                                            Product Id
                                                                        </th>
                                                                        <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                                                            Product Title
                                                                        </th>
                                                                        <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                                                            Image
                                                                        </th>
                                                                        <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                                                            Quantity
                                                                        </th>
                                                                        <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                                                            Price
                                                                        </th>
                                                                        <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                                                            Sub Total
                                                                        </th>
                                                                     
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                                                                        <td className="px-6 py-4">
                                                                            &nbsp;
                                                                        </td>
                                                                        <td className="px-6 py-4">
                                                                            id123456
                                                                        </td>
                                                                        <td className="px-6 py-4">
                                                                            Product title here
                                                                        </td>
                                                                        <td className="px-6 py-4">
                                                                            <img src="https://i.ibb.co/S4sxz04T/Cotton-Print-Panjabi-1-kenakata-bazar-bd.jpg" alt="" className="w-12 h-12 rounded-md object-cover"/>
                                                                        </td>
                                                                        <td className="px-6 py-4">
                                                                            02
                                                                        </td>
                                                                        <td className="px-6 py-4">
                                                                            Dhaka, Dhanmondi, kasdfs
                                                                        </td>
                                                                        <td className="px-6 py-4">
                                                                            Tk 2999
                                                                        </td>
                                                                       


                                                                    </tr>
                                                                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                                                                        <td className="px-6 py-4">
                                                                            &nbsp;
                                                                        </td>
                                                                        <td className="px-6 py-4">
                                                                            id123456
                                                                        </td>
                                                                        <td className="px-6 py-4">
                                                                            Product title here
                                                                        </td>
                                                                        <td className="px-6 py-4">
                                                                            <img src="https://i.ibb.co/S4sxz04T/Cotton-Print-Panjabi-1-kenakata-bazar-bd.jpg" alt="" className="w-12 h-12 rounded-md object-cover"/>
                                                                        </td>
                                                                        <td className="px-6 py-4">
                                                                            02
                                                                        </td>
                                                                        <td className="px-6 py-4">
                                                                            Dhaka, Dhanmondi, kasdfs
                                                                        </td>
                                                                        <td className="px-6 py-4">
                                                                            Tk 2999
                                                                        </td>
                                                                       


                                                                    </tr>


                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )
                                        }
                                         {/* next row */}
                                         <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                                            <td className="px-6 py-4">
                                                 <Button onClick={() => isShowOrderedProduct(1)} className="!w-[35px] !h-[35px] !min-w-[35px] !rounded-full !bg-[#f1f1f1]">
                                                    {isOpenOrderedProduct === 1 ? <FaAngleUp className="text-[18px]" /> : <FaAngleDown className="text-[18px]" />}
                                                </Button>
                                            </td>
                                            <td className="px-6 py-4">
                                                id123456
                                            </td>
                                            <td className="px-6 py-4">
                                                SPI2546587s74
                                            </td>
                                            <td className="px-6 py-4">
                                                Abdul Aziz
                                            </td>
                                            <td className="px-6 py-4">
                                                +880157845896
                                            </td>
                                            <td className="px-6 py-4">
                                                Dhaka, Dhanmondi, kasdfs
                                            </td>
                                            <td className="px-6 py-4">
                                                Tk 2999
                                            </td>
                                            <td className="px-6 py-4">
                                                merndevelpler@gmail.com
                                            </td>
                                            <td className="px-6 py-4">
                                                UI564555
                                            </td>
                                            <td className="px-6 py-4">
                                                <Badge status="Delivered" />
                                            </td>
                                            <td className="px-6 py-4">
                                                17 Jun 2025
                                            </td>

                                        </tr>                                       
                                        {
                                            isOpenOrderedProduct === 1 && (
                                                <tr>
                                                    <td className="bg-[#f1f1f1]" colSpan={12}>
                                                        <div className=" overflow-x-auto mt-5">
                                                            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                                                    <tr>
                                                                        <td className="px-6 py-4">
                                                                            &nbsp;
                                                                        </td>

                                                                        <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                                                            Product Id
                                                                        </th>
                                                                        <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                                                            Product Title
                                                                        </th>
                                                                        <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                                                            Image
                                                                        </th>
                                                                        <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                                                            Quantity
                                                                        </th>
                                                                        <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                                                            Price
                                                                        </th>
                                                                        <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                                                            Sub Total
                                                                        </th>
                                                                     
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                                                                        <td className="px-6 py-4">
                                                                            &nbsp;
                                                                        </td>
                                                                        <td className="px-6 py-4">
                                                                            id123456
                                                                        </td>
                                                                        <td className="px-6 py-4">
                                                                            Product title here
                                                                        </td>
                                                                        <td className="px-6 py-4">
                                                                            <img src="https://i.ibb.co/S4sxz04T/Cotton-Print-Panjabi-1-kenakata-bazar-bd.jpg" alt="" className="w-12 h-12 rounded-md object-cover"/>
                                                                        </td>
                                                                        <td className="px-6 py-4">
                                                                            02
                                                                        </td>
                                                                        <td className="px-6 py-4">
                                                                            TK 1000
                                                                        </td>
                                                                        <td className="px-6 py-4">
                                                                            Tk 2999
                                                                        </td>
                                                                       


                                                                    </tr>
                                                                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                                                                        <td className="px-6 py-4">
                                                                            &nbsp;
                                                                        </td>
                                                                        <td className="px-6 py-4">
                                                                            id123456
                                                                        </td>
                                                                        <td className="px-6 py-4">
                                                                            Product title here
                                                                        </td>
                                                                        <td className="px-6 py-4">
                                                                            <img src="https://i.ibb.co/S4sxz04T/Cotton-Print-Panjabi-1-kenakata-bazar-bd.jpg" alt="" className="w-12 h-12 rounded-md object-cover"/>
                                                                        </td>
                                                                        <td className="px-6 py-4">
                                                                            02
                                                                        </td>
                                                                        <td className="px-6 py-4">
                                                                            TK 1200
                                                                        </td>
                                                                        <td className="px-6 py-4">
                                                                            Tk 2999
                                                                        </td>
                                                                       


                                                                    </tr>


                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )
                                        }
                                        {/* next row end */}

                                    </tbody>
                                </table>
                            </div>
                        </div>


                    </div>
                </div>
            </div>
        </section>
    );
};

export default Orders;