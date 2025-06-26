export const roleMap = {
    Manufacturer: {
        org: {
            orgName: 'org1',
            mspId: 'Org1MSP',
            domain: 'org1.example.com'
        },
        identityName: 'appManufacturer',
        walletDir: 'node/wallet/org1'
    },
    Distributor: {
        org: {
            orgName: 'org2',
            mspId: 'Org2MSP',
            domain: 'org2.example.com'
        },
        identityName: 'appDistributor',
        walletDir: 'node/wallet/org2'
    }
};