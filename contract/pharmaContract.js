'use strict';

const { Contract } = require('fabric-contract-api');

class PharmaContract extends Contract {
    // Check if the invoker is an admin of Org1 or Org2
    _isAdmin(ctx) {
        const mspId = ctx.clientIdentity.getMSPID();
        const enrollmentId = ctx.clientIdentity.getAttributeValue('hf.EnrollmentID');

        const allowed = [
            { msp: 'Org1MSP', id: 'appManufacturer' },
            { msp: 'Org2MSP', id: 'appDistributor' }
        ];

        return allowed.some(entry => entry.msp === mspId && entry.id === enrollmentId);
    }

// Initialize the ledger with a demo product
    async initLedger(ctx) {
        if (!this._isAdmin(ctx)) {
            throw new Error('Only appManufacturer or appDistributor may initialize the ledger');
        }

        const product = {
            batchNumber: "TX1001",
            ingredients: "Paracetamol, Water",
            manufacturer: ctx.clientIdentity.getMSPID() === 'Org1MSP' ? "DemoPharma" : "DemoDistributor",
            manufactureDate: "2025-01-01",
            expiryDate: "2027-01-01",
            status: "CREATED",
            history: []
        };

        await ctx.stub.putState(product.batchNumber, Buffer.from(JSON.stringify(product)));

        return JSON.stringify({ message: `Ledger initialized by ${ctx.clientIdentity.getMSPID()}` });
    }

    async createProduct(ctx, batchNumber, ingredients, manufacturer, manufactureDate, expiryDate) {
        const mspId = ctx.clientIdentity.getMSPID();
        if (mspId !== 'Org1MSP') {
            throw new Error('Only Org1MSP (manufacturer) can create a product');
        }
        const product = {
            batchNumber,
            ingredients,
            manufacturer,
            manufactureDate,
            expiryDate,
            status: 'CREATED',
            history: [
                {
                    action: 'CREATED',
                    manufacturer,
                    manufactureDate
                }
            ]
        };
        await ctx.stub.putState(batchNumber, Buffer.from(JSON.stringify(product)));
        return JSON.stringify(product);
    }

    async shipProduct(ctx, batchNumber, distributor, temperatureChecks, shipDate) {
        const mspId = ctx.clientIdentity.getMSPID();
        if (mspId !== 'Org2MSP') {
            throw new Error('Only Org2MSP (distributor) can ship a product');
        }
        const productBytes = await ctx.stub.getState(batchNumber);
        if (!productBytes || productBytes.length === 0) {
            throw new Error(`Product with batch number ${batchNumber} does not exist`);
        }
        const product = JSON.parse(productBytes.toString());
        product.status = 'SHIPPED';
        product.distributor = distributor;
        product.temperatureChecks = temperatureChecks;
        product.shipDate = shipDate;
        product.history.push({ action: 'SHIPPED', distributor, temperatureChecks, shipDate });
        await ctx.stub.putState(batchNumber, Buffer.from(JSON.stringify(product)));
        return JSON.stringify(product);
    }

    async getProduct(ctx, batchNumber) {
        const productBytes = await ctx.stub.getState(batchNumber);
        if (!productBytes || productBytes.length === 0) {
            throw new Error(`Product with batch number ${batchNumber} not found`);
        }
        return productBytes.toString();
    }

    async getAllProducts(ctx) {
        const allResults = [];
        const iterator = await ctx.stub.getStateByRange('', '');
        let result = await iterator.next();
        while (!result.done) {
            if (result.value && result.value.value.toString()) {
                const record = JSON.parse(result.value.value.toString('utf8'));
                allResults.push(record);
            }
            result = await iterator.next();
        }
        await iterator.close();
        return JSON.stringify(allResults);
    }

    async inspectRecords(ctx, batchNumber, pharmacy, inspectionDate, remarks) {
        const productBytes = await ctx.stub.getState(batchNumber);
        if (!productBytes || productBytes.length === 0) {
            throw new Error(`Product with batch number ${batchNumber} does not exist`);
        }
        const product = JSON.parse(productBytes.toString());
        product.status = 'INSPECTED';
        product.pharmacy = pharmacy;
        product.inspectionDate = inspectionDate;
        product.remarks = remarks;
        product.history.push({ action: 'INSPECTED', pharmacy, inspectionDate, remarks });
        await ctx.stub.putState(batchNumber, Buffer.from(JSON.stringify(product)));
        return JSON.stringify(product);
    }
}

module.exports = PharmaContract;
