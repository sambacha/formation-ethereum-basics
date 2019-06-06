# TP 5 : Gestions des paris
Dans ce TP nous allons modifier le smart contract et l'IHM de concert pour voir le processus de redéployement sur un environnemnt de développement. 

## Ajout de la gestion des paris dans le smart contract
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

Nous avons besoin de stocker ces paris.
L'idée logique que nous pourrions avoir serait de stocker un tableau de paris dans la struct `Match`, sauf que ça ne fonctionne pas et rend l'initialisation d'un match impossible.
Nous allons donc stocker ces paris à part dans une structure `mapping`.
Pour rappel, un mapping ne peut prendre que des types primitifs comme clé.

- Créez un mapping associant un tableau de pari à un match.

- Créez une fonction `betOnMatch` qui permet de parier sur un match. Cette fonction doit :
  - créer un nouveau pari en mémoire,
  - ajouter ce pari au mapping précédemment créé,
  - émettre un evénement `BetCreation` indiquant la création d'un pari en logguant les arguments passés en paramètre

Vous pouvez écrire le code dans remix ou dans votre IDE et lancer le compilateur pour le valider :
`npx truffle compile`

## Résolution des paris lors de la résolution du match

Nous allons maintenant tenir compte des paris effectués lors de la résolution du match.

Dans la méthode resolveMatch, après la mise à jour de l'état du match, ajouter le code qui va : 
   - parcourir la liste des paris associés au match et :
   - si le pari est gagnant, calculer le gain du parieur selon la formule `gain = pari.amount * match.quotation /100` puis envoyer le gain au parieur via la méthode `transfer` de l'adresse du parieur


## Récupération des paris d'un utilisateur
Nous allons maintenant créer une fonction permettant de  récupérer les paris liés à un utilisateur.

- Créez un mapping pour associer un tableau de pari à la clé publique d'un parieur,
- Modifiez la méthode `betOnMatch` afin que le pari créé soit aussi inséré dans le mapping créer précédemment,
- Créez une fonction `getUserBets` qui permet de récupérer les paris d'un utilisateur et donc voici la signature : 
```Javascript
function getUserBets(address better) 
        public view returns(uint[] memory, uint[] memory, bool[] memory, bool[] memory){

}
```  
Si vous vous demandez, pourquoi nous n'avons pas cette signature là... 
```Javascript
function getUserBets(address better) 
        public view returns(Bet[]){
}
``` 

c'est simplement, parce que vous ne pouvez pas renvoyer de tableaux de structs dans l'état actuel du langage.
Pour renvoyer les informations sur les paris dont on a besoin, il va donc falloir destructurer les paris de la manière suivante :
- initialiser quatres tableaux en `memory` contenant les informations sur les paris :
  - un tableau des montants de pari, 
  - un tableau avec les id de match, 
  - un tableau de boolean indiquant si le pari est sur une victoire,
  - un tableau de boolean indiquant si le pari est sur uneégalité
- parcourir le tableau de pari du user et, pour chaque pari, mettre, au même index, dans les quatres tableaux les informations du pari afin de pouvoir reconstituer les paris avant ces données côté front-end
- renvoyer les quatres tableaux
```Javascript
return (tab1, tab2...);
``` 

Avant de passer au branchement de ces développements dans l'IHM, validez le bon fonctionnement de ces développements en lancant les tests unitaires afin de vérifier que tout fonctionne.

Modifier ou copier le fichier de test unitaire  actualisé dans `TP_O6/test/BettingTest.js`.

Puis lancer la commande de test : 
`npx truffle test`

Maintenant que vous avez ajouter avec succès les fonctionnalités de gestion de pari, nous allons voir comment les interfacer avec l'IHM.

## Permettre aux utilisateurs de parier dans le front-end
Compléter la fonction `bet` qui va appeler la fonction `betOnMatch` de notre smart contract
Utilisez la syntaxte `contractInstance.nomMethode(args...,{params})`.
Pour envoyer de l'ether à votre contrat, utilisez le paramètre `value`.


## Récupération des paris d'un utilisateur
Nous allons maintenant débouchonner la fonction de récupération des paris liés à un utilisateur.

Cet appel prend la forme : 
```Javascript
    return new Promise((resolve, reject) => {
      this.state.ContractInstance.<appel fonction>(this.getCurrentEthereumAccountPubKey(), 
        (err, bets) => {
          //à compléter
          resolve(formattedBets)
      })
    })
```
Vous devez reconstituer les paris à partir du tableau de tableaux que vous renvoie la méthode `getUserBets`.