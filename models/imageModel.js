module.exports = (sequelize, DataTypes) => {
    const Image = sequelize.define("image", {
        url1: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        url2: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        url3: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        url4: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });

    return Image;
}