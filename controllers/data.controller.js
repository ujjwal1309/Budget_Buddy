const {DataModel} = require("../models/data.model")

const CreateData = async (req, res) => {
    try {
      const newData = new DataModel(req.body)
      const savedData = await newData.save()
      res.status(201).json(savedData)
    } catch (err) {
      res.status(400).json({ message: err.message })
    }
  }
  
  const GetAllData = async (req, res) => {
    try {
      const allData = await DataModel.find()
      res.json(allData)
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  }
  
  const UpdateData = async (req, res) => {
    try {
      const updatedData = await DataModel.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      )
      res.json(updatedData)
    } catch (err) {
      res.status(400).json({ message: err.message })
    }
  }
  

  const DeleteData = async (req, res) => {
    try {
      await DataModel.findByIdAndDelete(req.params.id)
      res.json({ message: 'Data deleted successfully' })
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  }
  
  module.exports={GetAllData,CreateData,UpdateData,DeleteData}