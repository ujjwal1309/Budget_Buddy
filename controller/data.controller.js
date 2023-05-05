const {DataModel} = require("../models/data.model")

const CreateData = async (req, res) => {
  const { type, category, amount, note } = req.body;
    try {
      const newData = new DataModel({
        user: req.user.id,
        type,
        category,
        amount,
        note
      })
      const savedData = await newData.save()
      res.status(201).json(savedData)
    } catch (err) {
      res.status(400).json({ message: err.message })
    }
  }
  
  const GetAllData = async (req, res) => {
    try {
      const allData = await DataModel.find({ user: req.user.id })
      res.json(allData)
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  }
  
  const UpdateData = async (req, res) => {
    const { type, category, amount, note } = req.body;
    try {
      const updatedData = await DataModel.findById(req.params.id)
      if (!updatedData) {
        return res.status(404).json({ msg: 'updatedData data not found' });
      }
  
      if (updatedData.user.toString() !== req.user.id) {
        return res.status(401).json({ msg: 'User not authorized' });
      }
  
      updatedData.type = type;
      updatedData.category = category;
      updatedData.amount = amount;
      updatedData.note = note;
  
      await updatedData.save();
  
      res.json(updatedData);
    } catch (err) {
      res.status(400).json({ message: err.message })
    }
  }
  

  const DeleteData = async (req, res) => {
    try {
      const deletedata = await DataModel.findById(req.params.id)
      if (!deletedata) {
        return res.status(404).json({ msg: 'deletedata data not found' });
      }
  
      if (deletedata.user.toString() !== req.user.id) {
        return res.status(401).json({ msg: 'User not authorized' });
      }
  
      await deletedata.remove();
  
      res.json({ msg: 'daletedata data deleted' });
    
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  }
  
  module.exports={GetAllData,CreateData,UpdateData,DeleteData}