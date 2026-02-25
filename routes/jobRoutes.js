const express = require("express");
const router = express.Router();
const {
  RegisterJobs,
  GetJobs,
  GetJobById,
  UpdateJobs,
  DeleteJobs,
} = require("../controllers/jobController");
const isLoggedIn = require("../middleware/authMiddleware");

router.post("/create", isLoggedIn, RegisterJobs);

router.get("/read", isLoggedIn, GetJobs);

router.get("/read/:id", isLoggedIn, GetJobById);

router.put("/update/:id", isLoggedIn, UpdateJobs);

router.post("/delete/:id", isLoggedIn, DeleteJobs);

module.exports = router;
