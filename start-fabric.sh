#!/bin/bash
# start-fabric.sh
# Script to install Fabric, bring up the test network, and create the channel as in the README
set -e

# Download and install Fabric binaries, docker images, and samples if not already present
if [ ! -d "fabric-samples" ]; then
  curl -sSLO https://raw.githubusercontent.com/hyperledger/fabric/main/scripts/install-fabric.sh && chmod +x install-fabric.sh
  ./install-fabric.sh docker samples binary
fi

cd fabric-samples/test-network

docker ps # Ensure Docker is running

./network.sh down # (Optional) Tear down any old network
./network.sh up createChannel -c pharmachannel -ca
