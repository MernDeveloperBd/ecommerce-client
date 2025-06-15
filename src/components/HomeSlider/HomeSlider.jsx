import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// import required modules
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Button } from '@mui/material';

const HomeSlider = () => {
  const pagination = {
    clickable: true,
    renderBullet: function (index, className) {
      return '<span class="' + className + '">' + (index + 1) + '</span>';
    },
  };
  return (
    <Swiper spaceBetween={30}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      pagination={{
        clickable: true, pagination
      }} navigation={true} modules={[Autoplay, Navigation, Pagination]} className="mySwiper h-[450px]">
      <SwiperSlide>
        <div className='w-full rounded-mdoverflow-hidden relative'>
          <img src='https://i.ibb.co/tpmt15Dp/panjabi-banner1.jpg' alt='banner image' className='w-full px-2 rounded-md' />
          <div className='info absolute top-[60%] left-8 z-50 p-8'>
            <h3 className='text-4xl mb-2 text-white'>Big savings now</h3>
            <Button className='btn-subscribe'>Buy now</Button>
          </div>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className='w-full rounded-mdoverflow-hidden relative'>
          <img src='https://i.ibb.co/tpmt15Dp/panjabi-banner1.jpg' alt='banner image' className='w-full px-2 rounded-md' />
          <div className='info absolute top-[60%] right-8 z-50 p-8'>
            <h3 className='text-4xl mb-2'>Hurry up</h3>
            <Button className='btn-subscribe'>Buy now</Button>
          </div>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className='w-full rounded-mdoverflow-hidden relative'>
          <img src='https://i.ibb.co/tpmt15Dp/panjabi-banner1.jpg' alt='banner image' className='w-full px-2 rounded-md' />
          <div className='info absolute top-[60%] left-8 z-50 p-8'>
            <h3 className='text-4xl mb-2 text-white'>Will end soon</h3>
            <Button className='btn-subscribe'>Buy now</Button>
          </div>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className='w-full rounded-mdoverflow-hidden relative'>
          <img src='https://i.ibb.co/tpmt15Dp/panjabi-banner1.jpg' alt='banner image' className='w-full px-2 rounded-md' />
          <div className='info absolute top-[60%] right-8 z-50 p-8'>
            <h3 className='text-4xl mb-2'>Big savings now</h3>
            <Button className='btn-subscribe'>Buy now</Button>
          </div>
        </div>
      </SwiperSlide>


    </Swiper>
  )
};

export default HomeSlider;