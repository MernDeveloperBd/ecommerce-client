import { Link } from 'react-router-dom';
import './productItem.css'
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import Button from "@mui/material/Button"
import { MdClose, MdOutlineShoppingCart, MdZoomOutMap } from "react-icons/md";
import { IoGitCompareOutline } from "react-icons/io5";
import { FaRegHeart } from "react-icons/fa6";
import Tooltip from '@mui/material/Tooltip';
import { useContext, useEffect, useMemo, useState } from 'react';
import { MyContext } from '../../App';
import PropTypes from 'prop-types';
import { FaMinus, FaPlus } from 'react-icons/fa';
import { deleteData, editData } from '../../utils/api';

const ProductItemListView = ({ product }) => {
  const {
    userData,
    handleOpenProductdetailModel,
    addToCart,
    cartData,
    openAlertBox,
    getCartItems,
  } = useContext(MyContext);

  const {
    _id,
    images = [],
    brand,
    catName,
    resellingPrice,
    name,
    oldPrice,
    price,
    productSize,
  } = product;

  // State (ported from ProductItem)
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);
  const [cartItem, setCartItem] = useState([]);
  const [activeTab, setActiveTab] = useState(null);
  const [isShowTab, setIsShowTab] = useState(false);
  const [selectedTabName, setSelectedTabName] = useState(null);
const [activeColorTab, setActiveColorTab] = useState(null);
const [selectedColor, setSelectedColor] = useState("");
  // Discount
  const discount =
    oldPrice && price ? Math.round(((oldPrice - price) / oldPrice) * 100) : 0;

     // Colors list (product.color বা product.productColor—দুটোর যেকোনোটা সাপোর্ট)
    const colors = useMemo(() => {
      const arr = Array.isArray(product?.color)
        ? product.color
        : Array.isArray(product?.productColor)
        ? product.productColor
        : [];
      return arr.filter(Boolean);
    }, [product?.color, product?.productColor]);

  // Add to cart (ported)
  const handleAddToCart = (product, userId, quantity) => {
    const productItem = {
      _id: product?._id,
      name: product?.name,
      image: product?.images?.[0],
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
      oldPrice: product?.oldPrice,
    };

    if (productSize?.length !== 0) {
      setIsShowTab(true);
    } else {
      addToCart(productItem, userId, quantity);
      setIsAdded(true);
      setIsShowTab(false);
    }

    if (activeTab !== null) {
      addToCart(productItem, userId, quantity);
      setIsAdded(true);
      setIsShowTab(false);
    }
  };

  // Sync from cart
  useEffect(() => {
    const item = cartData?.filter((ci) => ci.productId?.includes(product?._id));
    if (item?.length !== 0) {
      setCartItem(item);
      setQuantity(item[0]?.quantity || 1);
      setIsAdded(true);
    } else {
      setCartItem([]);
      setIsAdded(false);
      setQuantity(1);
    }
  }, [cartData, product]);

  // Quantity -
  const minusQty = () => {
    if (quantity !== 1 && quantity > 1) {
      setQuantity(quantity - 1);
    } else {
      setQuantity(1);
    }

    if (quantity === 1) {
      // remove from cart
      deleteData(`/api/cart/delete_cart_item/${cartItem[0]?._id}`).then(() => {
        setIsAdded(false);
        openAlertBox('success', 'Cart Item removed');
        getCartItems();
        setIsShowTab(false);
        setActiveTab(null);
      });
    } else {
      // update qty
      const obj = {
        _id: cartItem[0]?._id,
        qty: quantity - 1,
        subTotal: price * (quantity - 1),
      };
      editData(`/api/cart/update_qty`, obj).then((res) => {
        openAlertBox('success', res?.data?.message);
      });
    }
  };

  // Quantity +
  const addQty = () => {
    setQuantity(quantity + 1);
    const obj = {
      _id: cartItem[0]?._id,
      qty: quantity + 1,
      subTotal: price * (quantity + 1),
    };
    editData(`/api/cart/update_qty`, obj).then((res) => {
      openAlertBox('success', res?.data?.message);
    });
  };

  // Size picker
  const handleClickActiveTab = (index, name) => {
    setActiveTab(index);
    setSelectedTabName(name);
  };
  const handleClickActiveColorTab = (index, color) => {
  setActiveColorTab(index);
  setSelectedColor(color);
};

  return (
    <div className="group productItem w-full flex flex-col md:flex-row items-stretch gap-4 rounded-2xl border border-gray-200 bg-white shadow-[0_1px_10px_rgba(2,6,23,0.05)] hover:shadow-[0_12px_34px_rgba(2,6,23,0.08)] transition-all">
      {/* Image */}
      <div className="imgWraper relative md:w-[170px] md:h-[170px] h-[220px] m-3 md:m-3 rounded-xl overflow-hidden ring-1 ring-gray-200 bg-gradient-to-b from-gray-100 to-gray-50">
        <Link to={`/productDetails/${_id}`} className="block h-full w-full">
          <img
            src={images?.[0] || 'https://via.placeholder.com/600x600?text=Product'}
            alt={name || 'popular image'}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            loading="lazy"
          />
          <img
            src={images?.[1] || images?.[0] || 'https://via.placeholder.com/600x600?text=Product'}
            alt={(name || 'popular image') + ' hover'}
            className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-700 group-hover:opacity-100"
            loading="lazy"
          />
          {/* soft overlay */}
          <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        </Link>

        {/* Size picker overlay (same behavior as ProductItem - only over image) */}
        {isShowTab === true && (
          <div className="flex flex-col gap-2 items-center justify-center absolute top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.7)] z-[60] p-3">
             <Button className='!absolute top-1 right-1.5 !min-w-[35px] !min-h-[35px] !rounded-full !bg-[rgba(0,0,0,0.2)]' onClick={()=>setIsShowTab(false)}>
                <MdClose className=' z-[90] text-white text-[20px]'/>
                  </Button>
            <div className="flex items-center gap-2">
              {product?.productSize?.length !== 0 &&
                product?.productSize?.map((size, index) => (
                  <span
                    key={index}
                    className={`flex items-center justify-center w-8 h-8 bg-white/80 text-xs rounded-sm cursor-pointer hover:bg-white ${
                      activeTab === index && '!bg-orange-600 !text-white'
                    }`}
                    onClick={() => handleClickActiveTab(index, size)}
                  >
                    {size}
                  </span>
                ))}
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
        )}

        {/* Discount Badge */}
        {discount ? (
          <span className="absolute top-2 left-2 z-10 inline-flex items-center gap-1 rounded-full border border-rose-200 bg-rose-50 px-2.5 py-1 text-[11px] font-semibold text-rose-700 shadow-sm">
            -{discount}%
          </span>
        ) : null}

        {/* Action Buttons */}
        <div className="absolute top-2 right-2 z-10 flex flex-col gap-2 opacity-0 translate-y-1 transition-all duration-400 group-hover:opacity-100 group-hover:translate-y-0">
          <Tooltip title="Quick View" placement="left">
            <Button
              onClick={() => handleOpenProductdetailModel(true, { product })}
              className="!w-8 !h-8 !min-w-0 !rounded-full !bg-white/90 !text-slate-700 ring-1 ring-gray-200 shadow-sm hover:!bg-sky-50 hover:!text-sky-700 hover:ring-sky-200"
            >
              <MdZoomOutMap className="text-[16px]" />
            </Button>
          </Tooltip>
          <Tooltip title="Compare" placement="left">
            <Button className="!w-8 !h-8 !min-w-0 !rounded-full !bg-white/90 !text-slate-700 ring-1 ring-gray-200 shadow-sm hover:!bg-sky-50 hover:!text-sky-700 hover:ring-sky-200">
              <IoGitCompareOutline className="text-[16px]" />
            </Button>
          </Tooltip>
          <Tooltip title="Wishlist" placement="left">
            <Button className="!w-8 !h-8 !min-w-0 !rounded-full !bg-white/90 !text-slate-700 ring-1 ring-gray-200 shadow-sm hover:!bg-rose-50 hover:!text-rose-700 hover:ring-rose-200">
              <FaRegHeart className="text-[16px]" />
            </Button>
          </Tooltip>
        </div>
      </div>

      {/* Product info */}
      <div className="info flex-1 p-3 md:p-4 flex flex-col md:flex-row justify-between gap-3">
        {/* Left details */}
        <div className="space-y-2">
          {/* Brand */}
          <h6 className="text-[12px] text-slate-600">
            <Link to="/" className="hover:text-slate-900 transition-colors">{brand}</Link>
          </h6>

          {/* Title */}
          <Link to={`/productDetails/${_id}`}>
            <h3 className="title text-[14px] md:text-[15px] font-semibold text-slate-900 hover:text-sky-700 transition-colors line-clamp-2">
              {name}
            </h3>
          </Link>

          {/* Category chip */}
          {catName ? (
            <span className="inline-flex items-center gap-1 rounded-full border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-[11px] font-semibold text-emerald-700">
              {catName}
            </span>
          ) : null}

          {/* Rating */}
          <Stack spacing={0.5}>
            <Rating name="size-small" defaultValue={4} size="small" readOnly />
          </Stack>

          {/* Add to cart / Qty stepper */}
          {isAdded === false ? (
            <button
              onClick={() => handleAddToCart(product, userData?._id, quantity)}
              className="inline-flex items-center gap-1 rounded-full bg-white px-3 py-1.5 text-[12px] font-semibold text-slate-700 ring-1 ring-gray-200 shadow-sm hover:bg-sky-50 hover:text-sky-700 hover:ring-sky-200 transition"
            >
              <MdOutlineShoppingCart className="text-[16px]" /> Add to Cart
            </button>
          ) : (
            <div className="inline-flex items-center justify-between overflow-hidden rounded-full border border-[rgba(0,0,0,0.4)]">
              <Button onClick={minusQty} className="!min-w-[30px] !w-[30px] !h-[30px] !bg-[#f1f1f1]">
                <FaMinus />
              </Button>
              <span className="px-2">{quantity}</span>
              <Button onClick={addQty} className="!min-w-[30px] !w-[30px] !h-[30px] !bg-orange-600">
                <FaPlus className="text-white" />
              </Button>
            </div>
          )}
        </div>

        {/* Price + Reselling */}
        <div className="flex md:items-end justify-between md:justify-end gap-1 md:flex-col">
          {/* main + old price */}
          <div className="flex items-baseline gap-2 md:justify-end">
            <span className="text-[14px] md:text-[16px] font-bold text-slate-900">
              Tk <span className="text-sky-700">{price}</span>
            </span>
            {oldPrice && (
              <span className="text-[12px] md:text-[13px] text-rose-400 line-through">
                Tk {oldPrice}
              </span>
            )}
          </div>

          {/* reselling price (chip) */}
          {typeof resellingPrice !== 'undefined' && resellingPrice !== null && (
            <span className="inline-flex items-center gap-1 rounded-full border border-amber-200 bg-amber-50 px-2 py-0.5 text-[11px] font-semibold text-amber-700 md:self-end">
              Resell: Tk {resellingPrice}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductItemListView;

ProductItemListView.propTypes = {
  product: PropTypes.object,
};