const { mongoose } = require("mongoose");
const { Schema } = mongoose;

const RoleSchema = new Schema({
    name: { type: String, required: true },
    permissions: [{ type: Schema.Types.ObjectId, 'ref': "permission" }]
})

const Role = mongoose.model('role', RoleSchema);
model.exports = Role;