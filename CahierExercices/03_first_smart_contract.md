## TP 3 : Initialiser un projet Truffle et créer un premier smart contract

- Installer truffle `npm install --save-dev truffle`
- Initialiser un projet truffle `npx truffle init`
- Dans le fichier `truffle-config.js`, prendre connaissance des informations présentes et ajouter la pair clé / valeur suivante: `contracts_build_directory: "src/contracts"`. Cela nous permet de définir le dossier cible des contrats compilés
- Créer un premier smart contract: `contracts/Betting.sol`. Contenu de ce Smart Contract :

```
pragma solidity 0.5.0;
pragma experimental ABIEncoderV2;

contract Betting{
    address public owner;

    constructor() public payable{
        owner = msg.sender;
    }
  
}
```

- Compilez votre smart contract avec la commande `npx truffle compile`, et regarder le fichier compilé.
- Deployez votre smart contract sur votre blockchain local avec la commande `npx truffle deploy --reset --contracts_build_directory=./src/contracts`
- Avec Ganache verifiez que votre smart contract a bien été déployé.

TODO: deploiement sur TESTNET