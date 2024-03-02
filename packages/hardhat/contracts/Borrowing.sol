// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import { Lending } from "./Lending.sol";
import { MockUSDC } from "./MockUSDC.sol";

/**
 * Contract for borrower to borrow against their assets on ALL chains they have assets on.
 */

/// @title - A simple messenger contract for sending/receiving messages and tokens across chains.
/// Pay using LINK tokens
contract Borrowing {
	Lending private _Lending;

	mapping(address => mapping(address => uint256)) public borrowings; // debt address => (token => amount)

	constructor(address lendingAddress) {
		_Lending = Lending(lendingAddress);
	}

	/// called by frontend AFTER determining that user doesn't exceed collatorization ratio across chains
	/// AND that there's enough deposits of tokenToBorrow on the current chain;
	/// transfers amountToBorrow to caller's wallet if successful
	function borrow(address tokenToBorrow, uint256 amountToBorrow) public {
		require(
			borrowings[msg.sender][tokenToBorrow] == 0,
			"Already borrowing USDC"
		);
		MockUSDC usdc = MockUSDC(tokenToBorrow);

		borrowings[msg.sender][tokenToBorrow] += amountToBorrow;

		usdc.transfer(address(msg.sender), amountToBorrow);
	}

	/// deposits into lendings on the current chain
	function repay(address tokenToRepay, uint256 amount) public {
		require(
			amount == borrowings[msg.sender][tokenToRepay],
			"Must Repay full amount"
		);
		_Lending.deposit(tokenToRepay, amount);
	}

	/// returns tokenType amount borrowed
	function getBorrowing(address tokenType) public view returns (uint256) {
		return borrowings[msg.sender][address(tokenType)];
	}
}
