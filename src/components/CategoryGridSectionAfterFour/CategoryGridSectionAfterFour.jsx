import { useEffect, useState } from "react";
import { fetchDataFromApi } from "../../utils/api";
import { Link } from "react-router-dom";

const CategoryGridSectionAfterFour = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchDataFromApi(`/api/category`).then((res) => {
      if (!res.error) setCategories(res.data);
    });
    fetchDataFromApi(`/api/product/getAllProducts`).then((res) => {
      if (!res.error) setProducts(res.products);
    });
  }, []);

  // ObjectId/string দুটো কেসই হ্যান্ডেল
  const idStr = (id) => {
    if (id && typeof id === "object") {
      if (id.$oid) return String(id.$oid);
      if (id._id) return String(id._id);
    }
    return String(id || "");
  };

  const getCategoryProducts = (catId) =>
    products.filter((p) => idStr(p.catId) === idStr(catId)).slice(0, 4);

  // Product Listing URL (category অনুযায়ী)
  const buildListUrlByCat = (catId) => {
    const params = new URLSearchParams();
    params.set("cat", idStr(catId));
    return `/productListing?${params.toString()}`;
  };

  return (
   <section className="relative py-10 md:py-12 bg-gradient-to-b from-gray-50 via-white to-gray-50">
  <div className="container mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
    {categories.slice(4).map((cat, index) => {
      const catProducts = getCategoryProducts(cat._id);
      const cp = Array.isArray(catProducts) ? catProducts : [];

      return (
        <div
          key={cat._id}
          className="group relative overflow-hidden rounded-2xl p-[1.2px] bg-gradient-to-br from-violet-300/60 via-fuchsia-300/60 to-rose-300/60 transition-colors"
        >
          {/* Inner glass card */}
          <div className="relative h-full rounded-2xl bg-white/85 backdrop-blur-xl p-4 md:p-5 ring-1 ring-gray-200/70 shadow-[0_2px_12px_rgba(0,0,0,0.05)] transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-[0_16px_40px_rgba(139,92,246,0.18)]">
            {/* Decorative glows */}
            <div className="pointer-events-none absolute -top-10 -right-10 h-24 w-24 rounded-full bg-violet-400/10 blur-2xl" />
            <div className="pointer-events-none absolute -bottom-10 -left-10 h-24 w-24 rounded-full bg-rose-400/10 blur-2xl" />

            {/* Title + count */}
            <div className="mb-4 flex items-center justify-between gap-2">
              <h3 className="text-[17px] md:text-lg font-extrabold leading-tight text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-600 truncate">
                {cat.name}
              </h3>
              {!!cp.length && (
                <span className="shrink-0 inline-flex items-center rounded-full bg-gray-100 px-2 py-0.5 text-[10px] font-semibold text-gray-700 ring-1 ring-gray-200">
                  {cp.length} items
                </span>
              )}
            </div>

            {/* Product images layout */}
            {index === 2 ? (
              // 3rd box → 3 Images layout (1 large + 2 small)
              <div className="grid grid-cols-2 gap-2 mb-4">
                {cp[2] && (
                  <Link
                    to={buildListUrlByCat(cat._id)}
                    className="group/img relative col-span-2 block overflow-hidden rounded-xl ring-1 ring-gray-200 transition-all duration-300 hover:ring-violet-300 hover:shadow-[0_10px_26px_rgba(124,58,237,0.15)]"
                  >
                    <div className="aspect-[16/10]">
                      <img
                        src={cp[2]?.images?.[0]}
                        alt={cp[2]?.name || 'Product'}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover/img:scale-105"
                        loading="lazy"
                      />
                    </div>
                    <span className="pointer-events-none absolute inset-0 opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 bg-gradient-to-t from-black/10 via-transparent to-transparent" />
                  </Link>
                )}
                {cp.slice(0, 2).map((p) => (
                  <Link
                    to={buildListUrlByCat(cat._id)}
                    key={p._id}
                    className="group/img relative block overflow-hidden rounded-xl ring-1 ring-gray-200 transition-all duration-300 hover:ring-violet-300 hover:shadow-[0_8px_22px_rgba(124,58,237,0.15)]"
                  >
                    <div className="aspect-square">
                      <img
                        src={p?.images?.[0]}
                        alt={p?.name || 'Product'}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover/img:scale-105"
                        loading="lazy"
                      />
                    </div>
                    <span className="pointer-events-none absolute inset-0 opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 bg-gradient-to-t from-black/10 via-transparent to-transparent" />
                  </Link>
                ))}
              </div>
            ) : (
              // Others → 4 images (2x2 grid)
              <div className="grid grid-cols-2 gap-2 mb-4">
                {cp.slice(0, 4).map((p) => (
                  <Link
                    to={buildListUrlByCat(cat._id)}
                    key={p._id}
                    className="group/img relative block overflow-hidden rounded-xl ring-1 ring-gray-200 transition-all duration-300 hover:ring-violet-300 hover:shadow-[0_8px_22px_rgba(124,58,237,0.15)]"
                  >
                    <div className="aspect-square">
                      <img
                        src={p?.images?.[0]}
                        alt={p?.name || 'Product'}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover/img:scale-105"
                        loading="lazy"
                      />
                    </div>
                    <span className="pointer-events-none absolute inset-0 opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 bg-gradient-to-t from-black/10 via-transparent to-transparent" />
                  </Link>
                ))}
              </div>
            )}

            {/* Explore more CTA */}
            <Link
              to={buildListUrlByCat(cat._id)}
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-violet-600 via-fuchsia-600 to-rose-500 px-3.5 py-1.5 text-xs md:text-sm font-semibold text-white shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_24px_rgba(124,58,237,0.28)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400/40"
            >
              Explore more
              <svg
                className="h-4 w-4 translate-x-0 transition-transform duration-300 group-hover:translate-x-0.5"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M9 6l6 6-6 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </div>
        </div>
      );
    })}
  </div>
</section>
  );
};

export default CategoryGridSectionAfterFour;