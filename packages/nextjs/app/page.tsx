"use client";

import { useEffect, useState } from "react";
import { NextPage } from "next";
import { useAccount } from "wagmi";
import { BorrowForm } from "~~/components/forms/BorrowForm";
import { DepositForm } from "~~/components/forms/DepositForm";
import { RepayForm } from "~~/components/forms/RepayForm";
import { WithdrawForm } from "~~/components/forms/WithdrawForm";
import { useDeployedContractInfo, useScaffoldContractRead } from "~~/hooks/scaffold-eth";

const Home: NextPage = () => {
  // State to track the active tab, with 'supply' as the initial state
  const { data: mockUSDC } = useDeployedContractInfo("MockUSDC");
  const [activeTab, setActiveTab] = useState("supply");
  const { address } = useAccount();
  const [userDeposits, setUserDeposits] = useState<string | bigint>("0");
  const [userDebt, setUserDebt] = useState<string | bigint>("0");

  const { data: lendingAmount } = useScaffoldContractRead({
    contractName: "Lending",
    functionName: "lendings",
    args: [address, mockUSDC?.address],
  });
  const { data: debtAmount } = useScaffoldContractRead({
    contractName: "Borrowing",
    functionName: "borrowings",
    args: [address, mockUSDC?.address],
  });

  useEffect(() => {
    // Check if lendingAmount is not undefined before updating state
    if (lendingAmount !== undefined) {
      setUserDeposits(lendingAmount);
    }
  }, [address, mockUSDC?.address, lendingAmount]);

  useEffect(() => {
    // Check if debtAmount is not undefined before updating state
    if (debtAmount !== undefined) {
      setUserDebt(debtAmount);
    }
  }, [address, mockUSDC?.address, debtAmount]);

  // const updateUserDeposits = (newDeposits) => {
  //   setUserDeposits(newDeposits);
  // };

  // const updateUserDebt = (newDebt) => {
  //   setUserDebt(newDebt);
  // };

  return (
    <div className="absolute inset-0 flex flex-col justify-center items-center m-3 p-9 gap-6">
      <div className="flex w-full max-w-md mx-auto justify-between mb-6">
        {/* When clicked, set active tab to 'supply' */}
        <button
          onClick={() => setActiveTab("supply")}
          className={`w-1/2 text-center text-xl font-normal text-black ${
            activeTab === "supply" ? "ring ring-red-500" : "hover:ring hover:ring-red-500"
          } rounded font-poppins`}
        >
          Supply
        </button>
        {/* When clicked, set active tab to 'borrow' */}
        <button
          onClick={() => setActiveTab("borrow")}
          className={`w-1/2 text-center text-xl font-normal text-black ${
            activeTab === "borrow" ? "ring ring-red-500" : "hover:ring hover:ring-red-500"
          } rounded font-poppins`}
        >
          Borrow
        </button>
      </div>
      <div>
        {/* Conditional rendering based on activeTab */}
        {activeTab === "supply" ? (
          // Supply content
          <div className="flex flex-col justify-between gap-2 mb-3">
            <div className="flex items-center justify-center gap-2 mb-3">
              <strong>Deposited {String(userDeposits)}</strong>
              <select className="w-30 max-w-xs text-xl font-normal text-black bg-lime-400 rounded p-2 shadow font-poppins">
                <option>USDC</option>
              </select>
            </div>
            <div></div>
            <div className="w-50 max-w-md mx-auto flex flex-row justify-between gap-4 mb-6">
              <DepositForm />
              {Number(userDeposits) > 0 && Number(userDebt) == 0 ? <WithdrawForm /> : <></>}
            </div>
            <div className="w-80 max-w-md mx-auto mb-6">
              <div className="text-lg font-normal text-black mb-3 font-poppins">Supply rates</div>
              <div className="flex justify-between">
                <div className="text-md font-normal text-neutral-500 font-poppins">Supply APY</div>
                <div className="text-md font-normal text-black font-poppins">5.00%</div>
              </div>
              <div className="flex justify-between">
                <div className="text-md font-normal text-neutral-500 font-poppins">Distribution APY</div>
                <div className="text-md font-normal text-black font-poppins">0.30%</div>
              </div>
              <div className="flex justify-between">
                <div className="text-md font-normal text-neutral-500 font-poppins">Collateral factor</div>
                <div className="text-md font-normal text-black font-poppins">70.00%</div>
              </div>
            </div>
          </div>
        ) : (
          // Borrow content
          <div className="flex flex-col justify-between gap-2 mb-3">
            <div className="flex items-center justify-center gap-2 mb-3">
              <strong>Borrowed {String(userDebt)}</strong>
              <select className="w-30 max-w-xs text-xl font-normal text-black bg-lime-400 rounded p-2 shadow font-poppins">
                <option>USDC</option>
              </select>
            </div>
            <div></div>
            <div className="w-50 max-w-md mx-auto flex flex-row justify-between gap-4 mb-6">
              {Number(userDebt) == 0 && Number(userDeposits) > 0 ? <BorrowForm /> : <></>}
              {Number(userDebt) > 0 ? <RepayForm /> : <></>}
            </div>
            <div className="w-80 max-w-md mx-auto mb-6">
              <div className="text-lg font-normal text-black mb-3 font-poppins">Supply rates</div>
              <div className="flex justify-between">
                <div className="text-md font-normal text-neutral-500 font-poppins">Borrowing APR</div>
                <div className="text-md font-normal text-black font-poppins">10.00%</div>
              </div>
              <div className="flex justify-between">
                <div className="text-md font-normal text-neutral-500 font-poppins">Distribution APR</div>
                <div className="text-md font-normal text-black font-poppins">2.00%</div>
              </div>
              <div className="flex justify-between">
                <div className="text-md font-normal text-neutral-500 font-poppins">Liquidity Pool</div>
                <div className="text-md font-normal text-black font-poppins">40,000 USDC</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
