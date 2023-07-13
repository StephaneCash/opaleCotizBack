module.exports = (sequelize, DataTypes) => {
    const Transaction = sequelize.define("transactionTalent", {
        montant: {
            type: DataTypes.INTEGER,
        },
    });

    return Transaction;
}