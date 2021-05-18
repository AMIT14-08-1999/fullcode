const express = require('express');
const app = express();
const Port = process.env.PORT || 1000;
const mongoose = require('mongoose');
const userRoute = require("./routes/user")
const profileRoute = require("./routes/profile");
const adminpanelRoute = require("./routes/admin")
const path = require("path")
app.use(express.json());
const hbs = require('express-handlebars');


// connect mongodb database
require('./server/database/database')();

// mongoose.connect("mongodb+srv://users:5HXGpfeypOrebeui@cluster0.5yblz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", {
//     useNewUrlParser: true,
//     useFindAndModify: false,
//     useUnifiedTopology: true,
//     useCreateIndex: true,
// });
// const connection = mongoose.connection;
// connection.once("open", () => {
//     console.log("Mongoose Connect successfully")
// })

app.route("/logic").get((req, res) => {
    res.json("hello baby how r you...fine?");
})

app.use("/uploads", express.static("uploads"));
app.use("/user", userRoute);
//app.use("/profile", profileRoute);
app.use("/admin", adminpanelRoute);
app.use(express.static(path.join(__dirname, 'public')));



// setup view engine
app.set('view engine', 'hbs');
app.engine('hbs', hbs({
    extname: 'hbs',
    defaultView: 'default',
    layoutsDir: path.join(__dirname, 'views'),
    partialsDir: path.join(__dirname, 'views/partials')
}))

// calling routes
app.use('/', require('./server/router/router'));
app.listen(Port, "0.0.0.0", () => console.log(`Your server is running on port ${Port}`))

//nOgzMsTys79DtXpr
//https://stark-citadel-69831.herokuapp.com/
//20 end