// imports
const router = require('express').Router();
const ctrl = require('../controllers');
const authRequired = require('../middleware/authRequired');

// routes
router.get('/', authRequired, ctrl.notes.index);
router.get('/:id', authRequired, ctrl.notes.show);
router.post('/', authRequired, ctrl.notes.create);
router.put('/:id', authRequired, ctrl.notes.update);
router.delete('/:id', authRequired, ctrl.notes.destroy);

// exports
module.exports = router;