import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Button } from "@mui/material";

const HomeSlider = () => {
  return (
    <div className="homeSlider py-4 overflow-x-hidden">
      <div className="container mx-auto px-0">
        <Swiper
          spaceBetween={20}
          navigation={true}
          autoplay={{ delay: 2500, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          modules={[Autoplay, Navigation, Pagination]}
          className="sliderHome h-[220px] sm:h-[300px] md:h-[400px] lg:h-[450px]"
        >
          {/* Slide 1 */}
          <SwiperSlide>
            <div className="w-full rounded-md overflow-hidden relative">
              <img
                src="https://i.ibb.co/tpmt15Dp/panjabi-banner1.jpg"
                alt="banner image"
                className="w-full h-full object-cover rounded-md"
              />
              <div className="info absolute top-[55%] left-4 sm:left-6 md:left-8 z-50 p-3 sm:p-4 md:p-6">
                <h3 className="text-base sm:text-xl md:text-3xl lg:text-4xl mb-2 text-white font-bold drop-shadow-md">
                  Big savings now
                </h3>
                <Button className="btn-subscribe !bg-[#1a3c3d] !text-white !px-4 !py-1 sm:!px-6 sm:!py-2 !rounded-full text-xs sm:text-sm md:text-base">
                  Buy now
                </Button>
              </div>
            </div>
          </SwiperSlide>

          {/* Slide 2 */}
          <SwiperSlide>
            <div className="w-full rounded-md overflow-hidden relative">
              <img
                src="https://i.ibb.co/tpmt15Dp/panjabi-banner1.jpg"
                alt="banner image"
                className="w-full h-full object-cover rounded-md"
              />
              <div className="info absolute top-[55%] right-4 sm:right-6 md:right-8 z-50 p-3 sm:p-4 md:p-6">
                <h3 className="text-base sm:text-xl md:text-3xl lg:text-4xl mb-2 text-white font-bold drop-shadow-md">
                  Hurry up
                </h3>
                <Button className="btn-subscribe !bg-[#1a3c3d] !text-white !px-4 !py-1 sm:!px-6 sm:!py-2 !rounded-full text-xs sm:text-sm md:text-base">
                  Buy now
                </Button>
              </div>
            </div>
          </SwiperSlide>

          {/* Slide 3 */}
          <SwiperSlide>
            <div className="w-full rounded-md overflow-hidden relative">
              <img
                src="https://i.ibb.co/tpmt15Dp/panjabi-banner1.jpg"
                alt="banner image"
                className="w-full h-full object-cover rounded-md"
              />
              <div className="info absolute top-[55%] left-4 sm:left-6 md:left-8 z-50 p-3 sm:p-4 md:p-6">
                <h3 className="text-base sm:text-xl md:text-3xl lg:text-4xl mb-2 text-white font-bold drop-shadow-md">
                  Will end soon
                </h3>
                <Button className="btn-subscribe !bg-[#1a3c3d] !text-white !px-4 !py-1 sm:!px-6 sm:!py-2 !rounded-full text-xs sm:text-sm md:text-base">
                  Buy now
                </Button>
              </div>
            </div>
          </SwiperSlide>

          {/* Slide 4 */}
          <SwiperSlide>
            <div className="w-full rounded-md overflow-hidden relative">
              <img
                src="https://i.ibb.co/tpmt15Dp/panjabi-banner1.jpg"
                alt="banner image"
                className="w-full h-full object-cover rounded-md"
              />
              <div className="info absolute top-[55%] right-4 sm:right-6 md:right-8 z-50 p-3 sm:p-4 md:p-6">
                <h3 className="text-base sm:text-xl md:text-3xl lg:text-4xl mb-2 text-white font-bold drop-shadow-md">
                  Big savings now
                </h3>
                <Button className="btn-subscribe !bg-[#1a3c3d] !text-white !px-4 !py-1 sm:!px-6 sm:!py-2 !rounded-full text-xs sm:text-sm md:text-base">
                  Buy now
                </Button>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
};

export default HomeSlider;