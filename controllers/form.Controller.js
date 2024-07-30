const postgre = require('../database');

const formController = {
    getAll: async (req, res) => {
        try {
            const { rows } = await postgre.query("SELECT * FROM users");
            res.json({ msg: "OK", data: rows });
        } catch (error) {
            res.status(500).json({ msg: error.message });
        }
    },

    getById: async (req, res) => {
        try {
            const { rows } = await postgre.query("SELECT * FROM users WHERE id = $1", [req.params.id]);

            if (rows[0]) {
                return res.json({ msg: "OK", data: rows[0] });
            }

            res.status(404).json({ msg: "Not found" });
        } catch (error) {
            res.status(500).json({ msg: error.message });
        }
    },

    create: async (req, res) => {
        try {
            const { name, gender, placeOfBirth, city, idCardNumber, headline, phone, address, invoice } = req.body;

            const sql = `
                INSERT INTO users (name, gender, place_of_birth, city, id_card_number, headline, phone, address, invoice)
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *
            `;

            const { rows } = await postgre.query(sql, [name, gender, placeOfBirth, city, idCardNumber, headline, phone, address, invoice]);

            res.json({ msg: "OK", data: rows[0] });
        } catch (error) {
            res.status(500).json({ msg: error.message });
        }
    },

    updateById: async (req, res) => {
        try {
            const { name, gender, placeOfBirth, city, idCardNumber, headline, phone, address, invoice } = req.body;

            const sql = `
                UPDATE users
                SET name = $1, gender = $2, place_of_birth = $3, city = $4, id_card_number = $5, headline = $6, phone = $7, address = $8, invoice = $9
                WHERE id = $10 RETURNING *
            `;

            const { rows } = await postgre.query(sql, [name, gender, placeOfBirth, city, idCardNumber, headline, phone, address, invoice, req.params.id]);

            if (rows[0]) {
                return res.json({ msg: "OK", data: rows[0] });
            }

            res.status(404).json({ msg: "Not found" });
        } catch (error) {
            res.status(500).json({ msg: error.message });
        }
    },

    deleteById: async (req, res) => {
        try {
            const sql = 'DELETE FROM users WHERE id = $1 RETURNING *';

            const { rows } = await postgre.query(sql, [req.params.id]);

            if (rows[0]) {
                return res.json({ msg: "OK", data: rows[0] });
            }

            res.status(404).json({ msg: "Not found" });
        } catch (error) {
            res.status(500).json({ msg: error.message });
        }
    }
};

module.exports = formController;
