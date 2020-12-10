const { date } = require("../lib/utils")
const db = require("../../config/db")

module.exports = {
    all(callback) {
        db.query(`
        SELECT recipes.*, chefs.name AS chef_name
        FROM recipes
        LEFT JOIN chefs ON (recipes.chef_id = chefs.id)
        ORDER BY recipes.id DESC
        `, (err, results) => {
            if (err) throw `Database error! ${err}`
            callback(results.rows)
        })
    },
    create(data, callback) {
        const query = `
        INSERT INTO recipes (
            chef_id,
            image,
            title,
            ingredients,
            preparation,
            information,
            created_at
        ) VALUES ($1, $2, $3, $4, $5, $6, $7) 
        RETURNING id
        `
        const values = [
            data.chef,
            data.image,
            data.title,
            data.ingredients,
            data.preparation,
            data.information,
            date(Date.now()).iso
        ]

        db.query(query, values, (err, results) => {
            if (err) throw `Database error! ${err}`
            callback(results.rows[0])
        })
    },
    find(id, callback) {
        db.query(`
        SELECT recipes.*, chefs.name AS chef_name
        FROM recipes
        LEFT JOIN chefs ON (recipes.chef_id = chefs.id)
        WHERE recipes.id = $1
        `, [id], (err, results) => {
            if (err) throw `Database error! ${err}`
            callback(results.rows[0])
        })
    },
    chefsSelectOptions(callback) {
        db.query(`
        SELECT name, id
        FROM chefs
        ORDER BY name ASC`, (err, results) => {
            if (err) throw `Database error! ${err}`
            callback(results.rows)
        })
    },
    update(data, callback) {
        const query = `
        UPDATE recipes SET
            chef_id = $1,
            image = $2,
            title = $3,
            ingredients = $4,
            preparation = $5,
            information = $6
        WHERE id = $7
        `
        const values = [
            data.chef,
            data.image,
            data.title,
            data.ingredients,
            data.preparation,
            data.information,
            data.id
        ]

        db.query(query, values, (err, results) => {
            if (err) throw `Database error! ${err}`
            callback()
        })
    },
    delete(id, callback) {
        db.query(`
        DELETE FROM recipes
        WHERE id=$1`, [id], (err) =>{
            if (err) throw `Database error! ${err}`
            callback()
        })
    },
    paginate(params) {
        const { filter, limit, offset, callback } = params

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

        db.query(query, [ limit, offset ], (err, results) => {
            if(err) throw `Database error! ${err}`
            callback(results.rows)
        })
    }
}