// ProductDetailsContent2.jsx
import { useState, useMemo, useEffect } from "react";
import { Button, Rating } from "@mui/material";
import QuantityBox from "../QuantityBox/QuantityBox";
import { MdOutlineCompareArrows, MdOutlineShoppingCart } from "react-icons/md";
import { FaRegHeart } from "react-icons/fa";
import { FiDownloadCloud } from "react-icons/fi";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import PropTypes from "prop-types";
import { fetchDataFromApi } from "../../utils/api"; // adjust path if needed

const ProductDetailsContent2 = ({ item: data, avgRating: avgRatingProp, totalReviews: totalReviewsProp }) => {
  const images = useMemo(() => (Array.isArray(data?.images) ? data.images : []), [data]);
  const [colorActionIndex, setColorActionIndex] = useState(null);
  const [sizeActionIndex, setSizeActionIndex] = useState(null);
  const [downloading, setDownloading] = useState(false);

  // Reviews summary (will use props if provided, otherwise fetch)
  const [avgRating, setAvgRating] = useState(typeof avgRatingProp === "number" ? avgRatingProp : 0);
  const [totalReviews, setTotalReviews] = useState(typeof totalReviewsProp === "number" ? totalReviewsProp : 0);

  useEffect(() => {
    if (typeof avgRatingProp === "number") setAvgRating(avgRatingProp);
    if (typeof totalReviewsProp === "number") setTotalReviews(totalReviewsProp);
  }, [avgRatingProp, totalReviewsProp]);

  useEffect(() => {
    // Fallback fetch only if parent didn't pass stats
    if ((avgRatingProp == null || totalReviewsProp == null) && data?._id) {
      let active = true;
      fetchDataFromApi(`/api/user/getReviews?productId=${data._id}`)
        .then((res) => {
          if (!active) return;
          if (res?.error === false && Array.isArray(res?.reviews)) {
            const arr = res.reviews;
            const total = arr.length;
            const avg = total
              ? Number((arr.reduce((a, r) => a + Number(r?.rating || 0), 0) / total).toFixed(1))
              : 0;
            setAvgRating(avg);
            setTotalReviews(total);
          } else {
            setAvgRating(0);
            setTotalReviews(0);
          }
        })
        .catch(() => {
          if (active) {
            setAvgRating(0);
            setTotalReviews(0);
          }
        });
      return () => {
        active = false;
      };
    }
  }, [data?._id, avgRatingProp, totalReviewsProp]);

  const message = "হ্যালো, আমি অর্ডার করতে চাই";

  // Helpers
  const sanitize = (str) =>
    String(str || "")
      .replace(/[^a-z0-9]+/gi, "-")
      .replace(/(^-|-$)/g, "")
      .toLowerCase();

  const extFromType = (type = "") => {
    const map = {
      "image/jpeg": "jpg",
      "image/jpg": "jpg",
      "image/png": "png",
      "image/webp": "webp",
      "image/avif": "avif",
      "image/gif": "gif",
      "image/svg+xml": "svg",
    };
    return map[type] || "";
  };
  const extFromUrl = (url = "") => {
    try {
      const u = new URL(url, window.location.href);
      const last = u.pathname.split("/").pop() || "";
      const ext = last.includes(".") ? last.split(".").pop() : "";
      const qf = u.searchParams.get("format");
      return (qf || ext || "").split(/[?&#]/)[0];
    } catch {
      const clean = (url || "").split("?")[0];
      return clean.includes(".") ? clean.split(".").pop() : "";
    }
  };

  // Named color fallback (যদি CSS.supports না কাজ করে)
  const NAMED_COLORS = {
    red: "#ef4444",
    green: "#10b981",
    blue: "#3b82f6",
    black: "#000000",
    white: "#ffffff",
    gray: "#6b7280",
    grey: "#6b7280",
    yellow: "#f59e0b",
    orange: "#f97316",
    pink: "#ec4899",
    purple: "#8b5cf6",
    violet: "#7c3aed",
    teal: "#14b8a6",
    cyan: "#06b6d4",
    brown: "#92400e",
    beige: "#f5f5dc",
    navy: "#1e3a8a",
    maroon: "#7f1d1d",
  };

  const isValidCssColor = (val) => {
    try {
      return typeof window !== "undefined" &&
        window.CSS &&
        typeof window.CSS.supports === "function" &&
        window.CSS.supports("color", val);
    } catch {
      return false;
    }
  };

  const colorToCss = (val) => {
    if (!val) return null;
    const s = String(val).trim();
    if (!s) return null;
    // Valid CSS color or hex/rgb/hsl
    if (isValidCssColor(s)) return s;
    // Named fallback
    const m = NAMED_COLORS[s.toLowerCase()];
    return m || null;
  };

  const isMixedColor = (val) => /multi|mix|assort|var/i.test(String(val || ""));
  const mixedGradient =
    "conic-gradient(from 0deg, #ef4444, #f59e0b, #10b981, #3b82f6, #8b5cf6, #ec4899, #ef4444)";

  // Download all images as a ZIP (lazy import libs)
  const handleDownloadAll = async () => {
    if (!images?.length) return;
    setDownloading(true);
    try {
      const [{ default: JSZip }, { saveAs }] = await Promise.all([
        import("jszip"),
        import("file-saver"),
      ]);

      const zip = new JSZip();
      const folderName = sanitize(data?.name || "product");
      const folder = zip.folder(folderName) || zip;

      let idx = 1;
      for (const url of images) {
        try {
          const res = await fetch(url, { mode: "cors" });
          const blob = await res.blob();
          const ext = extFromType(blob.type) || extFromUrl(url) || "jpg";
          const fileName = `${folderName}-${String(idx).padStart(2, "0")}.${ext}`;
          folder.file(fileName, blob);
          idx++;
        } catch (err) {
          console.warn("Could not fetch:", url, err);
        }
      }

      const content = await zip.generateAsync({ type: "blob" });
      saveAs(content, `${folderName}-images.zip`);
    } catch (e) {
      console.error(e);
      alert("Images download failed, please try again.");
    } finally {
      setDownloading(false);
    }
  };



  const prettyDate =
    data?.createdAt && !Number.isNaN(Date.parse(data?.createdAt))
      ? new Date(data?.createdAt).toLocaleString("en-GB", {
        timeZone: "Asia/Dhaka",
        year: "numeric",
        month: "short",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      })
      : data?.createdAt;

  const count = Number(totalReviews) || 0;

  return (
    <div className="relative rounded-3xl p-[1.2px] bg-gradient-to-tr from-sky-200/60 via-indigo-200/60 to-violet-200/60 shadow-[0_1px_14px_rgba(2,6,23,0.06)]">
      <div className="space-y-4 p-3 md:p-5 rounded-3xl bg-white/85 backdrop-blur-xl ring-1 ring-gray-200/70">
        {/* Header row */}
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <h2 className="text-base md:text-2xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-slate-900 to-slate-700">
            {data?.name}
          </h2>

          {/* Download all images */}
          {images?.length > 0 && (
            <div className="flex items-center gap-2">
              <div className="hidden md:flex -space-x-2 shrink-0">
                {images.slice(0, 4).map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    alt={`thumb-${i}`}
                    className="h-8 w-8 rounded-full ring-2 ring-white object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                ))}
                {images.length > 4 && (
                  <span className="h-8 w-8 grid place-items-center text-[11px] rounded-full bg-gray-100 text-slate-700 ring-2 ring-white">
                    +{images.length - 4}
                  </span>
                )}
              </div>

              <Button
                onClick={handleDownloadAll}
                disabled={downloading}
                aria-busy={downloading ? "true" : "false"}
                disableElevation
                className="!rounded-full !h-9 !bg-white !text-slate-700 hover:!bg-sky-50 !text-[12px] md:!text-[13px] !font-semibold ring-1 ring-gray-200 hover:ring-sky-200 shadow-sm "
                // MUI sx দিয়ে মিন-উইডথ - দুই স্টেটের মধ্যে সবচেয়ে বড়টা ধরে
                sx={{ minWidth: { xs: 150, md: 170 }, px: 0 }}
                title="Download all images"
              >
                {/* Fixed-width label box so width না বদলায় */}
                <span className="relative inline-flex items-center justify-center w-[150px] md:w-[170px] whitespace-nowrap ">
                  {/* Normal state */}
                  <span className={`inline-flex items-center gap-2 transition-opacity ${downloading ? "opacity-0" : "opacity-100"}`}>
                    <FiDownloadCloud className="text-[16px]" />
                    Download Images
                  </span>

                  {/* Loading state (overlay) */}
                  <span className={`absolute inset-0 inline-flex items-center justify-center gap-2 transition-opacity ${downloading ? "opacity-100" : "opacity-0"}`}>
                    <AiOutlineLoading3Quarters className="text-[14px] animate-spin" />
                    Zipping...
                  </span>
                </span>
              </Button>
            </div>
          )}
        </div>

        {/* Price + Stock */}
        <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-4">
          <p className="flex items-center gap-2 text-slate-800">
            <span className="inline-flex items-center gap-1 rounded-full bg-white px-2.5 py-1 text-sm md:text-base font-bold ring-1 ring-gray-200">
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

        {/* Category + Rating (dynamic avg + total) */}
        <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
          <h3 className="text-xs md:text-sm text-slate-700">
            Category: <span className="font-semibold text-slate-900">{data?.catName}</span>
          </h3>
          <div className="flex items-center gap-2">
            <Rating value={avgRating} precision={0.1} size="small" readOnly />
            <span className="text-xs md:text-sm text-slate-500">
              ({count === 0 ? "No reviews" : `${count} ${count === 1 ? "Review" : "Reviews"}`})
            </span>
          </div>
        </div>

        {/*  SKU , published date */}
        <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
          {data?.sku && (
            <h3 className="text-xs md:text-sm text-slate-700">
              SKU: <span className="font-semibold text-slate-900">{data?.sku}</span>
            </h3>
          )}
          {data?.createdAt && (
            <span className="text-xs md:text-sm text-slate-500">Published: {prettyDate}</span>
          )}
        </div>

        {/* Variants */}
        <div className="flex flex-col gap-3 md:gap-4">
          {/* Colors */}
          {Array.isArray(data?.color) && data?.color?.length > 0 && (
            <div className="flex flex-wrap items-center gap-2">
              <h4 className="font-semibold text-slate-900">Color:</h4>
              <div className="flex flex-wrap items-center gap-1.5">
                {data.color.map((c, index) => {
                  const active = colorActionIndex === index;
                  const css = colorToCss(c);
                  const bg = isMixedColor(c) ? mixedGradient : (css || "#e5e7eb");
                  // White/very light হলে বর্ডার দেখা দরকার
                  const needsBorder = ["#fff", "#ffffff", "white"].includes(String(css || "").toLowerCase());

                  return (
                    <button
                      key={index}
                      onClick={() => setColorActionIndex(index)}
                      aria-pressed={active}
                      title={String(c)}
                      className={[
                        "inline-flex items-center gap-2 rounded-full px-2.5 py-1 text-[12px] font-medium transition ring-1",
                        active
                          ? "bg-sky-100 text-sky-800 ring-sky-300"
                          : "bg-white text-slate-700 ring-gray-200 hover:bg-sky-50 hover:text-sky-800 hover:ring-sky-200",
                      ].join(" ")}
                    >
                      {/* Swatch */}
                      <span
                        className={[
                          "h-4 w-4 rounded-md ring-1",
                          active ? "ring-sky-600" : "ring-gray-300",
                          needsBorder ? "border border-gray-300" : "",
                        ].join(" ")}
                        style={{ background: bg }}
                        aria-hidden="true"
                      />
                      {/* Color name */}
                      <span className="truncate max-w-[120px]">{c}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Sizes */}
          {Array.isArray(data?.productSize) && data?.productSize?.length > 0 && (
            <div className="flex flex-wrap items-center gap-2">
              <h4 className="font-semibold text-slate-900">Size:</h4>
              <div className="flex flex-wrap items-center gap-1.5">
                {data?.productSize?.map((s, index) => {
                  const active = sizeActionIndex === index;
                  return (
                    <button
                      key={index}
                      onClick={() => setSizeActionIndex(index)}
                      aria-pressed={active}
                      className={[
                        "inline-flex items-center rounded-full px-3 py-1 text-[12px] font-semibold tracking-wide transition",
                        "ring-1",
                        active
                          ? "bg-indigo-100 text-indigo-800 ring-indigo-300"
                          : "bg-white text-slate-700 ring-gray-200 hover:bg-indigo-50 hover:text-indigo-800 hover:ring-indigo-200",
                      ].join(" ")}
                    >
                      {s}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Shop info */}
        {(data?.shopName || data?.facebookURL) && (
          <div className="grid gap-2 rounded-2xl bg-white p-3 ring-1 ring-gray-200 shadow-sm">
            {data?.shopName && (
              <p className="text-[12px] md:text-[14px] text-slate-700">
                Shop Name: <span className="font-semibold text-slate-900">{data?.shopName}</span>
              </p>
            )}
            {data?.facebookURL && (
              <p className="text-[12px] md:text-[14px] text-slate-700">
                FB Page:{" "}
                <a
                  href={data?.facebookURL}
                  target="_blank"
                  rel="noreferrer"
                  className="font-semibold text-sky-700 hover:text-sky-600 transition-colors"
                >
                  {data?.shopName || "Visit"}
                </a>
              </p>
            )}
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
                <Button className="!rounded-full !px-4 !h-9 !bg-sky-600 hover:!bg-sky-700 !text-white !text-[12px] md:!text-[14px] font-bold flex items-center gap-2">
                  <MdOutlineShoppingCart className="text-[16px]" /> Add To Cart
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

export default ProductDetailsContent2;

ProductDetailsContent2.propTypes = {
  item: PropTypes.shape({
    name: PropTypes.string.isRequired,
    images: PropTypes.arrayOf(PropTypes.string).isRequired,
    price: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    oldPrice: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    countInStock: PropTypes.number,
    catName: PropTypes.string,
    sku: PropTypes.string,
    color: PropTypes.arrayOf(PropTypes.string),
    productSize: PropTypes.arrayOf(PropTypes.string),
    shopName: PropTypes.string,
    facebookURL: PropTypes.string,
    createdAt: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.instanceOf(Date),
    ]),
    whatsApp: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  }),
  // Optional: pass from parent to avoid extra fetch
  avgRating: PropTypes.number,
  totalReviews: PropTypes.number,
};