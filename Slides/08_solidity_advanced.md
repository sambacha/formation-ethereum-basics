# Solidity advanced features

<!-- .slide: class="page-title" -->



## Summary

<!-- .slide: class="toc" -->

- [Blockchain key concepts](#/1)
- [Ethereum basics](#/2)
- [Getting started with solidity](#/3)
- [Truffle and smart contract deployment](#/4)
- [Unit testing on Truffle](#/5)
- [D-apps](#/6)
- **[More on Solidity](#/7)**
- [Introduction to Oracles](#/8)
- [Smart contract security and blockchain cost](#/9)
- [What's next on Ethereum](#/10)



## Block and Transaction Properties

<!-- .element style="margin-top:20px"-->
*block.blockhash(uint blockNumber) returns (bytes32)*: hash of the given block - only works for 256 most recent

*block.coinbase (address)*: current block miner’s address

*block.difficulty (uint)*: current block difficulty

*block.gaslimit (uint)*: current block gaslimit

*block.number* (uint): current block number

*block.timestamp* (uint): current block timestamp as seconds since unix epoch

<!-- .element style="margin-top:50px"-->
*msg.data* (bytes): complete calldata

*msg.sender* (address): sender of the message (current call)

*msg.value* (uint): number of wei sent with the message

<!-- .element style="margin-top:50px"-->
*tx.gasprice* (uint): gas price of the transaction

*tx.origin* (address): sender of the transaction (full call chain)



## The msg struct

Automatically available in every functions.
Contains the following attributes :
- value : the amount of ether attached to the transaction. By default this amount is credited to the smart contract account 
- sender : struct representing the the public address of the transaction sender



## Memory management

Storage location can only be given for array or struct types.
        uint memory matchId = getMatchID();
Because array and struct type are always passed as reference but uint are passed as id



## Storage variables

Persisted values between contract calls

<!-- .element style="margin-top:50px"-->
Much more expensive than memory so use only if you have to.

<!-- .element style="margin-top:50px"-->
A contract’s storage variables are the ones which define your contract’s state and are only changed by sendTransaction calls

<!-- .element style="margin-top:50px"-->
Every account has a persistent key-value store mapping 256-bit words to 256-bit words called storage stored in a patricia tree



## Memory variables

Not persisted after the method call

<!-- .element style="margin-top:50px"-->
Generally cheaper to use than storage variables (more costly the larger it grows)

<!-- .element style="margin-top:50px"-->
You will get a lot of compilation issues due to incompatibility between storage and memory variables. 



## Storage issues

```Javascript
contract StructArrayInitWrong {
  struct Room {
    address[] guests;       
  }  
  Room[] rooms;

  function createRoom() public {
    address[] adr;
    adr.push(msg.sender);
    Room memory room = Room(adr);   
    rooms.push(room);
  }

  function getRoomsLength() view returns (uint) {
    return rooms.length;
  }
}

```

When you call the createRoom function, both adr and rooms will have a lenght of two.
Why ? 

Notes :

Due to the storage being uninitialized, the compiler didn't know where to put the dynamic array adr[] so it put it in the first slot. So it's stomping on rooms[].
Since rooms also happens to be a dynamic array, it too uses the first word to describe the array length. Thus, we get the strange observed behavior ... push on to one array, then on to the other, and poof! - both arrays have length 2.



##Stack

EVM does not have the concept of registers. 

<!-- .element style="margin-top:50px"-->
A virtual stack is being used instead for operations such as parameters for the opcodes. 

<!-- .element style="margin-top:50px"-->
The EVM uses 256-bit values from that virtual stack. It has a maximum size of 1024 elements.
If an transaction overflow this stack, it will automically by reverted and won't be able to finish.



## Limitation

You can't return struct in public function
```Javascript
contract Foo {
    mapping (bytes32 => Thing) things;

    struct Thing {
        Item[] items;
    }

    struct Item {
        uint number;
    }

    function Foo(bytes32 id) {
        Thing memory thing = Thing();
        things[id] = thing;
    }
}
```

The compiler does not yet support copying memory struct arrays to storage.

So 
```Javascript
things[id] = thing;
```
will fail



## Events

Events are used to log datas in ongoing function execution.
Useful for debugging.

The syntax is : 

```javascript
event <eventName>([<type> value1] [, <type> value2]...);
```

To trigger a event : 

```javascript
emit <eventName>(value1, value2);
```


## Event example

To trace a function call :

```javascript
event CoolFunctionCalled(uint param1, string param2);

function coolFunction(uint param1, string param2) {
  emit CoolFunctionCalled(param1, param2);
  // and thedo cool stuff
}
```



## Modifiers

Modifiers are used to modify the behavior of functions.
This allows us to add functionality before, after or even around the invocation of the function. 

<!-- .element style="margin-top:50px"-->
Modifiers are very similar to before/after/around hooks in other programming languages.



## Modifiers example : owner

```javascript
contract Owned {

  address private owner;

  modifier onlyOwner() {
      require(msg.sender == owner);
      _;
  }

  /// @notice The Constructor assigns the message sender to be `owner`
  function Owned() {
      owner = msg.sender;
  }

  function changeOwner(address _newOwner) onlyOwner {

      newOwner = _newOwner;

  }
}
```

Notes :
In this example, the contract keep its owner in a state variable on creation (when the function Owned is called) and define a modifier onlyOwner which is checking if the msg.sender is the owner. This modifier is use to prevent anyone but the owner to call the function changeOwner, for instance.

The _; part is equivalent to a yield. It's signaling solidity to execute the code of the wrapped function inside the modifier. So onlyOwner is a precondition. You can place those characters at the beginning or in the middle of the modifier code to obtain an after or around modifier.

The contract Owned can be inherited by another contract.



## Fallback function

A smart contract can have exactly one unnamed function.

<!-- .element style="margin-top:50px"-->
This function will be invoked when a call to the contract is made and none of the other functions match the given function identifier.

<!-- .element style="margin-top:50px"-->
A common use for fallback functions is when Ether is being transferred to the contract. No functions are called but this triggers the invocation of the fallback function anyway. 

```Javascript
contract MyContract{
  function() payable public { }
}
```


## Payable modifiers

`payable` : tell the compiler that the transaction triggering this function will have some ether attached to it. This is to protect us from accidentally sending ether to a contract that doesn’t expect it.

<!-- .element style="margin-top:50px"-->
When sending Ether as part of a function call, the function must be marked as payable.

<!-- .element style="margin-top:50px"-->
When sending Ether directly to a contract, its fallback function must be marked as payable.

<!-- .element style="margin-top:50px"-->
If no such function exists, the contract cannot receive Ether through regular transactions.



## Contract-related variables

*this* (current contract’s type):
the current contract, explicitly convertible to Address

*selfdestruct*(address recipient):
destroy the current contract, sending its funds to the given Address



## Mathematical and Cryptographic Functions

Some useful method : 

<!-- .element style="margin-top:50px"-->
```Javascript
addmod(x, y, k);
```
compute (x + y) % k where the addition is performed with arbitrary precision and does not wrap around at 2\*\*256. 

<!-- .element style="margin-top:50px"-->
```Javascript
mulmod(x, y, k);
```
compute (x \* y) % k where the multiplication is performed with arbitrary precision and does not wrap around at 2\*\*256.

<!-- .element style="margin-top:50px"-->
```Javascript
keccak256(...);
sha3(...);
sha256(...);
```

compute the Ethereum-SHA-3 (Keccak-256) or the SHA-256 hash of the  arguments



## Error Handling

You can interrupt the transaction treatment should some requirements were missing.

```Javascript
assert(condition);
```
invalidates the transaction if the condition is not met - to be used for internal errors.

```Javascript
require(condition);
```
reverts if the condition is not met - to be used for errors in inputs or external components.

```Javascript
require(condition, 'message erreur');
```
reverts if the condition is not met - to be used for errors in inputs or external components. Also provides an error message.

```Javascript
revert();
```
abort execution and revert state changes

```Javascript
revert('reason');
```
abort execution and revert state changes, providing an explanatory string



<!-- .slide: class="page-questions" -->



# TP 7 : Adding the betting functionality
<!-- .slide: class="page-tp5" -->