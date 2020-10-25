const fs = require("fs")
const data = require("../data.json")

exports.index = (req, res) => {
    return res.render("admin/index", { data } )
}

exports.create = (req, res) => {
    return res.render("admin/create")
}

exports.post = (req, res) => {

    const keys = Object.keys(req.body)

    for (key of keys) {
        if (req.body[key] == "" ) {
            return res.send("Please, fill all fields")
        }
    }

    let id = Number(1)
    const lastRecipe = data.recipes[data.recipes.length -1]

    if (lastRecipe) {
        id = lastRecipe.id + 1
    }

    data.recipes.push({
        id,
        ...req.body
    })

    fs.writeFile('data.json', JSON.stringify(data, null, 2), (err) => {
        if (err) return res.send("Write file error!")

        return res.redirect(`/admin/recipe/${id}`)
    })
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

    return res.render("admin/recipe", { recipe })
}

exports.edit = (req, res) => {

    const { id } = req.params

    const foundRecipe = data.recipes.find((recipe) => {
        return recipe.id == id
    })

    if (!foundRecipe) return res.send("Recipe not-found")

    const recipe = {
        ...foundRecipe
    }

    return res.render("admin/edit", { recipe })
}

exports.put = (req, res) => {

    const { id } = req.body
    let index = 0

    const foundRecipe = data.recipes.find((recipe, foundIndex) => {
        if (id == recipe.id) {
            index = foundIndex
            return true
        }
    })

    if (!foundRecipe) return res.send("Recipe not found")

    const recipe = {
        ...foundRecipe,
        ...req.body,
    }

    data.recipes[index] = recipe

    fs.writeFile('data.json', JSON.stringify(data, null, 2), (err) => {
        if (err) return res.send("Write file error!")

        return res.redirect(`/admin/recipe/${ id }`)
    })

}

exports.delete = (req, res) => {

    const { id } = req.body

    const filteredRecipes = data.recipes.filter((recipe) => {
        return recipe.id != id
    })

    data.recipes = filteredRecipes

    fs.writeFile('data.json', JSON.stringify(data, null, 2), (err) => {
        if (err) return res.send("Write file error!")

        return res.redirect(`/admin/`)
    })

}