# Smart contract security and blockchain costs

<!-- .slide: class="page-title" -->



## Sommaire

<!-- .slide: class="toc" -->

- [Blockchain key concepts](#/1)
- [Ethereum basics](#/2)
- [Getting started with solidity](#/3)
- [Truffle and smart contract deployment](#/4)
- [Unit testing on Truffle](#/5)
- [D-apps](#/6)
- [More on Solidity](#/7)
- [Introduction to Oracles](#/8)
- **[Smart contract security and blockchain cost](#/9)**
- [What's next on Ethereum](#/10)



## You cannot fix a smart contract

As we saw earlier, a buggy smart contract is not fixable, by design.

<!-- .element style="margin-top:50px"-->
This implies that your smart contract must be truly bug free before deploying it on the mainnet.

<!-- .element style="margin-top:50px"-->
To do so : 

- first, test intensively your smart contract on the devnet, with extensive test coverage
- make sure that your dev team knows the following securities measures by heart : https://consensys.github.io/smart-contract-best-practices
- then, deploy your smart contract on a testnet and setup a bug bounty to discover bugs
- audit your smart contract by some automated tools or expert smart contract analysts.



## Consider that your smart contract will be flawed

Any non-trivial contract will have errors in it. Your code must, therefore, be able to respond to bugs and vulnerabilities gracefully.

- Pause the contract when things are going wrong ('circuit breaker')
- Manage the amount of money at risk (rate limiting, maximum usage)
- Have an effective upgrade path for bugfixes and improvements



## Currently using Ethereum main network cost a lot

The most simple transaction call on a mainnet smart contract can cost you aroung one dollar depending on the gaz price. 

<!-- .element style="margin-top:50px"-->
So keep your usage of the blockchain only focused on the part that really need decentralization.

<!-- .element style="margin-top:50px"-->
And store a maximum of datas of chain when you can.