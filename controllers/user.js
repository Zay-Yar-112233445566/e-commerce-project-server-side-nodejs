const DB = require('../models/user');
const Helper = require('../utils/helper');
const register = async(req, res, next) =>{
    let dbMailUser = await DB.findOne({email: req.body.email});
    if(dbMailUser){
        next(new Error("Email is already in Use!"));
        return;
    }
    let dbPhoneUser = await DB.findOne({phone: req.body.phone});
    if(dbPhoneUser){
        next(new Error("Phone Number is already in Use!"));
        return;
    }

    req.body.password = Helper.encode(req.body.password);
    let result = await new DB(req.body).save();
    Helper.fMsg(res,"Register success",result);
}
module.exports = {
register
}