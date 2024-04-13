const Joi = require('joi');
module.exports = {
    UserSchema: {
         register:Joi.object({
            name:Joi.string().min(5).required(),
            email:Joi.string().email().required(),
            phone:Joi.string().min(9).max(15).required(),
            password: Joi.string().min(8).required()
         })
    },
    PermissionSchema: {
        add: Joi.object({
            name: Joi.string().required()
        })
    },
    RoleSchema: {
        add: Joi.object({
            name: Joi.string().required()
        }),
        addPermission: Joi.object({
            roleId: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
            permissionId: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
        })
    },
    AllSchema: {
        id: Joi.object({
            id: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
        })
    }
}