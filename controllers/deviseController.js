const db = require('../models');
const { ValidationError, UniqueConstraintError, ValidationErrorItem } = require('sequelize');

const getAllDevises = async (req, res) => {
    try {
        let devises = await db.devises.findAll({
            include: [
                {
                    model: db.cagnottes,
                    as: "cagnotte"
                }
            ]
        });
        res.status(200).json(devises);

    } catch (error) {
        return res.status(500).json({
            message: error
        })
    }
};

const createDevise = async (req, res) => {
    try {
        const { nom, description, montant, cagnotteId } = req.body;
        if (!isNaN(montant)) {
            let newDevise = await db.devises.create(nom, description, montant, cagnotteId);
            res.status(201).json(newDevise);
        } else {
            return res.status(400).json({ message: "Le montant doit être une valeur numérique" });
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
            return res.status(500).json({ message: err })
        }
    }
};

const getOneDevise = async (req, res) => {
    try {
        let id = req.params.id;
        let findDevise = await db.devises.findOne({ where: { id: id } });

        if (findDevise) {
            res.status(200).json(findDevise);
        } else {
            res.status(404).json({ message: "Devise non trouvée avec l'id : " + id });
        }
    } catch (error) {
        return res.status(500).json({ message: error });
    }
};

const updateDevise = async (req, res) => {
    try {
        let id = req.params.id;
        const { nom, description, montant, cagnotteId } = req.body;
        let findDevise = await db.devises.findOne({ where: { id: id } });

        if (findDevise) {
            let deviseUpdate = await findDevise.update(nom, description, montant, cagnotteId, {
                where: { id: id }
            });
            if (deviseUpdate) {
                let find = await db.devises.findOne({ where: { id: id } });
                res.status(200).json(find);
            }
        } else {
            res.status(404).json({ message: "Devise non trouvée avec l'id : " + id });
        }
    } catch (error) {
        return res.status(500).json({ message: error });
    }
};

const deleteDevise = async (req, res) => {
    try {
        let id = req.params.id;
        let findDevise = await db.devises.findOne({ where: { id: id } });

        if (findDevise) {
            let deviseDelete = await db.devises.destroy({ where: { id: id } });
            if (deviseDelete === 1) {
                res.status(200).json(findDevise);
            }
        } else {
            res.status(404).json({ message: "Devise non trouvée avec l'id : " + id });
        }

    } catch (error) {
        return res.status(500).json({ message: error });
    }
};

module.exports = {
    getAllDevises,
    createDevise,
    getOneDevise,
    updateDevise,
    deleteDevise
}

