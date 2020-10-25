const express = require("express")
const routes = express.Router()

const view = require("./controllers/view")
const admin = require("./controllers/admin")

/* MEMBER */
routes.get("/", view.index)
routes.get("/about", view.about)
routes.get("/recipes", view.recipes)
routes.get("/recipe/:id", view.show)

/* ADMIN */
routes.get("/admin", admin.index)
routes.get("/admin/recipes/create", admin.create)
routes.get("/admin/recipe/:id", admin.show)
routes.get("/admin/recipe/:id/edit", admin.edit)
routes.post("/admin/recipes", admin.post)
routes.put("/admin/recipes", admin.put)
routes.delete("/admin/recipes", admin.delete)

module.exports = routes