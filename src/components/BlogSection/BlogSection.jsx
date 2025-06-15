import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// import required modules
import { Navigation } from 'swiper/modules';
import BlogItem from './BlogItem';
const BlogSection = ({blogsItemperView}) => {
    return (
        <div className='container'>
            <h2 className='text-[24px] font-semibold mb-2'>From Our Blogs</h2>
             <Swiper spaceBetween={30}
             slidesPerView={blogsItemperView}        
        pagination={{
          clickable: true
        }} navigation={true} modules={[Navigation]} className="mySwiper py-8">
        <SwiperSlide>
            <BlogItem image1={"https://i.ibb.co/p6N0c8Ys/Digital-Print-Lone-Three-Piece-3-kenakatabazar-bd.jpg" }/>
        </SwiperSlide>
        <SwiperSlide>
            <BlogItem image1={"https://i.ibb.co/dxfD53n/Digital-Print-Lone-Three-Piece-7-kenakatabazar-bd.jpg"}/>
        </SwiperSlide>
        <SwiperSlide>
            <BlogItem image1={"https://i.ibb.co/p6N0c8Ys/Digital-Print-Lone-Three-Piece-3-kenakatabazar-bd.jpg" }/>
        </SwiperSlide>
        <SwiperSlide>
            <BlogItem image1={"https://i.ibb.co/dxfD53n/Digital-Print-Lone-Three-Piece-7-kenakatabazar-bd.jpg"}/>
        </SwiperSlide>
       
        
      </Swiper>
        </div>
    );
};

export default BlogSection;