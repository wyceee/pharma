'use strict';

import { getCAByOrg, getWallet } from "../service/contractService.js";

const org = {
    orgName: 'pharmacy',
    mspId: 'PharmacyMSP',
    domain: 'pharmacy.example.com',
};

async function main() {
    try {
        const ca = getCAByOrg(org);
        const wallet = await getWallet('wallet-pharmacy');
        const userIdentity = await wallet.get('pharmacyUser');

        if (userIdentity) {
            console.log('[*] An identity for the user "pharmacyUser" already exists in the wallet');
            return;
        }

        const adminIdentity = await wallet.get('admin');
        if (!adminIdentity) {
            console.log('[*] An identity for the admin user "admin" does not exist in the wallet');
            console.log('[*] Run the enrollAdmin.js application before retrying');
            return;
        }

        const provider = wallet.getProviderRegistry().getProvider(adminIdentity.type);
        const adminUser = await provider.getUserContext(adminIdentity, 'admin');

        const secret = await ca.register({
            affiliation: 'pharmacy.department1',
            enrollmentID: 'pharmacyUser',
            role: 'client',
        }, adminUser);
        const enrollment = await ca.enroll({
            enrollmentID: 'pharmacyUser',
            enrollmentSecret: secret,
        });
        const x509Identity = {
            credentials: {
                certificate: enrollment.certificate,
                privateKey: enrollment.key.toBytes(),
            },
            mspId: org.mspId,
            type: 'X.509',
        };
        await wallet.put('pharmacyUser', x509Identity);
        console.log('[*] Successfully registered and enrolled user "pharmacyUser" and imported it into the wallet');
    } catch (error) {
        console.error(`[!] Failed to register user: ${error}`);
        process.exit(1);
    }
}

main();
