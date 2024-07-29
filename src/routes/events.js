// imports
const router = require('express').Router();
const ctrl = require('../controllers');
const authRequired = require('../middleware/authRequired');

// routes
router.get('/', authRequired, ctrl.events.index);
router.get('/:id', authRequired, ctrl.events.show);
router.post('/', authRequired, ctrl.events.create);
router.put('/:id', authRequired, ctrl.events.update);
router.delete('/:id', authRequired, ctrl.events.destroy);

// exports
module.exports = router;