const db = require('../models');
const { ValidationError, UniqueConstraintError, ValidationErrorItem } = require('sequelize');

const getAllTransactions = async (req, res) => {
    try {
        let listTransactions = await db.transactions_talent.findAll({
            include: [
                {
                    model: db.talents,
                    as: "talent"
                }
            ]
        });
        res.status(200).json(listTransactions);

    } catch (error) {
        return res.status(500).json({
            message: error
        })
    }
};

const createTransaction = async (req, res) => {
    try {
        let newTransaction = await db.transactions_talent.create(req.body);

        let findTransaction = await db.transactions_talent.findByPk(newTransaction.id, {
            include: [
                {
                    model: db.talents,
                    as: "talent"
                }
            ]
        })
        res.status(201).json(findTransaction);
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

const getOneTransaction = async (req, res) => {
    try {
        let id = req.params.id;
        let findTransaction = await db.transactions_talent.findByPk(id);

        if (findTransaction) {
            res.status(200).json({ message: "Transaction trouvée avec succès", data: findTransaction });
        } else {
            res.status(404).json({ message: "Transaction non trouvée avec l'id : " + id });
        }
    } catch (error) {
        return res.status(500).json({ message: error });
    }
};

const updateTransaction = async (req, res) => {
    try {
        let id = req.params.id;
        let findTransaction = await db.transactions_talent.findByPk(id);

        if (findTransaction) {
            let updateData = await findTransaction.update(req.body, {
                where: { id: id }
            });
            if (updateData) {
                let find = await db.transactions_talent.findByPk(id, {
                    include: [
                        {
                            model: db.talents,
                            as: "talent"
                        }
                    ]
                });
                res.status(200).json(find);
            }
        } else {
            res.status(404).json({ message: "Transaction non trouvée avec l'id : " + id });
        }
    } catch (error) {
        return res.status(500).json({ message: error });
    }
};

const deleteTransaction = async (req, res) => {
    try {
        let id = req.params.id;
        let findTransaction = await db.transactions_talent.findByPk(id);

        if (findTransaction) {
            let TransactionDeleted = await db.transactions_talent.destroy({ where: { id: id } });
            if (TransactionDeleted === 1) {
                res.status(200).json(findTransaction);
            }
        } else {
            res.status(404).json({ message: "Transaction non trouvée avec l'id : " + id });
        }

    } catch (error) {
        return res.status(500).json({ message: error });
    }
};

module.exports = {
    getAllTransactions,
    createTransaction,
    getOneTransaction,
    updateTransaction,
    deleteTransaction,
}