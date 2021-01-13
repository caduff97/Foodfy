const Recipe = require("../models/Recipe")
const Chef = require("../models/Chef")

module.exports = {
    async index(req,res) {
        let results = await Recipe.all()
        let recipes = results.rows
        
        if(recipes.length > 6) {
            recipes = recipes.slice(0,6)
        }

        for (recipe of recipes) {
            results = await Recipe.files(recipe.id)
            const files = results.rows.map(file => ({
                ...file,
                src: `${req.protocol}://${req.headers.host}${file.path.replace("public", "")}`
            }))
            recipe.files = files
        }

        return res.render("user/index", { recipes })
    },
    about(req,res) {
        return res.render("user/about")
    },
    async recipes(req,res) {
        
        let { page, limit, filter } = req.query

        page = page || 1
        limit = limit || 6
        let offset = limit * (page - 1)

        let results = await Recipe.paginate({ limit, offset, filter })
        const recipes = results.rows

        const pagination = {
            total: Math.ceil( recipes.length > 0 ? (recipes[0].total / limit) : 0),
            page
        }

        for (recipe of recipes) {
            results = await Recipe.files(recipe.id)
            const files = results.rows.map(file => ({
                ...file,
                src: `${req.protocol}://${req.headers.host}${file.path.replace("public", "")}`
            }))
            recipe.files = files
        }

        return filter ? res.render("user/search", { recipes, pagination, filter }) : res.render("user/recipes", { recipes, pagination })
        
        
    },
    async show(req,res) {
        let results = await Recipe.find(req.params.id)
        const recipe = results.rows[0]
        
        if (!recipe) return res.send(`Recipe not found! <a href="/recipes">Click here to return</a>`)

        results = await Recipe.files(recipe.id)
        const files = results.rows.map(file => ({
            ...file,
            src: `${req.protocol}://${req.headers.host}${file.path.replace("public", "")}`
        }))

        return res.render("user/recipe", { recipe, files })
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