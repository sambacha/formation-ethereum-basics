pragma solidity >=0.5.0 <0.7.0;
pragma experimental ABIEncoderV2;

contract Betting{
    address public owner;

    constructor() public payable{
        owner = msg.sender;
    }

    uint public matchIDGenerator = 0;
    
    function createMatch() external {
        matchIDGenerator++;
    }
    function getMatchsCount() public view returns(uint) { return matchIDGenerator; }
}