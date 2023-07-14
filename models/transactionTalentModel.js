module.exports = (sequelize, DataTypes) => {
    const Transaction = sequelize.define("transactionTalent", {
        montant: {
            type: DataTypes.INTEGER,
        },
        modePaiement: {
            type: DataTypes.STRING
        }
    });

    return Transaction;
}