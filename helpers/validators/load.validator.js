const Validator = require('validatorjs');

const validateLoadParams = (load) => {
    const rules = {
        email: "required|email",
        userName: "required|string",
        rate: "required|numeric",
        instructions: "required|string"
    }

    const validation = new Validator(load, rules);
    const passValidationLoadData = validation.passes();
    const passValidationPointA = validatePointA(load?.pointA);
    const passValidationPointB = validatePointB(load?.pointB);
    return passValidationLoadData && passValidationPointA && passValidationPointB;
}

const validatePointA = (pointA) => {
    const rules = {
        addressA: "required|string",
        lat: "required|numeric",
        lng: "required|numeric",
    }

    const validation = new Validator(pointA, rules);
    return validation.passes();
}

const validatePointB = (pointB) => {
    const rules = {
        addressB: "required|string",
        lat: "required|numeric",
        lng: "required|numeric",
    }

    const validation = new Validator(pointB, rules);
    return validation.passes();
}

module.exports = {
    validateLoadParams,
};