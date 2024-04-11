const DB = require('../models/permission');
const Helper = require('../utils/helper');

const getAll = async (req, res, next) => {
    let permissions = await DB.find().select('-__v');
    if (permissions !== null && permissions.length > 0) {
        Helper.fMsg(res, "Get All Permissions successfully!!", permissions);
    } else {
        next(new Error("Error,There are no any permissions"))
    }
}

const get = async (req, res, next) => {
    let permission = await DB.findById(req.params.id).select('-__v');
    if (permission) {
        Helper.fMsg(res, "Get Single Permission successfully!!", permission);
    } else {
        next(new Error("Error,There is no any permission with that id"));
    }
}
const add = async (req, res, next) => {
    let dbPermission = await DB.findOne({ name: req.body.name });
    if (dbPermission) {
        next(new Error("Permission Name is already in use"));
    } else {
        let result = await new DB(req.body).save();
        Helper.fMsg(res, "Permission successfully saved.", result);
    }
}
const update = async (req, res, next) => {
    let dbPermission = await DB.findById(req.params.id);
    if (dbPermission) {
        // await DB.findByIdAndUpdate(dbPermission._id,  req.body);
        let updatedPermission = await DB.findByIdAndUpdate(dbPermission._id, req.body, { new: true });
        if (updatedPermission) {
            Helper.fMsg(res, "Permission successfully updated.", updatedPermission);
        } else {
            next(new Error("Update proecss failed!!"));
        }
    } else {
        next(new Error("Error,There is no any permission with that id"));
    }
}

const drop = async (req, res, next) => {
    let dbPermission = await DB.findById(req.params.id);
    if (dbPermission) {
        let result = await DB.findByIdAndDelete(dbPermission._id);
        if(result.error){
            next(new Error("Delete process failed!"));
        }else{
            Helper.fMsg(res, "Permission successfully deleted.");
        }
     } else {
        next(new Error("There is no permission with that id!!"));
    }
}

module.exports = {
    add,
    getAll,
    get,
    update,
    drop
}