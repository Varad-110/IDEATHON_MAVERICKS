require("dotenv").config();
const express = require("express");
const cors = require("cors");
const axios = require("axios");
const mongoose = require("mongoose");

const app = express();
app.use(cors());
app.use(express.json());


mongoose.connect("")
  .then(()=>{
    console.log("connected to DB");
    app.listen(3000,()=>{
        console.log('server is running on port 3000')
    });
  })
  .catch(()=>console.log('connection failed'));

// Define Schema
const PincodeSchema = new mongoose.Schema({
  address: String,
  pinCode: String,
});
const Pincode = mongoose.model("Pincode", PincodeSchema);

// **API Endpoint to Validate Address**
app.post("/homepage", async (req, res) => {
  const { address, pinCode } = req.body;

  try {
    // Check in MongoDB first
    
    if (record) {
      return res.json({ correctedPin: record.pinCode, source: "Database" });
    }

    // If not found, call AI Model hosted in Colab
    const response = await axios.post(process.env.COLAB_API_URL, { address });
    const correctedPin = response.data.correctedPin;

    // Save new record
    const newRecord = new Pincode({ address, pinCode: correctedPin });
    await newRecord.save();

    res.json({ correctedPin, source: "AI Model" });
  } catch (error) {
    console.error("Error validating address:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

// **Start Server**
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
