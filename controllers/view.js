const data = require("../data.json")

exports.index = (req, res) => {
    return res.render("view/index", { data } )
}

exports.about = (req, res) =>{
    return res.render("view/about")
}

exports.recipes = (req, res) =>{
    return res.render("view/recipes", { data })
}

exports.show = (req, res) => {
    const { id } = req.params

    const foundRecipe = data.recipes.find((recipe) => {
        return recipe.id == id
    })

    if (!foundRecipe) return res.send("Recipe not-found")

    const recipe = {
        ...foundRecipe
    }
 
    return res.render("view/recipe", { recipe })
}