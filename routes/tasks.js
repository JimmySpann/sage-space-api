// imports
const router = require('express').Router();
const ctrl = require('../controllers');
const authRequired = require('../middleware/authRequired');

// routes
router.get('/', authRequired, ctrl.tasks.index);
router.get('/:id', authRequired, ctrl.tasks.show);
router.post('/', authRequired, ctrl.tasks.create);
router.put('/:id', authRequired, ctrl.tasks.update);
router.delete('/:id', authRequired, ctrl.tasks.destroy);

// exports
module.exports = router;