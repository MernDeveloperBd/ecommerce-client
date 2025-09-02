import { Button, Rating, TextField } from '@mui/material';
import { useContext, useEffect, useMemo, useState } from 'react';
import { MyContext } from '../../../App';
import { fetchDataFromApi, postData } from '../../../utils/api';

const Reviews = (props) => {
  const { userData, openAlertBox } = useContext(MyContext);

  const [reviews, setReviews] = useState({
    image: '',
    userName: '',
    review: '',
    rating: 4,
    userId: '',
    productId: ''
  });
  const [reviewData, setReviewData] = useState([]);
  const [visibleCount, setVisibleCount] = useState(5); // কতগুলো দেখাবো

  useEffect(() => {
    setReviews((prev) => ({
      ...prev,
      image: userData?.avatar,
      userName: userData?.name,
      userId: userData?._id,
      productId: props?.productId,
    }));
    getReviews();
  }, []);

  const onChangeInput = (e) => {
    const { value } = e.target;
    setReviews((prev) => ({ ...prev, review: value }));
  };

  const addReview = (e) => {
    e.preventDefault();
    if (reviews?.review !== "") {
      postData(`/api/user/addReview`, reviews).then((res) => {
        if (res?.error === false) {
          openAlertBox("success", res?.message);
          setReviews((prev) => ({
            ...prev,
            review: '',
            rating: 4
          }));
          getReviews();
        } else {
          openAlertBox("error", "Please Login First");
        }
      });
    } else {
      openAlertBox("error", "Please Add Review");
    }
  };

  const getReviews = () => {
    fetchDataFromApi(`/api/user/getReviews?productId=${props?.productId}`).then((res) => {
      if (res?.error === false) {
        setReviewData(Array.isArray(res?.reviews) ? res.reviews : []);
      }
    });
  };

  // ========== Derived: Average rating & Showing counts ==========
  const totalReviews = reviewData?.length || 0;

  const avgRating = useMemo(() => {
    if (!totalReviews) return 0;
    const sum = reviewData.reduce((acc, r) => acc + Number(r?.rating || 0), 0);
    return Number((sum / totalReviews).toFixed(1)); // e.g. 4.3
  }, [reviewData, totalReviews]);

  const shownReviews = useMemo(
    () => reviewData.slice(0, visibleCount),
    [reviewData, visibleCount]
  );

  return (
    <div>
      <div className="rounded-3xl bg-white/90 backdrop-blur p-3 md:p-5 ring-1 ring-gray-200 shadow-sm">
        <div className="productReviewsContainer w-full">
          {/* Header */}
          <div className="flex items-center justify-between">
            <h2 className="font-extrabold text-[15px] md:text-[18px] tracking-tight text-slate-900">
              Customer Reviews
            </h2>

            {/* Average (dynamic) */}
            <div className="hidden md:flex items-center gap-2 rounded-full bg-white px-3 py-1 ring-1 ring-gray-200 text-[12px] text-slate-700">
              <span className="font-semibold">Average</span>
              <Rating
                name="avg"
                value={avgRating}
                precision={0.1}
                readOnly
                size="small"
              />
              <span>({totalReviews})</span>
            </div>
          </div>

          {/* Reviews list */}
          <div className="scroll w-full max-h-[360px] overflow-y-auto overflow-x-hidden mt-4 rounded-2xl ring-1 ring-gray-200 bg-white">
            {/* Sticky list header */}
            <div className="sticky top-0 z-10 flex items-center justify-between bg-white/95 px-3 py-2 backdrop-blur border-b border-gray-100">
              <span className="text-[12px] md:text-[13px] font-semibold text-slate-700">Latest reviews</span>
              <span className="hidden md:inline text-[12px] text-slate-500">
                Showing {Math.min(visibleCount, totalReviews)} of {totalReviews}
              </span>
            </div>

            {/* Review items */}
            {shownReviews?.map((item, index) => (
              <div
                key={index}
                className="review w-full px-3 py-3 flex items-start gap-3 border-b border-gray-100 hover:bg-sky-50/40 transition"
              >
                <div className="img w-12 h-12 md:w-14 md:h-14 overflow-hidden rounded-full ring-1 ring-gray-200 shrink-0">
                  <img
                    src={item?.image}
                    alt="Reviewer avatar"
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-[14px] md:text-[15px] font-semibold text-slate-900 leading-tight">
                        {item?.userName}
                      </h4>
                      <h5 className="text-[10px] md:text-[12px] text-slate-500">
                        <span>
                          {new Date(item?.createdAt).toLocaleString("en-GB", {
                            timeZone: "Asia/Dhaka",
                            year: "numeric",
                            month: "short",
                            day: "2-digit",
                            hour: "2-digit",
                            minute: "2-digit",
                            second: "2-digit",
                            hour12: false,
                          })}
                        </span>
                      </h5>
                    </div>
                    <div className="hidden md:block">
                      <Rating
                        name={`rating-${index}`}
                        value={Number(item?.rating || 0)}
                        precision={0.1}
                        size="small"
                        readOnly
                      />
                    </div>
                  </div>

                  <div className="mt-1 md:mt-2 flex items-center gap-2 md:hidden">
                    <Rating
                      name={`rating-m-${index}`}
                      value={Number(item?.rating || 0)}
                      precision={0.1}
                      size="small"
                      readOnly
                    />
                  </div>

                  <p className="mt-2 text-[13px] md:text-[14px] leading-relaxed text-slate-700 whitespace-pre-line">
                    {item?.review}
                  </p>

                  {/* Optional: action row */}
                  <div className="mt-2 flex items-center gap-3 text-[11px] text-slate-500">
                    <button className="rounded-full px-2 py-0.5 ring-1 ring-gray-200 hover:bg-gray-50 transition">
                      Helpful
                    </button>
                    <button className="rounded-full px-2 py-0.5 ring-1 ring-gray-200 hover:bg-gray-50 transition">
                      Report
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {/* Empty state */}
            {!shownReviews.length && (
              <div className="py-8 text-center text-sm text-slate-500">
                No reviews yet.
              </div>
            )}
          </div>

          {/* Footer: Mobile average + Showing + Load more */}
          <div className="mt-2 flex items-center justify-between">
            {/* Mobile average summary */}
            <div className="md:hidden inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 ring-1 ring-gray-200 text-[12px] text-slate-700">
              <span className="font-semibold">Avg</span>
              <Rating name="avg-m" value={avgRating} precision={0.1} readOnly size="small" />
              <span>({totalReviews})</span>
            </div>

            {/* Showing count (mobile) */}
            <div className="md:hidden text-[12px] text-slate-500 ml-auto">
              Showing {Math.min(visibleCount, totalReviews)} of {totalReviews}
            </div>
          </div>

          {/* Add review */}
          <div className="reviewForm mt-4 rounded-2xl bg-white p-3 md:p-4 ring-1 ring-gray-200">
            <h3 className="text-[15px] md:text-[16px] font-semibold text-slate-900 mb-3">
              Add a review
            </h3>

            <form className="w-full space-y-3" onSubmit={addReview}>
              <TextField
                id="outlined-multiline-flexible"
                label="Add your review"
                onChange={onChangeInput}
                name="review"
                multiline
                rows={5}
                value={reviews?.review}
                className="w-full"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                    backgroundColor: '#fff',
                    '& fieldset': { borderColor: 'rgba(0,0,0,0.12)' },
                    '&:hover fieldset': { borderColor: 'rgba(0,0,0,0.24)' },
                    '&.Mui-focused fieldset': {
                      borderColor: '#0ea5e9',
                      boxShadow: '0 0 0 4px rgba(14,165,233,0.12)',
                    },
                  },
                }}
              />

              <Rating
                name="new-review"
                value={reviews?.rating}
                precision={0.5}
                size="small"
                className="mt-1"
                onChange={(_, newValue) =>
                  setReviews((prev) => ({ ...prev, rating: newValue }))
                }
              />

              <div className="flex items-center justify-between mt-1">
                <Button type="submit" className="!bg-sky-600 !text-white hover:!bg-sky-700 !font-[600] !rounded-full !px-4 !h-9">
                  Submit Review
                </Button>

                {/* Load more / Show less controls (optional) */}
                {totalReviews > 0 && (
                  <div className="flex items-center gap-2">
                    {visibleCount < totalReviews && (
                      <button
                        type="button"
                        onClick={() => setVisibleCount((c) => Math.min(c + 5, totalReviews))}
                        className="text-[12px] rounded-full px-3 py-1 ring-1 ring-gray-200 bg-[#0284c7] text-white hover:bg-sky-50 hover:text-sky-700 hover:ring-sky-200 transition-all duration-500"
                      >
                        Show more
                      </button>
                    )}
                    {visibleCount > 5 && (
                      <button
                        type="button"
                        onClick={() => setVisibleCount(5)}
                        className="text-[12px] rounded-full px-3 py-1 ring-1 ring-gray-200 bg-[#0284c7] text-white hover:bg-sky-50 hover:text-sky-700 hover:ring-sky-200 transition-all duration-500"
                      >
                        Show less
                      </button>
                    )}
                  </div>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reviews;