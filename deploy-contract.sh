#!/bin/bash
set -ex

# --- Add all common bin paths explicitly ---
export PATH=/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin:$PATH

# --- Check if node is installed ---
if ! command -v node >/dev/null 2>&1; then
  echo "❌ Node.js is not installed or not in PATH!" >&2
  exit 127
fi

# --- Find absolute path to node binary ---
NODE_BIN=$(command -v node)
echo "✅ Using node binary at: $NODE_BIN"
$NODE_BIN -v

# --- Deploy chaincode ---
cd fabric-samples/test-network
echo "📄 Current directory: $(pwd)"
ls -l

./network.sh deployCC \
  -ccn pharma \
  -ccp ../../contract \
  -ccl javascript \
  -c pharmachannel \
  -ccv 1

# --- Register application users ---
cd ../../backend/node
echo "📄 Current directory: $(pwd)"
ls -l

$NODE_BIN registerOrg1User.js
$NODE_BIN registerOrg2User.js

echo "✅ Smart contract deployment and user registration complete!"