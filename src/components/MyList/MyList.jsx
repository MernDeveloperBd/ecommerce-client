// src/components/MyList/MyList.jsx
import { useContext, useEffect } from "react";
import AccountSideBar from "../AccountSidebar/AccountSideBar";
import MyListItem from "./MyListItems";
import { MyContext } from "../../App";
import { deleteData } from "../../utils/api";

const MyList = () => {
  const {
    myListData,
    setMyListData,
    getmyListData,
    openAlertBox,
    addToCart,
    userData
  } = useContext(MyContext);

  useEffect(() => {
    getmyListData();
  }, []);

  // Optimistic delete
  const handleDelete = async (id) => {
    if (!id) return;
    const ok = window.confirm("Do you want to remove this item?");
    if (!ok) return;

    const prev = myListData;
    // UI থেকে আগে রিমুভ
    setMyListData((list) => list.filter((x) => x._id !== id));

    try {
      // আপনার রুট যদি আলাদা হয় (e.g., /api/myList/delete/:id), এখানে আপডেট করুন
      const res = await deleteData(`/api/myList/${id}`);
      const success = res?.success === true || res?.error === false || res?.status === 200 || res?.status === 204;
      if (success) {
        openAlertBox("success", res?.message || "Removed from My List");
        // সার্ভার sync চাইলে
        // await getmyListData();
      } else {
        setMyListData(prev);
        openAlertBox("error", res?.message || "Failed to remove");
      }
    } catch (e) {
      setMyListData(prev);
      openAlertBox("error", "Failed to remove");
    }
  };

  // Add to Cart (১টা করে)
  const handleAddToCart = (item) => {
    if (!userData?._id) {
      openAlertBox("error", "You are not logged in. please login first");
      return;
    }
    // MyList আইটেম থেকে cart product shape বানালাম
    const product = {
      _id: item?.productId,
      name: item?.productTitle,
      image: item?.image,
      rating: item?.rating,
      price: item?.price,
      oldPrice: item?.oldPrice,
      brand: item?.brand,
      productSize: item?.productSize,
      productColor: item?.productColor,
      countInStock: item?.countInStock // না থাকলে সার্ভার-সাইড চেক ideally
    };
    addToCart(product, userData?._id, 1);
  };

  return (
    <section className="py-10 w-full">
      <div className="container flex flex-col md:flex-row gap-5">
        {/* left sidebar */}
        <div className="col1 md:w-[20%]">
          <AccountSideBar />
        </div>
        {/* right */}
        <div className="col2 md:w-[70%]">
          <div className="shadow-m rounded-md bg-white">
            <div className="py-2 px-3 border-b border-[rgba(0,0,0,0.2)]">
              <h2 className="text-xl font-bold">My Lists</h2>
              <p>
                There are{" "}
                <span className="font-bold text-primary">
                  {Array.isArray(myListData) ? myListData.length : 0}
                </span>{" "}
                Products in my list
              </p>
            </div>

            {/* items */}
            <MyListItem
              items={Array.isArray(myListData) ? myListData : []}
              onDelete={handleDelete}
              onAddToCart={handleAddToCart}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default MyList;