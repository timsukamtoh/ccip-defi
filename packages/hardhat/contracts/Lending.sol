// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/IERC20Metadata.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import { OwnerIsCreator } from "@chainlink/contracts-ccip/src/v0.8/shared/access/OwnerIsCreator.sol";
import { MockUSDC } from "./MockUSDC.sol";

contract Lending is ReentrancyGuard, OwnerIsCreator {
	MockUSDC public usdc;
	mapping(address => mapping(address => uint256)) public lendings; // deposit address => (token => amount)

	event Deposit(
		address indexed account,
		address indexed token,
		uint256 amount
	);
	event Withdrawal(
		address indexed account,
		address indexed token,
		uint256 amount
	);

	constructor() {}

	modifier validAmount(uint256 amount) {
		require(amount > 0, "Amount must be greater than 0");
		_;
	}

	modifier hasSufficientBalance(
		address account,
		address token,
		uint256 amount
	) {
		require(lendings[account][token] >= amount, "Insufficient balance");
		_;
	}

	function deposit(
		address tokenToLend,
		uint256 amount
	) external validAmount(amount) {
		// Transfer the tokens and update the lending mapping
		require(
			IERC20(tokenToLend).transferFrom(msg.sender, address(this), amount),
			"Failed to deposit"
		);
		lendings[msg.sender][tokenToLend] += amount;

		// Emitting event
		emit Deposit(msg.sender, tokenToLend, amount);
	}

	function withdraw(
		address tokenToWithdraw,
		uint256 amountToWithdraw
	)
		external
		hasSufficientBalance(msg.sender, tokenToWithdraw, amountToWithdraw)
	{
		usdc = MockUSDC(tokenToWithdraw);
		// Transfer the tokens and update the lending mapping
		usdc.transferFrom(address(this), msg.sender, amountToWithdraw);
		lendings[msg.sender][tokenToWithdraw] -= amountToWithdraw;

		// Emitting event
		emit Withdrawal(msg.sender, tokenToWithdraw, amountToWithdraw);
	}
}
