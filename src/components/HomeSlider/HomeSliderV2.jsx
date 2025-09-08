// components/HomeSliderV2/HomeSliderV2.jsx

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// import required modules
import { EffectFade, Navigation, Pagination, Autoplay } from 'swiper/modules';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchDataFromApi } from '../../utils/api';

const HomeSliderV2 = () => {
  const [homeSliderData, setHomeSliderData] = useState([]);
  const [loading, setLoading] = useState(true);

  // homeslides থেকে ডাটা আনো
  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const res = await fetchDataFromApi('/api/homeSlides');
        if (!active) return;
        if (res?.error === false && Array.isArray(res?.data)) {
          setHomeSliderData(res.data);
        } else {
          setHomeSliderData([]);
        }
      } catch {
        setHomeSliderData([]);
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => {
      active = false;
    };
  }, []);

  if (loading) {
    return (
      <div className="py-4">
        <div className="h-[200px] md:h-[360px] w-full rounded-3xl bg-gradient-to-br from-gray-100 to-gray-50 flex items-center justify-center text-sm text-gray-500">
          Loading banner...
        </div>
      </div>
    );
  }

  if (!homeSliderData || homeSliderData.length === 0) {
    return (
      <div className="py-4">
        <div className="h-[200px] md:h-[360px] w-full rounded-3xl bg-gradient-to-br from-gray-100 to-gray-50 flex items-center justify-center text-sm text-gray-500">
          No slides found
        </div>
      </div>
    );
  }

  return (
    <div className="py-4">
      <Swiper
        spaceBetween={30}
        effect="fade"
        navigation={true}
        autoplay={{
          delay: 4500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        modules={[EffectFade, Navigation, Pagination, Autoplay]}
        className="homeSliderV2 h-[200px] md:h-[360px]"
      >
        {homeSliderData.slice(0, 4).map((item, index) => {
          // images array/string – দুটোই সাপোর্ট
          const images = Array.isArray(item?.images)
            ? item.images
            : typeof item?.images === 'string'
            ? [item.images]
            : [];
          const img0 =
            images[0] ||
            'https://via.placeholder.com/1200x600?text=Banner';
          const img1 = images[1] || img0;

          return (
            <SwiperSlide key={item?._id || index}>
              <div className="item group relative w-full overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-[0_1px_14px_rgba(2,6,23,0.06)]">
                {/* Base image + hover crossfade */}
                <div className="relative h-[200px] md:h-[360px]">
                  <img
                    src={img0}
                    alt={item?.name || 'banner'}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                    loading="lazy"
                  />
                  <img
                    src={img1}
                    alt={(item?.name || 'banner') + ' hover'}
                    className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-700 group-hover:opacity-100"
                    loading="lazy"
                  />
                  {/* Soft overlay for readability (mobile) */}
                  <span className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/20 via-transparent to-transparent md:hidden" />
                </div>

                {/* Pastel corner glows */}
                <div className="pointer-events-none absolute -top-16 -left-16 h-40 w-40 rounded-full bg-sky-200/30 blur-3xl" />
                <div className="pointer-events-none absolute -bottom-16 -right-16 h-40 w-40 rounded-full bg-indigo-200/30 blur-3xl" />

                {/* Angled glass panel (unique wedge) */}
                <div className="absolute inset-y-0 left-0 w-[78%] md:w-[46%] translate-x-[-6%] md:translate-x-[-60%] transition-transform duration-700 group-hover:translate-x-0">
                  <div className="h-full w-full rounded-r-[28px] bg-white/70 backdrop-blur-xl ring-1 ring-gray-200 shadow-[0_10px_30px_rgba(2,6,23,0.08)] px-4 md:px-8 py-5 md:py-10 [clip-path:polygon(0%_0%,100%_0%,85%_100%,0%_100%)]">
                   <div className="flex justify-between items-center">
                     {/* Small badge */}
                    <span className="inline-flex items-center rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-semibold text-emerald-700 ring-1 ring-emerald-200 w-20 h-6">
                      Big Savings
                    </span>
                    
                    {/* CTA */}
                    <Link to="/productListing" className="inline-block ">
                      <Button className="!rounded-full !px-5 !h-10 !bg-gradient-to-r !from-sky-600 !to-indigo-600 hover:!from-sky-700 hover:!to-indigo-700 !text-white !font-semibold shadow-sm flex items-center gap-2">
                        Shop Now
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          className="transition-transform group-hover:translate-x-0.5"
                        >
                          <path
                            d="M9 6l6 6-6 6"
                            stroke="currentColor"
                            strokeWidth="2"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </Button>
                    </Link>
                   </div>

                    {/* Title */}
                    <h2 className="mt-2 text-[16px] md:text-[28px] font-extrabold leading-snug text-slate-900 line-clamp-2 ">
                      {item?.name}
                    </h2>

                    {/* Short description */}
                    {item?.shortDescription ? (
                      <p className="mt-2 text-[12px] md:text-[14px] text-slate-600 line-clamp-2">
                        {item.shortDescription}
                      </p>
                    ) : null}

                  

                  </div>
                </div>

                {/* Floating price chip (desktop) */}
                {item?.price ? (
                  <div className="hidden md:block absolute bottom-5 right-5">
                    <div className="translate-y-1 opacity-90 transition-all duration-500 group-hover:translate-y-0">
                      <span className="inline-flex items-center gap-2 rounded-2xl bg-white/90 px-3 py-2 text-sm font-bold text-slate-900 ring-1 ring-gray-200 shadow-md">
                        <span className="h-2 w-2 rounded-full bg-sky-400" />
                        TK {item?.price}
                      </span>
                    </div>
                  </div>
                ) : null}

                {/* Mobile compact info card */}
                <div className="md:hidden absolute inset-x-3 bottom-3 rounded-xl bg-white/90 backdrop-blur-md p-3 ring-1 ring-gray-200 shadow-md">
                  <h3 className="text-[13px] font-semibold text-slate-900 line-clamp-2">
                    {item?.name}
                  </h3>
                  <div className="mt-1 flex items-center justify-between">
                    {item?.price ? (
                      <span className="text-[13px] font-bold text-sky-700">
                        TK {item?.price}
                      </span>
                    ) : <span />}
                    <Link to="/productListing">
                      <Button className="!rounded-full !px-3 !h-8 !bg-sky-600 hover:!bg-sky-700 !text-white !text-[12px] !font-semibold">
                        Shop Now
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default HomeSliderV2;