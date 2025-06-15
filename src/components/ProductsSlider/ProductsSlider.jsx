import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
// import required modules
import { Pagination , Navigation } from 'swiper/modules';
import ProductItem from '../ProductItem/ProductItem';
const ProductsSlider = ({ items }) => {
    return (
        <div className="productsSlider pt-8 container">
            <Swiper
                slidesPerView={items}
                spaceBetween={10}
                navigation={true}
                autoplay={{
                    delay: 1500,
                    disableOnInteraction: false,
                }}

                modules={[Pagination, Navigation]}
                className="mySwiper"
            >
                <SwiperSlide>
                    <ProductItem image1={"https://i.ibb.co/sJw1q3Cd/Cotton-Print-Panjabi-kenakata-bazar-bd.jpg"} image2={"https://i.ibb.co/S4sxz04T/Cotton-Print-Panjabi-1-kenakata-bazar-bd.jpg" }/>
                </SwiperSlide>
                <SwiperSlide>
                    <ProductItem image1={"https://i.ibb.co/sJw1q3Cd/Cotton-Print-Panjabi-kenakata-bazar-bd.jpg"} image2={"https://i.ibb.co/S4sxz04T/Cotton-Print-Panjabi-1-kenakata-bazar-bd.jpg" }/>
                </SwiperSlide>
                <SwiperSlide>
                    <ProductItem image1={"https://i.ibb.co/sJw1q3Cd/Cotton-Print-Panjabi-kenakata-bazar-bd.jpg"} image2={"https://i.ibb.co/S4sxz04T/Cotton-Print-Panjabi-1-kenakata-bazar-bd.jpg" }/>
                </SwiperSlide>
                <SwiperSlide>
                    <ProductItem image1={"https://i.ibb.co/sJw1q3Cd/Cotton-Print-Panjabi-kenakata-bazar-bd.jpg"} image2={"https://i.ibb.co/S4sxz04T/Cotton-Print-Panjabi-1-kenakata-bazar-bd.jpg" }/>
                </SwiperSlide>
                <SwiperSlide>
                    <ProductItem image1={"https://i.ibb.co/sJw1q3Cd/Cotton-Print-Panjabi-kenakata-bazar-bd.jpg"} image2={"https://i.ibb.co/S4sxz04T/Cotton-Print-Panjabi-1-kenakata-bazar-bd.jpg" }/>
                </SwiperSlide>
                <SwiperSlide>
                    <ProductItem image1={"https://i.ibb.co/sJw1q3Cd/Cotton-Print-Panjabi-kenakata-bazar-bd.jpg"} image2={"https://i.ibb.co/S4sxz04T/Cotton-Print-Panjabi-1-kenakata-bazar-bd.jpg" }/>
                </SwiperSlide>
               
            </Swiper>
        </div>
    );
};

export default ProductsSlider;