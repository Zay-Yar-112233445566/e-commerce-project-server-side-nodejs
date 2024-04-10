const mongoose = require('mongoose');
const { Schema } = mongoose;

const PermissionSchema = new Schema({
    name: { type: string, required: true, unique: true }
});
const Permission = mongoose.model('permission', PermissionSchema);
module.exports = Permission;
