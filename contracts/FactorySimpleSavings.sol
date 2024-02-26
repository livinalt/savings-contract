// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import "./SimpleSavings.sol";

contract SimpleSavingsFactory {
    address[] public deployedContracts;

    event ContractDeployed(address indexed contractAddress, address indexed owner);

    function createSimpleSavings() external {
        SimpleSavings newContract = new SimpleSavings(msg.sender);
        deployedContracts.push(address(newContract));
        emit ContractDeployed(address(newContract), msg.sender);
    }

    function getDeployedContracts() external view returns (address[] memory) {
        return deployedContracts;
    }
}
