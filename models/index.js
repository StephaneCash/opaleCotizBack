const dbConfig = require('../config/dbConfig');
const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD,
    {
        host: dbConfig.HOST,
        dialect: dbConfig.DIALECT,
        operatorsAliases: false,

        pool: {
            max: dbConfig.pool.max,
            min: dbConfig.pool.min,
            acquire: dbConfig.pool.acquire,
            idle: dbConfig.pool.idle,
        }
    }
);
sequelize.authenticate()
    .then(() => {
        console.log("Connexion à la base de données a été effectuée avec succès");
    })
    .catch(err => {
        console.log(err);
    });

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require("./userModel")(sequelize, DataTypes);
db.categories = require("./categorieModel")(sequelize, DataTypes);
db.cagnottes = require("./cagnotteModel")(sequelize, DataTypes);
db.images = require("./imageModel")(sequelize, DataTypes);
db.documents = require("./documentModel")(sequelize, DataTypes);
db.participants = require("./participantsModel")(sequelize, DataTypes);
db.participant_cagnotte = require("./participant_cagnotteModel")(sequelize, DataTypes);

// RELATION 1-N CATEGORIE / CAGNOTTE
db.categories.hasMany(db.cagnottes, { as: 'cagnottes', });

db.cagnottes.belongsTo(db.categories, {
    foreignKey: "categorieId",
    as: 'categorie'
});

// RELATION N-N PARTICIPANT / CAGNOTTE
db.participants.belongsToMany(db.cagnottes, { through: "participant_cagnotte" });
db.cagnottes.belongsToMany(db.participants, { through: "participant_cagnotte" });

// RELATION 1-N CAGNOTTES IMAGES
db.cagnottes.hasMany(db.images, {
    as: "images",
});

db.images.belongsTo(db.cagnottes, {
    foreignKey: "cagnotteId",
    as: "cagnotte",
});

db.sequelize.sync({ force: false })
    .then(() => {
        console.log("DB SYNCHRONISEE AVEC SUCCES",)
    })
    .catch(err => {
        console.log("ERREURS DE SYNCHRONISATION DE BD : ", err);
    });

module.exports = db;
