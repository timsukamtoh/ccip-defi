// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/IERC20Metadata.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import { OwnerIsCreator } from "@chainlink/contracts-ccip/src/v0.8/shared/access/OwnerIsCreator.sol";
import { MockUSDC } from "./MockUSDC.sol";

contract Lending is ReentrancyGuard, OwnerIsCreator {
	mapping(address => mapping(address => uint256)) public lendings; // depsoit address => (token => amount)

	IERC20 usdc;
	event ApprovalNeeded(
		address indexed owner,
		address indexed spender,
		uint256 value
	);

	constructor() {}

	function getAddress() public view returns (address) {
		return address(this);
	}

	/// deposits token to be used as collatoral to borrow on other chains
	function deposit(address tokenToLend, uint256 amountToLend) public {
		require(amountToLend > 0, "Must deposit more than 0");

		usdc = MockUSDC(tokenToLend);

		// Check if the contract has sufficient allowance
		if (usdc.allowance(msg.sender, address(this)) < amountToLend) {
			// Emit event to request approval
			emit ApprovalNeeded(msg.sender, address(this), amountToLend);
			// You may also provide instructions on how the user can approve spending
			revert("Please approve spending in your wallet");
		}

		// Transfer the tokens and update the lending mapping
		usdc.transferFrom(msg.sender, address(this), amountToLend);
		lendings[address(msg.sender)][tokenToLend] += amountToLend;
	}

	/// withdraws up to the collatorization ratio across chains
	function withdraw(
		address tokenToWithdraw,
		uint256 amountToWithdraw
	) public {
		require(
			amountToWithdraw <= lendings[address(msg.sender)][tokenToWithdraw],
			"Withdrawing too much"
		);

		usdc = MockUSDC(tokenToWithdraw);
		lendings[address(msg.sender)][tokenToWithdraw] -= amountToWithdraw;
		usdc.transferFrom(address(this), msg.sender, amountToWithdraw);
	}

	/// returns tokenType amount borrowed
	function getLending(address tokenType) public view {
		lendings[msg.sender][tokenType];
	}
}
