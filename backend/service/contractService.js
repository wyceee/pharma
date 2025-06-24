'use strict';

import FabricCAServices from 'fabric-ca-client';
import { Gateway, Wallets } from 'fabric-network';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

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
    const wallet = await Wallets.newFileSystemWallet(walletPath);

    return wallet;
}

async function getContract(identityName, org = defaultOrg, walletDir = 'wallet') {
    const wallet = await getWallet(walletDir);
    const identity = await wallet.get(identityName);

    if (!identity) {
        throw new Error(`An identity for the user "${identityName}" does not exist in the wallet. Run the registerUser.js application before retrying`);
    }

    const gateway = new Gateway();
    await gateway.connect(getCCPByOrg(org), { wallet, identity: identityName, discovery: { enabled: true, asLocalhost: true } });
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
