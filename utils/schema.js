const Joi = require('joi');
module.exports = {
    PermissionSchema: {
        add : Joi.object({
            name: Joi.string().required()
        })
    },  
    RoleSchema:{
        add: Joi.object({
            name:Joi.string().required()
        })
    },
    AllSchema:{
        id: Joi.object({
            id: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
        })
    }
}