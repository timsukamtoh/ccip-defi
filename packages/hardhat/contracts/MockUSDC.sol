// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol";

contract MockUSDC is ERC20, ERC20Burnable, Ownable, ERC20Permit {
	constructor() ERC20("MockUSDC", "MKU") Ownable() ERC20Permit("MockUSDC") {}

	function mint(address to, uint256 amount) public onlyOwner {
		_mint(to, amount);
	}

	function decimals() public view virtual override returns (uint8) {
		return 6; // Custom decimal value
	}
}
