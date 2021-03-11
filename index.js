
const express = require("express");
const bodyParser = require("body-parser");
const user = require("./routes/user");
//require in routers
const recipe = require("./routes/recipe");

const mongoose = require('mongoose');

const dotenv = require ('dotenv');

dotenv.config();
const app = express();
const cors = require('cors');

// Initiate Mongo Server(InitiateMongoServer {to be shifted later to db.js})
mongoose.connect(process.env.DATABASE_ACCESS, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
               .then(() => console.log('DATABASE Connected'))
                .catch(e => console.log('error db:', e))

  app.use(cors({ origin: [
                      "http://localhost:3000"  ],
                    credentials: true,
                  })
                );

// PORT
const PORT = process.env.PORT || 3001;

// Middleware
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.json({ message: "API Working" });
});

/**
 * Router Middleware
 * Router - /user/*
 * Method - *
 */
app.use("/user", user);



//router- /recipes/
//add api routes here
app.use("/recipe", recipe);


app.listen(PORT, (req, res) => {
  console.log(`Server Started at PORT ${PORT}`);
});