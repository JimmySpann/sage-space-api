// imports
const router = require('express').Router();
const ctrl = require('../controllers');
const authRequired = require('../middleware/authRequired');

// routes
router.get('/', authRequired, ctrl.workTime.index);
router.get('/:id', authRequired, ctrl.workTime.show);
router.post('/', authRequired, ctrl.workTime.create);
router.put('/:id', authRequired, ctrl.workTime.update);
router.delete('/:id', authRequired, ctrl.workTime.destroy);

// exports
module.exports = router;