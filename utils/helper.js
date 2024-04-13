const bcrypt = require('bcryptjs');
const Redis = require('async-redis').createClient();
const jwt = require('jsonwebtoken');
module.exports = {
    encode: payload => bcrypt.hashSync(payload),
    comparePassword: (plain, hash) => bcrypt.compareSync(plain, hash),
    fMsg: (res, msg = "", result = []) => res.status(200).json({ con: true, msg, result }),
    set: async (id, value) => await Redis.set(id.toString(), JSON.stringify(value)),
    get: async (id) => JSON.parse(await Redis.get(id.toString())),
    drop: async (id) => await Redis.del(id.toString()),
    generateToken: (payload) => jwt.sign(payload, process.env.SECRETE_KEY, { expiresIn: '1h' })
}