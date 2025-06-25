
import MyListItem from "./MyListItems";
import AccountSideBar from "../AccountSidebar/AccountSideBar";



const MyList = () => {

    return (
         <section className="py-10 w-full">
                    <div className="container flex gap-5">
                        {/* left sidebar */}
                        <div className="col1 w-[20%]">
                            <AccountSideBar/>
                        </div>
                        {/*  right*/}
                        <div className="col2 w-[70%]">
                             <div className="shadow-m rounded-md bg-white">
                        <div className="py-2 px-3 border-b border-[rgba(0,0,0,0.2)]">
                            <h2 className="text-xl font-bold">My Lists</h2>
                            <p>There are <span className="font-bold text-primary">2</span> Products in my list</p>
                        </div>
                        {/*cart main box  */}
                        <MyListItem />
                        <MyListItem />
                        <MyListItem />
                        <MyListItem />
                        <MyListItem />
                        <MyListItem />
                        <MyListItem />
                        <MyListItem />
                        <MyListItem />
                        <MyListItem />
                        <MyListItem />

                    </div>
                        </div>
                    </div>
                </section>
       
    );
};

export default MyList;