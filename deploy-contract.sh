#!/bin/bash
set -ex

export PATH=/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin:$PATH

cd fabric-samples/test-network
pwd
ls -l

# Deploy the chaincode
./network.sh deployCC \
  -ccn pharma \
  -ccp ../../contract \
  -ccl javascript \
  -c pharmachannel \
  -ccv 1

cd ../../backend/node
pwd
ls -l
which node
echo $PATH
node -v
node registerOrg1User.js
node registerOrg2User.js