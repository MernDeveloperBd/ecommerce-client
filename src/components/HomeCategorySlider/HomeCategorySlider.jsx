import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
// import required modules
import {Autoplay, Pagination } from 'swiper/modules';
import { Link } from 'react-router-dom';

const CategorySlider = ({categoryPerSlide}) => {
    return (
        <div className=' container'>
            <Swiper
                slidesPerView={categoryPerSlide}
                spaceBetween={10}
                autoplay={{
          delay: 1500,
          disableOnInteraction: false,
        }}
               
                modules={[Autoplay,Pagination]}
                className="mySwiper"
            >
                <SwiperSlide>
                    <Link>
                        <div className='group item p-3 bg-white rounded-sm text-center flex items-center justify-center flex-col w-28 h-28'>
                            <img
                                src="https://i.ibb.co/Mkmb0xjX/ator.jpg"
                                alt=""
                                className='w-24 h-16 transform transition-transform duration-300 group-hover:scale-105'
                            />
                            <h3 className='text-[14px] font-[500] mt-2'>আতর</h3>
                        </div>
                    </Link>
                </SwiperSlide>
                <SwiperSlide>
                    <Link>
                        <div className='group item p-3 bg-white rounded-sm text-center flex items-center justify-center flex-col w-28 h-28'>
                            <img src="https://i.ibb.co/HfTrrjDn/Premium-Cotton-Print-Panjabi-kenakata-bazar-bd.jpg" alt="" className='w-24 h-16 transform transition-transform duration-300 group-hover:scale-105' />
                            <h3 className='text-[14px] font-[500] mt-2'>পাঞ্জাবী</h3>
                        </div>
                    </Link>
                </SwiperSlide>
                <SwiperSlide>
                    <Link>
                        <div className='group item p-3 bg-white rounded-sm text-center flex items-center justify-center flex-col w-28 h-28'>
                            <img
                                src="https://i.ibb.co/Mkmb0xjX/ator.jpg"
                                alt=""
                                className='w-24 h-16 transform transition-transform duration-300 group-hover:scale-105'
                            />
                            <h3 className='text-[14px] font-[500] mt-2'>আতর</h3>
                        </div>
                    </Link>
                </SwiperSlide>
                <SwiperSlide>
                    <Link>
                        <div className='group item p-3 bg-white rounded-sm text-center flex items-center justify-center flex-col w-28 h-28'>
                            <img src="https://i.ibb.co/HfTrrjDn/Premium-Cotton-Print-Panjabi-kenakata-bazar-bd.jpg" alt="" className='w-24 h-16 transform transition-transform duration-300 group-hover:scale-105' />
                            <h3 className='text-[14px] font-[500] mt-2'>পাঞ্জাবী</h3>
                        </div>
                    </Link>
                </SwiperSlide>
                <SwiperSlide>
                    <Link>
                        <div className='group item p-3 bg-white rounded-sm text-center flex items-center justify-center flex-col w-28 h-28'>
                            <img
                                src="https://i.ibb.co/Mkmb0xjX/ator.jpg"
                                alt=""
                                className='w-24 h-16 transform transition-transform duration-300 group-hover:scale-105'
                            />
                            <h3 className='text-[14px] font-[500] mt-2'>আতর</h3>
                        </div>
                    </Link>
                </SwiperSlide>
                <SwiperSlide>
                    <Link>
                        <div className='group item p-3 bg-white rounded-sm text-center flex items-center justify-center flex-col w-28 h-28'>
                            <img src="https://i.ibb.co/HfTrrjDn/Premium-Cotton-Print-Panjabi-kenakata-bazar-bd.jpg" alt="" className='w-24 h-16 transform transition-transform duration-300 group-hover:scale-105' />
                            <h3 className='text-[14px] font-[500] mt-2'>পাঞ্জাবী</h3>
                        </div>
                    </Link>
                </SwiperSlide>
                <SwiperSlide>
                    <Link>
                        <div className='group item p-3 bg-white rounded-sm text-center flex items-center justify-center flex-col w-28 h-28'>
                            <img
                                src="https://i.ibb.co/Mkmb0xjX/ator.jpg"
                                alt=""
                                className='w-24 h-16 transform transition-transform duration-300 group-hover:scale-105'
                            />
                            <h3 className='text-[14px] font-[500] mt-2'>আতর</h3>
                        </div>
                    </Link>
                </SwiperSlide>
                <SwiperSlide>
                    <Link>
                        <div className='group item p-3 bg-white rounded-sm text-center flex items-center justify-center flex-col w-28 h-28'>
                            <img src="https://i.ibb.co/HfTrrjDn/Premium-Cotton-Print-Panjabi-kenakata-bazar-bd.jpg" alt="" className='w-24 h-16 transform transition-transform duration-300 group-hover:scale-105' />
                            <h3 className='text-[14px] font-[500] mt-2'>পাঞ্জাবী</h3>
                        </div>
                    </Link>
                </SwiperSlide>
                <SwiperSlide>
                    <Link>
                        <div className='group item p-3 bg-white rounded-sm text-center flex items-center justify-center flex-col w-28 h-28'>
                            <img
                                src="https://i.ibb.co/Mkmb0xjX/ator.jpg"
                                alt=""
                                className='w-24 h-16 transform transition-transform duration-300 group-hover:scale-105'
                            />
                            <h3 className='text-[14px] font-[500] mt-2'>আতর</h3>
                        </div>
                    </Link>
                </SwiperSlide>
                <SwiperSlide>
                    <Link>
                        <div className='group item p-3 bg-white rounded-sm text-center flex items-center justify-center flex-col w-28 h-28'>
                            <img src="https://i.ibb.co/HfTrrjDn/Premium-Cotton-Print-Panjabi-kenakata-bazar-bd.jpg" alt="" className='w-24 h-16 transform transition-transform duration-300 group-hover:scale-105' />
                            <h3 className='text-[14px] font-[500] mt-2'>মোজা</h3>
                        </div>
                    </Link>
                </SwiperSlide>


            </Swiper>
        </div>
    );
};

export default CategorySlider;