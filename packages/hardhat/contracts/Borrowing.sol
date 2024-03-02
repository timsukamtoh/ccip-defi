// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/draft-ERC20Permit.sol";
import { OwnerIsCreator } from "@chainlink/contracts-ccip/src/v0.8/shared/access/OwnerIsCreator.sol";
import { Lending } from "./Lending.sol";
import { MockUSDC } from "./MockUSDC.sol";

/**
 * Contract for borrower to borrow against their assets on ALL chains they have assets on.
 */

/// @title - A simple messenger contract for sending/receiving messages and tokens across chains.
/// Pay using LINK tokens
contract Borrowing is OwnerIsCreator {
	MockUSDC usdc;
	mapping(address => mapping(address => uint256)) public borrowings; // debt address => (token => amount)

	constructor() {}

	/// called by frontend AFTER determining that user doesn't exceed collatorization ratio across chains
	/// AND that there's enough deposits of tokenToBorrow on the current chain;
	/// transfers amountToBorrow to caller's wallet if successful
	function borrow(address tokenToBorrow, uint256 amountToBorrow) public {
		require(
			borrowings[msg.sender][tokenToBorrow] == 0,
			"Already borrowing USDC"
		);

		usdc = MockUSDC(tokenToBorrow);

		borrowings[msg.sender][tokenToBorrow] += amountToBorrow;

		usdc.transfer(msg.sender, amountToBorrow);
	}

	/// deposits into lendings on the current chain
	function repay(address tokenToRepay, uint256 amount) public {
		require(
			amount == borrowings[msg.sender][tokenToRepay],
			"Must Repay full amount"
		);
		usdc = MockUSDC(tokenToRepay);
		IERC20(usdc).approve(address(this), amount);

		// Transfer the tokens and update the lending mapping
		IERC20(usdc).transferFrom(msg.sender, address(this), amount);
		borrowings[msg.sender][tokenToRepay] -= amount;
	}
}
