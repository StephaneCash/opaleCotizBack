const db = require('../models');
const { ValidationError, UniqueConstraintError, ValidationErrorItem } = require('sequelize');

const getAllCagnottes = async (req, res) => {
    try {
        let cagnottes = await db.cagnottes.findAll({
            include: [
                {
                    model: db.categories,
                    as: "categorie"
                },
                {
                    model: db.images,
                    as: "images"
                },
                {
                    model: db.participants,
                    as: "participants"
                }
            ]
        });

        res.status(200).json(cagnottes);

    } catch (error) {
        return res.status(500).json({
            message: error
        })
    }
};

const createCagnotte = async (req, res) => {
    try {
        const { title, description, link, categorieId, montant, dateDebut, dateFin, devise } = req.body;
        if (req.file) {
            let newCagnotte = await db.cagnottes.create({
                title: title,
                description: description,
                link: link,
                categorieId: categorieId,
                montant: montant,
                dateDebut: dateDebut,
                dateFin: dateFin,
                devise: devise,
                url: `api/${req.file.path}`
            });

            res.status(201).json(newCagnotte);
        } else {
            let newCagnotte = await db.cagnottes.create(req.body);
            res.status(201).json(newCagnotte)
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

const getOneCagnotte = async (req, res) => {
    try {
        let id = req.params.id;
        let cagnotteFind = await db.cagnottes.findByPk(id, {
            include: [
                {
                    model: db.categories,
                    as: "categorie"
                },
                {
                    model: db.images,
                    as: "images"
                },
                {
                    model: db.participants,
                    as: "participants"
                }
            ]
        });

        if (cagnotteFind) {
            res.status(200).json({ message: "Cagnotte trouvée avec succès", data: cagnotteFind });
        } else {
            res.status(404).json({ message: "Cagnotte non trouvée avec l'id : " + id });
        }
    } catch (error) {
        return res.status(500).json({ message: error });
    }
};

const updateCagnotte = async (req, res) => {
    try {
        let id = req.params.id;
        let findCagnotte = await db.cagnottes.findOne({ where: { id: id } });

        if (findCagnotte) {
            const { title, description, link, categorieId, montant, devise } = req.body;

            if (req.file) {
                let cagnotteUpdate = await findCagnotte.update({
                    title: title,
                    description: description,
                    link: link,
                    categorieId: categorieId,
                    devise: devise,
                    montant: montant,
                    url: `api/${req.file.path}`
                }, {
                    where: { id: id }
                });
                if (cagnotteUpdate) {
                    let findCagnotte = await db.cagnottes.findOne({ where: { id: id } });
                    res.status(200).json(findCagnotte);
                }
            } else {
                let cagnotteUpdate = await findCagnotte.update(req.body, {
                    where: { id: id }
                });
                if (cagnotteUpdate) {
                    let findCagnotte = await db.cagnottes.findOne({ where: { id: id } });
                    res.status(200).json({ message: "Cagnotte a été modifié avec succès", data: findCagnotte });
                }
            }
        } else {
            res.status(404).json({ message: "Cagnotte non trouvé avec l'id : " + id });
        }
    } catch (error) {
        return res.status(500).json({ message: error });
    }
};

const deleteCagnotte = async (req, res) => {
    try {
        let id = req.params.id;
        let findCagnotte = await db.cagnottes.findByPk(id);

        if (findCagnotte) {
            let cagnotteDel = await db.cagnottes.destroy({ where: { id: id } });
            if (cagnotteDel === 1) {
                res.status(200).json({ message: "Cagnotte a été supprimé avec succès", data: findCagnotte });
            }
        } else {
            res.status(404).json({ message: "Cagnotte non trouvé avec l'id : " + id });
        }

    } catch (error) {
        return res.status(500).json({ message: error });
    }
};

module.exports = {
    getAllCagnottes,
    createCagnotte,
    getOneCagnotte,
    updateCagnotte,
    deleteCagnotte
}

