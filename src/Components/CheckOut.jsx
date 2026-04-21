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
      <div className="w-full  lg:w-[70%] bg-white px-6 md:px-10 py-10">
        <div className="flex justify-between border-b lg:pb-8 pb-4">
          <h1 className="font-bold text-[14px] lg:text-2xl text-gray-800">
            Shipping Details
          </h1>
        </div>

        <div className="w-full p-4">
          <form action="" className="flex flex-wrap gap-6">
            <div className="w-full sm:w-[47%] lg:w-[30%]">
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
            <div className="w-full sm:w-[47%] lg:w-[30%]">
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
            <div className="w-full sm:w-[47%] lg:w-[30%]">
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
            <div className="w-full sm:w-[47%] lg:w-[30%]">
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
            <div className="w-full sm:w-[47%] lg:w-[30%]">
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
            <div className="w-full sm:w-[47%] lg:w-[30%]">
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
            <div className="w-full sm:w-[47%] lg:w-[30%]">
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
            <div className="w-full sm:w-[47%] lg:w-[30%]">
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
            <div className="w-full sm:w-[47%] lg:w-[30%]">
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
                rows={8}
                placeholder="Any special instructions for delivery..."
                className="text-sm w-full border-gray-200 border px-2 py-2 rounded-sm"
                name=""
                id=""
              ></textarea>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default CheckOut;
