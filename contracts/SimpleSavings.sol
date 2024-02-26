// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

// This is a simple contract that deposit fund into a contract. And also keep track of funds transferred into the contract. 

error NOT_ACCOUNT_OWNER();
error INSUFFICIENT_FUNDS();
error INVALID_AMOUNT();
error ADDRESS_ZERO_DETECTED();

contract SimpleSavings {
    address public owner;

    uint256 totalDepositInAccount; // this variable would help to kee the total amount deposited
    mapping(address => uint256) userBalance;
    mapping(address => uint256) accountBalance; // this would keep track of individual addressse's balance

    event DepositCompleted(address indexed owner, uint256 indexed _value);

    constructor(address _owner) {
        owner = _owner;
    }

    function makeDeposit(uint256 _value) external payable {

        if (msg.sender != owner) 
        revert NOT_ACCOUNT_OWNER();

        if (_value <=  0) 
        revert INVALID_AMOUNT();

        if (userBalance[msg.sender] < _value)
        revert INSUFFICIENT_FUNDS();

        userBalance[msg.sender] = userBalance[msg.sender] - _value; 
        accountBalance[msg.sender] = accountBalance[msg.sender] + _value;

        totalDepositInAccount = totalDepositInAccount + _value;

        emit DepositCompleted(msg.sender, _value);
    }

    function withdraw(uint256 _value) public {
        
        if (_value ==  0) 
        revert INVALID_AMOUNT();

        if (msg.sender != owner) 
        revert NOT_ACCOUNT_OWNER();

        if (accountBalance[msg.sender] < _value) 
        revert INSUFFICIENT_FUNDS();

        accountBalance[msg.sender] -= _value;

        payable(msg.sender).transfer(_value);
    }

    function getAllDeposit() external view returns(uint256){
        return totalDepositInAccount;
    }
}
