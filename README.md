<p align="center">
  <img src="frontend/src/assets/Pharma.png" alt="PharmaChain Logo" width="200"/>
</p>

# 🌐[Live demo](https://pharmachain-hva.xyz)

A full-stack blockchain application for tracking pharmaceutical products through the supply chain, built on Hyperledger Fabric. This project demonstrates secure, transparent, and auditable product movement from manufacturer to distributor using smart contracts, a Node.js backend, and a Vue 3 frontend.

---

## Table of Contents
- [Overview](#overview)
- [Architecture](#architecture)
- [Project Structure](#project-structure)
- [Features](#features)
- [Setup & Installation](#setup--installation)
- [Usage](#usage)
- [Smart Contract](#smart-contract)
- [Backend API](#backend-api)
- [Frontend](#frontend)
---

## Overview
This project simulates a pharmaceutical supply chain, allowing manufacturers to register products, and distributors to ship and track them. It leverages Hyperledger Fabric for blockchain-backed data integrity and traceability.

## Architecture
- **Smart Contract (Chaincode):** Defines product lifecycle, shipment, and verification logic on the blockchain.
- **Backend (Node.js/Express):** REST API server that interacts with the chaincode and manages authentication.
- **Frontend (Vue 3):** User interface for manufacturers and distributors to manage products and shipments.

## Project Structure
```
pharma/
├── .github/         # GitHub Actions CI/CD workflows for automated deployment & network hosting
├── backend/         # Node.js/Express API server
├── contract/        # Hyperledger Fabric chaincode
├── frontend/        # Vue 3 frontend
├── fabric-samples/  # Hyperledger Fabric test network
└── README.md
```

## Features
- Register new pharmaceutical products (manufacturer)
- Ship products to distributors
- Track product status and history
- Role-based authentication (manufacturer/distributor)
- Blockchain-backed audit trail
- Responsive, modern UI
- CI/CD pipelines for automated deployment on a hosted environment

## Setup & Installation
### Prerequisites
- Node.js (v16+ recommended)
- npm
- Docker & Docker Compose

### 1. Clone the Repository
```sh
git clone https://github.com/wyceee/pharma
cd pharma
```

### 2. Install Dependencies
#### Backend
```sh
cd backend
npm install
```
#### Frontend
```sh
cd frontend
npm install
```

### 3. Start Hyperledger Fabric Network
```bash
curl -sSLO https://raw.githubusercontent.com/hyperledger/fabric/main/scripts/install-fabric.sh && chmod +x install-fabric.sh
./install-fabric.sh docker samples binary
```

### 4. Deploy Smart Contract
```bash
# Bring up the test network and create the channel
cd fabric-samples/test-network
docker ps                    # Make sure Docker is running
./network.sh down            # (Optional) Remove any old network
./network.sh up createChannel -c pharmachannel -ca

# Deploy chaincode
./network.sh deployCC \
  -ccn pharma \
  -ccp ../../contract \
  -ccl javascript \
  -c pharmachannel \
  -ccv 1

# Register application users
cd ../../backend/node
node registerOrg1User.js
node registerOrg2User.js
```

### 5. Generate Backend .env File
Create a `.env` file in the `backend` directory with the following content:

```env
SECRET_KEY=<get_this_from_admin>
```

### 6. Start Backend Server
```sh
cd backend
node server.js
```

### 7. Start Frontend
```sh
cd frontend
npm run dev
```

---

## Usage
- Access the frontend at [http://localhost:5173](http://localhost:5173)
- Log in as a manufacturer or distributor
- Add products, ship them, and track their status
- Check the docker logs for tx output

---

## Smart Contract
- Located in `contract/pharmaContract.js`
- Handles product registration, shipment, and verification
- Implements chaincode interface for Hyperledger Fabric
- `contactservice.js` in the backend provides utility functions for interacting with the chaincode

## Backend API
- Located in `backend/`
- Key endpoints:
  - `/api/auth` - Authentication
  - `/api/product` - Product management
  - `/api/distribute` - Shipment management
- Uses Fabric SDK to interact with the blockchain

## Frontend
- Located in `frontend/`
- Vue 3 + Vite + TypeScript
- Key components:
  - `Product.vue` - Product registration
  - `Shipment.vue` - Shipping products
  - `Dashboard.vue` - Track and view product status
  - `Auth.vue` - User authentication
  - `apiConfig.js` - API configuration for backend calls depending on environment

---
