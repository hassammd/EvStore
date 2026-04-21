import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../Firebase";

const OrderSummary = () => {
  const { orderid } = useParams();
  console.log(orderid);
  const [orderData, setOrderData] = useState(null);

  console.log("this is orderData", orderData);

  useEffect(() => {
    const getOrderDetails = async () => {
      const docRef = doc(db, "orders", orderid); //reference of the order
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setOrderData(docSnap.data());
        console.log("this is orderData from snap", docSnap.data());
      } else {
        console.log("no data");
      }
    };
    getOrderDetails();
  }, [orderid]);

  return (
    <>
      {orderData ? (
        <div className="container mx-auto px-4 py-20 text-center">
          {/* Success Icon */}
          <div className="text-green-500 text-6xl mb-4">✔</div>

          <h1 className="text-3xl font-bold mb-2">Thank You for Your Order!</h1>

          <p className="text-gray-600 mb-8">
            Your order ID is:
            <span className="font-mono font-bold text-orange"> {orderid}</span>
          </p>

          {/* Order Summary Card */}
          <div className="max-w-md mx-auto bg-base-200 p-6 rounded-lg text-left shadow-md">
            <h3 className="text-xl font-semibold mb-4 border-b pb-2">
              Order Summary
            </h3>

            <div className="flex justify-between mb-2">
              <span>Name:</span>
              <div className="flex gap-1">
                <span>{orderData?.customerDetails.firstName}</span>
                <span>{orderData?.customerDetails.lastName}</span>
              </div>
            </div>
            <div className="flex justify-between mb-2">
              <span>Email:</span>
              <div className="flex gap-1">
                <span>{orderData?.customerDetails.email}</span>
              </div>
            </div>
            <div className="flex justify-between mb-2">
              <span>Phone:</span>
              <div className="flex gap-1">
                <span>{orderData?.customerDetails.phone}</span>
              </div>
            </div>
            <div className="flex justify-between mb-2">
              <span>Discount:</span>
              <span>${orderData?.discount}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Shipping Fee:</span>
              <span>${orderData?.shippingFee}</span>
            </div>

            <div className="flex justify-between font-bold text-lg mt-4 border-t pt-2">
              <span>Grand Total:</span>
              <span>${orderData?.totalAmount.toFixed(2)}</span>
            </div>
          </div>

          <div className="mt-10 flex gap-4 justify-center">
            <a
              href="/products"
              className="btn btn-primary shadow-none text-base-100 bg-orange border-none"
            >
              Continue Shopping
            </a>

            <a href="/" className="btn btn-outline">
              Go to Home
            </a>
          </div>
        </div>
      ) : (
        <div className="container mx-auto px-4 py-20 text-center flex items-center justify-center">
          <div class="w-10 h-10 border-4 border-t-orange border-gray-300 rounded-full animate-spin"></div>
        </div>
      )}
    </>
  );
};

export default OrderSummary;
