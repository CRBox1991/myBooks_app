const express = require("express");
const cors = require('cors');
const userRouters = require("./routers/user.router");
const booksRouters = require("./routers/books.router");
const errorHanding = require("./error/errorHandling");
const app = express();


app.set("port", process.env.PORT || 3000);

app.use(cors());
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(userRouters);
app.use(booksRouters);
app.use(function(req, res, next){

    res.status(400).json({
        error:true,
        codigo: 404,
        mesaage:"Endpoint doesnt found"
    })
})

app.use(errorHanding);

module.exports = app