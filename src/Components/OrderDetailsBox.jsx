import { IoClose } from "react-icons/io5";

const OrderDetailsBox = ({ setIsActiveBox, selectedOrder }) => {
  return (
    // Backdrop (Black overlay)
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[999] p-4">
      {/* Modal Box */}
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden relative animate-in fade-in zoom-in duration-200">
        {/* Header */}
        <div className="bg-[#2A528A] p-6 text-white flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold">Order #ORD-7721</h2>
            <p className="text-xs opacity-80">Placed on April 22, 2026</p>
          </div>
          <button
            onClick={() => setIsActiveBox(false)}
            className="bg-white/20 hover:bg-white/40 p-2 rounded-full transition"
          >
            <IoClose className="text-2xl" />
          </button>
        </div>

        {/* Content */}
        <div className="p-8 grid grid-cols-2 gap-8">
          {/* Customer Info */}
          <div className="space-y-4">
            <h3 className="font-bold text-gray-800 border-b pb-2">
              Customer Details
            </h3>
            <div className="text-sm space-y-1 text-gray-600">
              <div className="flex gap-1">
                <p className="font-semibold text-gray-900 text-base">
                  {selectedOrder.customerDetails.firstName}
                </p>
                <p className="font-semibold text-gray-900 text-base">
                  {selectedOrder.customerDetails.lastName}
                </p>
              </div>
              <p>{selectedOrder.customerDetails.email}</p>
              <p>{selectedOrder.customerDetails.phone}</p>
              <p className="mt-2 italic">Lahore, Punjab, Pakistan</p>
            </div>
          </div>

          {/* Order Status & Payment */}
          <div className="space-y-4">
            <h3 className="font-bold text-gray-800 border-b pb-2">
              Order Info
            </h3>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Status:</span>
                <span className="badge badge-warning font-bold">Pending</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Payment:</span>
                <span className="text-green-600 font-bold uppercase">Paid</span>
              </div>
            </div>
          </div>

          {/* Product Table (Static) */}
          <div className="col-span-2 mt-4">
            <h3 className="font-bold text-gray-800 border-b pb-2 mb-4">
              Items Summary
            </h3>
            <div className="bg-gray-50 rounded-lg p-4">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-gray-400 text-left">
                    <th className="pb-2">Product</th>
                    <th className="pb-2 text-center">Qty</th>
                    <th className="pb-2 text-right">Price</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="py-2 font-medium">Wireless Headphones</td>
                    <td className="py-2 text-center">1</td>
                    <td className="py-2 text-right">$554.95</td>
                  </tr>
                  <tr>
                    <td className="py-2 font-medium">USB-C Cable</td>
                    <td className="py-2 text-center">2</td>
                    <td className="py-2 text-right">$24.00</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Footer (Total) */}
        <div className="bg-gray-100 p-6 flex justify-between items-center">
          <span className="text-gray-600 font-medium">
            Total Amount Payable:
          </span>
          <span className="text-3xl font-bold text-[#2A528A]">$578.95</span>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsBox;
