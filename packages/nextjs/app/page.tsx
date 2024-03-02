"use client";

import { useEffect, useState } from "react";
import { NextPage } from "next";
import { useLocalStorage } from "usehooks-ts";
// import { BorrowForm } from "~~/components/forms/BorrowForm";
// import { DepositForm } from "~~/components/forms/DepositForm";
// import { RepayForm } from "~~/components/forms/RepayForm";
// import { WithdrawForm } from "~~/components/forms/WithdrawForm";
import { ContractName } from "~~/utils/scaffold-eth/contract";
import { getAllContracts } from "~~/utils/scaffold-eth/contractsData";

const selectedContractStorageKey = "scaffoldEth2.selectedContract";
const contractsData = getAllContracts();
const contractNames = Object.keys(contractsData) as ContractName[];

// const [userDeposits, setUserDeposits] = useState<string>("0");
// const [userBorrowing, setUserBorrowing] = useState<string>("0");

// useEffect(() => {
//   const { data: totalCounter } = useScaffoldContractRead({
//     contractName: "YourContract",
//     functionName: "userGreetingCounter",
//     args: ["0xd8da6bf26964af9d7eed9e03e53415d37aa96045"],
//   });
//   const { data: totalCounter } = useScaffoldContractRead({
//     contractName: "YourContract",
//     functionName: "userGreetingCounter",
//     args: ["0xd8da6bf26964af9d7eed9e03e53415d37aa96045"],
//   });

// }, [userDeposits, userBorrowing]);

const Home: NextPage = () => {
  // State to track the active tab, with 'supply' as the initial state
  const [activeTab, setActiveTab] = useState("supply");
  const [selectedContract, setSelectedContract] = useLocalStorage<ContractName>(
    selectedContractStorageKey,
    contractNames[0],
    { initializeWithValue: false },
  );

  useEffect(() => {
    if (!contractNames.includes(selectedContract)) {
      setSelectedContract(contractNames[0]);
    }
  }, [selectedContract, setSelectedContract]);

  return (
    <div className="flex h-auto flex-col items-center justify-center bg-[#FAF6F0] p-10">
      <div className="w-full space-y-6 bg-[#E4E3D5] rounded-2xl p-8 shadow-2xl">
        <div className="flex justify-between items-center border-b pb-4">
          <h1 className="text-3xl font-semibold ">CCIP DEX</h1>
        </div>
        <div className="grid grid-cols-2 gap-10 ">
          <button
            onClick={() => setActiveTab("supply")}
            className={`btn bg-white rounded-xl shadow font-bold py-3 p-6 transition-colors text-2xl ${
              activeTab === "supply" ? "ring ring-red-500" : "hover:ring hover:ring-red-500"
            } font-poppins`}
          >
            Supply
          </button>
          <button
            onClick={() => setActiveTab("borrow")}
            className={`btn bg-white rounded-xl shadow  font-bold py-3 transition-colors text-2xl ${
              activeTab === "borrow" ? "ring ring-red-500" : "hover:ring hover:ring-red-500"
            } font-poppins`}
          >
            Borrow
          </button>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div className="text-lg font-semibold ">Source Network</div>
          <div className="text-mlg font-semibold">Receiving Network</div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <select className="form-select rounded-lg text-lg border-2 border-gray-300 p-4 bg-white cursor-pointer text-gray-700">
            <option>ETHEREUM</option>
            <option>POLYGON</option>
            <option>AVALANCHE</option>
            <option>SOLANA</option>
          </select>
          <select className="form-select rounded-lg text-lg border-2 border-gray-300 p-4 bg-white cursor-pointer text-gray-700">
            <option>ETHEREUM</option>
            <option>POLYGON</option>
            <option>AVALANCHE</option>
            <option>SOLANA</option>
          </select>
        </div>

        <div className="flex gap-4 bg-[#E4E3D5] p-3">
          <input
            type="text"
            placeholder="0.00"
            className="form-input w-3/4 rounded-lg text-lg border-2 border-gray-300 p-4 bg-white"
          />
          <select className="form-select w-1/4 rounded-lg text-lg border-2 border-gray-300 p-4 bg-white cursor-pointer">
            <option>USDC</option>
            <option>ETH</option>
            <option>MATIC</option>
            <option>BTC</option>
          </select>
        </div>

        {activeTab === "supply" ? (
          <>
            <div className="flex justify-between text-lg">
              <span>Supply APY</span>
              <span>3.08%</span>
            </div>
            <div className="flex justify-between text-lg">
              <span>Distribution APY</span>
              <span>0.31%</span>
            </div>
          </>
        ) : (
          <>
            <div className="flex justify-between text-lg">
              <span>Borrow APY</span>
              <span>3.08%</span>
            </div>
            <div className="flex justify-between text-lg">
              <span>Liquidity Pool</span>
              <span>0.31%</span>
            </div>
          </>
        )}
        <button className="btn w-full rounded-lg bg-[#C9FF30] font-bold transition-colors text-xl hover:ring hover:ring-red-500">
          Deploy
        </button>
      </div>
    </div>
  );
};

export default Home;
