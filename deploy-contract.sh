#!/bin/bash
# deploy-contract.sh
# Script to deploy the pharma chaincode and register users as in the README
set -e

cd fabric-samples/test-network

# Deploy the chaincode
./network.sh deployCC \
  -ccn pharma \
  -ccp ../../contract \
  -ccl javascript \
  -c pharmachannel \
  -ccv 1

# Register users for Org1 and Org2
cd ../../backend/node
node node/registerOrg1User.js
node node/registerOrg2User.js
