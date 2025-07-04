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

        const product1 = {
            batchNumber: "TX1001",
            name: "Paracetamol 500mg",
            ingredients: "Paracetamol, Water",
            manufacturer: "DemoPharma",
            manufactureDate: "2025-01-01",
            expiryDate: "2027-01-01",
            status: "CREATED",
            history: [
                {
                    action: 'CREATED',
                    manufacturer: "DemoPharma",
                    manufactureDate: "2025-01-01"
                }
            ]
        };

        const product2 = {
            batchNumber: "TX1002",
            name: "Ibuprofen 200mg",
            ingredients: "Ibuprofen, Water",
            manufacturer: "DemoPharma",
            manufactureDate: "2025-02-01",
            expiryDate: "2027-02-01",
            status: "SHIPPED",
            distributor: "DemoDistributor",
            temperatureChecks: "2-8C",
            shipDate: "2025-03-01",
            history: [
                {
                    action: 'CREATED',
                    manufacturer: "DemoPharma",
                    manufactureDate: "2025-02-01"
                },
                {
                    action: 'SHIPPED',
                    distributor: "DemoDistributor",
                    temperatureChecks: "2-8C",
                    shipDate: "2025-03-01"
                }
            ]
        };

        await ctx.stub.putState(product1.batchNumber, Buffer.from(JSON.stringify(product1)));
        await ctx.stub.putState(product2.batchNumber, Buffer.from(JSON.stringify(product2)));

        return JSON.stringify({ message: `Ledger initialized by ${ctx.clientIdentity.getMSPID()}` });
    }

    async createProduct(ctx, batchNumber, name, ingredients, manufacturer, manufactureDate, expiryDate) {
        const mspId = ctx.clientIdentity.getMSPID();
        if (mspId !== 'Org1MSP') {
            throw new Error('Only Org1MSP (manufacturer) can create a product');
        }
        // Check for duplicate batch number
        const existing = await ctx.stub.getState(batchNumber);
        if (existing && existing.length > 0) {
            throw new Error(`Product with batch number ${batchNumber} already exists`);
        }
        const product = {
            batchNumber,
            name,
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
        // Prevent shipping if already shipped
        if (product.status === 'SHIPPED') {
            throw new Error(`Product with batch number ${batchNumber} is already shipped`);
        }
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
}

module.exports = PharmaContract;
