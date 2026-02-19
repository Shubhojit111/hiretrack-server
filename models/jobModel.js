const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      required: true,
    },
    position: {
      type: String,
      required: true,
    },
    link:{
        type:String,
        required:true
    },
    salary: {
      type: String,
      required: true,
    },
    location:{
        type:String,
        required:true
    },
    status: {
      type: String,
      enum: ["Applied", "Interview", "Rejected", "Offered"],
      default: "Applied",
    },
    // user: {
      //   type: mongoose.Schema.Types.ObjectId,
      //   ref: "User",
      //   required: true,
      //
    // },
  },
  { timestamps: true },
);

const Job = mongoose.model("Job", jobSchema);

module.exports = Job;
