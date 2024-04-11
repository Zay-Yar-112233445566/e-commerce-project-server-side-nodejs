const DB = require('../models/role')
const PermissionDB = require('../models/permission');
const Helper = require('../utils/helper');

let add = async (req, res, next) => {
    let dbRole = await DB.findOne({ name: req.body.name });
    if (dbRole) {
        next(new Error("Role name is already in use!!"));
    } else {
        let result = await new DB(req.body).save();
        Helper.fMsg(res, "Role successfully saved.", result);
    }
}

const getAll = async (req, res, next) => {
    let roles = await DB.find().select('-__v');
    if (roles !== null && roles.length > 0) {
        Helper.fMsg(res, "Get All roles successfully!!", roles);
    } else {
        next(new Error("Error,There are no any roles"))
    }
}

const get = async (req, res, next) => {
    let dbRole = await DB.findById(req.params.id).select('-__v');
    if (dbRole) {
        Helper.fMsg(res, "Single Role", dbRole);
    } else {
        next(new Error("No Role with that id!!"));
    }
}

const update = async (req, res, next) => {
    let dbRole = await DB.findById(req.params.id);
    if (dbRole) {
        let updateddbRole = await DB.findByIdAndUpdate(dbRole._id, req.body, { new: true }).select('-__v');
        if (updateddbRole) {
            Helper.fMsg(res, "Role successfully updated.", updateddbRole);
        } else {
            next(new Error("Update proecss failed!!"));
        }
    } else {
        next(new Error("Error,There is no any role with that id"));
    }
}
const drop = async (req, res, next) => {
    let dbRole = await DB.findById(req.params.id);
    if (dbRole) {
        let result = await DB.findByIdAndDelete(dbRole._id);
        if (result.error) {
            next(new Error("Delete process failed!"));
        } else {
            Helper.fMsg(res, "Role successfully deleted.");
        }
    } else {
        next(new Error("There is no role with that id!!"));
    }
}

const permissionAddToRole = async (req, res, next) => {
    let dbRole = await DB.findById(req.params.roleId);
    let dbPermission = await PermissionDB.findById(req.params.permissionId);

    if (dbRole && dbPermission) {
        let reult = await DB.findByIdAndUpdate(dbRole._id, { $push: { permissions: dbPermission._id } });
        Helper.fMsg(res, "Permission add to roled",result); 
    } else {
        next(new Error(""));
    }
}
module.exports = {
    add,
    getAll,
    get,
    update,
    drop
}