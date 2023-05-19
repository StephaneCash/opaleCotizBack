module.exports = (sequelize, DataTypes) => {
    const Cagnotte = sequelize.define("cagnotte", {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        link: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        url: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        montant: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        dateDebut: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        dateFin: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        devise: {
            type: DataTypes.STRING,
            allowNull: true,
        }
    });

    return Cagnotte;
}