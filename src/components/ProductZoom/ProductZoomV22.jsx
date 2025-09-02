import { useMemo, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";

const ProductZoomV22 = ({ images: imgsProp }) => {
  const images = useMemo(() => (Array.isArray(imgsProp) ? imgsProp : []), [imgsProp]);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [current, setCurrent] = useState(1);

  const validThumbs = thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null;
  if (!images.length) return null; // or skeleton

  return (
    <div className="relative rounded-2xl p-[1.2px] bg-gradient-to-br from-sky-100 via-indigo-100 to-violet-100">
      <div className="rounded-2xl bg-white/85 backdrop-blur-xl p-2 md:p-3 ring-1 ring-gray-200/70">
        {/* Main */}
        <div className="relative">
          <Swiper
            key={images.length}
            style={{
              "--swiper-navigation-color": "#0ea5e9",
              "--swiper-pagination-color": "#0ea5e9",
            }}
            loop
            spaceBetween={12}
            navigation={{ enabled: true }}
            observer
            observeParents
            thumbs={{ swiper: validThumbs }}
            modules={[FreeMode, Navigation, Thumbs]}
            onSlideChange={(sw) => setCurrent((sw?.realIndex ?? 0) + 1)}
            className="prod-zoom-main h-[300px] md:h-[380px] rounded-xl overflow-hidden ring-1 ring-gray-200 bg-white"
          >
            {images.map((src, i) => (
              <SwiperSlide key={i}>
                <div className="relative h-full w-full group">
                  <img
                    src={src}
                    alt={`product-${i + 1}`}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    loading="lazy"
                    decoding="async"
                  />
                  {/* edge gradient */}
                  <span className="pointer-events-none absolute inset-x-0 top-0 h-12 bg-gradient-to-b from-black/5 to-transparent" />
                  <span className="pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-black/5 to-transparent" />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Counter chip */}
          <div className="absolute bottom-2 right-2 z-[5]">
            <span className="inline-flex items-center rounded-full bg-white/90 px-2.5 py-1 text-xs font-semibold text-slate-800 ring-1 ring-gray-200 shadow-sm">
              {current} / {images.length}
            </span>
          </div>
        </div>

        {/* Thumbs */}
        <Swiper
          onSwiper={setThumbsSwiper}
          loop={false}
          freeMode
          watchSlidesProgress
          spaceBetween={8}
          breakpoints={{
            320: { slidesPerView: 4 },
            480: { slidesPerView: 5 },
            768: { slidesPerView: 6 },
            1024: { slidesPerView: 7 },
          }}
          modules={[FreeMode, Thumbs]}
          className="prod-zoom-thumbs mt-3"
        >
          {images.map((src, i) => (
            <SwiperSlide key={i}>
              <div className="thumb relative overflow-hidden rounded-lg ring-1 ring-gray-200 bg-white transition-all">
                <img
                  src={src}
                  alt={`thumb-${i + 1}`}
                  className="h-[60px] md:h-[68px] w-full object-cover transition-transform duration-300"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default ProductZoomV22;