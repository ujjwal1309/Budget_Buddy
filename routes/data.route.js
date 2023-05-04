const express = require('express');
const DataRouter = express.Router();
const {GetAllData,CreateData,UpdateData,DeleteData} = require("../controllers/data.controller")



DataRouter.get('/getalldata',GetAllData);


DataRouter.post('/createdata', CreateData);

DataRouter.patch('/updatedata/:id', UpdateData);

DataRouter.delete('/deletedata/:id', DeleteData);



module.exports = {DataRouter};
