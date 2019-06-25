# (Optional) TP 6 : Deploy a local private geth devnet

In this TP, we will create an ethereum network of 3 nodes, using the **geth** ethereum node and Docker.

## Install Docker
Get the docker installer available on the USD drive.


## Launch the network using Docker

```
docker-compose up -d 
```

You can check the logs to see if everything is ok : 
'''
docker-compose logs
'''

You can now open your web browser on the `http://localhost:8080` url to see the ethstat interface of your network.

You will notice that the webapp doesn't display any informations.

This is because it is not yet plugged to one of your private blockchain node.

The docker compose has launched a node with rpc api opened on port `8548`.

Plug Metamask to this node.
