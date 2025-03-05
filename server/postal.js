const mongoose = require("mongoose");

const PincodeSchema = mongoose.Schema(
    {
        circlename: { type: String, required: true },
        regionname: { type: String, required: true },
        divisionname: { type: String, required: true },
        officename: { type: String, required: true },
        pincode: { type: Number, required: true },
        officetype: { type: String, required: true },
        delivery: { type: Boolean, required: true }, // True for delivery post offices
        district: { type: String, required: true },
        statename: { type: String, required: true },
        latitude: { type: Number, required: false }, // Optional in case some data lacks coordinates
        longitude: { type: Number, required: false },
        region_encoded: { type: Number, required: true },
        district_encoded: { type: Number, required: true },
        state_encoded: { type: Number, required: true }
    },
    { timestamps: true }
);

const Pincode = mongoose.model("Pincode", PincodeSchema);
module.exports = Pincode;
