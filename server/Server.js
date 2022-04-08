const express = require('express');
const cors = require('cors');

class Server {

    constructor() {
        this.app = express();

        this.port = process.env.PORT;
        this.path = '/api/';

        //Middelwares
        this.middelwares();

        //Rutas
        this.routes();
    }

    middelwares() {
        this.app.use(cors());
        this.app.use(express.json());
    }

    routes() {
        this.app.use(`${this.path}load`, require('../routes/load.route'));
        this.app.use(`${this.path}bid`, require('../routes/bid.route'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Escuchando en el puerto', this.port);
        });
    }
}


module.exports = Server;