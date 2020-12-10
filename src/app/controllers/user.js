const Recipe = require("../models/Recipe")
const Chef = require("../models/Chef")

module.exports = {
    index(req,res) {
        Recipe.all((recipes) => {
            const mostAcessed = []
            
            if(recipes.length > 6) {
                for (i = 0; i < 6; i++) {
                    mostAcessed.push(recipes[i])
                }
            }

            return res.render("user/index", { recipes: mostAcessed })
        })
    },
    about(req,res) {
        return res.render("user/about")
    },
    recipes(req,res) {
        
        let { page, limit } = req.query

        page = page || 1
        limit = limit || 6
        let offset = limit * (page - 1)

        const params = {
            limit,
            offset,
            callback(recipes) {
                const pagination = {
                    total: Math.ceil( recipes.length > 0 ? (recipes[0].total / limit) : 0),
                    page
                }

                return res.render("user/recipes", { recipes, pagination })
            }
        }

        Recipe.paginate(params)
    },
    show(req,res) {
        Recipe.find((req.params.id), (recipe) => {
            if (!recipe) return res.send(`Recipe not found! <a href="/recipes">Click here to return</a>`)
            
            return res.render("user/recipe", { recipe })
            })
    },
    chefs(req,res) {
        Chef.all((chefs) => {
            return res.render("user/chefs", {chefs})
        })
    },
    search(req, res) {
        
        let { filter, page, limit } = req.query

        page = page || 1
        limit = limit || 6
        let offset = limit * (page - 1)

        const params = {
            filter,
            limit,
            offset,
            callback(recipes) {
                const pagination = {
                    total: Math.ceil( recipes.length > 0 ? (recipes[0].total / limit) : 0),
                    page
                }

                return res.render("user/search", { recipes, pagination, filter })
            }
        }

        Recipe.paginate(params)
    }
}