const {DataModel} = require("../models/data.model")

const CreateData = async (req, res) => {
  const { title, type, category, amount, comment,date} = req.body;
    try {
      const newData = new DataModel({
        user: req.user,
        title,
        type,
        category,
        amount,
        comment,
        date
       
        
      })
      const savedData = await newData.save()
      res.status(201).json(savedData)
    } catch (err) {
      res.status(400).json({ message: err.message })
    }
  }
  
  
  const UpdateData = async (req, res) => {
    const { id } = req.params;
    const { title, type, category, amount, comment, date } = req.body;
    
    try {
      const updatedData = await DataModel.findOneAndUpdate(
        { _id: id },
        { title, type, category, amount, comment, date },
        { new: true }
        );
        
        if (!updatedData) {
          return res.status(404).json({ message: 'Data not found' });
        }
        
        res.json(updatedData);
      } catch (err) {
        res.status(400).json({ message: err.message });
      }
    }
    
    const DeleteData = async (req, res) => {
      try {
        const data = await DataModel.findById(req.params.id);
        if (!data) {
          return res.status(404).json({ message: 'Data not found' });
        }
  
      await data.deleteOne();
      res.json({ message: 'Data deleted successfully' });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Server error' });
    }
  }

        const GetAllData = async (req, res) => {
          try {
            const allData = await DataModel.find({ user: req.user })
            res.json(allData)
          } catch (err) {
            res.status(500).json({ message: err.message })
          }
        }
  const TotalIncome = async (req, res) => {
    try {
  
      const result = await DataModel.aggregate([
        {
          $match: {
            user: req.user,
            type: 'Income' 
          }
        },
        {
          $group: {
            _id: null,
            totalIncome: { $sum: '$amount' } 
          }
        }
      ]);
 
      const TotalIncome = result.length > 0 ? result[0].totalIncome : 0;
      res.status(200).json({ "TotalIncome": TotalIncome });

    } catch (err) {
      res.status(500).json({ message: 'Error retrieving total income' });
    }
  }


  const TotalExpense = async (req, res) => {
    try {
  
      const result = await DataModel.aggregate([
        {
          $match: {
            user: req.user,
            type: 'Expense' 
          }
        },
        {
          $group: {
            _id: null,
            totalExpense: { $sum: '$amount' } 
          }
        }
      ]);
 
      const TotalExpense = result.length > 0 ? result[0].totalExpense : 0;
      res.status(200).json({ "TotalExpense": TotalExpense });

    } catch (err) {
      res.status(500).json({ message: 'Error retrieving total Expense' });
    }
  }

  const TotalProfit = async (req, res) => {
    try {
      // Calculate total income
      const totalIncomeResult = await DataModel.aggregate([
        { $match: { user: req.user,type: 'Income' } },
        { $group: { _id: null, totalIncome: { $sum: '$amount' } } }
      ]);
  
      const totalIncome = totalIncomeResult.length > 0 ? totalIncomeResult[0].totalIncome : 0;
  
      // Calculate total expenses
      const totalExpenseResult = await DataModel.aggregate([
        { $match: {user: req.user, type: 'Expense' } },
        { $group: { _id: null, totalExpense: { $sum: '$amount' } } }
      ]);
  
      const totalExpense = totalExpenseResult.length > 0 ? totalExpenseResult[0].totalExpense : 0;
  
      // Calculate total profit
      const totalProfit = totalIncome - totalExpense;
  
      res.status(200).json({ totalProfit });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  const TotalExbyCat = async (req, res) => {
    try {
      const expenseByCategory = await DataModel.aggregate([
        { $match: { user: req.user,type: 'Expense' } },
        { $group: { _id: '$category', totalExpense: { $sum: '$amount' } } },
        { $project: { _id: 0, category: '$_id', totalExpense: 1 } },
        { $sort: { totalExpense: -1 } }
      ]);
  
      res.status(200).json(expenseByCategory);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }


  const TotalInbyCat = async (req, res) => {
    try {
      const expenseByCategory = await DataModel.aggregate([
        { $match: { user: req.user,type: 'Income' } },
        { $group: { _id: '$category', totalExpense: { $sum: '$amount' } } },
        { $project: { _id: 0, category: '$_id', totalExpense: 1 } },
        { $sort: { totalExpense: -1 } }
      ]);
  
      res.status(200).json(expenseByCategory);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }


  const AllExpense = async (req, res) => {
    try {
      const expenses = await DataModel.find({user: req.user, type: 'Expense' });
      res.status(200).json(expenses);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
  const AllExpenseAsc = async (req, res) => {
    try {
      const expenses = await DataModel.find({ user: req.user,type: 'Expense' }).sort({ amount: -1 });
      res.status(200).json(expenses);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  const AllExpenseDsc = async (req, res) => {
    try {
      const expenses = await DataModel.find({ user: req.user,type: 'Expense' }).sort({ amount: 1 });
      res.status(200).json(expenses);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  const AllIncome = async (req, res) => {
    try {
      const incomes = await DataModel.find({user: req.user, type: 'Income' });
      res.status(200).json(incomes);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  const AllIncomeAsc = async (req, res) => {
    try {
      const expenses = await DataModel.find({ user: req.user,type: 'Income' }).sort({ amount: -1 });
      res.status(200).json(expenses);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  const AllIncomeDsc = async (req, res) => {
    try {
      const expenses = await DataModel.find({ user: req.user,type: 'Income' }).sort({ amount: 1 });
      res.status(200).json(expenses);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  const MonthlyData = async (req, res) => {
      const month = parseInt(req.params.month);
        try {
            const data = await DataModel.find({user: req.user,
              $expr: { $eq: [{ $month: '$date' }, month] }
            });
            res.status(200).json(data);
          } catch (err) {
            res.status(500).json({ message: err.message });
          }
        }

const DatabyCat = async (req, res) => {
  const { category } = req.params;

  try {
    const data = await DataModel.find({user: req.user, category });
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

const DatabyTitle = async (req,res)=>{
  const {title,ti1,ti2}=req.query
  try {
      let query = {};
  
      if (title) {
        query.title = { $regex: new RegExp(title, "i") };

      }
    //   if (ti1 && ti2) {
    //     const regexStr = ti1 + '|' + ti2;
    //     query.title = { $regex: new RegExp(regexStr, "i") };
    // // query.device = {$in: [device1,device2]};
    // }
  
      
  
      const data = await DataModel.find(query);
      res.send(data);
    } catch (err) {
      console.log(err);
      res.status(500).send("Internal server error");
    }
}
  module.exports={GetAllData,CreateData,UpdateData,DeleteData,TotalIncome,TotalExpense,TotalProfit,TotalExbyCat,TotalInbyCat,AllExpense,AllExpenseAsc,AllExpenseDsc,AllIncome,AllIncomeAsc,AllIncomeDsc,MonthlyData,DatabyCat,DatabyTitle}