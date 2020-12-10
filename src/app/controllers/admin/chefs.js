const Chef = require("../../models/Chef")

module.exports = {
    index(req,res) {
        Chef.all((chefs) => {
            return res.render("admin/chefs/index", {chefs})
        })
    },
    create(req, res) {
        return res.render("admin/chefs/create")
    },
    post(req, res) {
        const keys = Object.keys(req.body)

        for (key of keys) {
            if (req.body[key] == "" ) {
                return res.send("Please, fill all fields")
            }
        }

        Chef.create((req.body), (chef) => {
            return res.redirect(`/admin/chef/${chef.id}`)
        })
    },
    show(req,res) {
        Chef.find((req.params.id), (chef) => {
            if (!chef) return res.send(`Chef not found! <a href="/admin/chefs">Click here to return</a>`)

            Chef.findRecipes((chef.id), (chefRecipes) => {
                return res.render("admin/chefs/chef", { chef, chefRecipes })                
            })
                
        })
    },
    edit(req, res) {
        Chef.find((req.params.id), (chef) => {
            if (!chef) return res.send(`Chef not found! <a href="/admin/chefs">Click here to return</a>`)
            
            return res.render("admin/chefs/edit", { chef })
        })
    },
    put(req, res) {
        const keys = Object.keys(req.body)

        for (key of keys) {
            if (req.body[key] == "" ) {
                return res.send("Please, fill all fields")
            }
        }

        Chef.update((req.body), () => {
            res.redirect(`/admin/chef/${req.body.id}`)
        })
    },
    delete(req, res) {

        if (req.body.total_recipes > 0) return res.send(`Chefs who have recipes cannot be deleted. <a href="/admin/chef/${req.body.id}">Click here to return</a>`)
        
        Chef.delete(req.body.id, () => {
            return res.redirect(`/admin/chefs`)
        })
    }
}