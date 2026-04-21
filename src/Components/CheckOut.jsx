import { useState } from "react";

const CheckOut = ({
  firstName,
  setFirstName,
  lastName,
  setLastName,
  email,
  setEmail,
  phone,
  setPhone,
  city,
  setCity,
  house,
  setHouse,
  Landmark,
  setLandmark,
  state,
  setState,
  zip,
  setZip,
  description,
  setDescription,
  error,
}) => {
  return (
    <>
      <div className="w-full lg:w-3/4 bg-white px-6 md:px-10 py-10">
        <div className="flex justify-between border-b lg:pb-8 pb-4">
          <h1 className="font-bold text-[14px] lg:text-2xl text-gray-800">
            checkout
          </h1>
          <h2 className="text-gray-800 font-semibold text-[14px] lg:text-2xl">
            2 Items
          </h2>
        </div>

        <div className="w-full p-4">
          <form action="" className="flex flex-wrap gap-6">
            <div className="w-[31.7%]">
              <label htmlFor="" className="text-sm mb-1 block">
                First Name*
              </label>
              <input
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="First Name"
                value={firstName}
                type="text"
                className="text-sm w-full border-gray-200 border px-2 py-1 rounded-sm"
              />
              <span className="text-[12px] text-red-600">
                {error.firstName}
              </span>
            </div>
            <div className="w-[31.7%]">
              <label htmlFor="" className="text-sm mb-1 block">
                Last Name*
              </label>
              <input
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Last Name"
                type="text"
                value={lastName}
                className="text-sm w-full border-gray-200 border px-2 py-1 rounded-sm"
              />
              <span className="text-[12px] text-red-600">{error.lastName}</span>
            </div>
            <div className="w-[31.7%]">
              <label htmlFor="" className="text-sm mb-1 block">
                Email*
              </label>
              <input
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@mail.com"
                value={email}
                type="text"
                className="text-sm w-full border-gray-200 border px-2 py-1 rounded-sm"
              />
              <span className="text-[12px] text-red-600">{error.email}</span>
              <span className="text-[12px] text-red-600">
                {error.RegexEmail}
              </span>
            </div>
            <div className="w-[31.7%]">
              <label htmlFor="" className="text-sm mb-1 block">
                Phone number*
              </label>
              <input
                onChange={(e) => setPhone(e.target.value)}
                placeholder="0300 1234567"
                value={phone}
                type="number"
                className="text-sm w-full border-gray-200 border px-2 py-1 rounded-sm"
              />
              <span className="text-[12px] text-red-600">{error.phone}</span>
            </div>
            <div className="w-[31.7%]">
              <label htmlFor="" className="text-sm mb-1 block">
                City*
              </label>
              <input
                onChange={(e) => setCity(e.target.value)}
                placeholder="City"
                value={city}
                type="text"
                className="text-sm w-full border-gray-200 border px-2 py-1 rounded-sm"
              />
              <span className="text-[12px] text-red-600">{error.city}</span>
            </div>
            <div className="w-[31.7%]">
              <label htmlFor="" className="text-sm mb-1 block">
                House/Apartment Number*
              </label>
              <input
                onChange={(e) => setHouse(e.target.value)}
                value={house}
                placeholder="House No"
                type="text"
                className="text-sm w-full border-gray-200 border px-2 py-1 rounded-sm"
              />
              <span className="text-[12px] text-red-600">{error.house}</span>
            </div>
            <div className="w-[31.7%]">
              <label htmlFor="" className="text-sm mb-1 block">
                Near Landmark (Optional)
              </label>
              <input
                onChange={(e) => setLandmark(e.target.value)}
                placeholder="Landmark"
                type="text"
                className="text-sm w-full border-gray-200 border px-2 py-1 rounded-sm"
              />
            </div>
            <div className="w-[31.7%]">
              <label htmlFor="" className="text-sm mb-1 block">
                State*
              </label>
              <input
                onChange={(e) => setState(e.target.value)}
                placeholder="state"
                type="text"
                value={state}
                className="text-sm w-full border-gray-200 border px-2 py-1 rounded-sm"
              />
              <span className="text-[12px] text-red-600">{error.state}</span>
            </div>
            <div className="w-[31.7%]">
              <label htmlFor="" className="text-sm mb-1 block">
                Zip Code*
              </label>
              <input
                onChange={(e) => setZip(e.target.value)}
                value={zip}
                placeholder="0000"
                type="text"
                className="text-sm w-full border-gray-200 border px-2 py-1 rounded-sm"
              />
              <span className="text-[12px] text-red-600">{error.zip}</span>
            </div>
            <div className="w-full">
              <label htmlFor="" className="text-sm mb-1 block">
                Description
              </label>
              <textarea
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Any special instructions for delivery..."
                className="text-sm w-full border-gray-200 border px-2 py-1 rounded-sm"
                name=""
                id=""
              ></textarea>
            </div>
          </form>
        </div>

        <button className="cursor-pointer inline-flex items-center font-semibold text-[#FF7420] text-sm mt-10 hover:translate-x-[-5px] transition-transform">
          <svg className="fill-current mr-2 w-4" viewBox="0 0 448 512">
            <path d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z" />
          </svg>
          Continue Shopping
        </button>
      </div>
    </>
  );
};

export default CheckOut;
