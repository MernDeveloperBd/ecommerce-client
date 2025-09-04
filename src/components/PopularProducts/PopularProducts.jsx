import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
// import { AlertTriangle } from "lucide-react";
import ProductsSlider from '../ProductsSlider/ProductsSlider';
import { fetchDataFromApi } from '../../utils/api';

const PopularProducts = () => {
  const [value, setValue] = useState(0); 
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  // Fetch categories & products
  useEffect(() => {
    fetchDataFromApi(`/api/category`).then((res) => {
      if (!res.error) {
        setCategories(res.data);
      }
    });

    fetchDataFromApi(`/api/product/getAllProducts`).then((res) => {
      if (!res.error) {
        setProducts(res.products);
      }
    });
  }, []);

  // Filter products on tab change
  useEffect(() => {
    if (categories.length === 0 || products.length === 0) return;

    const selectedCategory = categories[value]?._id;
    const filtered = products.filter(
      (product) => product.catId === selectedCategory
    );
    setFilteredProducts(filtered);
  }, [value, categories, products]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleSelectChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <section className="bg-white">
      <div className="container mx-auto px-1">
        {/* Header */}
       <div className="flex flex-col md:flex-row items-start md:items-center md:justify-between mb-6 gap-4 rounded-2xl border border-gray-200/70 bg-gradient-to-b from-white to-gray-50 p-4 shadow-sm">
  <div className="leftsec">
    <div className="flex items-center gap-2 mb-1.5">
      <span className="h-2.5 w-2.5 rounded-full bg-gradient-to-r from-violet-500 via-fuchsia-500 to-rose-500 animate-pulse"></span>
      <h3 className="text-[22px] md:text-[26px] font-extrabold leading-tight text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-600">
        Popular Products
      </h3>
    </div>
    <p className="text-[13px] md:text-[14px] text-gray-600">
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
        sx={{
          '& .MuiOutlinedInput-root': {
            borderRadius: 9999,
            backgroundColor: '#fff',
            boxShadow: '0 6px 12px rgba(17,24,39,0.06)',
            '& fieldset': { borderColor: 'rgba(0,0,0,0.08)' },
            '&:hover fieldset': { borderColor: 'rgba(0,0,0,0.16)' },
            '&.Mui-focused fieldset': {
              borderColor: '#8b5cf6',
              boxShadow: '0 0 0 4px rgba(139,92,246,.12)',
            },
          },
          '& .MuiSelect-select': {
            py: 1,
            pl: 2,
            pr: 4,
            fontWeight: 600,
          },
          '& .MuiSvgIcon-root': { color: '#7c3aed' },
        }}
        MenuProps={{
          PaperProps: {
            elevation: 0,
            sx: {
              mt: 1,
              borderRadius: 2,
              border: '1px solid',
              borderColor: 'divider',
              boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
            },
          },
        }}
      >
        {categories.map((cat, idx) => (
          <MenuItem key={cat._id} value={idx}>
            {cat.name}
          </MenuItem>
        ))}
      </Select>
    </div>

    {/* Desktop Tabs */}
    <div className="hidden md:block">
      <Box sx={{ bgcolor: 'transparent' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons
          allowScrollButtonsMobile
          aria-label="popular products tabs"
          sx={{
            minHeight: 0,
            '& .MuiTabs-flexContainer': {
              gap: 0.75,
            },
            '& .MuiTab-root': {
              textTransform: 'none',
              fontWeight: 700,
              fontSize: { xs: 12, md: 13 },
              color: '#374151',
              minHeight: 0,
              minWidth: 40,
              padding: '6px 12px',
              borderRadius: 9999,
              mx: 0,
              transition: 'all .2s ease',
              backgroundColor: 'rgba(17,24,39,0.04)',
            },
            '& .MuiTab-root:hover': {
              backgroundColor: 'rgba(124,58,237,0.10)',
            },
            '& .Mui-selected': {
              color: '#6d28d9',
              backgroundColor: 'rgba(124,58,237,0.18)',
              boxShadow: '0 8px 22px rgba(124,58,237,.18)',
            },
            '& .MuiTabs-indicator': {
              display: 'none',
            },
            '& .MuiTabs-scrollButtons': {
              color: '#111827',
              borderRadius: 9999,
              border: '1px solid rgba(0,0,0,0.06)',
              backgroundColor: '#fff',
              boxShadow: '0 8px 16px rgba(0,0,0,0.08)',
            },
            '& .MuiTabs-scrollButtons:hover': {
              background:
                'linear-gradient(135deg, rgb(139 92 246), rgb(244 63 94))',
              color: '#fff',
            },
            '& .MuiTabs-scrollButtons.Mui-disabled': {
              opacity: 0.35,
            },
          }}
        >
          {categories.map((cat) => (
            <Tab
              key={cat._id}
              label={cat.name}
              disableRipple
              sx={{
                maxWidth: 200,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            />
          ))}
        </Tabs>
      </Box>
    </div>
  </div>
</div>
        {/* Products section */}
        {filteredProducts.length > 0 ? (
          <ProductsSlider products={filteredProducts} />
        ) : (
          <div className="flex flex-col items-center justify-center py-16 bg-gray-50 rounded-2xl shadow-md">
            {/* <AlertTriangle className="w-12 h-12 text-yellow-500 mb-4" /> */}
            <h4 className="text-lg font-semibold text-gray-800">
              No Products found in this category
            </h4>
            <p className="text-sm text-gray-500 mt-2 text-center px-4">
              Try exploring other categories to discover our latest collections.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default PopularProducts;
