import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { MyContext } from "../../App";
import { postData } from "../../utils/api";

const BannerBox2 = ({ autoRefreshMs = 0 }) => {
  const { catData } = useContext(MyContext) || {};
  const [promos, setPromos] = useState([]);
  const timerRef = useRef(null);

  const pickTwoDistinct = (arr) => {
    if (!arr || arr.length === 0) return [];
    if (arr.length === 1) return [arr[0]];
    let i = Math.floor(Math.random() * arr.length);
    let j = Math.floor(Math.random() * arr.length);
    while (j === i) j = Math.floor(Math.random() * arr.length);
    return [arr[i], arr[j]];
  };

  const computeDiscount = (price, oldPrice) => {
    const p = Number(price);
    const o = Number(oldPrice);
    if (!o || !p || o <= p) return null;
    return Math.round((1 - p / o) * 100);
  };

  const randomFrom = (arr) => arr[Math.floor(Math.random() * arr.length)];

  const fetchRandomProductByCat = async (cat) => {
    // প্রতি ক্যাটাগরি থেকে কয়েকটা প্রোডাক্ট নিয়ে ১টা র‌্যান্ডম
    const payload = {
      catId: [cat._id],
      page: 1,
      limit: 8,
      sort: "salesHighToLow", // আপনি চাইলে "newest" করবেন
    };
    const res = await postData("/api/product/filters", payload);
    if (res?.error === false && Array.isArray(res.products) && res.products.length) {
      const p = randomFrom(res.products);
      return { product: p, catName: cat.name };
    }
    return null;
  };

  const fetchFallbackRandomTwo = async () => {
    // ক্যাটাগরি না পেলে/ফল না পেলে: সব প্রোডাক্ট থেকে ২টা র‌্যান্ডম
    const res = await postData("/api/product/filters", { page: 1, limit: 20, sort: "newest" });
    if (res?.error === false && Array.isArray(res.products) && res.products.length >= 2) {
      const a = randomFrom(res.products);
      let b = randomFrom(res.products);
      let guard = 0;
      while (b?._id === a?._id && guard++ < 5) b = randomFrom(res.products);
      return [
        { product: a, catName: a?.categoryName || "Featured" },
        { product: b, catName: b?.categoryName || "Featured" },
      ];
    }
    return [];
  };

  const loadPromos = async () => {
    try {
      let selectedCats = Array.isArray(catData) && catData.length ? pickTwoDistinct(catData) : [];
      let items = [];

      if (selectedCats.length) {
        for (const cat of selectedCats) {
          const it = await fetchRandomProductByCat(cat);
          if (it) items.push(it);
        }
      }

      // fallback
      if (items.length < 2) {
        const rest = await fetchFallbackRandomTwo();
        // fill until 2
        for (const r of rest) {
          if (items.length >= 2) break;
          // avoid duplicates by _id
          if (!items.some((x) => x.product?._id === r.product?._id)) items.push(r);
        }
      }

      setPromos(items.slice(0, 2));
    } catch (e) {
      // silent fail
    }
  };

  useEffect(() => {
    loadPromos();
    if (autoRefreshMs > 0) {
      timerRef.current = setInterval(loadPromos, autoRefreshMs);
      return () => clearInterval(timerRef.current);
    }
  }, [autoRefreshMs, Array.isArray(catData) ? catData.length : 0]);

  const [topPromo, bottomPromo] = promos;

  const top = useMemo(() => {
    if (!topPromo) return null;
    const p = topPromo.product || {};
    const discount = p.discount ?? computeDiscount(p.price, p.oldPrice);
    return {
      id: p._id,
      name: p.name || "Product",
      price: p.price,
      oldPrice: p.oldPrice,
      discount,
      img: p.images?.[0] || "https://via.placeholder.com/600x600?text=Product",
      catName: topPromo.catName || "Big Savings",
    };
  }, [topPromo]);

  const bottom = useMemo(() => {
    if (!bottomPromo) return null;
    const p = bottomPromo.product || {};
    const discount = p.discount ?? computeDiscount(p.price, p.oldPrice);
    return {
      id: p._id,
      name: p.name || "Product",
      price: p.price,
      oldPrice: p.oldPrice,
      discount,
      img: p.images?.[0] || "https://via.placeholder.com/600x600?text=Product",
      catName: bottomPromo.catName || "Featured",
    };
  }, [bottomPromo]);

  return (
    <div className="h-[200px] md:h-[360px] flex flex-col gap-2">
      {/* Top promo (sky theme) */}
      <div className="relative group flex h-[50%] items-center gap-3 overflow-hidden rounded-xl border border-gray-200 bg-gradient-to-r from-sky-50 to-white p-3 md:p-4 shadow-[0_1px_10px_rgba(2,6,23,0.05)] hover:shadow-[0_12px_28px_rgba(2,6,23,0.08)] transition-all">
        {/* Decorative glows */}
        <div className="pointer-events-none absolute -top-10 -left-10 h-24 w-24 rounded-full bg-sky-200/30 blur-2xl" />
        <div className="pointer-events-none absolute -bottom-10 -right-10 h-24 w-24 rounded-full bg-indigo-200/30 blur-2xl" />

        {/* Badge */}
        <span className="absolute top-2 left-2 inline-flex items-center rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-700 ring-1 ring-emerald-200">
          {top?.catName || "Big Savings"}
        </span>

        {/* Content */}
        <div className="space-y-1.5">
          <h4 className="text-[12px] md:text-[13px] font-semibold text-slate-700">
            Limited Time Offer
          </h4>
          <h2 className="text-[14px] md:text-[16px] font-extrabold leading-snug text-slate-900 line-clamp-2">
            {top?.name || "Loading…"}
          </h2>
          <div className="flex items-center gap-2">
            <h3 className="text-[14px] md:text-[16px] font-bold text-sky-700">TK {top?.price ?? "—"}</h3>
              {top?.discount ? (
              <span className="text-[10px] md:text-xs rounded-full bg-rose-50 text-rose-700 ring-1 ring-rose-200 px-2 py-0.5">
                -{top.discount}%
              </span>
            ) : null}
          </div>
          {top?.id ? (
            <Link
              to={`/productDetails/${top.id}`}
              className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-[11px] md:text-[12px] font-semibold text-slate-700 ring-1 ring-gray-200 shadow-sm transition hover:bg-sky-50 hover:text-sky-700 hover:ring-sky-200"
            >
              Shop Now
              <svg width="14" height="14" viewBox="0 0 24 24" className="transition-transform group-hover:translate-x-0.5">
                <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          ) : (
            <span className="inline-flex items-center rounded-full bg-white px-3 py-1.5 text-[11px] md:text-[12px] text-slate-400 ring-1 ring-gray-200">
              Loading…
            </span>
          )}
        </div>

        {/* Image */}
        <div className="ml-auto h-full w-[50%] overflow-hidden rounded-lg ring-1 ring-gray-200">
          <img
            src={top?.img}
            alt={top?.name || "Promo 1"}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.05]"
          />
          <span className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-t from-black/5 via-transparent to-transparent" />
        </div>
      </div>

      {/* Bottom promo (rose theme) */}
      <div className="relative group flex h-[50%] items-center gap-3 overflow-hidden rounded-xl border border-gray-200 bg-gradient-to-r from-rose-50 to-white p-3 md:p-4 shadow-[0_1px_10px_rgba(2,6,23,0.05)] hover:shadow-[0_12px_28px_rgba(2,6,23,0.08)] transition-all">
        {/* Decorative glows */}
        <div className="pointer-events-none absolute -top-10 -right-10 h-24 w-24 rounded-full bg-rose-200/30 blur-2xl" />
        <div className="pointer-events-none absolute -bottom-10 -left-10 h-24 w-24 rounded-full bg-violet-200/30 blur-2xl" />

        {/* Badge */}
        <span className="absolute top-2 left-2 inline-flex items-center rounded-full bg-rose-50 px-2 py-0.5 text-[10px] font-semibold text-rose-700 ring-1 ring-rose-200">
          {bottom?.catName || "Featured"}
        </span>

        {/* Content */}
        <div className="space-y-1.5">
          <h4 className="text-[12px] md:text-[13px] font-semibold text-slate-700">
            Big Savings
          </h4>
          <h2 className="text-[14px] md:text-[16px] font-extrabold leading-snug text-slate-900 line-clamp-2">
            {bottom?.name || "Loading…"}
          </h2>
          <div className="flex items-center gap-2">
            <h3 className="text-[14px] md:text-[16px] font-bold text-rose-700">TK {bottom?.price ?? "—"}</h3>
            
            {bottom?.discount ? (
              <span className="text-[10px] md:text-xs rounded-full bg-rose-50 text-rose-700 ring-1 ring-rose-200 px-2 py-0.5">
                -{bottom.discount}%
              </span>
            ) : null}
          </div>
          {bottom?.id ? (
            <Link
              to={`/productDetails/${bottom.id}`}
              className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-[11px] md:text-[12px] font-semibold text-slate-700 ring-1 ring-gray-200 shadow-sm transition hover:bg-rose-50 hover:text-rose-700 hover:ring-rose-200"
            >
              Shop Now
              <svg width="14" height="14" viewBox="0 0 24 24" className="transition-transform group-hover:translate-x-0.5">
                <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          ) : (
            <span className="inline-flex items-center rounded-full bg-white px-3 py-1.5 text-[11px] md:text-[12px] text-slate-400 ring-1 ring-gray-200">
              Loading…
            </span>
          )}
        </div>

        {/* Image */}
        <div className="ml-auto h-full w-[50%] overflow-hidden rounded-lg ring-1 ring-gray-200">
          <img
            src={bottom?.img}
            alt={bottom?.name || "Promo 2"}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.05]"
          />
          <span className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-t from-black/5 via-transparent to-transparent" />
        </div>
      </div>
    </div>
  );
};

export default BannerBox2;