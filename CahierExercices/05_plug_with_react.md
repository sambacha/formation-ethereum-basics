## TP 5 : Branchement avec une application React
- Installer les dépendances npm `npm install`
- Lancer l'application `npm start`
- Dans le fichier `src/services/BetService.js`, dans le constructeur de la classe, instanciez un objet Web3 pour pouvoir vous brancher à votre blockchain: `new Web3(new Web3.providers.HttpProvider('http://localhost:8545'))`
- Récupérez la clé public du smart contract que vous avez déployé et la renseigner dans la `getBetContractPubKey`.

- Importez l'interface de votre smart contract puis à partir de cette interface créez une instance du contrat pour accèder à ses fonctions: 
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

- Créez une fonction pour créer un match en utilisant la fonction `createMatch` du smart contract.
- Créez une fonction pour résoudre un match en utilisant la fonction `resolveMatch` du smart contract.
