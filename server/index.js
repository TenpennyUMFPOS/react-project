const express = require("express");
const app = express();
require('dotenv').config();
const bodyparser = require("body-parser");
const cors = require('cors');


const {
    sequelize,
    connectToDatabase,
} = require('./helpers/connect-to-database');
connectToDatabase();
sequelize.sync({})

app.use(cors());
app.use(bodyparser.json());
/* --- USER ROUTES ----*/
const userRoutes = require("./routes/user-routes");
app.use(userRoutes);

/* --- Auth ROUTES ----*/
const authRoutes = require("./routes/auth-routes");
app.use(authRoutes);

/* --- Card ROUTES ----*/
const cardRoutes = require("./routes/card-routes");
app.use(cardRoutes);


app.listen(process.env.PORT, () => {
    console.log(`Server running at ${process.env.PORT}`)
})