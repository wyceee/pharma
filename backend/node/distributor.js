'use strict';

import { shipProduct } from '/backend/service/contractService';

export async function shipProductForDistributor(batchNumber, distributor, temperatureChecks, shipDate) {
    // 'distributor' is the identity name in the wallet
    return await shipProduct('distributor', batchNumber, distributor, temperatureChecks, shipDate);
}

