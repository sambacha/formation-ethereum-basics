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



## Serenity Phase 0

The next release of ethereum is called `Serenity`. 

This is a huge release for Ethereum as it will introduce a new consensus algorithm (Casper FFG) and sharding capabilities.

It will happened in 3 phases :

- Phase 0: deployment of the `beacon chain`,  scheduled to be released around the end of 2019 / beginning of 2020
  - a new chain will be setted up, using Proof-of-Stake. This chain would handle transactions for a while,
  - validators will secure the `beacon chain` after depositing 32 Ethers on a specific smart contract.



## Serenity Phase 1

- Phase 1 : introduction of 1024 shard chains, release date TBD
  - shards will be managed by the beacon chain and are destined to contain smart contract and execute transactions,
  - Still no transactions execution at this point.



## Serenity Phase 2

- Phase 2 : deployment of the transaction execution engine (eWASM). Full POS Blockchain enabled and usable. Release date TBD
  - The ethereum team expects to multiply by 1000 the number of transactions per second with those changes.



## eWASM

WebAssembly (or Wasm as a contraction) is a new, portable, size- and load-time-efficient format. WebAssembly aims to execute at native speed by taking advantage of common hardware capabilities available on a wide range of platforms. WebAssembly is currently being designed as an open standard by a W3C Community Group.

<!-- .element style="margin-top:50px"-->
eWASM (Ethereum Flavoured WebAssembly) is an execution environment, based on a restricted subset of Webassembly. It will replace the EVM used currently.

<!-- .element style="margin-top:50px"-->
Not only will it activate the POS Ethereum chain and enable transactions on this chain, but it will also allow developpers to use a lot of differents languages to implement smart-contracts (Rust, C++...).



## Ethereum roadmap

End of 2019 at best : Serenity Phase 0

<!-- .element style="margin-top:50px"-->
Likely around 2021 : Serenity Phase 2 and fully functionnal Ethereum 2.0 POS and scaled blockchain
