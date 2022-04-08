const BidService = require("../db/services/bid.service");
const LoadService = require("../db/services/load.service");
const { validateBidParams } = require('../helpers/validators/bid.validator');

this.bidService = new BidService();
this.loadService = new LoadService();
this.err = '';

const save = async (req, res) => {
    if (validateBidParams(req.body)) {
        const load = await this.loadService.getLoadById(req.body.loadId);
        if (load) {
            if (load.status === 'Open') {
                this.bidService.save(req.body)
                    .then(created => (created) ? res.send({ created }) : res.status(500).send({ created }))
                    .catch(err => res.status(500).send({ err }));
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

const accept = async (req, res) => {
    const load = await this.loadService.getLoadByBidId(req.params.id);
    if (load) {
        if (load.status === 'Open') {
            this.bidService.accept(req.params.id)
                .then(accepted => (accepted) ? res.send({ accepted }) : res.status(500).send({ accepted }))
                .catch(err => res.status(500).send({ err }));
            return;
        } else {
            this.err = 'The load is closed.';
        }
    } else {
        this.err = 'The load doesn\'t exists.';
    }
    res.status(500).send({ err: this.err });
}

const decline = async (req, res) => {
    const bid = await this.bidService.getBidById(req.params.id);
    if (bid) {
        if (bid.status !== 'Declined') {
            this.bidService.decline(req.params.id)
                .then(declined => (declined) ? res.send({ declined }) : res.status(500).send({ declined }))
                .catch(err => res.status(500).send({ err }));
            return;
        } else {
            this.err = `The bid can\'t be closed because its status is ${bid.status}.`;
        }
    } else {
        this.err = 'The bidId doesn\'t exists.';
    }
    res.status(500).send({ err: this.err });
}

module.exports = {
    save,
    accept,
    decline,
}