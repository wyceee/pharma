import { createProduct } from '../service/contractService.js';

async function run() {
    const result = await createProduct(
        'appManufacturer',         // identityName
        'TX1001',                  // batchNumber
        'test',      // ingredients
        'Pfizer',                  // manufacturer
        '2025-01-01',              // manufactureDate
        '2027-01-01'               // expiryDate
    );
    console.log('✅ Transactie uitgevoerd:', result);
}

run().catch(console.error);