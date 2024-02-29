"use client";

// import Link from "next/link";
import type { NextPage } from "next";

// import { useAccount } from "wagmi";
// import { Address } from "~~/components/scaffold-eth";

const Home: NextPage = () => {
  // const { address: connectedAddress } = useAccount();

  return (
    <div className="absolute inset-0 flex flex-col justify-center items-center p-6 gap-6">
      <div className="flex w-full max-w-md mx-auto justify-between mb-6">
        <button className="w-1/2 text-center text-xl font-normal text-black hover:ring hover:ring-red-500 rounded font-poppins">
          Supply
        </button>
        <button className="w-1/2 text-center text-xl font-normal text-black hover:ring hover:ring-red-500 font-poppins">
          Borrow
        </button>
      </div>
      <div className="w-full max-w-md mx-auto flex justify-between gap-4 mb-6">
        <input
          type="text"
          placeholder="0.00"
          className="w-3/5 text-lg font-normal text-black border border-gray-300 rounded p-4 font-poppins"
        />
        <select className="w-2/5 text-xl font-normal text-black border border-gray-300 rounded p-4 font-poppins">
          <option>USDC</option>
        </select>
      </div>
      <div className="w-full max-w-md mx-auto mb-6">
        <div className="text-lg font-normal text-black mb-3 font-poppins">Supply rates</div>
        <div className="flex justify-between">
          <div className="text-md font-normal text-neutral-500 font-poppins">Supply APY</div>
          <div className="text-md font-normal text-black font-poppins">3.08%</div>
        </div>
        <div className="flex justify-between">
          <div className="text-md font-normal text-neutral-500 font-poppins">Distribution APY</div>
          <div className="text-md font-normal text-black font-poppins">0.31%</div>
        </div>
        <div className="flex justify-between">
          <div className="text-md font-normal text-neutral-500 font-poppins">Collateral factor</div>
          <div className="text-md font-normal text-black font-poppins">74.00%</div>
        </div>
      </div>
      <button className="w-full max-w-xs mx-auto text-xl font-normal text-black bg-lime-400 rounded p-4 shadow font-poppins">
        Connect Wallet
      </button>
    </div>
  );
};

export default Home;
