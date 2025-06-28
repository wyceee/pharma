#!/bin/bash
set -ex

export PATH=/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin:$PATH

# Check for node
if ! command -v node >/dev/null 2>&1; then
  echo "Node.js is not installed or not in PATH!" >&2
  exit 127
fi

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
node -v
# Use absolute path to node if available
NODE_BIN=$(command -v node)
$NODE_BIN registerOrg1User.js
$NODE_BIN registerOrg2User.js
