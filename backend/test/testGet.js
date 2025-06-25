import { getProduct } from '../service/contractService.js';

async function run() {
    const result = await getProduct('appManufacturer', 'TX1001');
    console.log('📦 Product gevonden:', result);
}

run().catch(console.error);