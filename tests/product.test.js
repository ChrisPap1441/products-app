const mongoose = require('mongoose');
const request = require('supertest');

const app = require('../app');
const helper = require('../helpers/product.helper');

require('dotenv').config();

beforeEach(async () => {
    await mongoose.connect(process.env.MONGODB_URI)
    .then(
        () => { console.log("Connection to MongoDB established")},
        err => { console.log("Failed to connect to MongoDB", err)}
    )
});

afterEach(async ()=> {
    await mongoose.connection.close();
})

describe("Request Get /api/products/:product", () => {
    it('Returns a user', async () => {

        const result = await helper.findLastInsertedProduct();
        // console.log(result);

        const res = await request(app).get('/api/products/' + result.product);
        expect(res.statusCode).toBe(200);
        expect(res.body.data.product).toBe(result.product);
        expect(res.body.data.description).toBe(result.description);
    }, 10000)
})

describe("Request POST /api/products", () => {
    it("Creates a product", async () => {
        const res = await request(app)
        .post('/api/products')
        .send({
            product: "test",
            cost: 123,
            description: "test",
            quantity: 5
        })
        expect(res.statusCode).toBe(200);
        expect(res.body.data).toBeTruthy();
    }, 10000);

    it("Creates a product testing cost", async () => {
        const res = await request(app)
        .post('/api/products')
        .send({
            product: "test",
            cost: "123",
            description: "test",
            quantity: 5
        })
        expect(res.statusCode).toBe(400);
        expect(res.body.data).toBeTruthy();
    }, 10000);

    it("Creates a product testing quantity", async () => {
        const res = await request(app)
        .post('/api/products')
        .send({
            product: "test",
            cost: 123,
            description: "test",
            quantity: "5"
        })
        expect(res.statusCode).toBe(400);
        expect(res.body.data).toBeTruthy();
    }, 10000)
})

describe("DELETE /api/products/:product", () => {
    it("Delete last inserted product", async () => {
        const result = await helper.findLastInsertedproduct();
        const res = await request(app)
            .delete("/api/products/" + result.product);
        
        expect(res.statusCode).toBe(200)
    }, 10000)
})