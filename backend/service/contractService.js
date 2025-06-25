'use strict';

import FabricCAServices from 'fabric-ca-client';
import {Gateway, Wallets} from 'fabric-network';
import fs from 'fs';
import path from 'path';
import {fileURLToPath} from 'url';

const defaultOrg = {
    orgName: 'org1',
    mspId: 'Org1MSP',
    domain: 'org1.example.com',
};

export function getCCP() {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const networkPath = "../../fabric-samples/test-network/organizations/peerOrganizations/org1.example.com/"

    // Get the network configuration
    const ccpPath = path.resolve(__dirname, `${networkPath}/connection-org1.json`);
    const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));

    return ccp;
}

// New: Get CCP for any org
export function getCCPByOrg(org = defaultOrg) {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const networkPath = `../../fabric-samples/test-network/organizations/peerOrganizations/${org.domain}/`;
    const ccpPath = path.resolve(__dirname, `${networkPath}/connection-${org.orgName}.json`);
    const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));
    return ccp;
}

export function getCA() {
    const caURL = getCCP().certificateAuthorities['ca.org1.example.com'].url;
    const ca = new FabricCAServices(caURL);

    return ca;
}

// New: Get CA for any org
export function getCAByOrg(org = defaultOrg) {
    const ccp = getCCPByOrg(org);
    const caKey = Object.keys(ccp.certificateAuthorities)[0];
    const caURL = ccp.certificateAuthorities[caKey].url;
    const ca = new FabricCAServices(caURL);
    return ca;
}

export async function initLedger() {
    const { contract, gateway } = await getContract('admin');
    await contract.submitTransaction('initLedger');
    console.log('Ledger has been initialized');
    await gateway.disconnect();
}

export async function getWallet(walletDir = 'wallet') {
    const walletPath = path.join(process.cwd(), walletDir);
    return await Wallets.newFileSystemWallet(walletPath);
}

async function getContract(identityName, org = defaultOrg) {
    let walletDir;
    if (identityName === 'appManufacturer') {
        walletDir = 'node/wallet/org1';
    } else if (identityName === 'appDistributor') {
        walletDir = 'node/wallet/org2';
    } else {
        throw new Error(`No wallet path configured for identity "${identityName}"`);
    }

    const wallet = await getWallet(walletDir);
    const identity = await wallet.get(identityName);

    if (!identity) {
        throw new Error(`An identity for the user "${identityName}" does not exist in the wallet. Run the registerUser.js application before retrying`);
    }

    const gateway = new Gateway();
    await gateway.connect(getCCPByOrg(org), {
        wallet,
        identity: identityName,
        discovery: { enabled: true, asLocalhost: true }
    });

    const network = await gateway.getNetwork('pharmachannel');
    const contract = network.getContract('pharma');
    return { contract, gateway };
}

export async function createProduct(identityName, batchNumber, ingredients, manufacturer, manufactureDate, expiryDate) {
    const { contract, gateway } = await getContract(identityName);
    try {
        const result = await contract.submitTransaction('createProduct', batchNumber, ingredients, manufacturer, manufactureDate, expiryDate);
        return result.toString();
    } finally {
        await gateway.disconnect();
    }
}

export async function getProduct(identityName, batchNumber) {
    const { contract, gateway } = await getContract(identityName);
    try {
        const result = await contract.evaluateTransaction('getProduct', batchNumber);
        return result.toString();
    } finally {
        await gateway.disconnect();
    }
}

export async function shipProduct(identityName, batchNumber, distributor, temperatureChecks, shipDate) {
    const { contract, gateway } = await getContract(identityName);
    try {
        const result = await contract.submitTransaction('shipProduct', batchNumber, distributor, temperatureChecks, shipDate);
        return result.toString();
    } finally {
        await gateway.disconnect();
    }
}

export async function inspectRecords(identityName, batchNumber, pharmacy, inspectionDate, remarks) {
    const { contract, gateway } = await getContract(identityName);
    try {
        const result = await contract.submitTransaction('inspectRecords', batchNumber, pharmacy, inspectionDate, remarks);
        return result.toString();
    } finally {
        await gateway.disconnect();
    }
}

// Utility: Build CA Client from a Connection Profile
export async function buildCAClient(ccpPath, caHostName) {
    const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));
    const caInfo = ccp.certificateAuthorities[caHostName];
    return new FabricCAServices(
        caInfo.url,
        {
            trustedRoots: caInfo.tlsCACerts.pem,
            verify: false,
        },
        caInfo.caName
    );
}

// Utility: Register and Enroll User
export async function registerAndEnrollUser(caClient, wallet, orgMspId, userId, affiliation, adminUserId = 'admin', adminSecret = 'adminpw') {
    // 1️⃣ Check if user already exists
    const userIdentity = await wallet.get(userId);
    if (userIdentity) {
        console.log(`ℹ️ User ${userId} already exists in the wallet`);
        return;
    }

    // 2️⃣ Check if the Admin already exists
    let adminIdentity = await wallet.get(adminUserId);
    if (!adminIdentity) {
        console.log(`ℹ️ Admin user ${adminUserId} not found in the wallet. Enrolling now...`);
        const enrollment = await caClient.enroll({
            enrollmentID: adminUserId,
            enrollmentSecret: adminSecret,
        });
        adminIdentity = {
            credentials: {
                certificate: enrollment.certificate,
                privateKey: enrollment.key.toBytes(),
            },
            mspId: orgMspId,
            type: 'X.509',
        };
        await wallet.put(adminUserId, adminIdentity);
    }

    // 3️⃣ Get Admin User Context
    const provider = wallet.getProviderRegistry().getProvider('X.509');
    const adminUser = await provider.getUserContext(adminIdentity, adminUserId);

    // 4️⃣ Register the New User
    const secret = await caClient.register({
        affiliation,
        enrollmentID: userId,
        role: 'client',
    }, adminUser);

    // 5️⃣ Enroll New User
    const userEnrollment = await caClient.enroll({
        enrollmentID: userId,
        enrollmentSecret: secret,
    });
    const userIdentityData = {
        credentials: {
            certificate: userEnrollment.certificate,
            privateKey: userEnrollment.key.toBytes(),
        },
        mspId: orgMspId,
        type: 'X.509',
    };
    await wallet.put(userId, userIdentityData);

    console.log(`✅ Successfully registered and enrolled user "${userId}" and imported it into the wallet`);
}

// Utility: Build a new wallet for storing identities
export async function buildWallet(walletPath) {
    return await Wallets.newFileSystemWallet(walletPath);
}
