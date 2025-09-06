// src/components/MyList/MyListItems.jsx
import { Link } from "react-router-dom";
import { IoCloseSharp } from "react-icons/io5";
import Stack from "@mui/material/Stack";
import { Button, Rating } from "@mui/material";

const MyListItem = ({ items = [], onDelete, onAddToCart }) => {
  const priceInfo = (price, oldPrice) => {
    const p = Number(price || 0);
    const o = Number(oldPrice || 0);
    const off = o > p && o > 0 ? Math.round(((o - p) / o) * 100) : 0;
    return { p, o, off };
  };

  if (!items.length) {
    return (
      <div className="p-4 text-center text-gray-500">
        Your list is empty.
      </div>
    );
  }

  return (
    <div>
      {items.map((item) => {
        const { p, o, off } = priceInfo(item?.price, item?.oldPrice);
        return (
          <div
            key={item?._id}
            className="cartItem w-full p-2 flex items-center gap-4 pb-2 border-b border-[rgba(0,0,0,0.2)] relative"
          >
            {/* delete */}
            <IoCloseSharp
              onClick={() => onDelete?.(item?._id)}
              className="absolute top-[10px] right-[15px] text-[22px] cursor-pointer hover:text-red-500"
              title="Remove from My List"
            />

            {/* image */}
            <div className="img w-[15%] rounded-md overflow-hidden">
              <Link to={`/productDetails/${item?.productId}`} className="group">
                <img
                  src={item?.image || "https://via.placeholder.com/90"}
                  alt={item?.productTitle}
                  className="w-full h-[70px] md:h-[90px] group-hover:scale-105 transition-all duration-500 object-cover"
                />
              </Link>
            </div>

            {/* info */}
            <div className="info w-[65%]">
              <p className="text-[13px] mb-0">{item?.brand || ""}</p>
              <Link to={`/productDetails/${item?.productId}`} className="link inline-block">
                <h3 className="text-[12px] md:text-[16px] font-semibold">
                  {item?.productTitle}
                </h3>
              </Link>

              <Stack spacing={1} className="mt-1">
                <Rating
                  name="size-small"
                  value={Number(item?.rating || 0)}
                  precision={0.5}
                  size="small"
                  readOnly
                />
              </Stack>

              <div className="flex gap-4 items-center mt-2">
                <span className="text-[14px] font-[500]">
                  Tk <span>{p.toFixed(0)}</span>
                </span>
                {o > p && (
                  <>
                    <span className="text-red-500 line-through text-[14px]">
                      Tk <span>{o.toFixed(0)}</span>
                    </span>
                    {off > 0 && (
                      <span className="text-green-600 text-[12px]">{off}% off</span>
                    )}
                  </>
                )}
              </div>
            </div>

            {/* add to cart */}
            <div className="w-[20%] flex justify-end self-end">
              <Button
                onClick={() => onAddToCart?.(item)}
                className="bg-btn hover:bg-btn btn-sm !text-[11px] !text-white"
              >
                Add to Cart
              </Button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MyListItem;