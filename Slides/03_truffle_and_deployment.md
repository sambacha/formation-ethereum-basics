# Truffle and smart contract deployment

<!-- .slide: class="page-title" -->



## Summary

<!-- .slide: class="toc" -->

- [Blockchain key concepts](#/1)
- [Ethereum basics](#/2)
- [Getting started with solidity](#/3)
- **[Truffle and smart contract deployment](#/4)**
- [Unit testing on Truffle](#/5)
- [D-apps](#/6)
- [More on Solidity](#/7)
- [Introduction to Oracles](#/8)
- [Smart contract security and blockchain cost](#/9)
- [What's next on Ethereum](#/10)



## Truffle

A framework which simplify a lot the smart contract development.

<!-- .element style="margin-top:50px"-->
It provides tooling to :

- manage your smart contract lifecycle
- automate your smart contract testing
- automate and script your smart contract deployment and migrations
- handle simply multiple ethereum network
- provide other tools like an interactive console and an external script runner

Notes :
Manage your smart contract lifecycle =>
Truffle takes care of managing your contract artifacts so you don't have to. Includes support for custom deployments, library linking and complex Ethereum applications.

Automate your smart contrac testing =>
Provide a test suite to unit test your SM in both JavaScript and Solidity

Automate and script your smart contract deployment and migrations =>
Allow you to write simple, manageable deployment scripts that acknowledge your application will change over time.

Handle simply multiple ethereum network =>
Don't manage network artifacts ever again. Let Truffle do it for you, and put your focus on dapp development where it belongs.



## Truffle demo
<!-- .element style="margin-top:150px"-->
<figure> 
    <img src="ressources/demo.png" alt="demo" height="300px"/>
</figure>



## Bytecode and ABI

A smart contracts must to be compiled to byte code before it can be deployed on the network.

The bytecode is the only format that the Ethereum Virtual Machine understands. It’s like the binary file. 

The abi is the interface of the smart contract. If the bytecode is the house, the abi is the map of the house (where the doors are located).

Those files can be obtained using a solidity compiler like `soljs` on the .sol file.



##  ABI (Application Binary Interface)

The ABI is necessary for defining how the contract can be interacted with, and how data is extracted from the raw bytes on the wire.
It describes the interface of your smart contract with all the methods and members described. The contract abstraction libraries, like web3.js, use this ABI to interact with the deployed contract. 



## Networks

Once your smart contract has been written, you must deploy it on a network.



## Ethereum mainnet

The main ethereum network where you will use real ether.

<!-- .element style="margin-top:50px"-->
The node of this network are using the `metropolis` ethereum release (3.5). 

<!-- .element style="margin-top:50px"-->
You must test your smart contracts on other testnets before deploying it on the main network.



## Ethereum testnets 1/2

*Ropsten :* 

- Official ethereum testnet with proof-of-work
- Ether can be mined
- Pros :Support both Geth and parity
- Cons : sensible to DOS attack

<!-- .element style="margin-top:50px"-->
*Kovan :*

- A proof-of-authority blockchain, started by the Parity team. 
- Ether can’t be mined, it has to be requested though a faucet
- Pros : Not sensible to DOS attack
- Cons : only support parity nodes



## Ethereum testnets 2/2

<!-- .element style="margin-top:20px"-->
*Rinkeby: * 

- A proof-of-authority blockchain, started by the Geth team. 
- Ether can’t be mined; it has to be requested though a faucet
- Pros : Not sensible to DOS attack
- Cons : only support geth nodes, getting fake ether require to post on social networks



## Ethereum devnets

<!-- .element style="margin-top:20px"-->
When creating and testing a smart contract, you are advised to use a devnet, which can be a fake ethereum network like with Ganache as we see later on. 

<!-- .element style="margin-top:50px"-->
Those networks are ideal for developping purpose as they allow you to test your contract for free, without any blokc confirmation latency.

<!-- .element style="margin-top:50px"-->
The drawbacks are that the devnet network behaviour is always similar to a regular testnet (no mining latency by instance).



## Ganache

Quickly create a test blockchain, with some account already initialized and alimented with ether, linked to a block explorer to check te results of your tests.



## Ganache démo

<!-- .element style="margin-top:150px"-->
<figure> 
    <img src="ressources/demo.png" alt="demo" height="300px"/>
</figure>



<!-- .slide: class="page-questions" -->



# TP 2 : Deploying our smart contract
<!-- .slide: class="page-tp2" -->

Notes : 
https://truffleframework.com/tutorials/using-infura-custom-provider