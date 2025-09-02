import { useState } from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import ProductsSlider from '../ProductsSlider/ProductsSlider';

const FeaturedProducts = () => {
  const [value, setValue] = useState(0);

  const tabLabels = [
    "রেডিমেড থ্রিপিছ",
    "জায়নামাজ",
    "আতর",
    "ইসলামিক পন্য",
    "অর্গানিক পন্য",
    "মোজা",
    "বেডিং"
  ];

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleSelectChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <section className="bg-white py-8">
      <div className="container mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center md:justify-between mb-6 gap-4">
          <div className="leftsec">
            <h3 className="text-[18px] md:text-[24px] font-semibold mb-2">Featured products</h3>
            <p className="text-[12px] md:text-[14px] text-gray-600">
              Do not miss the current offers until the end of this month
            </p>
          </div>

          {/* Tabs */}
          <div className="rightsec w-full md:w-auto">
            {/* Mobile Dropdown */}
            <div className="block md:hidden w-full">
              <Select
                fullWidth
                value={value}
                onChange={handleSelectChange}
                variant="outlined"
                size="small"
              >
                {tabLabels.map((label, idx) => (
                  <MenuItem key={idx} value={idx}>{label}</MenuItem>
                ))}
              </Select>
            </div>

            {/* Desktop Tabs */}
            <div className="hidden md:block">
              <Box sx={{ bgcolor: 'background.paper' }}>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  variant="scrollable"
                  scrollButtons
                  allowScrollButtonsMobile
                  aria-label="popular products tabs"
                  sx={{
                    '& .MuiTab-root': {
                      textTransform: 'none',
                      fontWeight: 'bold',
                      minWidth: 50,
                      px: 1,
                      py: 1,
                      borderRadius: 1,
                      mx: 1,
                    },
                    '& .Mui-selected': {
                      color: '#7c3aed',
                      backgroundColor: '#f3e8ff',
                    },
                  }}
                >
                  {tabLabels.map((label, idx) => (
                    <Tab key={idx} label={label} />
                  ))}
                </Tabs>
              </Box>
            </div>
          </div>
        </div>

        {/* Products slider */}
        <ProductsSlider/>
      </div>
    </section>
  );
};

export default FeaturedProducts;
