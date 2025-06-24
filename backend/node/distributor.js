'use strict';

import { getCAByOrg, getWallet } from "../service/contractService.js";

const org = {
    orgName: 'distributor',
    mspId: 'DistributorMSP',
    domain: 'distributor.example.com',
};

async function main() {
    try {
        const ca = getCAByOrg(org);
        const wallet = await getWallet('wallet-distributor');
        const userIdentity = await wallet.get('distributorUser');

        if (userIdentity) {
            console.log('[*] An identity for the user "distributorUser" already exists in the wallet');
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
            affiliation: 'distributor.department1',
            enrollmentID: 'distributorUser',
            role: 'client',
        }, adminUser);
        const enrollment = await ca.enroll({
            enrollmentID: 'distributorUser',
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
        await wallet.put('distributorUser', x509Identity);
        console.log('[*] Successfully registered and enrolled user "distributorUser" and imported it into the wallet');
    } catch (error) {
        console.error(`[!] Failed to register user: ${error}`);
        process.exit(1);
    }
}

main();
