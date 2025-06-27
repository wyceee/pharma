# Pharmacy Supply Chain on Hyperledger Fabric

A full-stack blockchain application for tracking pharmaceutical products through the supply chain, built on Hyperledger Fabric. This project demonstrates secure, transparent, and auditable product movement from manufacturer to distributor using smart contracts, a Node.js backend, and a Vue 3 frontend.

---

## Table of Contents
- [Overview](#overview)
- [Architecture](#architecture)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Setup & Installation](#setup--installation)
- [Usage](#usage)
- [Smart Contract](#smart-contract)
- [Backend API](#backend-api)
- [Frontend](#frontend)
- [Testing](#testing)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

---

## Overview
This project simulates a pharmaceutical supply chain, allowing manufacturers to register products, and distributors to ship and track them. It leverages Hyperledger Fabric for blockchain-backed data integrity and traceability.

## Architecture
- **Smart Contract (Chaincode):** Defines product lifecycle, shipment, and verification logic on the blockchain.
- **Backend (Node.js/Express):** REST API server that interacts with the chaincode and manages authentication.
- **Frontend (Vue 3):** User interface for manufacturers and distributors to manage products and shipments.

## Features
- Register new pharmaceutical products (manufacturer)
- Ship products to distributors
- Track product status and history
- Role-based authentication (manufacturer/distributor)
- Blockchain-backed audit trail
- Responsive, modern UI

## Tech Stack
- **Blockchain:** Hyperledger Fabric
- **Smart Contract:** JavaScript (pharmaContract.js)
- **Backend:** Node.js, Express
- **Frontend:** Vue 3, Vite, TypeScript
- **Database:** Blockchain ledger (no off-chain DB)

## Setup & Installation
### Prerequisites
- Node.js (v16+ recommended)
- npm or yarn
- Docker & Docker Compose
- Hyperledger Fabric samples (included as submodule/folder)

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
# 1️⃣ Bring up the test network and create the channel
cd fabric-samples/test-network
docker ps                      # Ensure Docker is running
./network.sh down              # (Optional) Tear down any old network
./network.sh up createChannel -c pharmachannel -ca
        
# 2️⃣ Deploy the chaincode
# This works for Org1 and Org2 in the official test network
# Adjust the path and names accordingly
./network.sh deployCC \
-ccn pharma \
-ccp ../../contract \
-ccl javascript \
-c pharmachannel \
-ccv 1
        
# 3️⃣ Register users for the available organizations
# (Org1 and Org2 only, using official test-network connections.)
cd ../../backend/node
node registerOrg1User.js
node registerOrg2User.js
 ```

### 5. **Start the hyperledger network after stopped**:
```bash
cd fabric-samples/test-network
./network.sh down
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
- Register as a manufacturer or distributor
- Add products, ship them, and track their status

---

## Smart Contract
- Located in `contract/pharmaContract.js`
- Handles product registration, shipment, and verification
- Implements chaincode interface for Hyperledger Fabric

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

---

## Testing
- Backend test scripts in `backend/test/`
- Smart contract tests in `contract/test/`
- Use Postman or the frontend UI to test API endpoints

---

## Project Structure
```
pharma/
├── backend/         # Node.js/Express API server
├── contract/        # Hyperledger Fabric chaincode
├── frontend/        # Vue 3 frontend
├── fabric-samples/  # Hyperledger Fabric test network
└── README.md
```

---

## Contributing
Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

---

## License
[MIT](LICENSE)
