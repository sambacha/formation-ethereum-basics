# TP 3 : Initialiser un projet Truffle et créer un premier smart contract

## Mise en place d'un environnement de développement

- Installer votre IDE préféré, nous avons personnellement une préférence pour Visual Studio Code avec les extensions Docker, ESLint, Solidity, Solidity Extended et Solidity-solhint installées.

See : https://code.visualstudio.com/docs/editor/extension-gallery

- Installer la dernière version de npm

## Mise en place de Truffle
- Installer truffle `npm install --save-dev truffle`
- Initialiser un projet truffle `npx truffle init`
Cette commande va créer l'arborescence suivante : 

`contracts` : les fichiers solidity contenant vos smart contracts,

`migrations` : un répertoire contenant des scripts de migration permettant de gérer le déploiement incrémental de vos smart contracts,

`test`: les sources des tests unitaires de vos contrats,

`truffle-config.js` : fichier de configuration du projet Truffle


- Dans le fichier `truffle-config.js`, prendre connaissance des informations présentes et ajouter la pair clé / valeur suivante: `contracts_build_directory: "src/contracts"` dans l'objet `module.exports`. Cela nous permet de définir le dossier cible des contrats compilés
- Copier le premier smart contract `Betting.sol` du TP 2 dans le répertoire : `contracts` à la racine de votre projet. 
- Créer un fichier `2_deploy_contracts.js` dans le répertoire `migrations` contenant le script de déploiement suivant :
```Javascript
var Betting = artifacts.require("./Betting.sol");

module.exports = function(deployer) {
  deployer.deploy(Betting);
};
```  
- Compilez votre smart contract avec la commande `npx truffle compile`, et regarder le fichier compilé dans `src/contracts`.

## Installation et lancement de Ganache
- Installer Ganache sur votre poste de travail : `https://truffleframework.com/ganache`
- Lors de l'installation, choisir l'option `Create workspace` et lui indiquer le chemin vers votre fichier `truffle-config.js`.
- Lancer la blockchain de développement Ganache sur le port par défaut `7545`.


## Déployer votre smart contract sur la blockchain Ganache
- Deployez votre smart contract sur votre blockchain local avec la commande `npx truffle deploy --reset --contracts_build_directory=./src/contracts`.
- Avec Ganache verifiez que votre smart contract a bien été déployé.

TODO: deploiement sur TESTNET