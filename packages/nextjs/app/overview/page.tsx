import Image from "next/image";

const OverviewPage = () => {
  // Dummy data for assets
  const assets = [
    {
      name: "Ethereum",
      supplyAPY: "3.38%",
      totalSupply: "1.29M USDC",
      borrowAPY: "-3.89%",
      totalLiquidity: "877.86k USDC",
    },
    {
      name: "Bitcoin",
      supplyAPY: "3.38%",
      totalSupply: "1.29M USDC",
      borrowAPY: "-3.89%",
      totalLiquidity: "877.86k USDC",
    },
    {
      name: "Matic",
      supplyAPY: "3.38%",
      totalSupply: "1.29M USDC",
      borrowAPY: "-3.89%",
      totalLiquidity: "877.86k USDC",
    },
    {
      name: "Avalance",
      supplyAPY: "3.38%",
      totalSupply: "1.29M USDC",
      borrowAPY: "-3.89%",
      totalLiquidity: "877.86k USDC",
    },
    {
      name: "Solana",
      supplyAPY: "3.38%",
      totalSupply: "1.29M USDC",
      borrowAPY: "-3.89%",
      totalLiquidity: "877.86k USDC",
    },
    // ... add more assets as needed
  ];

  return (
    <div className="bg-[#FAF6F0] flex justify-center items-center p-10">
      <div className="w-full bg-[#E4E3D5] rounded-3xl shadow-xl p-10 space-y-8">
        <div className="flex justify-between items-center border-b pb-4">
          <h1 className="text-3xl font-semibold ">Overview</h1>
        </div>
        <div className="grid grid-cols-2 gap-10">
          <div className="bg-white rounded-xl shadow p-6 text-center">
            <h2 className="text-xl font-semibold mb-2">Total Supply Liquidity</h2>
            <p className="text-2xl font-bold">$334,467,564.02</p>
          </div>
          <div className="bg-white rounded-xl shadow p-6 text-center">
            <h2 className="text-xl font-semibold mb-2">Total Borrow Liquidity</h2>
            <p className="text-2xl font-bold">$84,865,659.25</p>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow">
          <div className="p-6">
            <div className="flex justify-between border-b-2 pb-4">
              <h3 className="text-xl font-semibold">Yield API</h3>
            </div>
            <div className="grid grid-cols-6 gap-4 py-4 font-semibold">
              <div className="col-span-2">Asset</div>
              <div>Asset APY</div>
              <div>Asset Supply</div>
              <div>Asset APY</div>
              <div>Asset Liquidity</div>
            </div>
            {assets.map((asset, index) => (
              <div key={index} className="grid grid-cols-6 gap-4 py-4 items-center">
                <div className="col-span-2 flex items-center space-x-2">
                  <Image src="/ethereum-icon.svg" alt={asset.name} className="w-6 h-6" />
                  <span>{asset.name}</span>
                </div>
                <div>{asset.supplyAPY}</div>
                <div>{asset.totalSupply}</div>
                <div>{asset.borrowAPY}</div>
                <div>{asset.totalLiquidity}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverviewPage;
