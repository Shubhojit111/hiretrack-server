const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/Auth/authRoutes');
const jobRoutes = require("./routes/jobRoutes")
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db');

dotenv.config();

const app = express();

// Middleware
app.use(cors({
    origin: "http://localhost:5173",
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

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Server running on port http://localhost:${PORT}`);
});
