const { Router } = require('express');
const { save, accept, decline } = require('../controller/bid.controller');
const router = Router();


router.post('/', save);
router.put('/accept/:id', accept);
router.put('/decline/:id', decline);


module.exports = router;