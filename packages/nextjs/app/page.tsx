"use client";

import { useState } from "react";
import { NextPage } from "next";
// import { useScaffoldContractRead } from "~~/hooks/scaffold-eth";
import { BorrowForm } from "~~/components/forms/BorrowForm";
import { DepositForm } from "~~/components/forms/DepositForm";
import { RepayForm } from "~~/components/forms/RepayForm";
import { WithdrawForm } from "~~/components/forms/WithdrawForm";

const Home: NextPage = () => {
  // State to track the active tab, with 'supply' as the initial state
  const [activeTab, setActiveTab] = useState("supply");
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
            <select className="w-30 max-w-xs mx-auto text-xl font-normal text-black bg-lime-400 rounded p-2 shadow font-poppins flex justify-center">
              <option>USDC</option>
            </select>
            <div></div>
            <div className="w-50 max-w-md mx-auto flex flex-row justify-between gap-4 mb-6">
              <DepositForm />
              <WithdrawForm />
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
            <select className="w-30 max-w-xs mx-auto text-xl font-normal text-black bg-lime-400 rounded p-2 shadow font-poppins flex justify-center">
              <option>USDC</option>
            </select>
            <div></div>
            <div className="w-50 max-w-md mx-auto flex flex-row justify-between gap-4 mb-6">
              <BorrowForm />
              <RepayForm />
            </div>
            <div className="w-80 max-w-md mx-auto mb-6">
              <div className="text-lg font-normal text-black mb-3 font-poppins">Borrow rates</div>
              <div className="flex justify-between">
                <div className="text-md font-normal text-neutral-500 font-poppins">Borrow APR</div>
                <div className="text-md font-normal text-black font-poppins">10.00%</div>
              </div>
              <div className="flex justify-between">
                <div className="text-md font-normal text-neutral-500 font-poppins">Distribution APR</div>
                <div className="text-md font-normal text-black font-poppins">1.90%</div>
              </div>
              <div className="flex justify-between">
                <div className="text-md font-normal text-neutral-500 font-poppins">Liquidity Pool</div>
                <div className="text-md font-normal text-black font-poppins">40,000 USDC</div>
              </div>
            </div>
          </div>
        )}

        {/* Connect Wallet Button */}
        {/* <button className="w-full max-w-xs mx-auto text-xl font-normal text-black bg-lime-400 rounded p-4 shadow font-poppins">
          Connect Wallet
        </button> */}
      </div>
    </div>
  );
};

export default Home;
