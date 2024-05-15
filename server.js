const express = require("express");
const cors = require("cors");
const cookiesession = require("cookie-session");

const app = express();
app.use(
    cors({
        credentials: true,
        origin: ["http://localhost:4200"],
    })
)

app.use(express.json());

app.use(express.urlencoded({extended: true}));

app.use(
    cookiesession({
        name: "user-session",
        keys: ["sehr-geheimer-string"],
        httpOnly: true
    })
);

const db = require("./app/models");

db.sequelize.sync();

app.get("/", (req, res) => {
    res.json({message: "Welcome!"})
});

require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);
require('./app/routes/score-lvl1.routes')(app);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});