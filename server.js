const express = require("express")
const nunjucks = require("nunjucks")
const recipes = require("./data")
const { reduce } = require("../../Cursos_Aulas/LaunchBase/Works/aulajs/modulo03/data")

const server = express()

server.set("view engine", "njk")

server.use(express.static('public'))

nunjucks.configure("views", {
   express: server,
   autoescape: false,
   noCache: true
})


server.get("/", (req, res) =>{
   return res.render("index", {recipes})
})

server.get("/about", (req, res) =>{
   return res.render("about")
})

server.get("/recipes", (req, res) =>{
   return res.render("recipes", {recipes})
})

server.get("/recipe", (req, res) => {
   const title = req.query.title
   
   const recipe = recipes.find((recipe) => {
      return recipe.title == title
   })

   if (!recipe) {
      return res.send("page not found!")
   }

   return res.render("recipe", {recipe})
})

server.listen(5000)