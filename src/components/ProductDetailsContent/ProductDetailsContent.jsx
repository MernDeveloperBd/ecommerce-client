import { Button, Rating } from "@mui/material";
import QuantityBox from "../QuantityBox/QuantityBox";
import { MdOutlineCompareArrows } from "react-icons/md";
import { FaRegHeart } from "react-icons/fa";
import { useState } from "react";

const ProductDetailsContent = (props) => {
    const data = props?.data?.product;


    const [colorActionIndex, setColorActionIndex] = useState(null)
    const [sizeActionIndex, setSizeActionIndex] = useState(null)
    const message = "হ্যালো, আমি অর্ডার করতে চাই";
    return (

       <div className="relative rounded-3xl p-[1.2px] bg-gradient-to-tr from-sky-200/60 via-indigo-200/60 to-violet-200/60 shadow-[0_1px_14px_rgba(2,6,23,0.06)]">
  <div className="space-y-4 p-3 md:p-5 rounded-3xl bg-white/85 backdrop-blur-xl ring-1 ring-gray-200/70">
    {/* Title */}
    <h2 className="text-base md:text-2xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-slate-900 to-slate-700">
      {data?.name}
    </h2>

    {/* Price + Stock */}
    <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-4">
      <p className="flex items-center gap-2">
        <span className="inline-flex items-center gap-1 rounded-full bg-white px-2.5 py-1 text-sm md:text-base font-bold text-slate-900 ring-1 ring-gray-200">
          TK <span className="text-sky-700">{data?.price}</span>
        </span>
        {data?.oldPrice && (
          <span className="text-rose-500 font-semibold text-xs line-through">
            TK {data?.oldPrice}
          </span>
        )}
      </p>

      <p className="text-slate-600 text-sm md:text-base">
        In Stock:
        {data?.countInStock > 0 ? (
          <span className="ml-2 inline-flex items-center rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-bold text-emerald-700 ring-1 ring-emerald-200">
            {data?.countInStock}
          </span>
        ) : (
          <span className="ml-2 inline-flex items-center rounded-full bg-rose-50 px-2 py-0.5 text-xs font-bold text-rose-700 ring-1 ring-rose-200">
            Stock Out
          </span>
        )}
      </p>
    </div>

    {/* Category + Rating + SKU */}
    <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
      <h3 className="text-xs md:text-sm text-slate-700">
        Category: <span className="font-semibold text-slate-900">{data?.catName}</span>
      </h3>
      <div className="flex items-center gap-2">
        <Rating name="size-small" defaultValue={4} size="small" readOnly />
        <span className="text-xs md:text-sm text-slate-500">(0 Reviews)</span>
      </div>
      {data?.sku && (
        <h3 className="text-xs md:text-sm text-slate-700">
          SKU: <span className="font-semibold text-slate-900">{data?.sku}</span>
        </h3>
      )}
    </div>

    {/* Variants */}
    <div className="flex flex-col md:flex-row gap-4">
      {/* Colors */}
      {Array.isArray(data?.color) && data?.color?.length > 0 && (
        <div className="flex items-center gap-2">
          <h4 className="font-semibold text-slate-900">Color:</h4>
          <div className="flex flex-wrap items-center gap-1.5">
            {data?.color?.map((item, index) => {
              const active = colorActionIndex === index;
              const isCssColor =
                typeof item === "string" &&
                (item.trim().startsWith("#") ||
                  item.trim().startsWith("rgb") ||
                  item.trim().startsWith("hsl"));
              return (
                <button
                  key={index}
                  onClick={() => setColorActionIndex(index)}
                  className={[
                    "inline-flex items-center gap-2 rounded-full px-2.5 py-1 text-[12px] font-medium transition ring-1",
                    active
                      ? "bg-sky-50 text-sky-800 ring-sky-300"
                      : "bg-white text-slate-700 ring-gray-200 hover:bg-sky-50 hover:text-sky-800 hover:ring-sky-200",
                  ].join(" ")}
                >
                  <span
                    className="h-2.5 w-2.5 rounded-full ring-2 ring-gray-200 bg-slate-300"
                    style={isCssColor ? { background: item } : undefined}
                    aria-hidden="true"
                  />
                  {item}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Sizes */}
      {Array.isArray(data?.productSize) && data?.productSize?.length > 0 && (
        <div className="flex items-center gap-2">
          <h4 className="font-semibold text-slate-900">Size:</h4>
          <div className="flex flex-wrap items-center gap-1.5">
            {data?.productSize?.map((item, index) => {
              const active = sizeActionIndex === index;
              return (
                <button
                  key={index}
                  onClick={() => setSizeActionIndex(index)}
                  className={[
                    "inline-flex items-center rounded-full px-3 py-1 text-[12px] font-semibold tracking-wide transition ring-1",
                    active
                      ? "bg-indigo-50 text-indigo-800 ring-indigo-300"
                      : "bg-white text-slate-700 ring-gray-200 hover:bg-indigo-50 hover:text-indigo-800 hover:ring-indigo-200",
                  ].join(" ")}
                >
                  {item}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>

    {/* Shop info */}
    {data?.shopName && (
      <div className="grid gap-2 rounded-2xl bg-white p-3 ring-1 ring-gray-200 shadow-sm">
        <p className="text-[12px] md:text-[14px] text-slate-700">
          Shop Name: <span className="font-semibold text-slate-900">{data?.shopName}</span>
        </p>
        <p className="text-[12px] md:text-[14px] text-slate-700">
          FB Page:{" "}
          <a
            href={data?.facebookURL}
            target="_blank"
            rel="noreferrer"
            className="font-semibold text-sky-700 hover:text-sky-600 transition-colors"
          >
            {data?.shopName}
          </a>
        </p>
      </div>
    )}

    {/* Shipping + Actions */}
    <div className="pt-1">
      <p className="mb-2 text-[12px] md:text-[14px] text-slate-600 inline-flex items-center gap-2">
        <svg width="18" height="18" viewBox="0 0 24 24" className="text-sky-600">
          <path
            d="M3 7h11v8H3V7zm11 3h4l3 3v2h-7v-5zM6 18a2 2 0 104 0H6zm8 0a2 2 0 104 0h-4z"
            fill="currentColor"
            fillOpacity=".6"
          />
        </svg>
        Free shipping (Est. Delivery time 2-3 Days)
      </p>

      <div className="flex flex-col gap-3">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-3 md:gap-4">
          <div className="qtyBoxWrapper md:w-[64px]">
            <QuantityBox />
          </div>

          <div className="flex gap-2">
            <Button className="!rounded-full !px-4 !h-9 !bg-sky-600 hover:!bg-sky-700 !text-white !text-[12px] md:!text-[14px] font-bold">
              Add To Cart
            </Button>
            <Button className="!rounded-full !px-4 !h-9 !bg-emerald-600 hover:!bg-emerald-700 !text-white !text-[12px] md:!text-[14px] font-bold">
              Buy Now
            </Button>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <span className="flex items-center gap-2 text-[12px] md:text-[13px] text-slate-700 hover:text-orange-600 cursor-pointer transition-all font-[600]">
            <FaRegHeart className="text-[16px]" /> Add to Wishlist
          </span>
          <span className="flex items-center gap-2 text-[12px] md:text-[13px] text-slate-700 hover:text-orange-600 cursor-pointer transition-all font-[600]">
            <MdOutlineCompareArrows className="text-[16px]" /> Add to Compare
          </span>
        </div>
      </div>
    </div>

    {/* WhatsApp CTA */}
    <div className="text-center md:text-left">
      <a
        href={`https://wa.me/${data?.whatsApp}?text=${encodeURIComponent(message)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 text-[12px] md:text-[14px] rounded-full bg-emerald-500/90 hover:bg-emerald-600 text-white font-semibold py-1.5 px-3 transition shadow-sm"
      >
        <svg width="16" height="16" viewBox="0 0 32 32" fill="currentColor" aria-hidden="true">
          <path d="M19.11 17.23c-.28-.14-1.62-.8-1.87-.9-.25-.09-.43-.14-.61.14-.18.28-.7.9-.86 1.08-.16.19-.32.21-.6.07-.28-.14-1.2-.44-2.3-1.4-.85-.76-1.43-1.7-1.6-1.98-.16-.28-.02-.43.12-.57.12-.12.28-.32.42-.49.14-.16.18-.28.28-.47.09-.19.05-.35-.02-.49-.07-.14-.61-1.47-.84-2.02-.22-.52-.44-.45-.61-.46l-.52-.01c-.19 0-.49.07-.75.35-.26.28-1 1-1 2.45 0 1.44 1.02 2.84 1.17 3.03.14.19 2 3.05 4.85 4.28.68.29 1.21.46 1.63.59.68.21 1.3.18 1.79.11.55-.08 1.62-.66 1.85-1.3.23-.64.23-1.19.16-1.3-.07-.11-.25-.18-.53-.32zM16 3C8.83 3 3 8.83 3 16c0 2.27.6 4.39 1.64 6.24L3 29l6.94-1.82A13.01 13.01 0 0016 29c7.17 0 13-5.83 13-13S23.17 3 16 3z" />
        </svg>
        <span>WhatsApp এ অর্ডার করুন</span>
      </a>
    </div>
  </div>
</div>


    );
};

export default ProductDetailsContent;