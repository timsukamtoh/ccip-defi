import React, { useState } from "react";
import { parseEther } from "viem";
import { useAccount } from "wagmi";
import { useScaffoldContractWrite } from "~~/hooks/scaffold-eth";

export function BorrowForm() {
  const { address } = useAccount();
  const [value, setValue] = useState<string>("");

  // Handler function to update the state when the input changes
  const handleValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;

    // Try to parse the input value to a BigInt, fallback to 0n if parsing fails
    setValue(inputValue);
  };
  const { writeAsync, isLoading } = useScaffoldContractWrite({
    contractName: "Borrowing",
    functionName: "borrow",
    args: [address, parseEther(value)],
    blockConfirmations: 1,
    onBlockConfirmation: txnReceipt => {
      console.log("Transaction blockHash", txnReceipt.blockHash);
    },
  });

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      // Call the writeAsync function when a button is clicked or an event occurs
      const result = await writeAsync();
      console.log("Transaction result:", result);
    } catch (error) {
      console.error("Error executing transaction:", error);
    }
  }

  return (
    <form onSubmit={submit} className="flex flex-col items-center justify-center space-y-4">
      <h1 className="text-2xl font-bold">Borrow</h1>
      <input
        type="number"
        step=".01"
        name="value"
        pattern="^\d*(\.\d{0,2})?$"
        placeholder="0.05 ETH"
        onChange={handleValueChange}
        required
        className="p-2 border border-gray-300 rounded"
      />
      <button
        type="submit"
        className="w-full max-w-xs mx-auto text-xl font-normal text-black bg-lime-400 rounded p-4 shadow font-poppins"
      >
        {isLoading ? "Confirming..." : "Borrow"}
      </button>
    </form>
  );
}
