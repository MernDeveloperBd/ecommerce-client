import AdsBannerSlider from "../AdsBannerSlider/AdsBannerSlider";
import OneBanner from "../Banner/OneBanner";
import BlogSection from "../BlogSection/BlogSection";
import FeaturedProducts from "../FeaturedProducts/FeaturedProducts";
import CategorySlider from "../HomeCategorySlider/HomeCategorySlider";
import HomeSlider from "../HomeSlider/HomeSlider";
import LatestProducts from "../LatestProduct/LatestProducts";
import PopularProducts from "../PopularProducts/PopularProducts";
import ShippingBanner from "../ShippingBanner/ShippingBanner";


const Home = () => {
    return (
        <div className="space-y-8">
            <HomeSlider/>
            <CategorySlider categoryPerSlide={8}/>
            <ShippingBanner/>
            <AdsBannerSlider items={4}/>
            <PopularProducts/>
            <OneBanner/>
            <LatestProducts/>
            <AdsBannerSlider items={2}/>
            <FeaturedProducts/>
            <BlogSection blogsItemperView={4}/>
        </div>
    );
};

export default Home;