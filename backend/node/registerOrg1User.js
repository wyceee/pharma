import path from 'path';
import { buildCAClient, registerAndEnrollUser, buildWallet } from '../service/contractService.js';

async function main() {
    try {
        const ccpPath = path.resolve(
            path.dirname(new URL(import.meta.url).pathname),
            '../../fabric-samples/test-network/organizations/peerOrganizations/org1.example.com/connection-org1.json'
        );
        const caClient = await buildCAClient(ccpPath, 'ca.org1.example.com');
        // Use a dedicated wallet directory for Org1
        const wallet = await buildWallet(path.join(path.dirname(new URL(import.meta.url).pathname), 'wallet/org1'));
        await registerAndEnrollUser(caClient, wallet, 'Org1MSP', 'appManufacturer', 'org1.department1', 'admin', 'adminpw');
        console.log('✅ Successfully registered and enrolled appManufacturer for Org1!');
    } catch (error) {
        console.error(`❌ Failed to register appManufacturer for Org1: ${error}`);
        process.exit(1);
    }
}

main();