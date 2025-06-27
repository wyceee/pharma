import { shipProduct } from '../service/contractService.js';

async function run() {
    const result = await shipProduct(
        'appDistributor',       // identityName
        'TX1005',               // batchNumber
        'LogiPharma',           // distributorName
        'OK (2-8°C)',           // temperatureChecks
        '2025-07-01'            // shippingDate
    );
    console.log('🚚 Product verzonden:', result);
}

run().catch(console.error);