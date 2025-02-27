const router = require('express').Router();
const controller = require('../controllers/user');
const { UserSchema } = require('../utils/schema');
const { validateBody } = require('../utils/validator');

router.post('/register', [validateBody(UserSchema.register),controller.register]);
router.post('/',[validateBody(UserSchema.login),controller.login]);
module.exports = router;    