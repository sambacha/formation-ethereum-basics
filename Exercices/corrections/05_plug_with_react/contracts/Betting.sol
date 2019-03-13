pragma solidity 0.5.0;
pragma experimental ABIEncoderV2;

contract Betting{
    address public owner;

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
    
    constructor() public payable{
        owner = msg.sender;
    }
  
    event CreateMatch(string _homeTeam, string _externalTeam, string _libelle, uint256 _date, uint _matchIDGenerator, uint _quotation);

    function createMatch(string calldata _homeTeam, string calldata _externalTeam, string calldata _libelle, uint256 _date, uint _quotation) external onlyowner {
        matchIDGenerator++;
        emit CreateMatch(_homeTeam, _externalTeam, _libelle, _date, matchIDGenerator, _quotation);
        matchs.push(Match(matchIDGenerator, _homeTeam, _externalTeam, true, true, _libelle, _date, false, _quotation));
    }

    event ResolvedBet(address bettor, uint gain, uint amount, uint quotation);
    event ResolvedMatch(uint match_id, bool homeVictory, bool equality);
    event debugResolvedMatch(uint match_id, bool homeVictory, bool equality, bool settled);
    event BetTreatment(address bettor, uint amount, bool homeVictory, bool equality);
    function resolveMatch(uint _match_id, bool _homeVictory, bool _equality) external onlyowner {
        emit ResolvedMatch(_match_id, _homeVictory, _equality);
        Match storage currentMatch = matchs[_match_id-1];
        
        emit debugResolvedMatch(_match_id, _homeVictory, _equality, currentMatch.settled);
        require(!currentMatch.settled);
        currentMatch.settled = true;
        currentMatch.homeVictory = _homeVictory;
        currentMatch.equality = _equality;
        Bet[] storage betsOnCurrentMatch = betsOnMatch[_match_id];
        for(uint x = 0; x < betsOnCurrentMatch.length; x++ ){
            emit BetTreatment(betsOnCurrentMatch[x].bettor, betsOnCurrentMatch[x].amount, betsOnCurrentMatch[x].homeVictoryBet, betsOnCurrentMatch[x].equalityBet );
            if((_homeVictory && betsOnCurrentMatch[x].homeVictoryBet) || 
               (_equality && betsOnCurrentMatch[x].equalityBet) ||
                (!_homeVictory && !_equality && !betsOnCurrentMatch[x].homeVictoryBet && !betsOnCurrentMatch[x].equalityBet)){
                uint gain = (betsOnCurrentMatch[x].amount * currentMatch.quotation)/100;
                betsOnCurrentMatch[x].bettor.transfer(gain);
                emit ResolvedBet(
                    betsOnCurrentMatch[x].bettor, 
                    gain, 
                    betsOnCurrentMatch[x].amount, 
                    currentMatch.quotation);
            }
        }    
        emit ResolvedMatch(_match_id, _homeVictory, _equality);
    }   
}