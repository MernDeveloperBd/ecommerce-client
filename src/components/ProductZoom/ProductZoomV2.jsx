import { useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

// import required modules
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';


const ProductZoomV2 = (props) => {

  const images = props?.images?.product?.images;

  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  return (

    <>
      <Swiper
        style={{
          '--swiper-navigation-color': '#fff',
          '--swiper-pagination-color': '#fff',
        }}
        loop={true}
        spaceBetween={10}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper2 md:h-[380px] mb-1 object-cover"
      >
        {
          images?.map((item, index) => {
            return (
              <SwiperSlide key={index}>
                <img src={item} className='rounded-md' />
              </SwiperSlide>
            )
          })
        }
      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        loop={true}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper "
      >
        {
          images?.map((item, index) => {
            return (
              <SwiperSlide key={index}>
                <img src={item} className='rounded-md' />
              </SwiperSlide>
            )
          })
        }
      </Swiper>
    </>

  );
};

export default ProductZoomV2;