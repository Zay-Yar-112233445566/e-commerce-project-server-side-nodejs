const DB = require('../models/permission');


const add = async(req, res, next) => {
    let dbPermission = await DB.findOne({name : req.body.name});
    if(dbPermission){
        console.log("Name is already used");
    }else{
        console.log("Permission  saved!");
    }
}
module.exports = {
    add
}