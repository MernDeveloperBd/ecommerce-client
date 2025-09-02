// components/RelatedProducts.jsx
import { useCallback, useEffect, useMemo, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import ProductItem from "../ProductItem/ProductItem";
import { fetchDataFromApi } from "../../utils/api";

const RelatedProducts = ({
  title = "Related Products",
  limit = 10,
  excludeId = null,
  viewAllLink = "/productListing",
}) => {
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  // Helpers
  const idStr = (id) => {
    if (!id) return "";
    if (typeof id === "string") return id;
    if (typeof id === "object") return String(id.$oid || id._id || "");
    return String(id);
  };

  // Try to extract an array from common API response shapes
  const pickArray = (res) => {
    const arr =
      (Array.isArray(res) && res) ||
      (Array.isArray(res?.data) && res.data) ||
      (Array.isArray(res?.products) && res.products) ||
      (Array.isArray(res?.items) && res.items) ||
      (Array.isArray(res?.data?.products) && res.data.products) ||
      (Array.isArray(res?.data?.docs) && res.data.docs) ||
      [];
    return Array.isArray(arr) ? arr : [];
  };

  // Normalize product to the fields ProductItem expects
  const normalizeProduct = (p) => {
    const _id = idStr(p?._id);
    const name = p?.name || p?.title || "Untitled";
    const images =
      Array.isArray(p?.images) && p.images.length
        ? p.images
        : Array.isArray(p?.gallery)
        ? p.gallery
        : [];
    const price =
      typeof p?.price !== "undefined"
        ? p?.price
        : typeof p?.salePrice !== "undefined"
        ? p?.salePrice
        : null;
    const oldPrice = typeof p?.oldPrice !== "undefined" ? p?.oldPrice : p?.mrp;
    const resellingPrice = p?.resellingPrice ?? null;
    const catName =
      p?.catName ||
      p?.category?.name ||
      (typeof p?.category === "string" ? p.category : "") ||
      "Others";

    return { _id, name, images, price, oldPrice, resellingPrice, catName };
  };

  const refetch = useCallback(async () => {
    setLoading(true);
    setErr("");
    try {
      const res = await fetchDataFromApi(`/api/product/getAllProducts`);
      const ok =
        (res && res.error === false) ||
        res?.success === true ||
        res?.status === "success" ||
        res?.code === 200 ||
        true; // tolerate APIs that don't send a 'success' flag

      const arr = pickArray(res).map(normalizeProduct).filter((p) => p?._id);
      if (ok && arr.length) {
        setAllProducts(arr);
      } else {
        setErr(res?.message || "Failed to load related products");
      }
    } catch (e) {
      setErr(e?.message || "Network error while loading products");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let active = true;
    (async () => {
      await refetch();
    })();
    return () => {
      active = false;
    };
  }, [refetch]);

  // Remove current product if provided
  const source = useMemo(() => {
    const exId = idStr(excludeId);
    return exId ? allProducts.filter((p) => idStr(p?._id) !== exId) : allProducts;
  }, [allProducts, excludeId]);

  // Pick 1 per unique category first
  const uniqueByCategory = useMemo(() => {
    const seen = new Set();
    const out = [];
    for (const p of source) {
      const key = (p?.catName || "Others").toLowerCase();
      if (!seen.has(key)) {
        seen.add(key);
        out.push(p);
      }
    }
    return out;
  }, [source]);

  // Fill to desired limit
  const finalList = useMemo(() => {
    const list = uniqueByCategory.slice(0, limit);
    if (list.length < limit) {
      const taken = new Set(list.map((x) => idStr(x?._id)));
      for (const p of source) {
        const pid = idStr(p?._id);
        if (!taken.has(pid)) {
          list.push(p);
          taken.add(pid);
          if (list.length === limit) break;
        }
      }
    }
    return list;
  }, [uniqueByCategory, source, limit]);

  return (
    <section className="relative py-4 md:py-6">
  <div className="px-2 md:px-4">
    {/* Heading */}
    <div className="mb-3 flex items-center justify-between">
      <h3 className="text-base md:text-xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-slate-900 to-slate-600">
        {title}
      </h3>
      <Link
        to={viewAllLink}
        className="hidden md:inline-flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 ring-1 ring-gray-200 hover:bg-sky-50 hover:text-sky-700 hover:ring-sky-200 transition"
      >
        View all
        <svg width="14" height="14" viewBox="0 0 24 24">
          <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </Link>
    </div>

    {/* Mobile: show 5 cards | md+: show 10 cards (2 rows x 5 cols) */}
    <div
      className={[
        "grid gap-3",
        "grid-cols-2 sm:grid-cols-3",          // small devices layout
        "md:grid-cols-5 md:grid-rows-2",       // md+: 2 rows x 5 cols
        "rounded-2xl p-2 ring-1 ring-gray-200 bg-white/80 backdrop-blur-sm shadow-sm",
      ].join(" ")}
    >
      {/* Skeletons */}
      {loading &&
        Array.from({ length: 10 }).map((_, i) => (
          <div
            key={`sk-${i}`}
            className={[
              "h-full rounded-xl ring-1 ring-gray-200 bg-white p-2 md:p-3 shadow-sm animate-pulse",
              i >= 5 ? "hidden md:block" : "", // hide 6-10 on mobile
            ].join(" ")}
          >
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg bg-gray-100" />
            <div className="mt-2 h-4 w-1/2 rounded bg-gray-100" />
            <div className="mt-1 h-3 w-3/4 rounded bg-gray-100" />
            <div className="mt-2 h-4 w-1/3 rounded bg-gray-100" />
          </div>
        ))}

      {/* Error */}
      {!loading && err && (
        <div className="col-span-full flex flex-col items-center justify-center py-8 text-sm text-rose-600">
          <span>{err}</span>
          <button
            onClick={refetch}
            className="mt-2 inline-flex items-center rounded-full px-3 py-1.5 text-xs font-semibold text-slate-700 ring-1 ring-gray-200 bg-white hover:bg-sky-50 hover:text-sky-700 hover:ring-sky-200 transition"
          >
            Retry
          </button>
        </div>
      )}

      {/* Products: first 10, hide 6–10 on mobile */}
      {!loading && !err &&
        (finalList?.slice(0, 10) || []).map((p, i) => (
          <div key={p?._id} className={i >= 4 ? "hidden md:block" : ""}>
            <div className="h-full min-h-[320px] md:min-h-[350px]">
              <ProductItem product={p} />
            </div>
          </div>
        ))}

      {/* Empty */}
      {!loading && !err && finalList?.length === 0 && (
        <div className="col-span-full flex items-center justify-center py-8 text-sm text-slate-500">
          No related products found.
        </div>
      )}
    </div>
  </div>
</section>
  );
};

RelatedProducts.propTypes = {
  title: PropTypes.string,
  limit: PropTypes.number,
  excludeId: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  viewAllLink: PropTypes.string,
};

export default RelatedProducts;