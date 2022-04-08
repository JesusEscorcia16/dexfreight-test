const Validator = require('validatorjs');

const validateBidParams = (bid) => {
    const rules = {
        loadId: "required|numeric",
        userName: "required|string",
        value: "required|numeric"
    }

    const validation = new Validator(bid, rules);
    return validation.passes();
}

module.exports = {
    validateBidParams,
}