const DB = require('../models/user');
const helper = require('../utils/helper');
const Helper = require('../utils/helper');
const register = async (req, res, next) => {
    let dbMailUser = await DB.findOne({ email: req.body.email });
    if (dbMailUser) {
        next(new Error("Email is already in Use!"));
        return;
    }
    let dbPhoneUser = await DB.findOne({ phone: req.body.phone });
    if (dbPhoneUser) {
        next(new Error("Phone Number is already in Use!"));
        return;
    }

    req.body.password = Helper.encode(req.body.password);
    let result = await new DB(req.body).save();
    Helper.fMsg(res, "Register success", result);
}

const login = async (req, res, next) => {
    let dbUser = await DB.findOne({ email: req.body.email }).populate('roles permissions', '-__v -created').select('-created -__v');
    if (dbUser) {
        if (Helper.comparePassword(req.body.password, dbUser.password)) {
            let user = dbUser.toObject();
            delete user.password;
            user.token = Helper.generateToken(user);
            Helper.set(user._id, user);
            Helper.fMsg(res, "Login Success", user);
        } else {
            next(new Error("Invalid Password"));
        }
    } else {
        next(new Error("Invalid email"));
    }
}
module.exports = {
    register,
    login
}