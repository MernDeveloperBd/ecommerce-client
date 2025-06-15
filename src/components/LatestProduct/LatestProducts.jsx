import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { useState } from 'react';
import ProductsSlider from '../ProductsSlider/ProductsSlider';



const LatestProducts = () => {
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <section className="bg-white py-8">
            <div className="container">
                <div className="flex items-center justify-between">
                    <div className="leftsec">
                        <h3 className="text-[24px] font-semibold mb-2">Latest products</h3>
                        <p className="text-[14px]">Do not miss the current offers untill the end of this month</p>
                    </div>
                    <div className='rightsec '>
                        <Box sx={{ maxWidth: { md: 620, sm: 480 }, bgcolor: 'background.paper', }}>
                            <Tabs
                                value={value}
                                onChange={handleChange}
                                variant="scrollable"
                                scrollButtons
                                allowScrollButtonsMobile
                                aria-label="scrollable force tabs example"
                            >
                                <Tab label="পাঞ্জাবী" />
                                <Tab label="জায়নামাজ" />
                                <Tab label="আতর" />
                                <Tab label="ইসলামিক পন্য" />
                                <Tab label="অর্গানিক পন্য" />
                                <Tab label="মোজা" />
                                <Tab label="বেডিং" />
                            </Tabs>
                        </Box>
                    </div>
                </div>
            </div>
            {/* Popolar products slider */}
            <ProductsSlider items={6}/>
        </section>
    );
};

export default LatestProducts;