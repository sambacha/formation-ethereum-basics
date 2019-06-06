# TP 5 : Branchement avec une application React

## Mise en place du front-end
- Copier dans un nouveau répertoire de travail le pack de démarrage du TP5 (`workspaces/TP_05`). Ce répertoire contient un frontend react de gestion de pari. Ce front end est fonctionnal mais non lié à la blockchain.
Ici, plutôt que de lier ce front-end à un backend standard, nous allons le lier à la blockchain.

- Dans votre répertoire de travail, installer les dépendances npm via la commande `npm install`
- Lancer l'application `npm start`, votre navigateur devrait automatiquement s'ouvrir sur la page `localhost:3000`.
- Naviguer dans l'application.

Nota-bene : Si vous ne connaissez pas React, pas de panique ! Toutes les modifications que vous aurez à effectuer sur l'application sont centralisées dans le fichier `src/services/BetService.js` qui contient du pur Javascript.

## Lien de l'applicatif avec la blockchain Ethereum
- En pré-requis, Metamask doit être installé dans votre navigateur et branché sur la blockchain Ganache de test
- Dans le fichier `src/services/BetService.js`, dans le constructeur de la classe, récupérer l'objet Web3 mis à disposition par Metamask qui est l'interface qui va vous permettre de communiquer avec la blockchain branchée dans Metamask : `this.web3 = new Web3(window.web3.currentProvider)`
- Dans Ganache, récupérez l'adresse publique de votre contrat et renvoyez la dans la fonction `getBetContractPubKey`
   
## Premières interrogations de la blockchain
- Dans BetService.js, modifiez la méthode `getCurrentEthereumAccountPubKey()` et utilisez l'object Web3 ainsi instancié pour récupérez la clé publique du wallet sélectionné par Metamask. Indice, cette clé publique est récupérable à l'index O du tableau `eth.accounts`.
- Vérifier que cette information s'affiche bien dans le front-end My account -> Public Key
- Nous allons maintenant récupérer le montant d'Ether associé à ce compte Ethereum. Pour cela, modifiez la fonction getBalance, qui prend en paramètre la clé publique d'un compte et qui doit renvoyer le montant en Ether de ce compte.


## Connexion avec le smart contract

- Importez l'interface de votre smart contract, puis, à partir de cette interface, créez une instance du contrat pour accèder à ses fonctions: 
```js
import betContract from '../contracts/Betting.json'
...
constructor() {
    ...
    this.state.MyContract = window.web3.eth.contract(betContract.abi)
    this.state.ContractInstance = this.state.MyContract.at(BetService.getBetContractPubKey())
    ...
}

```

## Créer un match depuis le front-end

- Implémentez la fonction `createMatch` qui va initialiser un match dans le smart contract.
  - cette fonction doit appeler la méthode `createMatch` du smart contract,
  - le champs de formulaire quotation doit être multiplié par 100 avant d'être passé dans le smart contract car c'est un nombre décimal et Solidity ne sait pas gérer. Donc on multiplie à l'appel et on divise à l'utilisation dans le smart contract,
  - la méthode createMatch doit être appelée par le compte owner du smart contract donc il faut lui passer un object avec le paramètre `from` adéquat,
  - Documentation : https://github.com/ethereum/wiki/wiki/JavaScript-API#contract-methods

- Lancer une création de match dans le front-end,
- Allez voir l'état de votre contrat dans Ganache Contracts -> Betting -> Storage

## Récuperer et afficher les events de votre smart contract
Vous pouvez voir les events de votre smart contracts dans Ganache, mais vous pouvez aussi y accéder dans le front end.
- Pour cela, mettez tout d'abord un filtre sur les events (utiliser la méthode `allEvents`) dans la méthode `startWatchingEvents()`, avant de déclencher la surveillance de ces events à la ligne suivantes par la méthode `watch`
- - Profitez-en pour coller le code suivant dans la méthode `stopWatchingEvents` qui nous permettra de nettoyer les objets stockés à la fermeture de la page :
```Javascript
stopWatchingEvents() {
    // will stop and uninstall the filter
    this.state.eventsFilter.stopWatching()
  }
```
- Vous devez maintenant voir apparaître l'event `CreationMatch` précedemment déclenché apparaître en bas de l'ihm.

## Récupérer les matchs existants dans le front-end

Vous allez maintenant débouchonner la récupération des matchs (fonction `getMatchesToBetOn`).

Le gros problème, c'est que nous ne pouvons pas directement récupérer notre tableau de Match du smart contract car Solidity ne permets pas de renvoyer des tableaux de Structs.

Vous devez donc : 

1) Récupérer la taille du tableau via le compteur `matchIDGenerator` du smart contract,
2) Récupérer et reconstituer un à un les matchs récupérés depuis le smart contract en parcourant le tableau de match par index.

## Implémenter la fonctionnalité de résolution de match

Pour en terminer avec la gestion des matchs, nous allons maintenant d'implémenter la fonction `resolveMatch` qui permettra d'indiquer au smart contract qu'un match est terminé, ainsi que le résultat du match.

