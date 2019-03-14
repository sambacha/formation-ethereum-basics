## TP 4 : Création et récupération des matchs

Dans votre smart contract:
- Déclarez une `struct` Match:
```
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
```

- Déclarez un tableau de Match
- Créez une fonction `external` qui permet de créer un match, de l'ajouter à notre tableau de Match et d'emmetre un évenement quand le match est créé. Faites en sorte de générer un id qui est incrémenté à la création de chaque match.
- Regarder la fonction `resolveMatch` 

- Créez un fichier pour les tests unitaires `(test/BettingTest.js)` et testez l'ajout de matchs dans le tableau.