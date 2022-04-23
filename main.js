// Import Dotenv.
require('dotenv').config()
// Import Express.
const express = require("express")
// Import Handlebars.
const handlebars = require("express-handlebars")

// Initialise Express.
const app = express()

// Render static files.
app.use(express.static("static"))

// Set the view engine to Handlebars.
app.engine("handlebars", handlebars.engine())
app.set("view engine", "handlebars")

// Set and log the port for Express.
app.listen(process.env.PORT, () => {
    console.log(`Express running at http://localhost:${process.env.PORT}.`)
})

// Listen to all GET requests on /.
app.get("/", (_req, res) => {
	// Load the index page.
    res.render("index")
})