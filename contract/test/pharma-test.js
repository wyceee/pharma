const { Context } = require('fabric-contract-api');
const sinon = require('sinon');
const { expect } = require('chai');
const PharmaContract = require('../pharmaContract');

describe('PharmaContract', () => {
    let contract;
    let ctx;

    beforeEach(() => {
        contract = new PharmaContract();
        ctx = {
            stub: {
                putState: sinon.stub(),
                getState: sinon.stub()
            },
            clientIdentity: {
                getMSPID: sinon.stub()
            }
        };
    });

    describe('#createProduct', () => {
        it('should create a product if MSP is Org1MSP', async () => {
            ctx.clientIdentity.getMSPID.returns('Org1MSP');
            ctx.stub.putState.resolves();
            const result = await contract.createProduct(ctx, 'BATCH1', 'ingredientA', 'ManuA', '2025-01-01', '2026-01-01');
            const product = JSON.parse(result);
            expect(product.batchNumber).to.equal('BATCH1');
            expect(product.status).to.equal('CREATED');
            expect(ctx.stub.putState.calledOnce).to.be.true;
        });
        it('should throw if MSP is not Org1MSP', async () => {
            ctx.clientIdentity.getMSPID.returns('OtherMSP');
            try {
                await contract.createProduct(ctx, 'BATCH1', 'ingredientA', 'ManuA', '2025-01-01', '2026-01-01');
                throw new Error('Should have thrown');
            } catch (err) {
                expect(err.message).to.equal('Only Org1MSP (manufacturer) can create a product');
            }
        });
    });

    describe('#shipProduct', () => {
        it('should ship a product if MSP is Org2MSP', async () => {
            ctx.clientIdentity.getMSPID.returns('Org2MSP');
            const product = { batchNumber: 'BATCH1', status: 'CREATED', history: [] };
            ctx.stub.getState.resolves(Buffer.from(JSON.stringify(product)));
            ctx.stub.putState.resolves();
            const result = await contract.shipProduct(ctx, 'BATCH1', 'DistA', 'OK', '2025-06-01');
            const updated = JSON.parse(result);
            expect(updated.status).to.equal('SHIPPED');
            expect(updated.distributor).to.equal('DistA');
            expect(ctx.stub.putState.calledOnce).to.be.true;
        });
        it('should throw if MSP is not Org2MSP', async () => {
            ctx.clientIdentity.getMSPID.returns('OtherMSP');
            try {
                await contract.shipProduct(ctx, 'BATCH1', 'DistA', 'OK', '2025-06-01');
                throw new Error('Should have thrown');
            } catch (err) {
                expect(err.message).to.equal('Only Org2MSP (distributor) can ship a product');
            }
        });
        it('should throw if product does not exist', async () => {
            ctx.clientIdentity.getMSPID.returns('Org2MSP');
            ctx.stub.getState.resolves();
            try {
                await contract.shipProduct(ctx, 'BATCH1', 'DistA', 'OK', '2025-06-01');
                throw new Error('Should have thrown');
            } catch (err) {
                expect(err.message).to.equal('Product with batch number BATCH1 does not exist');
            }
        });
    });

    describe('#inspectRecords', () => {
        it('should inspect product if MSP is Org3MSP', async () => {
            ctx.clientIdentity.getMSPID.returns('Org3MSP');
            const product = { batchNumber: 'BATCH1', status: 'SHIPPED', history: [] };
            ctx.stub.getState.resolves(Buffer.from(JSON.stringify(product)));
            ctx.stub.putState.resolves();
            const result = await contract.inspectRecords(ctx, 'BATCH1', 'PharmA', '2025-07-01', 'All good');
            const updated = JSON.parse(result);
            expect(updated.status).to.equal('INSPECTED');
            expect(updated.pharmacy).to.equal('PharmA');
            expect(ctx.stub.putState.calledOnce).to.be.true;
        });
        it('should inspect product regardless of MSP', async () => {
            ctx.clientIdentity.getMSPID.returns('OtherMSP');
            const product = { batchNumber: 'BATCH1', status: 'SHIPPED', history: [] };
            ctx.stub.getState.resolves(Buffer.from(JSON.stringify(product)));
            ctx.stub.putState.resolves();
            const result = await contract.inspectRecords(ctx, 'BATCH1', 'PharmA', '2025-07-01', 'All good');
            const updated = JSON.parse(result);
            expect(updated.status).to.equal('INSPECTED');
            expect(updated.pharmacy).to.equal('PharmA');
            expect(ctx.stub.putState.calledOnce).to.be.true;
        });
    });
});