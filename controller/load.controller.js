const LoadService = require('../db/services/load.service');
const { validateLoadParams } = require('../helpers/validators/load.validator');
this.loadService = new LoadService();
this.err = '';

const save = async (req, res) => {
    if (validateLoadParams(req.body)) {
        this.loadService.save(req.body)
            .then(created => (created) ? res.send({ created }) : res.status(500).send({ created }))
            .catch(err => res.status(500).send({ err }));
        return;
    } else {
        this.err = 'One or more parameters are empty.';
    }
    res.status(500).send({ err: this.err });
}

const update = async (req, res) => {
    if (validateLoadParams(req.body)) {
        const load = await this.loadService.getLoadById(req.params.id);
        if (load) {
            if (load.status === 'Open') {
                this.loadService.update(req.body, req.params.id)
                    .then(updated => (updated) ? res.send({ updated }) : res.status(500).send({ updated }))
                    .catch(err => res.status(500).send({ err }))
                return;
            } else {
                this.err = 'The load is closed.';
            }
        } else {
            this.err = 'The load doesn\'t exists.';
        }
    } else {
        this.err = 'One or more parameters are empty.';
    }
    res.status(500).send({ err: this.err });
}

const getLoads = async (req, res) => {
    this.loadService.getLoads(req.query)
        .then(loads => res.send(loads))
        .catch(err => res.status(500).send({ err }));
}

const getFilteredLoads = async (req, res) => {
    this.loadService.getFilteredLoads(req.query)
        .then(loads => res.send(loads))
        .catch(err => res.status(500).send({ err }));
}

const getLoadById = async (req, res) => {
    this.loadService.getLoadById(req.params.id)
        .then(load => (load) ? res.send(load) : res.status(204).send(load))
        .catch(err => res.status(500).send({ err }));
}

module.exports = {
    save,
    update,
    getLoads,
    getFilteredLoads,
    getLoadById

}