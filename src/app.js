const express = require("express");
const path = require("path");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forcast = require("./utils/forcast");

const port = 4000;

const app = express();

//Define paths for express config
const publicDirectoryPath = path.join(__dirname, "../public")
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//Setup handlebars engine
app.set("view engine", "hbs");                                  // TO USE HBS !!!
app.set("views", viewsPath)                                      //TO CUSTOMIZE THE HBS FOLDER'S PATH
hbs.registerPartials(partialsPath);


//Setup static directory to serve
app.use(express.static(publicDirectoryPath))
app.get("", (req, res) => {
    res.render("index", {
        title: "Weather App",
        name: "Or Elharar"
    });
})
app.get("/about", (req, res) => {
    res.render("about", {
        title: "About me",
        name: "Or Elharar"
    });
})
app.get("/weather", (req, res) => {
    const address = req.query.address
    if (address == null || address.trim() === "") {
        return res.send({
            error: "Missing an address term."
        })
    }
    geocode(address, (error, { latitude, longitude, location } = {}) => {
        if (error != null) {
            return res.send({ error });
        }
        forcast(latitude, longitude, (error, response) => {
            if (error != null) {
                return res.send({ error });
            }
            response.location = location;
            res.send({ response });
        })
    })
})
app.get("/help", (req, res) => {
    res.render("help", {
        title: "Help Page",
        name: "Or Elharar",
        helpText: "Leave a message and our help teamleader will give you a call back ASAP"
    });
})

app.get("/products", (req, res) => {
    if (req.query.search == null) {
        return res.send({
            error: "Missing a search term"
        })
    }
    res.send({
        products: []
    })
})

app.get("/help/*", (req, res) => {
    res.render("404", {
        title: "Error 404",
        name: "Or Elharar",
        errorMessage: "Help article not found"
    })
})

app.get("/*", (req, res) => {
    res.render("404", {
        title: "Error 404",
        errorMessage: "Page not found",
        name: "Or Elharar",
    })
})
app.listen(port, () => {
    console.log("Server connected, port", port);
})