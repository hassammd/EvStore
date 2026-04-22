import { collection, doc, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../Firebase";
import { LuEye } from "react-icons/lu";
import { MdOutlineDashboard } from "react-icons/md";
import { IoDocumentTextOutline, IoSettingsOutline } from "react-icons/io5";
import { FiUsers } from "react-icons/fi";
import OrderDetailsBox from "../Components/OrderDetailsBox";

const DashBoard = () => {
  const [order, setOrder] = useState();
  const [loading, setLoading] = useState();
  const [isActiveBox, setIsActiveBox] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState();

  // firestore order fetching function

  const fetchAllOrders = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "orders"));
      const orderData = querySnapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });
      setOrder(orderData);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);
  return (
    <>
      {isActiveBox ? (
        <OrderDetailsBox
          selectedOrder={selectedOrder}
          isActiveBox={isActiveBox}
          setIsActiveBox={setIsActiveBox}
        />
      ) : (
        ""
      )}

      <div className="flex">
        {/* left side bar */}
        <div className="w-[12%] p-6 h-screen bg-[#2A528A] flex flex-col gap-8">
          <div className="">
            <h3 className="text-white text-2xl">EvStore Admin</h3>
          </div>
          <div>
            <ul className="flex flex-col gap-2.5">
              <li className="flex items-center gap-2">
                <span className="flex items-center gap-2 text-base-100 text-lg">
                  <MdOutlineDashboard />
                </span>
                <span className="text-lg text-base-100"> DashBoard</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="flex items-center gap-2 text-base-100 text-lg">
                  <IoDocumentTextOutline />
                </span>
                <span className="text-lg text-base-100"> Orders</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="flex items-center gap-2 text-base-100 text-lg">
                  <FiUsers />
                </span>
                <span className="text-lg text-base-100"> Customers</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="flex text-base-300 items-center gap-2 text-lg">
                  <IoSettingsOutline />
                </span>
                <span className="text-lg text-base-100"> Settings</span>
              </li>
            </ul>
          </div>
        </div>

        {/* righ side bar */}
        <div className="w-[85%] flex flex-col gap-12   shadow-sm px-8">
          <div className="py-4 bg-gray-100 flex items-center justify-between">
            <h3 className="font-bold">Order Management</h3>

            <span>Admin</span>
          </div>
          <div>
            <span className="text-2xl font-semibold block mb-4">
              Stats Overview
            </span>
            <div className="flex justify-between">
              <div className="shadow-lg rounded-xl w-[30%] p-8 bg-[#CFECF3]">
                <div className="flex flex-col gap-2.5">
                  <span>Total Orders</span>
                  <span className="text-4xl block">$21,248</span>
                </div>
              </div>
              <div className="shadow-lg rounded-xl w-[30%] p-8 bg-[#F6FFDC]">
                <div className=" flex flex-col gap-2.5">
                  <span>Total Orders</span>
                  <span className="text-4xl block">1,248</span>
                </div>
              </div>
              <div className="shadow-lg rounded-xl  w-[30%] p-8 bg-[#C0E1D2]">
                <div className="flex flex-col gap-2.5">
                  <span>Total Revenue</span>
                  <span className="text-4xl block">$21,248</span>
                </div>
              </div>
            </div>
          </div>
          {/* table */}
          <div className="p-7 bg-[#C4D9FF] rounded-xl shadow-lg">
            <span className="text-2xl font-semibold block mb-4">
              Orders List
            </span>
            <table className="w-full">
              <thead>
                <tr className="bg-[#2C3947] text-base-100 text-left">
                  <th className="px-1.5 py-2">Order ID</th>
                  <th className="px-1.5 py-2">Customers</th>
                  <th className="px-1.5 py-2">Date</th>
                  <th className="px-1.5 py-2">Total</th>
                  <th className="px-1.5 py-2">Status</th>
                  <th className="px-1.5 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {order?.map((items) => {
                  return (
                    <tr className="  border-b-1 border-gray-200 text-left">
                      <td className="px-1.5  py-2  ">{items.id}</td>
                      <td className="px-1.5 py-2 ">
                        {items.customerDetails.firstName}
                      </td>
                      <td className="px-1.5 py-2">Date</td>
                      <td className="px-1.5 py-2">${items.totalAmount}</td>
                      <td className="px-1.5 py-2">{items.orderStatus}</td>
                      <td className="px-1.5 py-2">
                        <button
                          onClick={() => {
                            setSelectedOrder(items);
                            setIsActiveBox(true);
                          }}
                          className="btn btn-info"
                        >
                          <LuEye className="text-white text-2xl" />
                        </button>

                        <div className="dropdown dropdown-bottom dropdown-center">
                          <div tabIndex={0} role="button" className="btn m-1">
                            <IoSettingsOutline className="text-2xl" />
                          </div>
                          <ul
                            tabIndex="-1"
                            className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
                          >
                            <li>
                              <a>Item 1</a>
                            </li>
                            <li>
                              <a>Item 2</a>
                            </li>
                          </ul>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashBoard;
