const morgan = require("morgan");
const express = require("express");
const verifyJWT = require("./middleware/verifyJWT");
require("dotenv/config");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const connectDB = require("./config/dbConnection");
const app = express();
const PORT = process.env.PORT || 4001;
// Connect to MongoDB
connectDB();

//Middlewares
app.use(express.json());
app.use(morgan("tiny"));
app.use(cookieParser());
app.use(cors(corsOptions));

// routes
app.use("/api/register", require("./routes/registerRoute"));
app.use("/api/login", require("./routes/loginRoute"));
app.use("/api/refresh", require("./routes/refreshTokenRoute"));
app.use("/api/logout", require("./routes/logoutRoute"));
app.use("/api/jobs", require("./routes/api/jobs"));
app.use("/api/jobtype", require("./routes/api/jobType"));
app.use("/api/modeofwork", require("./routes/api/modeOfWork"));
app.use("/api/industry", require("./routes/api/industry"));
app.use("/api/experience", require("./routes/api/experience"));
app.use("/api/jobapplication", require("./routes/api/jobApplication"));

app.use(verifyJWT);
app.use("/api/users", require("./routes/api/users"));

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
