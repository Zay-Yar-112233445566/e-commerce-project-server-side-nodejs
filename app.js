require('dotenv').config();
const express = require('express'), app = express(), mongoose = require('mongoose');
app.use(express.json());
mongoose.connect(`mongodb://127.0.0.1:27017/${process.env.DB_NAME}`);

//importing related routers 
const permissionRouter = require('./routes/permission');
const roleRouter = require('./routes/role');
const userRouter = require('./routes/user');
const migration = require('./migrations/migrator');

//deploy routers
app.use('/users',userRouter);
app.use('/permissions', permissionRouter);
app.use('/roles',roleRouter);

app.get('/usershow',migration.migrate);
app.get('/backup',migration.backup);

app.use((err, req, res, next) => {
    err.status = err.status || 500;
    res.status(err.status).json({con: false, msg: err.message});
})

app.listen(process.env.PORT, console.log(`server is running at ${process.env.PORT}`));