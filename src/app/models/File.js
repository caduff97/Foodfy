const db = require("../../config/db")
const fs = require("fs")

const { files } = require("./Recipe")

module.exports = {
    async create({filename, path, recipe_id}) {
        let query = `
            INSERT INTO files (
                name,
                path
            ) VALUES ($1, $2)
            RETURNING id
        `

        let values = [
            filename,
            path
        ]

        let results = await db.query(query, values)
        const file_id = results.rows[0].id

        query = `
            INSERT INTO recipe_files (
                recipe_id,
                file_id
            ) VALUES ($1, $2)
        `

        values = [
            recipe_id,
            file_id
        ]

        return db.query(query, values)
    },
    async delete(id) {

        try {
            const results = await db.query(`
                    SELECT recipe_files.*, files.name AS name, files.path AS path
                    FROM recipe_files
                    LEFT JOIN files ON (recipe_files.file_id = files.id)
                    WHERE recipe_files.id = $1
                `, [id])
            const file = results.rows[0]
            
            fs.unlinkSync(file.path)

            await db.query(`DELETE FROM recipe_files WHERE id = $1`, [file.id])
            await db.query(`DELETE FROM files WHERE id = $1`, [file.file_id])

        } catch (err) {
            console.log(err)
        }
    }
}