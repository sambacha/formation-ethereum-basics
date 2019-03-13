# What's next on Ethereum

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
- [Smart contract security and blockchain cost](#/9)
- **[What's next on Ethereum](#/10)**



## Ethereum POS : Casper

2 implementations : 
- Friendly-Finality-Gadget (mix POW/ POS)
- Correct-By-Construction (POS)

Notes : POs in two steps to avoid any big bang and introduce this huge change slowly



## Friendly-Finality-Gadget (mix POW/ POS) 

Smart contract layer for POS over POW network

You become a validator by depositing 1500 ether !!! on this smart contract

You can then vote on next block. The blocks get elected with 2/3 of the voting weight

Epoch : checkpoint every 50 blocks

POw mine blocks and pos validate checkpoints at any Epochs (every 50 blocks)

finality achieved when two consecutive checkpoint receive 2/3 votes



## Ethereum roadmap

Mid-2019 : Casper POS 
2020 : Sharding