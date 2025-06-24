'use strict';

import { inspectRecords } from '/backend/service/contractService';

export async function inspectRecordsForPharmacy(batchNumber, pharmacy, inspectionDate, remarks) {
    // 'pharmacy' is the identity name in the wallet
    return await inspectRecords('pharmacy', batchNumber, pharmacy, inspectionDate, remarks);
}
