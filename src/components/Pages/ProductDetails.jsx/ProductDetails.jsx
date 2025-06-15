import Breadcrumbs from '@mui/material/Breadcrumbs';
import { Link } from 'react-router-dom';
import ProductZoom from '../../ProductZoom/ProductZoom';
import ProductDetailsContent from '../../ProductDetailsContent/ProductDetailsContent';
import { useState } from 'react';
import { Button, Rating } from '@mui/material';
import TextField from '@mui/material/TextField';
import ProductsSlider from '../../ProductsSlider/ProductsSlider';

const ProductDetails = () => {
   
    const [activeTab, setActiveTab] = useState(0)

    function handleClick(event) {
        event.preventDefault();
        console.info('You clicked a breadcrumb.');
    }

    return (
        <div className='py-5 pb-0'>
            <div role="presentation" onClick={handleClick} className="container pb-2">
                <Breadcrumbs aria-label="breadcrumb">
                    <Link underline="hover" color="inherit" to="/" className="link">
                        Home
                    </Link>
                    <Link
                        underline="hover"
                        color="inherit"
                        to="/productListing"
                        className="link"
                    >
                        Shop
                    </Link>
                    <Link
                        underline="hover"
                        color="inherit"
                        href="/shop"
                        className="link"
                    >
                        product details title
                    </Link>

                </Breadcrumbs>
            </div>
            {/* product details */}
            <section className='bg-white py-5'>
                <div className='container flex gap-4'>
                    <div className="productZoomContainer w-[30%] h-[450px] overflow-hidden">
                        <ProductZoom />
                    </div>
                    <div className="rightDiv md:w-[70%] ">
                        <ProductDetailsContent/>
                    </div>

                </div>
                {/* Description and rivew */}
                <div className='container'>
                    <div className="flex items-center gap-4 mb-5">
                        <span className={`link text-[17px] font-[600] ${activeTab === 0 && 'text-primary'}`} onClick={() => setActiveTab(0)}>Description</span>
                        <span className={`link text-[17px] font-[600] ${activeTab === 1 && 'text-primary'}`} onClick={() => setActiveTab(1)}>Product Details</span>
                        <span className={`link text-[17px] font-[600] ${activeTab === 2 && 'text-primary'}`} onClick={() => setActiveTab(2)}>Reviews (5)</span>
                    </div>
                    {
                        activeTab === 0 && <div className="shadow-md w-full p-5 rounded-md">
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam, laborum aspernatur dolore sapiente, saepe quae non voluptatibus est commodi iusto unde sed explicabo possimus architecto doloremque voluptas. Reprehenderit, laborum deleniti!</p>
                            <h4 className='text-lg font-semibold'>Light weigh desing</h4>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam, laborum aspernatur dolore sapiente, saepe quae non voluptatibus est commodi iusto unde sed explicabo possimus architecto doloremque voluptas. Reprehenderit, laborum deleniti!</p>
                            <h4 className='text-lg font-semibold'>Free Shipping</h4>
                            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Consequuntur, qui!</p>
                            <h4 className='text-lg font-semibold'>Money Back Gurantee</h4>
                            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Consequuntur, qui!</p>
                            <h4 className='text-lg font-semibold'>Online Support</h4>
                            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Consequuntur, qui!</p>
                        </div>
                    }
                    {
                        activeTab === 1 &&

                        <div className="shadow-md w-fullrounded-md p-5 rounded-md">
                            <div className="relative overflow-x-auto">
                                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                        <tr>
                                            <th scope="col" className="px-6 py-3">
                                                Product name
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Color
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Category
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Price
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                Apple MacBook Pro 17
                                            </th>
                                            <td className="px-6 py-4">
                                                Silver
                                            </td>
                                            <td className="px-6 py-4">
                                                Laptop
                                            </td>
                                            <td className="px-6 py-4">
                                                Tk 2999
                                            </td>
                                        </tr>
                                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                Microsoft Surface Pro
                                            </th>
                                            <td className="px-6 py-4">
                                                White
                                            </td>
                                            <td className="px-6 py-4">
                                                Laptop PC
                                            </td>
                                            <td className="px-6 py-4">
                                                TK 1999
                                            </td>
                                        </tr>
                                        <tr className="bg-white dark:bg-gray-800">
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                Magic Mouse 2
                                            </th>
                                            <td className="px-6 py-4">
                                                Black
                                            </td>
                                            <td className="px-6 py-4">
                                                Accessories
                                            </td>
                                            <td className="px-6 py-4">
                                                TK 99
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                    }

                    {
                        activeTab === 2 && (
                            <div className='shadow-md w-[80%] rounded-md p-5'>
                                <div className='w-full productReviewsContainer'>
                                    <h2 className='font-semibold text-lg'>Customer questions & answers</h2>
                                    {/* comment and answers */}
                                    <div className="scroll w-full max-h-[300px] overflow-y-scroll-auto overflow-x-hidden mt-4">
                                        {/* 1st review */}
                                        <div className="review w-full p-3 flex items-center justify-between border-b border-[rgba(0,0,0,0.2)]">
                                            <div className="info w-[60%] flex items-center gap-2">
                                                <div className="img w-[60px] h-[60px] overflow-hidden rounded-full">
                                                    <img src="https://www.shutterstock.com/image-vector/businessman-profile-picture-user-sign-260nw-302150789.jpg" alt="" className='w-full ' />
                                                </div>
                                                <div className='w-[80%]'>
                                                    <h4 className='text-[16px] font-[500]'>Abdul Aziz</h4>
                                                    <h5 className='text-[13px] mb-0'>2025-06-14</h5>
                                                    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Doloremque, totam.</p>
                                                </div>

                                            </div>
                                            <Rating name='size-small' defaultValue={4} size='small' readOnly>

                                            </Rating>
                                        </div>
                                        {/* 1st review */}
                                        <div className="review w-full p-3 flex items-center justify-between border-b border-[rgba(0,0,0,0.2)]">
                                            <div className="info w-[60%] flex items-center gap-2">
                                                <div className="img w-[60px] h-[60px] overflow-hidden rounded-full">
                                                    <img src="https://www.shutterstock.com/image-vector/businessman-profile-picture-user-sign-260nw-302150789.jpg" alt="" className='w-full ' />
                                                </div>
                                                <div className='w-[80%]'>
                                                    <h4 className='text-[16px] font-[500]'>Abdul Aziz</h4>
                                                    <h5 className='text-[13px] mb-0'>2025-06-14</h5>
                                                    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Doloremque, totam.</p>
                                                </div>

                                            </div>
                                            <Rating name='size-small' defaultValue={4} size='small' readOnly>

                                            </Rating>
                                        </div>
                                        {/* 1st review */}
                                        <div className="review w-full p-3 flex items-center justify-between border-b border-[rgba(0,0,0,0.2)]">
                                            <div className="info w-[60%] flex items-center gap-2">
                                                <div className="img w-[60px] h-[60px] overflow-hidden rounded-full">
                                                    <img src="https://www.shutterstock.com/image-vector/businessman-profile-picture-user-sign-260nw-302150789.jpg" alt="" className='w-full ' />
                                                </div>
                                                <div className='w-[80%]'>
                                                    <h4 className='text-[16px] font-[500]'>Abdul Aziz</h4>
                                                    <h5 className='text-[13px] mb-0'>2025-06-14</h5>
                                                    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Doloremque, totam.</p>
                                                </div>

                                            </div>
                                            <Rating name='size-small' defaultValue={4} size='small' readOnly>

                                            </Rating>
                                        </div>
                                        {/* 1st review */}
                                        <div className="review w-full p-3 flex items-center justify-between border-b border-[rgba(0,0,0,0.2)]">
                                            <div className="info w-[60%] flex items-center gap-2">
                                                <div className="img w-[60px] h-[60px] overflow-hidden rounded-full">
                                                    <img src="https://www.shutterstock.com/image-vector/businessman-profile-picture-user-sign-260nw-302150789.jpg" alt="" className='w-full ' />
                                                </div>
                                                <div className='w-[80%]'>
                                                    <h4 className='text-[16px] font-[500]'>Abdul Aziz</h4>
                                                    <h5 className='text-[13px] mb-0'>2025-06-14</h5>
                                                    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Doloremque, totam.</p>
                                                </div>

                                            </div>
                                            <Rating name='size-small' defaultValue={4} size='small' readOnly />
                                        </div>

                                    </div>
                                    {/* add comment */}
                                    <div className='reviewForm bg-[#fafafa] p-4 rounded-md'>
                                        <h2 className='text-[18px] mb-4'>Add a review</h2>
                                        <form className='w-full'>
                                            <TextField id='outlined-multiline-flexible' label='Add Your review' multiline rows={5} className='w-full' />
                                            <Rating name='size-small' defaultValue={4} size='small' readOnly className='mt-4' />
                                            <div className='flex items-center mt-4'>
                                                <Button className='!bg-orange-600 !text-white hover:!bg-orange-700 !font-[600]'>Submit Review</Button>
                                            </div>


                                        </form>
                                    </div>
                                </div>
                            </div>
                        )
                    }

                </div>
                
            </section>
            {/* Related Products */}
                <div className="  p-5">
                    <h2 className="container font-semibold text-[20px]">Related Products</h2>
                         <ProductsSlider items={6}/>
                </div>
        </div>
    );
};

export default ProductDetails;