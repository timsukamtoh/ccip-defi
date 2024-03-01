import { OwnerIsCreator } from "@chainlink/contracts-ccip/src/v0.8/shared/access/OwnerIsCreator.sol";

contract Lending is OwnerIsCreator {
	mapping(address => mapping(address => uint256)) public lendings; // depsoit address => (token => amount)

	constructor() {}

	/// deposits token to be used as collatoral to borrow on other chains
	function lend(address tokenToLend, uint256 amountToLend) public {}

	/// withdraws up to the collatorization ratio across chains
	function withdraw(
		address tokenToWithdraw,
		uint256 amountToWithdraw
	) public {}

	/// returns tokenType amount borrowed
	function getLending(address tokenType) public view returns (uint256) {
		return lendings[msg.sender][address(tokenType)];
	}
}