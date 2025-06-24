# Pharmacy Supply Chain on Hyperledger Fabric v0.0.1

This project implements a blockchain-based supply chain solution for pharmacies using **Hyperledger Fabric**.

---

## 📁 Project Structure

```
pharma/
├── backend/
│   ├── package.json
│   └── src/
│       ├── app.js
│       ├── enrolladmin.js
│       ├── eventHandler.js
│       └── fabric/
│           └── network.js
├── contract/
│   ├── package.json
│   └── index.js
└── README.md
```

---

## 🚀 Backend

- **Location:** `backend/`
- **Description:** Node.js + Express REST API that interacts with the Hyperledger Fabric network.
- **Main file:** `src/app.js`
- **Dependencies:**
    - `express`
    - `fabric-network`
    - `fabric-ca-client`
    - `cors`
    - `ws`
    - `nodemon`

---

## 🔗 Smart Contract

- **Location:** `contract/`
- **Description:** Hyperledger Fabric chaincode managing the core supply chain logic for pharmacies.
- **Main file:** `index.js`
- **Dependencies:**
    - `fabric-contract-api`
    - `fabric-shim`

---

## 🛠️ Getting Started

1. **Install dependencies** in both `backend` and `contract` directories:

   ```bash
   cd backend
   npm install

   cd ../contract
   npm install
   ```

2. **Start the backend server**:

   ```bash
   cd backend
   npm start
   ```

3. **Install Hyperledger**:

    ```bash
    curl -sSLO https://raw.githubusercontent.com/hyperledger/fabric/main/scripts/install-fabric.sh && chmod +x install-fabric.sh
    ./install-fabric.sh docker samples binary
    ```

4. **deploy the hyperledger network**:
    ```bash
    cd fabric-samples/test-network
    # Bring up the network with 2 orgs
    ./network.sh up createChannel -c pharmachannel -ca
    # Add Org3 (Manufacturer)
    ./addOrg3.sh --orgName Manufacturer --orgDomain manufacturer.example.com
    # Add Org4 (QualityControl)
    ./addOrg3.sh --orgName QualityControl --orgDomain qualitycontrol.example.com
    # Add Org5 (Distributor)
    ./addOrg3.sh --orgName Distributor --orgDomain distributor.example.com
    # Add Org6 (Pharmacy)
    ./addOrg3.sh --orgName Pharmacy --orgDomain pharmacy.example.com
    # Deploy chaincode (make sure all peers are specified as endorsers)
    ./network.sh deployCC -ccn acc-mgmt -ccp ../../chaincode -ccv 1 -ccl javascript -c pharmachannel
    cd ../../backend
    # Add/register users for each organization
    node Manufacturer.js      # Register user for Manufacturer org
    node QualityControl.js    # Register user for QualityControl org
    node Distributor.js       # Register user for Distributor org
    node Pharmacy.js          # Register user for Pharmacy org
    node Customer.js          # Register customer (can be in any org or a default one)
    ```

5. **Start the hyperledger network after stopped**:
    ```bash
    cd fabric-samples/test-network
    ./network.sh up
    ```

---

## 👥 Authors

- YC
- OM

---

## 📄 License

ISC License
