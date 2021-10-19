const app = require("../index");
const axios = require('axios');
const jestOpenAPI = require('jest-openapi').default;
//const swaggerDocument = require('../swagger.json');
//jestOpenAPI(swaggerDocument);
require('dotenv').config();

//const server = "http://" + process.env.SERVER_HOST + ":" + process.env.SERVER_PORT;
const server = "http://localhost:3001";
console.log(server);
jest.setTimeout(20000);

describe('GET /', () => {
    it('should satisfy OpenAPI spec', async () => {
        const res = await axios.get(server + "/");

        expect(res.status).toEqual(200);
        expect(res.data).toEqual("Hello World!");
    });
});

describe('GET /blocks/latest', () => {
    it('should satisfy OpenAPI spec', async () => {
        const res = await axios.get(server + '/blocks/latest');

        expect(res.status).toEqual(200);
        // expect(res).toSatisfyApiSpec();
    });
});

describe('GET /blocks/ByNumber/OrHash/:arg', () => {
    it('should satisfy OpenAPI spec', async () => {
        const res = await axios.get(server + '/blocks/ByNumber/OrHash/1000');

        expect(res.status).toEqual(200);
        //expect(res).toSatisfyApiSpec();
    });
});

describe('GET /blocks/{from}/{count}', () => {
    it('should satisfy OpenAPI spec', async () => {
        const res = await axios.get(server + '/blocks/1000/2');

        expect(res.status).toEqual(200);
        //expect(res).toSatisfyApiSpec();
    });
});

describe('GET /blocks/pending', () => {
    it('should satisfy OpenAPI spec', async () => {
        const res = await axios.get(server + '/blocks/pending');

        expect(res.status).toEqual(200);
        //expect(res).toSatisfyApiSpec();
    });
});


describe('GET /transactions/hash/{hash}', () => {
    it('should satisfy OpenAPI spec', async () => {
        const res = await axios.get(server + '/transactions/hash/0xfddf5bcce2beafd53f0bd20271ae50b7b31f917cb24c117528201f7527cff783');

        expect(res.status).toEqual(200);
        //expect(res).toSatisfyApiSpec();

    });
});

describe('GET /transactions/pending/', () => {
    it('should satisfy OpenAPI spec', async () => {
        const res = await axios.get(server + '/transactions/pending');

        expect(res.status).toEqual(200);
        //expect(res).toSatisfyApiSpec();

    });
});

describe('GET /transactions/address/{address}', () => {
    it('should satisfy OpenAPI spec', async () => {
        const res = await axios.get(server + '/transactions/address/0x52Add4435c81a4e0fB2eC494966863e48BF9302E');

        expect(res.status).toEqual(200);
        //expect(res).toSatisfyApiSpec();

    });
});

describe('GET /transactions/latest', () => {
    it('should satisfy OpenAPI spec', async () => {
        const res = await axios.get(server + '/transactions/latest');

        expect(res.status).toEqual(200);
        //expect(res).toSatisfyApiSpec();
    });
});

describe('GET /addresses/{address}', () => {
    it('should satisfy OpenAPI spec', async () => {
        const res = await axios.get(server +'/addresses/0x52Add4435c81a4e0fB2eC494966863e48BF9302E');

        expect(res.status).toEqual(200);
        //expect(res).toSatisfyApiSpec();
    });
});

describe('GET /transactions/hash/{hash}', () => {
    it('should return null', async () => {
        const res = await axios.get(server + '/transactions/hash/0xfddf5bcce2beafd53f0bd20271ae50b7b31f917cb24c117528201f7527cff78a');

        expect(res.status).toEqual(204);
        expect(res.data).toBe("");
    });
});

describe('GET /transactions/address/{address}', () => {
    it('should return undefined', async () => {
        const res = await axios.get(server +'/transactions/address/ax52Add4435c81a4e0fB2eC494966863e48BF9302E')
            .catch((error) => {
            });
        expect(res.data).toBe("Invalid address.");
    });
});

describe('GET /blocks/ByNumber/OrHash/:arg', () => {
    it('should return undefined', async () => {
        const res = await axios.get(server + '/blocks/ByNumber/OrHash/1000a')
            .catch((error) => {
            });

        expect(res).toBe(undefined);
    });
});

describe('GET /addresses/{address}', () => {
    it('should return undefined', async () => {
        const res = await axios.get(server + '/addresses/0x1111111111111')
            .catch((error) => {
            });

        expect(res).toBe(undefined);
    });
});