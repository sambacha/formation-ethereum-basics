pragma solidity 0.5.0;
pragma experimental ABIEncoderV2;

contract Betting{
    address public owner;

    Match[] public matchs;

    uint public matchIDGenerator = 0;

    enum MatchState {UNSETTLED,HOME_VICTORY,CHALLENGER_VICTORY, EQUALITY}

    struct Match {
        uint id;
        string homeTeam;
        string externalTeam;
        MatchState matchState;
        string label;
        uint256 date; 
        uint quotation;
    }
    
    constructor() public payable{
        owner = msg.sender;
    }
  
    event MatchCreation(string _homeTeam, string _externalTeam, string _label, uint256 _date, uint _matchIDGenerator, uint _quotation);

    function createMatch(string calldata _homeTeam, string calldata _externalTeam, string calldata _label, uint256 _date, uint _quotation) external {
        matchIDGenerator++;
        emit MatchCreation(_homeTeam, _externalTeam, _label, _date, matchIDGenerator, _quotation);
        matchs.push(Match(matchIDGenerator, _homeTeam, _externalTeam, MatchState.UNSETTLED, _label, _date, _quotation));
    }

    event ResolvedMatch(uint match_id, uint matchState);
    event debugResolvedMatch(uint match_id, bool homeVictory, bool equality, uint matchState);
    function resolveMatch(uint _match_id, bool _homeVictory, bool _equality) external {   
        Match storage currentMatch = matchs[_match_id-1];
        emit debugResolvedMatch(_match_id, _homeVictory, _equality, uint(currentMatch.matchState));
        require(currentMatch.matchState == MatchState.UNSETTLED);
        if(_homeVictory){
            currentMatch.matchState = MatchState.HOME_VICTORY;
        } else if (_equality){
            currentMatch.matchState = MatchState.EQUALITY;
        } else {
            currentMatch.matchState = MatchState.CHALLENGER_VICTORY;
        }
        emit ResolvedMatch(_match_id, uint(currentMatch.matchState));
    }
}