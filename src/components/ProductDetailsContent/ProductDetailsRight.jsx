
import { MdBrandingWatermark } from 'react-icons/md';
import { BiSolidCategory } from "react-icons/bi";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { TbCurrencyTaka } from "react-icons/tb";
import PropTypes from 'prop-types';

const ProductDetailsRight = ({ product }) => {
    return (
        <div>
            <div className="flex flex-col gap-3">
                <h2 className="text-[22px] font-bold mb-4">{product?.name}</h2>
                {/* <p className="text-gray-600">{product?.description}</p> */}
                <div className="flex items-center gap-3">
                    <span className='w-[25%]  text-sm font-semibold flex items-center gap-2'><MdBrandingWatermark className='opacity-65' /> Price</span>
                    <span>:</span>
                    <span className='flex items-center'><TbCurrencyTaka className='text-xl' />{product?.price}</span><span className='flex items-center line-through text-red-600 text-sm'><TbCurrencyTaka className='text-xl' />{product?.oldPrice}</span>
                </div>
                <div className="flex items-center gap-3">
                    <span className='w-[25%]  text-sm font-semibold flex items-center gap-2 text-blue-600 '><MdBrandingWatermark className='opacity-65 ' />Reselling Price</span>
                    <span>:</span>
                    <span className='flex items-center line-through text-blue-600 text-sm'><TbCurrencyTaka className='text-xl' />{product?.resellingPrice}</span>
                </div>
                {
                    product?.sku &&
                    <div className="flex items-center gap-3">
                        <span className='w-[25%]  text-sm font-semibold flex items-center gap-2'><MdBrandingWatermark className='opacity-65' /> SKU</span>
                        <span>:</span>
                        <span>{product?.sku}</span>
                    </div>
                }
                {
                    product?.brand &&
                    <div className="flex items-center gap-3">
                        <span className='w-[25%]  text-sm font-semibold flex items-center gap-2'><MdBrandingWatermark className='opacity-65' /> Brand</span>
                        <span>:</span>
                        <span>{product?.brand}</span>
                    </div>
                }

                <div className="flex items-center gap-3">
                    <span className='w-[25%]  text-sm font-semibold flex items-center gap-2'><BiSolidCategory className='opacity-65 text-xl' /> Category</span>
                    <span>:</span>
                    <span>{product?.catName}</span>
                </div>
                {
                    product?.shopName && 
                    <div className="flex items-center gap-3">
                    <span className='w-[25%]  text-sm font-semibold flex items-center gap-2'><MdBrandingWatermark className='opacity-65' /> Shop Name</span>
                    <span>:</span>
                    <span>{product?.shopName}</span>
                </div>
                }
                
                <div className="flex items-center gap-3">
                    <span className='w-[25%]  text-sm font-semibold flex items-center gap-2'><MdBrandingWatermark className='opacity-65' /> Stock</span>
                    <span>:</span>
                    <span>{product?.countInStock}</span>
                </div>
                <div className="flex items-center gap-3">
                    <span className='w-[25%]  text-sm font-semibold flex items-center gap-2'>
                        <MdBrandingWatermark className='opacity-65' /> Rating
                    </span>
                    <span>:</span>
                    <span className="flex items-center gap-1">
                        {Array.from({ length: 5 }, (_, i) => {
                            const rating = product?.rating || 0;
                            if (i < Math.floor(rating)) {
                                // পূর্ণ star
                                return <AiFillStar key={i} className="text-yellow-400" />;
                            } else if (i === Math.floor(rating) && rating % 1 !== 0) {
                                // হাফ star
                                return (
                                    <div key={i} className="relative w-4 h-4">
                                        <AiFillStar className="absolute top-0 left-0 text-yellow-400 w-2/4 overflow-hidden" />
                                        <AiOutlineStar className="absolute top-0 left-0 text-yellow-400 w-full" />
                                    </div>
                                );
                            } else {
                                // খালি star
                                return <AiOutlineStar key={i} className="text-gray-300" />;
                            }
                        })}
                    </span>
                </div>
                {/* color */}
                {
                    product?.color?.length !== 0 &&
                    <div className="flex items-center gap-3">
                        <span className='w-[25%]  text-sm font-semibold flex items-center gap-2'><MdBrandingWatermark className='opacity-65' /> Color</span>
                        <span>:</span>
                        <div className='flex gap-2'>
                            {
                                product?.color?.map((color, idx) => {
                                    return (
                                        <span className='inline-block py-1 px-2 shadow-sm bg-violet-200 text-[12px] font-[500] ' key={idx}>{color}</span>
                                    )
                                })
                            }
                        </div>
                    </div>
                }
                {/* size */}
                {
                    product?.productSize?.length !== 0 &&
                    <div className="flex items-center gap-3">
                        <span className='w-[25%]  text-sm font-semibold flex items-center gap-2'><MdBrandingWatermark className='opacity-65' /> Size</span>
                        <span>:</span>
                        <div className='flex gap-2'>
                            {
                                product?.productSize?.map((size, idx) => {
                                    return (
                                        <span className='inline-block py-1 px-2 shadow-sm bg-[#fff] text-[12px] font-[500] ' key={idx}>{size}</span>
                                    )
                                })
                            }
                        </div>
                    </div>
                }
                {/* Weight */}
                {Array.isArray(product?.productWeight) && product?.productWeight.length > 0 && (
                    <div className="flex items-center gap-3">
                        <span className='w-[25%] text-sm font-semibold flex items-center gap-2'>
                            <MdBrandingWatermark className='opacity-65' /> Weight
                        </span>
                        <span>:</span>
                        <div className='flex gap-2'>
                            {product?.productWeight.map((weight, idx) => (
                                <span key={idx} className='inline-block py-1 px-2 shadow-sm bg-[#fff] text-[12px] font-[500]'>
                                    {weight}
                                </span>
                            ))}
                        </div>
                    </div>
                )}
                {/* Created at */}
                <div className="flex items-center gap-3">
                    <span className='w-[25%]  text-sm font-semibold flex items-center gap-2'><MdBrandingWatermark className='opacity-65' /> Published</span>
                    <span>:</span>
                    <span>
                        {product?.createdAt
                            ? new Date(product.createdAt).toLocaleString() // লোকাল ডেট ও টাইম
                            : "-"}
                    </span>
                </div>

                {/* whatsapp */}
                <div className="flex items-center gap-3">
                    <span className='w-[25%]  text-sm font-semibold flex items-center gap-2'>
                        <MdBrandingWatermark className='opacity-65' />
                        Whatsapp
                    </span>
                    <span>:</span>
                    <a
                        href={`https://wa.me/${String(product?.whatsApp).replace(/\D/g, '')}?text=${encodeURIComponent(`Hi, I'm interested in your product: ${product?.name}. Details: ${window.location.origin}/product/${product?._id}`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-green-700 font-semibold hover:underline"
                    >
                        +{product?.whatsApp}
                    </a>
                </div>

                {/* <button className="bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700 transition">
          Add to Cart
        </button> */}
            </div>

        </div>
    );
};

export default ProductDetailsRight;
ProductDetailsRight.propTypes = {
    product: PropTypes.object
}