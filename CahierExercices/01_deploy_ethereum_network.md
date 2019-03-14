# TP 1 : Deploy a local parity devnet

In this TP, we will create an ethereum network of 3 nodes, using the **parity** ethereum node and Docker.

Fisrt of all, generate the configuration for your network.

Get the parity deploy script on : https://github.com/paritytech/parity-deploy

Launch the script ./parity-deploy.sh --config aura
With a docker container 
 docker run -it --mount src="$(pwd)",target=/scripting-repo,type=bind  slauncher /bin/bash

Exit from the container Crtl + D

Command list

cd /scripting-repo
su - 
apt-get update
apt-get install sudo
exit
sudo apt-get install curl
sudo apt-get install wget
sed -i -e 's/\r$//' clean.sh
sed -i -e 's/\r$//' ./config/utils/keygen.sh
sed -i -e 's/\r$//' parity-deploy.sh

./parity-deploy.sh --config aura

Once parity-deploy has been run it will generate configuration files which are kept in the deployment folder. There are a few subdirectories that may exist in this location:

deployment/chain - this contains chain information such as spec file (spec.json) and other files like the reserved_peers file.

deployment/is_authority - this directory contains the configuration for an instant sealing authority. It has key.priv (private key file), key.pub (public key file), address.txt (pre-created authority address), password (plain text password file) and authority.toml (authority's parity config file).

deployment/client - this directory contains the configuration for an instant sealing client. It has key.priv (private key file), key.pub (public key file), address.txt (pre-created client address), password (plain text password file) and client.toml (client's parity config file).

deployment/[1/2/3] - these directories are used when you are using multiple aura validators - It has key.priv (private key file), key.pub (public key file), address.txt (pre-created authority address), password (plain text password file) and authority.toml (authority's parity config file).

All of these nodes are then added to the to the chains/reserved_peers file.

Description docker-compose.yml

This composer file is launching parity with the following parameters :
--chain /home/parity/spec.json : a json file which is describing the --config /home/parity/authority.toml -d /home/parity/data 

Description ./deployment/chain/spec.json

"name": "parity",

The chain name will be parity


"engine": {
    "authorityRound": {
        "params": {
            "stepDuration": "2",
            "validators" : {
                "list": [ "0x0e29d31a1866c1f4fde90a3edd7016fc8786bfdb" ]
            }
        }
    }
},

The consensus mecanism will be proof of authority.
It will be handled by 1 validator.

Description  ./deployment/chain/reserved_peers
Description  ./deployment/1/password
Description  ./deployment/1/authority.toml
Description  ./deployment/1/${NETWORK_NAME}
Description  ./config/dev.json
Description  ./deployment/1/key.priv
Description  ./data/1

docker volume create --driver=local --opt o=uid=1000 --opt type=tmpfs --opt device=tmpfs paritydb