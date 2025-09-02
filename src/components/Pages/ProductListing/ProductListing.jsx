import Sidebar from "../../Sidebar/Sidebar";
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import ProductItem from "../../ProductItem/ProductItem";
import ProductItemListView from "../../ProductItemListView/ProductItemListView";
import Button from "@mui/material/Button";
import { IoGridSharp } from "react-icons/io5";
import { FiMenu, FiSearch } from "react-icons/fi";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { postData } from "../../../utils/api";
import { MyContext } from "../../../App";
import CircularProgress from '@mui/material/CircularProgress';
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import { useLocation } from "react-router-dom";
// 
import PaginationItem from '@mui/material/PaginationItem';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import LastPageIcon from '@mui/icons-material/LastPage';

function handleClick(event) {
  event.preventDefault();
}

const SORT_OPTIONS = [
  { key: "salesHighToLow", label: "Sales High to Low" },
  { key: "nameAToZ", label: "Name, A to Z" },
  { key: "nameZToA", label: "Name, Z to A" },
  { key: "priceLowToHigh", label: "Price, Low to High" },
  { key: "priceHighToLow", label: "Price, High to Low" },
];

const ProductListing = () => {
  const { isOpenFullScreenPanel } = useContext(MyContext); // চাইলে ডিপেন্ডেন্সি থেকে বাদ দিন
  const location = useLocation();
  const listingTopRef = useRef(null);

  const [anchorEl, setAnchorEl] = useState(null);
  const [itemView, setItemView] = useState('grid');
  const [productData, setProductData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [limit] = useState(20);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [counts, setCounts] = useState({ cat: {}, sub: {}, third: {} });

  // filters & sorting
  const [filters, setFilters] = useState({
    catId: [],
    subCatId: [],
    thirdSubCatId: [],
    color: [],
    productSize: [],
    minPrice: undefined,
    maxPrice: undefined,
    rating: [],
    availability: undefined,
  });
  const [priceRange, setPriceRange] = useState([100, 15000]);
  const [sort, setSort] = useState("salesHighToLow");
  const [sortLabel, setSortLabel] = useState("Sales High to Low");

  // search
  const [searchText, setSearchText] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  // fetch gate to avoid double-fetch (URL first)
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(searchText.trim()), 400);
    return () => clearTimeout(t);
  }, [searchText]);

  const open = Boolean(anchorEl);
  const handleClickSort = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const handleSelectSort = (key, label) => {
    setSort(key);
    setSortLabel(label);
    setPage(1);
    handleClose();
  };

  // filters আপডেট করলে পেজ 1
  const updateFilters = (change) => {
    setFilters((prev) => {
      const next = typeof change === "function" ? change(prev) : { ...prev, ...change };
      return next;
    });
    setPage(1);
  };

  const handleReset = () => {
    setFilters({
      catId: [],
      subCatId: [],
      thirdSubCatId: [],
      color: [],
      productSize: [],
      minPrice: undefined,
      maxPrice: undefined,
      rating: [],
      availability: undefined,
    });
    setPriceRange([100, 15000]);
    setSearchText("");
    setSort("salesHighToLow");
    setSortLabel("Sales High to Low");
    setPage(1);
  };

  // URL query -> filters first, then mark ready
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const cat = params.get("cat");
    const sub = params.get("sub");
    const third = params.get("third");
    const q = params.get("search") || params.get("q") || "";

    setFilters((prev) => ({
      ...prev,
      catId: cat ? [cat] : [],
      subCatId: sub ? [sub] : [],
      thirdSubCatId: third ? [third] : [],
    }));
    setSearchText(q);
    setPage(1);
    setIsReady(true);
  }, [location.search]);

  const payload = useMemo(() => {
    return {
      ...filters,
      page,
      limit,
      sort,
      search: debouncedSearch || undefined,
    };
  }, [filters, page, limit, sort, debouncedSearch]);

  // Stable signature for dedup
  const sig = useMemo(() => JSON.stringify(payload), [payload]);
  const reqIdRef = useRef(0);

  // Fetch products (AbortController + dedup)
  useEffect(() => {
    if (!isReady) return;

    const controller = new AbortController();
    const myReqId = ++reqIdRef.current;
    const body = JSON.parse(sig);

 

    postData(`/api/product/filters`, body, { signal: controller.signal })
      .then((res) => {
           setIsLoading(true);
        if (!res || res.aborted) return;
        if (myReqId !== reqIdRef.current) return; // only latest response applies

        if (res?.error === false) {
          const products = (res.products || []).map((p) => ({ ...p, checked: false }));
          setProductData(products);
          setTotalPages(res.totalPages || 1);
          setTotal(res.total || 0);
          if (res.counts) setCounts(res.counts);
          // scroll listing top on new data
          listingTopRef.current?.scrollIntoView({ behavior: "auto", block: "start" });
          window.scrollTo({ top: 0, left: 0, behavior: "auto" });
        } else if (res?.message) {
          console.error(res.message);
        }
      })
      .catch((err) => {
        if (err?.name !== "AbortError") console.error("Failed to fetch products:", err);
      })
      .finally(() => {
        if (myReqId === reqIdRef.current) setIsLoading(false);
      });

    return () => controller.abort();
    // নোট: চাইলে isOpenFullScreenPanel সরিয়ে দিন ডিপেন্ডেন্সি থেকে
  }, [sig, isReady /*, isOpenFullScreenPanel */]);

  return (
    <section>
      <div role="presentation" onClick={handleClick} className="container py-2">
        <Breadcrumbs aria-label="breadcrumb">
          <Link underline="hover" color="inherit" href="/" className="link">
            Home
          </Link>
          <Link underline="hover" color="inherit" href="/shop" className="link">
            Shop
          </Link>
        </Breadcrumbs>
      </div>

      <div className="bg-white p-2">
        <div className="container flex flex-col md:flex-row gap-2">
          {/* Sidebar */}
          <div className="sidebarWrapper w-full md:w-[20%] h-full bg-white">
            <Sidebar
              productData={productData}
              setProductData={setProductData}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
              page={page}
              setTotalPages={setTotalPages}
              // ফিল্টারিং props
              filters={filters}
              onUpdateFilters={updateFilters}
              price={priceRange}
              setPrice={setPriceRange}
              counts={counts}
            />
          </div>

          {/* Right side products */}
          <div ref={listingTopRef} className="rightContent w-full md:w-[80%] py-3">
            {/* View, Search, Sort, Reset */}
            <div className="w-full rounded-xl border border-gray-200 bg-gradient-to-r from-white to-gray-50 p-3 md:p-4 shadow-sm flex flex-col md:flex-row items-center justify-between gap-3">
              <div className="col1 flex items-center gap-2 md:gap-3">
                <Button
                  onClick={() => setItemView('grid')}
                  className={`!h-[40px] !w-[40px] !min-w-[40px] rounded-lg ring-1 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500/40 ${itemView === 'grid'
                      ? '!bg-rose-600 !text-white ring-rose-600/30 hover:!bg-rose-600'
                      : '!bg-white !text-gray-700 ring-gray-200 hover:!bg-gray-50 hover:ring-gray-300'
                    }`}
                >
                  <IoGridSharp className="text-[18px]" />
                </Button>

                <Button
                  onClick={() => setItemView('list')}
                  className={`!h-[40px] !w-[40px] !min-w-[40px] rounded-lg ring-1 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500/40 ${itemView === 'list'
                      ? '!bg-rose-600 !text-white ring-rose-600/30 hover:!bg-rose-600'
                      : '!bg-white !text-gray-700 ring-gray-200 hover:!bg-gray-50 hover:ring-gray-300'
                    }`}
                >
                  <FiMenu className="text-[18px]" />
                </Button>

                <span className="text-sm font-medium text-gray-600">
                  There are
                  <span className="mx-1 inline-flex items-center rounded-md bg-gray-100 px-2 py-0.5 font-semibold text-gray-800">
                    {productData.length}
                  </span>
                  Products of
                  <span className="ml-1 inline-flex items-center rounded-md bg-gray-100 px-2 py-0.5 font-semibold text-gray-800">
                    {total} 
                  </span>Products
                </span>
              </div>

              <div className="col2 flex flex-col md:flex-row gap-2 md:gap-3 items-center justify-end pr-0 md:pr-2">
                {/* Search box */}
               <div className="flex gap-2">
                 <TextField
                  size="small"
                  placeholder="Search products..."
                  value={searchText}
                  onChange={(e) => {
                    setSearchText(e.target.value);
                    setPage(1);
                  }}
                  sx={{
                    minWidth: { xs: 200, md: 260 },
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 10,
                      backgroundColor: 'white',
                      '& fieldset': { borderColor: 'rgba(0,0,0,0.12)' },
                      '&:hover fieldset': { borderColor: 'rgba(0,0,0,0.24)' },
                      '&.Mui-focused fieldset': {
                        borderColor: 'rgba(0,0,0,0.5)',
                        boxShadow: '0 0 0 4px rgba(0,0,0,0.06)',
                      },
                    },
                    '& .MuiInputBase-input': { py: 1.1 },
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <FiSearch className="text-gray-500" />
                      </InputAdornment>
                    ),
                  }}
                />

                {/* Reset */}
                <Button
                  variant="outlined"
                  onClick={handleReset}
                  className="!rounded-lg !normal-case !font-medium !border-gray-300 !text-gray-700 hover:!bg-gray-50 !px-3 !py-1.5 focus-visible:!ring-2 focus-visible:!ring-gray-300"
                >
                  Reset
                </Button>
               </div>

                {/* Sort */}
                <div className="flex gap-3 items-center">
                  <span className="text-sm font-medium text-gray-600">Sort by</span>
                <div>
                  <Button
                    id="basic-button"
                    aria-controls={open ? 'basic-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClickSort}
                    className="!bg-white !text-gray-900 !font-semibold !rounded-lg !normal-case !ring-1 !ring-gray-200 hover:!bg-gray-50 hover:!ring-gray-300 !px-3 !py-1.5 focus-visible:!ring-2 focus-visible:!ring-rose-500/40"
                  >
                    {sortLabel}
                  </Button>
                  <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    PaperProps={{
                      elevation: 0,
                      sx: {
                        mt: 1,
                        borderRadius: 2,
                        overflow: 'hidden',
                        border: '1px solid',
                        borderColor: 'divider',
                        boxShadow: '0 10px 24px rgba(0,0,0,0.08)',
                      },
                    }}
                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                    slotProps={{ list: { 'aria-labelledby': 'basic-button' } }}
                  >
                    {SORT_OPTIONS.map((opt) => (
                      <MenuItem
                        key={opt.key}
                        onClick={() => handleSelectSort(opt.key, opt.label)}
                        sx={{
                          fontSize: 14,
                          py: 1,
                          px: 2,
                          '&:hover': { backgroundColor: 'action.hover' },
                        }}
                      >
                        {opt.label}
                      </MenuItem>
                    ))}
                  </Menu>
                </div>
                </div>
              </div>
            </div>

            {/* Products */}
            <div className="my-4">
              {isLoading ? (
                <div className="w-full flex justify-center py-10">
                  <CircularProgress />
                </div>
              ) : itemView === 'grid' ? (
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-2">
                  {productData.map((product) => (
                    <ProductItem key={product._id} product={product} />
                  ))}
                </div>
              ) : (
                <div className="flex flex-col gap-3">
                  {productData.map((product) => (
                    <ProductItemListView key={product._id} product={product} />
                  ))}
                </div>
              )}
            </div>

            {/* Pagination */}
          {totalPages > 1 && (
  <div className="flex items-center justify-center pt-6">
    <div className="rounded-full bg-white/80 backdrop-blur-md ring-1 ring-black/5 shadow-sm px-3 py-2">
      <Stack spacing={0}>
        <Pagination
          count={totalPages}
          page={page}
          onChange={(e, value) => setPage(value)}
          showFirstButton
          showLastButton
          siblingCount={1}
          boundaryCount={1}
          renderItem={(item) => (
            <PaginationItem
              slots={{
                previous: ChevronLeftIcon,
                next: ChevronRightIcon,
                first: FirstPageIcon,
                last: LastPageIcon,
              }}
              {...item}
            />
          )}
          sx={{
            "& .MuiPaginationItem-root": {
              borderRadius: "12px",
              border: "1px solid rgba(0,0,0,0.06)",
              color: "rgba(17,24,39,0.8)",
              fontWeight: 600,
              minWidth: 40,
              height: 40,
              mx: 0.5,
              "&:hover": {
                backgroundColor: "rgba(99,102,241,0.08)",
                borderColor: "rgba(99,102,241,0.35)",
              },
            },
            "& .MuiPaginationItem-previousNext, & .MuiPaginationItem-firstLast": {
              bgcolor: "white",
            },
            "& .Mui-selected": {
              background: "linear-gradient(90deg,#7c3aed,#ec4899)",
              color: "#fff !important",
              borderColor: "transparent",
              boxShadow: "0 8px 20px rgba(124,58,237,.25)",
              "&:hover": {
                opacity: 0.95,
                background: "linear-gradient(90deg,#7c3aed,#ec4899)",
              },
            },
            "& .MuiPaginationItem-ellipsis": {
              color: "rgba(17,24,39,.45)",
            },
          }}
        />
      </Stack>
    </div>

    {/* Page info (optional) */}
    <div className="ml-3 hidden md:block text-sm text-gray-600">
      Page {page} of {totalPages}
    </div>
  </div>
)}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductListing;