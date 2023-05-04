const db = require('../models');
const Sequelize = require('sequelize')
const Op = Sequelize.Op;

const createParticipantCagnote = async (req, res) => {
    try {
        const addData = await db.participant_cagnotte.create(req.body);
        if (!addData) {
            return res.status(400).json({ message: "Données non ajoutées avec succès", addData });
        } else {
            res.status(201).json({ message: "Données ajoutées avec succès", addData });
        }
    } catch (error) {
        return res.status(500).json(error)
    }
}

const getAllData = async (req, res) => {
    try {
        const listData = await db.participant_cagnotte.findAll();
        res.status(200).json(listData);
    } catch (error) {
        return res.status(500).json(error)
    }
}

const removeparticipantId = async (req, res) => {
    try {
        const cagnotte_participant = await db.participant_cagnotte.findAll({
            where: {
                solutionId: { [Op.like]: req.body.cagnotteId },
                secteurId: { [Op.like]: req.body.participantId },
            }
        });

        if (cagnotte_participant) {
            db.participant_cagnotte.destroy({
                where: {
                    solutionId: { [Op.like]: req.body.cagnotteId },
                    secteurId: { [Op.like]: req.body.participantId },
                }
            }).then(resp => {
                res.status(200).json(resp)
            })
                .catch(err => {
                    return res.status(500).json(err)
                })
        } else {
            return res.status(400).json({ message: "Data non retiré" });
        }
    } catch (error) {
        return res.status(500).json(error)
    }
}

module.exports = {
    removeparticipantId, createParticipantCagnote, getAllData
}