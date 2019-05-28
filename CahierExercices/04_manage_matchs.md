# TP 4 : Création et récupération des matchs
Nous allons maintenant aller plus loin dans l'implémentation du smart contract.
Ce TP a pour but d'interagir avec des structures de données plus complexes et de vous montrer comment tester votre smart contract

## Implémentation de la fonctionnalité de création de match

- Déclarez une enum `MatchState` qui contiendra les états suivants de match : 
  - `UNSETTLED`,
  - `HOME_VICTORY`,
  - `CHALLENGER_VICTORY`, 
  - `EQUALITY`

- Déclarez une `struct` Match représentant un match:
```Javascript
struct Match {
    uint id;              //the match id
    string homeTeam;      //the name of the home team
    string externalTeam;  //the name of the external team
    MatchState matchState;//the match state
    string label;       // the label of the match
    uint256 date;         // the date the match will take place
    uint quotation;       // a number that will influence the gain if you win your bet on the match
}
```

- Déclarez un tableau de Match public
- Créez un event `matchCreation` qui va afficher les paramètres  `homeTeam`, `externalTeam`, `libelle` , `date` et `quotation` passés à la fonctionnalité de création de match 
- Compléter la fonction de création de match qui aura une visibilité `external` et qui va permettre de créer un match, de l'ajouter à notre tableau de Match et d'émettre un évenement `matchCreation` quand le match est créé. 
- Utiliser le mot clé `require` afin que seul le propriétaire du smart contract puisse appeler cette fonction.

# Mise en place des tests unitaires

- Copier le fichier `workspaces/TP_04/BettingTest.js` dans le répertoire `test`.
Ce fichier a déjà une première fonction de tests unitaires en place.
- Lancer les tests unitaires sur le smart contract via la commande :
`npx truffle test`


# Résolution du match

- Ajouter au smart-contract la fonction `resolveMatch` qui va permettre de résoudre le match. Le code de cette fonction est le suivant (workspaces/TP_04/resolveMatch.sol) :  

```Javascript
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
```
- Comprenez ce que fait cette fonction (l'utilisation du mot clé `storage`, le `require`).

- En vous inspirant du test unitaire existant, mettez en place un test unitaire pour cette nouvelle fonction. Ce test unitaire doit : 
  - déployer le smart contract sur la blockchain de dév
  - créer un match
  - le résoudre en indiquant une victoire du challenger
  - vérifier que le statut du match est victoire du challenger après résolution


