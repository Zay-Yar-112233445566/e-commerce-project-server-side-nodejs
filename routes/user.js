const router = require('express').Router();
const controller = require('../controllers/user');
const { UserSchema } = require('../utils/schema');
const { validateBody } = require('../utils/validator');

router.post('/', [validateBody(UserSchema.register),controller.register]);

module.exports = router;