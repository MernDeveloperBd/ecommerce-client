import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchDataFromApi } from "../../utils/api";

const CategorySlider = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchDataFromApi(`/api/category`).then((res) => {
      if (res?.error === false) {
        const parentCats = res.data.filter((cat) => cat.parentId === null);
        setCategories(parentCats);
      }
    });
  }, []);

  // ObjectId/string হ্যান্ডেল
  const idStr = (id) => {
    if (id && typeof id === "object") {
      if (id.$oid) return String(id.$oid);
      if (id._id) return String(id._id);
    }
    return String(id || "");
  };

  // Product Listing URL (category অনুযায়ী)
  const buildListUrlByCat = (catId) => {
    const params = new URLSearchParams();
    params.set("cat", idStr(catId));
    return `/productListing?${params.toString()}`;
  };

  return (
    <div className="relative mx-auto max-w-screen-xl px-2 md:px-4 py-6 md:py-10">
      {/* Outer gradient frame */}
      <div className="relative rounded-3xl p-[1px] bg-gradient-to-br from-rose-300/60 via-fuchsia-300/50 to-orange-300/60 shadow-[0_10px_30px_rgba(0,0,0,.06)]">
        {/* Glass container */}
        <div className="relative overflow-hidden rounded-3xl bg-white/80 backdrop-blur-xl supports-[backdrop-filter]:bg-white/60">
          {/* Decorative soft gradients */}
          <div className="pointer-events-none absolute inset-0 opacity-80">
            <div className="absolute -top-24 -left-24 h-64 w-64 rounded-full bg-rose-400/10 blur-3xl" />
            <div className="absolute -bottom-24 -right-24 h-64 w-64 rounded-full bg-orange-400/10 blur-3xl" />
          </div>

          <div className="px-2 md:px-4">
            <Swiper
              spaceBetween={12}
              autoplay={{
                delay: 2500,
                disableOnInteraction: false,
              }}
              modules={[Autoplay, Pagination, Navigation]}
              pagination={{
                clickable: true,
                el: ".custom-pagination",
              }}
              navigation={{
                prevEl: ".cat-nav-prev",
                nextEl: ".cat-nav-next",
              }}
              breakpoints={{
                320: { slidesPerView: 2 },
                480: { slidesPerView: 3 },
                640: { slidesPerView: 4 },
                768: { slidesPerView: 5 },
                1024: { slidesPerView: 6 },
                1280: { slidesPerView: 8 },
              }}
              className="w-full !pb-12"
            >
              {categories.map((cat) => (
                <SwiperSlide key={cat._id}>
                  <Link to={buildListUrlByCat(cat._id)}>
                    <div className="group relative mx-auto w-full max-w-[180px] select-none">
                      <div className="flex flex-col items-center justify-center rounded-2xl bg-white/80 p-3 sm:p-4 ring-1 ring-gray-200/70 shadow-[0_2px_12px_rgba(0,0,0,0.05)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(244,63,94,.12)] hover:ring-rose-300/60">
                        {/* Circular image with gradient ring */}
                        <div className="relative p-[2px] rounded-full bg-gradient-to-tr from-rose-400 via-fuchsia-400 to-orange-400">
                          <div className="relative w-16 h-16 md:w-20 md:h-20 overflow-hidden rounded-full bg-white">
                            <img
                              src={cat.images?.[0] || "https://via.placeholder.com/150"}
                              alt={cat.name}
                              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.05]"
                              loading="lazy"
                            />
                            <span className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/20"></span>
                          </div>
                        </div>

                        {/* Soft glow under image on hover */}
                        <span
                          aria-hidden
                          className="absolute inset-x-8 -bottom-1 h-8 rounded-full bg-gradient-to-r from-rose-400/20 to-orange-400/20 blur-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                        />

                        {/* Label */}
                        <div className="mt-3">
                          <span className="shine-on-hover inline-flex max-w-[130px] items-center gap-1.5 truncate rounded-full bg-gray-900 px-3 py-1 text-[11px] md:text-[13px] font-medium tracking-wide text-white ring-1 ring-black/5 transition-all duration-300 group-hover:scale-[1.04] group-hover:bg-gray-800">
                            <span className="truncate">{cat.name}</span>
                            <svg
                              className="opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0.5"
                              width="14"
                              height="14"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M7 17L17 7M17 7H9M17 7V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* Nav arrows (md+ only) */}
          <button
            className="cat-nav-btn cat-nav-prev hidden md:flex"
            aria-label="Previous"
            type="button"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M15 6L9 12L15 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <button
            className="cat-nav-btn cat-nav-next hidden md:flex"
            aria-label="Next"
            type="button"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M9 6L15 12L9 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          {/* Custom pagination */}
          <div className="custom-pagination pointer-events-auto absolute -bottom-6 left-1/2 -translate-x-1/2 flex items-center justify-center gap-2"></div>
        </div>
      </div>
    </div>
  );
};

export default CategorySlider;