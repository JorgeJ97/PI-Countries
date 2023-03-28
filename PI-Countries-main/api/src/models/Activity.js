const { DataTypes, Sequelize } = require('sequelize')

module.exports = (sequelize) =>{
    sequelize.define('activity', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name:{
            type: DataTypes.STRING,
            allowNull: false,
        },

        difficulty:{
            type: DataTypes.INTEGER,
            allowNull:false,
            validate:{
                min:1,
                max:5,
            },

        },

        duration:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        season:{
            type: DataTypes.ENUM('Summer', 'Autum', 'Winter', 'Spring','All'),
            allowNull: false,
        },

    }, {timestamps: false});
}

