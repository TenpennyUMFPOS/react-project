const express = require("express");
require("dotenv").config();
const cors = require("cors");
const bodyParser = require("body-parser");


const app = express();
app.use(cors());
app.use(bodyParser.json());

const {
    sequelize,
    connectToDatabase,
} = require("./helpers/connect-to-database");
connectToDatabase();
sequelize.sync({});



const userRoutes = require("./routes/user.routes");
const authRoutes = require("./routes/auth.routes");

app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);

app.listen(process.env.PORT, () => {
    console.log(`application running on port ${process.env.PORT}`);
});