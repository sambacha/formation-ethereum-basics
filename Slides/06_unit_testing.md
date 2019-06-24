# Unit testing

<!-- .slide: class="page-title" -->



## Summary

<!-- .slide: class="toc" -->

- [Blockchain key concepts](#/1)
- [Ethereum basics](#/2)
- [Getting started with solidity](#/3)
- [Truffle and smart contract deployment](#/4)
- **[Unit testing on Truffle](#/5)**
- [D-apps](#/6)
- [More on Solidity](#/7)
- [Introduction to Oracles](#/8)
- [Smart contract security and blockchain cost](#/9)
- [What's next on Ethereum](#/10)



## Automated unit tests and Solidity

Smart contracts ought to be thoroughly tested, because a single bug on a popular contrat can cost millions of dollars and, worst of all, cannot easily be fixed (by design).

<!-- .element style="margin-top:50px"-->
Unit tests, a process aiming to validate the good behavior of a chunk of code, is mandatory for computer software and it is a very good practive in Software Craftmanship to automate it.

<!-- .element style="margin-top:50px"-->
In Solidity, automated unit tests are even more important compulsory than in regular software because, done properly, they will validate the proper state of the contract and will trigger warning should any regression appears on the tested code.



## How to do smart contract unit test

You can create automated tests for your smart contracts in several ways :

- with Remix IDE in Solidity 
- with Truffle, in Solidity
- with Truffle in Javascript



## Testing in Javascript with Truffle

Let's take a look at a basic test : 
```Javascript
const MyContrat = artifacts.require("MyContrat");

contract("MonContrat test", async accounts => {
  it("should return 10000 when myContractFunction is called with the first account as parameter", async () => {
    let instance = await MyContrat.deployed();
    let mainAccount = accounts[0];
    let myReturnedValue = await instance.myContractFunction(mainAccount);
    assert.equal(myReturnedValue.valueOf(), 10000);
  });

  it("should maintain a counter every time myOtherFunction is called", async () => {
    let instance = await MyContrat.deployed();
    let myOtherFunctionCounterFirstValue = await instance.myOtherFunctionCounter.call();
    await instance.myOtherFunction();
    let myOtherFunctionCounterLastValue = await instance.myOtherFunctionCounter.call();
    assert.equal(myOtherFunctionCounterFirstValue + 1 , myOtherFunctionCounterLastValue, "The counter should have been incremented");
  });
});
```

Notes : Truffle unit test in Javascript are based on the Mocha Javascript framework, with a few tweeks



## Contract call

Here are several ways you can interact with the contract :
```Javascript
    let betting = await Betting.deployed(); //deploy the smart contract
    
    //call the function createMatch with 5 parameters and a final configuration object containing some optional configuration parameters for the transaction that will be sent to the blockchain
    betting.createMatch("homeTeam", "challengerTeam", "libelle", 10, 100, {
      gas: 1000000,
      from: mainAccount
    });

    // retrieve a public state variable of the contract
    let myStateVariable = await betting.myStateVariable.call();

    //should this state variable be an array 
    let myStateVariableArrayMember = await betting.myStateVariableArray.call(indexOfArrayMember);
```



## Assertions

Truffle testing framework is using the `chai` assertion framework by default.
https://www.chaijs.com/

Should
```Javascript
foo.should.be.a('string');
foo.should.equal('bar');
foo.should.have.lengthOf(3);
tea.should.have.property('flavors').with.lengthOf(3);
```

Expect
```Javascript
expect(foo).to.be.a('string');
expect(foo).to.equal('bar');
expect(foo).to.have.lengthOf(3);
expect(tea).to.have.property('flavors').with.lengthOf(3);
```

Assert
```Javascript
assert.typeOf(foo, 'string');
assert.equal(foo, 'bar');
assert.lengthOf(foo, 3)
assert.property(tea, 'flavors');
assert.lengthOf(tea.flavors, 3);
```



## Access to the blockchain information

The account are automatically initiated by Truffle.

<!-- .element style="margin-top:75px"-->
We can interact with the contract though the contract instance object.

<!-- .element style="margin-top:75px"-->
For the other informations (event, block details, timestamp, user balance...), a `web3` provider is automatically configured and allow you to communicate with the blockchain.

<!-- .element style="margin-top:75px"-->
We will see the web3.js library usage in the next chapters.



<!-- .slide: class="page-questions" -->


# TP 4 : Unit test with Truffle
<!-- .slide: class="page-tp5" -->


