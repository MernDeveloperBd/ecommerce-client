import { Link } from 'react-router-dom';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import Button from "@mui/material/Button";
import { MdAddShoppingCart, MdZoomOutMap } from "react-icons/md";
import { IoGitCompareOutline } from "react-icons/io5";
import { FaRegHeart } from "react-icons/fa6";
import Tooltip from '@mui/material/Tooltip';
import { useContext } from 'react';
import { MyContext } from '../../App';
import PropTypes from 'prop-types';

const ProductItem = ({ product }) => {
  const { handleOpenProductdetailModel } = useContext(MyContext);
  const { _id, images = [], price, oldPrice, resellingPrice, catName, name } = product
  // ✅ Discount Calculation
  const discount =
    oldPrice && price
      ? Math.round(((oldPrice - price) / oldPrice) * 100)
      : 0;

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
      <Button
        aria-label="Add to cart"
        className="!w-full !h-9 !min-h-0 !rounded-lg
                 !bg-gradient-to-r !from-violet-500 !to-fuchsia-500 !text-white
                 hover:!opacity-95 shadow-sm
                 !text-[12px] md:!text-[13px] !font-semibold"
      >
        <MdAddShoppingCart className="text-[16px] mr-1.5" />
        Add to cart
      </Button>
    </div>
  </div>
</div>
  );
};

export default ProductItem;

ProductItem.propTypes = {
  product: PropTypes.object
}