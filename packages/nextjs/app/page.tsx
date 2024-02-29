"use client";

// import Link from "next/link";
import type { NextPage } from "next";

// import { useAccount } from "wagmi";
// import { Address } from "~~/components/scaffold-eth";

const Home: NextPage = () => {
  // const { address: connectedAddress } = useAccount();

  return (
    <>
      <div className="bg-white shadow">
        {/* Main content */}
        <div className="border-red-500 bg-gray-200 p-4 justify-between">
          {/* Tabs */}
          <div className="border-b border-red-500">
            <div className="mb-4 flex items-center justify-between rounded-md border-red-500 bg-white p-4 shadow">
              {/* Container for the tabs with spacing, padding, and shadow */}
              <div className="flex space-x-4 border-red-500">
                {/* Container for the individual tabs with spacing */}
                <button className="border-b-2 border-blue-600 px-4 py-2 font-semibold text-blue-600">Supply</button>
                <button className="px-4 py-2 text-gray-600 hover:text-gray-800">Borrow</button>
              </div>
            </div>
          </div>
          {/* Supply content */}
          <div className="pt-4">
            {/* Amount input and currency select */}
            <div className="mb-4 flex space-x-4">
              <input
                type="text"
                // placeholder={0.0}
                className="form-input block w-full rounded border border-gray-300 px-4 py-3"
              />
              <div className="relative">
                <select className="block w-full appearance-none rounded border border-gray-300 bg-white px-4 py-2 pr-8 leading-tight focus:border-gray-500 focus:outline-none">
                  <option>USDC</option>
                  {/* other options */}
                </select>
              </div>
            </div>
            {/* Rates display */}
            <div className="rounded bg-gray-100 p-4">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-gray-600">Supply APY</span>
                <span className="font-semibold">3.08%</span>
              </div>
              <div className="mb-2 flex items-center justify-between">
                <span className="text-gray-600">Collateral factor</span>
                <span className="font-semibold">74.00%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Distribution APY</span>
                <span className="font-semibold">0.31%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
