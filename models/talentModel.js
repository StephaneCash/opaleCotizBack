module.exports = (sequelize, DataTypes) => {
    const Talent = sequelize.define("talent", {
        nom: {
            type: DataTypes.STRING,
        },
        prenom: {
            type: DataTypes.TEXT,
        },
        email: {
            type: DataTypes.TEXT,
        },
        numTel: {
            type: DataTypes.TEXT,
        },
        dateNaissance: {
            type: DataTypes.TEXT,
        },
        commune: {
            type: DataTypes.TEXT,
        },
        occupation: {
            type: DataTypes.TEXT,
        },
        categorie: {
            type: DataTypes.TEXT,
        },
        video: {
            type: DataTypes.TEXT,
        },
        modePaiement: {
            type: DataTypes.STRING,
        }
    });

    return Talent;
}