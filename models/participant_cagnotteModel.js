module.exports = (sequelize, DataTypes) => {
    const ParticpantCagnotte = sequelize.define('participant_cagnotte', {
        participantId: DataTypes.STRING,
        cagnotteId: DataTypes.STRING
    })
    return ParticpantCagnotte;
};