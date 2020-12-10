const Recipe = require("../../models/Recipe")

module.exports = {
    index(req, res) {
        Recipe.all((recipes) => {
            return res.render("admin/recipes/index", { recipes } )
        })
    },
    create(req, res) {
        Recipe.chefsSelectOptions((options) => {
            return res.render("admin/recipes/create", { options })
        })
    },
    post(req, res) {
        const keys = Object.keys(req.body)

        for (key of keys) {
            if (req.body[key] == "" ) {
                return res.send("Please, fill all fields")
            }
        }

        Recipe.create((req.body), (recipe) => {
            return res.redirect(`/admin/recipe/${recipe.id}`)
        })
    },
    show(req,res) { 
        Recipe.find((req.params.id), (recipe) => {
            if (!recipe) return res.send(`Recipe not found! <a href="/admin/recipes">Click here to return</a>`)
                
            return res.render("admin/recipes/recipe", { recipe })
        }) 
    },
    edit(req,res) {
        Recipe.find((req.params.id), (recipe) => {
        
            if (!recipe) return res.send(`Recipe not found! <a href="/admin/recipes">Click here to return</a>`)
            
            Recipe.chefsSelectOptions((options) => {
                return res.render("admin/recipes/edit", { recipe, options })
            })
        }) 
    },
    put(req,res) {   
        const keys = Object.keys(req.body)

        for (key of keys) {
            if (req.body[key] == "" ) {
                return res.send("Please, fill all fields")
            }
        }

        Recipe.update((req.body), () => {
            res.redirect(`/admin/recipe/${req.body.id}`)
        })
    },
    delete(req,res) {
        Recipe.delete(req.body.id, () => {
            return res.redirect(`/admin/`)
        })
    }
}