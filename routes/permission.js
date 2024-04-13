const router = require('express').Router();
const controller = require('../controllers/permission');
const { validateBody,validateParam,validateToken } = require('../utils/validator');
const { PermissionSchema,AllSchema } = require('../utils/schema');

//arrange the requests from the client
router.get('/', controller.getAll);
router.post('/', [validateToken(),validateBody(PermissionSchema.add), controller.add]);
router.route('/:id')
    .get([validateParam(AllSchema.id, "id"), controller.get])
    .patch([validateParam(AllSchema.id, "id"),validateBody(PermissionSchema.add), controller.update])
    .delete([validateParam(AllSchema.id, "id"), controller.drop]);
module.exports = router;