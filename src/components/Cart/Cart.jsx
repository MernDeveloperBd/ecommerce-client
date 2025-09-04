import { Button } from "@mui/material";
import { BsFillBagCheckFill } from "react-icons/bs";
import CartItems from "./CartItems";
import { Link } from "react-router-dom";
import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { MyContext } from "../../App";
import { deleteData } from "../../utils/api";

const FREE_THRESHOLD = 3000;

const Cart = () => {
  const { cartData, openAlertBox } = useContext(MyContext) || {};
  const [items, setItems] = useState(Array.isArray(cartData) ? cartData : []);
  const prevItemsRef = useRef(items);
  const [removingMap, setRemovingMap] = useState({}); // { lineId: true }

  useEffect(() => {
    if (Array.isArray(cartData)) {
      setItems(cartData);
      prevItemsRef.current = cartData;
    }
  }, [cartData]);

  const lineId = (it) => it?._id || it?.cartId || it?.id || it?.productId;

  const subtotal = useMemo(() => {
    return (items || []).reduce((acc, it) => {
      const price = Number(it?.price) || 0;
      const qty = Number(it?.quantity) || 1;
      return acc + price * qty;
    }, 0);
  }, [items]);

  const shipping = subtotal >= FREE_THRESHOLD ? 0 : (subtotal > 0 ? 130 : 0);
  const total = subtotal + shipping;

  // Remove → optimistic + API + rollback
  const handleRemove = async (item) => {
    const id = lineId(item);
    if (!id) {
      openAlertBox?.("error", "Cart line id missing");
      return;
    }

    const prev = items;
    prevItemsRef.current = prev;

    setItems((curr) => curr.filter((x) => String(lineId(x)) !== String(id)));
    setRemovingMap((m) => ({ ...m, [id]: true }));

    try {
      const res = await deleteData(`/api/cart/delete_cart_item/${id}`);
      const msg = res?.message || res?.data?.message || "Item removed";
      openAlertBox?.("success", msg);
    } catch (e) {
      // setItems(prev);
      openAlertBox?.("error", e?.message || "Failed to remove item");
    } finally {
      setRemovingMap((m) => {
        const n = { ...m };
        delete n[id];
        return n;
      });
    }
  };

  return (
    <section className="section py-5 pb-10">
      <div className="container md:w-[80%] flex flex-col md:flex-row gap-3 md:gap-4">
        {/* Left side */}
        <div className="leftPart md:w-[70%]">
          <div className="rounded-2xl p-[1.2px] bg-gradient-to-br from-sky-100 via-indigo-100 to-violet-100">
            <div className="rounded-2xl bg-white/90 p-3 md:p-4 ring-1 ring-gray-200 shadow-sm">
              <div className="pb-3 border-b border-gray-200/70">
                <h2 className="text-lg md:text-xl font-extrabold text-slate-900">Your Cart</h2>
                <p className="text-sm text-slate-600">
                  There {items.length === 1 ? "is" : "are"}{" "}
                  <span className="font-bold text-primary">{items.length}</span>{" "}
                  product{items.length === 1 ? "" : "s"} in your cart
                </p>
              </div>

              <div className="mt-3">
                {items?.length > 0 ? (
                  items.map((item, idx) => (
                    <CartItems
                      key={lineId(item) || idx}
                      data={item}
                      onRemove={handleRemove}
                      isRemoving={!!removingMap[lineId(item)]}
                    />
                  ))
                ) : (
                  <div className="grid place-items-center py-10">
                    <div className="text-center">
                      <div className="mx-auto mb-3 h-14 w-14 rounded-full bg-gray-100 grid place-items-center">🛒</div>
                      <p className="text-sm text-slate-500">Your cart is empty</p>
                      <Link to="/productListing" className="inline-block mt-3">
                        <Button className="!rounded-full !px-4 !h-9 !bg-slate-900 hover:!bg-slate-800 !text-white !text-[12px] !font-semibold">
                          Continue shopping
                        </Button>
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Right side */}
        <div className="rightPart md:w-[30%]">
          <div className="rounded-2xl p-[1.2px] bg-gradient-to-br from-sky-100 via-indigo-100 to-violet-100">
            <div className="shadow-sm rounded-2xl bg-white/90 p-4 md:p-5 ring-1 ring-gray-200 space-y-3">
              <h3 className="pb-1 text-base md:text-lg font-extrabold text-slate-900">Cart Totals</h3>
              <hr />
              <p className="flex items-center justify-between mt-1">
                <span className="text-[14px] font-[600] text-slate-800">Subtotal</span>
                <span className="text-primary font-extrabold">Tk {subtotal}</span>
              </p>

              <p className="flex items-center justify-between">
                <span className="text-[14px] font-[600] text-slate-800">
                  Shipping {shipping === 0 && <span className="text-emerald-700">(Free)</span>}
                </span>
                <span className="font-extrabold text-slate-900">Tk {shipping}</span>
              </p>

              <p className="flex items-center justify-between">
                <span className="text-[14px] font-[600] text-slate-800">Estimated for</span>
                <span className="font-semibold text-slate-700">Your location</span>
              </p>

              <div className="pt-1 border-t border-gray-200/70" />

              <p className="flex items-center justify-between">
                <span className="text-[14px] font-[700] text-slate-900">Total (tax excl)</span>
                <span className="text-primary font-extrabold text-[15px] md:text-[16px]">Tk {total}</span>
              </p>

              <Link to="/checkout" className="block">
                <Button
                  disabled={items.length === 0}
                  className="!bg-gradient-to-r !from-violet-600 !to-rose-500 hover:!opacity-95 !text-white !w-full !h-11 !rounded-lg !font-semibold flex gap-1"
                >
                  <BsFillBagCheckFill className="text-[16px]" />
                  Checkout
                </Button>
              </Link>

              {shipping > 0 && (
                <p className="text-[12px] text-slate-500">
                  Free shipping over Tk {FREE_THRESHOLD}. You’re{" "}
                  <span className="font-semibold text-slate-900">
                    Tk {Math.max(0, FREE_THRESHOLD - subtotal)}
                  </span>{" "}
                  away.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cart;