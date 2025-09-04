import { Link } from 'react-router-dom';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import Button from "@mui/material/Button";
import { MdAddShoppingCart, MdClose, MdZoomOutMap } from "react-icons/md";
import { IoGitCompareOutline } from "react-icons/io5";
import { FaRegHeart } from "react-icons/fa6";
import Tooltip from '@mui/material/Tooltip';
import { useContext, useEffect, useMemo, useState } from 'react';
import { MyContext } from '../../App';
import PropTypes from 'prop-types';
import { FaMinus, FaPlus } from 'react-icons/fa';
import { deleteData, editData } from '../../utils/api';

const ProductItem = ({ product }) => {
  const { userData, handleOpenProductdetailModel, addToCart, cartData, openAlertBox, getCartItems, handleAddToMyList, setIsAddedMyList, isAddedMyList} = useContext(MyContext);
  const { _id, images = [], price, oldPrice, resellingPrice, catName, name, productSize } = product;
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);  
  const [cartItem, setCartItem] = useState([])
  const [activeTab, setActiveTab] = useState(null)
  const [isShowTab, setIsShowTab] = useState(false)
  const[selectedTabName, setSelectedTabName] = useState(null)
  const [activeColorTab, setActiveColorTab] = useState(null);
const [selectedColor, setSelectedColor] = useState("");

  // ✅ Discount Calculation
  const discount =
    oldPrice && price
      ? Math.round(((oldPrice - price) / oldPrice) * 100)
      : 0;

      // Colors list (product.color বা product.productColor—দুটোর যেকোনোটা সাপোর্ট)
const colors = useMemo(() => {
  const arr = Array.isArray(product?.color)
    ? product.color
    : Array.isArray(product?.productColor)
    ? product.productColor
    : [];
  return arr.filter(Boolean);
}, [product?.color, product?.productColor]);



const handleClickActiveColorTab = (index, color) => {
  setActiveColorTab(index);
  setSelectedColor(color);
};
  // add to cart
  const handleAddToCart = (product, userId, quantity) => {
       const productItem = {
        _id:product?._id,
      name: product?.name,
      image: product?.images[0],
      rating: product?.rating,
      price: product?.price,
      quantity: quantity,
      subTotal: parseInt(product?.price * quantity),
      productId: product?.productId,
      countInStock: product?.countInStock,
      userId: userId,
      brand: product?.brand,
      productSize: selectedTabName,
      productColor: selectedColor,
      oldPrice: product?.oldPrice
    };
    if (productSize?.length !== 0) {
      setIsShowTab(true)
    }else{
      addToCart(productItem, userId, quantity)
      setIsAdded(true)
      setIsShowTab(false)
    }

    if (activeTab !== null) {
      addToCart(productItem, userId, quantity)
      setIsAdded(true)
      setIsShowTab(false)
    }
  };

  useEffect(() => {
    const item = cartData?.filter((cartItem) =>
      cartItem.productId.includes(product?._id)
    )

    if (item?.length !== 0) {
      setCartItem(item)
      setQuantity(item[0]?.quantity);
      setIsAdded(true)
    }
  }, [cartData, product]);

  const minusQty = () => {
    if (quantity !== 1 && quantity > 1) {
      setQuantity(quantity - 1)
    } else {
      setQuantity(1)
    }
    if (quantity === 1) {
      deleteData(`/api/cart/delete_cart_item/${cartItem[0]?._id}`).then((res) => {
        setIsAdded(false)
        openAlertBox("success", "Cart Item removed")
        getCartItems()
        setIsShowTab(false)
        setActiveTab(null)
      })
    } else {
      const obj = {
        _id: cartItem[0]?._id,
        qty: quantity - 1,
        subTotal: price * (quantity - 1)
      };
      editData(`/api/cart/update_qty`, obj).then((res) => {
        openAlertBox("success", res?.data?.message)

      })
    }
  }
  const addQty = () => {
    setQuantity(quantity + 1);
    const obj = {
      _id: cartItem[0]?._id,
      qty: quantity + 1,
      subTotal: price * (quantity + 1)
    };
    editData(`/api/cart/update_qty`, obj).then((res) => {
      openAlertBox("success", res?.data?.message)
    })
  };

  const handleClickActiveTab = (index, name) => {
    setActiveTab(index)
    setSelectedTabName(name)
  };

  // Wish list
  const handleAddWishList= (product) =>{
    console.log(product);
    handleAddToMyList(product)
  }

  return (
    <div className="group productItem h-full flex flex-col overflow-hidden rounded-xl border border-gray-200/60 bg-white shadow-[0_1px_6px_rgba(0,0,0,0.04)] hover:shadow-[0_10px_28px_rgba(2,6,23,0.06)] transition-all duration-300">
      {/* Image */}
      <div className="relative w-full aspect-[4/3]">
        <Link to={`/productDetails/${_id}`} className="block h-full w-full">
          <img
            src={images?.[0] || 'https://via.placeholder.com/600x400?text=Product'}
            alt={name || 'product'}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
          />
          <img
            src={images?.[1] || images?.[0] || 'https://via.placeholder.com/600x400?text=Product'}
            alt={`${name || 'product'} hover`}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          />
          {/* Very light overlay on hover */}
          <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/5 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        </Link>

        {/* midle icon */}
       {/* midle icon */}
{
  isShowTab === true && (
    <div className="flex items-center justify-center absolute top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.7)] z-[60] p-3 gap-2">
      <Button className='!absolute top-1 right-1.5 !min-w-[35px] !min-h-[35px] !rounded-full !bg-[rgba(0,0,0,0.2)]' onClick={()=>setIsShowTab(false)}>
    <MdClose className=' z-[90] text-white text-[20px]'/>
      </Button>
      
      <div className="flex flex-col items-center gap-2">
        {/* Sizes */}
        <div className="flex items-center gap-2">
          {Array.isArray(product?.productSize) && product?.productSize?.length > 0 &&
            product.productSize.map((size, index) => (
              <span
                key={index}
                className={`flex items-center justify-center w-6 h-6 bg-white/80 text-xs rounded-sm cursor-pointer hover:bg-white ${activeTab === index && "!bg-orange-600 !text-white"}`}
                onClick={() => handleClickActiveTab(index, size)}
              >
                {size}
              </span>
            ))
          }
        </div>

        {/* Colors */}
        {colors.length > 0 && (
          <div className="flex items-center gap-2">
            {colors.map((clr, index) => (
              <span
                key={index}
                className={`flex items-center justify-center w-auto min-w-[24px] h-6 px-2 bg-white/80 text-xs rounded-sm cursor-pointer hover:bg-white ${activeColorTab === index && "!bg-orange-600 !text-white"}`}
                onClick={() => handleClickActiveColorTab(index, clr)}
                title={String(clr)}
              >
                {clr}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
        {/* Discount Badge (soft) */}
        {discount ? (
          <span className="absolute top-2 left-2 z-10 inline-flex items-center rounded-full border border-rose-200 bg-rose-50 px-2 py-0.5 text-[10px] md:text-xs font-semibold text-rose-600 shadow-sm">
            -{discount}%
          </span>
        ) : null}

        {/* Action Buttons (subtle) */}
        <div className="absolute top-2 right-2 flex flex-col gap-2 translate-x-2 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
          <Tooltip title="Quick View" placement="left">
            <Button
              onClick={() => handleOpenProductdetailModel(true, { product })}
              aria-label="Quick View"
              className="!w-8 !h-8 !min-w-0 !rounded-full !bg-white/90 !text-slate-700 ring-1 ring-gray-200 shadow-sm transition-colors hover:!bg-sky-50 hover:!text-sky-700 hover:ring-sky-200"
            >
              <MdZoomOutMap className="text-[16px]" />
            </Button>
          </Tooltip>
          <Tooltip title="Compare" placement="left">
            <Button
              aria-label="Compare"
              className="!w-8 !h-8 !min-w-0 !rounded-full !bg-white/90 !text-slate-700 ring-1 ring-gray-200 shadow-sm transition-colors hover:!bg-sky-50 hover:!text-sky-700 hover:ring-sky-200"
            >
              <IoGitCompareOutline className="text-[16px]" />
            </Button>
          </Tooltip>
          <Tooltip title="Wishlist" placement="left">
            <Button
            onClick={()=>handleAddWishList(product)}
              aria-label="Wishlist"
              className="!w-8 !h-8 !min-w-0 !rounded-full !bg-white/90 !text-slate-700 ring-1 ring-gray-200 shadow-sm transition-colors hover:!bg-sky-50 hover:!text-sky-700 hover:ring-sky-200"
            >
              <FaRegHeart className="text-[16px]" />
            </Button>
          </Tooltip>
        </div>
      </div>

      {/* Product Info (flex-1 so CTA can stick to bottom) */}
      <div className="p-3 md:p-4 flex-1 flex flex-col">
        {/* Category chip (soft, optional) */}
        {catName ? (
          <span className="inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-700">
            {catName}
          </span>
        ) : null}

        {/* Title */}
        <Link to={`/productDetails/${_id}`}>
          <h3 className="mt-1 text-sm md:text-[13px] font-semibold text-slate-900 hover:text-sky-700 transition-colors line-clamp-2 leading-snug min-h-[36px]">
            {name}
          </h3>
        </Link>

        {/* Rating */}
        <div className="mt-1">
          <Stack spacing={0.5}>
            <Rating name="size-small" defaultValue={4} size="small" readOnly />
          </Stack>
        </div>

        {/* Pricing block */}
        <div className="mt-2 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[13px] md:text-sm font-bold text-slate-900">
              Tk <span className="text-sky-700">{price}</span>
            </span>
            {oldPrice && (
              <span className="text-xs md:text-[13px] text-rose-400 line-through">
                Tk {oldPrice}
              </span>
            )}
          </div>

          {/* Reselling price */}
          {typeof resellingPrice !== "undefined" && resellingPrice !== null && (
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1 rounded-full border border-amber-200 bg-amber-50 px-2 py-0.5 text-[11px] font-semibold text-amber-700">
                Resell: Tk {resellingPrice}
              </span>
            </div>
          )}
        </div>

        {/* CTA pinned to bottom */}
        <div className="mt-auto pt-2">
          {/* quantity field */}
          {
            isAdded === false ? <Button
              onClick={() => handleAddToCart(product, userData?._id, quantity)}
              aria-label="Add to cart"
              className="!w-full !h-9 !min-h-0 !rounded-lg
                 !bg-gradient-to-r !from-violet-500 !to-fuchsia-500 !text-white
                 hover:!opacity-95 shadow-sm
                 !text-[12px] md:!text-[13px] !font-semibold"
            >
              <MdAddShoppingCart className="text-[16px] mr-1" />
              Add to cart
            </Button> :

              <div className='flex items-center justify-between overflow-hidden rounded-full border border-[rgba(0,0,0,0.4)] mb-2'>
                <Button onClick={minusQty} className='!min-w-[30px] !w-[30px] !h-[30px] !bg-[#f1f1f1]'><FaMinus /></Button>
                <span>{quantity}</span>
                <Button onClick={addQty} className='!min-w-[30px] !w-[30px] !h-[30px] !bg-orange-600 !rounded-l-none'><FaPlus className='text-white' /></Button>
              </div>
          }



        </div>
      </div>
    </div>
  );
};

export default ProductItem;

ProductItem.propTypes = {
  product: PropTypes.object
}