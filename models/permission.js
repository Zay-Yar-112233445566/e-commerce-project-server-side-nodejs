const mongoose = require('mongoose');
const { Schema } = mongoose;

const PermissionSchema = new Schema({
    name: { type: String, required: true, unique: true }
});
const Permission = mongoose.model('permission', PermissionSchema);
module.exports = Permission;
