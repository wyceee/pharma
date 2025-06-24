'use strict';

import { getCAByOrg, getWallet } from "../service/contractService.js";

const org = {
    orgName: 'manufacturer',
    mspId: 'ManufacturerMSP',
    domain: 'manufacturer.example.com',
};

async function main() {
    try {
        const ca = getCAByOrg(org);
        const wallet = await getWallet('wallet-manufacturer');
        const userIdentity = await wallet.get('manufacturerUser');

        if (userIdentity) {
            console.log('[*] An identity for the user "manufacturerUser" already exists in the wallet');
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
            affiliation: 'manufacturer.department1',
            enrollmentID: 'manufacturerUser',
            role: 'client',
        }, adminUser);
        const enrollment = await ca.enroll({
            enrollmentID: 'manufacturerUser',
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
        await wallet.put('manufacturerUser', x509Identity);
        console.log('[*] Successfully registered and enrolled user "manufacturerUser" and imported it into the wallet');
    } catch (error) {
        console.error(`[!] Failed to register user: ${error}`);
        process.exit(1);
    }
}

main();
