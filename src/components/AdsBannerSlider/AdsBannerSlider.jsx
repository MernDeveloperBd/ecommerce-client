// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';



// import required modules
import { Navigation } from 'swiper/modules';
import AdsBannerBox from '../AdsBannerBox/AdsBannerBox';

const AdsBannerSlider = ({ items }) => {
    return (
        <div className='pt-4 py-8'>
            <div className='container'>
                <Swiper
                    slidesPerView={items}
                    spaceBetween={10}
                    navigation={true}
                    pagination={{
                        clickable: true,
                    }}
                    modules={[Navigation]}
                    className="mySwiper">
                    <SwiperSlide>
                        <AdsBannerBox img={'https://i.ibb.co/27kdTcyh/banner.png'} link={'/'} />
                    </SwiperSlide>
                    <SwiperSlide>
                        <AdsBannerBox img={'https://i.ibb.co/27kdTcyh/banner.png'} link={'/'}/>
                    </SwiperSlide>
                    <SwiperSlide>
                        <AdsBannerBox img={'https://i.ibb.co/27kdTcyh/banner.png'} />
                    </SwiperSlide>
                    <SwiperSlide>
                        <AdsBannerBox img={'https://i.ibb.co/27kdTcyh/banner.png'} />
                    </SwiperSlide>
                </Swiper>
            </div>
        </div>
    );
};

export default AdsBannerSlider;