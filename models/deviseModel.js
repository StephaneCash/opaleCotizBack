module.exports = (sequelize, DataTypes) => {
    const Devise = sequelize.define("devise", {
        nom: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
        },
        montant: {
            type: DataTypes.STRING,
        },
    });

    return Devise;
}