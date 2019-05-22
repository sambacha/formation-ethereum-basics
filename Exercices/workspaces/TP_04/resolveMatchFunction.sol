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