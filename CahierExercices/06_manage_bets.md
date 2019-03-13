## TP 5 : Gestions des paris
- Dans le smart contract, créez une `struct` Bet
```
struct Bet {
    address payable bettor;
    uint amount;
    uint match_id;
    bool homeVictoryBet;
    bool equalityBet;
}
```
- Créez deux `mapping`, un pour récupérer tous les paris d'un utilisateur et un pour récupérer les paris lié à un match.
- Créez une fonction `getUserBets` qui permet de récupérer les paris d'un utilisateur.
- Créez une fonction `getMatchIdsByBetter`
- Créez une fonction `betOnMatch` qui permet de parier sur un match.

### Côté front-end dans le fichier `BetService`
- Créez une fonction `bet`qui va appeler la fonction `betOnMatch` de notre smart contract
- Créez une fonction `getMatchesToBetOn` qui va appeler la fonction `getMatchesToBetOn` de 