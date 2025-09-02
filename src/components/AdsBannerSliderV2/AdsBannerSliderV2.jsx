import { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';
import AdsBannerBoxV2 from '../AdsBannerBox/AdsBannerBoxV2';

const AdsBannerSliderV2 = () => {
    const prevRef = useRef(null);
    const nextRef = useRef(null);

    return (
        <div className='pt-4 py-8'>
            <div className='container mx-auto px-4 relative'>
                <Swiper
                    spaceBetween={10}
                    onSwiper={(swiper) => {
                        // Delay navigation setup to ensure buttons are rendered
                        setTimeout(() => {
                            if (swiper.params && swiper.navigation) {
                                swiper.params.navigation.prevEl = prevRef.current;
                                swiper.params.navigation.nextEl = nextRef.current;
                                swiper.navigation.destroy();
                                swiper.navigation.init();
                                swiper.navigation.update();
                            }
                        });
                    }}
                    pagination={{
                        clickable: true,
                        el: '.custom-pagination',
                    }}
                    modules={[Navigation, Pagination]}
                    breakpoints={{
                        0: { slidesPerView: 1, spaceBetween: 10 },
                        640: { slidesPerView: 2, spaceBetween: 10 },
                        1024: { slidesPerView: 3, spaceBetween: 15 },
                        1280: { slidesPerView: 4, spaceBetween: 20 },
                    }}
                    className="mySwiper"
                >
                    <SwiperSlide>
                        <AdsBannerBoxV2 img={'https://i.ibb.co/S4sxz04T/Cotton-Print-Panjabi-1-kenakata-bazar-bd.jpg'} link={'blogs'} heading={'Big Savings'} title={'Women solid round Green T-shirt'}/>
                    </SwiperSlide>
                    <SwiperSlide>
                        <AdsBannerBoxV2 img={'https://i.ibb.co/27kdTcyh/banner.png'} link={'products'} heading={'Big Savings 1'} title={'Men solid round Green T-shirt'}/>
                    </SwiperSlide>
                    <SwiperSlide>
                        <AdsBannerBoxV2 img={'https://i.ibb.co/27kdTcyh/banner.png'} link={'productListing'} />
                    </SwiperSlide>
                    <SwiperSlide>
                        <AdsBannerBoxV2 img={'https://i.ibb.co/27kdTcyh/banner.png'} />
                    </SwiperSlide>
                    <SwiperSlide>
                        <AdsBannerBoxV2 img={'https://i.ibb.co/27kdTcyh/banner.png'} />
                    </SwiperSlide>
                   

                    {/* Custom navigation buttons */}
                    <div
                        ref={prevRef}
                        className="absolute top-1/2 -translate-y-1/2 left-0 z-10 text-black text-2xl cursor-pointer bg-white rounded-full h-[40px] w-[40px] flex items-center justify-center"
                    >
                        &#10094;
                    </div>
                    <div
                        ref={nextRef}
                        className="absolute top-1/2 -translate-y-1/2 right-0 z-10 text-black text-2xl cursor-pointer bg-white rounded-full h-[40px] w-[40px] flex items-center justify-center"
                    >
                        &#10095;
                    </div>

                    {/* Custom pagination */}
                    <div className="custom-pagination absolute bottom-0 left-1/2 -translate-x-1/2 mb-2"></div>
                </Swiper>
            </div>
        </div>
    );
};

export default AdsBannerSliderV2;
