// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import { OwnerIsCreator } from "@chainlink/contracts-ccip/src/v0.8/shared/access/OwnerIsCreator.sol";
import { Lending } from "./Lending-new.sol";
import { MockUSDC } from "./MockUSDC.sol";

/**
 * Contract for borrower to borrow against their assets on ALL chains they have assets on.
 */

/// @title - A simple messenger contract for sending/receiving messages and tokens across chains.
/// Pay using LINK tokens
contract Borrowing is OwnerIsCreator {
	Lending private mLending;

	mapping(address => mapping(address => uint256)) public borrowings; // debt address => (token => amount)

	constructor(Lending lending) {
		mLending = lending;
	}

	/// called by frontend AFTER determining that user doesn't exceed collatorization ratio across chains
	/// AND that there's enough deposits of tokenToBorrow on the current chain;
	/// transfers amountToBorrow to caller's wallet if successful
	function borrow(address tokenToBorrow, uint256 amountToBorrow) public {
		MockUSDC usdc = MockUSDC(tokenToBorrow);

		borrowings[msg.sender][tokenToBorrow] += amountToBorrow;

		usdc.transfer(address(msg.sender), amountToBorrow);
	}

	/// deposits into lendings on the current chain
	function repay(address tokenToRepay, uint256 amount) public {
		MockUSDC usdc = MockUSDC(tokenToRepay);
		mLending.lend(tokenToRepay, amount);
	}

	/// returns tokenType amount borrowed
	function getBorrowing(address tokenType) public view returns (uint256) {
		return borrowings[msg.sender][address(tokenType)];
	}
}
