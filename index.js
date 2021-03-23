const express = require('express');
const app = express();
const Port = process.env.PORT || 1000;
const mongoose = require('mongoose');
const userRoute = require("./routes/user")
// mongoose.connect("mongodb+srv://mainbackend:<password>TdO@mainbackend.i3efy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", {
//     useNewUrlParser: true,
//     useFindAndModify: false,
//     useUnifiedTopology: true,
//     useCreateIndex: true,
// });
const connection = mongoose.connection;
connection.once("open", () => {
    console.log("Mongoose Connect successfully")
})


app.route("/").get((req, res) => {
    res.json("hello baby how r you");
})
app.route("/logic").get((req, res) => {
    res.json("hello baby how r you...fine?");
})

app.use(express.json());
app.use("/user", userRoute);


app.listen(Port, () => console.log(`Your server is running on port ${Port}`))