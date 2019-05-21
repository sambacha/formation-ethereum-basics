pragma solidity >=0.5.0 <0.7.0;
pragma experimental ABIEncoderV2;

contract Betting{
    address public owner;

    constructor() public payable{
        owner = msg.sender;
    }
    Match[] public matchs;

    uint public matchIDGenerator = 0;
    
    struct Match {
        uint id;
        string homeTeam;
        string externalTeam;
        bool homeVictory;
        bool equality;
        string libelle;
        uint256 date; 
        bool settled;
        uint quotation;
    }
    event MatchCreation(string _homeTeam, string _externalTeam, string _libelle, uint256 _date, uint _matchIDGenerator, uint _quotation);

    function createMatch(string calldata _homeTeam, string calldata _externalTeam, string calldata _libelle, uint256 _date, uint _quotation) external {
        matchIDGenerator++;
        emit MatchCreation(_homeTeam, _externalTeam, _libelle, _date, matchIDGenerator, _quotation);
        matchs.push(Match(matchIDGenerator, _homeTeam, _externalTeam, true, true, _libelle, _date, false, _quotation));
    }
    function getMatchsCount() public view returns(uint) { return matchs.length; }
}