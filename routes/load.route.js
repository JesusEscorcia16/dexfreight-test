const { Router } = require('express');
const { getLoads, save, getLoadById, update, getFilteredLoads } = require('../controller/load.controller');
const router = Router();


router.post('/', save);
router.put('/:id', update);
router.get('/', getFilteredLoads);
router.get('/all', getLoads);
router.get('/:id', getLoadById);


module.exports = router;