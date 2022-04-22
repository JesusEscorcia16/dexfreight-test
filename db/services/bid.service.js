const client = require('../conexion');

class BidService {

    constructor() {
        this.load = null;

        this.res = null;
    }

    save = async ({ loadId, userName, value }) => {
        try {
            await client.query('INSERT INTO BIDS (LOADID, USER_NAME, VALUE) VALUES($1, $2, $3);', [loadId, userName, value]);
            return true;
        } catch (err) {
            throw err;
        }
    }

    accept = async (bidId) => {
        try {
            await client.query( "UPDATE BIDS SET STATUS = 'Accepted', UPDATED_AT = NOW() WHERE ID = $1;", [bidId]);
            return true;
        } catch (err) {
            throw err;
        }
    }

    decline = async (bidId) => {
        try {
            await client.query("UPDATE BIDS SET STATUS = 'Declined', UPDATED_AT = NOW() WHERE ID = $1;", [bidId]);
            return true
        } catch (err) {
            throw err;
        }
    }

    getBidById = async (bidId) => {
        try {            
            this.res = await client.query('SELECT * FROM BIDS WHERE ID = $1;', [bidId]);            
            return this.res?.rows[0];
        } catch (err) {
            throw err;
        }
    }
}

module.exports = BidService;