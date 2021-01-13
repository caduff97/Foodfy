const Recipe = require("../../models/Recipe")
const File = require("../../models/File")

module.exports = {
    async index(req, res) {
        let results = await Recipe.all()
        const recipes = results.rows

        for (recipe of recipes) {
            results = await Recipe.files(recipe.id)
            const files = results.rows.map(file => ({
                ...file,
                src: `${req.protocol}://${req.headers.host}${file.path.replace("public", "")}`
            }))
            recipe.files = files
        }
        
        return res.render("admin/recipes/index", { recipes } )
    },
    async create(req, res) {
        let results = await Recipe.chefsSelectOptions()
        const options = results.rows
        
        return res.render("admin/recipes/create", { options })
    },
    async post(req, res) {
        const keys = Object.keys(req.body)

        for (key of keys) {
            if (req.body[key] == "" && key != 'removed_files') {
                return res.send("Please, fill all fields")
            }
        }

        if(req.files.length == 0)
            return res.send("Please, send at least one image.")

        let results = await Recipe.create(req.body)
        const recipeId = results.rows[0].id

        const filesPromise = req.files.map(file => File.create({...file, recipe_id: recipeId}))
        await Promise.all(filesPromise)

        return res.redirect(`/admin/recipe/${recipeId}`)
    },
    async show(req,res) { 
        let results = await Recipe.find(req.params.id)
        const recipe = results.rows[0]

        if (!recipe) return res.send(`Recipe not found! <a href="/admin/recipes">Click here to return</a>`)

        results = await Recipe.files(recipe.id)
        const files = results.rows.map(file => ({
            ...file,
            src: `${req.protocol}://${req.headers.host}${file.path.replace("public", "")}`
        }))

        return res.render("admin/recipes/recipe", { recipe, files })
    },
    async edit(req,res) {
        let results = await Recipe.find(req.params.id)
        const recipe = results.rows[0]

        if (!recipe) return res.send(`Recipe not found! <a href="/admin/recipes">Click here to return</a>`)

        results = await Recipe.chefsSelectOptions()
        const options = results.rows

        results = await Recipe.files(recipe.id)
        const files = results.rows.map(file => ({
            ...file,
            src: `${req.protocol}://${req.headers.host}${file.path.replace("public", "")}`
        }))
        
        return res.render("admin/recipes/edit", { recipe, options, files })
    },
    async put(req, res) {   
        const keys = Object.keys(req.body)

        for (key of keys) {
            if (req.body[key] == "" && key != 'removed_files') {
                return res.send("Please, fill all fields")
            }
        }

        if (req.body.removed_files) {
            const removedFiles = req.body.removed_files.split(",")
            const lastIndex = removedFiles.length - 1
            removedFiles.splice(lastIndex, 1)

            const removedFilesPromise = removedFiles.map(id => File.delete(id))
            await Promise.all(removedFilesPromise)
        }
        
        if(req.files.length != 0) {
            const newFilesPromise = req.files.map(file => File.create({...file, recipe_id: req.body.id}))
            await Promise.all(newFilesPromise)
        }

        await Recipe.update(req.body)

        return res.redirect(`/admin/recipe/${req.body.id}`)
    },
    async delete(req,res) {
        const results = await Recipe.files(req.body.id)
        const files = results.rows

        const deleteFilesPromise = files.map(file => File.delete(file.id))
        await Promise.all(deleteFilesPromise)

        await Recipe.delete(req.body.id)

        return res.redirect(`/admin/`)
    }
}