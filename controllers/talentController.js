const db = require('../models');
const { ValidationError, UniqueConstraintError, ValidationErrorItem } = require('sequelize');

const getAllTalents = async (req, res) => {
    try {
        let listTalents = await db.talents.findAll({
            include: [
                {
                    model: db.transactions_talent,
                    as: "transactions"
                }
            ]
        });
        res.status(200).json(listTalents);

    } catch (error) {
        return res.status(500).json({
            message: error
        })
    }
};

const createTalent = async (req, res) => {
    try {
        const { nom, prenom, email, numTel, dateNaissance, commune, occupation, categorie, montant } = req.body;
        if (req.file) {
            let newTalent = await db.talents.create({
                nom,
                prenom,
                email,
                numTel,
                dateNaissance,
                commune,
                occupation,
                categorie,
                video: `api/${req.file.path}`
            });

            await db.transactions_talent.create({
                montant: montant,
                talentId: newTalent.id,
            });
            let findTalent = await db.talents.findByPk(newTalent.id, {
                include: [
                    {
                        model: db.transactions_talent,
                        as: "transactions"
                    }
                ]
            })
            res.status(201).json(findTalent);
        } else {
            let newTalent = await db.talents.create(req.body);
            await db.transactions_talent({
                talentId: newTalent.id,
            });
            let findTalent = await db.talents.findByPk(newTalent.id, {
                include: [
                    {
                        model: db.transactions_talent,
                        as: "transactions"
                    }
                ]
            })
            res.status(201).json(findTalent);
        }
    } catch (err) {
        if (err instanceof ValidationError) {
            return res.status(400).json({
                message: err && err.errors ? err.errors.map(e => e.message) : err
            });
        }
        else if (err instanceof UniqueConstraintError) {
            return res.status(400).json({
                message: err && err.errors ? err.errors.map(e => e.message) : err
            });
        }
        else if (err instanceof ValidationErrorItem) {
            return res.status(400).json({
                message: err && err.errors ? err.errors.map(e => e.message) : err
            });
        }
        else {
            return res.status(500).json({ message: err });
        }
    }
};

const getOneTalent = async (req, res) => {
    try {
        let id = req.params.id;
        let findTalent = await db.talents.findByPk(id);

        if (findTalent) {
            res.status(200).json({ message: "Talent trouvé avec succès", data: findTalent });
        } else {
            res.status(404).json({ message: "Talent non trouvé avec l'id : " + id });
        }
    } catch (error) {
        return res.status(500).json({ message: error });
    }
};

const updateTalent = async (req, res) => {
    try {
        let id = req.params.id;
        let findTalent = await db.talents.findByPk(id);

        if (findTalent) {
            let updateData = await findTalent.update(req.body, {
                where: { id: id }
            });
            if (updateData) {
                let find = await db.talents.findByPk(id, {
                    include: [
                        {
                            model: db.transactions_talent,
                            as: "transactions"
                        }
                    ]
                });
                res.status(200).json(find);
            }
        } else {
            res.status(404).json({ message: "Talent non trouvé avec l'id : " + id });
        }
    } catch (error) {
        return res.status(500).json({ message: error });
    }
};

const deleteTalent = async (req, res) => {
    try {
        let id = req.params.id;
        let findTalent = await db.talents.findByPk(id);

        if (findTalent) {
            let talentDeleted = await db.talents.destroy({ where: { id: id } });
            if (talentDeleted === 1) {
                res.status(200).json(findTalent);
            }
        } else {
            res.status(404).json({ message: "Talent non trouvé avec l'id : " + id });
        }

    } catch (error) {
        return res.status(500).json({ message: error });
    }
};



module.exports = {
    getAllTalents,
    createTalent,
    getOneTalent,
    updateTalent,
    deleteTalent,
}