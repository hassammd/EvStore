import { collection, doc, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { auth, db } from "../../Firebase";
import { LuEye } from "react-icons/lu";
import {
  MdAccessTime,
  MdOutlineDashboard,
  MdOutlineLogout,
} from "react-icons/md";
import { IoDocumentTextOutline, IoSettingsOutline } from "react-icons/io5";
import { FiUser, FiUsers } from "react-icons/fi";
import OrderDetailsBox from "../Components/OrderDetailsBox";
import { FaDollarSign } from "react-icons/fa6";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { current } from "@reduxjs/toolkit";
import { RxHamburgerMenu } from "react-icons/rx";
import { signOut } from "firebase/auth";
import { logOutUser } from "../Redux/AuthSlice/SignInSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const DashBoard = () => {
  const [order, setOrder] = useState([]);
  const [loading, setLoading] = useState();
  const [isActiveBox, setIsActiveBox] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState();
  const [isSideBarActive, setIsSideBarActive] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

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

  //total revenue
  const totalRevenue = order.reduce((acc, current) => {
    const total = acc + Number(current.totalAmount);
    return total;
  }, 0);
  //Pending Order
  const pendingOrders = order.filter(
    (items) => items.orderStatus === "pending",
  ).length;

  //Logout Handler
  const LogoutHandler = async () => {
    try {
      await signOut(auth);
      dispatch(logOutUser);
      navigate("/auth");
    } catch (err) {
      console.log(err);
    }
  };
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

        {isSideBarActive ? (
          <div
            onClick={() => setIsSideBarActive(false)}
            className="lg:hidden fixed inset-0 bg-black/50"
          ></div>
        ) : (
          ""
        )}

        <div
          className={`
  ${isSideBarActive ? "left-0" : "-left-full lg:left-0"} 
  fixed lg:sticky top-0 z-50 
  h-screen w-[70%] lg:w-[20%] xl:w-[12%] 
  p-6 bg-[#1E293B] 
  flex flex-col gap-8 
  transition-all duration-600 ease-in-out
`}
        >
          <div className="">
            <h3 className="text-white  text-xl">EvStore Admin</h3>
          </div>
          <div>
            <ul className="flex flex-col gap-2.5">
              <li className="flex items-center gap-2 cursor-pointer">
                <span className="flex items-center gap-2 text-base-100 text-lg">
                  <MdOutlineDashboard />
                </span>
                <span className="text-slate-400 hover:bg-slate-800 hover:text-white">
                  DashBoard
                </span>
              </li>
              <li className="flex items-center gap-2 cursor-pointer">
                <span className="flex items-center gap-2 text-base-100 text-lg">
                  <IoDocumentTextOutline />
                </span>
                <span className="text-slate-400 hover:bg-slate-800 hover:text-white">
                  Orders
                </span>
              </li>
              <li className="flex items-center gap-2 cursor-pointer">
                <span className="flex items-center gap-2 text-base-100 text-lg">
                  <FiUsers />
                </span>
                <span className="text-slate-400 hover:bg-slate-800 hover:text-white">
                  Customers
                </span>
              </li>
              <li className="flex items-center gap-2 cursor-pointer">
                <span className="flex text-base-300 items-center gap-2 text-lg">
                  <IoSettingsOutline />
                </span>
                <span className="text-slate-400 hover:bg-slate-800 hover:text-white">
                  Settings
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* righ side bar */}
        <div className="w-full lg:w-[80%] xl:w-[90%] flex flex-col gap-12   shadow-sm  ">
          <div className="py-4 px-5 bg-gray-100 flex items-center justify-between">
            <span
              className="lg:hidden"
              onClick={() => setIsSideBarActive(true)}
            >
              <RxHamburgerMenu className="text-xl" />
            </span>
            <h3 className="text-[14px] xl:text-2xl  font-semibold text-center">
              Order Management
            </h3>

            <span
              onClick={LogoutHandler}
              className="text-[14px] cursor-pointer"
            >
              <MdOutlineLogout className="lg:text-2xl text-[25px]" />
            </span>
          </div>

          {/* stats */}
          <div className="px-4">
            <span className="lg:text-2xl text-lg font-semibold block mb-4">
              Stats Overview
            </span>
            <div className="flex  flex-wrap gap-4  justify-between">
              <div className="shadow-lg rounded-xl w-full sm:w-[30%] flex justify-between flex-col lg:w-[30%] lg:p-5 xl:p-10 p-5 bg-[#E0F2FE]">
                <div className="flex items-center justify-between gap-2.5">
                  <div className="flex flex-col gap-1.5">
                    <span className="xl:text-xl ">Total Orders</span>
                    <span className="lg:text-4xl text-2xl block">
                      {order ? order.length : ""}
                    </span>
                  </div>
                  <div className="bg-[#0EA5E9] lg:p-2 xl:p-4 p-2.5 rounded-lg">
                    <HiOutlineShoppingBag className="lg:text-2xl xl:text-3xl text-lg text-white" />
                  </div>
                </div>
              </div>
              <div className="shadow-lg rounded-xl w-full sm:w-[30%] flex justify-between flex-col items-centers lg:w-[30%] lg:p-5 xl:p-10 p-5 bg-[#FEF3C7]">
                <div className="flex items-center justify-between gap-2.5">
                  <div className="flex flex-col gap-1.5">
                    <span className="xl:text-xl ">Pending Orders</span>
                    <span className="lg:text-4xl text-2xl block">
                      {pendingOrders}
                    </span>
                  </div>
                  <div className="bg-[#F59E0B] xl:p-4 lg:p-2 p-2.5 rounded-lg">
                    <MdAccessTime className="lg:text-2xl xl:text-3xl text-lg text-white" />
                  </div>
                </div>
              </div>
              <div className="shadow-lg rounded-xl w-full sm:w-[30%]  lg:w-[30%] lg:p-5 xl:p-10 p-5 bg-[#DCFCE7]">
                <div className="flex items-center justify-between gap-2.5">
                  <div className="flex flex-col gap-1.5">
                    <span className="xl:text-xl ">Total Revenue</span>
                    <span className="lg:text-3xl text-2xl block">
                      ${totalRevenue.toLocaleString()}
                    </span>
                  </div>
                  <div className="bg-[#22C55E] lg:p-2 xl:p-4 p-2.5 rounded-lg">
                    <FaDollarSign className="lg:text-2xl xl:text-3xl text-lg text-white" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* table */}
          {/* Table Container - Deep Contrast Style */}
          <div className="mx-4 bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-200">
            {/* Table Header Section */}
            <div className="lg:p-6 p-4 bg-[#1E293B] flex justify-between items-center">
              <h4 className="lg:text-xl text-sm font-semibold text-white tracking-wide">
                Orders Management
              </h4>
              <div className="flex gap-2">
                <span className="bg-blue-500/20 text-blue-300 text-xs font-bold px-3 py-1 rounded-full border border-blue-500/30">
                  {order?.length} Total
                </span>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-slate-100 border-b border-slate-200">
                    <th className="px-6 py-4 text-xs font-bold text-slate-600 uppercase">
                      Order ID
                    </th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-600 uppercase">
                      Customer
                    </th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-600 uppercase">
                      Date
                    </th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-600 uppercase">
                      Amount
                    </th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-600 uppercase text-center">
                      Status
                    </th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-600 uppercase text-right">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {order?.map((items, index) => (
                    <tr
                      key={items.id}
                      className={`${index % 2 === 0 ? "bg-white" : "bg-slate-50/50"} hover:bg-blue-50/50 transition-colors`}
                    >
                      <td className="px-6 py-4 text-sm font-bold text-blue-700">
                        #{items.id.slice(-6).toUpperCase()}
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm font-bold text-slate-800">
                          {items.customerDetails.firstName}
                        </div>
                        <div className="text-[10px] text-slate-400 font-medium uppercase tracking-tighter">
                          Verified User
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-500 font-medium">
                        April 22, 2026
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm font-black text-slate-900 font-semibold">
                          ${Number(items.totalAmount).toLocaleString()}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span
                          className={`inline-block w-24 py-1.5 rounded-lg text-[10px] uppercase tracking-widest shadow-sm border ${
                            items.orderStatus === "pending"
                              ? "bg-orange-50 text-orange-600 border-amber-400"
                              : "bg-emerald-50 text-emerald-600 border-emerald-200"
                          }`}
                        >
                          {items.orderStatus}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex justify-end gap-3">
                          <button
                            onClick={() => {
                              setSelectedOrder(items);
                              setIsActiveBox(true);
                            }}
                            className="cursor-pointer p-2.5 bg-white border border-slate-200 text-blue-600 rounded-xl hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all shadow-sm"
                          >
                            <LuEye className="text-xl" />
                          </button>
                          <button className="cursor-pointer p-2.5 bg-white border border-slate-200 text-slate-400 rounded-xl hover:bg-slate-800 hover:text-white transition-all shadow-sm">
                            <IoSettingsOutline className="text-xl" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashBoard;
