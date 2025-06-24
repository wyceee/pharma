'use strict';

const { Contract } = require('fabric-contract-api');

class PharmaContract extends Contract {
    async createProduct(ctx, batchNumber, ingredients, manufacturer, manufactureDate, expiryDate) {
        const mspId = ctx.clientIdentity.getMSPID();
        if (mspId !== 'ManufacturerMSP') {
            throw new Error('Only a manufacturer can create a product');
        }
        const product = {
            batchNumber,
            ingredients,
            manufacturer,
            manufactureDate,
            expiryDate,
            status: 'CREATED',
            history: []
        };
        await ctx.stub.putState(batchNumber, Buffer.from(JSON.stringify(product)));
        return JSON.stringify(product);
    }

    async shipProduct(ctx, batchNumber, distributor, temperatureChecks, shipDate) {
        const mspId = ctx.clientIdentity.getMSPID();
        if (mspId !== 'DistributorMSP') {
            throw new Error('Only a distributor can ship a product');
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

    async inspectRecords(ctx, batchNumber, pharmacy, inspectionDate, remarks) {
        const mspId = ctx.clientIdentity.getMSPID();
        if (mspId !== 'PharmacyMSP') {
            throw new Error('Only a pharmacy can inspect product records');
        }
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
