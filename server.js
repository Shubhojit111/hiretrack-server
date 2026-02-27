const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/Auth/authRoutes');
const jobRoutes = require("./routes/jobRoutes")
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db');
const errorMiddleware = require('./middleware/errorMiddleware');

const dotenv = require('dotenv');
dotenv.config();

const app = express();

// Middleware
app.use(cors({
    origin: [
    "http://localhost:5173",
    "https://hiretrack-shubhojit.vercel.app" 
  ],
    credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

connectDB();

// Routes Placeholder
app.get('/', (req, res) => {
    res.send('HireTrack API is running...');
});

app.use("/api/auth",authRoutes);
app.use("/api/job",jobRoutes);

app.use(errorMiddleware)

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port http://localhost:${PORT}`);
});
