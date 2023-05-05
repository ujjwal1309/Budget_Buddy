const express = require('express');
const DataRouter = express.Router();
const {GetAllData,CreateData,UpdateData,DeleteData} = require("../controller/data.controller")



DataRouter.get('/get-all-data',GetAllData);


DataRouter.post('/add-data', CreateData);

DataRouter.put('/update-data/:id', UpdateData);

DataRouter.delete('/delete-data/:id', DeleteData);



module.exports = {DataRouter};
