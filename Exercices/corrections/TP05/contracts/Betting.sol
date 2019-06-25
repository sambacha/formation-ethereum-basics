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
    struct Bet {
        address payable bettor;
        uint amount;
        uint match_id;
        bool homeVictoryBet;
        bool equalityBet;
    }

    mapping(address => Bet[]) addressesToBets;
    mapping(uint => Bet[]) matchesToBets;

    constructor() public payable{
        owner = msg.sender;
    }
  
    event MatchCreation(string _homeTeam, string _externalTeam, string _label, uint256 _date, uint _matchIDGenerator, uint _quotation);

    function createMatch(string calldata _homeTeam, string calldata _externalTeam, string calldata _label, uint256 _date, uint _quotation) external {
        require(owner == msg.sender);
        matchIDGenerator++;
        emit MatchCreation(_homeTeam, _externalTeam, _label, _date, matchIDGenerator, _quotation);
        matchs.push(Match(matchIDGenerator, _homeTeam, _externalTeam, MatchState.UNSETTLED, _label, _date, _quotation));
    }

    event MatchResolution(uint match_id, uint matchState);
    event DebugMatchResolution(uint match_id, bool homeVictory, bool equality, uint matchState);
    event BetResolution(address bettor, uint gain, uint amount, uint quotation);
    event DebugBetResolution(address bettor, uint amount, bool homeVictory, bool equality);
    function resolveMatch(uint _match_id, bool _homeVictory, bool _equality) external {   
        require(owner == msg.sender);
        Match storage currentMatch = matchs[_match_id-1];
        emit DebugMatchResolution(_match_id, _homeVictory, _equality, uint(currentMatch.matchState));
        require(currentMatch.matchState == MatchState.UNSETTLED);
        if(_homeVictory){
            currentMatch.matchState = MatchState.HOME_VICTORY;
        } else if (_equality){
            currentMatch.matchState = MatchState.EQUALITY;
        } else {
            currentMatch.matchState = MatchState.CHALLENGER_VICTORY;
        }

        Bet[] storage betsOnCurrentMatch = matchesToBets[_match_id];
        for(uint x = 0; x < betsOnCurrentMatch.length; x++ ){
            emit DebugBetResolution(betsOnCurrentMatch[x].bettor, betsOnCurrentMatch[x].amount, betsOnCurrentMatch[x].homeVictoryBet, betsOnCurrentMatch[x].equalityBet );
            if((_homeVictory && betsOnCurrentMatch[x].homeVictoryBet) || 
               (_equality && betsOnCurrentMatch[x].equalityBet) ||
                (!_homeVictory && !_equality && !betsOnCurrentMatch[x].homeVictoryBet && !betsOnCurrentMatch[x].equalityBet)){
                uint gain = (betsOnCurrentMatch[x].amount * currentMatch.quotation)/100;
                betsOnCurrentMatch[x].bettor.transfer(gain);
                emit BetResolution(
                    betsOnCurrentMatch[x].bettor, 
                    gain, 
                    betsOnCurrentMatch[x].amount, 
                    currentMatch.quotation);
            }
        }    
        emit MatchResolution(_match_id, uint(currentMatch.matchState));
    }

    event BetCreation(address bettor, bool _homeVictory, bool _equality, uint match_id, uint amount);
    
    function betOnMatch(bool _homeVictory, bool _equality, uint match_id) payable external {
        Bet memory newBet = Bet(msg.sender, msg.value, match_id, _homeVictory, _equality);
        addressesToBets[msg.sender].push(newBet);
        matchesToBets[match_id].push(newBet);
        emit BetCreation(msg.sender, _homeVictory, _equality, match_id, msg.value);
    }

    function getUserBets(address better) 
        public view returns(uint[] memory, uint[] memory, bool[] memory, bool[] memory) {
        uint[] memory amounts = new uint[](addressesToBets[better].length);
        uint[] memory match_ids = new uint[](addressesToBets[better].length);
        bool[] memory homeVictoryBets = new bool[](addressesToBets[better].length);
        bool[] memory equalityBets = new bool[](addressesToBets[better].length);
        
        for (uint i = 0; i < addressesToBets[better].length; i++) {
            Bet storage bet =  addressesToBets[better][i];
            amounts[i] = bet.amount;
            match_ids[i] = bet.match_id;
            homeVictoryBets[i] = bet.homeVictoryBet;
            equalityBets[i] = bet.equalityBet;
        }
        
        return (amounts, match_ids, homeVictoryBets, equalityBets);  
    }
}