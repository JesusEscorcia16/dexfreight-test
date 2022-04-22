const client = require('../conexion');

class LoadService {

    constructor() {
        this.res = null;
    }

    save = async (load) => {
        try {
            this.res = await client.query('INSERT INTO LOADS(ADDRESS_A, LAT_A, LNG_A, ADDRESS_B, LAT_B, LNG_B, USER_NAME, EMAIL, RATE, INSTRUCTIONS) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10);',
            [
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
            ]);
            return true;
        } catch (err) {
            throw err;
        }
    }

    update = async (load, loadId) => {
        try {
            this.res = await client.query('UPDATE LOADS SET ADDRESS_A = $1, LAT_A = $2, LNG_A = $3, ADDRESS_B = $4, LAT_B = $5, LNG_B = $6, USER_NAME = $7, EMAIL = $8, RATE = $9, INSTRUCTIONS = $10, UPDATED_AT = NOW() WHERE ID = $11;',
            [
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
            ]);
            return true;
        } catch (err) {
            throw err;
        }
    }

    getLoads = async () => {
        try {
            this.res = await client.query("SELECT * FROM LOADS");
            return this.res?.rows;
        } catch (err) {
            throw err;
        }
    }

    getFilteredLoads = async ({ userName = '' }) => {
        try {
            this.res = await client.query('SELECT * FROM LOADS WHERE USER_NAME ILIKE $1;', [`%${userName}%`]);
            return this.res?.rows;
        } catch (err) {
            throw err;
        }
    }

    getLoadById = async (loadId = 0) => {
        try {
            this.res = await client.query('SELECT * FROM LOADS WHERE ID = $1;', [loadId]);
            return this.res?.rows[0];
        } catch (err) {
            throw err;
        }
    }

    getLoadByBidId = async (bidId) => {
        try {
            this.res = await client.query('SELECT LO.* FROM LOADS LO JOIN BIDS BID ON BID.LOADID = LO.ID WHERE BID.ID = $1', [bidId]);
            return this.res?.rows[0];
        } catch (err) {
            throw err;
        }
    }
}

module.exports = LoadService;
