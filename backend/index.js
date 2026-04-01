const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");
const cookieParser = require("cookie-parser");

dotenv.config();

const { dbConnection } = require("./config/db.config");
const PORT = process.env.PORT || 8000;
const MONGO_URL = process.env.MONGO_URL;

// Database Connection
dbConnection(MONGO_URL);

// 1. CORS - Isse routes se upar hona chahiye
app.use(cors({
  origin: "*", 
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));

// 2. Parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// 3. Static Folder (Sirf ek baar kaafi hai)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// 4. Routes
const criterion3Routes = require("./routes/criterion3.route");
const mainRoutes = require("./routes/main.route");

// DHAYAN DEIN: Ye aapka base URL hai
app.use("/api/criteria3", criterion3Routes);
app.use("/api", mainRoutes);

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "OK" });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});