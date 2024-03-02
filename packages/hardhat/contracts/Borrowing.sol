// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/draft-ERC20Permit.sol";
import { OwnerIsCreator } from "@chainlink/contracts-ccip/src/v0.8/shared/access/OwnerIsCreator.sol";
import { Lending } from "./Lending.sol";
import { MockUSDC } from "./MockUSDC.sol";

contract Borrowing is OwnerIsCreator {
	MockUSDC public usdc;

	mapping(address => mapping(address => uint256)) public borrowings; // debt address => (token => amount)

	event Borrow(
		address indexed borrower,
		address indexed token,
		uint256 amount
	);
	event Repay(
		address indexed borrower,
		address indexed token,
		uint256 amount
	);

	constructor(address mockUSDCAddress) {
		usdc = MockUSDC(mockUSDCAddress);
	}

	modifier validAmount(uint256 amount) {
		require(amount > 0, "Amount must be greater than 0");
		_;
	}

	function borrow(
		address tokenToBorrow,
		uint256 amountToBorrow
	) external validAmount(amountToBorrow) {
		require(
			borrowings[msg.sender][tokenToBorrow] == 0,
			"Already borrowing"
		);

		borrowings[msg.sender][tokenToBorrow] += amountToBorrow;

		usdc.transferFrom(address(this), msg.sender, amountToBorrow);

		emit Borrow(msg.sender, tokenToBorrow, amountToBorrow);
	}

	function repay(
		address tokenToRepay,
		uint256 amount
	) external validAmount(amount) {
		require(usdc.approve(address(this), amount), "Approval failed");

		usdc.transfer(address(this), amount);
		borrowings[msg.sender][tokenToRepay] -= amount;

		emit Repay(msg.sender, tokenToRepay, amount);
	}

	function getBorrowing(address tokenType) external view returns (uint256) {
		return borrowings[msg.sender][tokenType];
	}
}
