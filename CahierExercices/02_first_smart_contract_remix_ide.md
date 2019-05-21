## TP 2 : Initialiser un projet Truffle et créer un premier smart contract

### Metamask
- Installez l'extension MetaMask et connectez vous à votre blockchain local depuis MetaMask.
- Importez un compte avec des ether.

### Remix IDE
- Rendez vous sur https://remix.ethereum.org/
- Aller sur l'onglet `Run`, dans environnement choisissez `Injected Web3`, dans account ajouté la clé public du compte importé dans MetaMask.


### Ecriture du smart contract dans Remix IDE

- Créer un premier smart contract avec un constructeur :

```
pragma solidity >=0.5.0 <0.7.0;
pragma experimental ABIEncoderV2;

contract Betting{
    address public owner;

    constructor() public payable{
        owner = msg.sender;
    }
  
}
```
- Compilez ce smart contract
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

- Déclarez un tableau de Match public
- Créez un event `matchCreation` qui va afficher les paramètres  `homeTeam`, `externalTeam`, `homeVictory`, `equality`, `libelle` , `date` et `quotation` passés à la fonctionnalité de création de match 
- Créez cette fonction de création de match qui aura une visibilité `external` et qui va permettre de créer un match, de l'ajouter à notre tableau de Match et d'émettre un évenement `matchCreation` quand le match est créé. 
- Faites en sorte de générer un id qui est incrémenté à la création de chaque match.
- Créez une fonction `getMatchCount`de visibilité `view` qui permettra de récupérer le nombre de match créés.

### Déploiement et interaction avec le smart contract
- Une fois le smart contract écris, cliquez sur `Deploy` et confirmer la transaction pour déployer votre smart contract.
- Dans la partie `Deployed Contracts` vous pouvez voir les fonctions external / view et les attributs du contrat.
- Créez un match, acceptez la transaction et regardez ce qu'il se passe dans la console.
- Faites appel à la vue `getMatchLength`, un `call` apparait alors dans la console avec la valeur de retour de la vue.
