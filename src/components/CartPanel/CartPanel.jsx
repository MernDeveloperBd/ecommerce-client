import { Button } from "@mui/material";
import { useContext } from "react";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import { MyContext } from "../../App";
import { deleteData } from "../../utils/api";
import PropTypes from "prop-types";


const CartPanel = ({ carts }) => {
    const { toggleCartModal, openAlertBox, getCartItems } = useContext(MyContext)
    const removeItem = id => {
        deleteData(`/api/cart/delete_cart_item/${id}`).then((res) => {
            openAlertBox("success", "Item removed")
            getCartItems()
        })

    }

    return (
        <>
            {/* Mini Cart — premium, mobile-first, responsive */}
            <div className="relative flex h-full flex-col">
                {/* Header */}
                <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200/70">
                    <h4 className="text-sm md:text-base font-extrabold tracking-tight text-slate-900">
                        Your Cart
                    </h4>
                    <span className="inline-flex items-center rounded-full bg-gray-100 px-2 py-0.5 text-xs font-semibold text-slate-700">
                        {Array.isArray(carts) ? carts.length : 0} item{(carts?.length || 0) === 1 ? "" : "s"}
                    </span>
                </div>

                {/* Items list */}
                <div className="scroll w-full overflow-y-auto overflow-x-hidden py-2 px-3 md:px-4 flex-1 max-h-[350px] pb-36">
                    {Array.isArray(carts) && carts.length > 0 ? (
                        carts.map((data, index) => (
                            <div
                                key={index}
                                className="group relative flex gap-3 rounded-xl border border-gray-200 bg-white/90 px-3 py-2 mb-3 shadow-sm hover:shadow-md transition"
                            >
                                {/* Remove (top-right) */}
                                <button
                                    type="button"
                                    title="Remove"
                                    className="absolute right-2 top-2 inline-flex h-7 w-7 items-center justify-center rounded-full text-slate-600 hover:text-rose-600 hover:bg-rose-50 transition"
                                    onClick={() => removeItem(data?._id)}
                                >
                                    <MdDelete className="text-[18px]" />
                                </button>

                                {/* Image */}
                                <div className="shrink-0 w-[74px] h-[74px] md:w-[76px] md:h-[76px] overflow-hidden rounded-lg ring-1 ring-gray-200">
                                    <Link to={`/productDetails/${data?.productId || ""}`} className="block h-full w-full group">
                                        <img
                                            src={data?.image}
                                            alt={data?.productTitle || "cart image"}
                                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.05]"
                                        />
                                    </Link>
                                </div>

                                {/* Info */}
                                <div className="flex-1 min-w-0">
                                    <Link className="link" to={`/productDetails/${data?.productId || ""}`}>
                                        <h4 className="text-[13px] md:text-sm font-semibold text-slate-900 line-clamp-2 pr-8">
                                            {data?.productTitle}
                                        </h4>
                                    </Link>

                                    <div className="mt-2 grid grid-cols-2 md:flex md:flex-wrap md:items-center gap-1.5 md:gap-3 text-[12px] md:text-[13px]">
                                        <span className="inline-flex items-center gap-1 rounded-full bg-gray-50 px-2 py-0.5 ring-1 ring-gray-200">
                                            Qty: <span className="font-semibold text-slate-800">{data?.quantity}</span>
                                        </span>

                                        <span className="inline-flex items-center gap-1 rounded-full bg-gray-50 px-2 py-0.5 ring-1 ring-gray-200">
                                            Stock:
                                            <span
                                                className={`font-semibold ${(data?.countInStock || 0) > 0 ? "text-emerald-700" : "text-rose-600"
                                                    }`}
                                            >
                                                {data?.countInStock}
                                            </span>
                                        </span>


                                        <span className="col-span-2 md:col-span-1 md:ml-auto text-primary font-bold ">
                                            Total: <span className="font-semibold">Tk {data?.subTotal}</span>
                                        </span>

                                        <span className="col-span-2 md:col-span-1 text-slate-700  ">
                                            Per unit: <span>Tk {data?.price}</span>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="grid place-items-center py-10">
                            <div className="text-center">
                                <div className="mx-auto mb-2 h-12 w-12 rounded-full bg-gray-100 grid place-items-center">
                                    🛍️
                                </div>
                                <p className="text-sm text-slate-500">Your cart is empty.</p>
                            </div>
                        </div>
                    )}
                </div>

                {/* Bottom summary (sticky) */}
                {Array.isArray(carts) && carts.length > 0 && (
                    <div className="bottomSec absolute bottom-0 left-0 w-full overflow-hidden">
                        {(() => {
                            const items = carts || [];
                            const itemsCount = items.length;
                            const subtotal = items.reduce((acc, it) => acc + Number(it?.subTotal || 0), 0);
                            // Shipping policy (edit as needed)
                            const freeShippingThreshold = 3000;
                            const shipping = subtotal >= freeShippingThreshold ? 0 : (subtotal > 0 ? 130 : 0);
                            const total = subtotal + shipping;

                            return (
                                <>
                                    {/* Subtotal + Shipping */}
                                    <div className="bottomInfo py-3 px-4 w-full border-t border-gray-200/70 bg-white/90 backdrop-blur">
                                        <div className="flex items-center justify-between w-full">
                                            <span className="text-[13px] md:text-[14px] font-semibold text-slate-800">
                                                {itemsCount} item{itemsCount === 1 ? "" : "s"}
                                            </span>
                                            <p className="text-primary font-bold text-[13px] md:text-sm">
                                                Tk <span>{subtotal}</span>
                                            </p>
                                        </div>
                                        <div className="mt-1 flex items-center justify-between w-full">
                                            <span className="text-[13px] md:text-[14px] font-semibold text-slate-800">
                                                Shipping {shipping === 0 && "(Free)"}
                                            </span>
                                            <p className="text-primary font-bold text-[13px] md:text-sm">
                                                Tk <span>{shipping}</span>
                                            </p>
                                        </div>
                                        {shipping === 0 ? (
                                            <p className="mt-1 text-[11px] text-emerald-700">Congrats! Free shipping applied.</p>
                                        ) : (
                                            <p className="mt-1 text-[11px] text-slate-500">
                                                Free shipping over Tk {freeShippingThreshold}
                                            </p>
                                        )}
                                    </div>

                                    {/* Total */}
                                    <div className="bottomInfo py-3 px-4 w-full border-t border-gray-200/70 bg-white">
                                        <div className="flex items-center justify-between w-full">
                                            <span className="text-[13px] md:text-[14px] font-semibold text-slate-900">
                                                Total (tax excl)
                                            </span>
                                            <p className="text-primary font-extrabold text-[14px] md:text-[15px]">
                                                Tk <span>{total}</span>
                                            </p>
                                        </div>
                                    </div>

                                    {/* Actions */}
                                    <div className="flex gap-2 items-center justify-between w-full px-4 pb-3">
                                        <Link to="/cart" onClick={toggleCartModal(false)} className="w-1/2">
                                            <Button className="!w-full !h-10 !rounded-lg !bg-slate-900 hover:!bg-slate-800 !text-white !font-semibold">
                                                View Cart
                                            </Button>
                                        </Link>
                                        <Link to="/checkout" onClick={toggleCartModal(false)} className="w-1/2">
                                            <Button className="!w-full !h-10 !rounded-lg !bg-gradient-to-r !from-violet-600 !to-rose-500 hover:!opacity-95 !text-white !font-semibold">
                                                Checkout
                                            </Button>
                                        </Link>
                                    </div>
                                </>
                            );
                        })()}
                    </div>
                )}
            </div>
        </>
    );
};

export default CartPanel;

CartPanel.propTypes={
    carts:PropTypes.array
}