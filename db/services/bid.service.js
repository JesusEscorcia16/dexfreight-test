const { Client } = require('pg');


class BidService {

    constructor() {
        this.client = new Client();
        this.client.connect();

        this.load = null;

        this.res = null;
    }

    save = async ({ loadId, userName, value }) => {
        try {
            const query = {
                text: 'INSERT INTO BIDS (LOADID, USER_NAME, VALUE) VALUES($1, $2, $3);',
                values: [loadId, userName, value]
            }
            await this.client.query(query);
            return true;
        } catch (err) {
            throw err;
        }
    }

    accept = async (bidId) => {
        const query = {
            text: "UPDATE BIDS SET STATUS = 'Accepted', UPDATED_AT = NOW() WHERE ID = $1;",
            values: [bidId]
        }
        try {
            await this.client.query(query);
            return true;
        } catch (err) {
            throw err;
        }
    }

    decline = async (bidId) => {
        const query = {
            text: "UPDATE BIDS SET STATUS = 'Declined', UPDATED_AT = NOW() WHERE ID = $1;",
            values: [bidId]
        }
        try {
            await this.client.query(query);
            return true
        } catch (err) {
            throw err;
        }
    }

    getBidById = async (bidId) => {
        const query = {
            text: 'SELECT * FROM BIDS WHERE ID = $1;',
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

module.exports = BidService;