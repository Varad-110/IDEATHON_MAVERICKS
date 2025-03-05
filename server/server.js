require("dotenv").config();
const express = require("express");
const cors = require("cors");
const axios = require("axios");
const mongoose = require("mongoose");

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB (Replace with your URI)
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.error("MongoDB Connection Error:", err));

// Define Schema
const PincodeSchema = new mongoose.Schema({
  address: String,
  pinCode: String,
});
const Pincode = mongoose.model("Pincode", PincodeSchema);

// **API Endpoint to Validate Address**
app.post("/api/validate-address", async (req, res) => {
  const { address, pinCode } = req.body;

  try {
    // Check in MongoDB first
    const record = await Pincode.findOne({ address });

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
