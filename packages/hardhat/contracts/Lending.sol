// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/IERC20Metadata.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import { OwnerIsCreator } from "@chainlink/contracts-ccip/src/v0.8/shared/access/OwnerIsCreator.sol";
import { MockUSDC } from "./MockUSDC.sol";

contract Lending is ReentrancyGuard, OwnerIsCreator {
	mapping(address => mapping(address => uint256)) public lendings; // depsoit address => (token => amount)

	MockUSDC usdc;
	event ApprovalNeeded(
		address indexed owner,
		address indexed spender,
		uint256 value
	);

	constructor() {}

	function getAddress() public view returns (address) {
		return address(this);
	}

	function sign() internal view returns (uint8 v, bytes32 r, bytes32 s) {
		bytes32[3] memory signature;
		assembly {
			// Signature length is 65 bytes (tightly packed uint8 v followed by 32 bytes r and 32 bytes s)
			// Check if the return data is at least 65 bytes long
			if lt(returndatasize(), 65) {
				revert(0, 0)
			}
			// Read the signature into memory
			returndatacopy(signature, 0, 65)
		}
		// v is the first byte of the signature
    		v = uint8(uint256(signature[0]));
		// r and s are 32 bytes each, and they start after the first byte (v)
		r = signature[1];
		s = signature[2];
	}

	function deposit(address tokenToLend, uint256 amountToLend) public {
		require(amountToLend > 0, "Must deposit more than 0");

		usdc = MockUSDC(tokenToLend);

		// Expiration is set to a distant future
		uint256 deadline = type(uint256).max;

		// Construct the digest using EIP-712 encoding

		// Obtain the signature
		(uint8 v, bytes32 r, bytes32 s) = sign();

		// Execute the permit function
		usdc.permit(msg.sender, address(this), amountToLend, deadline, v, r, s);

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
