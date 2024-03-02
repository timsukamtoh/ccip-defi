import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { Contract } from "ethers";

/**
 * Deploys a contract named "YourContract" using the deployer account and
 * constructor arguments set to the deployer address
 *
 * @param hre HardhatRuntimeEnvironment object.
 */
const deployLendingBorrowingContracts: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  /*
    On localhost, the deployer account is the one that comes with Hardhat, which is already funded.

    When deploying to live networks (e.g `yarn deploy --network goerli`), the deployer account
    should have sufficient balance to pay for the gas fees for contract creation.

    You can generate a random account with `yarn generate` which will fill DEPLOYER_PRIVATE_KEY
    with a random private key in the .env file (then used on hardhat.config.ts)
    You can run the `yarn account` command to check your balance in every network.
  */
  const { deployer } = await hre.getNamedAccounts();
  const { deploy } = hre.deployments;

  await deploy("MockUSDC", {
    from: deployer,
    // Contract constructor arguments
    args: [],
    log: true,
    // autoMine: can be passed to the deploy function to make the deployment process faster on local networks by
    // automatically mining the contract deployment transaction. There is no effect on live networks.
    autoMine: true,
  });

  const tokenContract = await hre.ethers.getContract<Contract>("MockUSDC", deployer);
  const tokenAddress = await tokenContract.getAddress();

  await deploy("Lending", {
    from: deployer,
    // Contract constructor arguments
    args: [tokenAddress],
    log: true,
    // autoMine: can be passed to the deploy function to make the deployment process faster on local networks by
    // automatically mining the contract deployment transaction. There is no effect on live networks.
    autoMine: true,
  });

  const lendingContract = await hre.ethers.getContract<Contract>("MockUSDC", deployer);
  const lendingContractAddress = await lendingContract.getAddress();

  // Get the deployed contract to interact with it after deploying.

  await deploy("Borrowing", {
    from: deployer,
    // Contract constructor arguments
    args: [tokenAddress],
    log: true,
    // autoMine: can be passed to the deploy function to make the deployment process faster on local networks by
    // automatically mining the contract deployment transaction. There is no effect on live networks.
    autoMine: true,
  });

  // Get the deployed contract to interact with it after deploying.
  const borrowContract = await hre.ethers.getContract<Contract>("Borrowing", deployer);
  const borrowContractAddress = await borrowContract.getAddress();

  // Get the deployed contract to interact with it after deploying.
  const mockUsdcContract = await hre.ethers.getContract<Contract>("MockUSDC", deployer);

  const mintTx = await mockUsdcContract.mint(lendingContractAddress, 10000000000);
  await mintTx.wait();

  const mintTx2 = await mockUsdcContract.mint(borrowContractAddress, 10000000000);
  await mintTx2.wait();

  // console.log("Deployer's address=" + deployer.address); // TODO: fix address
};

export default deployLendingBorrowingContracts;
