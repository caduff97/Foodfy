const { date } = require("../lib/utils")
const db = require("../../config/db")

module.exports = {
    all() {
        return db.query(`
            SELECT recipes.*, chefs.name AS chef_name
            FROM recipes
            LEFT JOIN chefs ON (recipes.chef_id = chefs.id)
            ORDER BY recipes.id DESC
        `)
    },
    create(data) {
        const query = `
            INSERT INTO recipes (
                chef_id,
                title,
                ingredients,
                preparation,
                information,
                created_at
            ) VALUES ($1, $2, $3, $4, $5, $6) 
            RETURNING id
        `
        const values = [
            data.chef,
            data.title,
            data.ingredients,
            data.preparation,
            data.information,
            date(Date.now()).iso
        ]

        return db.query(query, values)
    },
    find(id) {
        return db.query(`
            SELECT recipes.*, chefs.name AS chef_name
            FROM recipes
            LEFT JOIN chefs ON (recipes.chef_id = chefs.id)
            WHERE recipes.id = $1
        `, [id])
    },
    chefsSelectOptions() {
        return db.query(`
            SELECT name, id
            FROM chefs
            ORDER BY name ASC
        `)
    },
    update(data) {
        const query = `
            UPDATE recipes SET
                chef_id = $1,
                title = $2,
                ingredients = $3,
                preparation = $4,
                information = $5
            WHERE id = $6
        `
        const values = [
            data.chef,
            data.title,
            data.ingredients,
            data.preparation,
            data.information,
            data.id
        ]

        return db.query(query, values)
    },
    delete(id) {
        return db.query(`
            DELETE FROM recipes
            WHERE id=$1
        `, [id])
    },
    files(id) {
        return db.query(`
                SELECT recipe_files.*, files.name AS name, files.path AS path
                FROM recipe_files
                LEFT JOIN files ON (recipe_files.file_id = files.id)
                WHERE recipe_id = $1
            `, [id])
    },
    paginate(params) {
        const { filter, limit, offset } = params

        let query = "",
            filterQuery = "",
            totalQuery = `(
                SELECT count(*) FROM recipes
            ) AS total`
        
        if (filter) {
            filterQuery = `
            WHERE recipes.title ILIKE '%${filter}%'
            OR chefs.name ILIKE '%${filter}%'
            `

            totalQuery = `(
                SELECT count(*) FROM recipes LEFT JOIN chefs ON (recipes.chef_id = chefs.id)
                ${filterQuery}
            ) AS total`
        }

        query = `
            SELECT recipes.*,
            chefs.name AS chef_name,
            ${totalQuery}
            FROM recipes
            LEFT JOIN chefs ON (recipes.chef_id = chefs.id)
            ${filterQuery}
            ORDER BY recipes.id DESC
            LIMIT $1
            OFFSET $2`

        return db.query(query, [ limit, offset ])
    }
}