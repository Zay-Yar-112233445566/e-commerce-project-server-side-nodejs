const router = require('express').Router();
const controller = require('../controllers/role');
const { AllSchema, RoleSchema } = require('../utils/schema');
const { validateBody, validateParam } = require('../utils/validator');


//handling the client's request
router.post('/', [validateBody(RoleSchema.add), controller.add]);
router.get('/', controller.getAll);
router.post('/add/permission',[validateBody(RoleSchema.addPermission),controller.permissionAddToRole]);

router.route('/:id')
.get([validateParam(AllSchema.id,"id"),controller.get])
.patch([validateParam(AllSchema.id,"id"),validateBody(RoleSchema.add),controller.update])
.delete([validateParam(AllSchema.id,"id"),controller.drop]);
module.exports = router;