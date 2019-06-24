# TP 1 : Deploy a local parity devnet

In this TP, we will create an ethereum network of 3 nodes, using the **geth** ethereum node and Docker.

## Install Docker
Get the docker installer available on the USD drive.


## Launch Docker


A step by step guide to create an ethereum private blockchain.
1) Create a genesis block, hou can do it manually or use a genesis block generator.
It looks like this :
```
{
  "config": {
    "chainId": <mychainid>,
    <fork indicators and other parameters>
  "alloc": {
    "3590aca93338b0721966a8d0c96ebf2c4c87c544": {
      "balance": "0x200000000000000000000000000000000000000000000000000000000000000"
    },
    "8cc5a1a0802db41db826c2fcb72423744338dcb0": {
      "balance": "0x200000000000000000000000000000000000000000000000000000000000000"
    }
  },
  "number": "0x0",
  "gasUsed": "0x0",
  "parentHash": "0x0000000000000000000000000000000000000000000000000000000000000000"
}

The chainId and the alloc part are very important. You can set any chainId you want (just try to avoid a number inferior to 1000). This will separate your blockchain from the other ethereum blockhains.

And the alloc part will attribute some initial coin to the specified account. Here, we are giving a lot of fake ether to two accounts 3590aca93338b0721966a8d0c96ebf2c4c87c544 and 8cc5a1a0802db41db826c2fcb72423744338dcb0.

```
2) Create a bootnode. The bootnode role is to provide new nodes with a list a initial node to connect with.
An executable bootnode is provides with the ethereum distribution.

First you need to generate a private key to give an id to the bootnode. To do so :
```
bootnode -genkey bootnode.key
```

You can launch it with :
bootnode -nodekeyhex $nodekeyhex
<nodekeyhex> being a private key stored in the nodekeyhex file.
The node id will by a public key derived from the specified private key.

3) Launch a first miner.
```
geth --bootnodes "enode://$bootnodeId@$bootnodeIp:30301" --networkid "6660001" --verbosity=4  --syncmode=full --mine --gasprice "0" --etherbase $address --unlock $address --password ~/.accountpassword
```

--bootnodes : with this paramater, you specify the bootnode you will use. The bootnode will store your ip and your node id for futures nodes.

--networkid : the networkId is used to isolate your network from other networks as connections between nodes are valid only if peers have identical protocol version and network ID. The network id must be the one you specified in the genesis block.

--syncmode : full will create a full node which will store every single block of the blockchain

--mine : launch the node in miner mode, it will validate block

--gazprice : setup a threshold under which your miner won't process and even propagate a transaction with a gaz price inferior to the threshold  

--etherbase : all the ether earns by the miner when he will successfully mines blocks will be credited to this address

--unlock : the unlock parameter will allow your miner to make transactions if need be

--password : the password is needed to unlock the miner account

4) Launch a second miner the wame way with another adress

5) And launch a third node, not in mining mode but with some api endpoint to interrogate it with a Dapp : 

```
geth --bootnodes "enode://$bootnodeId@$bootnodeIp:30301" --networkid "6660001"  --rpc --rpcaddr "0.0.0.0" --rpcapi "eth,web3,net,admin,debug,db" --ipcapi "eth,net,web3" --rpccorsdomain "*" --syncmode="full"
```
--rpc, --rpcaddr, --rpcapi : enable the HTTP RPC interface to communicate with the current node on http in json. This interface will allow to interact with the node using a Dapp (get transaction informations, get node informations...) 
There are several api that you can enable with those flags as the miner api. 

--rpccorsdomain : indicates the domain names allowed to request our node, useful when we wish to call our node from *localhost*.

--ipcapi : allow to request some APIs though IPC (unix socket)



5) Finally you can starts an webapp called ethstat monitor to check on your blockchain. We can use  The Ethereum (centralised) network status monitor (known sometimes as "eth-netstats") to monitor your nodes.

You can clone its git repository and launch it with the following commands : 
```
git clone https://github.com/cubedro/eth-netstats
cd eth-netstats
npm install
sudo npm install -g grunt-cli
```
