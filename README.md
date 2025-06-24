# Pharmacy Supply Chain on Hyperledger Fabric v0.0.1

This project implements a blockchain-based supply chain solution for pharmacies using **Hyperledger Fabric**.

---

## 📁 Project Structure

```
soon
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
    # 1️⃣ Bring up the network and create the channel
    cd fabric-samples/test-network
    ./network.sh up createChannel -c pharmachannel -ca
    
    # 2️⃣ Add additional organizations
    ./addOrg3.sh --orgName Manufacturer --orgDomain manufacturer.example.com
    ./addOrg3.sh --orgName Distributor --orgDomain distributor.example.com
    ./addOrg3.sh --orgName Pharmacy --orgDomain pharmacy.example.com
    
    # 3️⃣ Deploy the chaincode
    ./network.sh deployCC -ccn pharma -ccp ../../contract -ccl javascript -c pharmachannel -ccv 1
    
    # 4️⃣ Register users for each organization
    cd ../../backend/node
    node manufacturer.js
    node distributor.js
    node pharmacy.js
    ```

5. **Start the hyperledger network after stopped**:
    ```bash
    cd fabric-samples/test-network
    ./network.sh up
    ```

---

## 👥 Authors

- Yusuf Çalik
- Orhan Işık

---

## 📄 License

ISC License
