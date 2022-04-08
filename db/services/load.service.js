const { Client } = require('pg');

class LoadService {

    constructor() {
        this.client = new Client();
        this.client.connect();

        this.res = null;
    }

    save = async (load) => {
        const query = {
            text: 'INSERT INTO LOADS(ADDRESS_A, LAT_A, LNG_A, ADDRESS_B, LAT_B, LNG_B, USER_NAME, EMAIL, RATE, INSTRUCTIONS) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10);',
            values: [
                load?.pointA?.addressA,
                load?.pointA?.lat,
                load?.pointA?.lng,
                load?.pointB?.addressB,
                load?.pointB?.lat,
                load?.pointB?.lng,
                load?.userName,
                load?.email,
                load?.rate,
                load?.instructions
            ]
        }
        try {
            await this.client.query(query);
            return true;
        } catch (err) {
            throw err;
        }
    }

    update = async (load, loadId) => {
        const query = {
            text: 'UPDATE LOADS SET ADDRESS_A = $1, LAT_A = $2, LNG_A = $3, ADDRESS_B = $4, LAT_B = $5, LNG_B = $6, USER_NAME = $7, EMAIL = $8, RATE = $9, INSTRUCTIONS = $10, UPDATED_AT = NOW() WHERE ID = $11;',
            values: [
                load?.pointA?.addressA,
                load?.pointA?.lat,
                load?.pointA?.lng,
                load?.pointB?.addressB,
                load?.pointB?.lat,
                load?.pointB?.lng,
                load?.userName,
                load?.email,
                load?.rate,
                load?.instructions,
                loadId
            ]
        }
        try {
            await this.client.query(query);
            return true;
        } catch (err) {
            throw err;
        }
    }

    getLoads = async () => {
        try {
            this.res = await this.client.query("SELECT * FROM LOADS");
            return this.res?.rows;
        } catch (err) {
            throw err;
        }
    }

    getFilteredLoads = async ({ userName = '' }) => {
        const query = {
            text: 'SELECT * FROM LOADS WHERE USER_NAME ILIKE $1;',
            values: [`%${userName}%`]
        }
        try {
            this.res = await this.client.query(query);
            return this.res?.rows;
        } catch (err) {
            throw err;
        }
    }

    getLoadById = async (loadId = 0) => {
        const query = {
            text: 'SELECT * FROM LOADS WHERE ID = $1;',
            values: [loadId]
        };
        try {
            this.res = await this.client.query(query);
            return this.res?.rows[0];
        } catch (err) {
            throw err;
        }
    }

    getLoadByBidId = async (bidId) => {
        const query = {
            text: 'SELECT LO.* FROM LOADS LO JOIN BIDS BID ON BID.LOADID = LO.ID WHERE BID.ID = $1',
            values: [bidId]
        }
        try {
            this.res = await this.client.query(query);
            return this.res?.rows[0];
        } catch (err) {
            throw err;
        }
    }
}

module.exports = LoadService;
