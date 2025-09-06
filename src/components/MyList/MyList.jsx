// src/components/MyList/MyList.jsx
import { useContext, useEffect } from "react";
import AccountSideBar from "../AccountSidebar/AccountSideBar";
import MyListItem from "./MyListItems";
import { MyContext } from "../../App";
import { deleteData } from "../../utils/api";

const MyList = () => {
  const {
    myListData,
    setMyListData,     // <-- must exist in context
    getmyListData,
    openAlertBox
  } = useContext(MyContext);

  useEffect(() => {
    getmyListData();
  }, []);

  // Delete (optimistic)
  const handleDelete = async (id) => {
    if (!id) return;
    const ok = window.confirm("Do you want to remove this item?");
    if (!ok) return;

    if (typeof setMyListData !== 'function') {
      console.warn('setMyListData missing from context');
      await getmyListData();
      return;
    }

    const prev = myListData;
    setMyListData((list) => list.filter((x) => x._id !== id)); // UI first

    // Try RESTful: DELETE /api/myList/:id
    let res = await deleteData(`/api/myList/${id}`);
    let success = res?.success === true || res?.error === false || res?.status === 200 || res?.status === 204;

    // Fallback: if your route is /api/myList/delete/:id
    if (!success) {
      res = await deleteData(`/api/myList/${id}`);
      success = res?.success === true || res?.error === false || res?.status === 200 || res?.status === 204;
    }

    if (success) {
      openAlertBox("success", res?.message || "Removed from My List");
      // Optionally re-fetch to be 100% sync:
      // await getmyListData();
    } else {
      setMyListData(prev); // rollback
      openAlertBox("error", res?.message || "Failed to remove");
    }
  };

 
  const count = Array.isArray(myListData) ? myListData.length : 0;

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
                There are <span className="font-bold text-primary">{count}</span> Products in my list
              </p>
            </div>

            <MyListItem
              items={Array.isArray(myListData) ? myListData : []}
              onDelete={handleDelete}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default MyList;