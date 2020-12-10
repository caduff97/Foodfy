const express = require("express")
const routes = express.Router()

const user = require("./app/controllers/user")
const recipes = require("./app/controllers/admin/recipes")
const chefs = require("./app/controllers/admin/chefs")


/* USER */
routes.get("/", user.index)
routes.get("/about", user.about)
routes.get("/recipes", user.recipes)
routes.get("/chefs", user.chefs)
routes.get("/recipe/:id", user.show)
routes.get("/recipes/search", user.search)


/* ADMIN */
routes.get("/admin", (req, res) => {
    res.redirect('/admin/recipes')
})

routes.get("/admin/recipes", recipes.index)
routes.get("/admin/recipes/create", recipes.create)
routes.get("/admin/recipe/:id", recipes.show)
routes.post("/admin/recipes", recipes.post)
routes.get("/admin/recipe/:id/edit", recipes.edit)
routes.put("/admin/recipes", recipes.put)
routes.delete("/admin/recipes", recipes.delete)

routes.get("/admin/chefs", chefs.index)
routes.get("/admin/chefs/create", chefs.create)
routes.get("/admin/chef/:id", chefs.show)
routes.post("/admin/chefs", chefs.post)
routes.get("/admin/chef/:id/edit", chefs.edit)
routes.put("/admin/chefs", chefs.put)
routes.delete("/admin/chefs", chefs.delete)




module.exports = routes