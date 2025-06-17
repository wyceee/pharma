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

3. *(Chaincode deployment instructions to be added.)*

---

## 👥 Authors

- YC
- OM

---

## 📄 License

ISC License
