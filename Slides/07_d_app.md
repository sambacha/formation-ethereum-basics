# D-app

<!-- .slide: class="page-title" -->



## Summary

<!-- .slide: class="toc" -->

- [Blockchain key concepts](#/1)
- [Ethereum basics](#/2)
- [Getting started with solidity](#/3)
- [Truffle and smart contract deployment](#/4)
- [Unit testing on Truffle](#/5)
- **[D-apps](#/6)**
- [More on Solidity](#/7)
- [Introduction to Oracles](#/8)
- [Smart contract security and blockchain cost](#/9)
- [What's next on Ethereum](#/10)



## The big picture

<figure> 
    <img src="ressources/D_app_structure.svg" alt="D-app structure" height="550px"/>
</figure>

Notes :
To interact with a blockchain in a webapp, making it a D-app, you have to create a bridge between the blockchain and the browser.
This bridge is Metamask, an wallet installed as a browser extension.
Metamask will handle your identity (it is a wallet) and will handle locally your private key
Metamask provide an Ethereum API (in Javascript), allowing you to communicate with the network configure in Metamask.
Metamask can handle any ethereum network (main, testnet or local).
The Ethereum API will be use by most Ethereum JS lib like web3.js to handle blockchain communication.
Web3.js wrap the Ethereum API and offers a very convenient and simple way to interact with contracts in Javascript code.



## Metamask

<figure> 
    <img src="ressources/metamask.png" alt="metamask" height="300px"/>
</figure>

MetaMask is the easiest way to interact with dapps in a browser.

Metamak is two things at once : 

- an online wallet (storing your keys on LocalStorage)
- a bridge between a regular browser and an Ethereum blockchain.



## Metamask

<!-- .element style="margin-top:50px"-->
It's available in the form of a browser extension for Chrome, Firefox, Opera or Brave.
And it will allow you to interact with an Ethereum network without running a full node on the browser's machine.

<!-- .element style="margin-top:50px"-->
It can connect to the main Ethereum network, any of the testnets (Ropsten, Kovan, and Rinkeby), or a local blockchain such as the one created by Ganache or Truffle Develop.

<!-- .element style="margin-top:50px"-->
The code is open-sourced.



## Infura

<figure> 
    <img src="ressources/infura.png" alt="infura" height="300px"/>
</figure>

*Infura* is a hosted Ethereum node cluster that lets your users run your application without requiring them to set up their own Ethereum node or wallet.

<!-- .element style="margin-top:50px"-->
Metamask use Infura to connect with Ethereum.



## Web3 js

*Web3.js* is a Javascript library that you can had to any Javascript project.

<!-- .element style="margin-top:50px"-->
In provide a lot of tools to easily interact with ethereum contracts : 

- *web3.version* : information about all the used libraries version
- *web3.eth* : contains all the API needed to communicate with an ethereum blockchain
- *web3.eth.contract* : contract abstraction, provide simple and explicit way to communicate with a smart contract



## Initialize the provider

To initialize Web3, you have to provide it an Ethereum API provider.

This provider will be given by Metamask or Mist browser if you use it.

```Javascript
if (typeof web3 !== 'undefined') {
    web3 = new Web3(web3.currentProvider);
} else {
    // set the provider you want from Web3.providers
    web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
}
```

<!-- .element style="margin-top:50px"-->
This code saying that if web3 is defined in the browser (this will be our case), then we'll use that as our provider. If it's undefined (else), we can manually specify the provider ourselves.



## Creating the contract interface

To interact with a contract already deployed on a blockchain, you have to create an interface that wraps your contract ABI into a javascript object.

```Javascript
import myContractAbi from './somwhereOnMyWebapp/MyContract.json';
...
var myContractInterface = web3.eth.contract(myContractAbi);
```

This interface allows you to interact easily with any contract matching the provided ABI on the blokchain.

<!-- .element style="margin-top:50px"-->
To interact with a given contract, just create an contract object by providing its address.

```Javascript
var myContract = myContractInterface.at('my_contract_public_adress');
```

Notes : You can then demonstrate this use of this object, by logging it and showing that all the smart contract methods are available on it.
 


## Contract objet usage : call external methods

When you call an external method on your smart contract, you will change the internal state of the contract, and, by extension, the state of the entire blockchain.

<!-- .element style="margin-top:50px"-->
Therefore, you need to send a transaction to the contract.

```Javascript
myContractInstance.theExternalMethod.sendTransaction(param1 [, param2, ...] [, transactionConfiguration] [, callback]);
```

- *paramX* : all the parameters you need to call your method, separated by commas, optionnal
- *transactionConfiguration* : a javascript object containing some transaction configuration parameters, optionnal
- *callback* : a javascript function handling the return of your call 

Notes : beware, the return of an external function is a transaction id,
not the object you return in the smart contract



## Contract objet usage : the transaction configuration object

You can add some extra configuration to the call using the transaction configuration object.

<!-- .element style="margin-top:50px"-->
Here a some parameters you can set : 

- *from*: String, 20 Bytes - address of the sender.
- *to*: String, 20 Bytes - address of the receiver. null when its a contract creation transaction.
- *value*: BigNumber - value transferred in Wei.
- *gasPrice*: BigNumber - gas price provided by the sender in Wei.
- *gas*: Number - gas provided by the sender.
- *input*: String - the data sent along with the transaction.



## Contract objet usage : the callback function

A callback function in Javascript is a function that gets called after the completion an asynchronous request, with the result of the call as its parameters. This concept is widely used in Javascript.

<!-- .element style="margin-top:50px"-->
A callback function looks like a regular function, the parameters depends of the function using it.

<!-- .element style="margin-top:50px"-->
For a transaction call, the callback usually looks like that : 
```Javascript
function(error, result){
    if(!error)
        {
            console.log(result);
        }
    else
        console.error(error);
}
```

Notes : no promises, for now but it will be available on future releases



## Contract objet usage : call viewable methods

Reminder : a viewable method is a read-only function on your smart contract that doesn't change its state. Therefore, no transaction is created when calling such a method.

<!-- .element style="margin-top:50px"-->
To call explicitly a viewable method on your smart contract, use the *call* keyword after the method name : 
```Javascript
myContract.theReadOnlyMethod.call(function (err, result) {});
```



## Contract objet usage : the easiest way to call method

This syntax will automatically determines the use of call or sendTransaction based on the method type

```Javascript
myContractInstance.myMethod(param1 [, param2, ...] [, transactionConfiguration] [, callback]);
```

- *paramX* : all the parameters you need to call your method, separated by commas, optionnal
- *transactionConfiguration* : a javascript object containing some transaction configuration parameters, optionnal
- *callback* : a javascript function handling the return of your call 



## Useful eth method : get accounts

This property returns an array of addresses controlled by client.

```Javascript
web3.eth.accounts
web3.eth.getAccounts(callback(error, result){ ... }) // async

//example
var accounts = web3.eth.accounts;
console.log(accounts); // ["0x407d73d8a49eeb85d32cf465507dd71d507100c1"]
```

<!-- .element style="margin-top:50px"-->
*Get account selected in Metamask :*
```Javascript
web3.eth.accounts[0]
```



## Useful eth method : get balance

This method returns a BigNumber instance of the current balance for the given address in wei. 

```Javascript
web3.eth.getBalance;

web3.eth.getBalance(addressHexString [, defaultBlock] [, callback]);

var balance = web3.eth.getBalance("0x407d73d8a49eeb85d32cf465507dd71d507100c1");
console.log(balance); // instanceof BigNumber
console.log(balance.toString(10)); // '1000000000000'
console.log(balance.toNumber()); // 1000000000000
```

*Parameters* :

- addressHexString : String - The address to get the balance of.
- defaultBlock : Number|String - (optional) If you pass this parameter it will not use the default block set with web3.eth.defaultBlock.
- callback : Function - (optional) If you pass a callback the HTTP request is made asynchronous. 



## Balance convertion

All the balances are expressed in Wei. This is very unconvenient especially in D-App.

<!-- .element style="margin-top:50px"-->
Web3 offers some utiliy methods to convert to and from Wei.

<!-- .element style="margin-top:50px"-->
*Convert your weis in any other unit :* 

```Javascript
web3.fromWei(wei_amount, unit)
```

<!-- .element style="margin-top:50px"-->
*Convert any other unit to Weis :*

```Javascript
web3.toWei(unit_amount, unit)
```

<!-- .element style="margin-top:50px"-->
*Unit* can be : 'Kwei', 'Mwei', 'Gwei', 'Shannon', 'Szabo', 'Finney','Ether','Kether', 'Mether', 'Gether', 'Tether'



## Retrieving the events from the smart contract

Get an specific event from the smart contract : 

```Javascript
var event = myContractInstance.myEvent([filterObject] [, additionalFilterObject] , function(error, result){
 if (!error)
   console.log(result);
});
```

*Parameters*

- **filterObject** - Object - Indexed return values you want to filter the logs by, e.g. {'valueA': 1, 'valueB': [myFirstAddress, mySecondAddress]}. By default all filter values are set to null. It means, that they will match any event of given type sent from this contract.
- **additionalFilterObject** - Object - Additional filter options, see filters parameter 1 for more. By default filterObject has field 'address' set to address of the contract. Also first topic is the signature of event.
- **Function** - (optional) If you pass a callback as the last parameter it will immediately start watching and you don't need to call myEvent.watch(function(){}). 



# TP 6 : Link the Smart Contract with a webapp

<!-- .slide: class="page-tp6" -->