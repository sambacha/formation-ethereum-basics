# TP 1 : Créer un premier smart contract sous Remix IDE

## Metamask
- Installez l'extension MetaMask et connectez vous à votre blockchain local depuis MetaMask.
- Importez un compte avec des ether.
- IMPORTANT (sinon vous ne pourrez pas récupérer les données de la blockchain dans votre application) Sous Paramètres -> Privacy & Security -> désactivez la checkbox 'Les sites Web doivent demander l'accès pour afficher les informations de votre compte'.

## Remix IDE
- Rendez vous sur https://remix.ethereum.org/
- Aller sur l'onglet `Run`, dans environnement choisissez `Injected Web3`, dans account ajouté la clé public du compte importé dans MetaMask.

## Ecriture du smart contract dans Remix IDE

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
- Ajouter une fonction createMatch qui va incrémenter un compteur de création de match.
- Créez une fonction `getMatchCount` de visibilité `view` qui permettra de récupérer le nombre de match créés.

## Déploiement et interaction avec le smart contract

- Une fois le smart contract écris, cliquez sur `Deploy` et confirmer la transaction pour déployer votre smart contract.
- Dans la partie `Deployed Contracts` vous pouvez voir les fonctions `external / view` et les attributs du contrat.
- Créez un match, acceptez la transaction et regardez ce qu'il se passe dans la console.
- Faites appel à la vue `getMatchCount`, un `call` apparait alors dans la console avec la valeur de retour de la vue.
