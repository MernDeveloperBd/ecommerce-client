
import { Link } from 'react-router-dom';
import './productItem.css'
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import Button from "@mui/material/Button"
import { MdOutlineShoppingCart, MdZoomOutMap } from "react-icons/md";
import { IoGitCompareOutline } from "react-icons/io5";
import { FaRegHeart } from "react-icons/fa6";
import Tooltip from '@mui/material/Tooltip';
import { useContext } from 'react';
import { MyContext } from '../../App';
import PropTypes from 'prop-types';

const ProductItemListView = ({product}) => {
    const{handleOpenProductdetailModel} = useContext(MyContext)
    const { _id, images = [],  brand, catName,resellingPrice, name, oldPrice, price} = product
    const discount =
        oldPrice && price
            ? Math.round(((oldPrice - price) / oldPrice) * 100)
            : 0;
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

    {/* Discount Badge (light) */}
    {discount ? (
      <span className="absolute top-2 left-2 z-10 inline-flex items-center gap-1 rounded-full border border-rose-200 bg-rose-50 px-2.5 py-1 text-[11px] font-semibold text-rose-700 shadow-sm">
        -{discount}%
      </span>
    ) : null}

    {/* Action Buttons (soft + subtle) */}
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

      {/* Add to cart (soft) */}
      <button className="inline-flex items-center gap-1 rounded-full bg-white px-3 py-1.5 text-[12px] font-semibold text-slate-700 ring-1 ring-gray-200 shadow-sm hover:bg-sky-50 hover:text-sky-700 hover:ring-sky-200 transition">
        <MdOutlineShoppingCart className="text-[16px]" /> Add to Cart
      </button>
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
      {typeof resellingPrice !== "undefined" && resellingPrice !== null && (
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

ProductItemListView.propTypes={
  product:PropTypes.object
}