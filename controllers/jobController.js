const jobModel = require("../models/jobModel");
// const asyncHandler=require("../utils/asyncHandler")

const RegisterJobs = async (req, res) => {
  try {
    const { company, position, salary, location, link, status } = req.body;
    if (!company || !position || !salary) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const isJobAlreadyExists = await jobModel.findOne({
      company,
      position,
      salary,
      user: req.user.id,
    });
    if (isJobAlreadyExists) {
      return res.status(400).json({ message: "Job already exists" });
    }

    const newJob = await jobModel.create({
      company,
      position,
      salary,
      location,
      link,
      status,
      user: req.user.id,
    });
    console.log(newJob);

    return res.status(201).json({
      message: "Job added successfully",
      job: newJob,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const GetJobs = async (req, res) => {
  try {
    const jobs = await jobModel.find({ user: req.user.id });
    if (jobs.length === 0) {
      return res.status(404).json({ message: "No jobs found" });
    }
    return res.status(200).json({
      message: "Job fetched successfully",
      jobs,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const GetJobById = async (req, res) => {
  try {
    const id = req.params.id;
    const job = await jobModel.findOne({
      _id: id,
      user: req.user.id   // 🔥 SECURITY FILTER
    });
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }
    return res.status(200).json({ message: "Job found", job });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const UpdateJobs = async (req, res) => {
  try {
    const id = req.params.id;

    const updatedJob = await jobModel.findOneAndUpdate(
      {
        _id: id,
        user: req.user.id,
      },
      req.body,
      { new: true }, // returns updated document
    );

    if (!updatedJob) {
      return res.status(404).json({ message: "Job not found" });
    }

    return res.status(200).json({
      message: "Job updated successfully",
      job: updatedJob,
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

const DeleteJobs = async (req, res) => {
  try {
    const id = req.params.id;
    const job = await jobModel.findOne({
      _id: id,
      user: req.user.id,
    });
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }
    await jobModel.findOneAndDelete({ _id: id, 
      user: req.user.id });
    return res.status(200).json({ message: "Job deleted successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  RegisterJobs,
  GetJobs,
  GetJobById,
  UpdateJobs,
  DeleteJobs,
};
