'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {

    static associate(models) {
      this.hasMany(models.transaksi,{
        foreignKey:'id_user',as:'user'
      })
    } 
  }
  user.init({
    id_user:{
      autoIncrement:true,
      primaryKey:true,
      type:DataTypes.INTEGER
    },
    nama_user: DataTypes.STRING,
    role: DataTypes.ENUM('admin', 'kasir', 'manajer'),
    username: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'user',
    tableName: 'user'
  });
  return user;
};