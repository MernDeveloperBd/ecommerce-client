// src/components/Pages/Orders/Orders.jsx
import { useContext, useEffect, useMemo, useState, Fragment } from "react";
import { Button } from "@mui/material";
import AccountSideBar from "../../AccountSidebar/AccountSideBar";
import { FaAngleDown } from "react-icons/fa6";
import { FaAngleUp } from "react-icons/fa";
import Badge from "../../Badge/Badge";
import { fetchDataFromApi, deleteData } from "../../../utils/api";
import { MyContext } from "../../../App";

const Orders = () => {
  const { openAlertBox } = useContext(MyContext);

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openRowId, setOpenRowId] = useState(null); // row toggle by orderId
  const [cancellingId, setCancellingId] = useState(null);

  const getOrders = async () => {
    setLoading(true);
    const res = await fetchDataFromApi("/api/order/my");
    if (res?.error === false) setOrders(res?.data || []);
    setLoading(false);
  };

  useEffect(() => {
    getOrders();
  }, []);

  const toggleRow = (orderId) => {
    setOpenRowId((prev) => (prev === orderId ? null : orderId));
  };

  const prettyStatus = (s) => {
    const map = {
      PLACED: "Placed",
      CONFIRMED: "Confirmed",
      SHIPPED: "Shipped",
      DELIVERED: "Delivered",
      CANCELLED: "Cancelled",
    };
    return map[s] || s;
  };

  const canCancel = (o) => o?.status !== "DELIVERED" && o?.status !== "CANCELLED";

  const handleCancel = async (orderId) => {
    if (!orderId) return;
    const ok = window.confirm("Are you sure you want to cancel this order?");
    if (!ok) return;

    // Optimistic update
    const prevOrders = orders;
    setCancellingId(orderId);
    setOrders((p) => p.filter((o) => o._id !== orderId));
    setOpenRowId(null);

    try {
      const res = await deleteData(`/api/order/${orderId}`);

      const success =
        res?.success === true ||
        res?.error === false ||
        res?.status === 200 ||
        res?.status === 204 ||
        res?.deletedCount === 1;

      if (success) {
        openAlertBox("success", res?.message || "Order cancelled successfully");
        // Optional: re-sync from server
        // await getOrders();
      } else {
        setOrders(prevOrders); // rollback
        openAlertBox("error", res?.message || "Failed to cancel order");
      }
    } catch (e) {
      setOrders(prevOrders);
      openAlertBox("error", "Failed to cancel order");
    } finally {
      setCancellingId(null);
    }
  };

  const countText = useMemo(() => orders?.length || 0, [orders]);
  const formatMoney = (n) => `Tk ${Number(n || 0).toFixed(0)}`;
  const shortId = (id) => (id ? id.toString().slice(-6) : "-");
  const fmtDate = (d) =>
    d ? new Date(d).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }) : "-";

  return (
    <section className="py-10 w-full">
      <div className="container flex gap-5">
        {/* left sidebar */}
        <div className="col1 w-[20%]">
          <AccountSideBar />
        </div>
        {/*  right*/}
        <div className="col2 w-[80%]">
          <div className="shadow-m rounded-md bg-white">
            <div className="py-2 px-3 border-b border-[rgba(0,0,0,0.2)]">
              <h2 className="text-xl font-bold">My Orders</h2>
              <p>
                There are <span className="font-bold text-primary">{countText}</span> Products in my Order list
              </p>

              <div className="relative overflow-x-auto mt-5">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th className="px-6 py-3">&nbsp;</th>
                      <th scope="col" className="px-6 py-3 whitespace-nowrap">
                        Order Id
                      </th>
                      <th scope="col" className="px-6 py-3 whitespace-nowrap">
                        Payment Id
                      </th>
                      <th scope="col" className="px-6 py-3 whitespace-nowrap">
                        Name
                      </th>
                      <th scope="col" className="px-6 py-3 whitespace-nowrap">
                        Phone Number
                      </th>
                      <th scope="col" className="px-6 py-3 whitespace-nowrap">
                        Address
                      </th>
                      <th scope="col" className="px-6 py-3 whitespace-nowrap">
                        Total Amount
                      </th>
                      <th scope="col" className="px-6 py-3 whitespace-nowrap">
                        Email
                      </th>
                      <th scope="col" className="px-6 py-3 whitespace-nowrap">
                        User Id
                      </th>
                      <th scope="col" className="px-6 py-3 whitespace-nowrap">
                        Order Status
                      </th>
                      <th scope="col" className="px-6 py-3 whitespace-nowrap">
                        Date
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {loading && (
                      <tr>
                        <td colSpan={12} className="px-6 py-6 text-center">
                          Loading...
                        </td>
                      </tr>
                    )}

                    {!loading && orders?.length === 0 && (
                      <tr>
                        <td colSpan={12} className="px-6 py-6 text-center">
                          No orders found
                        </td>
                      </tr>
                    )}

                    {!loading &&
                      orders?.map((order) => {
                        const addr = order?.shippingAddress || {};
                        const paymentId =
                          order?.payment?.method === "BKASH" ? order?.payment?.bkash?.trxId || "—" : "—";
                        const addressLine = [
                          addr.address,
                          addr.apartment,
                          addr.upazila,
                          addr.districtLabel,
                          addr.divisionLabel,
                          addr.postcode,
                        ]
                          .filter(Boolean)
                          .join(", ");

                        return (
                          <Fragment key={order?._id}>
                            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                              <td className="px-6 py-4">
                                <Button
                                  onClick={() => toggleRow(order?._id)}
                                  className="!w-[35px] !h-[35px] !min-w-[35px] !rounded-full !bg-[#f1f1f1]"
                                >
                                  {openRowId === order?._id ? (
                                    <FaAngleUp className="text-[18px]" />
                                  ) : (
                                    <FaAngleDown className="text-[18px]" />
                                  )}
                                </Button>
                              </td>
                              <td className="px-6 py-4">#{shortId(order?._id)}</td>
                              <td className="px-6 py-4">{paymentId}</td>
                              <td className="px-6 py-4">{addr?.name || "-"}</td>
                              <td className="px-6 py-4">{addr?.phone || "-"}</td>
                              <td className="px-6 py-4">{addressLine || "-"}</td>
                              <td className="px-6 py-4">{formatMoney(order?.pricing?.total)}</td>
                              <td className="px-6 py-4">{addr?.email || "-"}</td>
                              <td className="px-6 py-4">#{shortId(order?.userId)}</td>
                              <td className="px-6 py-4">
                                <div className="flex items-center gap-2">
                                  <Badge status={prettyStatus(order?.status)} />
                                  {canCancel(order) && (
                                    <Button
                                      onClick={() => handleCancel(order?._id)}
                                      disabled={cancellingId === order?._id}
                                      variant="outlined"
                                      className="!normal-case !px-3 !py-1 !text-red-600 !border-red-300 hover:!border-red-500 hover:!bg-red-50"
                                      title="Cancel order"
                                    >
                                      {cancellingId === order?._id ? "Cancelling..." : "Cancel"}
                                    </Button>
                                  )}
                                </div>
                              </td>
                              <td className="px-6 py-4">{fmtDate(order?.createdAt)}</td>
                            </tr>

                            {openRowId === order?._id && (
                              <tr>
                                <td className="bg-[#f1f1f1]" colSpan={12}>
                                  <div className=" overflow-x-auto mt-5">
                                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                        <tr>
                                          <td className="px-6 py-4">&nbsp;</td>

                                          <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                            Product Id
                                          </th>
                                          <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                            Product Title
                                          </th>
                                          <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                            Image
                                          </th>
                                          <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                            Quantity
                                          </th>
                                          <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                            Price
                                          </th>
                                          <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                            Sub Total
                                          </th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        {order?.items?.map((it, i) => (
                                          <tr
                                            key={`${order?._id}-${i}`}
                                            className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200"
                                          >
                                            <td className="px-6 py-4">&nbsp;</td>
                                            <td className="px-6 py-4">#{shortId(it?.productId)}</td>
                                            <td className="px-6 py-4">{it?.productTitle}</td>
                                            <td className="px-6 py-4">
                                              <img
                                                src={it?.image || "https://via.placeholder.com/48"}
                                                alt={it?.productTitle}
                                                className="w-12 h-12 rounded-md object-cover"
                                              />
                                            </td>
                                            <td className="px-6 py-4">{it?.quantity}</td>
                                            <td className="px-6 py-4">{formatMoney(it?.price)}</td>
                                            <td className="px-6 py-4">{formatMoney(it?.subTotal)}</td>
                                          </tr>
                                        ))}
                                      </tbody>
                                    </table>
                                  </div>
                                </td>
                              </tr>
                            )}
                          </Fragment>
                        );
                      })}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default Orders;