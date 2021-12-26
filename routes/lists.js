// imports
const router = require('express').Router();
const ctrl = require('../controllers');
const authRequired = require('../middleware/authRequired');

// routes
router.get('/', authRequired, ctrl.lists.index);
router.get('/:id', authRequired, ctrl.lists.show);
router.post('/', authRequired, ctrl.lists.create);
router.put('/:id', authRequired, ctrl.lists.update);
router.delete('/:id', authRequired, ctrl.lists.destroy);

// exports
module.exports = router;