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



# TP : Our smart contract on Truffle

<!-- .slide: class="page-tp3" -->



# Networks

Once your smart contract has been written, you must deploy it on a network.



## Bytecode

A smart contracts must to be compiled to byte code before it can be deployed on the network. 



##  ABI (Application Binary Interface)

The ABI is necessary for defining how the contract can be interacted with, and how data is extracted from the raw bytes on the wire.



## Ganache

Quickly create a test blockchain, with some account already initialized and alimented with ether, linked to a block explorer to check te results of your tests.



# TP 4 : Deploying our smart contract
<!-- .slide: class="page-tp4" -->



<!-- .slide: class="page-questions" -->