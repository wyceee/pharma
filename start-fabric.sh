#!/bin/bash
# start-fabric.sh
# Script to install Fabric, bring up the test network, and create the channel as in the README
set -euo pipefail

echo "🚀 Starting Fabric network setup..."

# --- Check for required tools ---
for cmd in curl docker docker-compose; do
  if ! command -v $cmd >/dev/null 2>&1; then
    echo "❌ Required command '$cmd' is not installed or not in PATH!" >&2
    exit 1
  fi
done

# --- Install Fabric binaries and samples if needed ---
if [ ! -d "fabric-samples" ]; then
  echo "📥 Downloading Hyperledger Fabric samples and binaries..."
  curl -sSLO https://raw.githubusercontent.com/hyperledger/fabric/main/scripts/install-fabric.sh
  chmod +x install-fabric.sh
  ./install-fabric.sh docker samples binary
else
  echo "✅ fabric-samples directory already exists. Skipping download."
fi

cd fabric-samples/test-network

echo "🐳 Checking Docker status..."
docker ps >/dev/null || {
  echo "❌ Docker daemon is not running or not accessible!" >&2
  exit 1
}

echo "🧹 Tearing down any previous Fabric network..."
./network.sh down || echo "⚠️ Warning: No existing network to tear down."

echo "⬆️ Bringing up new Fabric network and creating channel..."
./network.sh up createChannel -c pharmachannel -ca

echo "✅ Fabric network started successfully and channel 'pharmachannel' created."