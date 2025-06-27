import { shipProduct } from '../service/contractService.js';

async function run() {
    const result = await shipProduct(
        'appDistributor',       // identityName
        'TX1003',               // batchNumber
        'LogiPharma',           // distribibutorName
        'OK (2-8°C)',           // temperatureChecks
        '2025-07-01'            // shippingDate
    );
    console.log('🚚 Product verzonden:', result);
}

run().catch(console.error);