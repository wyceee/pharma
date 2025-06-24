'use strict';

import { createProduct } from '/backend/service/contractService';

export async function createProductForManufacturer(batchNumber, ingredients, manufacturer, manufactureDate, expiryDate) {
    // 'manufacturer' is the identity name in the wallet
    return await createProduct('manufacturer', batchNumber, ingredients, manufacturer, manufactureDate, expiryDate);
}
