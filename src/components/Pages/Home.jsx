import { useContext } from "react";
import OneBanner from "../Banner/OneBanner";
import CategorySlider from "../HomeCategorySlider/HomeCategorySlider";
import BannerBox2 from "../HomeSlider/BannerBox2";
import HomeSliderV2 from "../HomeSlider/HomeSliderV2";
import LatestProducts from "../LatestProduct/LatestProducts";
import PopularProducts from "../PopularProducts/PopularProducts";
import ShippingBanner from "../ShippingBanner/ShippingBanner";
import { MyContext } from "../../App";
import MiddleBanner from "../MiddleBanner/MiddleBanner";
import CategoryGridSectionAfterFour from "../CategoryGridSectionAfterFour/CategoryGridSectionAfterFour";
import CategoryGridSectionAfterEight from "../CategoryGridSectionAfterFour/CategoryGridSectionAfterEight";


const Home = () => {
    const { catData } = useContext(MyContext)


    return (
        <div className="space-y-6">
            {/* <HomeSlider/> */}
            <div className="container flex  items-center">
                <div className="part1 w-full md:w-[75%]">
                    {
                        catData?.length !== 0 && <HomeSliderV2 homeSliderData={catData} />
                    }

                </div>
                <div className="part1 w-full md:w-[25%] pl-2 hidden md:block">
                    <BannerBox2  product={catData}/>
                </div>

            </div>
            <CategorySlider />
            <ShippingBanner />
            <CategoryGridSectionAfterEight />
            <PopularProducts />
            <CategoryGridSectionAfterFour />
            <LatestProducts />
            <OneBanner />
            <MiddleBanner />
        </div>
    );
};

export default Home;