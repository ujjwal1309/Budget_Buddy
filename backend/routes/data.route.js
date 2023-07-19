const express = require('express');
const DataRouter = express.Router();
const {GetAllData,CreateData,UpdateData,DeleteData,TotalIncome,TotalExpense,TotalProfit,TotalExbyCat,TotalInbyCat,AllExpense,AllExpenseAsc,AllExpenseDsc,AllIncome,AllIncomeAsc,AllIncomeDsc,MonthlyData,DatabyCat,DatabyTitle} = require("../controller/data.controller")





DataRouter.post('/adddata', CreateData);//          POST    ROUTE   /budget/adddata
DataRouter.put('/updata/:id', UpdateData);//        PUT     ROUTE   /budget/updata/:id
DataRouter.delete('/deldata/:id', DeleteData);//    DELETE  ROUTE   /budget/deldata/:id

// FOR VIEW ALL TRANSACTION ROUTES
DataRouter.get('/viewalldata',GetAllData);//            // **   VIEW ALL TRANSACTION                    ROUTE - /budget/viewall

DataRouter.get('/monthlydata/:month',MonthlyData);//    // **   VIEW ALL TRANSACTION    MONTHLY         ROUTE - /budget/monthlydata/:month(NUMBER)

DataRouter.get('/databycat/:category',DatabyCat);//     // **   VIEW ALL TRANSACTION    by CATEGORY     ROUTE - /budget/databycat/:category(STRING)

DataRouter.get('/databytitle',DatabyTitle);// // **   VIEW ALL TRANSACTION    by TITLE        ROUTE - /budget/databytitle/



DataRouter.get('/totalincome',TotalIncome);//       // **   VIEW TOTAL INCOME                       ROUTE - /budget/totalincome 

DataRouter.get('/totalexpense',TotalExpense);//     // **   VIEW TOTAL EXPENSE                      ROUTE - /budget/totalexpense 

DataRouter.get('/totalprofit',TotalProfit);//       // **   VIEW TOTAL PROFIT                       ROUTE - /budget/totalprofit 



//FOR DASHBOARD PAGE 
DataRouter.get('/totalex-category',TotalExbyCat);      // **     VIEW TOTAL EXPENSE BY CATEGORY [ASC]  ROUTE - /budget/totalex-category
DataRouter.get('/totalin-category',TotalInbyCat);      // **     VIEW TOTAL INCOME  BY CATEGORY [ASC]  ROUTE - /budget/totalin-category


//FOR EXPENSE PAGE
DataRouter.get('/allexpense',AllExpense);           // **    VIEW ALL EXPENSESS DATA                ROUTE - /budget/allexpense
DataRouter.get('/allexpense-asc',AllExpenseAsc);    // **    VIEW ALL EXPENSESS DATA    BY ASC      ROUTE - /budget/allexpense-asc
DataRouter.get('/allexpense-dsc',AllExpenseDsc);    // **    VIEW ALL EXPENSESS DATA    BY DSC      ROUTE - /budget/allexpense-dsc






// FOR INCOME PAGE
DataRouter.get('/allincome',AllIncome);             // **     VIEW ALL INCOME DATA                  ROUTE - /budget/allincome
DataRouter.get('/allincome-asc',AllIncomeAsc);      // **     VIEW ALL INCOME DATA      BY ASC      ROUTE - /budget/allincome-asc
DataRouter.get('/allincome-dsc',AllIncomeDsc);      // **     VIEW ALL INCOME DATA      BY DSC      ROUTE - /budget/allincome-dsc



module.exports = {DataRouter};
