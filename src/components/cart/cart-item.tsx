import { formatMoney } from "@/utils/format-money";
import React from "react";
import Image from "next/image";
export default function CartItem() {
  return (
    <div>
      <div className="justify-between mb-6 rounded-lg bg-white p-3 pr-5 shadow-md sm:flex sm:justify-start">
        <Image
          width={50}
          height={50}
          src="https://images.unsplash.com/photo-1587563871167-1ee9c731aefb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1131&q=80"
          alt="product-image"
          className=" rounded-lg h-28 w-28 object-cover"
        />
        <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
          <div className="mt-5 flex flex-col justify-between sm:mt-0">
            <h2 className="text-lg font-semibold text-gray-900">
              Nike Air Max 2019
            </h2>
            <p className="mt-1 text-xs text-gray-700">40</p>
            <p className="text-sm">{formatMoney(200000)}</p>
          </div>
          <div className="mt-4 w-[160px] flex justify-between">
            <div className="flex items-center border-gray-100">
              <button className="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-black hover:text-blue-50">
                -
              </button>
              <input
                className="h-8 w-8 border bg-white text-center text-xs outline-none"
                type="text"
                value="2"
                min="1"
              />
              <button className="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-black hover:text-blue-50">
                +
              </button>
            </div>
            <div className="flex items-center space-x-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 lg:hover:text-red-400 cursor-pointer"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}