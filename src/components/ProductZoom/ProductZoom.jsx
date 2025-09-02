import { Swiper, SwiperSlide } from 'swiper/react';

import InnerImageZoom from 'react-inner-image-zoom';
import 'react-inner-image-zoom/lib/styles.min.css';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { useRef, useState } from 'react';


const ProductZoom = () => {
    const[slideIndex, setSlideIndex] = useState(0)
    const zoomSliderBig = useRef()
    const zoomSliderSml = useRef()
    const goto = (index) =>{
        setSlideIndex(index)
        zoomSliderSml.current.swiper.slideTo(index)
        zoomSliderBig.current.swiper.slideTo(index)
    }
    return (

        <>
            <div className="flex gap-3 ">
                <div className="slider w-[20%]">
                    <Swiper
                    ref={zoomSliderSml}
                        direction={'vertical'}
                        slidesPerView={4}
                        spaceBetween={10}
                        navigation={true}
                        modules={[Navigation]}
                        className="zoomProductSliderThumbs  overflow-hidden"
                    >
                        <SwiperSlide >
                            <div className={`item rounded-md cursor-pointer overflow-hidden ${slideIndex === 0 ? "opacity-100" : "opacity-50"}`} onClick={()=>goto(0)}>
                                <img src="https://i.ibb.co/S4sxz04T/Cotton-Print-Panjabi-1-kenakata-bazar-bd.jpg" alt="" className=' w-full hover:scale-105' />
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className={`item rounded-md cursor-pointer overflow-hidden ${slideIndex === 1 ? "opacity-100" : "opacity-50"}`} onClick={()=>goto(1)}>
                                <img src="https://i.ibb.co/p6N0c8Ys/Digital-Print-Lone-Three-Piece-3-kenakatabazar-bd.jpg" alt="" className='w-full hover:scale-105' />
                            </div>
                        </SwiperSlide>
                       
                        <SwiperSlide>
                            <div className={`item rounded-md cursor-pointer overflow-hidden ${slideIndex === 3 ? "opacity-100" : "opacity-50"}`} onClick={()=>goto(3)}>
                                <img src="https://i.ibb.co/S4sxz04T/Cotton-Print-Panjabi-1-kenakata-bazar-bd.jpg" alt="" className='w-full hover:scale-105' />
                            </div>
                        </SwiperSlide>
                       
                        <SwiperSlide>
                            <div className={`item rounded-md cursor-pointer overflow-hidden ${slideIndex === 3 ? "opacity-100" : "opacity-50"}`} onClick={()=>goto(3)}>
                                <img src="https://i.ibb.co/S4sxz04T/Cotton-Print-Panjabi-1-kenakata-bazar-bd.jpg" alt="" className='w-full hover:scale-105' />
                            </div>
                        </SwiperSlide>
                       
                    </Swiper>
                </div>
                <div className="zoomContainer w-[80%] h-[450px] overflow-hidden">
                    <Swiper
                    ref={zoomSliderBig}
                        slidesPerView={1}
                        spaceBetween={0}
                        navigation={false}
                    >

                        <SwiperSlide>
                            <InnerImageZoom
                                zoomType='hover'
                                zoomScale={1}
                                src="https://i.ibb.co/S4sxz04T/Cotton-Print-Panjabi-1-kenakata-bazar-bd.jpg"  className=' rounded' />
                        </SwiperSlide>
                        <SwiperSlide>
                            <InnerImageZoom
                                zoomType='hover'
                                zoomScale={1}
                                src="https://i.ibb.co/p6N0c8Ys/Digital-Print-Lone-Three-Piece-3-kenakatabazar-bd.jpg"  className=' rounded' />
                        </SwiperSlide>
                        <SwiperSlide>
                            <InnerImageZoom
                                zoomType='hover'
                                zoomScale={1}
                                src="https://i.ibb.co/dxfD53n/Digital-Print-Lone-Three-Piece-7-kenakatabazar-bd.jpg" className=' rounded' />
                        </SwiperSlide>
                        <SwiperSlide>
                            <InnerImageZoom
                                zoomType='hover'
                                zoomScale={1}
                                src="https://i.ibb.co/S4sxz04T/Cotton-Print-Panjabi-1-kenakata-bazar-bd.jpg" className=' rounded' />
                        </SwiperSlide>
                        <SwiperSlide>
                            <InnerImageZoom
                                zoomType='hover'
                                zoomScale={1}
                                src="https://i.ibb.co/dxfD53n/Digital-Print-Lone-Three-Piece-7-kenakatabazar-bd.jpg" className=' rounded' />
                        </SwiperSlide>

                    </Swiper>
                </div>
            </div>
        </>

    );
};

export default ProductZoom;