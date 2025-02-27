const fs = require('fs');
const Helper = require('../utils/helper');
const DB = require('../models/user');
const migrate = () => {
    let data = fs.readFileSync('./migrations/users.json');
    let users = JSON.parse(data);
    users.forEach(async(user)=>{
        user.password = Helper.encode(user.password);
        let result = await new DB(user).save();
        console.log(result);
    })
}

const backup = async() =>{
    let users = await DB.find();
    fs.writeFileSync('./migrations/backups/users.json',JSON.stringify(users));
    console.log("User Database Backuped!!");
}

module.exports = {
    migrate,
    backup
}