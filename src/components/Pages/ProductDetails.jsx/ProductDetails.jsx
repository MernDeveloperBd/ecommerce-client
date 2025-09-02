
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { Link, useParams } from 'react-router-dom';
import { useContext, useEffect, useMemo, useState } from 'react';
import { fetchDataFromApi } from '../../../utils/api';
import ProductZoomV22 from '../../ProductZoom/ProductZoomV22';
import ProductDetailsContent2 from '../../ProductDetailsContent/ProductDetailsContent2';
import RelatedProducts from '../../RelatedProducts/RelatedProducts';
import Loading from '../../Loading/Loading';
import { MyContext } from '../../../App';
import Reviews from './Reviews';
import Rating from '@mui/material/Rating'; // <-- যোগ করুন

const ProductDetails = () => {
    const { isLoading, setIsLoading } = useContext(MyContext);
    const [activeTab, setActiveTab] = useState(0);
    const [productData, setProductData] = useState();

    // New: reviews state (lifted to this page)
    const [reviewData, setReviewData] = useState([]);

    const { id } = useParams();

    useEffect(() => {
        fetchDataFromApi(`/api/product/${id}`).then((res) => {
            if (res?.error === false) {
                setProductData(res?.product);
                setTimeout(() => setIsLoading(false), 700);
            }
        });
    }, [id, setIsLoading]);

    // New: fetch reviews for this product (to show total & average here)
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

    // New: compute total & average
    const totalReviews = reviewData.length;
    const avgRating = useMemo(() => {
        if (!totalReviews) return 0;
        const sum = reviewData.reduce((acc, r) => acc + Number(r?.rating || 0), 0);
        return Number((sum / totalReviews).toFixed(1));
    }, [reviewData, totalReviews]);

    // Description split (আপনার আগের কোড)
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
            {/* Bredcums */}
            <div role="presentation" onClick={handleClick} className="container pb-2">
                <Breadcrumbs aria-label="breadcrumb">
                    <Link underline="hover" color="inherit" to="/" className="link">Home</Link>
                    <Link underline="hover" color="inherit" to="/productListing" className="link">Shop</Link>
                    <Link underline="hover" color="inherit" to="/shop" className="link">product details title</Link>
                </Breadcrumbs>
            </div>

            {isLoading ? (
                <Loading />
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
                            {/* Tabs row */}
                            <div className="my-4 flex flex-col items-center gap-2">
                                <div
                                    role="tablist"
                                    aria-label="Product tabs"
                                    className="inline-flex items-center gap-1 rounded-full bg-white/90 p-1 ring-1 ring-gray-200 shadow-sm backdrop-blur"
                                >
                                    {/* Description */}
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

                                    {/* Reviews with count */}
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

                                {/* Average summary (md+ shows beside tabs, mobile shows below) */}
                                <div className="flex items-center gap-2 text-[12px] text-slate-700">
                                    <span className="font-semibold">Average</span>
                                    <Rating value={avgRating} precision={0.1} readOnly size="small" />
                                    <span>({totalReviews})</span>
                                </div>
                            </div>

                            {/* Description */}
                            {activeTab === 0 && (
                                <div className="relative rounded-2xl p-[1.2px] bg-gradient-to-br from-sky-100 via-indigo-100 to-violet-100">
                                    <div className="relative overflow-hidden rounded-2xl bg-white/90 backdrop-blur p-3 md:p-5 ring-1 ring-gray-200 shadow-sm">
                                        {/* subtle pattern */}
                                        <div
                                            className="pointer-events-none absolute inset-0 opacity-60"
                                            style={{
                                                backgroundImage: 'radial-gradient(rgba(2,6,23,0.035) 1px, transparent 1px)',
                                                backgroundSize: '14px 14px',
                                            }}
                                        />

                                        {/* Header */}
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

                                        {/* Beautiful timeline list */}
                                        {lines.length > 0 ? (
                                            <ul className="relative space-y-3 md:space-y-3">
                                                {lines.map((line, i) => (
                                                    <li
                                                        key={i}
                                                        className="group relative pl-10 pr-3 py-3 rounded-xl border border-gray-100 bg-white/70 hover:bg-white transition-colors shadow-sm hover:shadow-md"
                                                    >
                                                        {/* Bullet */}
                                                        <span className="absolute left-3 top-4 h-4 w-4 rounded-full bg-white ring-2 ring-sky-300 shadow-sm">
                                                            <span className="absolute inset-0 m-auto h-2 w-2 rounded-full bg-gradient-to-r from-sky-400 to-indigo-400" />
                                                            {/* soft pulse on hover */}
                                                            <span className="absolute inset-0 m-auto h-4 w-4 rounded-full bg-sky-200/30 blur-[2px] opacity-0 transition-opacity group-hover:opacity-100" />
                                                        </span>

                                                        {/* Connector (except last) */}
                                                        {i !== lines.length - 1 && (
                                                            <span className="absolute left-[23px] top-8 bottom-[-10px] w-px bg-gradient-to-b from-sky-200 to-indigo-200" />
                                                        )}

                                                        {/* Content */}
                                                        <p className="text-slate-700 text-sm md:text-[15px] leading-relaxed">
                                                            {line}
                                                        </p>
                                                    </li>
                                                ))}
                                            </ul>
                                        ) : (
                                            <p className="text-slate-500 text-sm">No description available.</p>
                                        )}

                                        {/* Accent underline */}
                                        <div className="mt-4 h-[2px] w-24 rounded-full bg-gradient-to-r from-sky-300 via-indigo-300 to-violet-300" />
                                    </div>
                                </div>
                            )}

                            {/* Reviews */}
                            {activeTab === 2 && (
                                <div className="relative mx-auto shadow-none md:w-[80%] rounded-3xl p-[1.2px] bg-gradient-to-tr from-sky-100 via-indigo-100 to-violet-100">
                                    {/* আপনি চাইলে Reviews কম্পোনেন্টকে props দিয়ে একই ডেটা ব্যবহার করাতে পারেন */}
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


