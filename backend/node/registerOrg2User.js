import path from 'path';
import { buildCAClient, registerAndEnrollUser, buildWallet } from '../service/contractService.js';

async function main() {
    try {
        const ccpPath = path.resolve(
            path.dirname(new URL(import.meta.url).pathname),
            '../../fabric-samples/test-network/organizations/peerOrganizations/org2.example.com/connection-org2.json'
        );
        const caClient = await buildCAClient(ccpPath, 'ca.org2.example.com');
        // Use a dedicated wallet directory for Org2
        const wallet = await buildWallet(path.join(path.dirname(new URL(import.meta.url).pathname), 'wallet/org2'));

        // ⚡️ IMPORTANT: Explicitly specify the admin ID and secret for Org2
        await registerAndEnrollUser(caClient, wallet, 'Org2MSP', 'appDistributor', 'org2.department1', 'admin', 'adminpw');

        console.log('✅ Successfully registered and enrolled appDistributor for Org2!');
    } catch (error) {
        console.error(`❌ Failed to register appDistributor for Org2: ${error}`);
        process.exit(1);
    }
}

main();