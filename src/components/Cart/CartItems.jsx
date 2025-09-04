import { useMemo } from "react";
import { Link } from "react-router-dom";
import { IoCloseSharp } from "react-icons/io5";
import Stack from "@mui/material/Stack";
import { Rating } from "@mui/material";

const CartItems = ({ data, onRemove, isRemoving }) => {
  const initialSize = useMemo(() => {
    if (Array.isArray(data?.productSize) && data.productSize.length) return data.productSize[0];
    return data?.productSize || data?.size || "-";
  }, [data?.productSize, data?.size]);

  const price = Number(data?.price) || 0;
  const oldPrice = Number(data?.oldPrice) || 0;
  const qty = Number(data?.quantity) || 1;

  const discountPercent =
    oldPrice > price && oldPrice > 0
      ? Math.round(((oldPrice - price) / oldPrice) * 100)
      : 0;

  const lineTotal = price * qty;
  const productLink = `/productDetails/${data?.productId || ""}`;

  return (
    <div className="group relative grid grid-cols-[92px,1fr] md:grid-cols-[104px,1fr] gap-3 rounded-xl ring-1 ring-gray-200 bg-white p-2 md:p-3 mb-3 shadow-sm hover:shadow-md transition">
      {/* Remove */}
      <button
        type="button"
        onClick={() => !isRemoving && onRemove?.(data)}
        aria-label="Remove item"
        disabled={isRemoving}
        className="absolute right-2 top-2 inline-flex h-8 w-8 items-center justify-center rounded-full text-slate-500 hover:text-rose-600 hover:bg-rose-50 transition disabled:opacity-50"
      >
        <IoCloseSharp className="text-[18px]" />
      </button>

      {/* Image */}
      <div className="shrink-0 h-[92px] w-[92px] md:h-[104px] md:w-[104px] overflow-hidden rounded-lg ring-1 ring-gray-200">
        <Link to={productLink} className="block h-full w-full">
          <img
            src={data?.image}
            alt={data?.productTitle || "cart image"}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.05]"
          />
        </Link>
      </div>

      {/* Info */}
      <div className="min-w-0 pr-8">
        <Link to={productLink} className="block">
          <h3 className="text-[13px] md:text-sm font-semibold text-slate-900 line-clamp-2">
            {data?.productTitle}
          </h3>
        </Link>

        {/* Rating */}
        <div className="mt-1">
          <Stack spacing={0.5}>
            <Rating name="size-small" value={Number(data?.rating) || 0} size="small" readOnly />
          </Stack>
        </div>

        {/* Size + Qty (display only) */}
        <div className="mt-2 flex flex-wrap items-center gap-2">
          {
            initialSize === true &&  <span className="inline-flex items-center gap-1 rounded-md bg-gray-50 px-2 py-1 text-[11px] ring-1 ring-gray-200">
            Size:
            <span className="font-semibold text-slate-900">{initialSize}</span>
          </span>
          }
         

          <span className="inline-flex items-center gap-1 rounded-md bg-gray-50 px-2 py-1 text-[11px] ring-1 ring-gray-200">
            Qty:
            <span className="font-semibold text-slate-900">{qty}</span>
          </span>

          <span className="inline-flex items-center gap-1 rounded-md bg-gray-50 px-2 py-1 text-[11px] ring-1 ring-gray-200">
            Stock:
            <span className={`font-semibold ${(data?.countInStock || 0) > 0 ? "text-emerald-700" : "text-rose-600"}`}>
              {data?.countInStock ?? 0}
            </span>
          </span>
        </div>

        {/* Prices */}
        <div className="mt-2 flex flex-wrap items-center gap-3">
          <span className="text-[13px] md:text-[14px] font-extrabold text-slate-900">Tk {price}</span>

          {oldPrice > price && (
            <>
              <span className="text-rose-500 line-through text-[12px] md:text-[13px]">Tk {oldPrice}</span>
              <span className="inline-flex items-center rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-semibold text-emerald-700 ring-1 ring-emerald-200">
                {discountPercent}% off
              </span>
            </>
          )}

          <span className="ml-auto text-[12px] md:text-[13px] font-semibold text-primary">
            Total: Tk {lineTotal}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CartItems;