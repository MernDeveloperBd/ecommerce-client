import { useEffect, useState } from "react";
import { fetchDataFromApi } from "../../utils/api";
import { Link } from "react-router-dom";

const CategoryGridSection16 = () => {
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
  const idStr = (id) => (id && id._id ? id._id : String(id || ""));

  const getCategoryProducts = (catId) =>
    products.filter((p) => idStr(p.catId) === idStr(catId)).slice(0, 13);

  // Product Listing URL (category অনুযায়ী)
  const buildListUrlByCat = (catId) => {
    const params = new URLSearchParams();
    params.set("cat", idStr(catId));
    return `/productListing?${params.toString()}`;
  };

  const firstThreeCategories = categories.slice(0, 3);

  return (
    <section className="relative py-6 md:py-8 bg-gradient-to-b from-gray-50 via-white to-gray-50">
  <div className="container mx-auto px-4">
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
      {firstThreeCategories.map((cat) => {
        const catProducts = getCategoryProducts(cat._id) || [];
        return (
          <div
            key={cat._id}
            className="group relative overflow-hidden rounded-2xl p-[1.2px] bg-gradient-to-br from-violet-300/60 via-fuchsia-300/60 to-rose-300/60"
          >
            {/* Inner glass card */}
            <div className="relative flex h-full flex-col rounded-2xl bg-white/85 backdrop-blur-xl p-4 md:p-5 ring-1 ring-gray-200/70 shadow-[0_2px_12px_rgba(0,0,0,0.05)] transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-[0_16px_40px_rgba(139,92,246,0.18)]">
              {/* Decorative glows */}
              <div className="pointer-events-none absolute -top-10 -right-10 h-24 w-24 rounded-full bg-violet-400/10 blur-2xl" />
              <div className="pointer-events-none absolute -bottom-10 -left-10 h-24 w-24 rounded-full bg-rose-400/10 blur-2xl" />

              {/* Title + count */}
              <div className="mb-4 flex items-center justify-between gap-2">
                <h3 className="text-[17px] md:text-lg font-extrabold leading-tight text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-600 truncate">
                  {cat.name}
                </h3>
                {!!catProducts.length && (
                  <span className="shrink-0 inline-flex items-center rounded-full bg-gray-100 px-2 py-0.5 text-[10px] font-semibold text-gray-700 ring-1 ring-gray-200">
                    {catProducts.length} items
                  </span>
                )}
              </div>

              {/* 4x4 grid */}
              <div className="grid grid-cols-4 grid-rows-4 gap-2 flex-grow h-[420px]">
                {Array.from({ length: 16 }).map((_, idx) => {
                  // Middle big image at index 5
                  if (idx === 5) {
                    const bigImage = catProducts[0];
                    if (!bigImage) return null;
                    return (
                      <Link
                        key={`big-${bigImage._id}`}
                        to={buildListUrlByCat(cat._id)}
                        className="group/img col-span-2 row-span-2 relative block overflow-hidden rounded-xl ring-1 ring-gray-200 transition-all duration-300 hover:ring-violet-300 hover:shadow-[0_10px_26px_rgba(124,58,237,0.15)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400/40"
                      >
                        <img
                          src={bigImage.images?.[0]}
                          alt={bigImage.name}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover/img:scale-105"
                          loading="lazy"
                        />
                        <span className="pointer-events-none absolute inset-0 opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 bg-gradient-to-t from-black/15 via-transparent to-transparent" />
                      </Link>
                    );
                  }

                  // Fill other slots sequentially around the big tile
                  const productIdx =
                    idx < 5
                      ? idx
                      : idx > 5 && idx < 10
                      ? idx - 1
                      : idx > 9 && idx < 14
                      ? idx - 2
                      : idx > 13
                      ? idx - 3
                      : null;

                  if (productIdx === null) return null;
                  const product = catProducts[productIdx];
                  if (!product) return null;

                  return (
                    <Link
                      key={product._id}
                      to={buildListUrlByCat(cat._id)}
                      className="group/img relative block overflow-hidden rounded-xl ring-1 ring-gray-200 transition-all duration-300 hover:ring-violet-300 hover:shadow-[0_8px_22px_rgba(124,58,237,0.15)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400/40"
                    >
                      <img
                        src={product.images?.[0]}
                        alt={product.name}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover/img:scale-105"
                        loading="lazy"
                      />
                      <span className="pointer-events-none absolute inset-0 opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 bg-gradient-to-t from-black/10 via-transparent to-transparent" />
                    </Link>
                  );
                })}
              </div>

              {/* Explore more */}
              <div className="mt-auto pt-4">
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
          </div>
        );
      })}
    </div>
  </div>
</section>
  );
};

export default CategoryGridSection16;