// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import { OwnerIsCreator } from "@chainlink/contracts-ccip/src/v0.8/shared/access/OwnerIsCreator.sol";
import { MockUSDC } from "./MockUSDC.sol";

contract Lending is OwnerIsCreator {
	mapping(address => mapping(address => uint256)) public lendings; // depsoit address => (token => amount)

	constructor() {}

	function getAddress() public view returns (address) {
		return address(this);
	}

	/// deposits token to be used as collatoral to borrow on other chains
	function deposit(address tokenToLend, uint256 amountToLend) public {
		lendings[address(msg.sender)][tokenToLend] += amountToLend;
	}

	/// withdraws up to the collatorization ratio across chains
	function withdraw(
		address tokenToWithdraw,
		uint256 amountToWithdraw
	) public {
		MockUSDC usdc = MockUSDC(tokenToWithdraw);

		lendings[address(msg.sender)][tokenToWithdraw] -= amountToWithdraw;

		usdc.transfer(address(msg.sender), amountToWithdraw);
	}

	/// returns tokenType amount borrowed
	function getLending(address tokenType) public view returns (uint256) {
		return lendings[msg.sender][tokenType];
	}
}
