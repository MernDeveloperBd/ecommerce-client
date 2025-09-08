// ProductDetails.jsx (shimmer loading added without removing any feature)
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { Link, useParams } from 'react-router-dom';
import { useContext, useEffect, useMemo, useState } from 'react';
import { fetchDataFromApi } from '../../../utils/api';
import ProductZoomV22 from '../../ProductZoom/ProductZoomV22';
import ProductDetailsContent2 from '../../ProductDetailsContent/ProductDetailsContent2';
import RelatedProducts from '../../RelatedProducts/RelatedProducts';
import { MyContext } from '../../../App';
import Reviews from './Reviews';
import Rating from '@mui/material/Rating';
import SEO from '../../Seo/SEO';

// ============ Custom Shimmer ============ //
const Skel = ({ className = "" }) => <div className={`skel ${className}`} aria-hidden />;

const ProductDetailsShimmer = () => (
  <section className="bg-white py-5" aria-busy="true" aria-live="polite">
    <div className="container flex flex-col md:flex-row gap-4">
      {/* Left (gallery skeleton) */}
      <div className="productZoomContainer md:w-[40%] md:h-[460px] overflow-hidden">
        <div className="rounded-2xl p-[1.2px] bg-gradient-to-br from-sky-100 via-indigo-100 to-violet-100 h-full">
          <div className="rounded-2xl bg-white/90 p-2 md:p-3 ring-1 ring-gray-200/70 h-full flex flex-col">
            <Skel className="rounded-xl h-[300px] w-full" />
            <div className="mt-3 grid grid-cols-4 gap-2">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skel key={i} className="rounded-lg h-[64px] w-full" />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Right (content skeleton) */}
      <div className="rightDiv md:w-[60%] space-y-3">
        <Skel className="h-7 w-4/5 rounded-md" />
        <div className="flex items-center gap-3">
          <Skel className="h-7 w-[120px] rounded-full" />
          <Skel className="h-4 w-[80px] rounded-md" />
        </div>
        <div className="flex items-center gap-3">
          <Skel className="h-4 w-[140px] rounded-md" />
          <Skel className="h-4 w-[90px] rounded-md" />
        </div>
        <div className="flex flex-wrap gap-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skel key={i} className="h-6 w-[80px] rounded-full" />
          ))}
        </div>
        <div className="flex flex-wrap gap-2">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skel key={i} className="h-6 w-[70px] rounded-full" />
          ))}
        </div>
        <div className="flex items-center gap-2 mt-2">
          <Skel className="h-9 w-[130px] rounded-full" />
          <Skel className="h-9 w-[120px] rounded-full" />
        </div>
      </div>
    </div>

    {/* Tabs shimmer */}
    <div className="container pt-8">
      <div className="my-4 flex items-center justify-center">
        <div className="inline-flex items-center gap-2 rounded-full bg-white/90 p-2 ring-1 ring-gray-200 shadow-sm">
          <Skel className="h-8 w-[110px] rounded-full" />
          <Skel className="h-8 w-[110px] rounded-full" />
        </div>
      </div>

      {/* Description block shimmer */}
      <div className="relative rounded-2xl p-[1.2px] bg-gradient-to-br from-sky-100 via-indigo-100 to-violet-100">
        <div className="relative overflow-hidden rounded-2xl bg-white/90 backdrop-blur p-3 md:p-5 ring-1 ring-gray-200 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Skel className="h-7 w-7 rounded-lg" />
              <Skel className="h-5 w-[120px] rounded-md" />
            </div>
            <Skel className="h-6 w-[90px] rounded-full" />
          </div>
          <div className="space-y-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="group relative pl-10 pr-3 py-3 rounded-xl border border-gray-100 bg-white/70 shadow-sm">
                <Skel className="absolute left-3 top-4 h-4 w-4 rounded-full" />
                {i !== 3 && <Skel className="absolute left-[23px] top-8 bottom-[-10px] w-[2px] rounded" />}
                <Skel className="h-4 w-[90%] rounded-md" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Reviews shimmer */}
      <div className="relative mx-auto md:w-[80%] mt-6 rounded-3xl p-[1.2px] bg-gradient-to-tr from-sky-100 via-indigo-100 to-violet-100">
        <div className="rounded-3xl bg-white/90 p-3 md:p-5 ring-1 ring-gray-200 shadow-sm">
          <div className="flex items-center justify-between">
            <Skel className="h-5 w-[180px] rounded-md" />
            <div className="hidden md:flex items-center gap-2">
              <Skel className="h-6 w-[70px] rounded-full" />
              <Skel className="h-6 w-[90px] rounded-full" />
            </div>
          </div>
          <div className="mt-3 space-y-2">
            {Array.from({ length: 2 }).map((_, i) => (
              <div key={i} className="flex items-start gap-3">
                <Skel className="h-12 w-12 rounded-full" />
                <div className="flex-1 space-y-2">
                  <Skel className="h-4 w-2/5 rounded-md" />
                  <Skel className="h-3 w-3/5 rounded-md" />
                  <Skel className="h-10 w-full rounded-md" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Related products shimmer */}
      <div className="p-2 md:p-5 py-4">
        <div className="grid gap-3 grid-cols-2 sm:grid-cols-3 md:grid-cols-5">
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className={`${i >= 5 ? "hidden md:block" : ""}`}>
              <div className="rounded-2xl p-[1px] bg-gradient-to-br from-gray-100 to-gray-50">
                <div className="rounded-2xl bg-white/90 p-2 ring-1 ring-gray-200">
                  <Skel className="rounded-xl h-[120px] w-full" />
                  <Skel className="mt-2 h-4 w-4/5 rounded-md" />
                  <Skel className="mt-1 h-3 w-3/5 rounded-md" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);
// ============ End Custom Shimmer ============ //

const ProductDetails = () => {
  const { isLoading, setIsLoading } = useContext(MyContext);
  const [activeTab, setActiveTab] = useState(0);
  const [productData, setProductData] = useState();
  const [reviewData, setReviewData] = useState([]);
  const { id } = useParams();
  
  useEffect(() => {
    // show shimmer immediately
    setIsLoading(true);
    fetchDataFromApi(`/api/product/${id}`).then((res) => {
      if (res?.error === false) {
        setProductData(res?.product);
      } else {
        setProductData(undefined);
      }
      // small delay for nicer transition
      setTimeout(() => setIsLoading(false), 350);
    });
  }, [id, setIsLoading]);

  useEffect(() => {
    if (!id) return;
    fetchDataFromApi(`/api/user/getReviews?productId=${id}`).then((res) => {
      if (res?.error === false && Array.isArray(res?.reviews)) {
        setReviewData(res.reviews);
      } else {
        setReviewData([]);
      }
    });
  }, [id]);

  const totalReviews = reviewData.length;
  const avgRating = useMemo(() => {
    if (!totalReviews) return 0;
    const sum = reviewData.reduce((acc, r) => acc + Number(r?.rating || 0), 0);
    return Number((sum / totalReviews).toFixed(1));
  }, [reviewData, totalReviews]);

  const description = productData?.description;
  const lines = useMemo(() => {
    if (!description) return [];
    const tokens = description.replace(/\r\n/g, "\n").split(/(।|\.|\n)/g);
    const out = [];
    let buf = "";
    for (let i = 0; i < tokens.length; i++) {
      const t = tokens[i];
      if (t === "." || t === "।") {
        buf += t;
        const line = buf.trim();
        if (line) out.push(line);
        buf = "";
      } else if (t === "\n") {
        const line = buf.trim();
        if (line) out.push(line);
        buf = "";
      } else {
        buf += t;
      }
    }
    if (buf.trim()) out.push(buf.trim());
    return out;
  }, [description]);

  function handleClick(event) {
    event.preventDefault();
  }

  return (
    <div className='py-5 pb-0'>
      <SEO title={`${productData?.name} || MM Fashion World`}
        description="Browse latest collections. Filter by category, price, color and size."
        canonical="/productListing"
        type="website"/>
      {/* Breadcrumbs */}
      <div role="presentation" onClick={handleClick} className="container pb-2">
        {isLoading ? (
          <div className="flex items-center gap-2">
            <Skel className="h-4 w-[48px] rounded-md" />
            <Skel className="h-4 w-[60px] rounded-md" />
            <Skel className="h-4 w-[120px] rounded-md" />
          </div>
        ) : (
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit" to="/" className="link">Home</Link>
            <Link underline="hover" color="inherit" to="/productListing" className="link">Shop</Link>
            <Link underline="hover" color="inherit" to="/shop" className="link">product details title</Link>
          </Breadcrumbs>
        )}
      </div>

      {/* Main */}
      {isLoading ? (
        <ProductDetailsShimmer />
      ) : (
        <>
          <section className='bg-white py-5'>
            <div className='container flex flex-col md:flex-row gap-4'>
              <div className="productZoomContainer md:w-[40%] md:h-[460px] overflow-hidden">
                <ProductZoomV22 images={productData?.images} />
              </div>
              <div className="rightDiv md:w-[60%] ">
                <ProductDetailsContent2 item={productData} totalReviews={totalReviews} avgRating={avgRating} />
              </div>
            </div>

            {/* Tabs + Average Summary */}
            <div className='container pt-8'>
              <div className="my-4 flex flex-col items-center gap-2">
                <div
                  role="tablist"
                  aria-label="Product tabs"
                  className="inline-flex items-center gap-1 rounded-full bg-white/90 p-1 ring-1 ring-gray-200 shadow-sm backdrop-blur"
                >
                  <button
                    type="button"
                    role="tab"
                    aria-selected={activeTab === 0}
                    onClick={() => setActiveTab(0)}
                    className={[
                      "group rounded-full px-3 md:px-4 py-1.5 md:py-2 text-[12px] md:text-[14px] font-semibold transition-all",
                      activeTab === 0
                        ? "bg-gradient-to-r from-sky-500 to-indigo-500 text-white shadow"
                        : "text-slate-700 hover:bg-sky-50",
                    ].join(" ")}
                  >
                    <span className="inline-flex items-center gap-2">
                      <svg width="16" height="16" viewBox="0 0 24 24" className={activeTab === 0 ? "opacity-90" : "text-slate-500"}>
                        <path d="M4 5h16v2H4zM4 9h16v2H4zM4 13h10v2H4z" fill="currentColor" />
                      </svg>
                      Description
                    </span>
                  </button>

                  <button
                    type="button"
                    role="tab"
                    aria-selected={activeTab === 2}
                    onClick={() => setActiveTab(2)}
                    className={[
                      "group rounded-full px-3 md:px-4 py-1.5 md:py-2 text-[12px] md:text-[14px] font-semibold transition-all",
                      activeTab === 2
                        ? "bg-gradient-to-r from-sky-500 to-indigo-500 text-white shadow"
                        : "text-slate-700 hover:bg-sky-50",
                    ].join(" ")}
                  >
                    <span className="inline-flex items-center gap-2">
                      <svg width="16" height="16" viewBox="0 0 24 24" className={activeTab === 2 ? "opacity-90" : "text-slate-500"}>
                        <path d="M21 6H3v12h5v4l6-4h7z" fill="currentColor" />
                      </svg>
                      Reviews
                      <span
                        className={[
                          "ml-1 inline-flex h-5 min-w-[22px] items-center justify-center rounded-full px-1.5 text-[11px] font-bold transition",
                          activeTab === 2
                            ? "bg-white/25 text-white ring-1 ring-white/40"
                            : "bg-gray-100 text-slate-700 ring-1 ring-gray-200",
                        ].join(" ")}
                      >
                        {totalReviews}
                      </span>
                    </span>
                  </button>
                </div>

                <div className="flex items-center gap-2 text-[12px] text-slate-700">
                  <span className="font-semibold">Average</span>
                  <Rating value={avgRating} precision={0.1} readOnly size="small" />
                  <span>({totalReviews})</span>
                </div>
              </div>

              {/* Description */}
              {activeTab === 0 && (
                <div className="relative rounded-2xl md:w-[80%] mx-auto p-[1.2px] bg-gradient-to-br from-sky-100 via-indigo-100 to-violet-100">
                  <div className="relative overflow-hidden rounded-2xl bg-white/90 backdrop-blur p-3 md:p-5 ring-1 ring-gray-200 shadow-sm">
                    <div
                      className="pointer-events-none absolute inset-0 opacity-60"
                      style={{ backgroundImage: 'radial-gradient(rgba(2,6,23,0.035) 1px, transparent 1px)', backgroundSize: '14px 14px' }}
                    />
                    <div className="relative mb-4 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-sky-50 text-sky-700 ring-1 ring-sky-200">
                          <svg width="16" height="16" viewBox="0 0 24 24">
                            <path d="M4 5h16v2H4zM4 9h16v2H4zM4 13h10v2H4z" fill="currentColor" />
                          </svg>
                        </span>
                        <h4 className="text-[15px] md:text-[16px] font-semibold text-slate-800">Description</h4>
                      </div>

                      {Array.isArray(lines) && lines.length > 0 && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-white px-2.5 py-1 text-[11px] font-semibold text-slate-700 ring-1 ring-gray-200 shadow-sm">
                          {lines.length} points
                        </span>
                      )}
                    </div>

                    {lines.length > 0 ? (
                      <ul className="relative space-y-3 md:space-y-3">
                        {lines.map((line, i) => (
                          <li key={i} className="group relative pl-10 pr-3 py-3 rounded-xl border border-gray-100 bg-white/70 hover:bg-white transition-colors shadow-sm hover:shadow-md">
                            <span className="absolute left-3 top-4 h-4 w-4 rounded-full bg-white ring-2 ring-sky-300 shadow-sm">
                              <span className="absolute inset-0 m-auto h-2 w-2 rounded-full bg-gradient-to-r from-sky-400 to-indigo-400" />
                              <span className="absolute inset-0 m-auto h-4 w-4 rounded-full bg-sky-200/30 blur-[2px] opacity-0 transition-opacity group-hover:opacity-100" />
                            </span>
                            {i !== lines.length - 1 && (
                              <span className="absolute left-[23px] top-8 bottom-[-10px] w-px bg-gradient-to-b from-sky-200 to-indigo-200" />
                            )}
                            <p className="text-slate-700 text-sm md:text-[15px] leading-relaxed">{line}</p>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-slate-500 text-sm">No description available.</p>
                    )}

                    <div className="mt-4 h-[2px] w-24 rounded-full bg-gradient-to-r from-sky-300 via-indigo-300 to-violet-300" />
                  </div>
                </div>
              )}

              {/* Reviews */}
              {activeTab === 2 && (
                <div className="relative mx-auto shadow-none md:w-[80%] rounded-3xl p-[1.2px] bg-gradient-to-tr from-sky-100 via-indigo-100 to-violet-100">
                  <Reviews productId={productData?._id} />
                </div>
              )}
            </div>

            {/* Related Products */}
            <div className="p-2 md:p-5 py-4">
              <RelatedProducts />
            </div>
          </section>
        </>
      )}
    </div>
  );
};

export default ProductDetails;